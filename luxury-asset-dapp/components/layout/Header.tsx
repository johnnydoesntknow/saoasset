'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Home, Car, Globe, Diamond, ShoppingCart, LogOut } from 'lucide-react';
import { useCartStore } from '@/lib/store/useStore';
import { usePrivy } from '@privy-io/react-auth';
import { formatAddress } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const { ready, authenticated, user, logout } = usePrivy();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/mansory', label: 'Mansory', icon: Car },
    { href: '/saotome', label: 'São Tomé', icon: Globe },
    { href: '/tonino', label: 'Tonino Lamborghini', icon: Diamond },
  ];

  const handleLogout = async () => {
    await logout();
    // Clear localStorage to reset the app state
    localStorage.clear();
    window.location.href = '/';
  };

  // Get the wallet address safely
  const walletAddress = user?.wallet?.address || '';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <GlassPanel variant="dark" blur="xl" className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold text-white">Luxury Assets</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-xl flex items-center space-x-2 transition-all',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => {
                // TODO: Implement cart functionality
                console.log('Cart clicked');
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>

            {authenticated && walletAddress && (
              <>
                <Button
                  variant="glass"
                  size="sm"
                  className="font-mono"
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    console.log('Address copied to clipboard');
                  }}
                  title="Click to copy address"
                >
                  {formatAddress(walletAddress)}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  title="Disconnect"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </GlassPanel>
    </header>
  );
};
