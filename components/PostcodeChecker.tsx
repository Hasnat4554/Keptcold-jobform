'use client';

import { useState } from 'react';

// =====================================================
// APPROVED SERVICE COVERAGE LIST
// Outward codes (district level) — single shared list.
// Update here to change coverage everywhere.
// =====================================================
const COVERED_POSTCODES = [
  // North West London
  'NW1','NW2','NW3','NW4','NW5','NW6','NW7','NW8','NW9','NW10','NW11',
  // North London
  'N1','N2','N3','N4','N5','N6','N7','N8','N9','N10','N11','N12','N13','N14','N15','N16','N17','N18','N19','N20','N21','N22',
  // West London
  'W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14',
  // Central London
  'WC1','WC2','EC1','EC2','EC3','EC4',
  // East London
  'E1','E2','E3','E4','E5','E6','E7','E8','E9','E10','E11','E12','E13','E14','E15','E16','E17','E18',
  // South East London
  'SE1','SE5','SE8','SE10','SE11','SE14','SE15','SE16','SE17','SE18',
  // South West London
  'SW1','SW2','SW3','SW4','SW5','SW6','SW7','SW8','SW9','SW10','SW11','SW12','SW13','SW14','SW15','SW16','SW17','SW18','SW19','SW20',
  // Outer West / North West
  'HA0','HA1','HA3','HA5','HA7','HA8','UB1','UB2','UB3','UB4','UB5','UB6','UB7',
  // South West Outer
  'TW1','TW2','TW3','TW4','TW5','TW7','TW8','TW13',
  // North / North West Edge
  'WD6','EN1','EN2','EN3','EN4','EN5',
];

/**
 * Extract the outward code from a UK postcode.
 * e.g. "SW1A 1AA" -> "SW1A", "NW9 6BX" -> "NW9", "E14 5AB" -> "E14"
 * We then strip the trailing letter (if any) to get the district: "SW1A" -> "SW1", but
 * we match against the list which uses district-level codes like "SW1", "NW9", "E14", "EC1".
 */
function getOutwardCode(postcode: string): string {
  const normalised = postcode.trim().toUpperCase().replace(/\s+/g, ' ');
  // Full postcode with space: take part before the space
  if (normalised.includes(' ')) {
    return normalised.split(' ')[0];
  }
  // No space — outward code is everything except the last 3 characters (inward code)
  if (normalised.length > 4) {
    return normalised.slice(0, -3);
  }
  return normalised;
}

/**
 * Check coverage by trying the full outward code first, then without a trailing letter.
 * e.g. "SW1A" -> try "SW1A", then "SW1"
 */
function isCovered(postcode: string): boolean {
  const outward = getOutwardCode(postcode);
  if (COVERED_POSTCODES.includes(outward)) return true;
  // Strip trailing letter for sub-district codes like SW1A, EC2A
  const withoutSuffix = outward.replace(/[A-Z]$/, '');
  return COVERED_POSTCODES.includes(withoutSuffix);
}

function isValidUKPostcode(postcode: string): boolean {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  return /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(cleaned);
}

interface PostcodeCheckerProps {
  variant?: 'hero' | 'cta';
  onCovered?: () => void;
}

export default function PostcodeChecker({ variant = 'hero', onCovered }: PostcodeCheckerProps) {
  const [postcode, setPostcode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | ''>('');
  const [checking, setChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    const trimmed = postcode.trim();

    if (!trimmed) {
      setMessage('Please enter your postcode.');
      setMessageType('error');
      return;
    }

    if (!isValidUKPostcode(trimmed)) {
      setMessage('Please enter a valid UK postcode.');
      setMessageType('error');
      return;
    }

    setChecking(true);

    setTimeout(() => {
      setChecking(false);
      if (isCovered(trimmed)) {
        setMessage('Great news — we cover your area. You can continue with booking below.');
        setMessageType('success');
        onCovered?.();
      } else {
        setMessage('Sorry, we do not currently cover this postcode. Please contact us and we may still be able to assist.');
        setMessageType('warning');
      }
    }, 500);
  };

  const isHero = variant === 'hero';

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleCheck}>
        <div className={`rounded-xl p-5 sm:p-6 ${isHero ? 'bg-white shadow-lg border border-gray-200' : 'bg-white/10 backdrop-blur-sm'}`}>
          {/* Input with location icon */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className={`w-5 h-5 ${isHero ? 'text-gray-400' : 'text-blue-200'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <input
              type="text"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value.toUpperCase());
                if (message) {
                  setMessage('');
                  setMessageType('');
                }
              }}
              placeholder="Enter your pos tcode (e.g SW1A 1AA)"
              className={`w-full pl-12 pr-4 py-3.5 rounded-lg font-medium text-base
                focus:ring-2 focus:outline-none transition-colors
                ${isHero
                  ? 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-[#003366] focus:border-[#003366]'
                  : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-white focus:border-white'
                }
                ${messageType === 'error' ? '!border-red-400 !ring-red-400' : ''}
              `}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={checking}
            className={`w-full py-3.5 rounded-lg font-bold text-base tracking-wide uppercase transition-all duration-200
              ${isHero
                ? 'bg-[#003366] text-white hover:bg-[#004488] active:bg-[#002244]'
                : 'bg-white text-[#003366] hover:bg-gray-100 active:bg-gray-200'
              }
              ${checking ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
            `}
          >
            {checking ? 'Checking...' : 'Check Coverage'}
          </button>
        </div>
      </form>

      {/* Feedback message */}
      {message && (
        <div className={`mt-4 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-2
          ${messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : ''}
          ${messageType === 'warning' ? 'bg-orange-50 text-orange-800 border border-orange-200' : ''}
          ${messageType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
          ${!isHero && messageType === 'success' ? '!bg-green-500/20 !text-green-100 !border-green-400/30' : ''}
          ${!isHero && messageType === 'warning' ? '!bg-orange-500/20 !text-orange-100 !border-orange-400/30' : ''}
          ${!isHero && messageType === 'error' ? '!bg-red-500/20 !text-red-100 !border-red-400/30' : ''}
        `}>
          {messageType === 'success' && (
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {messageType === 'warning' && (
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {messageType === 'error' && (
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
