// app/mansory/page.tsx
'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { CarGrid } from '@/components/partners/mansory/CarGrid';
import { Button } from '@/components/ui/Button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { KYCModal } from '@/components/kyc/KYCModal';

export default function MansoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  const filters = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'suv', label: 'SUV' },
    { id: 'sports', label: 'Sports Cars' },
    { id: 'limited', label: 'Limited Edition' },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mansory Collection
          </h1>
          <p className="text-xl text-gray-300">
            Exclusive access to the world's most luxurious customized vehicles
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassPanel variant="dark" className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-400">7</p>
            <p className="text-sm text-gray-400">Available Vehicles</p>
          </GlassPanel>
          <GlassPanel variant="dark" className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-400">$850K</p>
            <p className="text-sm text-gray-400">Average Price</p>
          </GlassPanel>
          <GlassPanel variant="dark" className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-400">3</p>
            <p className="text-sm text-gray-400">Limited Editions</p>
          </GlassPanel>
          <GlassPanel variant="dark" className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-400">820HP</p>
            <p className="text-sm text-gray-400">Max Power</p>
          </GlassPanel>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Filters</span>
            </div>
            <Button variant="ghost" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? 'primary' : 'glass'}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Car Grid */}
        <CarGrid filter={selectedFilter} priceRange={priceRange} />
      </div>

      {/* Modals */}
      <PaymentModal />
      <KYCModal />
    </div>
  );
}