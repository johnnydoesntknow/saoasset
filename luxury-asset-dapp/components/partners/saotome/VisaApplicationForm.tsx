'use client';

import React, { useState } from 'react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

interface VisaApplicationFormProps {
  packageType: string | null;
  packagePrice: number;
}

export const VisaApplicationForm: React.FC<VisaApplicationFormProps> = ({ 
  packageType, 
  packagePrice 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Primary Applicant
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    
    // Address
    street: '',
    city: '',
    country: '',
    postalCode: '',
    
    // Additional Members (for couple/family)
    spouse: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      passportNumber: '',
    },
    children: [
      { firstName: '', lastName: '', dateOfBirth: '', passportNumber: '' },
      { firstName: '', lastName: '', dateOfBirth: '', passportNumber: '' },
    ]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process application
    console.log('Submitting application:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <GlassPanel className="p-8 text-center max-w-2xl mx-auto">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
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
            <strong>OPN Tokens:</strong> Will be allocated to your wallet upon approval<br />
            <strong>Support:</strong> support@iopn.luxury
          </p>
        </div>
        <Button variant="primary" onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </GlassPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <GlassPanel className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Residency Application Details
        </h2>
        
        <div className="mb-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✓ Payment confirmed: {formatCurrency(packagePrice)} for {packageType} package
            </p>
          </div>
        </div>

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

        {/* Address */}
        <div className="mb-8">
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
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Additional Family Members (if applicable) */}
        {(packageType === 'couple' || packageType === 'family') && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Family Members
            </h3>
            
            {/* Spouse Section */}
            {(packageType === 'couple' || packageType === 'family') && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Spouse Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="spouse.firstName"
                    placeholder="Spouse's first name"
                  />
                  <Input
                    label="Last Name"
                    name="spouse.lastName"
                    placeholder="Spouse's last name"
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    name="spouse.dateOfBirth"
                  />
                  <Input
                    label="Passport Number"
                    name="spouse.passportNumber"
                    placeholder="Spouse's passport number"
                  />
                </div>
              </div>
            )}

            {/* Children Section (Family package only) */}
            {packageType === 'family' && (
              <div>
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Children Information (Optional)
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Child 1</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        placeholder="First name"
                        name="child1.firstName"
                      />
                      <Input
                        placeholder="Last name"
                        name="child1.lastName"
                      />
                      <Input
                        type="date"
                        name="child1.dateOfBirth"
                      />
                      <Input
                        placeholder="Passport number"
                        name="child1.passportNumber"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Child 2</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        placeholder="First name"
                        name="child2.firstName"
                      />
                      <Input
                        placeholder="Last name"
                        name="child2.lastName"
                      />
                      <Input
                        type="date"
                        name="child2.dateOfBirth"
                      />
                      <Input
                        placeholder="Passport number"
                        name="child2.passportNumber"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg">
            Submit Application
          </Button>
        </div>
      </GlassPanel>
    </form>
  );
};