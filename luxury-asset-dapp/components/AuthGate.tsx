'use client';

import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useUserStore } from '@/lib/store/useStore';
import { formatAddress } from '@/lib/utils/format';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { setUser } = useUserStore();
  const [walletConfirmed, setWalletConfirmed] = useState(false);

  useEffect(() => {
    // Auto-confirm if wallet was previously connected and authenticated
    const storedConfirmation = localStorage.getItem('wallet-confirmed');
    if (storedConfirmation === 'true' && authenticated && user?.wallet?.address) {
      setWalletConfirmed(true);
      // Set user data
      setUser({
        id: user.id,
        walletAddress: user.wallet.address,
        email: user.email?.address,
        kycStatus: 'APPROVED' as any,
        role: 'USER' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [authenticated, user, setUser]);

  const handleContinue = () => {
    setWalletConfirmed(true);
    localStorage.setItem('wallet-confirmed', 'true');
    
    // Set user in store
    if (user?.wallet?.address) {
      setUser({
        id: user.id,
        walletAddress: user.wallet.address,
        email: user.email?.address,
        kycStatus: 'APPROVED' as any,
        role: 'USER' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <GlassPanel variant="default" className="p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </GlassPanel>
      </div>
    );
  }

  // If authenticated and confirmed, show app
  if (authenticated && walletConfirmed) {
    return <>{children}</>;
  }

  // Connect/Confirm Wallet screen
  return (
// In AuthGate.tsx, update the wrapper div's background:
<div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-950">      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <GlassPanel variant="default" className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-200 dark:border-gray-700">
            <img 
              src="/images/logos/iopn.jpg" 
              alt="IOPn" 
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to IOPn Luxury
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {authenticated ? 'Confirm your wallet to continue' : 'Connect your wallet to access exclusive residency and investment opportunities'}
          </p>
        </div>
        
        {authenticated && user?.wallet?.address ? (
          <>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700 dark:text-green-400 font-medium">
                  Wallet Connected
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {formatAddress(user.wallet.address)}
              </p>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              className="w-full mb-2"
              onClick={handleContinue}
            >
              Enter Platform
            </Button>

            <button
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => {
                logout();
                setWalletConfirmed(false);
                localStorage.removeItem('wallet-confirmed');
              }}
            >
              Use Different Wallet
            </button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => login()}
            >
              Connect Wallet
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              By connecting, you agree to our Terms of Service and Privacy Policy
            </p>
          </>
        )}
      </GlassPanel>
    </div>
  );
};