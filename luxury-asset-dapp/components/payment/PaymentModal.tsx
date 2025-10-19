// components/payment/PaymentModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { StablecoinSelector } from './StablecoinSelector';
import { TransactionStatus } from './TransactionStatus';
import { useCartStore, usePaymentStore, useUIStore, useUserStore } from '@/lib/store/useStore';
import { formatCurrency, formatAddress } from '@/lib/utils/format';
import { env } from '@/lib/config/env';
import { 
  ShoppingCart, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { StablecoinType, PaymentStatus } from '@/lib/types';

export const PaymentModal: React.FC = () => {
  const { modalOpen, setModalOpen } = useUIStore();
  const { items, clearCart, getTotalAmount } = useCartStore();
  const { 
    paymentStatus, 
    selectedStablecoin,
    setPaymentStatus,
    setSelectedStablecoin,
    resetPayment
  } = usePaymentStore();
  const { user } = useUserStore();
  
  const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Status
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = getTotalAmount();

  useEffect(() => {
    if (!modalOpen.payment) {
      // Reset when modal closes
      setStep(1);
      resetPayment();
    }
  }, [modalOpen.payment, resetPayment]);

  const handlePayment = async () => {
    if (!selectedStablecoin || !user) return;
    
    setIsProcessing(true);
    setPaymentStatus(PaymentStatus.PENDING);
    setStep(3);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus(PaymentStatus.CONFIRMING);
      
      setTimeout(() => {
        setPaymentStatus(PaymentStatus.CONFIRMED);
        setIsProcessing(false);
        
        // Clear cart after successful payment
        setTimeout(() => {
          clearCart();
          setModalOpen('payment', false);
        }, 3000);
      }, 3000);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Summary
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <GlassPanel key={item.id} variant="default" className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.partnerId}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(item.price.usd)}
                        </p>
                       
                      </div>
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </div>

            {/* Total */}
            <GlassPanel variant="solid" className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Total Amount</span>
                <span className="text-2xl font-bold text-white">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </GlassPanel>

            {/* Treasury Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    Payment Information
                  </p>
                  <p className="text-blue-600 dark:text-blue-400">
                    Funds will be sent to the treasury wallet:
                  </p>
                  <p className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {formatAddress(env.blockchain.treasury.wallet)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Select Payment Method
              </h3>
              <StablecoinSelector
                selected={selectedStablecoin}
                onSelect={setSelectedStablecoin}
                amount={totalAmount}
              />
            </div>

            {/* Payment Summary */}
            <GlassPanel variant="dark" className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-300">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee (est.)</span>
                <span className="text-gray-300">~$5.00</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="font-semibold text-white">
                  {formatCurrency(totalAmount + 5)}
                </span>
              </div>
            </GlassPanel>

            {/* Wallet Info */}
            {user && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Paying from wallet:
                </p>
                <p className="font-mono text-sm text-gray-900 dark:text-white">
                  {formatAddress(user.walletAddress)}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <TransactionStatus 
            status={paymentStatus}
            amount={totalAmount}
            stablecoin={selectedStablecoin}
          />
        );

      default:
        return null;
    }
  };

  const getActionButtons = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Button
              variant="ghost"
              onClick={() => setModalOpen('payment', false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep(2)}
              disabled={items.length === 0}
            >
              Continue to Payment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </>
        );

      case 2:
        return (
          <>
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={!selectedStablecoin || isProcessing}
              loading={isProcessing}
            >
              Confirm Payment
            </Button>
          </>
        );

      case 3:
        if (paymentStatus === PaymentStatus.CONFIRMED) {
          return (
            <Button
              variant="primary"
              onClick={() => setModalOpen('payment', false)}
              className="w-full"
            >
              Done
            </Button>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={modalOpen.payment}
      onClose={() => !isProcessing && setModalOpen('payment', false)}
      title={step === 1 ? 'Review Order' : step === 2 ? 'Payment' : 'Transaction Status'}
      size="lg"
      closeOnOverlayClick={!isProcessing}
    >
      <div className="space-y-6">
        {renderStepContent()}
        
        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          {getActionButtons()}
        </div>
      </div>
    </Modal>
  );
};