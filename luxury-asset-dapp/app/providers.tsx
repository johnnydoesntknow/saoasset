'use client';

import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineChain } from 'viem';

// Define SAGE Network
const sageNetwork = defineChain({
  id: 403,
  name: 'SAGE Network',
  nativeCurrency: {
    decimals: 18,
    name: 'SAGE',
    symbol: 'SAGE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.cor3innovations.io'],
    },
    public: {
      http: ['https://rpc.cor3innovations.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.cor3innovations.io' },
  },
});

// Project ID from Reown Cloud
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [sageNetwork],
  projectId,
});

// Create AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: [sageNetwork],
  projectId,
  metadata: {
    name: 'IOPn Luxury',
    description: 'São Tomé and Príncipe Citizenship by Investment',
    url: 'https://iopn.luxury',
    icons: ['https://iopn.luxury/images/logos/iopn.jpg'],
  },
  features: {
    analytics: true,
  },
});

// Query client
const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}