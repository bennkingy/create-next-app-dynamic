'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

export const FraRecipient = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Check localStorage for user preference
    const savedState = localStorage.getItem('fraRecipientOpen');
    if (savedState !== null) {
      setIsOpen(savedState === 'true');
    }
    
    // Add a slight delay before showing the component to ensure it slides in
    const timer = setTimeout(() => {
      setVisible(true);
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    // Save to localStorage
    localStorage.setItem('fraRecipientOpen', newState.toString());
  };

  return (
    <div 
      className="fixed right-0 top-1/2 z-50"
      style={{ 
        opacity: visible ? 1 : 0,
        transform: `translateY(-50%) ${visible ? 'translateX(0)' : 'translateX(100%)'}`,
        transition: 'opacity 800ms ease-out, transform 800ms ease-out',
        willChange: 'transform, opacity'
      }}
    >
      <div className="relative">
        {/* Open panel */}
        <div 
          className={`absolute right-0 top-0 bg-[#274450] p-3 rounded-lg rounded-br-none rounded-tr-none border-r-0 border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,.3)] flex flex-col items-center h-[92px] will-change-transform will-change-opacity transform-gpu transition-all duration-500 ease-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ 
            width: isOpen ? 'auto' : '0',
            transform: initialLoad ? 'translateX(100%)' : isOpen ? 'translateX(0)' : 'translateX(100%)'
          }}
        >
          <button 
            onClick={toggleOpen}
            className="absolute -top-1 right-1 text-white hover:opacity-80 text-lg font-bold z-5 transition-opacity duration-300"
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative w-full h-[35px] transform-gpu">
            <Image 
              src="/berachainlogoWhite.svg" 
              alt="Berachain logo" 
              fill 
              className="object-contain transform-gpu"
              priority
            />
          </div>
          <p className="text-white text-[13px] mt-2 font-openSans whitespace-nowrap"><span className="font-bold">RFA</span> Recipient</p>
        </div>
        
        {/* Closed panel */}
        <div 
          onClick={toggleOpen}
          className={`absolute right-0 top-0 bg-[#274450] p-2 w-[27px] h-[92px] rounded-lg rounded-br-none rounded-tr-none border-r-0 border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,.3)] flex items-center justify-center cursor-pointer will-change-transform will-change-opacity transform-gpu transition-all duration-500 ease-out ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ 
            transform: initialLoad ? 'translateX(100%)' : isOpen ? 'translateX(100%)' : 'translateX(0)'
          }}
        >
          <div className="rotate-90 text-white text-[12px] whitespace-nowrap font-openSans">
            <span className="font-bold">RFA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
