'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import CustomImage from './CustomImage';
// import { Popover } from './Popover';

const NoticeBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state and initial scroll position
    setIsMounted(true);

    // Skip if window is not defined
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      setIsVisible(scrollY > 300);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render during SSR
  if (typeof window === 'undefined' || !isMounted) {
    return null;
  }

  return (
    <div
      style={{
        boxShadow: '0px -4px 12px 0px #00000026'
      }}
      className={`bg-white fixed z-50 bottom-0 left-0 w-full shadow-lg text-black text-center h-[60px] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
    >

      <div className='container flex justify-between items-center h-full'>
        <CustomImage src='/fix.png' width={143} height={92} alt='Notice Bar' style={{ marginTop: -32 }} className="mr-10" />
        <div className="flex items-center space-x-4 mr-auto">
          <h1 className="font-bold text-brand-orange font-heading text-[20px] lg:block hidden">Get to the starting line!</h1>
          <p className='font-body md:block hidden'>Download the PC version and earn $BERA.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Popover message="coming thoon"> */}
          <Button
            type="primary"
            disabled
            target="_blank"
            href="https://drive.google.com/file/d/13uHIUL-cty9mzmy6-KhDyMF486e18QST"
            label="Download"
            className="max-w-[200px] max-h-[40px] hidden md:flex"
          />
          <Button
            type="primary"
            disabled
            target="_blank"
            href="https://drive.google.com/file/d/13uHIUL-cty9mzmy6-KhDyMF486e18QST"
            label="Download Game"
            className="max-w-[200px] max-h-[40px] md:hidden flex"
          />
          {/* </Popover> */}
        </div>
      </div>
    </div>
  );
};

export default NoticeBar;
