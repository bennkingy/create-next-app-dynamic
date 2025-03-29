import type { Metadata } from "next";
import "./globals.css";
import { Fredoka, Open_Sans } from 'next/font/google'
import { Footer } from "./components/Footer";
import Menu from "./components/Menu";
import { mainNavigation } from "@/lib/consts";
import Image from "next/image";
import { FraRecipient } from "@/components/FraRecipient";
import { MobileMenuProvider } from "@/components/MobileMenuProvider";
import {
	DynamicContextProvider,
	EthereumWalletConnectors,
} from '../lib/dynamic'

export const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka'
});

export const open_Sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans'
})

// Create the client
// export const client = createThirdwebClient({
//   clientId: "849ab365b092f42ef0bf7773111cf5ae",
// });

export const metadata: Metadata = {
  title: "Bera Horses - Step into the world of Alpheria",
  description: "Step into the world of Alpheria in this expansive horse racing role playing game on Berachain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${open_Sans.variable} ${fredoka.variable}`}>
      <body suppressHydrationWarning={false} className="overflow-x-hidden">
        <DynamicContextProvider
					settings={{
						environmentId: process.env.DYNAMIC_PROJECT_ID || '',
						walletConnectors: [EthereumWalletConnectors],
						walletConnectorSettings: {
							email: {
								requireVerification: false
							}
						}
					}}
				>
          <div className="bg-brand-blue text-white p-2 text-center font-openSans text-[14px] font-light block md:hidden">
            <strong className="uppercase font-bold"> Alpha demo live</strong> - Earn $BERA
            <span className="inline-block w-2 h-2 ml-1 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <div className="bg-brand-blue text-white p-2 text-center font-openSans text-[14px] font-light hidden md:block">
            <strong className="uppercase font-bold">Alpha demo live</strong> - Download for PC and earn $BERA
            <span className="inline-block w-2 h-2 ml-1 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <MobileMenuProvider>
            <FraRecipient />
            <div className="flex flex-col items-center mt-8">
              <div className="relative mb-8">
                <div className="block md:hidden w-[150px] h-[102px]">
                  <Image src="/logo.png" alt="Bera Horses Logo" fill />
                </div>
                <div className="hidden md:block w-[188px] h-[128px]">
                  <Image src="/logo.png" alt="Bera Horses Logo" fill />
                </div>
              </div>
              <div className="-mt-4">
                {/* hidden sm:block */}
                <Menu menuItems={mainNavigation} orientation="horizontal" center />
              </div>
            </div>
            {children}
            <Footer />
          </MobileMenuProvider>
          </DynamicContextProvider>
      </body>
    </html >
  );
}
