// lib/types/user.types.ts
export enum KYCStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
}

export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  kycStatus: KYCStatus;
  kycProvider?: string;
  kycCompletedAt?: string;
  role: UserRole;
  metadata?: {
    firstName?: string;
    lastName?: string;
    country?: string;
    preferredCurrency?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface KYCData {
  provider: string;
  status: KYCStatus;
  documentType?: string;
  documentNumber?: string;
  verificationId?: string;
  expiresAt?: string;
  rejectionReason?: string;
}

export interface VisaApplication {
  id: string;
  userId: string;
  assetId: string;
  status: 'DRAFT' | 'SUBMITTED' | 'PROCESSING' | 'APPROVED' | 'REJECTED';
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    passportExpiry: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state?: string;
      country: string;
      postalCode: string;
    };
  };
  documents: {
    passport?: File | string;
    photo?: File | string;
    proofOfFunds?: File | string;
    criminalRecord?: File | string;
    medicalCertificate?: File | string;
    additionalDocuments?: Array<File | string>;
  };
  declaration: {
    agreeToTerms: boolean;
    agreeToProcessing: boolean;
    declarationDate: string;
  };
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}