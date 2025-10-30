'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';
import { env } from '@/lib/config/env';
import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/useStore';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

// Find this function in app/providers.tsx and replace it with:
export function Providers({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    // Default to light mode on first load
    if (!localStorage.getItem('ui-storage')) {
      setTheme('light');
    }
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme, setTheme]);

  return (
    <PrivyProvider
      appId={env.privy.appId}
      config={{
        appearance: {
          theme: theme === 'dark' ? 'dark' : 'light',
          accentColor: '#2280cd',
          logo: '/images/logos/iopn.jpg',
          showWalletLoginFirst: true,
        },
        loginMethods: ['wallet', 'email'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}