# Quick Setup Guide

Follow these steps to get the KeptCold booking funnel running:

## Step 1: Install Dependencies

The dependencies are already installed, but if you need to reinstall them:

```bash
npm install
```

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

### Stripe Configuration

1. Go to https://dashboard.stripe.com/register (or login if you have an account)
2. Navigate to Developers > API keys
3. Copy your **Publishable key** and **Secret key**
4. For testing, use the TEST keys (starting with `pk_test_` and `sk_test_`)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### Email Configuration (Gmail Example)

1. Enable 2-Step Verification on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Other (Custom name)"
4. Copy the 16-character password

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM="KeptCold" <noreply@keptcold.co.uk>
SERVICE_EMAIL=service@keptcold.co.uk
```

## Step 3: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Step 4: Test the Booking Flow

1. Click "Book a Service Call-Out"
2. Fill in business details (use any test data)
3. Describe the fault and optionally upload photos
4. Select a service priority
5. Use Stripe test card for payment:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - Postal code: Any postal code

## File Structure

```
kept-cold/
├── app/
│   ├── page.tsx                       # Homepage
│   ├── book-service/page.tsx          # Multi-step booking form
│   ├── booking-confirmation/page.tsx  # Success page
│   └── api/
│       ├── create-payment-intent/     # Stripe payment API
│       └── send-booking-emails/       # Email notification API
├── components/booking/
│   ├── Step1BusinessDetails.tsx
│   ├── Step2FaultDescription.tsx
│   ├── Step3Priority.tsx
│   └── Step4Payment.tsx
└── types/booking.ts                   # TypeScript types
```

## Customization

### Change Prices

Edit `types/booking.ts` and modify the `SERVICE_OPTIONS` array:

```typescript
export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'standard',
    price: 120, // Change here
    // ...
  },
  // ...
];
```

### Change Brand Colors

Find and replace `#003366` (navy blue) throughout the codebase with your brand color.

### Add Equipment Types

Edit `types/booking.ts` and add to the `EQUIPMENT_TYPES` array:

```typescript
export const EQUIPMENT_TYPES = [
  'Freezer',
  'Chiller',
  'Your New Type', // Add here
  // ...
];
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables in Vercel dashboard:
   - Use **LIVE** Stripe keys (not test keys)
   - Add all SMTP credentials
6. Click "Deploy"

Your site will be live in minutes!

## Troubleshooting

### Build Fails

Make sure all environment variables are set. The build will fail if Stripe keys are missing at runtime.

### Emails Not Sending

- Check SMTP credentials are correct
- For Gmail, make sure 2-Step Verification is enabled
- Use App Password, not your regular password
- Check spam folder

### Payment Not Working

- Verify Stripe keys are correct
- Use test card: 4242 4242 4242 4242
- Check browser console for errors
- Ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY starts with `pk_test_` or `pk_live_`

## Support

For questions about this implementation:
- Read the full [README.md](README.md)
- Check the Stripe documentation: https://stripe.com/docs
- Check the Next.js documentation: https://nextjs.org/docs

## Production Checklist

Before going live:

- [ ] Replace test Stripe keys with live keys
- [ ] Test all three service tiers with real payments
- [ ] Verify both emails (customer + service team) are sent
- [ ] Test on mobile devices
- [ ] Add your real company phone number and email
- [ ] Update any placeholder text
- [ ] Set up proper SMTP service for production
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Test the entire flow end-to-end

---

Built with Next.js 15, TypeScript, Tailwind CSS, and Stripe
