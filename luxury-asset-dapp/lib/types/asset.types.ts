// lib/types/asset.types.ts
export enum AssetType {
  VISA = 'VISA',
  RESIDENCY = 'RESIDENCY',
}

export enum AssetStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  PENDING = 'PENDING',
}

export enum Partner {
  SAOTOME = 'SAOTOME',
}

export interface Asset {
  id: string;
  partnerId: Partner;
  type: AssetType;
  name: string;
  description: string;
  images: string[];
  price: {
    usd: number;
  };
  status: AssetStatus;
  totalSupply: number;
  available: number;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface VisaAsset extends Asset {
  type: AssetType.VISA | AssetType.RESIDENCY;
  metadata: {
    country: string;
    visaType: string;
    duration: string;
    benefits: string[];
    requirements: string[];
    processingTime: string;
  };
}