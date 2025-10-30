'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatAddress } from '@/lib/utils/format';
import { env } from '@/lib/config/env';
import { usePrivy } from '@privy-io/react-auth';
import { X } from 'lucide-react';

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
  const { user } = usePrivy();

  const handlePayment = async () => {
    if (!user?.wallet?.address) {
      alert('Wallet not connected');
      return;
    }

    setIsProcessing(true);
    setStatus('processing');

    try {
      // Simulate payment processing
      // In production, this would integrate with your smart contracts
      console.log('Processing payment:', {
        from: user.wallet.address,
        to: env.blockchain.treasury.wallet,
        amount: item.price,
        item: item.name,
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus('success');
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
        setStatus('idle');
        setIsProcessing(false);
      }, 1500);
    } catch (err: any) {
      console.error('Payment failed:', err);
      setStatus('error');
      setIsProcessing(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      setStatus('idle');
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
          Confirm Purchase
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

          {/* Treasury Info */}
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Payment will be sent to treasury:</p>
              <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {formatAddress(env.blockchain.treasury.wallet)}
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                ⚠️ Test Mode: This is a simulated transaction. In production, this will process real USDC/USDT payments.
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'processing' && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Processing payment...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-4 text-green-600">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold">Payment Successful!</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-4 text-red-600">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold">Payment Failed. Please try again.</p>
            </div>
          )}

          {/* Action Buttons */}
          {status === 'idle' && (
            <div className="flex space-x-3">
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
                disabled={isProcessing}
              >
                Confirm Payment
              </Button>
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
};