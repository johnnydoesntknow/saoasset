'use client';

import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { VisaForm } from '@/components/partners/saotome/VisaForm';
import { formatCurrency } from '@/lib/utils/format';

export default function SaotomePage() {
  const benefits = [
    {
      title: 'Visa-Free Travel',
      description: 'Access to 50+ countries without additional visas',
    },
    {
      title: 'Tax Benefits',
      description: 'Favorable tax regime for international income',
    },
    {
      title: 'Fast Processing',
      description: '90-day processing time from application submission',
    },
    {
      title: 'Family Inclusion',
      description: 'Include spouse and dependent children in application',
    },
  ];

  const requirements = [
    'Valid passport with at least 6 months validity',
    'Clean criminal record certificate',
    'Proof of funds (minimum $100,000 investment)',
    'Medical health certificate',
    'Professional reference letters',
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            São Tomé and Príncipe
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Government Residency by Investment Program
          </p>
        </div>

        {/* Hero Section */}
        <GlassPanel className="p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Gateway to African Residency
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
              São Tomé and Príncipe offers one of Africa's most attractive residency 
              programs, providing investors with a stable, democratic environment and 
              strategic location off the West African coast.
            </p>
            <div className="inline-block">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Investment Required</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(100000)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Plus government fees</p>
            </div>
          </div>
        </GlassPanel>

        {/* Benefits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Program Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <GlassPanel key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Requirements & Form */}
        <div className="grid md:grid-cols-3 gap-8">
          <GlassPanel className="p-6 md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Requirements
            </h3>
            <ul className="space-y-3">
              {requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {req}
                </li>
              ))}
            </ul>
          </GlassPanel>

          <div className="md:col-span-2">
            <VisaForm />
          </div>
        </div>
      </div>
    </div>
  );
}