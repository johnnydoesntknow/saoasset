'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';
import { SimplePaymentModal } from '@/components/payment/SimplePaymentModal';
import { VisaApplicationForm } from '@/components/partners/saotome/VisaApplicationForm';
import { Check, Upload } from 'lucide-react';
import { Input } from '@/components/ui/Input';

type PackageType = 'single' | 'couple' | 'family' | null;

export default function SaotomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [infoCompleted, setInfoCompleted] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
  // Primary Applicant
  firstName: '',
  lastName: '',
  middleName: '',
  dateOfBirth: '',
  nationality: '',
  passportNumber: '',
  passportExpiry: '',
  placeOfBirth: '',
  
  // Contact Info
  email: '',
  phone: '',
  
  // Address
  street: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  
  // Employment & Financial
  occupation: '',
  employer: '',
  annualIncome: '',
  
  // Personal Status
  maritalStatus: '',
  visaDenial: '',
  visaDenialDetails: '',
  criminalRecord: '',
  criminalRecordDetails: '',
  
  // Emergency Contact
  emergencyContactName: '',
  emergencyContactRelation: '',
  emergencyContactPhone: '',
  emergencyContactEmail: '',
  
  // Spouse (for couple/family)
  spouseFirstName: '',
  spouseLastName: '',
  spouseMiddleName: '',
  spouseDateOfBirth: '',
  spouseNationality: '',
  spousePlaceOfBirth: '',
  spousePassportNumber: '',
  spousePassportExpiry: '',
  
  // Child 1 (for family)
  child1FirstName: '',
  child1LastName: '',
  child1MiddleName: '',
  child1DateOfBirth: '',
  child1Nationality: '',
  child1PlaceOfBirth: '',
  child1PassportNumber: '',
  child1PassportExpiry: '',
  
  // Child 2 (for family)
  child2FirstName: '',
  child2LastName: '',
  child2MiddleName: '',
  child2DateOfBirth: '',
  child2Nationality: '',
  child2PlaceOfBirth: '',
  child2PassportNumber: '',
  child2PassportExpiry: '',
});
  
  const [uploadedDocs, setUploadedDocs] = useState({
    passport: null as File | null,
    criminalRecord: null as File | null,
    proofOfFunds: null as File | null,
    medicalCertificate: null as File | null,
  });

  const packages = [
    {
      id: 'single' as PackageType,
      name: 'Single Residency',
      price: 25000,
      description: 'Individual residency permit',
      features: [
        'Valid for 5 years',
        'Renewable indefinitely',
        'Visa-free travel to 50+ countries',
        'Tax benefits on foreign income',
      ]
    },
    {
      id: 'couple' as PackageType,
      name: 'Couple Residency',
      price: 50000,
      description: 'Residency for married couple',
      features: [
        'Covers both spouses',
        'Valid for 5 years',
        'Renewable indefinitely',
        'Visa-free travel to 50+ countries',
      ],
      popular: true
    },
    {
      id: 'family' as PackageType,
      name: 'Family Residency',
      price: 100000,
      description: 'Family of up to 4 members',
      features: [
        'Covers family of 4',
        'Valid for 5 years',
        'Renewable indefinitely',
        'Include dependent children',
      ]
    }
  ];

  const handlePackageSelect = (packageId: PackageType) => {
    setSelectedPackage(packageId);
  };

  const handleContinueToPayment = () => {
    if (selectedPackage) {
      setCurrentStep(2);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setShowPayment(false);
    setCurrentStep(3);
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInfoCompleted(true);
    setCurrentStep(4);
  };

  const handleDocumentUpload = (field: string, file: File) => {
    setUploadedDocs(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleContinueFromDocuments = () => {
    setDocumentsUploaded(true);
    setCurrentStep(5);
  };

  const handleFinalSubmit = () => {
    setApplicationSubmitted(true);
    setCurrentStep(6);
  };

  const selectedPackageData = packages.find(p => p.id === selectedPackage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            São Tomé and Príncipe
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Government Residency by Investment Program
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            {/* Step 1: Choose */}
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep > 1 ? 'bg-green-500 text-white' : currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 hidden sm:inline text-xs">Choose</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            
            {/* Step 2: Payment */}
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                paymentCompleted ? 'bg-green-500 text-white' : currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                {paymentCompleted ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="ml-2 hidden sm:inline text-xs">Payment</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            
            {/* Step 3: Info */}
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                infoCompleted ? 'bg-green-500 text-white' : currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                {infoCompleted ? <Check className="w-5 h-5" /> : '3'}
              </div>
              <span className="ml-2 hidden sm:inline text-xs">Info</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            
            {/* Step 4: Documents */}
            <div className={`flex items-center ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                documentsUploaded ? 'bg-green-500 text-white' : currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                {documentsUploaded ? <Check className="w-5 h-5" /> : '4'}
              </div>
              <span className="ml-2 hidden sm:inline text-xs">Docs</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 5 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            
            {/* Step 5: Overview */}
            <div className={`flex items-center ${currentStep >= 5 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                applicationSubmitted ? 'bg-green-500 text-white' : currentStep === 5 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                {applicationSubmitted ? <Check className="w-5 h-5" /> : '5'}
              </div>
              <span className="ml-2 hidden sm:inline text-xs">Overview</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 6 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            
            {/* Step 6: Complete */}
            <div className={`flex items-center ${currentStep >= 6 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep === 6 ? 'bg-green-500 text-white' : 'bg-gray-300'
              }`}>
                {currentStep === 6 ? <Check className="w-5 h-5" /> : '6'}
              </div>
              <span className="ml-2 hidden sm:inline text-xs">Complete</span>
            </div>
          </div>
        </div>

        {/* Step 1: Package Selection */}
        {currentStep === 1 && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {packages.map((pkg) => (
                <GlassPanel
                  key={pkg.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedPackage === pkg.id 
                      ? 'ring-2 ring-blue-600' 
                      : 'hover:shadow-lg'
                  } ${pkg.popular ? 'relative' : ''}`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {pkg.description}
                    </p>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {formatCurrency(pkg.price)}
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={selectedPackage === pkg.id ? 'primary' : 'secondary'}
                    fullWidth
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageSelect(pkg.id);
                    }}
                  >
                    {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                  </Button>
                </GlassPanel>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleContinueToPayment}
                disabled={!selectedPackage}
              >
                Continue to Payment
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <GlassPanel className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Information
            </h2>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Selected Package: <strong>{selectedPackageData?.name}</strong>
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {formatCurrency(selectedPackageData?.price || 0)}
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowPayment(true)}
              >
                Process Payment
              </Button>
            </div>
          </GlassPanel>
        )}

        {/* Step 3: Personal Information */}
        {currentStep === 3 && (
          <GlassPanel className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Application Information
            </h2>
            <form onSubmit={handleInfoSubmit}>
              {/* Personal Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Primary Applicant
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
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
                  <Input
                    label="Middle Name (Optional)"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
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
                  <Input
                    label="Passport Number"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
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

              {/* Contact Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Address Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Current Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Street Address"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    className="md:col-span-2"
                  />
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="State/Province (Optional)"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
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

               {/* Additional Required Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Place of Birth"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Employer/Business Name"
                    name="employer"
                    value={formData.employer}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Annual Income (USD)"
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Marital Status
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Have you ever been denied a visa to any country?
                    </label>
                    <select
                      name="visaDenial"
                      value={formData.visaDenial}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
                    >
                      <option value="">Select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  {formData.visaDenial === 'yes' && (
                    <Input
                      label="Please provide details"
                      name="visaDenialDetails"
                      value={formData.visaDenialDetails}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2"
                    />
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                      Have you ever been convicted of a crime?
                    </label>
                    <select
                      name="criminalRecord"
                      value={formData.criminalRecord}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
                    >
                      <option value="">Select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  {formData.criminalRecord === 'yes' && (
                    <Input
                      label="Please provide details"
                      name="criminalRecordDetails"
                      value={formData.criminalRecordDetails}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2"
                    />
                  )}
                </div>
              </div>

              {/* Spouse Information (for couple and family packages) */}
              {(selectedPackage === 'couple' || selectedPackage === 'family') && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Spouse Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Spouse First Name"
                      name="spouseFirstName"
                      value={formData.spouseFirstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Spouse Last Name"
                      name="spouseLastName"
                      value={formData.spouseLastName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Spouse Date of Birth"
                      type="date"
                      name="spouseDateOfBirth"
                      value={formData.spouseDateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Spouse Passport Number"
                      name="spousePassportNumber"
                      value={formData.spousePassportNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Children Information (for family package - REQUIRED) */}
              {selectedPackage === 'family' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Children Information
                  </h3>
                  
                  {/* Child 1 */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Child 1</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        label="First Name"
                        name="child1FirstName"
                        value={formData.child1FirstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Last Name"
                        name="child1LastName"
                        value={formData.child1LastName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Middle Name (Optional)"
                        name="child1MiddleName"
                        value={formData.child1MiddleName}
                        onChange={handleInputChange}
                      />
                      <Input
                        label="Date of Birth"
                        type="date"
                        name="child1DateOfBirth"
                        value={formData.child1DateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Nationality"
                        name="child1Nationality"
                        value={formData.child1Nationality}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Place of Birth"
                        name="child1PlaceOfBirth"
                        value={formData.child1PlaceOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Passport Number"
                        name="child1PassportNumber"
                        value={formData.child1PassportNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Passport Expiry"
                        type="date"
                        name="child1PassportExpiry"
                        value={formData.child1PassportExpiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Child 2 */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Child 2</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        label="First Name"
                        name="child2FirstName"
                        value={formData.child2FirstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Last Name"
                        name="child2LastName"
                        value={formData.child2LastName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Middle Name (Optional)"
                        name="child2MiddleName"
                        value={formData.child2MiddleName}
                        onChange={handleInputChange}
                      />
                      <Input
                        label="Date of Birth"
                        type="date"
                        name="child2DateOfBirth"
                        value={formData.child2DateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Nationality"
                        name="child2Nationality"
                        value={formData.child2Nationality}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Place of Birth"
                        name="child2PlaceOfBirth"
                        value={formData.child2PlaceOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Passport Number"
                        name="child2PassportNumber"
                        value={formData.child2PassportNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Passport Expiry"
                        type="date"
                        name="child2PassportExpiry"
                        value={formData.child2PassportExpiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                </div>
              )}

             
              {/* Emergency Contact */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Emergency Contact
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Relationship"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Contact Phone"
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Contact Email"
                    type="email"
                    name="emergencyContactEmail"
                    value={formData.emergencyContactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Submit button for the form */}
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="lg">
                  Continue to Documents
                </Button>
              </div>
            </form>
          </GlassPanel>
        )}
        {/* Step 4: Document Upload */}
        {currentStep === 4 && (
          <GlassPanel className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Upload Documents
            </h2>
            
            <div className="space-y-4 mb-6">
              <DocumentUploadField
                label="Passport Copy"
                required
                currentFile={uploadedDocs.passport}
                onUpload={(file) => handleDocumentUpload('passport', file)}
              />
              
              <DocumentUploadField
                label="Criminal Record Certificate"
                required
                currentFile={uploadedDocs.criminalRecord}
                onUpload={(file) => handleDocumentUpload('criminalRecord', file)}
              />
              
              <DocumentUploadField
                label="Proof of Funds"
                required
                currentFile={uploadedDocs.proofOfFunds}
                onUpload={(file) => handleDocumentUpload('proofOfFunds', file)}
              />
              
              <DocumentUploadField
                label="Medical Health Certificate"
                currentFile={uploadedDocs.medicalCertificate}
                onUpload={(file) => handleDocumentUpload('medicalCertificate', file)}
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleContinueFromDocuments}
                // Removed the disabled condition for testing
              >
                Continue
              </Button>
            </div>
          </GlassPanel>
        )}

        {/* Step 5: Overview */}
        {currentStep === 5 && (
          <GlassPanel className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Application Overview
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Package</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedPackageData?.name}</p>
                <p className="text-lg font-bold">{formatCurrency(selectedPackageData?.price || 0)}</p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">Name: {formData.firstName} {formData.lastName}</p>
                  <p className="text-gray-600 dark:text-gray-400">Email: {formData.email}</p>
                  <p className="text-gray-600 dark:text-gray-400">Nationality: {formData.nationality}</p>
                  <p className="text-gray-600 dark:text-gray-400">Passport: {formData.passportNumber}</p>
                </div>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documents</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>✓ Passport: {uploadedDocs.passport?.name || 'Not uploaded'}</p>
                  <p>✓ Criminal Record: {uploadedDocs.criminalRecord?.name || 'Not uploaded'}</p>
                  <p>✓ Proof of Funds: {uploadedDocs.proofOfFunds?.name || 'Not uploaded'}</p>
                  <p>✓ Medical Certificate: {uploadedDocs.medicalCertificate?.name || 'Not uploaded'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinalSubmit}
              >
                Submit Application
              </Button>
            </div>
          </GlassPanel>
        )}

        {/* Step 6: Complete */}
        {currentStep === 6 && (
          <GlassPanel className="p-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your residency application has been received. You will receive a confirmation 
              email with your application reference number and next steps.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Processing Time:</strong> 90 days from submission<br />
                <strong>Support:</strong> support@iopn.luxury
              </p>
            </div>
            <Button variant="primary" onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </GlassPanel>
        )}

        {/* Payment Modal */}
        {selectedPackageData && (
          <SimplePaymentModal
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            item={{
              id: selectedPackageData.id || '',
              name: selectedPackageData.name,
              price: selectedPackageData.price,
              description: selectedPackageData.description
            }}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
}

// Document Upload Component
interface DocumentUploadFieldProps {
  label: string;
  required?: boolean;
  currentFile: File | null;
  onUpload: (file: File) => void;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label,
  required = false,
  currentFile,
  onUpload,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        {currentFile ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">{currentFile.name}</p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click to upload {label.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );
};