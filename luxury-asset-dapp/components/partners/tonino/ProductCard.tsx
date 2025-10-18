// components/partners/tonino/ProductCard.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LuxuryItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';
import { Diamond, Shield, Package, Star, Award } from 'lucide-react';
import { useCartStore, useUIStore, useUserStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';

interface ProductCardProps {
  product: LuxuryItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { setModalOpen } = useUIStore();
  const { user } = useUserStore();

  const handlePurchase = () => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }

    if (user.kycStatus !== KYCStatus.APPROVED) {
      setModalOpen('kyc', true);
      return;
    }

    addItem(product);
    setModalOpen('payment', true);
  };

  const getProductIcon = () => {
    switch (product.type) {
      case 'WATCH':
        return '⌚';
      case 'ACCESSORY':
        return '👜';
      case 'SUIT':
        return '🤵';
      default:
        return '💎';
    }
  };

  return (
    <Card variant="dark" hoverable className="flex flex-col h-full">
      {/* Image Placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{getProductIcon()}</span>
        </div>
        {product.available < 10 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-lg">
            Limited Stock
          </div>
        )}
        {product.totalSupply <= 50 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-lg flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Exclusive
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{product.description}</p>

        {/* Features */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Diamond className="w-4 h-4 text-primary-400" />
            <span className="text-xs text-gray-300">
              {product.metadata.collection}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-xs text-gray-300">
              {product.metadata.warranty}
            </span>
          </div>
          {product.metadata.authenticity && (
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-primary-400" />
              <span className="text-xs text-gray-300">
                Authenticity Guaranteed
              </span>
            </div>
          )}
        </div>

        {/* Materials */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.metadata.materials.slice(0, 2).map((material, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
            >
              {material}
            </span>
          ))}
          {product.metadata.materials.length > 2 && (
            <span className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded">
              +{product.metadata.materials.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(product.price.usd)}
            </p>
            <p className="text-xs text-gray-400">
              {product.price.opnAllocation.toLocaleString()} OPN allocation
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {product.available}/{product.totalSupply}
              </span>
            </div>
            <span className="text-xs text-gray-400">Available</span>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={handlePurchase}
          disabled={product.available === 0}
        >
          {product.available === 0 ? 'Sold Out' : 'Purchase Now'}
        </Button>
      </div>
    </Card>
  );
};