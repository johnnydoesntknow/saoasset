'use client';

import React from 'react';
import { ApartmentCard } from './ApartmentCard';

interface ApartmentGridProps {
  filter: string;
}

export const ApartmentGrid: React.FC<ApartmentGridProps> = ({ filter }) => {
  const apartments = [
    {
      id: 'mans-101',
      name: 'Luxury Suite 101',
      bedrooms: 1,
      bathrooms: 1,
      size: 85,
      floor: 10,
      price: 450000,
      features: ['City View', 'Balcony', 'Premium Finishes', 'Concierge'],
      available: true,
    },
    {
      id: 'mans-205',
      name: 'Executive Apartment 205',
      bedrooms: 2,
      bathrooms: 2,
      size: 130,
      floor: 20,
      price: 750000,
      features: ['Panoramic View', 'Large Terrace', 'Private Parking', 'Storage'],
      available: true,
    },
    {
      id: 'mans-301',
      name: 'Penthouse 301',
      bedrooms: 3,
      bathrooms: 3,
      size: 220,
      floor: 30,
      price: 1500000,
      features: ['360° View', 'Private Roof Terrace', 'Wine Cellar', 'Smart Home'],
      available: false,
    },
  ];

  const filteredApartments = apartments.filter((apt) => {
    if (filter === 'all') return true;
    if (filter === '1' && apt.bedrooms === 1) return true;
    if (filter === '2' && apt.bedrooms === 2) return true;
    if (filter === '3' && apt.bedrooms >= 3) return true;
    return false;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredApartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
};