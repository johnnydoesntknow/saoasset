'use client';

import React from 'react';
import { ApartmentCard } from './ApartmentCard';

interface ApartmentGridProps {
  bedrooms: string;
}

export const ApartmentGrid: React.FC<ApartmentGridProps> = ({ bedrooms }) => {
  const apartments = [
    {
      id: 'ton-101',
      name: 'Studio Elegante',
      bedrooms: 1,
      bathrooms: 1,
      size: 65,
      floor: 5,
      price: 320000,
      features: ['Modern Design', 'Balcony', 'Storage', 'Concierge'],
      available: true,
    },
    {
      id: 'ton-205',
      name: 'Vista Apartment',
      bedrooms: 2,
      bathrooms: 2,
      size: 95,
      floor: 12,
      price: 480000,
      features: ['City View', 'Double Balcony', 'Walk-in Closet', 'Parking'],
      available: true,
    },
    {
      id: 'ton-301',
      name: 'Family Residence',
      bedrooms: 3,
      bathrooms: 2,
      size: 150,
      floor: 8,
      price: 750000,
      features: ['Large Living Space', 'Study Room', '2 Parking Spaces', 'Storage'],
      available: true,
    },
    {
      id: 'ton-401',
      name: 'Penthouse Supremo',
      bedrooms: 4,
      bathrooms: 4,
      size: 280,
      floor: 25,
      price: 1800000,
      features: ['Duplex', 'Private Terrace', 'Home Cinema', 'Butler Service'],
      available: false,
    },
  ];

  const filteredApartments = apartments.filter((apt) => {
    if (bedrooms === 'all') return true;
    if (bedrooms === '4' && apt.bedrooms >= 4) return true;
    return apt.bedrooms === parseInt(bedrooms);
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredApartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
};