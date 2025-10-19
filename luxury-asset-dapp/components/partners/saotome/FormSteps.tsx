// components/partners/saotome/FormSteps.tsx
'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FormStepsProps {
  currentStep: number;
}

export const FormSteps: React.FC<FormStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Contact Details' },
    { number: 3, title: 'Documents' },
    { number: 4, title: 'Review & Submit' },
  ];

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                currentStep > step.number
                  ? 'bg-green-500 text-white'
                  : currentStep === step.number
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 text-center max-w-[80px]">
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 transition-all ${
                currentStep > step.number
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};