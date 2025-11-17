// lib/types/residency.types.ts

export enum PackageType {
  SINGLE = 'single',
  COUPLE = 'couple',
  FAMILY = 'family',
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  PACKAGE_SELECTED = 'PACKAGE_SELECTED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  INFO_COLLECTION = 'INFO_COLLECTION',
  DOCUMENTS_PENDING = 'DOCUMENTS_PENDING',
  DOCUMENTS_UPLOADED = 'DOCUMENTS_UPLOADED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ISSUED = 'ISSUED',
}

export interface ResidencyPackage {
  id: PackageType;
  name: string;
  price: number;
  opnAllocation: number;
  description: string;
  features: string[];
  maxMembers: number;
  popular?: boolean;
}

export interface ApplicantInfo {
  // Personal Information
  firstName: string;
  lastName: string;
  middleName?: string;
  previousNames?: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  previousNationalities?: string;
  
  // Passport Information
  passportNumber: string;
  passportIssueDate: string;
  passportExpiry: string;
  passportIssuePlace: string;
  
  // Contact Information
  email: string;
  phone: string;
  alternatePhone?: string;
  
  // Address
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  residenceSince: string;
  
  // Previous Addresses
  previousAddresses?: {
    address: string;
    dates: string;
  }[];
  
  // Employment
  occupation: string;
  employer: string;
  employerAddress: string;
  employmentSince: string;
  annualIncome: string;
  
  // Languages
  nativeLanguage: string;
  otherLanguages?: string;
  englishProficiency: string;
  
  // Marital Status
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
  marriageDate?: string;
  marriagePlace?: string;
  previousMarriages?: string;
  divorceDetails?: string;
  
  // Legal History
  visaDenial?: string;
  visaDenialDetails?: string;
  criminalRecord?: string;
  criminalRecordDetails?: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  emergencyContactEmail: string;
  emergencyContactAddress: string;
}

export interface FamilyMemberInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  maidenName?: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender?: 'male' | 'female';
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  relationship: 'spouse' | 'child';
}

export interface DocumentRequirement {
  id: string;
  name: string;
  required: boolean;
  description?: string;
  acceptedFormats: string[];
  maxSize: number; // in MB
  category: 'identity' | 'financial' | 'legal' | 'medical' | 'personal' | 'family';
}

export interface UploadedDocument {
  id: string;
  requirementId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
}

export interface ResidencyApplication {
  id: string;
  userId: string;
  applicationNumber: string;
  packageType: PackageType;
  status: ApplicationStatus;
  
  // Payment Information
  paymentAmount: number;
  paymentCurrency: 'USD';
  paymentMethod?: 'USDC' | 'USDT';
  paymentTransactionHash?: string;
  paymentCompletedAt?: string;
  opnAllocation: number;
  
  // Applicant Information
  primaryApplicant: ApplicantInfo;
  familyMembers?: FamilyMemberInfo[];
  
  // Documents
  documents: UploadedDocument[];
  
  // Processing Information
  submittedAt?: string;
  reviewStartedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  issuedAt?: string;
  
  // Metadata
  currentStep: number;
  completedSteps: number[];
  lastUpdated: string;
  createdAt: string;
  notes?: string;
}

export interface ApplicationStep {
  id: number;
  label: string;
  description: string;
  status: 'pending' | 'current' | 'completed';
  requiredFields?: string[];
  validationRules?: any;
}