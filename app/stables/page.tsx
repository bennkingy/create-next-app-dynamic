'use client'

import { useState, useEffect } from 'react';
import { fetchAllUserNfts, type ReservoirToken, type ReservoirTokensResponse } from '@/lib/api/reservoir';
import { NFT_COLLECTIONS, CHAIN_INFO } from '@/lib/consts';
import { useDynamicContext } from '@/lib/dynamic';
import ReservoirNFTCard from '@/components/ReservoirNFTCard';

export default function Stables() {
  const { primaryWallet } = useDynamicContext();
  const [userNFTs, setUserNFTs] = useState<Record<string, ReservoirTokensResponse>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [portfolioValue, setPortfolioValue] = useState<{
    total: number;
    currency: string;
  }>({ total: 0, currency: 'ETH' });

  const address = primaryWallet?.address || null;
  
  // Fetch NFTs when the user connects their wallet
  useEffect(() => {
    async function fetchNFTs() {
      if (!address) return;

      setIsLoading(true);
      try {
        const nfts = await fetchAllUserNfts(address);
        setUserNFTs(nfts);

        // Set the first collection that has tokens as active
        const firstCollectionWithTokens = Object.entries(nfts).find(
          ([, response]) => response.tokens.length > 0
        );

        if (firstCollectionWithTokens) {
          setActiveCollection(firstCollectionWithTokens[0]);
        }

        // Calculate portfolio value
        let totalValue = 0;
        let currency = 'ETH';

        for (const collection of Object.values(nfts)) {
          for (const token of collection.tokens) {
            if (token.token.floorAsk?.price?.amount?.decimal) {
              totalValue += token.token.floorAsk.price.amount.decimal;
              // Set currency from the first token that has a price
              if (currency === 'ETH' && token.token.floorAsk.price.currency?.symbol) {
                currency = token.token.floorAsk.price.currency.symbol;
              }
            }
          }
        }

        setPortfolioValue({
          total: totalValue,
          currency: currency
        });
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNFTs();
  }, [address]);

  // Count total NFTs
  const totalNFTs = Object.values(userNFTs).reduce(
    (total, collection) => total + collection.tokens.length,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold">Your NFT Collections</h1>
        {totalNFTs > 0 && (
          <div className="mt-2 md:mt-0 bg-gray-100 rounded-lg p-2 md:p-3">
            <p className="text-sm md:text-base font-medium">
              Portfolio Value: <span className="font-bold">{portfolioValue.total.toFixed(4)} {portfolioValue.currency}</span>
            </p>
            <p className="text-xs text-gray-500">{totalNFTs} NFTs in collection</p>
          </div>
        )}
      </div>

      {!address ? (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">Connect your wallet to view your NFTs</h2>
          <p className="text-gray-500">You&apos;ll need to connect your wallet to see your NFT collections.</p>
        </div>
      ) : isLoading ? (
        <div className="text-center py-12">
          <p className="text-xl">Loading your NFTs...</p>
        </div>
      ) : totalNFTs === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">No NFTs Found</h2>
          <p className="text-gray-500">You don&apos;t seem to own any NFTs from our supported collections.</p>
        </div>
      ) : (
        <>
          {/* Collection Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {Object.entries(userNFTs).map(([collectionKey, response]) => {
                if (response.tokens.length === 0) return null;

                const collection = NFT_COLLECTIONS[collectionKey as keyof typeof NFT_COLLECTIONS];
                if (!collection) return null;

                return (
                  <button
                    key={collectionKey}
                    type="button"
                    onClick={() => setActiveCollection(collectionKey)}
                    className={`
                      py-4 px-1 border-b-2 font-medium text-sm
                      ${activeCollection === collectionKey
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    {collection.name} ({response.tokens.length})
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Active Collection NFTs */}
          {activeCollection && userNFTs[activeCollection]?.tokens.length > 0 ? (
            <div>
              {/* Collection info */}
              {(() => {
                const collection = NFT_COLLECTIONS[activeCollection as keyof typeof NFT_COLLECTIONS];
                if (!collection) return null;

                const chainInfo = CHAIN_INFO[collection.chainId as keyof typeof CHAIN_INFO];
                return (
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold">{collection.name}</h2>
                    <p className="text-sm text-gray-600">{collection.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Network: {chainInfo?.name}</p>
                  </div>
                );
              })()}

              {/* NFT Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userNFTs[activeCollection].tokens.map((nft: ReservoirToken) => (
                  <ReservoirNFTCard
                    key={`${nft.token.contract}-${nft.token.tokenId}`}
                    nft={nft}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">Select a collection to view your NFTs</p>
          )}
        </>
      )}
    </div>
  );
} 