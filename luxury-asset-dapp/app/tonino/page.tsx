// app/tonino/page.tsx
'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProductGrid } from '@/components/partners/tonino/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Diamond, Watch, Briefcase, Filter, SlidersHorizontal } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

export default function ToninoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const categories = [
    { id: 'all', label: 'All Products', icon: Diamond },
    { id: 'watches', label: 'Watches', icon: Watch },
    { id: 'accessories', label: 'Accessories', icon: Briefcase },
    { id: 'suits', label: 'Suits', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tonino Lamborghini
          </h1>
          <p className="text-xl text-gray-300">
            Exclusive luxury lifestyle collection
          </p>
        </div>

        {/* Hero Banner */}
        <GlassPanel variant="primary" className="p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Italian Excellence Since 1981
              </h2>
              <p className="text-gray-200 mb-6">
                Tonino Lamborghini represents the essence of Italian luxury, combining 
                sophisticated design with exceptional craftsmanship. Each piece in our 
                collection embodies the spirit of innovation and passion that defines 
                the Lamborghini legacy.
              </p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-300">Starting from</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(10000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Collection Size</p>
                  <p className="text-2xl font-bold text-white">15+ Items</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                <Diamond className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassPanel variant="dark" className="p-4 text-center">
            <Watch className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-xs text-gray-400">Luxury Watches</p>
          </GlassPanel>
          <GlassPanel variant="dark" className="p-4 text-center">
            <Briefcase className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-xs text-gray-400">Accessories</p>
          </GlassPanel>
          <GlassPanel variant="dark" className="p-4 text-center">
            <Diamond className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-gray-400">Limited Edition</p>
          </GlassPanel>
          <GlassPanel variant="dark" className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-400">$50K</p>
            <p className="text-xs text-gray-400">Avg. Price</p>
          </GlassPanel>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Categories</span>
            </div>
            <Button variant="ghost" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Price Filter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'glass'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid category={selectedCategory} priceRange={priceRange} />
      </div>
    </div>
  );
}