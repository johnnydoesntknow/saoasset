// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils/format';

export default function HomePage() {
  const partners = [
    {
      id: 'mansory',
      name: 'Mansory',
      description: 'Exclusive luxury vehicle customization and performance',
      href: '/mansory',
      items: '7 Vehicles Available',
      minInvestment: 50000,
    },
    {
      id: 'saotome',
      name: 'São Tomé and Príncipe',
      description: 'Government-issued residency visa program',
      href: '/saotome',
      items: 'Limited Visas Available',
      minInvestment: 150000,
    },
    {
      id: 'tonino',
      name: 'Tonino Lamborghini',
      description: 'Premium lifestyle and luxury accessories',
      href: '/tonino',
      items: '15+ Items Available',
      minInvestment: 10000,
    },
  ];

  const features = [
    {
      title: 'Secure & Compliant',
      description: 'KYC/AML verified transactions with multi-signature treasury management',
    },
    {
      title: 'Multi-Chain Support',
      description: 'Accept USDC and USDT across multiple blockchain networks',
    },
    {
      title: 'Premium Assets',
      description: 'Access to exclusive luxury vehicles, residency programs, and lifestyle products',
    },
    {
    title: 'Transparent Pricing',
    description: 'Clear pricing in USD with secure stablecoin payment processing',
  },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Exclusive Access</span>
              <br />
              <span className="text-gray-700 dark:text-gray-300">to Premium Assets</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Purchase fractionalized luxury vehicles, residency visas, and premium lifestyle products
              from world-renowned partners.
            </p>
          </div>

          {/* Partner Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {partners.map((partner) => (
              <Link key={partner.id} href={partner.href}>
                <Card hoverable clickable className="h-full">
                  <div className="flex flex-col h-full">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 flex-grow mb-4">
                      {partner.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Min. Investment</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(partner.minInvestment)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-iopn-primary dark:text-iopn-secondary-light">
                          {partner.items}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Features Section - No Icons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Platform Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <GlassPanel key={index} variant="default" className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}