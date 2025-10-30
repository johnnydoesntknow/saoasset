// lib/services/payment.service.ts
import { api, ApiResponse } from './api';
import { Transaction, PaymentRequest, StablecoinType, PaymentStatus } from '@/lib/types';
import { env } from '@/lib/config/env';

class PaymentService {
  private readonly basePath = '/payments';

  async initiatePayment(request: PaymentRequest): Promise<ApiResponse<Transaction>> {
    return api.post<Transaction>(`${this.basePath}/initiate`, request);
  }

  async confirmPayment(transactionId: string, txHash: string): Promise<ApiResponse<Transaction>> {
    return api.post<Transaction>(`${this.basePath}/${transactionId}/confirm`, { 
      transactionHash: txHash 
    });
  }

  async getTransaction(transactionId: string): Promise<Transaction | null> {
    const response = await api.get<Transaction>(`${this.basePath}/${transactionId}`);
    return response.data || null;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>(`${this.basePath}/user/${userId}`);
    return response.data || [];
  }

  async getTransactionStatus(transactionId: string): Promise<PaymentStatus> {
    const response = await api.get<{ status: PaymentStatus }>(`${this.basePath}/${transactionId}/status`);
    return response.data?.status || PaymentStatus.IDLE;
  }

  async cancelTransaction(transactionId: string): Promise<ApiResponse> {
    return api.post(`${this.basePath}/${transactionId}/cancel`);
  }

  // Helper function to calculate fees
  calculateFees(amount: number, paymentMethod: StablecoinType): {
    subtotal: number;
    networkFee: number;
    processingFee: number;
    total: number;
  } {
    const networkFee = paymentMethod === StablecoinType.USDC ? 5 : 7; // Mock fees
    const processingFee = amount * 0.01; // 1% processing fee
    
    return {
      subtotal: amount,
      networkFee,
      processingFee,
      total: amount + networkFee + processingFee,
    };
  }

  // Helper to get stablecoin balance (mock for now)
  async getStablecoinBalance(
    walletAddress: string, 
    stablecoin: StablecoinType
  ): Promise<number> {
    // In production, this would query the blockchain
    // For now, return mock balances
    const mockBalances = {
      [StablecoinType.USDC]: 5000,
      [StablecoinType.USDT]: 3000,
    };
    
    return mockBalances[stablecoin] || 0;
  }

  // Validate payment before processing
  async validatePayment(
    amount: number,
    walletAddress: string,
    stablecoin: StablecoinType
  ): Promise<{ valid: boolean; error?: string }> {
    const balance = await this.getStablecoinBalance(walletAddress, stablecoin);
    
    if (balance < amount) {
      return {
        valid: false,
        error: 'Insufficient balance',
      };
    }
    
    if (amount <= 0) {
      return {
        valid: false,
        error: 'Invalid amount',
      };
    }
    
    return { valid: true };
  }

  // Get treasury wallet address
  getTreasuryWallet(): string {
    return env.blockchain.treasury.wallet;
  }

  // Get stablecoin contract addresses
  getStablecoinContract(type: StablecoinType): string {
    const contracts = {
      [StablecoinType.USDC]: env.blockchain.contracts.usdc,
      [StablecoinType.USDT]: env.blockchain.contracts.usdt,
    };
    
    return contracts[type];
  }
}

export const paymentService = new PaymentService();
