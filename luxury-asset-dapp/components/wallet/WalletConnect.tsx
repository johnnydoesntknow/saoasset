// components/wallet/WalletConnect.tsx
'use client';

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/Button';
import { Wallet, LogOut, User } from 'lucide-react';
import { formatAddress } from '@/lib/utils/format';
import { useUserStore, useUIStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';

export const WalletConnect: React.FC = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { setUser } = useUserStore();
  const { setModalOpen } = useUIStore();

  React.useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      // Create/update user in our system
      setUser({
        id: user.id,
        walletAddress: user.wallet.address,
        email: user.email?.address,
        kycStatus: KYCStatus.NOT_STARTED,
        role: 'USER' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      setUser(null);
    }
  }, [authenticated, user, setUser]);

  const handleLogin = async () => {
    login();
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (!ready) {
    return (
      <Button variant="glass" size="sm" disabled>
        <Wallet className="w-4 h-4" />
        Loading...
      </Button>
    );
  }

  if (authenticated && user?.wallet?.address) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="glass"
          size="sm"
          onClick={() => setModalOpen('wallet', true)}
        >
          <User className="w-4 h-4" />
          {formatAddress(user.wallet.address)}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={handleLogin}
      icon={<Wallet className="w-4 h-4" />}
    >
      Connect Wallet
    </Button>
  );
};