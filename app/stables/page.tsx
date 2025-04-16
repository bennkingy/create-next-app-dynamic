'use client'

import { useState, useEffect } from 'react';
import { fetchAllUserNfts, type ReservoirToken, type ReservoirTokensResponse } from '@/lib/api/reservoir';
import { NFT_COLLECTIONS, CHAIN_INFO } from '@/lib/consts';
import { useDynamicContext } from '@/lib/dynamic';
import ReservoirNFTCard from '@/components/ReservoirNFTCard';
import TextHeading from '../../app/components/Text';
import Divider from '../../app/components/Divider';
import Image from 'next/image';

export default function Stables() {
  const { primaryWallet } = useDynamicContext();
  const [userNFTs, setUserNFTs] = useState<Record<string, ReservoirTokensResponse>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading your NFTs...');
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
      setLoadingMessage('Loading your NFTs (this may take a moment if you have many NFTs)...');
      
      // Track the total tokens loaded
      let totalTokensLoaded = 0;
      
      try {
        const nfts = await fetchAllUserNfts(
          address, 
          100, // 100 tokens per page
          (collection, count) => {
            totalTokensLoaded += count;
            setLoadingMessage(`Loading NFTs... Found ${totalTokensLoaded} tokens so far${count > 20 ? ' (paginating through results)' : ''}`);
          }
        );
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
        setLoadingMessage('Error loading NFTs. Please try again.');
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
    <div className="min-h-screen overflow-hidden mt-5">          {/* Top Section */}
    <div className="relative bg-[#DAE8F0] text-gray-800 py-24 z-2">
     <div className="relative text-gray-800 pb-24 px-6 z-10">
       <div className="relative container text-center">
         <TextHeading text="Stables" type="heading" style="text-heading-1" className="text-center" />
         <p className="mt-4 text-lg max-w-xl mx-auto">
          View your holdings in the Stables.
         </p>
       </div>
     </div>

     {/* {totalNFTs > 0 && (
              <div className="mt-4 md:mt-0 bg-gray-100 rounded-lg p-3">
                <p className="font-openSans font-medium">
                  Portfolio Value: <span className="font-bold">{portfolioValue.total.toFixed(4)} {portfolioValue.currency}</span>
                </p>
                <p className="text-xs text-gray-500 font-openSans">{totalNFTs} NFTs in collection</p>
              </div>
            )} */}

     {/* Leaderboard and Create Code Section */}
     <div className="relative">
       {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
       <svg
         className="absolute top-0 left-0 w-full h-12"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 100 50"
         preserveAspectRatio="none"
       >
         <polygon points="0,0 100,0 0,50" className="fill-[#DAE8F0]" />
       </svg>
       <div className="w-full h-[100px] -mb-[100px] relative bg-[#FFFFFF] [clip-path:polygon(100%_00%,0%_100%,100%_100%)]"/>
     </div>
     <div className="absolute bottom-0 z-2 w-full h-[600px] mt-4 -mb-10 sm:mb-0">
       <Image
         src="/right.png"
         alt="Hero banner"
         fill
         className="object-cover"
         quality={100}
         priority
       />
     </div>
   </div>
      <div className="relative text-gray-800 pt-12 mt-4">
        <div className="container mx-auto px-4">
          {!address ? (
            <div className="text-center py-12">
              <TextHeading 
                text="Connect your wallet to enter the Stables" 
                type="heading" 
                style="text-heading-2" 
                className="mb-4"
              />
            </div>
          ): totalNFTs === 0 ? (
            <div className="text-center py-12">
              <TextHeading 
                text="Nothing found :(" 
                type="heading" 
                style="text-heading-2" 
                className="mb-4"
              />
            </div>
          ) : (
            <>
              {/* Collection Tabs */}
              <div className="">
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
                          py-4 px-1 border-b-2 text-md font-semibold font-fredoka uppercase 
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
      
      <div className="container mx-auto px-4 pb-12 mt-4">
        {/* Active Collection NFTs */}
        {activeCollection && userNFTs[activeCollection]?.tokens.length > 0 ? (
          <div>
            {/* Collection info */}
            {(() => {
              const collection = NFT_COLLECTIONS[activeCollection as keyof typeof NFT_COLLECTIONS];
              if (!collection) return null;

              const chainInfo = CHAIN_INFO[collection.chainId as keyof typeof CHAIN_INFO];
              return (
                <div className="mb-6 pb-6 border-b border-gray-100">
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
        ) : null}
      </div>
      
      <Divider color="black" className="mt-12 -mb-1" />
    </div>
  );
} 