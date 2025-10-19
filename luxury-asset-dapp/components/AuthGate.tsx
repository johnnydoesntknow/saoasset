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
  const { user: storedUser, updateKYCStatus, setUser } = useUserStore();
  const [walletConfirmed, setWalletConfirmed] = useState(false);
  const [kycMockCompleted, setKycMockCompleted] = useState(false);

  useEffect(() => {
    // Check if KYC was previously completed
    if (storedUser?.kycStatus === 'APPROVED') {
      setKycMockCompleted(true);
    }
  }, [storedUser]);

  // Mock KYC completion
  const handleMockKYC = () => {
    updateKYCStatus('APPROVED' as any);
    setKycMockCompleted(true);
  };

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <GlassPanel variant="default" className="p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </GlassPanel>
      </div>
    );
  }

  // Step 1: Connect/Confirm Wallet
  if (!walletConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Theme Toggle in corner */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <GlassPanel variant="default" className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Luxury Assets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {authenticated ? 'Confirm your wallet to continue' : 'Connect your wallet to access exclusive premium assets'}
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
                onClick={() => setWalletConfirmed(true)}
              >
                Continue
              </Button>

              <button
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => {
                  logout();
                  setWalletConfirmed(false);
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
  }

  // Step 2: Complete KYC (Mock)
  if (!kycMockCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Theme Toggle in corner */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <GlassPanel variant="default" className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Identity Verification Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Complete KYC to access investment opportunities
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                🔧 KYC integration pending. Click below to simulate completion.
              </p>
            </div>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            className="w-full mb-2"
            onClick={handleMockKYC}
          >
            Complete KYC (Mock)
          </Button>

          <button
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => {
              setWalletConfirmed(false);
              logout();
            }}
          >
            Back to Wallet
          </button>
        </GlassPanel>
      </div>
    );
  }

  // Step 3: Show main app
  return <>{children}</>;
};