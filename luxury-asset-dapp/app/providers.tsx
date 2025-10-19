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

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <PrivyProvider
      appId={env.privy.appId}
      config={{
        appearance: {
          theme: theme === 'dark' ? 'dark' : 'light',
          accentColor: '#3b82f6',
          logo: 'https://your-logo.com/logo.png', // Optional
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
