"use client";

import { useEffect } from "react";
import Link from "next/link";
import { mainNavigation } from "@/lib/consts";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ConnectWallet } from "@/app/components/ConnectWallet";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
  const pathname = usePathname();
  
  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-brand-blue z-50 flex flex-col"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-4 flex justify-end">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="relative w-[120px] h-[82px]">
              <Image src="/logo.png" alt="Bera Horses Logo" fill />
            </div>
          </div>
          
          <motion.nav 
            className="flex flex-col items-center justify-center flex-grow"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {mainNavigation.map((item) => (
              <motion.div
                key={item.href}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mb-8"
              >
                <Link href={item.href}>
                  <span 
                    className={`text-3xl font-fredoka font-medium ${
                      pathname === item.href ? "text-white" : "text-gray-300 hover:text-white"
                    } transition-colors duration-200`}
                  >
                    {item.label}
                  </span>
                </Link>
                {pathname === item.href && (
                  <motion.div 
                    className="h-[2px] bg-orange-500 mt-1"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.nav>
          
          <div className="flex flex-col items-center mb-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <ConnectWallet />
            </motion.div>
          </div>
          
          <div className="text-white text-center pb-8">
            <p className="text-sm opacity-70">© 2025 Bera Horses. All rights reserved.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileMenuToggle: React.FC<{ isOpen: boolean; toggleMenu: () => void }> = ({ 
  isOpen, 
  toggleMenu 
}) => {
  return (
    <button
      onClick={toggleMenu}
      className="text-black bg-white rounded-full p-2 shadow-md focus:outline-none lg:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {isOpen ? (
          <>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </>
        ) : (
          <>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </>
        )}
      </svg>
    </button>
  );
}; 