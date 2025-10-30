// lib/config/env.ts
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  
  // In development, use a fallback for Privy if not set
  if (key === 'NEXT_PUBLIC_PRIVY_APP_ID' && !value && process.env.NODE_ENV === 'development') {
    console.warn(`Missing ${key}, using development fallback`);
    return 'cmg0j8u05000dl40ctw31z23p'; // Your Privy ID as fallback
  }
  
  if (!value) {
    console.error(`Missing environment variable: ${key}`);
    // Return empty string instead of throwing in development
    if (process.env.NODE_ENV === 'development') {
      return '';
    }
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getOptionalEnvVar = (key: string, defaultValue?: string): string | undefined => {
  return process.env[key] || defaultValue;
};

const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true';
};

export const env = {
  // App Configuration
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    environment: getEnvVar('NODE_ENV', 'development'),
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },

  // Privy Configuration
  privy: {
    appId: getEnvVar('NEXT_PUBLIC_PRIVY_APP_ID', 'cmg0j8u05000dl40ctw31z23p'),
  },

  // API Configuration
  api: {
    baseUrl: getEnvVar('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:3001'),
    version: getEnvVar('NEXT_PUBLIC_API_VERSION', 'v1'),
    timeout: parseInt(getOptionalEnvVar('NEXT_PUBLIC_API_TIMEOUT', '30000') || '30000'),
  },

  // Blockchain Configuration
  blockchain: {
    chainId: parseInt(getEnvVar('NEXT_PUBLIC_CHAIN_ID', '1')),
    contracts: {
      usdc: getEnvVar('NEXT_PUBLIC_USDC_CONTRACT_ADDRESS', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
      usdt: getEnvVar('NEXT_PUBLIC_USDT_CONTRACT_ADDRESS', '0xdAC17F958D2ee523a2206206994597C13D831ec7'),
    },
    treasury: {
      wallet: getEnvVar('NEXT_PUBLIC_TREASURY_WALLET_ADDRESS', '0x5187aC2A2f7CccC4f02048CBDd0f46C806C6dc49'),
    },
    enableTestnet: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_TESTNET', false),
  },

  // KYC Configuration
  kyc: {
    provider: getEnvVar('NEXT_PUBLIC_KYC_PROVIDER', 'clear'),
    apiKey: getOptionalEnvVar('NEXT_PUBLIC_KYC_API_KEY'),
    enabled: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_KYC', true),
  },

  // Partner Configuration
  partners: {
    mansory: {
      enabled: getBooleanEnvVar('NEXT_PUBLIC_MANSORY_ENABLED', true),
      name: 'Mansory',
      description: 'Luxury Performance Vehicles',
    },
    saotome: {
      enabled: getBooleanEnvVar('NEXT_PUBLIC_SAOTOME_ENABLED', true),
      name: 'São Tomé and Príncipe',
      description: 'Government Residency Program',
    },
    tonino: {
      enabled: getBooleanEnvVar('NEXT_PUBLIC_TONINO_ENABLED', true),
      name: 'Tonino Lamborghini',
      description: 'Luxury Lifestyle Brand',
    },
  },

  // Analytics
  analytics: {
    gaTrackingId: getOptionalEnvVar('NEXT_PUBLIC_GA_TRACKING_ID'),
  },

  // Feature Flags
  features: {
    kyc: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_KYC', true),
    testnet: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_TESTNET', false),
  },
} as const;

export type EnvConfig = typeof env;
