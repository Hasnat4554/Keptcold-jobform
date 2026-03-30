'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BusinessDetails, FaultDetails, ServiceType } from '@/types/booking';
import Step1BusinessDetails from '@/components/booking/Step1BusinessDetails';
import Step2FaultDescription from '@/components/booking/Step2FaultDescription';
import Step3Priority from '@/components/booking/Step3Priority';
import Step4Payment from '@/components/booking/Step4Payment';

function BookServiceContent() {
  const searchParams = useSearchParams();
  const verifiedPostcode = searchParams.get('postcode');
  const [currentStep, setCurrentStep] = useState(1);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: '',
    businessAddress: '',
    jobAddress: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    siteAccessHours: '8am - 6pm',
    siteAccessFrom: '',
    siteAccessUntil: ''
  });
  const [faultDetails, setFaultDetails] = useState<FaultDetails>({
    equipmentType: '',
    faultDescription: '',
  });
  const [serviceType, setServiceType] = useState<ServiceType>('standard');

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
   <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Book a Refrigeration Service Call-Out</h1>
          <p className="text-sm text-blue-200 mt-1">
            Fast & Reliable Commercial Refrigeration Repairs
          </p>
        </div>
      </header>

      {/* Postcode verified confirmation */}
      {verifiedPostcode && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-green-800">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Postcode <strong>{verifiedPostcode.toUpperCase()}</strong> is within our coverage area</span>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2
                      ${currentStep >= step
                        ? 'bg-[#003366] text-white border-[#003366]'
                        : 'bg-white text-gray-400 border-gray-300'
                      }`}
                  >
                    {step}
                  </div>
                  <span className={`text-xs mt-1 text-center
                    ${currentStep >= step ? 'text-[#003366] font-semibold' : 'text-gray-400'}
                  `}>
                    {step === 1 && 'Business Details'}
                    {step === 2 && 'Describe Issue'}
                    {step === 3 && 'Select Priority'}
                    {step === 4 && 'Payment'}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step ? 'bg-[#003366]' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <Step1BusinessDetails
              data={businessDetails}
              onUpdate={setBusinessDetails}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <Step2FaultDescription
              data={faultDetails}
              onUpdate={setFaultDetails}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Step3Priority
              selectedService={serviceType}
              onSelect={setServiceType}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <Step4Payment
              businessDetails={businessDetails}
              faultDetails={faultDetails}
              serviceType={serviceType}
              onBack={prevStep}
            />
          )}
          
        </div>
      </main>
    </div>
  );
}

export default function BookServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookServiceContent />
    </Suspense>
  );
}
