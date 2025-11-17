'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';
import { env } from '@/lib/config/env';
import { X } from 'lucide-react';
import { BrowserProvider, parseEther } from 'ethers';
import { useAccount } from 'wagmi';

interface SimplePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    price: number;
    description?: string;
  };
  onSuccess?: () => void;
}

export const SimplePaymentModal: React.FC<SimplePaymentModalProps> = ({
  isOpen,
  onClose,
  item,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { address, isConnected } = useAccount();

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handlePayment = async () => {
    if (!address || !isConnected) {
      setErrorMessage('Wallet not connected');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setIsProcessing(true);
    setStatus('processing');
    setErrorMessage('');

    try {
      // Check if window.ethereum exists
      if (!window.ethereum) {
        throw new Error('Please install MetaMask or another Web3 wallet');
      }

      // Connect to SAGE Network via wallet - double cast through unknown
      const provider = new BrowserProvider(window.ethereum as unknown as any);
      const signer = await provider.getSigner();

      // Verify we're on SAGE Network (Chain ID 403)
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 403) {
        throw new Error('Please switch to SAGE Network (Chain ID 403) in your wallet');
      }

      // TEST MODE: Send 10 SAGE (shows $150k in UI)
      const testAmount = parseEther('10'); // 10 SAGE
      
      console.log('🧪 Test Payment:', {
        from: address,
        to: env.blockchain.treasury.wallet,
        amount: '10 SAGE',
        uiDisplay: formatCurrency(item.price), // Shows $150k
      });

      // Send 10 SAGE to treasury
      const tx = await signer.sendTransaction({
        to: env.blockchain.treasury.wallet,
        value: testAmount,
      });

      console.log('📤 Transaction sent:', tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      console.log('⏳ Waiting for confirmation...');
      const receipt = await tx.wait();
      
      if (receipt && receipt.status === 1) {
        console.log('✅ Payment confirmed!');
        
        // Call backend to process return
        await processBackendReturn(tx.hash, address);
        
        setStatus('success');
        
        setTimeout(() => {
          onSuccess?.();
          onClose();
          setStatus('idle');
          setIsProcessing(false);
        }, 3000);
      } else {
        throw new Error('Transaction failed on blockchain');
      }
      
    } catch (err: any) {
      console.error('❌ Payment failed:', err);
      setStatus('error');
      
      // User-friendly error messages
      let message = err.message || 'Payment failed';
      if (message.includes('user rejected')) {
        message = 'Transaction cancelled by user';
      } else if (message.includes('insufficient funds')) {
        message = 'Insufficient SAGE balance (need 10 SAGE + gas)';
      } else if (message.includes('Chain ID')) {
        message = 'Please switch to SAGE Network (Chain ID 403)';
      }
      
      setErrorMessage(message);
      setIsProcessing(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const processBackendReturn = async (txHash: string, userWallet: string) => {
    try {
      console.log('📞 Calling backend...');
      const response = await fetch('/api/test-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txHash,
          userWallet,
          amount: 10,
        }),
      });

      const data = await response.json();
      console.log('📨 Backend response:', data);
      
      if (data.success) {
        console.log('💰 Treasury will send 11 SAGE back to:', userWallet);
      }
    } catch (error) {
      console.error('⚠️ Backend call failed:', error);
      // Don't fail the whole payment if backend fails
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      setStatus('idle');
      setErrorMessage('');
      setTxHash('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <GlassPanel
        variant="default"
        blur="md"
        className="relative w-full max-w-md p-6"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Confirm Payment
        </h2>

        <div className="space-y-6">
          {/* Item Details */}
          <GlassPanel variant="default" className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {item.description}
              </p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Amount</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(item.price)}
              </span>
            </div>
          </GlassPanel>

          {/* Test Mode Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start">
              <span className="text-2xl mr-3">🧪</span>
              <div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Test Mode Active
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  You will send <strong>10 SAGE</strong> to treasury.
                  <br />
                  Treasury will return <strong>11 SAGE</strong> to confirm it works.
                  <br />
                  Net result: +1 SAGE (minus gas fees)
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1 font-medium">Treasury Wallet:</p>
              <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
                {env.blockchain.treasury.wallet}
              </p>
            </div>
            
            <div className="text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1 font-medium">Your Wallet:</p>
              <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
                {address || 'Not connected'}
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'processing' && (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Processing payment...
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Please confirm in your wallet
              </p>
              {txHash && (
                <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono break-all">
                    {txHash}
                  </p>
                </div>
              )}
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Payment Successful!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Treasury will send 11 SAGE back shortly
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Check your wallet in a few moments
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                Payment Failed
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {status === 'idle' && (
            <div className="flex space-x-3 pt-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handlePayment}
                disabled={isProcessing || !isConnected}
              >
                Send 10 SAGE
              </Button>
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
};