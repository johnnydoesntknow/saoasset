'use client';

import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { Wallet, Shield, CheckCircle, ArrowRight, Loader2, Check } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <GlassPanel variant="dark" className="p-8">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </GlassPanel>
      </div>
    );
  }

  // Step 1: Connect/Confirm Wallet
  if (!walletConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <GlassPanel variant="dark" className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Luxury Assets</h1>
            <p className="text-gray-400">
              {authenticated ? 'Confirm your wallet to continue' : 'Connect your wallet to access exclusive premium assets'}
            </p>
          </div>
          
          {authenticated && user?.wallet?.address ? (
            <>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">
                    Wallet Connected
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {formatAddress(user.wallet.address)}
                </p>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                className="w-full mb-2"
                onClick={() => setWalletConfirmed(true)}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Continue
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  setWalletConfirmed(false);
                }}
              >
                Use Different Wallet
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => login()}
                icon={<Wallet className="w-5 h-5" />}
              >
                Connect Wallet
              </Button>

              <p className="text-xs text-gray-500 mt-4">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <GlassPanel variant="dark" className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Identity Verification Required</h2>
            <p className="text-gray-400 mb-4">Complete KYC to access investment opportunities</p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-300">
                🔧 KYC integration pending. Click below to simulate completion.
              </p>
            </div>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            className="w-full mb-2"
            onClick={handleMockKYC}
            icon={<CheckCircle className="w-5 h-5" />}
          >
            Complete KYC (Mock)
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setWalletConfirmed(false);
              logout();
            }}
          >
            Back to Wallet
          </Button>
        </GlassPanel>
      </div>
    );
  }

  // Step 3: Show main app
  return <>{children}</>;
};
