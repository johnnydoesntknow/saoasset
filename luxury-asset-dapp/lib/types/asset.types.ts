// lib/types/asset.types.ts
export enum AssetType {
  VEHICLE = 'VEHICLE',
  VISA = 'VISA',
  LUXURY_ITEM = 'LUXURY_ITEM',
  WATCH = 'WATCH',
  SUIT = 'SUIT',
  ACCESSORY = 'ACCESSORY',
}

export enum AssetStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  PENDING = 'PENDING',
}

export enum Partner {
  MANSORY = 'MANSORY',
  SAOTOME = 'SAOTOME',
  TONINO = 'TONINO',
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
    opnAllocation: number;
  };
  status: AssetStatus;
  totalSupply: number;
  available: number;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleAsset extends Asset {
  type: AssetType.VEHICLE;
  metadata: {
    brand: string;
    model: string;
    year: number;
    specifications: {
      engine: string;
      horsepower: number;
      topSpeed: string;
      acceleration: string;
    };
    features: string[];
  };
}

export interface VisaAsset extends Asset {
  type: AssetType.VISA;
  metadata: {
    country: string;
    visaType: string;
    duration: string;
    benefits: string[];
    requirements: string[];
    processingTime: string;
  };
}

export interface LuxuryItem extends Asset {
  type: AssetType.LUXURY_ITEM | AssetType.WATCH | AssetType.SUIT | AssetType.ACCESSORY;
  metadata: {
    brand: string;
    collection: string;
    materials: string[];
    dimensions?: {
      width?: string;
      height?: string;
      depth?: string;
      weight?: string;
    };
    warranty?: string;
    authenticity?: string;
  };
}