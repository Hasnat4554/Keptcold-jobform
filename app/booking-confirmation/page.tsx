'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-[#003366] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Processing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            <span className="font-normal">KEPT</span>
            <span className="font-bold">COLD</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for choosing KeptCold. Your payment has been successfully processed.
            </p>

            {/* Confirmation Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Payment Reference
              </h3>
              <p className="text-lg font-mono text-gray-900 break-all">
                {paymentIntentId}
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-lg font-semibold text-[#003366] mb-3 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What happens next?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#003366] font-bold">1.</span>
                  <span>You'll receive a confirmation email with all the details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003366] font-bold">2.</span>
                  <span>Our dispatch team will review your booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003366] font-bold">3.</span>
                  <span>A technician will be assigned and will contact you shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003366] font-bold">4.</span>
                  <span>Your refrigeration issue will be resolved quickly and professionally</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-sm text-gray-600 mb-6">
              <p>Need to make changes or have questions?</p>
              <p className="font-semibold text-[#003366] mt-1">
                Call us: 0800 123 4567
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 bg-[#003366] text-white py-3 px-6 rounded-lg font-semibold
                  hover:bg-[#004488] transition-colors duration-200"
              >
                Return to Home
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 cursor-pointer bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold
                  hover:bg-gray-300 transition-colors duration-200"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-[#003366] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  );
}
