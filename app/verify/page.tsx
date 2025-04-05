'use client';

import { useState } from 'react';
import { 
  DynamicWidget, 
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import TextHeading from '../components/Text';
import Button from '@/app/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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

interface WalletClientWithSignMessage {
  signMessage: (params: { message: string }) => Promise<string>;
}

// Extended wallet connector interfaces for better type checking
interface EthersSigner {
  signMessage: (message: string) => Promise<string>;
}

interface EthersConnector {
  signer?: EthersSigner;
}

interface WagmiConnector {
  signMessage: (params: { message: string }) => Promise<string>;
}

// Define provider interface
interface EthereumProvider {
  request: (args: {method: string; params: unknown[]}) => Promise<string>;
}

interface ExtendedWalletConnector {
  signMessage?: (message: string) => Promise<string>;
  ethers?: EthersConnector;
  wagmi?: WagmiConnector;
  provider?: EthereumProvider;
}

interface ExtendedWallet {
  address: string;
  signMessage?: (message: string) => Promise<string>;
  getWalletClient?: () => Promise<WalletClientWithSignMessage>;
  connector?: ExtendedWalletConnector;
}

// Form schema
const formSchema = z.object({
  challengeMessage: z.string().min(1, {
    message: "Please paste the challenge message from Discord before signing.",
  }),
});

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
  
  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      challengeMessage: challengeMessage,
    },
  });

  // Keep local state in sync with form
  form.watch((values) => {
    if (values.challengeMessage !== undefined) {
      setChallengeMessage(values.challengeMessage);
    }
  });

  const handleSignMessage = async () => {
    if (!isConnected || !primaryWallet) {
      alert("Please connect your wallet first.");
      return;
    }

    const valid = await form.trigger();
    if (!valid) return;

    const challenge = form.getValues().challengeMessage.trim();
    if (!challenge) {
      alert("Please paste the challenge message from Discord before signing.");
      return;
    }

    debugLog("Signing challenge:", challenge);
    try {
      setIsSigningMessage(true);
      
      // Cast the wallet to our extended type for better type checking
      const extendedWallet = primaryWallet as unknown as ExtendedWallet;
      let sig: string;
      
      try {
        // First attempt using the primaryWallet.signMessage method
        if (typeof extendedWallet.signMessage === 'function') {
          debugLog("Using primaryWallet.signMessage");
          sig = await extendedWallet.signMessage(challenge);
        } 
        // Next try using the wallet connector directly
        else if (extendedWallet.connector && typeof extendedWallet.connector.signMessage === 'function') {
          debugLog("Using primaryWallet.connector.signMessage");
          sig = await extendedWallet.connector.signMessage(challenge);
        }
        // Try getting a wallet client
        else if (typeof extendedWallet.getWalletClient === 'function') {
          debugLog("Using getWalletClient().signMessage");
          const walletClient = await extendedWallet.getWalletClient();
          sig = await walletClient.signMessage({ message: challenge });
        }
        // Access directly via connector's ethers signer
        else if (extendedWallet.connector?.ethers?.signer && typeof extendedWallet.connector.ethers.signer.signMessage === 'function') {
          debugLog("Using connector.ethers.signer.signMessage");
          sig = await extendedWallet.connector.ethers.signer.signMessage(challenge);
        }
        // Use Dynamic's new standard message signing API
        else if (extendedWallet.connector?.wagmi?.signMessage) {
          debugLog("Using connector.wagmi.signMessage");
          sig = await extendedWallet.connector.wagmi.signMessage({
            message: challenge,
          });
        }
        else {
          throw new Error("Could not find a supported signing method");
        }
      } catch (signError) {
        debugLog("Error in primary signing methods:", signError);
        
        // Last resort: try personal_sign with standard Ethereum methods
        try {
          debugLog("Attempting personal_sign as fallback");
          // Using provider directly as fallback
          const provider = extendedWallet.connector?.provider || (window as {ethereum?: EthereumProvider}).ethereum;
          
          if (provider && typeof provider.request === 'function') {
            sig = await provider.request({
              method: 'personal_sign',
              params: [challenge, extendedWallet.address]
            });
          } else {
            throw new Error("No provider available for personal_sign");
          }
        } catch (fallbackError: unknown) {
          const errorMessage = fallbackError instanceof Error 
            ? fallbackError.message 
            : 'Unknown error during signing';
          throw new Error(`All signing methods failed: ${errorMessage}`);
        }
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

  const copySignatureToClipboard = () => {
    if (signature) {
      navigator.clipboard.writeText(signature)
        .then(() => {
          alert('Signature copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-openSans m-5 my-12 mb-20">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md">
        <TextHeading
              className="text-brand-orange max-w-2xl text-center mx-auto p-0 mb-10"
              text="Discord Wallet Verification"
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
      null
          ) : (
            <div className="flex justify-center">
              <DynamicWidget variant="modal" />
            </div>
          )}
        </div>
        
        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSignMessage();
          }} className="space-y-4">

{!signature && (
            <FormField
              control={form.control}
              name="challengeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Message (pasted from Discord):</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g. Verify Discord account 123456..."
                      rows={4}
                      className="w-full text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            )}

            {!signature && (
              <Button 
                type="primary"
                className="w-full"
                disabled={isSigningMessage || !isConnected}
                label={isSigningMessage ? 'Signing...' : 'Sign Message'}
                buttonType="submit"
              />
            )}
          </form>
        </Form>

        {showSignature && (
          <div className="">
            <Button 
              type="primary"
              className="w-full mt-6"
              onClick={copySignatureToClipboard}
              label="Copy Signature"
              buttonType="button"
            />
          </div>
        )}
      </div>
    </div>
  );
}