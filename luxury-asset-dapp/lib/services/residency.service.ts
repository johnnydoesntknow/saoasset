// lib/services/residency.service.ts
import { api, ApiResponse } from './api';
import { 
  ResidencyApplication, 
  ResidencyPackage, 
  PackageType,
  ApplicationStatus,
  DocumentRequirement,
  UploadedDocument,
  ApplicantInfo,
  FamilyMemberInfo
} from '@/lib/types/residency.types';
import { env } from '@/lib/config/env';

class ResidencyService {
  private readonly basePath = '/residency';

  // Get available residency packages
  getPackages(): ResidencyPackage[] {
    return [
      {
        id: PackageType.SINGLE,
        name: 'Single Residency',
        price: env.saotome.packages.single.price,
        opnAllocation: env.saotome.packages.single.opnAllocation,
        description: 'Individual residency permit for one person',
        maxMembers: 1,
        features: [
          'Valid for 5 years',
          'Renewable indefinitely',
          'Visa-free travel to 50+ countries',
          'Tax benefits on foreign income',
          'No minimum stay requirement',
          'Fast-track processing available',
        ]
      },
      {
        id: PackageType.COUPLE,
        name: 'Couple Residency',
        price: env.saotome.packages.couple.price,
        opnAllocation: env.saotome.packages.couple.opnAllocation,
        description: 'Residency for married couple',
        maxMembers: 2,
        popular: true,
        features: [
          'Covers both spouses',
          'Valid for 5 years',
          'Renewable indefinitely',
          'Visa-free travel to 50+ countries',
          'Tax benefits on foreign income',
          'Joint application processing',
        ]
      },
      {
        id: PackageType.FAMILY,
        name: 'Family Residency',
        price: env.saotome.packages.family.price,
        opnAllocation: env.saotome.packages.family.opnAllocation,
        description: 'Complete family residency (up to 4 members)',
        maxMembers: 4,
        features: [
          'Covers family of 4',
          'Valid for 5 years',
          'Renewable indefinitely',
          'Include dependent children under 18',
          'Education benefits',
          'Family reunification rights',
        ]
      }
    ];
  }

  // Create new application
  async createApplication(
    userId: string,
    packageType: PackageType
  ): Promise<ApiResponse<ResidencyApplication>> {
    const packages = this.getPackages();
    const selectedPackage = packages.find(p => p.id === packageType);
    
    if (!selectedPackage) {
      throw new Error('Invalid package type');
    }

    const application = {
      userId,
      packageType,
      paymentAmount: selectedPackage.price,
      opnAllocation: selectedPackage.opnAllocation,
    };

    return api.post<ResidencyApplication>(`${this.basePath}/applications`, application);
  }

  // Get user's application
  async getApplication(userId: string): Promise<ResidencyApplication | null> {
    const response = await api.get<ResidencyApplication>(`${this.basePath}/applications/user/${userId}`);
    return response.data || null;
  }

  // Get application by ID
  async getApplicationById(applicationId: string): Promise<ResidencyApplication | null> {
    const response = await api.get<ResidencyApplication>(`${this.basePath}/applications/${applicationId}`);
    return response.data || null;
  }

  // Update application information
  async updateApplication(
    applicationId: string,
    data: Partial<ResidencyApplication>
  ): Promise<ApiResponse<ResidencyApplication>> {
    return api.patch<ResidencyApplication>(`${this.basePath}/applications/${applicationId}`, data);
  }

  // Submit primary applicant information
  async submitApplicantInfo(
    applicationId: string,
    applicantInfo: ApplicantInfo
  ): Promise<ApiResponse> {
    return api.post(`${this.basePath}/applications/${applicationId}/applicant`, applicantInfo);
  }

  // Submit family member information
  async submitFamilyMembers(
    applicationId: string,
    familyMembers: FamilyMemberInfo[]
  ): Promise<ApiResponse> {
    return api.post(`${this.basePath}/applications/${applicationId}/family`, { familyMembers });
  }

