"use client";

import { ServiceType, SERVICE_OPTIONS } from "@/types/booking";

interface Props {
  selectedService: ServiceType;
  onSelect: (service: ServiceType) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Priority({
  selectedService,
  onSelect,
  onNext,
  onBack,
}: Props) {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#003366] mb-2">
          Step 3: Select Call-Out Priority
        </h2>
        <p className="text-black">How quickly do you need our service?</p>
      </div>

      {/* Service Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Standard Call-Out */}
        <div
          onClick={() => onSelect("standard")}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all
            ${
              selectedService === "standard"
                ? "border-[#003366] shadow-xl scale-105"
                : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
            }`}
        >
          <div className="bg-[#003366] text-white p-4">
            <h3 className="text-xl font-bold mb-1">Standard Call-Out</h3>
            <p className="text-sm opacity-90">Next Available Appointment</p>
          </div>
          <div className="p-6 bg-white">
            <div className="mb-4">
              <div className="text-4xl font-bold text-[#003366] mb-1">
                £120
                <span className="text-lg font-normal text-gray-600">
                  {" "}
                  + VAT
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5"
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
                <span className="text-black">Mon-Fri</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5"
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
                <span className="text-black">8 AM - 6 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-[#003366] flex-shrink-0 mt-0.5"
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
                <span className="text-black">Includes 1st 1h labour</span>
              </div>
            </div>
          </div>
          {selectedService === "standard" && (
            <div className="absolute top-4 right-4 bg-white rounded-full p-1">
              <svg
                className="w-6 h-6 text-[#003366]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          )}
        </div>

        {/* Same Day Service */}
        <div
          onClick={() => onSelect("sameDay")}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all
            ${
              selectedService === "sameDay"
                ? "border-orange-500 shadow-xl scale-105"
                : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
            }`}
        >
          <div className="bg-orange-500 text-white p-4">
            <h3 className="text-xl font-bold mb-1">Same Day Service</h3>
            <p className="text-sm opacity-90">Visit Today</p>
          </div>
          <div className="p-6 bg-white">
            <div className="mb-4">
              <div className="text-4xl font-bold text-orange-500 mb-1">
                £180
                <span className="text-lg font-normal text-gray-600">
                  {" "}
                  + VAT
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
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
                <span className="text-black">Mon-Sun</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
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
                <span className="text-black">8 AM - 6 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
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
                <span className="text-black">Includes 1st 1h labour</span>
              </div>
            </div>
          </div>
          {selectedService === "sameDay" && (
            <div className="absolute top-4 right-4 bg-white rounded-full p-1">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          )}
        </div>

        {/* Emergency 4 Hour Response */}
        <div
          onClick={() => onSelect("emergency")}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all
            ${
              selectedService === "emergency"
                ? "border-red-500 shadow-xl scale-105"
                : "border-gray-200 hover:border-red-300 hover:shadow-lg"
            }`}
        >
          <div className="bg-red-500 text-white p-4">
            <h3 className="text-xl font-bold mb-1">
              Emergency 4 Hour Response
            </h3>
            <p className="text-sm opacity-90">4-hour Arrival</p>
          </div>
          <div className="p-6 bg-white">
            <div className="mb-4">
              <div className="text-4xl font-bold text-red-500 mb-1">
                £240
                <span className="text-lg font-normal text-gray-600">
                  {" "}
                  + VAT
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
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
                <span className="text-black">Mon-Sun</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
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
                <span className="text-black">24/7 Service</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
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
                <span className="text-black">Includes 1st 1h labour</span>
              </div>
            </div>
          </div>
          {selectedService === "emergency" && (
            <div className="absolute top-4 right-4 bg-white rounded-full p-1">
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-black py-4 px-6 rounded-lg font-semibold text-lg
            hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 bg-[#003366] text-white py-4 px-6 rounded-lg font-semibold text-lg
            hover:bg-[#004488] transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Proceed to Payment
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
