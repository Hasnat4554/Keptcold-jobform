"use client";

import PostcodeChecker from "@/components/PostcodeChecker";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-10 sm:py-16">
        {/* Postcode Checker Section — above everything */}
        <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Check if we cover your area
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8">
            Enter your postcode to start booking
          </p>

          <PostcodeChecker variant="hero" />

          {/* Trust indicators */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-700">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#003366]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Takes less than 2 minutes
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#003366]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Same-day emergency available
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#003366]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Commercial refrigeration specialists
            </span>
          </div>
        </div>

        {/* How We Work */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            How we work
          </h2>
          <div className="text-left sm:text-center">
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              All call-out services include engineer attendance and up to 1 hour
              of labour to diagnose the fault and carry out repairs where
              possible.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              Many issues can be resolved during this visit. If replacement
              parts, refrigerant, materials or additional labour are required, we
              will provide a clear quotation for approval before any further work
              is carried out.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              This ensures you always know the cost before any additional work
              begins.
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              Most breakdowns can be diagnosed within the first hour.
            </p>
          </div>
        </div>

        {/* Service Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Standard */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#003366] text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Standard Call-Out</h3>
              <p className="text-3xl font-bold">
                £120 <span className="text-lg font-normal">+ VAT</span>
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Next available engineer
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Mon–Fri, 8:30am–5:30pm
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Typical response within 24–36 hours
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Includes engineer attendance + first 1 hour labour
                </li>
              </ul>
            </div>
          </div>

          {/* Same Day */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-orange-500">
            <div className="bg-orange-500 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Same Day Service</h3>
              <p className="text-3xl font-bold">
                £180 <span className="text-lg font-normal">+ VAT</span>
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Same day engineer attendance
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Mon–Sun, 8:30am–10:00pm
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Priority response
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Includes engineer attendance + first 1 hour labour
                </li>
              </ul>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-500 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">
                Emergency 2-Hour Response
              </h3>
              <p className="text-3xl font-bold">
                £240 <span className="text-lg font-normal">+ VAT</span>
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Approx 2 hour arrival
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 availability
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Highest priority attendance
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Includes engineer attendance + first 1 hour labour
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose KeptCold?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Fast Response
              </h4>
              <p className="text-gray-600">24/7 emergency service available</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Certified Engineers
              </h4>
              <p className="text-gray-600">Fully qualified technicians</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Transparent Pricing
              </h4>
              <p className="text-gray-600">No hidden fees or charges</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Guaranteed Work
              </h4>
              <p className="text-gray-600">All repairs fully guaranteed</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-[#003366] text-white rounded-lg text-center max-w-4xl mx-auto px-4 p-6 sm:p-8 md:p-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Ready to Get Your Refrigeration Fixed?
          </h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8 text-blue-200">
            Book your call-out online and we'll schedule the earliest available
            engineer.
          </p>
          <PostcodeChecker variant="cta" />
          <p className="text-sm text-blue-200 mt-4">
            Secure online booking &bull; Instant confirmation
          </p>
        </div>
      </main>

  
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 KeptCold. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            Fast & Reliable Commercial Refrigeration Repairs
          </p>
        </div>
      </footer>
    </div>
  );
}
