'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';
import { SimplePaymentModal } from '@/components/payment/SimplePaymentModal';
import { Check, Upload, AlertCircle, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { ProcessSidebar } from '@/components/layout/ProcessSidebar';

type PackageType = 'single' | 'couple' | 'family' | null;

export default function SaotomeApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>(null);
  const [showPayment, setShowPayment] = useState(false);
  
  // Form data for personal information
  const [formData, setFormData] = useState({
    // Primary Applicant
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
    
    // Spouse (if applicable)
    spouseFirstName: '',
    spouseLastName: '',
    spouseDateOfBirth: '',
    spouseNationality: '',
    spousePassportNumber: '',
    
    // Child 1 (if applicable)
    child1FirstName: '',
    child1LastName: '',
    child1DateOfBirth: '',
    child1Nationality: '',
    child1PassportNumber: '',
    
    // Child 2 (if applicable)
    child2FirstName: '',
    child2LastName: '',
    child2DateOfBirth: '',
    child2Nationality: '',
    child2PassportNumber: '',
  });
  
  // Document uploads
  const [uploadedDocs, setUploadedDocs] = useState({
    // Primary Applicant
    passport: null as File | null,
    passportPhoto: null as File | null,
    birthCertificate: null as File | null,
    nationalId: null as File | null,
    policeCertificate: null as File | null,
    medicalCertificate: null as File | null,
    bankReference: null as File | null,
    evidenceOfWealth: null as File | null,
    proofOfAddress: null as File | null,
    marriageCertificate: null as File | null,
    
    // Spouse
    spousePassport: null as File | null,
    spousePassportPhoto: null as File | null,
    spouseBirthCertificate: null as File | null,
    spouseNationalId: null as File | null,
    spousePoliceCertificate: null as File | null,
    spouseMedicalCertificate: null as File | null,
    
    // Child 1
    child1Passport: null as File | null,
    child1PassportPhoto: null as File | null,
    child1BirthCertificate: null as File | null,
    child1NationalId: null as File | null,
    child1PoliceCertificate: null as File | null,
    child1MedicalCertificate: null as File | null,
    
    // Child 2
    child2Passport: null as File | null,
    child2PassportPhoto: null as File | null,
    child2BirthCertificate: null as File | null,
    child2NationalId: null as File | null,
    child2PoliceCertificate: null as File | null,
    child2MedicalCertificate: null as File | null,
  });

  const packages = [
    {
      id: 'single' as PackageType,
      name: 'Single Citizenship',
      price: 90000,
      description: 'Individual citizenship application',
      features: [
        'Full São Tomé citizenship',
        'STP passport issued',
        'Visa-free travel to 70+ countries',
        'No residency requirements',
        'Dual citizenship allowed',
      ]
    },
    {
      id: 'couple' as PackageType,
      name: 'Couple Citizenship',
      price: 90000,
      description: 'Main applicant + spouse',
      features: [
        'Citizenship for both spouses',
        'Two STP passports issued',
        'All individual benefits included',
        'Family reunification support',
      ],
      popular: true,
      note: 'Contact us for pricing'
    },
    {
      id: 'family' as PackageType,
      name: 'Family Citizenship',
      price: 90000,
      description: 'Parents + up to 2 children',
      features: [
        'Citizenship for entire family',
        'Passports for all members',
        'Children up to 30 years old',
        'Educational opportunities',
      ],
      note: 'Contact us for pricing'
    }
  ];

  const handlePackageSelect = (packageId: PackageType) => {
    setSelectedPackage(packageId);
  };

  const handleContinueToPayment = () => {
    if (selectedPackage) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setCurrentStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentUpload = (field: string, file: File) => {
    setUploadedDocs(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handlePersonalInfoSubmit = () => {
    setCurrentStep(3);
  };

  const handleDocumentsSubmit = () => {
    setCurrentStep(4);
  };

  const handleFinalSubmit = () => {
    // Save to localStorage (you'll replace with backend later)
    const applicationData = {
      package: selectedPackage,
      personalInfo: formData,
      documents: Object.keys(uploadedDocs).filter(key => uploadedDocs[key as keyof typeof uploadedDocs] !== null),
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };
    
    localStorage.setItem('stp_application', JSON.stringify(applicationData));
    setCurrentStep(6);
  };

  const selectedPackageData = packages.find(p => p.id === selectedPackage);
  const applicationRef = `STP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
  <>
    <ProcessSidebar currentStep={currentStep} />
    
    <div className="min-h-screen px-4 py-8 transition-all duration-300 ml-64">
      <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link href="/saotome" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Program Information
          </Link>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Citizenship Application
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              São Tomé and Príncipe Citizenship by Investment Program
            </p>
          </div>

          

          {/* STEP 1: Package Selection & Payment */}
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
                        {pkg.id === 'single' ? formatCurrency(pkg.price) : pkg.note}
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

          {/* STEP 2: Personal Information */}
          {currentStep === 2 && (
            <GlassPanel className="p-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h2>
              
              {/* Primary Applicant */}
              <div className="mb-8">
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
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
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

              {/* Spouse Information (if couple or family) */}
              {(selectedPackage === 'couple' || selectedPackage === 'family') && (
                <div className="mb-8">
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
                      label="Spouse Nationality"
                      name="spouseNationality"
                      value={formData.spouseNationality}
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

              {/* Children Information (if family) */}
              {selectedPackage === 'family' && (
                <>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Child 1 Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
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
                        label="Passport Number"
                        name="child1PassportNumber"
                        value={formData.child1PassportNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Child 2 Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
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
                        label="Passport Number"
                        name="child2PassportNumber"
                        value={formData.child2PassportNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={handlePersonalInfoSubmit}>
                  Continue to Documents
                </Button>
              </div>
            </GlassPanel>
          )}

          {/* STEP 3: Document Uploads */}
          {currentStep === 3 && (
            <GlassPanel className="p-6 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Upload Required Documents
              </h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-semibold mb-1">Document Requirements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>All documents must be in HD color</li>
                      <li>Photos must be 40mm x 50mm if printed</li>
                      <li>Maximum file size: 10MB per document</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Primary Applicant Documents */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Primary Applicant Documents
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <DocumentUploadField
                    label="Passport (All Pages)"
                    required
                    currentFile={uploadedDocs.passport}
                    onUpload={(file) => handleDocumentUpload('passport', file)}
                  />
                  <DocumentUploadField
                    label="Passport Photos (4 pcs)"
                    required
                    currentFile={uploadedDocs.passportPhoto}
                    onUpload={(file) => handleDocumentUpload('passportPhoto', file)}
                  />
                  <DocumentUploadField
                    label="Birth Certificate"
                    required
                    currentFile={uploadedDocs.birthCertificate}
                    onUpload={(file) => handleDocumentUpload('birthCertificate', file)}
                  />
                  <DocumentUploadField
                    label="National ID"
                    required
                    currentFile={uploadedDocs.nationalId}
                    onUpload={(file) => handleDocumentUpload('nationalId', file)}
                  />
                  <DocumentUploadField
                    label="Police Certificate"
                    required
                    currentFile={uploadedDocs.policeCertificate}
                    onUpload={(file) => handleDocumentUpload('policeCertificate', file)}
                  />
                  <DocumentUploadField
                    label="Medical Certificate"
                    required
                    currentFile={uploadedDocs.medicalCertificate}
                    onUpload={(file) => handleDocumentUpload('medicalCertificate', file)}
                  />
                  <DocumentUploadField
                    label="Bank Reference Letter"
                    required
                    currentFile={uploadedDocs.bankReference}
                    onUpload={(file) => handleDocumentUpload('bankReference', file)}
                  />
                  <DocumentUploadField
                    label="Evidence of Wealth"
                    required
                    currentFile={uploadedDocs.evidenceOfWealth}
                    onUpload={(file) => handleDocumentUpload('evidenceOfWealth', file)}
                  />
                  <DocumentUploadField
                    label="Proof of Address"
                    required
                    currentFile={uploadedDocs.proofOfAddress}
                    onUpload={(file) => handleDocumentUpload('proofOfAddress', file)}
                  />
                  <DocumentUploadField
                    label="Marriage Certificate"
                    currentFile={uploadedDocs.marriageCertificate}
                    onUpload={(file) => handleDocumentUpload('marriageCertificate', file)}
                  />
                </div>
              </div>

              {/* Spouse Documents */}
              {(selectedPackage === 'couple' || selectedPackage === 'family') && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Spouse Documents
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <DocumentUploadField
                      label="Spouse Passport"
                      required
                      currentFile={uploadedDocs.spousePassport}
                      onUpload={(file) => handleDocumentUpload('spousePassport', file)}
                    />
                    <DocumentUploadField
                      label="Spouse Passport Photo"
                      required
                      currentFile={uploadedDocs.spousePassportPhoto}
                      onUpload={(file) => handleDocumentUpload('spousePassportPhoto', file)}
                    />
                    <DocumentUploadField
                      label="Spouse Birth Certificate"
                      required
                      currentFile={uploadedDocs.spouseBirthCertificate}
                      onUpload={(file) => handleDocumentUpload('spouseBirthCertificate', file)}
                    />
                    <DocumentUploadField
                      label="Spouse National ID"
                      required
                      currentFile={uploadedDocs.spouseNationalId}
                      onUpload={(file) => handleDocumentUpload('spouseNationalId', file)}
                    />
                    <DocumentUploadField
                      label="Spouse Police Certificate"
                      required
                      currentFile={uploadedDocs.spousePoliceCertificate}
                      onUpload={(file) => handleDocumentUpload('spousePoliceCertificate', file)}
                    />
                    <DocumentUploadField
                      label="Spouse Medical Certificate"
                      required
                      currentFile={uploadedDocs.spouseMedicalCertificate}
                      onUpload={(file) => handleDocumentUpload('spouseMedicalCertificate', file)}
                    />
                  </div>
                </div>
              )}

              {/* Children Documents */}
              {selectedPackage === 'family' && (
                <>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Child 1 Documents
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <DocumentUploadField
                        label="Child 1 Passport"
                        required
                        currentFile={uploadedDocs.child1Passport}
                        onUpload={(file) => handleDocumentUpload('child1Passport', file)}
                      />
                      <DocumentUploadField
                        label="Child 1 Passport Photo"
                        required
                        currentFile={uploadedDocs.child1PassportPhoto}
                        onUpload={(file) => handleDocumentUpload('child1PassportPhoto', file)}
                      />
                      <DocumentUploadField
                        label="Child 1 Birth Certificate"
                        required
                        currentFile={uploadedDocs.child1BirthCertificate}
                        onUpload={(file) => handleDocumentUpload('child1BirthCertificate', file)}
                      />
                      <DocumentUploadField
                        label="Child 1 National ID"
                        currentFile={uploadedDocs.child1NationalId}
                        onUpload={(file) => handleDocumentUpload('child1NationalId', file)}
                      />
                      <DocumentUploadField
                        label="Child 1 Police Certificate"
                        currentFile={uploadedDocs.child1PoliceCertificate}
                        onUpload={(file) => handleDocumentUpload('child1PoliceCertificate', file)}
                      />
                      <DocumentUploadField
                        label="Child 1 Medical Certificate"
                        required
                        currentFile={uploadedDocs.child1MedicalCertificate}
                        onUpload={(file) => handleDocumentUpload('child1MedicalCertificate', file)}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Child 2 Documents
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <DocumentUploadField
                        label="Child 2 Passport"
                        required
                        currentFile={uploadedDocs.child2Passport}
                        onUpload={(file) => handleDocumentUpload('child2Passport', file)}
                      />
                      <DocumentUploadField
                        label="Child 2 Passport Photo"
                        required
                        currentFile={uploadedDocs.child2PassportPhoto}
                        onUpload={(file) => handleDocumentUpload('child2PassportPhoto', file)}
                      />
                      <DocumentUploadField
                        label="Child 2 Birth Certificate"
                        required
                        currentFile={uploadedDocs.child2BirthCertificate}
                        onUpload={(file) => handleDocumentUpload('child2BirthCertificate', file)}
                      />
                      <DocumentUploadField
                        label="Child 2 National ID"
                        currentFile={uploadedDocs.child2NationalId}
                        onUpload={(file) => handleDocumentUpload('child2NationalId', file)}
                      />
                      <DocumentUploadField
                        label="Child 2 Police Certificate"
                        currentFile={uploadedDocs.child2PoliceCertificate}
                        onUpload={(file) => handleDocumentUpload('child2PoliceCertificate', file)}
                      />
                      <DocumentUploadField
                        label="Child 2 Medical Certificate"
                        required
                        currentFile={uploadedDocs.child2MedicalCertificate}
                        onUpload={(file) => handleDocumentUpload('child2MedicalCertificate', file)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button variant="primary" onClick={handleDocumentsSubmit}>
                  Continue to Review
                </Button>
              </div>
            </GlassPanel>
          )}

          {/* STEP 4: Review */}
          {currentStep === 4 && (
            <GlassPanel className="p-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Review Your Application
              </h2>
              
              {/* Package Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Selected Package</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedPackageData?.name}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {selectedPackageData?.id === 'single' ? formatCurrency(selectedPackageData.price) : 'Pricing upon consultation'}
                </p>
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Primary Applicant</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-500">Name</p>
                    <p className="text-gray-900 dark:text-white">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-500">Date of Birth</p>
                    <p className="text-gray-900 dark:text-white">{formData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-500">Nationality</p>
                    <p className="text-gray-900 dark:text-white">{formData.nationality}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-500">Passport Number</p>
                    <p className="text-gray-900 dark:text-white">{formData.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-500">Email</p>
                    <p className="text-gray-900 dark:text-white">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-500">Phone</p>
                    <p className="text-gray-900 dark:text-white">{formData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Spouse Info (if applicable) */}
              {(selectedPackage === 'couple' || selectedPackage === 'family') && formData.spouseFirstName && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Spouse</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Name</p>
                      <p className="text-gray-900 dark:text-white">{formData.spouseFirstName} {formData.spouseLastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Date of Birth</p>
                      <p className="text-gray-900 dark:text-white">{formData.spouseDateOfBirth}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Children Info (if applicable) */}
              {selectedPackage === 'family' && formData.child1FirstName && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Children</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900 dark:text-white">Child 1: {formData.child1FirstName} {formData.child1LastName}</p>
                    <p className="text-gray-900 dark:text-white">Child 2: {formData.child2FirstName} {formData.child2LastName}</p>
                  </div>
                </div>
              )}

              {/* Documents Summary */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Documents</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✓ {Object.values(uploadedDocs).filter(doc => doc !== null).length} documents uploaded
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(3)}>
                  Back to Documents
                </Button>
                <Button variant="primary" onClick={() => setCurrentStep(5)}>
                  Proceed to Submit
                </Button>
              </div>
            </GlassPanel>
          )}

          {/* STEP 5: Submit Confirmation */}
          {currentStep === 5 && (
            <GlassPanel className="p-8 text-center max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Submit?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Once submitted, your application will be sent to São Tomé and Príncipe for processing. 
                Please ensure all information is correct before proceeding.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary" onClick={() => setCurrentStep(4)}>
                  Review Again
                </Button>
                <Button variant="primary" size="lg" onClick={handleFinalSubmit}>
                  Submit Application
                </Button>
              </div>
            </GlassPanel>
          )}

          {/* STEP 6: Confirmation */}
          {currentStep === 6 && (
            <GlassPanel className="p-8 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your citizenship application has been submitted to São Tomé and Príncipe for processing.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <p><strong>Application Reference:</strong> {applicationRef}</p>
                  <p><strong>Package:</strong> {selectedPackageData?.name}</p>
                  <p><strong>Submitted:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Processing Time:</strong> 4-6 months</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                You will receive a confirmation email shortly with your application details and next steps.
              </p>
              <Button variant="primary" onClick={() => window.location.href = '/saotome'}>
                Return to Program Page
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
    </>
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
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition-colors ${
          currentFile 
            ? 'border-green-400 bg-green-50 dark:bg-green-900/10' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {currentFile ? (
          <>
            <Check className="w-6 h-6 mx-auto text-green-500 mb-1" />
            <p className="text-xs font-medium text-green-700 dark:text-green-400 truncate">{currentFile.name}</p>
            <p className="text-xs text-gray-500 mt-1">Click to replace</p>
          </>
        ) : (
          <>
            <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Upload</p>
          </>
        )}
      </div>
    </div>
  );
};