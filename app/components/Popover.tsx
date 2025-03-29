'use client';

import React from 'react';
import Image from 'next/image';

type PopoverProps = {
  children: React.ReactNode;
  message: string;
  position?: 'top' | 'right' | 'left';
}

export function Popover({ children, message, position = 'top' }: PopoverProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowPositionClasses = {
    top: 'left-1/2 -translate-x-1/2 top-full -mt-1',
    right: 'top-1/2 -translate-y-1/2 -left-1',
    left: 'top-1/2 -translate-y-1/2 -right-1',
  };

  const arrowRotationClasses = {
    top: 'rotate-45',
    right: 'rotate-[225deg]',
    left: 'rotate-45',
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute hidden group-hover:block ${positionClasses[position]}`}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2 whitespace-nowrap border border-gray-200"
        >
          <Image
            src="/icons/disabled.svg"
            alt="Disabled icon"
            width={16}
            height={16}
            className="text-red-500"
          />
          <span className="text-gray-700 pr-4 font-bold uppercase open-sans text-xs">
            {message}
          </span>
        </div>
        <div
          className={`absolute ${arrowPositionClasses[position]}`}
        >
          <div
            className={`w-2 h-2 bg-white transform origin-center border-r border-b border-gray-200 ${arrowRotationClasses[position]}`}
          />
        </div>
      </div>
    </div>
  );
} 