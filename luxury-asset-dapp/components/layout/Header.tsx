'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useCartStore } from '@/lib/store/useStore';
import { usePrivy } from '@privy-io/react-auth';
import { formatAddress } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const { ready, authenticated, user, logout } = usePrivy();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-4'
      )}>
        <div className="container mx-auto px-4">
          <GlassPanel 
            variant={scrolled ? 'solid' : 'default'} 
            blur="sm" 
            className={cn(
              'px-6 transition-all duration-500',
              scrolled ? 'py-3' : 'py-4'
            )}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-iopn-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">IO</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    IOPn Luxury
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    Premium Asset Platform
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'px-5 py-2.5 rounded-lg font-medium transition-all duration-200',
                        isActive
                          ? 'bg-iopn-primary text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:text-iopn-primary dark:hover:text-iopn-secondary-light hover:bg-gray-50 dark:hover:bg-gray-800'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center space-x-3">
                {/* Cart */}
                <button className="relative p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="sr-only">Cart</span>
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-iopn-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Wallet */}
                {authenticated && walletAddress ? (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="font-mono hidden sm:flex"
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                      }}
                    >
                      {formatAddress(walletAddress)}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : ready && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="hidden sm:block"
                  >
                    Connect Wallet
                  </Button>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <span className="sr-only">Menu</span>
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </GlassPanel>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-20 w-80 max-w-[calc(100vw-2rem)] m-4">
            <GlassPanel variant="solid" className="p-6">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-iopn-primary text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              {!authenticated && ready && (
                <Button
                  variant="primary"
                  className="w-full mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connect Wallet
                </Button>
              )}
            </GlassPanel>
          </div>
        </div>
      )}
    </>
  );
};