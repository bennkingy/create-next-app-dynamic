'use client';

import { useState } from 'react';
import { 
  DynamicWidget, 
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import TextHeading from '../components/Text';
import Button from '@/app/components/Button';

export default function VerifyPage() {
  const [challengeMessage, setChallengeMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [showSignature, setShowSignature] = useState(false);
  const [isSigningMessage, setIsSigningMessage] = useState(false);

  // Debug logger function
  const debugLog = (...args: unknown[]) => {
    console.log("[DEBUG]", ...args);
  };

  return (
      <VerifyPageContent 
        challengeMessage={challengeMessage}
        setChallengeMessage={setChallengeMessage}
        signature={signature}
        setSignature={setSignature}
        showSignature={showSignature}
        setShowSignature={setShowSignature}
        isSigningMessage={isSigningMessage}
        setIsSigningMessage={setIsSigningMessage}
        debugLog={debugLog}
      />
  );
}

interface VerifyPageContentProps {
  challengeMessage: string;
  setChallengeMessage: (value: string) => void;
  signature: string;
  setSignature: (value: string) => void;
  showSignature: boolean;
  setShowSignature: (value: boolean) => void;
  isSigningMessage: boolean;
  setIsSigningMessage: (value: boolean) => void;
  debugLog: (...args: unknown[]) => void;
}

// Add interfaces to help with type checking
interface WalletWithSignMessage {
  signMessage: (message: string) => Promise<string>;
}

interface WalletClientWithSignMessage {
  signMessage: (params: { message: string }) => Promise<string>;
}

interface WalletWithClient {
  getWalletClient: () => Promise<WalletClientWithSignMessage>;
}

function VerifyPageContent({ 
  challengeMessage, setChallengeMessage,
  signature, setSignature,
  showSignature, setShowSignature,
  isSigningMessage, setIsSigningMessage,
  debugLog
}: VerifyPageContentProps) {
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const isConnected = !!primaryWallet;
  const walletAddress = primaryWallet?.address || '';

  const handleSignMessage = async () => {
    if (!isConnected || !primaryWallet) {
      alert("Please connect your wallet first.");
      return;
    }

    const challenge = challengeMessage.trim();
    if (!challenge) {
      alert("Please paste the challenge message from Discord before signing.");
      return;
    }

    debugLog("Signing challenge:", challenge);
    try {
      setIsSigningMessage(true);
      
      // Use the dynamic-context to sign the message with proper type checking
      const wallet = primaryWallet as unknown;
      let sig: string;
      
      if (typeof (wallet as WalletWithSignMessage).signMessage === 'function') {
        sig = await (wallet as WalletWithSignMessage).signMessage(challenge);
      } else if (typeof (wallet as WalletWithClient).getWalletClient === 'function') {
        const walletClient = await (wallet as WalletWithClient).getWalletClient();
        sig = await walletClient.signMessage({ message: challenge });
      } else {
        throw new Error("Wallet doesn't support message signing");
      }

      debugLog("Signature obtained:", sig);
      if (!sig || sig.length < 10) {
        alert("Something went wrong: signature seems invalid or empty.");
        return;
      }

      setSignature(sig);
      setShowSignature(true);

      // Also show an alert so the user definitely sees it
      alert(`Signature:\n${sig}\n\nCopy it and go to Discord to type !signature <YOUR_SIGNATURE>`);
    } catch (err: unknown) {
      console.error("[DEBUG] Error signing message:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert(`Failed to sign message: ${errorMessage}`);
    } finally {
      setIsSigningMessage(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-openSans p-10">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md">
        <TextHeading
              className="text-brand-orange max-w-2xl text-center mx-auto p-0 mb-10"
              text="NFT Wallet Verification."
              style="text-heading-1"
              type="heading"
            />
        <ol className="list-decimal pl-6 mb-4 text-left">
          <li>In Discord, run <code>!verify chain wallet</code>. Copy the challenge message.</li>
          <li>Connect your wallet using the button below.</li>
          <li>Paste the challenge into the box below.</li>
          <li>Click <strong>Sign Message</strong> and approve in your wallet.</li>
          <li>Copy the signature (shown below) and go back to Discord to type <code>!signature &lt;signature&gt;</code>.</li>
        </ol>

        {/* Dynamic's wallet connection widget */}
        <div className="mb-4">
          {isConnected ? (
            <div className="flex flex-col gap-2">
              <p className="text-center break-all">Connected Wallet: {walletAddress}</p>
              <button 
                onClick={handleLogOut}
                type="button"
                className="w-full p-2 rounded bg-[#f44336] hover:bg-[#d32f2f]"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <DynamicWidget variant="modal" />
            </div>
          )}
        </div>
        
        <label htmlFor="challengeMessage" className="block mt-3 text-left">
          Challenge Message (pasted from Discord):
        </label>
        <textarea 
          id="challengeMessage" 
          rows={4} 
          placeholder="e.g. Verify Discord account 123456..."
          className="w-full p-2 rounded my-2 text-black"
          value={challengeMessage}
          onChange={(e) => setChallengeMessage(e.target.value)}
        />

        <Button 
          onClick={handleSignMessage}
          type="primary"
          disabled={isSigningMessage || !isConnected}
          className={'w-full'}
          label={isSigningMessage ? 'Signing...' : 'Sign Message'}
        />

        {showSignature && (
          <div className="mt-3 p-3 bg-[#222] rounded break-all">
            <p>Signature:</p>
            <p className="font-mono">{signature}</p>
            <p className="mt-2 text-sm">Copy this entire string and paste it in Discord using: !signature &lt;YOUR_SIGNATURE&gt;</p>
          </div>
        )}
      </div>
    </div>
  );
}