  // Get document requirements based on package type
  getDocumentRequirements(packageType: PackageType): DocumentRequirement[] {
    const baseRequirements: DocumentRequirement[] = [
      // Primary Applicant Documents
      {
        id: 'passport',
        name: 'Passport (All Pages)',
        required: true,
        category: 'identity',
        acceptedFormats: ['pdf', 'jpg', 'png'],
        maxSize: 10,
        description: 'Complete scan of all passport pages',
      },
      {
        id: 'passport_photo',
        name: 'Passport Photo',
        required: true,
        category: 'identity',
        acceptedFormats: ['jpg', 'png'],
        maxSize: 5,
        description: 'Recent passport-style photo (2x2 inches)',
      },
      {
        id: 'birth_certificate',
        name: 'Birth Certificate',
        required: true,
        category: 'personal',
        acceptedFormats: ['pdf', 'jpg', 'png'],
        maxSize: 10,
        description: 'Official birth certificate with translation if not in English',
      },
      {
        id: 'criminal_record_home',
        name: 'Criminal Record - Home Country',
        required: true,
        category: 'legal',
        acceptedFormats: ['pdf'],
        maxSize: 10,
        description: 'Police clearance from country of citizenship (issued within 6 months)',
      },
      {
        id: 'criminal_record_current',
        name: 'Criminal Record - Current Residence',
        required: true,
        category: 'legal',
        acceptedFormats: ['pdf'],
        maxSize: 10,
        description: 'Police clearance from current country of residence if different',
      },
      {
        id: 'medical_certificate',
        name: 'Medical Certificate',
        required: true,
        category: 'medical',
        acceptedFormats: ['pdf'],
        maxSize: 10,
        description: 'General health certificate from licensed physician',
      },
      {
        id: 'hiv_test',
        name: 'HIV/AIDS Test Result',
        required: true,
        category: 'medical',
        acceptedFormats: ['pdf'],
        maxSize: 10,
        description: 'Negative HIV test result (within 3 months)',
      },
      {
        id: 'bank_statements',
        name: 'Bank Statements',
        required: true,
        category: 'financial',
        acceptedFormats: ['pdf'],
        maxSize: 20,
        description: 'Last 6 months of bank statements',
      },
      {
        id: 'proof_of_funds',
        name: 'Proof of Funds',
        required: true,
        category: 'financial',
        acceptedFormats: ['pdf'],
        maxSize: 10,
        description: 'Bank letter confirming available funds',
      },
      {
        id: 'employment_letter',
        name: 'Employment Letter',
        required: true,
        category: 'financial',
        acceptedFormats: ['pdf'],
        maxSize: 10,
        description: 'Current employment verification letter',
      },
      {
        id: 'proof_of_address',
        name: 'Proof of Address',
        required: true,
        category: 'personal',
        acceptedFormats: ['pdf', 'jpg', 'png'],
        maxSize: 10,
        description: 'Utility bill or bank statement showing current address',
      },
    ];

    // Add spouse documents for couple/family packages
    if (packageType === PackageType.COUPLE || packageType === PackageType.FAMILY) {
      baseRequirements.push(
        {
          id: 'spouse_passport',
          name: 'Spouse Passport',
          required: true,
          category: 'family',
          acceptedFormats: ['pdf', 'jpg', 'png'],
          maxSize: 10,
          description: 'Complete scan of spouse passport',
        },
        {
          id: 'spouse_criminal_record',
          name: 'Spouse Criminal Record',
          required: true,
          category: 'family',
          acceptedFormats: ['pdf'],
          maxSize: 10,
          description: 'Spouse police clearance certificate',
        },
        {
          id: 'marriage_certificate',
          name: 'Marriage Certificate',
          required: true,
          category: 'family',
          acceptedFormats: ['pdf', 'jpg', 'png'],
          maxSize: 10,
          description: 'Official marriage certificate with translation',
        }
      );
    }

    // Add children documents for family package
    if (packageType === PackageType.FAMILY) {
      baseRequirements.push(
        {
          id: 'children_birth_certificates',
          name: 'Children Birth Certificates',
          required: true,
          category: 'family',
          acceptedFormats: ['pdf', 'jpg', 'png'],
          maxSize: 20,
          description: 'Birth certificates for all dependent children',
        },
        {
          id: 'children_passports',
          name: 'Children Passports',
          required: true,
          category: 'family',
          acceptedFormats: ['pdf', 'jpg', 'png'],
          maxSize: 20,
          description: 'Passports for all dependent children',
        }
      );
    }

    return baseRequirements;
  }

  // Upload document
  async uploadDocument(
    applicationId: string,
    requirementId: string,
    file: File
  ): Promise<ApiResponse<UploadedDocument>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('requirementId', requirementId);

    return api.post<UploadedDocument>(
      `${this.basePath}/applications/${applicationId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  // Get application documents
  async getApplicationDocuments(applicationId: string): Promise<UploadedDocument[]> {
    const response = await api.get<UploadedDocument[]>(
      `${this.basePath}/applications/${applicationId}/documents`
    );
    return response.data || [];
  }

  // Submit application for review
  async submitForReview(applicationId: string): Promise<ApiResponse> {
    return api.post(`${this.basePath}/applications/${applicationId}/submit`);
  }

  // Update application status
  async updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<ApiResponse> {
    return api.patch(`${this.basePath}/applications/${applicationId}/status`, { status });
  }

  // Calculate OPN token benefits
  calculateOpnBenefits(packageType: PackageType): {
    opnTokens: number;
    usdValue: number;
    stakingPeriod: string;
    estimatedApy: number;
    projectedValue: number;
  } {
    const packages = this.getPackages();
    const selectedPackage = packages.find(p => p.id === packageType);
    
    if (!selectedPackage) {
      throw new Error('Invalid package type');
    }

    const opnTokens = selectedPackage.opnAllocation;
    const launchPrice = env.saotome.opnLaunchPrice;
    const estimatedApy = 15; // 15% estimated APY
    const stakingPeriodYears = 5;

    return {
      opnTokens,
      usdValue: opnTokens * launchPrice,
      stakingPeriod: `${stakingPeriodYears} years`,
      estimatedApy,
      projectedValue: opnTokens * launchPrice * Math.pow(1 + estimatedApy / 100, stakingPeriodYears),
    };
  }

  // Mock payment processing
  async processPayment(
    applicationId: string,
    paymentMethod: 'USDC' | 'USDT',
    transactionHash: string
  ): Promise<ApiResponse> {
    return api.post(`${this.basePath}/applications/${applicationId}/payment`, {
      paymentMethod,
      transactionHash,
      paymentCompletedAt: new Date().toISOString(),
    });
  }
}

export const residencyService = new ResidencyService();