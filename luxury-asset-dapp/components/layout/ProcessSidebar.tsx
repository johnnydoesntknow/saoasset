'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { usePrivy } from '@privy-io/react-auth';
import { formatAddress } from '@/lib/utils/format';
import { cn } from '@/lib/utils';
import { Check, Circle, Clock } from 'lucide-react';

interface ProcessSidebarProps {
  currentStep?: number;
}

export const ProcessSidebar: React.FC<ProcessSidebarProps> = ({ currentStep = 1 }) => {
  const pathname = usePathname();
  const { authenticated, user, logout } = usePrivy();
  const [isOpen, setIsOpen] = useState(true);

  // Only show sidebar on the application page
  if (!pathname.includes('/saotome/apply')) {
    return null;
  }

  // Define the 6-step application process
  const steps = [
    {
      id: 1,
      label: 'Package & Payment',
      description: 'Choose package and pay',
    },
    {
      id: 2,
      label: 'Personal Info',
      description: 'Your details',
    },
    {
      id: 3,
      label: 'Documents',
      description: 'Upload required docs',
    },
    {
      id: 4,
      label: 'Review',
      description: 'Check everything',
    },
    {
      id: 5,
      label: 'Submit',
      description: 'Send application',
    },
    {
      id: 6,
      label: 'Confirmation',
      description: 'Application sent',
    },
  ];

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    window.location.href = '/';
  };

  const walletAddress = user?.wallet?.address || '';

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <Check className="w-5 h-5 text-white" />;
      case 'current':
        return <Clock className="w-5 h-5 text-white animate-pulse" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepStyles = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-600';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={cn(
        'fixed left-0 top-0 h-full z-50 transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <GlassPanel variant="default" className="h-full w-64 p-6 rounded-none">
          <div className="flex flex-col h-full">
            {/* Logo and Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/logos/iopn.jpg" 
                  alt="IOPn" 
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    São Tomé
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    Citizenship Program
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Process Steps */}
            <div className="flex-grow overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                Application Progress
              </h3>
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const status = getStepStatus(step.id);
                  return (
                    <div key={step.id} className="relative">
                      {/* Connection line */}
                      {index < steps.length - 1 && (
                        <div className={cn(
                          'absolute left-5 top-10 w-0.5 h-12',
                          status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        )} />
                      )}
                      
                      {/* Step item */}
                      <div className="flex items-start space-x-3">
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                          getStepStyles(status)
                        )}>
                          {getStepIcon(status)}
                        </div>
                        <div className="flex-1">
                          <p className={cn(
                            'font-medium text-sm',
                            status === 'current' 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : status === 'completed'
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-500 dark:text-gray-400'
                          )}>
                            {step.label}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {/* Theme Toggle */}
              <div className="flex justify-center">
                <ThemeToggle />
              </div>

              {/* Wallet Info */}
              {authenticated && walletAddress && (
                <div className="space-y-2">
                  <button
                    className="w-full px-3 py-2 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                    title="Click to copy address"
                  >
                    {formatAddress(walletAddress)}
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    onClick={handleLogout}
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Floating Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-4 z-50 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200"
          title="Open Progress"
        >
          <img 
            src="/images/logos/iopn.jpg" 
            alt="Menu" 
            className="w-8 h-8 rounded object-cover"
          />
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};