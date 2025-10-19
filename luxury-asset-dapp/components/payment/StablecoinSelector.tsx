// components/payment/StablecoinSelector.tsx
'use client';

import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { StablecoinType } from '@/lib/types';
import { env } from '@/lib/config/env';
import { formatCurrency } from '@/lib/utils/format';
import { CheckCircle, Circle, DollarSign } from 'lucide-react';

interface StablecoinSelectorProps {
  selected: StablecoinType | null;
  onSelect: (type: StablecoinType) => void;
  amount: number;
}

export const StablecoinSelector: React.FC<StablecoinSelectorProps> = ({
  selected,
  onSelect,
  amount,
}) => {
  const stablecoins = [
    {
      type: StablecoinType.USDC,
      name: 'USD Coin',
      symbol: 'USDC',
      icon: '💵',
      contractAddress: env.blockchain.contracts.usdc,
      network: 'Ethereum',
      balance: 5000, // Mock balance
    },
    {
      type: StablecoinType.USDT,
      name: 'Tether',
      symbol: 'USDT',
      icon: '💲',
      contractAddress: env.blockchain.contracts.usdt,
      network: 'Ethereum',
      balance: 3000, // Mock balance
    },
  ];

  return (
    <div className="space-y-3">
      {stablecoins.map((coin) => (
        <GlassPanel
          key={coin.type}
          variant={selected === coin.type ? 'primary' : 'light'}
          className={`p-4 cursor-pointer transition-all ${
            selected === coin.type ? 'ring-2 ring-primary-500' : 'hover:bg-white/20'
          }`}
          onClick={() => onSelect(coin.type)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl">{coin.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {coin.name} ({coin.symbol})
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  on {coin.network}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(coin.balance)}
                </p>
                {coin.balance < amount && (
                  <p className="text-xs text-red-500">Insufficient balance</p>
                )}
              </div>
              {selected === coin.type ? (
                <CheckCircle className="w-5 h-5 text-primary-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
};