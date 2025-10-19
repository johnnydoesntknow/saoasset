'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SimplePaymentModal } from '@/components/payment/SimplePaymentModal';
import { LuxuryItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';
import { useUserStore, useUIStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';

interface ProductCardProps {
  product: LuxuryItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const getProductIcon = () => {
    switch (product.type) {
      case 'WATCH': return '⌚';
      case 'ACCESSORY': return '👜';
      case 'SUIT': return '🤵';
      default: return '💎';
    }
  };

  return (
    <>
      <Card className="flex flex-col h-full">
        {/* Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-red-900 rounded-xl mb-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-30">{getProductIcon()}</span>
          </div>
          {product.available < 10 && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-lg">
              Limited Stock
            </div>
          )}
          {product.totalSupply <= 50 && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-lg">
              Exclusive
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>

          {/* Features */}
          <div className="space-y-2 mb-4">
            <div className="text-xs text-gray-700 dark:text-gray-300">
              Collection: {product.metadata.collection}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">
              Warranty: {product.metadata.warranty}
            </div>
            {product.metadata.authenticity && (
              <div className="text-xs text-gray-700 dark:text-gray-300">
                Authenticity Guaranteed
              </div>
            )}
          </div>

          {/* Materials */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.metadata.materials.slice(0, 2).map((material, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded"
              >
                {material}
              </span>
            ))}
            {product.metadata.materials.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded">
                +{product.metadata.materials.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(product.price.usd)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {product.available}/{product.totalSupply}
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Available</span>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handlePurchase}
            disabled={product.available === 0}
          >
            {product.available === 0 ? 'Sold Out' : 'Purchase Now'}
          </Button>
        </div>
      </Card>

      {/* Payment Modal */}
      <SimplePaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        item={{
          id: product.id,
          name: product.name,
          price: product.price.usd,
          description: product.description,
        }}
        onSuccess={() => {
          console.log('Purchase successful!');
          // Update inventory, show success message, etc.
        }}
      />
    </>
  );
};