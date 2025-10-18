// components/payment/TransactionStatus.tsx
'use client';

import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PaymentStatus, StablecoinType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2,
  ExternalLink,
  Copy
} from 'lucide-react';

interface TransactionStatusProps {
  status: PaymentStatus;
  amount: number;
  stablecoin: StablecoinType | null;
  transactionHash?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  amount,
  stablecoin,
  transactionHash = '0x1234...5678', // Mock transaction hash
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case PaymentStatus.PENDING:
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bg: 'bg-yellow-100 dark:bg-yellow-900/20',
          title: 'Transaction Pending',
          message: 'Waiting for wallet confirmation...',
          showSpinner: true,
        };
      case PaymentStatus.CONFIRMING:
        return {
          icon: Loader2,
          color: 'text-blue-500',
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          title: 'Confirming Transaction',
          message: 'Transaction submitted. Waiting for blockchain confirmation...',
          showSpinner: true,
        };
      case PaymentStatus.CONFIRMED:
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bg: 'bg-green-100 dark:bg-green-900/20',
          title: 'Payment Successful!',
          message: 'Your purchase has been completed successfully.',
          showSpinner: false,
        };
      case PaymentStatus.FAILED:
        return {
          icon: XCircle,
          color: 'text-red-500',
          bg: 'bg-red-100 dark:bg-red-900/20',
          title: 'Transaction Failed',
          message: 'The transaction could not be completed. Please try again.',
          showSpinner: false,
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-500',
          bg: 'bg-gray-100 dark:bg-gray-800',
          title: 'Initializing',
          message: 'Preparing transaction...',
          showSpinner: true,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Status Icon */}
      <div className="text-center">
        <div className={`inline-flex p-4 rounded-full ${config.bg} mb-4`}>
          <Icon 
            className={`w-16 h-16 ${config.color} ${
              config.showSpinner ? 'animate-spin' : ''
            }`} 
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {config.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {config.message}
        </p>
      </div>

      {/* Transaction Details */}
      <GlassPanel variant="light" className="p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Amount</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(amount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {stablecoin || 'N/A'}
          </span>
        </div>
        {(status === PaymentStatus.CONFIRMING || status === PaymentStatus.CONFIRMED) && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Transaction</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-gray-900 dark:text-white">
                {transactionHash}
              </span>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Copy className="w-4 h-4" />
              </button>
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </GlassPanel>

      {/* Progress Bar */}
      {config.showSpinner && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div className="bg-primary-500 h-full rounded-full animate-pulse" 
               style={{ width: status === PaymentStatus.CONFIRMING ? '66%' : '33%' }} />
        </div>
      )}
    </div>
  );
};