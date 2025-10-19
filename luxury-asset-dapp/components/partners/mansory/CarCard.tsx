// components/partners/mansory/CarCard.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { VehicleAsset } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';
import { Car, Gauge, Zap, Package } from 'lucide-react';
import { useCartStore, useUIStore, useUserStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';

interface CarCardProps {
  vehicle: VehicleAsset;
}

export const CarCard: React.FC<CarCardProps> = ({ vehicle }) => {
  const { addItem } = useCartStore();
  const { setModalOpen } = useUIStore();
  const { user } = useUserStore();

  const handlePurchase = () => {
    if (!user) {
      // Prompt to connect wallet
      alert('Please connect your wallet first');
      return;
    }

    if (user.kycStatus !== KYCStatus.APPROVED) {
      // Open KYC modal
      setModalOpen('kyc', true);
      return;
    }

    // Add to cart and open payment modal
    addItem(vehicle);
    setModalOpen('payment', true);
  };

  return (
    <Card hoverable className="flex flex-col h-full">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-20 h-20 text-gray-600" />
        </div>
        {vehicle.available < 3 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-lg">
            Only {vehicle.available} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{vehicle.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-primary-400" />
            <span className="text-xs text-gray-300">
              {vehicle.metadata.specifications.horsepower} HP
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-primary-400" />
            <span className="text-xs text-gray-300">
              {vehicle.metadata.specifications.acceleration}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {vehicle.metadata.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
            >
              {feature}
            </span>
          ))}
          {vehicle.metadata.features.length > 2 && (
            <span className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded">
              +{vehicle.metadata.features.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(vehicle.price.usd)}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {vehicle.available}/{vehicle.totalSupply}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={handlePurchase}
          disabled={vehicle.available === 0}
        >
          {vehicle.available === 0 ? 'Sold Out' : 'Purchase Now'}
        </Button>
      </div>
    </Card>
  );
};