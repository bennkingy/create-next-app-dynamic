"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MobileMenu, MobileMenuToggle } from "./MobileMenu";
import { ConnectWallet } from "./ConnectWallet";

interface MobileMenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isOpen: false,
  toggleMenu: () => { },
});

export const useMobileMenu = () => useContext(MobileMenuContext);

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, toggleMenu]);

  return (
    <MobileMenuContext.Provider value={{ isOpen, toggleMenu }}>
      <div className="relative">
        <header className="relative top-0 right-0 z-40 flex items-baseline p-4 w-full justify-end -mb-[97px] h-[80px]">
          <div className="hidden lg:block h-[80px]">
            <ConnectWallet />
          </div>
          <div className="lg:hidden">
            <MobileMenuToggle isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
        </header>
        <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        {children}
      </div>
    </MobileMenuContext.Provider>
  );
}; 