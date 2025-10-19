// components/partners/tonino/ProductGrid.tsx
'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { LuxuryItem, Partner, AssetType } from '@/lib/types';

interface ProductGridProps {
  category: string;
  priceRange: [number, number];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ category, priceRange }) => {
  // Mock data
  const mockProducts: LuxuryItem[] = [
    {
      id: 'tonino-1',
      partnerId: Partner.TONINO,
      type: AssetType.WATCH,
      name: 'Tonino Lamborghini Spyder Chronograph',
      description: 'Limited edition chronograph with carbon fiber dial and Italian leather strap',
      images: ['/images/placeholders/tonino-watch-1.jpg'],
      price: { usd: 25000 },
      status: 'AVAILABLE' as any,
      totalSupply: 50,
      available: 12,
      metadata: {
        brand: 'Tonino Lamborghini',
        collection: 'Spyder Collection',
        materials: ['Carbon Fiber', 'Titanium', 'Sapphire Crystal'],
        dimensions: {
          width: '44mm',
          weight: '120g',
        },
        warranty: '5 years international',
        authenticity: 'Certificate of Authenticity included',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'tonino-2',
      partnerId: Partner.TONINO,
      type: AssetType.ACCESSORY,
      name: 'Executive Briefcase Collection',
      description: 'Handcrafted Italian leather briefcase with gold-plated hardware',
      images: ['/images/placeholders/tonino-bag-1.jpg'],
      price: { usd: 15000 },
      status: 'AVAILABLE' as any,
      totalSupply: 100,
      available: 45,
      metadata: {
        brand: 'Tonino Lamborghini',
        collection: 'Executive Line',
        materials: ['Full-grain Italian Leather', 'Gold-plated Hardware', 'Alcantara Lining'],
        dimensions: {
          width: '42cm',
          height: '30cm',
          depth: '10cm',
        },
        warranty: '10 years',
        authenticity: 'Serial number and authentication card',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'tonino-3',
      partnerId: Partner.TONINO,
      type: AssetType.WATCH,
      name: 'Tonino Lamborghini Novemillimetri',
      description: 'Ultra-thin luxury watch with automatic movement',
      images: ['/images/placeholders/tonino-watch-2.jpg'],
      price: { usd: 45000 },
      status: 'AVAILABLE' as any,
      totalSupply: 25,
      available: 8,
      metadata: {
        brand: 'Tonino Lamborghini',
        collection: 'Novemillimetri',
        materials: ['18k Rose Gold', 'Alligator Leather', 'Sapphire Crystal'],
        dimensions: {
          width: '40mm',
          weight: '95g',
        },
        warranty: '5 years international',
        authenticity: 'Certificate of Authenticity included',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'tonino-4',
      partnerId: Partner.TONINO,
      type: AssetType.SUIT,
      name: 'Bespoke Italian Suit Collection',
      description: 'Custom-tailored suit crafted from finest Italian wool',
      images: ['/images/placeholders/tonino-suit-1.jpg'],
      price: { usd: 12000 },
      status: 'AVAILABLE' as any,
      totalSupply: 200,
      available: 150,
      metadata: {
        brand: 'Tonino Lamborghini',
        collection: 'Sartorial Excellence',
        materials: ['Super 180s Wool', 'Silk Lining', 'Mother of Pearl Buttons'],
        warranty: 'Lifetime alterations',
        authenticity: 'Personalized label and certificate',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Filter products
  const filteredProducts = mockProducts.filter((product) => {
    if (category === 'all') return true;
    if (category === 'watches' && product.type === AssetType.WATCH) return true;
    if (category === 'accessories' && product.type === AssetType.ACCESSORY) return true;
    if (category === 'suits' && product.type === AssetType.SUIT) return true;
    return false;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};