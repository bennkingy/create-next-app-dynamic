import React from 'react';
import Image from 'next/image';
import { ReservoirToken } from '@/lib/api/reservoir';

interface NFTCardProps {
  nft: ReservoirToken;
}

const ReservoirNFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const { token } = nft;
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative h-64 w-full bg-gray-100">
        {token.image ? (
          <Image 
            src={token.image}
            alt={token.name || `Token #${token.tokenId}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{token.name || `Token #${token.tokenId}`}</h3>
        
        <div className="mt-2 text-sm text-gray-500">
          <p className="truncate">Collection: {token.collection.name}</p>
          <p className="mt-1">{`Token ID: ${token.tokenId}`}</p>
          {token.rarityRank && (
            <p className="mt-1">{`Rarity Rank: ${token.rarityRank}`}</p>
          )}
        </div>

        {token.floorAsk?.price && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              Floor Price: {token.floorAsk.price?.amount?.decimal} {token.floorAsk.price?.currency?.symbol}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservoirNFTCard; 