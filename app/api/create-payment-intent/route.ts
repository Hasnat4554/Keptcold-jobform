import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe only if key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log("KEY:", process.env.STRIPE_SECRET_KEY);
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-01-28.clover',
  });
};

export async function POST(request: NextRequest) {
  try {
    const { amount, businessDetails, serviceType } = await request.json();
    const stripe = getStripe();

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        businessName: businessDetails.businessName,
        contactEmail: businessDetails.contactEmail,
        serviceType: serviceType,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
