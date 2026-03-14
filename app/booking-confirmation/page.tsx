'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Generate a human-friendly reference number
function generateRef(paymentIntentId: string | null): string {
  if (!paymentIntentId) return `KC-${Date.now().toString().slice(-8)}`;
  // Take last 8 chars of payment intent for a short reference
  const short = paymentIntentId.replace('pi_', '').slice(-8).toUpperCase();
  return `KC-${short}`;
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  // ✅ Fix: read both 'job' and 'booking_ref' since URL shows booking_ref
  const jobNumber =
    searchParams.get('job') ||
    searchParams.get('booking_ref') ||
    searchParams.get('jobNumber') ||
    null;

  // Generate a customer-facing reference number
  const customerRef = jobNumber && jobNumber !== 'undefined'
    ? jobNumber
    : generateRef(paymentIntentId);

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = 20;

      // ── Header bar ──────────────────────────────────────────
      pdf.setFillColor(0, 51, 102);
      pdf.rect(0, 0, pageWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
    
      pdf.setFontSize(9);
 

      y = 38;

      // ── Green success circle ─────────────────────────────────
      pdf.setFillColor(220, 252, 231);
      pdf.circle(pageWidth / 2, y + 10, 12, 'F');
      pdf.setDrawColor(22, 163, 74);
      pdf.setLineWidth(1.5);
      pdf.line(pageWidth / 2 - 5, y + 10, pageWidth / 2 - 1, y + 14);
      pdf.line(pageWidth / 2 - 1, y + 14, pageWidth / 2 + 6, y + 4);

      y += 28;

      // ── Title ────────────────────────────────────────────────
      pdf.setTextColor(17, 24, 39);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Booking Confirmed!', pageWidth / 2, y, { align: 'center' });

      y += 9;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(75, 85, 99);
      pdf.text(
        'Thank you for choosing KeptCold. Your payment has been successfully processed.',
        pageWidth / 2, y, { align: 'center', maxWidth: contentWidth }
      );

      y += 14;

      // ── CUSTOMER REFERENCE NUMBER (most prominent) ───────────
      pdf.setFillColor(0, 51, 102);
      pdf.roundedRect(margin, y, contentWidth, 28, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('YOUR BOOKING REFERENCE', pageWidth / 2, y + 8, { align: 'center' });
      pdf.setFontSize(18);
      pdf.setFont('courier', 'bold');
      pdf.text(customerRef, pageWidth / 2, y + 20, { align: 'center' });

      y += 36;

      // ── Payment Reference box ────────────────────────────────
      pdf.setFillColor(249, 250, 251);
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PAYMENT REFERENCE', margin + 8, y + 7);
      pdf.setFontSize(9);
      pdf.setTextColor(17, 24, 39);
      pdf.setFont('courier', 'normal');
      pdf.text(paymentIntentId || 'N/A', margin + 8, y + 16, { maxWidth: contentWidth - 16 });

      y += 30;

      // ── What's next box ──────────────────────────────────────
      pdf.setFillColor(239, 246, 255);
      pdf.setDrawColor(191, 219, 254);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, y, contentWidth, 62, 3, 3, 'FD');

      pdf.setFontSize(11);
      pdf.setTextColor(0, 51, 102);
      pdf.setFont('helvetica', 'bold');
      pdf.text('What happens next?', margin + 8, y + 10);

      const steps = [
        "You'll receive a confirmation email with all the details",
        'Our dispatch team will review your booking',
        'A technician will be assigned and will contact you shortly',
        'Your refrigeration issue will be resolved quickly and professionally',
      ];

      steps.forEach((step, i) => {
        const stepY = y + 20 + i * 11;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 51, 102);
        pdf.text(`${i + 1}.`, margin + 8, stepY);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(55, 65, 81);
        pdf.text(step, margin + 16, stepY, { maxWidth: contentWidth - 24 });
      });

      y += 72;

      // ── Contact info ─────────────────────────────────────────
      pdf.setFontSize(10);
      pdf.setTextColor(75, 85, 99);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Need to make changes or have questions?', pageWidth / 2, y, { align: 'center' });
      y += 7;
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 51, 102);
      pdf.text('Call us: 02081469071', pageWidth / 2, y, { align: 'center' });

      // ── Footer ───────────────────────────────────────────────
      pdf.setFillColor(0, 51, 102);
      pdf.rect(0, 284, pageWidth, 13, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const date = new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      });
      pdf.text(`KeptCold Refrigeration Services  |  Generated: ${date}`, pageWidth / 2, 292, { align: 'center' });

      pdf.save(`KeptCold-Booking-${customerRef}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

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
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">

          <div>
            <header>
            <div className="bg-[#003366] text-white py-6 mb-8 ">
              {/* <h1 className="text-2xl font-bold">Booking Confirmation</h1>
              <p className="text-sm text-blue-200 mt-1">
                Thank you for choosing KeptCold Refrigeration Services
              </p> */}
              </div>
            </header>
          </div>
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for choosing KeptCold. Your payment has been successfully processed.
            </p>

            {/* ✅ Prominent Customer Reference Number */}
            <div className="bg-[#003366] rounded-lg p-6 mb-6">
              <h3 className="text-sm font-semibold text-blue-200 uppercase mb-2 tracking-wider">
                Your Booking Reference
              </h3>
              <p className="text-2xl font-mono font-bold text-white tracking-widest">
                {customerRef}
              </p>
              <p className="text-xs text-blue-200 mt-2">
                Please keep this reference number for your records
              </p>
            </div>

            {/* Payment Reference */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Payment Reference</h3>
              <p className="text-sm font-mono text-gray-700 break-all">{paymentIntentId}</p>
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
                {[
                  "You'll receive a confirmation email with all the details",
                  'Our dispatch team will review your booking',
                  'A technician will be assigned and will contact you shortly',
                  'Your refrigeration issue will be resolved quickly and professionally',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#003366] font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-sm text-gray-600 mb-6">
              <p>Need to make changes or have questions?</p>
              <p className="font-semibold text-[#003366] mt-1">Call us: 02081469071</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 bg-[#003366] text-white py-3 px-6 rounded-lg font-semibold
                  hover:bg-[#004488] transition-colors duration-200 text-center"
              >
                Return to Home
              </Link>
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold
                  hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? 'Generating PDF...' : 'Download Confirmation'}
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
