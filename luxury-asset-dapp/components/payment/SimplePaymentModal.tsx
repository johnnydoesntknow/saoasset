'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatAddress } from '@/lib/utils/format';
import { env } from '@/lib/config/env';
import { usePrivy } from '@privy-io/react-auth';

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
  const { user, sendTransaction } = usePrivy();

  const handlePayment = async () => {
    if (!user?.wallet?.address) {
      alert('Wallet not connected');
      return;
    }

    setIsProcessing(true);
    setStatus('processing');

    try {
      // In production, this would be a USDC/USDT transfer
      // For now, simplified ETH transfer to treasury
      const tx = await sendTransaction({
        to: env.blockchain.treasury.wallet,
        value: String(item.price * 1e18), // Convert to wei (simplified)
        data: '0x',
      });

      console.log('Transaction sent:', tx);
      setStatus('success');
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (err: any) {
      console.error('Payment failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isProcessing && onClose()}
      title="Confirm Purchase"
      size="md"
      closeOnOverlayClick={!isProcessing}
    >
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
            <p className="font-semibold">Payment Successful!</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-4 text-red-600">
            <p className="font-semibold">Payment Failed. Please try again.</p>
          </div>
        )}

        {/* Action Buttons */}
        {status === 'idle' && (
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onClose}
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
    </Modal>
  );
};