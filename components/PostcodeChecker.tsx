'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// =====================================================
// SERVICE AREA CONFIGURATION
// Add or remove postcode prefixes to change coverage.
// These are the outward code prefixes (the part before the space).
// =====================================================
const SERVED_POSTCODES = [
  // London
  'E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC',
  // Greater London & surrounding
  'BR', 'CR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'WD',
  // Essex
  'SS', 'CM', 'CO',
  // Kent
  'ME', 'TN', 'CT',
  // Surrey
  'GU', 'RH', 'KT',
  // Hertfordshire
  'AL', 'SG', 'HP',
  // Berkshire / Buckinghamshire
  'SL', 'RG', 'MK',
  
  'LU', 'MK',
];

// Extract the alpha prefix from a UK postcode (e.g. "SW1A 1AA" -> "SW")
function getPostcodePrefix(postcode: string): string {
  const cleaned = postcode.toUpperCase().replace(/\s+/g, '');
 
  const match = cleaned.match(/^([A-Z]{1,2})/);
  return match ? match[1] : '';
}

function isValidUKPostcode(postcode: string): boolean {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();

  return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(cleaned);
}

interface PostcodeCheckerProps {
  variant?: 'hero' | 'cta';
}

export default function PostcodeChecker({ variant = 'hero' }: PostcodeCheckerProps) {
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = postcode.trim();

    if (!trimmed) {
      setError('Please enter your postcode');
      return;
    }

    if (!isValidUKPostcode(trimmed)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    setChecking(true);

    const prefix = getPostcodePrefix(trimmed);
    const isServed = SERVED_POSTCODES.includes(prefix);

    setTimeout(() => {
      setChecking(false);
      if (isServed) {
        router.push('/book-service');
      } else {
        setError(
          'Sorry, we don\'t currently cover your area. Please call us on 0800 XXX XXXX to discuss your requirements.'
        );
      }
    }, 500);
  };

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleCheck} className="w-full max-w-md mx-auto">
      <p className={`text-sm mb-2 ${isHero ? 'text-gray-500' : 'text-blue-200'}`}>
        Enter your postcode to check if we cover your area
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value.toUpperCase());
            if (error) setError('');
          }}
          placeholder="e.g. SW1A 1AA"
          className={`flex-1 px-4 py-3 rounded-lg bg-gray-800 border text-white font-medium
            focus:ring-2 focus:ring-[#003366] focus:border-transparent
            ${error ? 'border-red-400' : 'border-gray-300'}
          `}
        />
        <button
          type="submit"
          disabled={checking}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap
            ${isHero
              ? 'bg-[#003366] text-white hover:bg-[#004488]'
              : 'bg-white text-[#003366] hover:bg-gray-100'
            }
            ${checking ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
          `}
        >
          {checking ? 'Checking...' : 'Book Now'}
        </button>
      </div>
      {error && (
        <p className={`mt-2 text-sm font-medium ${
          error.includes('don\'t currently cover') ? 'text-orange-500' : 'text-red-500'
        }`}>
          {error}
        </p>
      )}
    </form>
  );
}
