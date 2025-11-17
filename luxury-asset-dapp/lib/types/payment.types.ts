// lib/types/payment.types.ts
import { Partner } from './asset.types';

export enum PaymentStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum StablecoinType {
  USDC = 'USDC',
  USDT = 'USDT',
}

export interface PaymentMethod {
  type: StablecoinType;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  icon?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  assetId: string;
  partnerId: Partner;
  paymentMethod: StablecoinType;
  amount: string;
  transactionHash?: string;
  blockNumber?: number;
  chainId: number;
  status: PaymentStatus;
  opnAllocation: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  assetId: string;
  amount: string;
  paymentMethod: StablecoinType;
  userAddress: string;
}