'use client'

import { useState, useEffect } from 'react';
import { fetchAllUserNfts, type ReservoirToken, type ReservoirTokensResponse } from '@/lib/api/reservoir';
import { NFT_COLLECTIONS, CHAIN_INFO } from '@/lib/consts';
import { useDynamicContext } from '@/lib/dynamic';
import ReservoirNFTCard from '@/components/ReservoirNFTCard';
import TextHeading from '../../app/components/Text';
import Divider from '../../app/components/Divider';

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
            // First try to use the token's own ask price if available
            if (token.token.floorAsk?.price?.amount?.decimal) {
              totalValue += token.token.floorAsk.price.amount.decimal;
              // Set currency from the first token that has a price
              if (currency === 'ETH' && token.token.floorAsk.price.currency?.symbol) {
                currency = token.token.floorAsk.price.currency.symbol;
              }
            } 
            // If token doesn't have its own price, use collection floor price
            else if (token.token.collection?.floorAsk?.price?.amount?.decimal) {
              totalValue += token.token.collection.floorAsk.price.amount.decimal;
              // Set currency from collection floor price
              if (currency === 'ETH' && token.token.collection.floorAsk.price.currency?.symbol) {
                currency = token.token.collection.floorAsk.price.currency.symbol;
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
    <div>
      <div className="relative bg-[#DAE8F0] text-gray-800 py-12 mt-4">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <TextHeading 
              text="Your NFT Collections" 
              type="heading" 
              style="text-heading-2" 
              className="text-brand-blue"
            />
            {totalNFTs > 0 && (
              <div className="mt-4 md:mt-0 bg-gray-100 rounded-lg p-3">
                <p className="font-openSans font-medium">
                  Portfolio Value: <span className="font-bold">{portfolioValue.total.toFixed(4)} {portfolioValue.currency}</span>
                </p>
                <p className="text-xs text-gray-500 font-openSans">{totalNFTs} NFTs in collection</p>
              </div>
            )}
          </div>

          {!address ? (
            <div className="text-center py-12">
              <TextHeading 
                text="Connect your wallet to view your NFTs" 
                type="heading" 
                style="text-heading-2" 
                className="mb-4"
              />
              <p className="text-gray-500 font-openSans">You&apos;ll need to connect your wallet to see your NFT collections.</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl font-openSans">Loading your NFTs...</p>
            </div>
          ) : totalNFTs === 0 ? (
            <div className="text-center py-12">
              <TextHeading 
                text="No NFTs Found" 
                type="heading" 
                style="text-heading-2" 
                className="mb-4"
              />
              <p className="text-gray-500 font-openSans">You don&apos;t seem to own any NFTs from our supported collections.</p>
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
                          py-4 px-1 border-b-2 text-md font-bold font-openSans uppercase 
                          ${activeCollection === collectionKey
                            ? 'border-brand-orange text-brand-orange'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                      >
                        {collection.name} ({response.tokens.length})
                      </button>
                    );
                  })}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 mt-8">
        {/* Active Collection NFTs */}
        {activeCollection && userNFTs[activeCollection]?.tokens.length > 0 ? (
          <div>
            {/* Collection info */}
            {(() => {
              const collection = NFT_COLLECTIONS[activeCollection as keyof typeof NFT_COLLECTIONS];
              if (!collection) return null;

              const chainInfo = CHAIN_INFO[collection.chainId as keyof typeof CHAIN_INFO];
              return (
                <div className="mb-6 pb-4 border-b border-gray-100">
                  <TextHeading 
                    text={collection.name} 
                    type="heading" 
                    style="text-heading-2" 
                    className="text-brand-blue"
                  />
                  <p className="text-lg text-gray-600 font-openSans mt-2">{collection.description}</p>
                  <p className="text-md text-gray-500 mt-1 font-openSans">Network: {chainInfo?.name}</p>
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
          <p className="text-center py-8 text-gray-500 font-openSans">Select a collection to view your NFTs</p>
        )}
      </div>
      
      <Divider color="green" className="mt-12 -mb-1" />
    </div>
  );
} 