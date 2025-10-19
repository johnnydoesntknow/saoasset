// lib/services/kyc.service.ts
import { api, ApiResponse } from './api';
import { KYCData, KYCStatus, User } from '@/lib/types';

interface KYCSubmission {
  userId: string;
  documentType: string;
  documentNumber: string;
  documents: {
    front: string; // Base64 encoded
    back?: string; // Base64 encoded
    selfie: string; // Base64 encoded
  };
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
  };
}

class KYCService {
  private readonly basePath = '/kyc';

  async submitKYC(submission: KYCSubmission): Promise<ApiResponse<KYCData>> {
    return api.post<KYCData>(`${this.basePath}/submit`, submission);
  }

  async getKYCStatus(userId: string): Promise<KYCData | null> {
    const response = await api.get<KYCData>(`${this.basePath}/status/${userId}`);
    return response.data || null;
  }

  async retryKYC(userId: string): Promise<ApiResponse<KYCData>> {
    return api.post<KYCData>(`${this.basePath}/retry/${userId}`);
  }

  async uploadDocument(
    userId: string,
    documentType: string,
    file: File
  ): Promise<ApiResponse<{ url: string }>> {
    return api.uploadFile(`${this.basePath}/upload/${userId}/${documentType}`, file);
  }

  // Convert file to base64 for submission
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove data:image/...;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  }

  // Validate KYC documents
  validateDocuments(documents: { [key: string]: File | null }): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

    Object.entries(documents).forEach(([key, file]) => {
      if (!file && key !== 'documentBack') {
        errors.push(`${key} is required`);
        return;
      }

      if (file) {
        if (file.size > maxSize) {
          errors.push(`${key} exceeds maximum size of 10MB`);
        }

        if (!allowedTypes.includes(file.type)) {
          errors.push(`${key} must be JPG, PNG, or PDF`);
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Mock KYC verification (for development)
  async mockVerifyKYC(userId: string): Promise<KYCStatus> {
    // Simulate processing time
    return new Promise((resolve) => {
      setTimeout(() => {
        // 80% chance of approval for testing
        const approved = Math.random() > 0.2;
        resolve(approved ? KYCStatus.APPROVED : KYCStatus.REJECTED);
      }, 3000);
    });
  }
}

export const kycService = new KYCService();