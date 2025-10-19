// components/partners/mansory/CarGrid.tsx
'use client';

import React from 'react';
import { CarCard } from './CarCard';
import { VehicleAsset, Partner, AssetType } from '@/lib/types';

interface CarGridProps {
  filter: string;
  priceRange: [number, number];  
}

export const CarGrid: React.FC<CarGridProps> = ({ filter, priceRange }) => {
  // Mock data - in production this would come from API
  const mockCars: VehicleAsset[] = [
    {
      id: 'mansory-1',
      partnerId: Partner.MANSORY,
      type: AssetType.VEHICLE,
      name: 'Mansory Venatus Evo',
      description: 'Ultra-luxury SUV with custom carbon fiber body kit and enhanced performance',
      images: ['/images/placeholders/mansory-1.jpg'],
      price: { usd: 850000 }, 
      status: 'AVAILABLE' as any,
      totalSupply: 10,
      available: 7,
      metadata: {
        brand: 'Lamborghini Urus',
        model: 'Venatus Evo',
        year: 2024,
        specifications: {
          engine: '4.0L Twin-Turbo V8',
          horsepower: 820,
          topSpeed: '320 km/h',
          acceleration: '0-100 km/h in 2.9s',
        },
        features: ['Carbon Fiber Body', 'Custom Interior', '24" Forged Wheels', 'Sport Exhaust'],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mansory-2',
      partnerId: Partner.MANSORY,
      type: AssetType.VEHICLE,
      name: 'Mansory Stallone',
      description: 'Limited edition Ferrari 812 GTS with exclusive aerodynamic package',
      images: ['/images/placeholders/mansory-2.jpg'],
      price: { usd: 1200000 },
      status: 'AVAILABLE' as any,
      totalSupply: 5,
      available: 2,
      metadata: {
        brand: 'Ferrari 812 GTS',
        model: 'Stallone',
        year: 2024,
        specifications: {
          engine: '6.5L V12',
          horsepower: 830,
          topSpeed: '345 km/h',
          acceleration: '0-100 km/h in 2.8s',
        },
        features: ['Carbon Fiber Aero Kit', 'Alcantara Interior', 'Titanium Exhaust', 'Forged Wheels'],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'mansory-3',
      partnerId: Partner.MANSORY,
      type: AssetType.VEHICLE,
      name: 'Mansory Coastline',
      description: 'Rolls-Royce Cullinan transformed into the ultimate luxury SUV',
      images: ['/images/placeholders/mansory-3.jpg'],
      price: { usd: 950000 },
      status: 'AVAILABLE' as any,
      totalSupply: 8,
      available: 5,
      metadata: {
        brand: 'Rolls-Royce Cullinan',
        model: 'Coastline',
        year: 2024,
        specifications: {
          engine: '6.75L Twin-Turbo V12',
          horsepower: 650,
          topSpeed: '280 km/h',
          acceleration: '0-100 km/h in 4.5s',
        },
        features: ['Two-Tone Paint', 'Starlight Headliner', 'Bespoke Interior', 'Crystal Elements'],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Filter cars based on selected filter
  const filteredCars = mockCars.filter((car) => {
    if (filter === 'all') return true;
    if (filter === 'suv' && car.metadata.brand.toLowerCase().includes('urus')) return true;
    if (filter === 'sports' && car.metadata.brand.toLowerCase().includes('ferrari')) return true;
    if (filter === 'limited' && car.totalSupply <= 5) return true;
    return false;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCars.map((car) => (
        <CarCard key={car.id} vehicle={car} />
      ))}
    </div>
  );
};