// 'use client'

// import { ConnectButton } from "thirdweb/react";
// import { createThirdwebClient } from "thirdweb";
// import { BerachainChainId, HychainChainId, CHAIN_INFO } from "@/lib/consts";

// // Create the client
// export const client = createThirdwebClient({
//   clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
// });

// // Define chain configurations using the information from consts.ts
// const berachainConfig = {
//   id: BerachainChainId,
//   name: CHAIN_INFO[BerachainChainId].name,
//   rpc: [CHAIN_INFO[BerachainChainId].rpc],
//   nativeCurrency: {
//     name: "BERA",
//     symbol: "BERA",
//     decimals: 18,
//   },
//   blockExplorers: {
//     default: { name: "Berachain Explorer", url: "https://explorer.berachain.com" },
//   },
// };

// const hychainConfig = {
//   id: HychainChainId,
//   name: CHAIN_INFO[HychainChainId].name,
//   rpc: [CHAIN_INFO[HychainChainId].rpc],
//   nativeCurrency: {
//     name: "HYM",
//     symbol: "HYM",
//     decimals: 18,
//   },
//   blockExplorers: {
//     default: { name: "Hychain Explorer", url: "https://explorer.hychain.com" },
//   },
// };

// export const ConnectWallet = () => {
//   return (
//     <ConnectButton
//       client={client}
//       appMetadata={{
//         name: "Bera Horses",
//         url: "https://berahorses.com",
//       }}
//       supportedChains={[berachainConfig, hychainConfig]}
//     />
//   );
// }; 

import { DynamicWidget } from '../lib/dynamic'

export const ConnectWallet = () => {
  return (
    <div>
     <DynamicWidget />
    </div>
  );
};
