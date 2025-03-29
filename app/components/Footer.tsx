'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover } from './Popover';

export function Footer() {
  return (
    <footer className="bg-[#262628] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start">
          {/* Logo */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <Image src="/logo.png" alt="Bera Horses Logo" width={131} height={0} quality={100} className="mb-6 mt-3 sm:mt-0 mx-auto sm:mx-0" />
          </div>


          {/* Columns */}
          <div className="w-full md:w-3/4 flex flex-wrap justify-between">
            {/* Column 1 */}
            <div className="w-1/2sm:w-1/3 mb-6">
              <h3 className="font-bold text-lg mb-4 font-openSans">Links</h3>
              <div className="flex flex-col gap-4 text-sm">
                <Popover position="right" message="coming thoon">
                  <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Branding Kit</Link>
                </Popover>
                <Popover position="right" message="coming thoon">
                  <Link href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">Report a bug</Link>
                </Popover>
              </div>
            </div>

            {/* Column 2 */}
            <div className="w-1/2 sm:w-1/3 mb-6">
              <h3 className="font-bold text-lg mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://discord.com/invite/AzytBu3fgA" target="_blank" rel="noopener noreferrer">Discord</a></li>
                <li>
                  <a href="https://x.com/Bera Horses" target="_blank" rel="noopener noreferrer">X</a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="w-full sm:w-1/3 mb-6">
              <h3 className="font-bold text-lg mb-4 mt-8 sm:mt-0">Stores</h3>
              <div className="flex flex-col gap-4 items-start">
                <Popover message="coming thoon">
                  <Image
                    src="/app-store.png"
                    alt="App Store"
                    width={140}
                    height={40}
                    className="cursor-not-allowed opacity-50"
                  />
                </Popover>
                <Popover message="coming thoon">
                  <Image
                    src="/play-store.png"
                    alt="Play Store"
                    width={140}
                    height={40}
                    className="cursor-not-allowed opacity-50"
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-sm pb-28 sm:pb-20">
          <p>© {new Date().getFullYear()} Bera Horses. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}
