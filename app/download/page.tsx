'use client'

import { useState, useEffect } from 'react';
import TextHeading from '../components/Text';
import Divider from '../components/Divider';
import Image from 'next/image';
import Button from '../components/Button';

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Password cannot be empty');
      return;
    }
    
    setIsAuthenticating(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setError('');
        
        // Store authentication in session storage so it persists during the session
        // but clears when the browser is closed
        sessionStorage.setItem('downloadAuthenticated', 'true');
      } else {
        setError(data.message || 'Invalid password. Please try again.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Failed to authenticate. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  // Check if user was already authenticated in this session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('downloadAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download start
    setTimeout(() => {
      // Download logic would go here
      // For example: window.location.href = '/game-files/your-game-installer.exe';
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-hidden mt-5">
      {/* Top Section */}
      <div className="relative bg-[#DAE8F0] text-gray-800 py-24 z-2">
        <div className="relative text-gray-800 pb-24 px-6 z-10">
          <div className="relative container text-center">
            <TextHeading text="Download Game" type="heading" style="text-heading-1" className="text-center" />
            <p className="mt-4 text-lg max-w-xl mx-auto">
            Unleash the magic of Alpheria, choose your path and discover your destiny.
            </p>
          </div>
        </div>

        {/* Background Design */}
        <div className="relative">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="absolute top-0 left-0 w-full h-12"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 0,50" className="fill-[#DAE8F0]" />
          </svg>
          <div className="w-full h-[100px] -mb-[100px] relative bg-[#FFFFFF] [clip-path:polygon(100%_00%,0%_100%,100%_100%)]"/>
        </div>
        <div className="absolute bottom-0 z-2 w-full h-[600px] mt-4 -mb-10 sm:mb-0">
          <Image
            src="/right.png"
            alt="Hero banner"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </div>

      <div className="container mx-auto p-10 text-center">
        <div className="mx-auto w-fit">
          {!isAuthenticated ? (
            <div className="bg-white rounded-lg p-10 shadow-lg">
              <TextHeading 
                text="Authentication Required" 
                type="heading" 
                style="text-heading-2" 
                className="mb-5 text-brand-blue"
              />
              
              <p className="text-gray-600 mb-6">
                Please enter the password to access the download area.
              </p>
              
              <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
                <div className="w-full max-w-md mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                    disabled={isAuthenticating}
                  />
                </div>
                
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <Button 
                  label={isAuthenticating ? "Verifying..." : "Submit"}
                  type="primary"
                  buttonType="submit"
                  className="w-full max-w-md"
                  disabled={isAuthenticating}
                />
              </form>
            </div>
          ) : (
            <>
              <TextHeading 
                text="Ready to Play?" 
                type="heading" 
                style="text-heading-2" 
                className="mb-6 text-brand-blue"
              />
              
              <p className="text-lg text-gray-600 font-openSans mb-8">
                Our game offers an immersive experience with stunning graphics and engaging gameplay.
                Download now to join thousands of players already enjoying the adventure!
              </p>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <p className="font-openSans font-medium mb-4">System Requirements:</p>
                <ul className="text-left text-gray-600 font-openSans space-y-2">
                  <li>• Windows 10 64-bit</li>
                  <li>• Intel Core i5 or equivalent</li>
                  <li>• 8GB RAM</li>
                  <li>• 15GB available storage</li>
                  <li>• DirectX 11 compatible graphics card</li>
                </ul>
              </div>
              
              <Button 
                label={isDownloading ? 'Starting Download...' : 'DOWNLOAD GAME'}
                type="primary"
                buttonType="button"
                disabled={isDownloading}
                onClick={handleDownload}
                className="px-8 py-4 text-xl"
              />
              
              <p className="mt-4 text-sm text-gray-500">
                Version 1.0.2 | Last Updated: June 15, 2023 | 14.2 GB
              </p>
            </>
          )}
        </div>
      </div>
      
      <Divider color="black" className="mt-12 -mb-1" />
    </div>
  );
} 