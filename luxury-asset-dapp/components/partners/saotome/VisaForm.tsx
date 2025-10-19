// components/partners/saotome/VisaForm.tsx
'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { FormSteps } from './FormSteps';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useVisaApplicationStore, useUserStore, useUIStore } from '@/lib/store/useStore';
import { KYCStatus } from '@/lib/types';
import { 
  User, 
  FileText, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { formatCurrency } from '@/lib/utils/format';

export const VisaForm: React.FC = () => {
  const { user } = useUserStore();
  const { setModalOpen } = useUIStore();
  const { 
    currentApplication,
    currentStep,
    setCurrentStep,
    updateApplicationField,
    resetApplication
  } = useVisaApplicationStore();

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    
    // Contact Info
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    
    // Documents
    passport: null as File | null,
    photo: null as File | null,
    proofOfFunds: null as File | null,
    criminalRecord: null as File | null,
    medicalCertificate: null as File | null,
    
    // Declaration
    agreeToTerms: false,
    agreeToProcessing: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (!user) {
      alert('Please connect your wallet first');
      return;
    }

    if (user.kycStatus !== KYCStatus.APPROVED) {
      setModalOpen('kyc', true);
      return;
    }

    // Process visa application
    setModalOpen('payment', true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && 
               formData.nationality && formData.passportNumber && formData.passportExpiry;
      case 2:
        return formData.email && formData.phone && formData.street && 
               formData.city && formData.country && formData.postalCode;
      case 3:
        return formData.passport && formData.photo && formData.proofOfFunds;
      case 4:
        return formData.agreeToTerms && formData.agreeToProcessing;
      default:
        return false;
    }
  };

  return (
    <GlassPanel variant="dark" className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Residency Application</h2>
      
      <FormSteps currentStep={currentStep} />

      <div className="mt-8">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                icon={<User className="w-4 h-4 text-gray-400" />}
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
              label="Middle Name (Optional)"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                icon={<Calendar className="w-4 h-4 text-gray-400" />}
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
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Passport Number"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                icon={<CreditCard className="w-4 h-4 text-gray-400" />}
                required
              />
              <Input
                label="Passport Expiry"
                type="date"
                name="passportExpiry"
                value={formData.passportExpiry}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                icon={<Mail className="w-4 h-4 text-gray-400" />}
                required
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                icon={<Phone className="w-4 h-4 text-gray-400" />}
                required
              />
            </div>
            <Input
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              icon={<MapPin className="w-4 h-4 text-gray-400" />}
              required
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <Input
                label="State/Province"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <DocumentUpload
              label="Passport Copy"
              field="passport"
              currentFile={formData.passport}
              onUpload={(file) => setFormData({ ...formData, passport: file })}
              required
            />
            <DocumentUpload
              label="Passport Photo"
              field="photo"
              currentFile={formData.photo}
              onUpload={(file) => setFormData({ ...formData, photo: file })}
              required
            />
            <DocumentUpload
              label="Proof of Funds"
              field="proofOfFunds"
              currentFile={formData.proofOfFunds}
              onUpload={(file) => setFormData({ ...formData, proofOfFunds: file })}
              required
            />
            <DocumentUpload
              label="Criminal Record Certificate"
              field="criminalRecord"
              currentFile={formData.criminalRecord}
              onUpload={(file) => setFormData({ ...formData, criminalRecord: file })}
            />
            <DocumentUpload
              label="Medical Certificate"
              field="medicalCertificate"
              currentFile={formData.medicalCertificate}
              onUpload={(file) => setFormData({ ...formData, medicalCertificate: file })}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <GlassPanel variant="light" className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Application Summary
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Nationality:</span> {formData.nationality}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Investment:</span> {formatCurrency(150000)}
                </p>
              </div>
            </GlassPanel>

            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-300">
                  I agree to the terms and conditions of the São Tomé and Príncipe 
                  Residency by Investment Program
                </span>
              </label>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToProcessing"
                  checked={formData.agreeToProcessing}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-300">
                  I consent to the processing of my personal data for the purpose 
                  of this application
                </span>
              </label>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  <p className="font-semibold mb-1">Important:</p>
                  <p>
                    By submitting this application, you agree to pay the non-refundable 
                    investment amount of {formatCurrency(150000)} plus government processing fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < 4 ? (
            <Button
              variant="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepValid()}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!isStepValid()}
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </GlassPanel>
  );
};

// Document Upload Component
interface DocumentUploadProps {
  label: string;
  field: string;
  currentFile: File | null;
  onUpload: (file: File) => void;
  required?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  currentFile,
  onUpload,
  required = false,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        {currentFile ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentFile.name}
          </p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive
              ? 'Drop the file here...'
              : 'Drag & drop or click to select file'}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          PDF, PNG, JPG up to 10MB
        </p>
      </div>
    </div>
  );
};