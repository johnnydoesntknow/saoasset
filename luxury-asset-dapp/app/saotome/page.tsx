// app/saotome/page.tsx
'use client';

import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { VisaForm } from '@/components/partners/saotome/VisaForm';
import { Globe, Shield, Clock, Users, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

export default function SaotomePage() {
  const benefits = [
    {
      icon: Globe,
      title: 'Visa-Free Travel',
      description: 'Access to 50+ countries without additional visas',
    },
    {
      icon: Shield,
      title: 'Tax Benefits',
      description: 'Favorable tax regime for international income',
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: '90-day processing time from application submission',
    },
    {
      icon: Users,
      title: 'Family Inclusion',
      description: 'Include spouse and dependent children in application',
    },
  ];

  const requirements = [
    'Valid passport with at least 6 months validity',
    'Clean criminal record certificate',
    'Proof of funds (minimum $150,000 investment)',
    'Medical health certificate',
    'Professional reference letters',
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            São Tomé and Príncipe
          </h1>
          <p className="text-xl text-gray-300">
            Government Residency by Investment Program
          </p>
        </div>

        {/* Hero Section */}
        <GlassPanel variant="primary" className="p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Gateway to African Residency
              </h2>
              <p className="text-gray-200 mb-4">
                São Tomé and Príncipe offers one of Africa's most attractive residency programs, 
                providing investors with a stable, democratic environment and strategic location 
                off the West African coast.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">5-year renewable residency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Path to citizenship after 5 years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">No physical residency requirement</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-300 mb-2">Investment Required</p>
                <p className="text-5xl font-bold text-white mb-2">
                  {formatCurrency(150000)}
                </p>
                <p className="text-gray-300">Plus government fees</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Program Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <GlassPanel key={index} variant="dark" className="p-6">
                  <Icon className="w-10 h-10 text-primary-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </GlassPanel>
              );
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <GlassPanel variant="light" className="p-6 md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Requirements
            </h3>
            <ul className="space-y-3">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>

          {/* Application Form */}
          <div className="md:col-span-2">
            <VisaForm />
          </div>
        </div>
      </div>
    </div>
  );
}