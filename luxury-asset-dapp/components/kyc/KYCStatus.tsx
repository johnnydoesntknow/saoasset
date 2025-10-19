// components/kyc/KYCStatus.tsx
'use client';

import React from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { useUserStore, useUIStore } from '@/lib/store/useStore';
import { KYCStatus as KYCStatusType } from '@/lib/types';
import { Shield, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export const KYCStatusBadge: React.FC = () => {
  const { user } = useUserStore();
  const { setModalOpen } = useUIStore();

  if (!user) return null;

  const statusConfig = {
    [KYCStatusType.NOT_STARTED]: {
      icon: Shield,
      color: 'text-gray-500',
      bg: 'bg-gray-100 dark:bg-gray-800',
      label: 'Not Verified',
      action: 'Start Verification',
    },
    [KYCStatusType.PENDING]: {
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100 dark:bg-yellow-900/20',
      label: 'Pending',
      action: null,
    },
    [KYCStatusType.IN_REVIEW]: {
      icon: Clock,
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      label: 'In Review',
      action: null,
    },
    [KYCStatusType.APPROVED]: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-900/20',
      label: 'Verified',
      action: null,
    },
    [KYCStatusType.REJECTED]: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-100 dark:bg-red-900/20',
      label: 'Rejected',
      action: 'Retry Verification',
    },
    [KYCStatusType.EXPIRED]: {
      icon: AlertCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-100 dark:bg-orange-900/20',
      label: 'Expired',
      action: 'Renew Verification',
    },
  };

  const config = statusConfig[user.kycStatus];
  const Icon = config.icon;

  return (
    <GlassPanel variant="light" className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${config.bg}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">KYC Status</p>
            <p className="font-semibold text-gray-900 dark:text-white">{config.label}</p>
          </div>
        </div>
        {config.action && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setModalOpen('kyc', true)}
          >
            {config.action}
          </Button>
        )}
      </div>
    </GlassPanel>
  );
};
