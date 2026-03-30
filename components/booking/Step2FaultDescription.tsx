"use client";

import { useState } from "react";
import { FaultDetails, EQUIPMENT_TYPES } from "@/types/booking";

interface Props {
  data: FaultDetails;
  onUpdate: (data: FaultDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2FaultDescription({
  data,
  onUpdate,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof FaultDetails, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.equipmentType) {
      newErrors.equipmentType = "Please select equipment type";
    }
    if (!data.faultDescription.trim()) {
      newErrors.faultDescription = "Please describe the fault";
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
          Step 2: Describe the Issue
        </h2>
        <p className="text-gray-600">Help us understand what needs fixing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Equipment Type */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Equipment Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.equipmentType}
            onChange={(e) => handleChange("equipmentType", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent text-black
              ${errors.equipmentType ? "border-red-500" : "border-gray-300"}
            `}
          >
            <option value="">Select equipment type...</option>
            {EQUIPMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.equipmentType && (
            <p className="mt-1 text-sm text-red-500">{errors.equipmentType}</p>
          )}
        </div>

        {/* Fault Description */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Fault Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.faultDescription}
            onChange={(e) => handleChange("faultDescription", e.target.value)}
            placeholder="Please describe the issue in detail (e.g., not cooling, making unusual noise, leaking, etc.)"
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent text-black
              ${errors.faultDescription ? "border-red-500" : "border-gray-300"}
            `}
          />
          {errors.faultDescription && (
            <p className="mt-1 text-sm text-red-500">
              {errors.faultDescription}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
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
            type="submit"
            className="flex-1 bg-[#003366] text-white py-4 px-6 rounded-lg font-semibold text-lg
              hover:bg-[#004488] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Next Step
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
      </form>
    </div>
  );
}
