import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faqs() {
  return (
    <Accordion type="single" collapsible className="w-full text-white font-sans">
      <AccordionItem value="item-1">
        <AccordionTrigger>How/when can I mint a Stallion Horse on Berachain?</AccordionTrigger>
        <AccordionContent>
          If you staked a genesis Horse(s) on ETH before 20 Sept 2024, you can claim a free Stallion 1:1 with your Genesis Horses by minting directly on Kingdomly. Mint date has not been announced yet.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How can I test and earn $BERA in game?</AccordionTrigger>
        <AccordionContent>
          Please download the Alpha game from this website only, and run the .exe file. Create or import a wallet and start earning $BERA rewards for winning races.
          <br /><br />
          <a href="https://drive.google.com/file/d/13uHIUL-cty9mzmy6-KhDyMF486e18QST/view?usp=sharing" target="_blank" rel="noopener" className="text-brand-orange font-openSans font-bold">
            Download game
          </a>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are Bera Horses official NFT collections?</AccordionTrigger>
        <AccordionContent>
          Genesis Horses on Hychain (Playable in our Hytopia game, not in Alpheria):<br /><br />
          <a href="https://hydex.gg/collection/?c=0x1DaCe27A26cda22a009fe2C000d32E178213c3Ca" target="_blank" rel="noopener" className="text-brand-orange font-openSans font-bold">
            View collection
          </a>
          <br /><br />
          Horse Heads on Berachain (Profile picture collection - just for vibes):<br /><br />
          <a href="https://magiceden.io/collections/berachain/0x716d419db31941b49c77359c694caeecd27d329d" target="_blank" rel="noopener" className="text-brand-orange font-openSans font-bold">
            View collection
          </a>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>When will $HAY be available? And on what chains?</AccordionTrigger>
        <AccordionContent>
          $HAY will be available on Berachain mainnet thoon. We will use the native token on Hychain.
        </AccordionContent>
      </AccordionItem>      <AccordionItem value="item-4">
        <AccordionTrigger>RFA Allocation</AccordionTrigger>
        <AccordionContent>
          Berachain has granted roughly 45k $BERA tokens. 15% has already been distributed to testnet users, and a further 70% is allocated to our community via ongoing rewards. These rewards will be distributed through playing our game, community engagement and marketing.
        </AccordionContent>
      </AccordionItem> </Accordion>
  )
}
