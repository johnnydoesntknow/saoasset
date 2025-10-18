// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Car, Globe, Diamond, ArrowRight, Shield, Zap, Award, TrendingUp } from 'lucide-react';
import { useUserStore } from '@/lib/store/useStore';
//import { KYCStatusBadge } from '@/components/kyc/KYCStatus';
//import { KYCModal } from '@/components/kyc/KYCModal';
import { formatCurrency } from '@/lib/utils/format';

export default function HomePage() {
  const { user } = useUserStore();

  const partners = [
    {
      id: 'mansory',
      name: 'Mansory',
      description: 'Exclusive luxury vehicle customization and performance',
      icon: Car,
      href: '/mansory',
      gradient: 'from-blue-500 to-purple-600',
      items: '7 Vehicles Available',
      minInvestment: 50000,
    },
    {
      id: 'saotome',
      name: 'São Tomé and Príncipe',
      description: 'Government-issued residency visa program',
      icon: Globe,
      href: '/saotome',
      gradient: 'from-green-500 to-teal-600',
      items: 'Limited Visas Available',
      minInvestment: 150000,
    },
    {
      id: 'tonino',
      name: 'Tonino Lamborghini',
      description: 'Premium lifestyle and luxury accessories',
      icon: Diamond,
      href: '/tonino',
      gradient: 'from-orange-500 to-red-600',
      items: '15+ Items Available',
      minInvestment: 10000,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'KYC/AML verified transactions with multi-signature treasury management',
    },
    {
      icon: Zap,
      title: 'Multi-Chain Support',
      description: 'Accept USDC and USDT across multiple blockchain networks',
    },
    {
      icon: Award,
      title: 'Premium Assets',
      description: 'Access to exclusive luxury vehicles, residency programs, and lifestyle products',
    },
    {
      icon: TrendingUp,
      title: 'OPN Allocation',
      description: 'Earn OPN tokens with every purchase for future platform benefits',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Exclusive Access
              </span>
              <br />
              to Premium Assets
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Purchase fractionalized luxury vehicles, residency visas, and premium lifestyle products
              from world-renowned partners.
             </p>
            {/* KYC Status Badge placeholder - commented out for now */}
            {/* {user && <KYCStatusBadge />} */}
          </div>

          {/* Partner Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <Link key={partner.id} href={partner.href}>
                  <Card variant="dark" hoverable clickable className="h-full">
                    <div className="flex flex-col h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{partner.name}</h3>
                      <p className="text-gray-400 flex-grow mb-4">{partner.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Min. Investment</p>
                          <p className="text-lg font-semibold text-white">
                            {formatCurrency(partner.minInvestment)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-primary-400">{partner.items}</p>
                          <ArrowRight className="w-5 h-5 text-primary-400 ml-auto mt-1" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Platform Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <GlassPanel key={index} variant="light" className="p-6 text-center">
                    <Icon className="w-10 h-10 text-primary-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </GlassPanel>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          {!user && (
            <div className="text-center">
              <GlassPanel variant="primary" className="inline-block p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-200 mb-6">Connect your wallet to begin purchasing premium assets</p>
                <Button variant="glass" size="lg">
                  Connect Wallet
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </GlassPanel>
            </div>
          )}
        </div>
      </section>

      {/* KYC Modal */}
      {/* <KYCModal /> */}
    </div>
  );
}