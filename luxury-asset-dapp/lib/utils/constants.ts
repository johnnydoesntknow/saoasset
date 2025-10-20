// lib/utils/constants.ts
export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  GOERLI: 5,
  SEPOLIA: 11155111,
} as const;

export const STABLECOIN_DECIMALS = {
  USDC: 6,
  USDT: 6,
} as const;

export const FILE_SIZE_LIMITS = {
  IMAGE: 10, // MB
  DOCUMENT: 20, // MB
  VIDEO: 100, // MB
} as const;

export const ACCEPTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  DOCUMENT: ['application/pdf'],
  ALL: ['image/*', 'application/pdf'],
} as const;

export const TRANSACTION_CONFIRMATIONS = {
  MINIMUM: 1,
  RECOMMENDED: 3,
  SAFE: 6,
} as const;

export const API_ENDPOINTS = {
  ASSETS: '/assets',
  USERS: '/users',
  TRANSACTIONS: '/transactions',
  KYC: '/kyc',
  VISA_APPLICATIONS: '/visa-applications',
} as const;

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  KYC_REQUIRED: 'KYC verification is required for this action',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again',
  NETWORK_ERROR: 'Network error. Please check your connection',
} as const;

export const SUCCESS_MESSAGES = {
  TRANSACTION_SUBMITTED: 'Transaction submitted successfully',
  KYC_SUBMITTED: 'KYC verification submitted successfully',
  APPLICATION_SUBMITTED: 'Application submitted successfully',
  PAYMENT_SUCCESSFUL: 'Payment completed successfully',
} as const;