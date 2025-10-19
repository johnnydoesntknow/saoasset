// components/kyc/KYCModal.tsx
'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useUserStore, useUIStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  User, 
  FileText,
  Camera,
  Loader2
} from 'lucide-react';

interface KYCModalProps {
  onComplete?: () => void;
}

export const KYCModal: React.FC<KYCModalProps> = ({ onComplete }) => {
  const { modalOpen, setModalOpen } = useUIStore();
  const { user, updateKYCStatus } = useUserStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    documentType: 'passport',
    documentNumber: '',
    documentFront: null as File | null,
    documentBack: null as File | null,
    selfie: null as File | null,
  });

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData({
      ...formData,
      [field]: file,
    });
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate KYC processing - in production this would call your KYC API
    setTimeout(() => {
      updateKYCStatus(KYCStatus.APPROVED);
      setIsProcessing(false);
      setModalOpen('kyc', false);
      if (onComplete) {
        onComplete();
      }
    }, 3000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="w-16 h-16 mx-auto text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Please provide your personal details as they appear on your official documents
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FileText className="w-16 h-16 mx-auto text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Document Information</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Select your document type and provide the document number
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                  Document Type
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
                >
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>
              <Input
                label="Document Number"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Upload className="w-16 h-16 mx-auto text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Document Upload</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Upload clear photos of your documents
              </p>
            </div>
            <div className="space-y-4">
              <FileUploadField
                label="Document Front"
                field="documentFront"
                currentFile={formData.documentFront}
                onUpload={handleFileUpload}
              />
              {formData.documentType !== 'passport' && (
                <FileUploadField
                  label="Document Back"
                  field="documentBack"
                  currentFile={formData.documentBack}
                  onUpload={handleFileUpload}
                />
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Camera className="w-16 h-16 mx-auto text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Selfie Verification</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Take a clear selfie for identity verification
              </p>
            </div>
            <FileUploadField
              label="Selfie Photo"
              field="selfie"
              currentFile={formData.selfie}
              onUpload={handleFileUpload}
              accept="image/*"
              capture="user"
            />
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-semibold mb-1">Tips for a good selfie:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ensure your face is clearly visible</li>
                    <li>Remove glasses and head coverings if possible</li>
                    <li>Use good lighting</li>
                    <li>Look directly at the camera</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={modalOpen.kyc}
      onClose={() => setModalOpen('kyc', false)}
      title="Identity Verification"
      size="lg"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step > stepNum
                      ? 'bg-green-500 text-white'
                      : step === stepNum
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="w-6 h-6" /> : stepNum}
                </div>
              </div>
              {stepNum < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    step > stepNum ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {isProcessing ? (
          <div className="py-12 text-center">
            <Loader2 className="w-16 h-16 mx-auto text-primary-500 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Processing Your Verification
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This may take a few moments...
            </p>
          </div>
        ) : (
          renderStepContent()
        )}

        {/* Navigation Buttons */}
        {!isProcessing && (
          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            {step < totalSteps ? (
              <Button
                variant="primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!formData.selfie}
              >
                Submit Verification
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

// File Upload Component
interface FileUploadFieldProps {
  label: string;
  field: string;
  currentFile: File | null;
  onUpload: (field: string, file: File) => void;
  accept?: string;
  capture?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  field,
  currentFile,
  onUpload,
  accept = "image/*",
  capture,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(field, file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {label}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        capture={capture as any}
        onChange={handleFileChange}
        className="hidden"
      />
      <GlassPanel
        variant="light"
        className="p-6 cursor-pointer hover:bg-white/20 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentFile ? currentFile.name : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            PNG, JPG up to 10MB
          </p>
        </div>
      </GlassPanel>
    </div>
  );
};
