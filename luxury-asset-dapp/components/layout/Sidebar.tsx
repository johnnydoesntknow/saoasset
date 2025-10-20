'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { usePrivy } from '@privy-io/react-auth';
import { formatAddress } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { authenticated, user, logout } = usePrivy();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/mansory', label: 'Mansory' },
    { href: '/saotome', label: 'São Tomé' },
    { href: '/tonino', label: 'Tonino Lamborghini' },
  ];

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    window.location.href = '/';
  };

  const walletAddress = user?.wallet?.address || '';

  // Update main content padding when sidebar opens/closes
  React.useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      if (isOpen) {
        main.classList.add('md:pl-64');
        main.classList.remove('pl-0');
      } else {
        main.classList.remove('md:pl-64');
        main.classList.add('pl-0');
      }
    }
  }, [isOpen]);

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
              <Link href="/" className="flex items-center space-x-3">
                <img 
                  src="/images/logos/iopn.jpg" 
                  alt="IOPn" 
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    IOPn Luxury
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    Premium Assets
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

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
          title="Open Menu"
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