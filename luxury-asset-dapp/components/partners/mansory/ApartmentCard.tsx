'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SimplePaymentModal } from '@/components/payment/SimplePaymentModal';
import { formatCurrency } from '@/lib/utils/format';
import { useUserStore } from '@/lib/store/useStore';
import { Bed, Bath, Square } from 'lucide-react';

interface ApartmentProps {
  apartment: {
    id: string;
    name: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    floor: number;
    price: number;
    features: string[];
    available: boolean;
  };
}

export const ApartmentCard: React.FC<ApartmentProps> = ({ apartment }) => {
  const { user } = useUserStore();
  const [showPayment, setShowPayment] = useState(false);

  const handlePurchase = () => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }
    setShowPayment(true);
  };

  return (
    <>
      <Card className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/images/logos/iopn.jpg" 
              alt={apartment.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          {!apartment.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SOLD</span>
            </div>
          )}
          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
            Floor {apartment.floor}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {apartment.name}
          </h3>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{apartment.bedrooms} Bed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{apartment.bathrooms} Bath</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{apartment.size} m²</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {apartment.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="mb-3">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(apartment.price)}
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handlePurchase}
            disabled={!apartment.available}
          >
            {apartment.available ? 'Purchase Now' : 'Sold Out'}
          </Button>
        </div>
      </Card>

      {/* Payment Modal */}
      <SimplePaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        item={{
          id: apartment.id,
          name: apartment.name,
          price: apartment.price,
          description: `${apartment.bedrooms} bedroom luxury apartment on floor ${apartment.floor}.`
        }}
        onSuccess={() => {
          console.log('Purchase successful!');
          setShowPayment(false);
        }}
      />
    </>
  );
};