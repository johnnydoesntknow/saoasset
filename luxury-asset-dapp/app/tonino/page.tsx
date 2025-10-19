'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProductGrid } from '@/components/partners/tonino/ProductGrid';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';

export default function ToninoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'watches', label: 'Watches' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'suits', label: 'Suits' },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tonino Lamborghini
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Exclusive luxury lifestyle collection
          </p>
        </div>

        {/* Hero Section */}
        <GlassPanel className="p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Italian Excellence Since 1981
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
              Tonino Lamborghini represents the essence of Italian luxury, combining 
              sophisticated design with exceptional craftsmanship. Each piece in our 
              collection embodies the spirit of innovation and passion that defines 
              the Lamborghini legacy.
            </p>
            <div className="flex justify-center gap-8">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(10000)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Collection Size</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">15+ Items</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassPanel className="p-6 text-center">
            <p className="text-2xl font-bold text-iopn-primary">5</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Luxury Watches</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-2xl font-bold text-iopn-primary">8</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Accessories</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-2xl font-bold text-iopn-primary">3</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Limited Edition</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-2xl font-bold text-iopn-primary">$50K</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Avg. Price</p>
          </GlassPanel>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid category={selectedCategory} priceRange={[0, 100000]} />
      </div>
    </div>
  );
}