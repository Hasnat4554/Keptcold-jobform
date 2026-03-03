import Image from "next/image";
import Link from "next/link";
import logo from "../public/lodo.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-4xl font-bold">
           <Image src={logo} alt="KeptCold Logo" width={200} height={50} className="inline-block" />
          </div>
          <p className="text-blue-200 mt-1">Fast & Reliable Commercial Refrigeration Repairs</p>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How we work
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            All call-out services include engineer attendance and up to 1 hour of labour to diagnose the system and carry out repairs where possible. If replacement parts, refrigerant, materials, or additional labour are required, a quotation will be provided for approval before any further work is carried out.
          </p>

          {/* CTA Button */}
          <Link
            href="/book-service"
            className="inline-block bg-[#003366] text-white text-xl font-semibold py-4 px-12 rounded-lg
              hover:bg-[#004488] transition-colors duration-200 shadow-lg"
          >
            Book a Service Call-Out
          </Link>
        </div>

        {/* Service Options */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {/* Standard */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#003366] text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Standard Call-Out</h3>
              <p className="text-3xl font-bold">£120 <span className="text-lg font-normal">+ VAT</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Next available slot
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mon-Fri, 8am-6pm
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  36h response time
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Includes 1st 1h labour
                </li>
              </ul>
            </div>
          </div>

          {/* Same Day */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-orange-500">
            <div className="bg-orange-500 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Same Day Service</h3>
              <p className="text-3xl font-bold">£180 <span className="text-lg font-normal">+ VAT</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Visit today
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mon-Sun, 8am-6pm
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24h response time
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Includes 1st 1h labour
                </li>
              </ul>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-500 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Emergency 4-Hour</h3>
              <p className="text-3xl font-bold">£240 <span className="text-lg font-normal">+ VAT</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  4-hour arrival
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 availability
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority response
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Includes 1st 1h labour
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
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">Fast Response</h4>
              <p className="text-gray-600">24/7 emergency service available</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">Certified Engineers</h4>
              <p className="text-gray-600">Fully qualified technicians</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">Transparent Pricing</h4>
              <p className="text-gray-600">No hidden fees or charges</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">Guaranteed Work</h4>
              <p className="text-gray-600">All repairs fully guaranteed</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-[#003366] text-white rounded-lg p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Book Your Service?</h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8 text-blue-200">
            Get your refrigeration issues fixed quickly by our expert engineers
          </p>
          <Link
            href="/book-service"
            className="inline-block bg-white text-[#003366] text-lg font-semibold py-4 px-10 rounded-lg
              hover:bg-gray-100 transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 KeptCold. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Fast & Reliable Commercial Refrigeration Repairs</p>
        </div>
      </footer>
    </div>
  );
}
