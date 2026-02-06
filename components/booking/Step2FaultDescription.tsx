'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaultDetails, EQUIPMENT_TYPES } from '@/types/booking';

interface Props {
  data: FaultDetails;
  onUpdate: (data: FaultDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2FaultDescription({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof FaultDetails, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = [...data.photos, ...acceptedFiles];
    onUpdate({ ...data, photos: newPhotos });
  }, [data, onUpdate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5242880, // 5MB
    multiple: true
  });

  const removePhoto = (index: number) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    onUpdate({ ...data, photos: newPhotos });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.equipmentType) {
      newErrors.equipmentType = 'Please select equipment type';
    }
    if (!data.faultDescription.trim()) {
      newErrors.faultDescription = 'Please describe the fault';
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
        <p className="text-gray-600">
          Help us understand what needs fixing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Equipment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipment Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.equipmentType}
            onChange={(e) => handleChange('equipmentType', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.equipmentType ? 'border-red-500' : 'border-gray-300'}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fault Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.faultDescription}
            onChange={(e) => handleChange('faultDescription', e.target.value)}
            placeholder="Please describe the issue in detail (e.g., not cooling, making unusual noise, leaking, etc.)"
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent
              ${errors.faultDescription ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.faultDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.faultDescription}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Photos (optional)
          </label>
          <p className="text-sm text-gray-500 mb-3">
            You can optionally upload photos of the fault or equipment
          </p>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-[#003366] bg-blue-50' : 'border-gray-300 hover:border-[#003366]'}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-600 mb-1">
                {isDragActive ? 'Drop the files here' : 'Drag & drop photos here, or click to select'}
              </p>
              <p className="text-sm text-gray-500">
                Maximum file size: 5MB per image
              </p>
            </div>
          </div>

          {/* Uploaded Photos Preview */}
          {data.photos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1
                      opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-lg font-semibold text-lg
              hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#003366] text-white py-4 px-6 rounded-lg font-semibold text-lg
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
