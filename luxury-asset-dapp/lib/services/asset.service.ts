// lib/services/asset.service.ts
import { Asset, Partner, AssetType, VehicleAsset, VisaAsset, LuxuryItem } from '@/lib/types';
import { api, ApiResponse, PaginatedResponse } from './api';

export interface AssetFilters {
  partner?: Partner;
  type?: AssetType;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  search?: string;
}

class AssetService {
  private readonly basePath = '/assets';

  async getAssets(filters?: AssetFilters, page = 1, pageSize = 12): Promise<PaginatedResponse<Asset>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...filters,
    } as any);

    const response = await api.get<PaginatedResponse<Asset>>(`${this.basePath}?${params}`);
    return response.data || { items: [], total: 0, page, pageSize, hasMore: false };
  }

  async getAssetById(id: string): Promise<Asset | null> {
    const response = await api.get<Asset>(`${this.basePath}/${id}`);
    return response.data || null;
  }

  async getAssetsByPartner(partner: Partner): Promise<Asset[]> {
    const response = await api.get<Asset[]>(`${this.basePath}/partner/${partner}`);
    return response.data || [];
  }

  async getFeaturedAssets(): Promise<Asset[]> {
    const response = await api.get<Asset[]>(`${this.basePath}/featured`);
    return response.data || [];
  }

  async checkAvailability(assetId: string, quantity = 1): Promise<boolean> {
    const response = await api.get<{ available: boolean }>(`${this.basePath}/${assetId}/availability`, {
      params: { quantity },
    });
    return response.data?.available || false;
  }

  async reserveAsset(assetId: string, quantity = 1): Promise<ApiResponse> {
    return api.post(`${this.basePath}/${assetId}/reserve`, { quantity });
  }

  // Mock data for development
  getMockAssets(): Asset[] {
    return [
      // Mansory vehicles
      {
        id: 'mansory-1',
        partnerId: Partner.MANSORY,
        type: AssetType.VEHICLE,
        name: 'Mansory Venatus Evo',
        description: 'Ultra-luxury SUV with custom carbon fiber body kit and enhanced performance',
        images: ['/images/placeholders/mansory-1.jpg'],
        price: { usd: 850000, opnAllocation: 14166.67 },
        status: 'AVAILABLE' as any,
        totalSupply: 10,
        available: 7,
        metadata: {
          brand: 'Lamborghini Urus',
          model: 'Venatus Evo',
          year: 2024,
          specifications: {
            engine: '4.0L Twin-Turbo V8',
            horsepower: 820,
            topSpeed: '320 km/h',
            acceleration: '0-100 km/h in 2.9s',
          },
          features: ['Carbon Fiber Body', 'Custom Interior', '24" Forged Wheels', 'Sport Exhaust'],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as VehicleAsset,
      // Add more mock assets...
    ];
  }
}

export const assetService = new AssetService();