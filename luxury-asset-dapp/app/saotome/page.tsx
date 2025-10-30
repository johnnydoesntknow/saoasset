'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/format';
import { SimplePaymentModal } from '@/components/payment/SimplePaymentModal';
import { Check, Upload, AlertCircle } from 'lucide-react';
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
  
  // COMPREHENSIVE form data state with ALL fields
  const [formData, setFormData] = useState({
    // Primary Applicant Basic Info
    firstName: '',
    lastName: '',
    middleName: '',
    previousNames: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    nationality: '',
    previousNationalities: '',
    passportNumber: '',
    passportExpiry: '',
    passportIssueDate: '',
    passportIssuePlace: '',
    
    // Contact Info
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Current Address
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    residenceSince: '',
    
    // Previous Addresses
    prevAddress1: '',
    prevAddress1Dates: '',
    prevAddress2: '',
    prevAddress2Dates: '',
    
    // Employment
    occupation: '',
    employer: '',
    employerAddress: '',
    employmentSince: '',
    annualIncome: '',
    
    // Languages
    nativeLanguage: '',
    otherLanguages: '',
    englishProficiency: '',
    
    // Marital Status
    maritalStatus: '',
    marriageDate: '',
    marriagePlace: '',
    previousMarriages: '',
    divorceDetails: '',
    
    // Legal History
    visaDenial: '',
    visaDenialDetails: '',
    criminalRecord: '',
    criminalRecordDetails: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    emergencyContactAddress: '',
    
    // Spouse Information (if applicable)
    spouseFirstName: '',
    spouseLastName: '',
    spouseMaidenName: '',
    spouseDateOfBirth: '',
    spousePlaceOfBirth: '',
    spouseNationality: '',
    spousePassportNumber: '',
    spousePassportExpiry: '',
    
    // Child 1 Information
    child1FirstName: '',
    child1LastName: '',
    child1MiddleName: '',
    child1DateOfBirth: '',
    child1PlaceOfBirth: '',
    child1Gender: '',
    child1Nationality: '',
    child1PassportNumber: '',
    child1PassportExpiry: '',
    
    // Child 2 Information
    child2FirstName: '',
    child2LastName: '',
    child2MiddleName: '',
    child2DateOfBirth: '',
    child2PlaceOfBirth: '',
    child2Gender: '',
    child2Nationality: '',
    child2PassportNumber: '',
    child2PassportExpiry: '',
  });
  
  // ENHANCED document tracking for comprehensive requirements
  const [uploadedDocs, setUploadedDocs] = useState({
    // Primary Applicant Core Documents
    passport: null as File | null,
    passportPhoto: null as File | null,
    birthCertificate: null as File | null,
    
    // Criminal & Legal Documents
    criminalRecordHome: null as File | null,
    criminalRecordCurrent: null as File | null,
    criminalRecordOther1: null as File | null,
    criminalRecordOther2: null as File | null,
    
    // Medical Documents
    medicalCertificate: null as File | null,
    hivTest: null as File | null,
    chestXray: null as File | null,
    vaccinationRecords: null as File | null,
    
    // Financial Documents
    proofOfFunds: null as File | null,
    bankStatements6Months: null as File | null,
    bankReference: null as File | null,
    taxReturns3Years: null as File | null,
    incomeProof: null as File | null,
    investmentPortfolio: null as File | null,
    propertyDeeds: null as File | null,
    businessRegistration: null as File | null,
    sourceOfFundsDeclaration: null as File | null,
    
    // Employment & Education
    employmentLetter: null as File | null,
    employmentContract: null as File | null,
    educationCertificates: null as File | null,
    professionalLicenses: null as File | null,
    
    // Personal Documents
    proofOfAddress: null as File | null,
    marriageCertificate: null as File | null,
    divorceDecree: null as File | null,
    deathCertificateSpouse: null as File | null,
    militaryRecords: null as File | null,
    nameChangeDocuments: null as File | null,
    
    // References
    professionalReferences: null as File | null,
    characterReferences: null as File | null,
    
    // Spouse Documents (if applicable)
    spousePassport: null as File | null,
    spousePassportPhoto: null as File | null,
    spouseBirthCertificate: null as File | null,
    spouseCriminalRecord: null as File | null,
    spouseMedicalCertificate: null as File | null,
    spouseHivTest: null as File | null,
    spouseEducationCertificates: null as File | null,
    spouseEmploymentLetter: null as File | null,
    spouseMilitaryRecords: null as File | null,
    
    // Child 1 Documents
    child1Passport: null as File | null,
    child1PassportPhoto: null as File | null,
    child1BirthCertificate: null as File | null,
    child1MedicalCertificate: null as File | null,
    child1VaccinationRecords: null as File | null,
    child1SchoolRecords: null as File | null,
    child1GuardianshipDocs: null as File | null,
    child1AdoptionPapers: null as File | null,
    
    // Child 2 Documents
    child2Passport: null as File | null,
    child2PassportPhoto: null as File | null,
    child2BirthCertificate: null as File | null,
    child2MedicalCertificate: null as File | null,
    child2VaccinationRecords: null as File | null,
    child2SchoolRecords: null as File | null,
    child2GuardianshipDocs: null as File | null,
    child2AdoptionPapers: null as File | null,
    
    // Additional Supporting Documents
    powerOfAttorney: null as File | null,
    affidavitOfSupport: null as File | null,
    travelItinerary: null as File | null,
    insuranceDocuments: null as File | null,
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

  const handleInfoSubmit = () => {
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

  // Updated to handle textarea as well
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to check if all required documents are uploaded
  const areRequiredDocsUploaded = () => {
    // Base requirements for primary applicant
    const primaryRequired = [
      'passport', 'passportPhoto', 'birthCertificate', 
      'criminalRecordHome', 'criminalRecordCurrent', 'medicalCertificate',
      'hivTest', 'chestXray', 'vaccinationRecords', 'proofOfFunds',
      'bankStatements6Months', 'taxReturns3Years', 'employmentLetter',
      'educationCertificates', 'proofOfAddress'
    ];
    
    // Check primary applicant docs
    for (const doc of primaryRequired) {
      if (!uploadedDocs[doc as keyof typeof uploadedDocs]) {
        return false;
      }
    }
    
    // Add marriage certificate if married
    if ((formData.maritalStatus === 'married' || formData.maritalStatus === 'separated') && !uploadedDocs.marriageCertificate) {
      return false;
    }
    
    // Check spouse docs if applicable
    if (selectedPackage === 'couple' || selectedPackage === 'family') {
      const spouseRequired = [
        'spousePassport', 'spousePassportPhoto', 'spouseBirthCertificate',
        'spouseCriminalRecord', 'spouseMedicalCertificate', 'spouseHivTest'
      ];
      for (const doc of spouseRequired) {
        if (!uploadedDocs[doc as keyof typeof uploadedDocs]) {
          return false;
        }
      }
    }
    
    // Check children docs if family package
    if (selectedPackage === 'family') {
      const child1Required = [
        'child1Passport', 'child1PassportPhoto', 'child1BirthCertificate',
        'child1MedicalCertificate', 'child1VaccinationRecords'
      ];
      const child2Required = [
        'child2Passport', 'child2PassportPhoto', 'child2BirthCertificate',
        'child2MedicalCertificate', 'child2VaccinationRecords'
      ];
      
      for (const doc of [...child1Required, ...child2Required]) {
        if (!uploadedDocs[doc as keyof typeof uploadedDocs]) {
          return false;
        }
      }
    }
    
    return true;
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

       {/* Step 3: Basic Information */}
{currentStep === 3 && (
  <GlassPanel className="p-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      Basic Information & Contact Details
    </h2>
    
    {/* Personal Information */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Personal Information
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
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleInputChange}
        />
        <Input
          label="Previous/Maiden Names"
          name="previousNames"
          value={formData.previousNames}
          onChange={handleInputChange}
          placeholder="List all previous names used"
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
          label="Place of Birth (City, Country)"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleInputChange}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
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
            <option value="separated">Separated</option>
          </select>
        </div>
        {(formData.maritalStatus === 'married' || formData.maritalStatus === 'separated') && (
          <>
            <Input
              label="Marriage Date"
              type="date"
              name="marriageDate"
              value={formData.marriageDate}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Marriage Place"
              name="marriagePlace"
              value={formData.marriagePlace}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        {formData.maritalStatus === 'divorced' && (
          <Input
            label="Divorce Details (Date, Country)"
            name="divorceDetails"
            value={formData.divorceDetails}
            onChange={handleInputChange}
            className="md:col-span-2"
          />
        )}
        <Input
          label="Number of Previous Marriages"
          type="number"
          name="previousMarriages"
          value={formData.previousMarriages}
          onChange={handleInputChange}
          min="0"
        />
      </div>
    </div>

    {/* Nationality & Passport */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Nationality & Passport Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Current Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Previous/Other Nationalities"
          name="previousNationalities"
          value={formData.previousNationalities}
          onChange={handleInputChange}
          placeholder="List all if any"
        />
        <Input
          label="Passport Number"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Passport Issue Date"
          type="date"
          name="passportIssueDate"
          value={formData.passportIssueDate}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Passport Expiry Date"
          type="date"
          name="passportExpiry"
          value={formData.passportExpiry}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Passport Issue Place"
          name="passportIssuePlace"
          value={formData.passportIssuePlace}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    {/* Contact Information */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Contact Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Primary Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Alternate Phone"
          type="tel"
          name="alternatePhone"
          value={formData.alternatePhone}
          onChange={handleInputChange}
        />
      </div>
    </div>

    {/* Current Address */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Current Residential Address
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
          label="State/Province"
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
        <Input
          label="Living at this address since"
          type="date"
          name="residenceSince"
          value={formData.residenceSince}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    {/* Previous Addresses */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Previous Addresses (Past 5 Years)
      </h3>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Previous Address 1 (Full Address)"
            name="prevAddress1"
            value={formData.prevAddress1}
            onChange={handleInputChange}
            placeholder="Street, City, Country"
          />
          <Input
            label="Dates (From - To)"
            name="prevAddress1Dates"
            value={formData.prevAddress1Dates}
            onChange={handleInputChange}
            placeholder="MM/YYYY - MM/YYYY"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Previous Address 2 (Full Address)"
            name="prevAddress2"
            value={formData.prevAddress2}
            onChange={handleInputChange}
            placeholder="Street, City, Country"
          />
          <Input
            label="Dates (From - To)"
            name="prevAddress2Dates"
            value={formData.prevAddress2Dates}
            onChange={handleInputChange}
            placeholder="MM/YYYY - MM/YYYY"
          />
        </div>
      </div>
    </div>

    {/* Employment Information */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Employment Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Current Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Current Employer"
          name="employer"
          value={formData.employer}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Employer Address"
          name="employerAddress"
          value={formData.employerAddress}
          onChange={handleInputChange}
          className="md:col-span-2"
        />
        <Input
          label="Employment Since"
          type="date"
          name="employmentSince"
          value={formData.employmentSince}
          onChange={handleInputChange}
        />
        <Input
          label="Annual Income (USD)"
          type="number"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    {/* Languages */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Language Proficiency
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Native Language"
          name="nativeLanguage"
          value={formData.nativeLanguage}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Other Languages (List all)"
          name="otherLanguages"
          value={formData.otherLanguages}
          onChange={handleInputChange}
          placeholder="Language - Proficiency level"
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
            English Proficiency
          </label>
          <select
            name="englishProficiency"
            value={formData.englishProficiency}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
          >
            <option value="">Select Level</option>
            <option value="native">Native</option>
            <option value="fluent">Fluent</option>
            <option value="advanced">Advanced</option>
            <option value="intermediate">Intermediate</option>
            <option value="basic">Basic</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    </div>

    {/* Emergency Contact */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Emergency Contact
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
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
          label="Phone Number"
          type="tel"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="emergencyContactEmail"
          value={formData.emergencyContactEmail}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Full Address"
          name="emergencyContactAddress"
          value={formData.emergencyContactAddress}
          onChange={handleInputChange}
          className="md:col-span-2"
          required
        />
      </div>
    </div>

    {/* Spouse Information (ONLY for couple and family packages) */}
    {(selectedPackage === 'couple' || selectedPackage === 'family') && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Spouse Basic Information
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
            label="Spouse Maiden Name"
            name="spouseMaidenName"
            value={formData.spouseMaidenName}
            onChange={handleInputChange}
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
            label="Spouse Place of Birth"
            name="spousePlaceOfBirth"
            value={formData.spousePlaceOfBirth}
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
          <Input
            label="Spouse Passport Expiry"
            type="date"
            name="spousePassportExpiry"
            value={formData.spousePassportExpiry}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    )}

    {/* Children Information (ONLY for family package) */}
    {selectedPackage === 'family' && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Children Basic Information
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
              label="Middle Name"
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
              label="Place of Birth"
              name="child1PlaceOfBirth"
              value={formData.child1PlaceOfBirth}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                Gender
              </label>
              <select
                name="child1Gender"
                value={formData.child1Gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
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
              label="Middle Name"
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
              label="Place of Birth"
              name="child2PlaceOfBirth"
              value={formData.child2PlaceOfBirth}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                Gender
              </label>
              <select
                name="child2Gender"
                value={formData.child2Gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
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

    <div className="flex justify-end">
      <Button 
        variant="primary" 
        size="lg"
        onClick={handleInfoSubmit}
      >
        Continue to Background
      </Button>
    </div>
  </GlassPanel>
)}

       {/* Step 4: Enhanced Document Upload */}
{currentStep === 4 && (
  <GlassPanel className="p-6 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      Upload Required Documents
    </h2>
    
    {/* Document Requirements Notice */}
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-semibold mb-1">Important Document Requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>All documents must be in English or officially translated</li>
            <li>Passports must be valid for at least 2 years</li>
            <li>Criminal records must be issued within the last 6 months</li>
            <li>Medical certificates must be from certified physicians</li>
            <li>Police clearances required from ALL countries lived in for 6+ months</li>
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
      
      {/* Identity Documents */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Identity & Personal Documents</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <DocumentUploadField
            label="Passport (All Pages)"
            required
            currentFile={uploadedDocs.passport}
            onUpload={(file) => handleDocumentUpload('passport', file)}
          />
          <DocumentUploadField
            label="Passport Photo (2x2)"
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
          {formData.previousNames && (
            <DocumentUploadField
              label="Name Change Documents"
              currentFile={uploadedDocs.nameChangeDocuments}
              onUpload={(file) => handleDocumentUpload('nameChangeDocuments', file)}
            />
          )}
          {(formData.maritalStatus === 'married' || formData.maritalStatus === 'separated') && (
            <DocumentUploadField
              label="Marriage Certificate"
              required
              currentFile={uploadedDocs.marriageCertificate}
              onUpload={(file) => handleDocumentUpload('marriageCertificate', file)}
            />
          )}
          {formData.maritalStatus === 'divorced' && (
            <DocumentUploadField
              label="Divorce Decree"
              required
              currentFile={uploadedDocs.divorceDecree}
              onUpload={(file) => handleDocumentUpload('divorceDecree', file)}
            />
          )}
        </div>
      </div>

      {/* Criminal Records */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Criminal Records & Legal Documents</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <DocumentUploadField
            label="Criminal Record - Home Country"
            required
            currentFile={uploadedDocs.criminalRecordHome}
            onUpload={(file) => handleDocumentUpload('criminalRecordHome', file)}
          />
          <DocumentUploadField
            label="Criminal Record - Current Residence"
            required
            currentFile={uploadedDocs.criminalRecordCurrent}
            onUpload={(file) => handleDocumentUpload('criminalRecordCurrent', file)}
          />
          <DocumentUploadField
            label="Criminal Record - Other Country 1"
            currentFile={uploadedDocs.criminalRecordOther1}
            onUpload={(file) => handleDocumentUpload('criminalRecordOther1', file)}
          />
          <DocumentUploadField
            label="Criminal Record - Other Country 2"
            currentFile={uploadedDocs.criminalRecordOther2}
            onUpload={(file) => handleDocumentUpload('criminalRecordOther2', file)}
          />
        </div>
      </div>

      {/* Medical Documents */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Medical Documents</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DocumentUploadField
            label="Medical Certificate"
            required
            currentFile={uploadedDocs.medicalCertificate}
            onUpload={(file) => handleDocumentUpload('medicalCertificate', file)}
          />
          <DocumentUploadField
            label="HIV/AIDS Test Result"
            required
            currentFile={uploadedDocs.hivTest}
            onUpload={(file) => handleDocumentUpload('hivTest', file)}
          />
          <DocumentUploadField
            label="Chest X-Ray (TB Test)"
            required
            currentFile={uploadedDocs.chestXray}
            onUpload={(file) => handleDocumentUpload('chestXray', file)}
          />
          <DocumentUploadField
            label="Vaccination Records"
            required
            currentFile={uploadedDocs.vaccinationRecords}
            onUpload={(file) => handleDocumentUpload('vaccinationRecords', file)}
          />
        </div>
      </div>

      {/* Financial Documents */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Financial Documents</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <DocumentUploadField
            label="Proof of Funds"
            required
            currentFile={uploadedDocs.proofOfFunds}
            onUpload={(file) => handleDocumentUpload('proofOfFunds', file)}
          />
          <DocumentUploadField
            label="Bank Statements (6 months)"
            required
            currentFile={uploadedDocs.bankStatements6Months}
            onUpload={(file) => handleDocumentUpload('bankStatements6Months', file)}
          />
          <DocumentUploadField
            label="Bank Reference Letter"
            required
            currentFile={uploadedDocs.bankReference}
            onUpload={(file) => handleDocumentUpload('bankReference', file)}
          />
          <DocumentUploadField
            label="Tax Returns (3 years)"
            required
            currentFile={uploadedDocs.taxReturns3Years}
            onUpload={(file) => handleDocumentUpload('taxReturns3Years', file)}
          />
          <DocumentUploadField
            label="Income Proof"
            required
            currentFile={uploadedDocs.incomeProof}
            onUpload={(file) => handleDocumentUpload('incomeProof', file)}
          />
          <DocumentUploadField
            label="Source of Funds Declaration"
            required
            currentFile={uploadedDocs.sourceOfFundsDeclaration}
            onUpload={(file) => handleDocumentUpload('sourceOfFundsDeclaration', file)}
          />
        </div>
      </div>

      {/* Employment & Education */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Employment & Education</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DocumentUploadField
            label="Employment Letter"
            required
            currentFile={uploadedDocs.employmentLetter}
            onUpload={(file) => handleDocumentUpload('employmentLetter', file)}
          />
          <DocumentUploadField
            label="Employment Contract"
            currentFile={uploadedDocs.employmentContract}
            onUpload={(file) => handleDocumentUpload('employmentContract', file)}
          />
          <DocumentUploadField
            label="Education Certificates"
            required
            currentFile={uploadedDocs.educationCertificates}
            onUpload={(file) => handleDocumentUpload('educationCertificates', file)}
          />
          <DocumentUploadField
            label="Professional Licenses"
            currentFile={uploadedDocs.professionalLicenses}
            onUpload={(file) => handleDocumentUpload('professionalLicenses', file)}
          />
        </div>
      </div>

      {/* Other Documents */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Other Documents</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <DocumentUploadField
            label="Proof of Address"
            required
            currentFile={uploadedDocs.proofOfAddress}
            onUpload={(file) => handleDocumentUpload('proofOfAddress', file)}
          />
          <DocumentUploadField
            label="Reference Letters"
            currentFile={uploadedDocs.professionalReferences}
            onUpload={(file) => handleDocumentUpload('professionalReferences', file)}
          />
          <DocumentUploadField
            label="Character References"
            currentFile={uploadedDocs.characterReferences}
            onUpload={(file) => handleDocumentUpload('characterReferences', file)}
          />
        </div>
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
            label="Spouse Criminal Record"
            required
            currentFile={uploadedDocs.spouseCriminalRecord}
            onUpload={(file) => handleDocumentUpload('spouseCriminalRecord', file)}
          />
          <DocumentUploadField
            label="Spouse Medical Certificate"
            required
            currentFile={uploadedDocs.spouseMedicalCertificate}
            onUpload={(file) => handleDocumentUpload('spouseMedicalCertificate', file)}
          />
          <DocumentUploadField
            label="Spouse HIV Test"
            required
            currentFile={uploadedDocs.spouseHivTest}
            onUpload={(file) => handleDocumentUpload('spouseHivTest', file)}
          />
          <DocumentUploadField
            label="Spouse Education"
            currentFile={uploadedDocs.spouseEducationCertificates}
            onUpload={(file) => handleDocumentUpload('spouseEducationCertificates', file)}
          />
          <DocumentUploadField
            label="Spouse Employment"
            currentFile={uploadedDocs.spouseEmploymentLetter}
            onUpload={(file) => handleDocumentUpload('spouseEmploymentLetter', file)}
          />
        </div>
      </div>
    )}

    {/* Children Documents */}
    {selectedPackage === 'family' && (
      <>
        {/* Child 1 Documents */}
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
              label="Child 1 Medical Certificate"
              required
              currentFile={uploadedDocs.child1MedicalCertificate}
              onUpload={(file) => handleDocumentUpload('child1MedicalCertificate', file)}
            />
            <DocumentUploadField
              label="Child 1 Vaccination Records"
              required
              currentFile={uploadedDocs.child1VaccinationRecords}
              onUpload={(file) => handleDocumentUpload('child1VaccinationRecords', file)}
            />
            <DocumentUploadField
              label="Child 1 School Records"
              currentFile={uploadedDocs.child1SchoolRecords}
              onUpload={(file) => handleDocumentUpload('child1SchoolRecords', file)}
            />
          </div>
        </div>

        {/* Child 2 Documents */}
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
              label="Child 2 Medical Certificate"
              required
              currentFile={uploadedDocs.child2MedicalCertificate}
              onUpload={(file) => handleDocumentUpload('child2MedicalCertificate', file)}
            />
            <DocumentUploadField
              label="Child 2 Vaccination Records"
              required
              currentFile={uploadedDocs.child2VaccinationRecords}
              onUpload={(file) => handleDocumentUpload('child2VaccinationRecords', file)}
            />
            <DocumentUploadField
              label="Child 2 School Records"
              currentFile={uploadedDocs.child2SchoolRecords}
              onUpload={(file) => handleDocumentUpload('child2SchoolRecords', file)}
            />
          </div>
        </div>
      </>
    )}

    {/* Upload Progress Summary */}
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Upload Progress
      </h4>
      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <p>Documents uploaded: {Object.values(uploadedDocs).filter(doc => doc !== null).length} / {Object.keys(uploadedDocs).length}</p>
        {selectedPackage === 'family' && (
          <>
            <p>Primary Applicant: {Object.keys(uploadedDocs).filter(key => !key.includes('spouse') && !key.includes('child')).filter(key => uploadedDocs[key as keyof typeof uploadedDocs]).length} documents</p>
            <p>Spouse: {Object.keys(uploadedDocs).filter(key => key.includes('spouse')).filter(key => uploadedDocs[key as keyof typeof uploadedDocs]).length} documents</p>
            <p>Children: {Object.keys(uploadedDocs).filter(key => key.includes('child')).filter(key => uploadedDocs[key as keyof typeof uploadedDocs]).length} documents</p>
          </>
        )}
      </div>
    </div>
    
    <div className="flex justify-between">
      <Button 
        variant="secondary"
        onClick={() => setCurrentStep(3)}
      >
        Back
      </Button>
      <Button
        variant="primary"
        size="lg"
        onClick={handleContinueFromDocuments}
      >
        Continue to Review {!areRequiredDocsUploaded() && '(Missing Required Docs)'}
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
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Applicants</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">Primary: {formData.firstName} {formData.lastName}</p>
                  {(selectedPackage === 'couple' || selectedPackage === 'family') && (
                    <p className="text-gray-600 dark:text-gray-400">Spouse: {formData.spouseFirstName} {formData.spouseLastName}</p>
                  )}
                  {selectedPackage === 'family' && (
                    <>
                      <p className="text-gray-600 dark:text-gray-400">Child 1: {formData.child1FirstName} {formData.child1LastName}</p>
                      <p className="text-gray-600 dark:text-gray-400">Child 2: {formData.child2FirstName} {formData.child2LastName}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documents Summary</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="text-green-600 dark:text-green-400">✓ All required documents uploaded</p>
                  <p className="mt-1">Total documents: {Object.values(uploadedDocs).filter(doc => doc !== null).length}</p>
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
                <strong>Application Type:</strong> {selectedPackageData?.name}<br />
                <strong>Total Applicants:</strong> {selectedPackage === 'family' ? '4' : selectedPackage === 'couple' ? '2' : '1'}<br />
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

// Enhanced Document Upload Component with better UX
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
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
          currentFile 
            ? 'border-green-400 bg-green-50 dark:bg-green-900/10' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {currentFile ? (
          <>
            <Check className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <p className="text-sm font-medium text-green-700 dark:text-green-400">{currentFile.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click to replace</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to upload {label.toLowerCase()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PDF, JPG, PNG up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
};