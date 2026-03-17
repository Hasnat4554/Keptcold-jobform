"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  BusinessDetails,
  FaultDetails,
  ServiceType,
  SERVICE_OPTIONS,
} from "@/types/booking";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

interface Props {
  businessDetails: BusinessDetails;
  faultDetails: FaultDetails;
  serviceType: ServiceType;
  onBack: () => void;
}

function PaymentForm({
  businessDetails,
  faultDetails,
  serviceType,
  onBack,
  clientSecret,
}: Props & { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const selectedService = SERVICE_OPTIONS.find((s) => s.id === serviceType);
  const totalPrice = selectedService ? selectedService.price : 0;
  const vatAmount = totalPrice * 0.2;
  const totalWithVAT = totalPrice + vatAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-confirmation`,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message || "An error occurred");
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment successful, send emails
        const emailResponse = await fetch("/api/send-booking-emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessDetails,
            faultDetails,
            serviceType,
            totalPrice: totalWithVAT,
            paymentIntentId: paymentIntent.id,
          }),
        });

        const emailData = await emailResponse.json();
        const bookingReference = emailData.bookingReference;

        try {
          await fetch(
            "https://keptcoldbackend-production.up.railway.app/webhook",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                businessName: businessDetails.businessName,
                businessAddress: businessDetails.businessAddress,
                jobAddress: businessDetails.jobAddress,
                contactName: businessDetails.contactName,
                email: businessDetails.contactEmail,
                contactNumber: businessDetails.contactPhone,
                accessHours: businessDetails.siteAccessHours,
                equipmentType: faultDetails.equipmentType,
                faultDescription: faultDetails.faultDescription,
                totalPrice: totalWithVAT,
              }),
            },
          );
        } catch (webhookErr) {
          console.error("Failed to send data to webhook:", webhookErr);
          // non-fatal; we still redirect the user
        }

        // Redirect to confirmation page
        window.location.href = `/booking-confirmation?payment_intent=${paymentIntent.id}&booking_ref=${bookingReference}`;
        console.log("emailData:", emailData);
        
      }
    } catch (err) {
      setMessage("An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Booking Summary
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-black">Business Name:</span>
            <span className="font-medium text-black">
              {businessDetails.businessName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Job Location:</span>
            <span className="font-medium text-black">
              {businessDetails.jobAddress || businessDetails.businessAddress}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Equipment:</span>
            <span className="font-medium text-black">
              {faultDetails.equipmentType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Service Type:</span>
            <span className="font-medium text-black">
              {selectedService?.name}
            </span>
          </div>

          <div className="border-t border-gray-300 pt-3 mt-3">
            <div className="flex justify-between text-black">
              <span>Call-Out Fee:</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>VAT (20%):</span>
              <span>£{vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#003366] mt-2">
              <span>Total:</span>
              <span>£{totalWithVAT.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Element */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Enter Payment Details
        </h3>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <PaymentElement />
        </div>
      </div>

      
      {message && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-lg font-semibold text-lg
            hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed"
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
          disabled={!stripe || isProcessing}
          className="flex-1 bg-[#003366] text-white py-4 px-6 rounded-lg font-semibold text-lg
            hover:bg-[#004488] transition-colors duration-200 flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Pay £{totalWithVAT.toFixed(2)}
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-4">
        <svg
          className="w-5 h-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <span>
          Powered by <strong>Stripe</strong> - Secure Payment Processing
        </span>
      </div>
    </form>
  );
}

export default function Step4Payment(props: Props) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  const selectedService = SERVICE_OPTIONS.find(
    (s) => s.id === props.serviceType,
  );
  const totalPrice = selectedService ? selectedService.price : 0;
  const totalWithVAT = totalPrice * 1.2;

  useEffect(() => {

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(totalWithVAT * 100), 
        businessDetails: props.businessDetails,
        serviceType: props.serviceType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        setLoading(false);
      });
  }, [totalWithVAT, props.businessDetails, props.serviceType]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-2">
          Step 4: Secure Payment
        </h2>
        <p className="text-gray-600">
          Complete your booking with secure payment
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg
            className="animate-spin h-12 w-12 text-[#003366]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm {...props} clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div className="text-center py-8 text-red-600">
          Failed to initialize payment. Please try again.
        </div>
      )}
    </div>
  );
}
