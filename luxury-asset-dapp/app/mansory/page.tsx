'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { CarGrid } from '@/components/partners/mansory/CarGrid';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';

export default function MansoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

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
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mansory Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Exclusive access to the world's most luxurious customized vehicles
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">7</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Vehicles</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">$850K</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Limited Editions</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">820HP</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Max Power</p>
          </GlassPanel>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Car Grid */}
        <CarGrid filter={selectedFilter} priceRange={[0, 2000000]} />
      </div>
    </div>
  );
}