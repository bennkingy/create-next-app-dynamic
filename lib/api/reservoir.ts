// Reservoir API service for fetching NFTs
import { NFT_COLLECTIONS, CHAIN_INFO } from '@/lib/consts';

// Reservoir API key from environment variables
const RESERVOIR_API_KEY = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY || '';

// Types for Reservoir API responses
export interface ReservoirToken {
  token: {
    chainId: number;
    contract: string;
    tokenId: string;
    kind: string;
    name: string;
    image: string;
    imageSmall: string;
    imageLarge: string;
    metadata: {
      imageOriginal: string;
      imageMimeType: string;
      tokenURI: string;
      [key: string]: unknown;
    };
    description: string;
    rarityScore: number;
    rarityRank: number;
    supply: string;
    remainingSupply: string;
    media: null | Record<string, unknown>;
    isFlagged: boolean;
    isSpam: boolean;
    isNsfw: boolean;
    metadataDisabled: boolean;
    lastFlagUpdate: string | null;
    lastFlagChange: string | null;
    collection: {
      id: string;
      name: string;
      slug: string | null;
      symbol: string;
      contractDeployedAt: string;
      imageUrl: string;
      isSpam: boolean;
      isNsfw: boolean;
      metadataDisabled: boolean;
      openseaVerificationStatus: string | null;
      tokenCount: string;
      floorAsk: {
        id: string;
        price: {
          currency: {
            contract: string;
            name: string;
            symbol: string;
            decimals: number;
          };
          amount: {
            raw: string;
            decimal: number;
            usd: number;
            native: number;
          };
        };
        maker: string;
        validFrom: number;
        validUntil: number;
        source: {
          id: string;
          domain: string;
          name: string;
          icon: string;
          url: string;
        };
      };
      royaltiesBps: number;
      royalties: Array<{
        bps: number;
        recipient: string;
      }>;
    };
    floorAsk: {
      id: string | null;
      price: null | {
        currency: {
          contract: string;
          name: string;
          symbol: string;
          decimals: number;
        };
        amount: {
          raw: string;
          decimal: number;
          usd: number;
          native: number;
        };
      };
      maker: string | null;
      validFrom: number | null;
      validUntil: number | null;
      source: null | {
        id: string;
        domain: string;
        name: string;
        icon: string;
        url: string;
      };
    };
    lastAppraisalValue: null | Record<string, unknown>;
  };
  ownership: {
    tokenCount: string;
    onSaleCount: string;
    floorAsk: {
      id: string | null;
      price: null | {
        currency: {
          contract: string;
          name: string;
          symbol: string;
          decimals: number;
        };
        amount: {
          raw: string;
          decimal: number;
          usd: number;
          native: number;
        };
      };
      maker: string | null;
      kind: string | null;
      validFrom: number | null;
      validUntil: number | null;
      source: null | {
        id: string;
        domain: string;
        name: string;
        icon: string;
        url: string;
      };
    };
    acquiredAt: string;
  };
  // Added field to track which collection this token belongs to
  collectionKey?: string;
}

export interface ReservoirTokensResponse {
  tokens: ReservoirToken[];
  continuation: string | null;
}

/**
 * Fetches a user's NFTs for a specific collection from the Reservoir API
 * 
 * @param walletAddress The user's wallet address
 * @param collectionAddress The collection contract address
 * @param chainId The chain ID where the collection exists
 * @param collectionKey The key to identify which collection this is
 * @param limit Optional limit of tokens per request (default is 100)
 * @param continuationToken Optional token for pagination
 * @param onProgress Optional callback for reporting pagination progress
 * @returns A promise that resolves to the user's NFTs for the collection
 */
export async function fetchUserNftsForCollection(
  walletAddress: string,
  collectionAddress: string,
  chainId: number,
  collectionKey: string,
  limit = 100,
  continuationToken?: string,
  onProgress?: (collection: string, count: number) => void
): Promise<ReservoirTokensResponse> {
  try {
    const chainInfo = CHAIN_INFO[chainId as keyof typeof CHAIN_INFO];
    if (!chainInfo) {
      throw new Error(`Chain ID ${chainId} not supported`);
    }

    // Build URL with parameters
    let url = `${chainInfo.reservoirApiBase}/users/${walletAddress}/tokens/v10?collection=${collectionAddress}&limit=${limit}`;
    
    // Add continuation token if provided
    if (continuationToken) {
      url += `&continuation=${continuationToken}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'x-api-key': RESERVOIR_API_KEY,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch NFTs: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Add the collection key to each token for identification
    if (data.tokens && Array.isArray(data.tokens)) {
      data.tokens = data.tokens.map((token: ReservoirToken) => ({
        ...token,
        collectionKey
      }));
    }

    // Report progress if callback provided
    if (onProgress && data.tokens) {
      onProgress(collectionKey, data.tokens.length);
    }

    // If there's a continuation token, fetch the next batch recursively
    if (data.continuation) {
      console.log(`Fetching next batch with continuation token: ${data.continuation}`);
      const nextBatch = await fetchUserNftsForCollection(
        walletAddress,
        collectionAddress,
        chainId,
        collectionKey,
        limit,
        data.continuation,
        onProgress
      );
      
      // Combine the current tokens with the next batch
      return {
        tokens: [...data.tokens, ...nextBatch.tokens],
        continuation: nextBatch.continuation // Pass along the final continuation token
      };
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching NFTs for collection ${collectionAddress} on chain ${chainId}:`, error);
    // Return empty response on error
    return { tokens: [], continuation: null };
  }
}

/**
 * Fetches all of a user's NFTs from all supported collections across all chains
 * Using pagination with continuation tokens to ensure ALL tokens are retrieved,
 * not just the first page of results.
 * 
 * @param walletAddress The user's wallet address
 * @param tokensPerPage Optional number of tokens to fetch per API request (default 100)
 * @param onProgress Optional callback for reporting pagination progress
 * @returns A promise that resolves to all of the user's NFTs grouped by collection
 */
export async function fetchAllUserNfts(
  walletAddress: string,
  tokensPerPage = 100,
  onProgress?: (collection: string, count: number) => void
): Promise<Record<string, ReservoirTokensResponse>> {
  const results: Record<string, ReservoirTokensResponse> = {};
  
  await Promise.all(
    Object.entries(NFT_COLLECTIONS).map(async ([key, collection]) => {
      const response = await fetchUserNftsForCollection(
        walletAddress, 
        collection.address, 
        collection.chainId,
        key,
        tokensPerPage,
        undefined,
        onProgress
      );
      results[key] = response;
    })
  );
  
  return results;
} 