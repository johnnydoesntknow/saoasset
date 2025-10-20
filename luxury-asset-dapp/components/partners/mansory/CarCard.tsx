'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SimplePaymentModal } from '@/components/payment/SimplePaymentModal';
import { VehicleAsset } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';
import { useUserStore, useUIStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';

interface CarCardProps {
  vehicle: VehicleAsset;
}

export const CarCard: React.FC<CarCardProps> = ({ vehicle }) => {
  const { user } = useUserStore();
  const { setModalOpen } = useUIStore();
  const [showPayment, setShowPayment] = useState(false);

  const handlePurchase = () => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }

    if (user.kycStatus !== KYCStatus.APPROVED) {
      setModalOpen('kyc', true);
      return;
    }

    setShowPayment(true);
  };

  return (
    <>
      <Card className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl mb-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/images/logos/iopn.jpg" 
              alt={vehicle.name}
              className="w-24 h-24 object-cover rounded-lg opacity-50"
            />
          </div>
          {vehicle.available < 3 && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-lg">
              Only {vehicle.available} left
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{vehicle.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{vehicle.description}</p>

          {/* Specs */}
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Engine:</span> {vehicle.metadata.specifications.engine}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Power:</span> {vehicle.metadata.specifications.horsepower} HP
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Speed:</span> {vehicle.metadata.specifications.topSpeed}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(vehicle.price.usd)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {vehicle.available}/{vehicle.totalSupply}
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Available</span>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handlePurchase}
            disabled={vehicle.available === 0}
          >
            {vehicle.available === 0 ? 'Sold Out' : 'Purchase Now'}
          </Button>
        </div>
      </Card>

      {/* Payment Modal */}
      <SimplePaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        item={{
          id: vehicle.id,
          name: vehicle.name,
          price: vehicle.price.usd,
          description: vehicle.description,
        }}
        onSuccess={() => {
          console.log('Purchase successful!');
          // Update inventory, show success message, etc.
        }}
      />
    </>
  );
};