'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ApartmentGrid } from '@/components/partners/mansory/ApartmentGrid';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';

export default function MansoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Apartments' },
    { id: '1', label: '1 Bedroom' },
    { id: '2', label: '2 Bedrooms' },
    { id: '3', label: '3+ Bedrooms' },
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
            Exclusive luxury apartments with premium finishes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Units</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">$450K</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Starting Price</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <p className="text-3xl font-bold text-iopn-primary">3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Penthouses</p>
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

        {/* Apartment Grid */}
        <ApartmentGrid filter={selectedFilter} />
      </div>
    </div>
  );
}