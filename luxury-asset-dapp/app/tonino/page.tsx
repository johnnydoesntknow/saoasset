'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ApartmentGrid } from '@/components/partners/tonino/ApartmentGrid';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';
import { Home, Users, Shield, Building } from 'lucide-react';

export default function ToninoPage() {
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');

  const bedroomFilters = [
    { id: 'all', label: 'All Sizes' },
    { id: '1', label: '1 Bedroom' },
    { id: '2', label: '2 Bedrooms' },
    { id: '3', label: '3 Bedrooms' },
    { id: '4', label: '4+ Bedrooms' },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tonino Lamborghini Residences
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Exclusive luxury apartments in premium developments
          </p>
        </div>

        {/* Hero Section */}
        <GlassPanel className="p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Italian Luxury Living
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
              Own a piece of Italian excellence with Tonino Lamborghini Residences. 
              Each apartment combines sophisticated design, premium materials, and the 
              legendary Lamborghini attention to detail.
            </p>
            <div className="flex justify-center gap-8">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(320000)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Available Units</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassPanel className="p-6 text-center">
            <Home className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Apartments</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Premium</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Finishes</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24/7</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Concierge Service</p>
          </GlassPanel>
          <GlassPanel className="p-6 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Secured</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Gated Community</p>
          </GlassPanel>
        </div>

        {/* Bedroom Filter */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Number of Bedrooms
          </label>
          <div className="flex flex-wrap gap-2">
            {bedroomFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedBedrooms === filter.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedBedrooms(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Apartment Grid */}
        <ApartmentGrid bedrooms={selectedBedrooms} />

        {/* Additional Information */}
        <GlassPanel className="p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Benefits
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}