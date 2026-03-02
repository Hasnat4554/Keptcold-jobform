'use client';

import { useState } from 'react';
import { BusinessDetails, ACCESS_HOURS_OPTIONS } from '@/types/booking';

interface Props {
  data: BusinessDetails;
  onUpdate: (data: BusinessDetails) => void;
  onNext: () => void;
}

export default function Step1BusinessDetails({ data, onUpdate, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof BusinessDetails, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!data.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
    }
    if (!data.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    if (!data.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    } else if (data.contactPhone.replace(/\s/g, '').length !== 11) {
      newErrors.contactPhone = 'Phone number must be exactly 11 digits';
    }
    if (!data.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-2">
          Step 1: Your Business Details
        </h2>
        <p className="text-gray-600">
          Fast & Reliable Commercial Refrigeration Repairs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            placeholder="Enter your business name"
            className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.businessName ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
          )}
        </div>

        {/* Business Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.businessAddress}
            onChange={(e) => handleChange('businessAddress', e.target.value)}
            placeholder="Enter complete business address"
            className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.businessAddress ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.businessAddress && (
            <p className="mt-1 text-sm text-red-500">{errors.businessAddress}</p>
          )}
        </div>

        {/* Job Address (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Address (if different)
          </label>
          <input
            type="text"
            value={data.jobAddress}
            onChange={(e) => handleChange('jobAddress', e.target.value)}
            placeholder="Leave blank if same as business address"
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.contactName}
            onChange={(e) => handleChange('contactName', e.target.value)}
            placeholder="Enter contact person name"
            className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.contactName ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.contactName && (
            <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="Enter contact phone number"
            className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.contactPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.contactPhone}</p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.contactEmail}
            onChange={(e) => handleChange('contactEmail', e.target.value)}
            placeholder="Enter contact email address"
            className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.contactEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>
          )}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Access Hours <span className="text-red-500">*</span>
          </label>
          <select
            value={data.siteAccessHours}
            onChange={(e) => handleChange('siteAccessHours', e.target.value)}
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
          >
            {ACCESS_HOURS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#003366] text-white py-4 px-6 rounded-lg font-semibold text-lg
              hover:bg-[#004488] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Next Step
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
