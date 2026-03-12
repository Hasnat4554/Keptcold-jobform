# KeptCold - Refrigeration Service Booking System

A modern, multi-step booking funnel for KeptCold's refrigeration service call-outs. Built with Next.js 15, TypeScript, Tailwind CSS, and Stripe payment integration.

## Features

- **Multi-step booking form** with progress tracking
- **Three service tiers**:
  - Standard Call-Out (£120 + VAT)
  - Same Day Service (£180 + VAT)
  - Emergency 4-Hour Response (£240 + VAT)
- **Stripe payment integration** for secure payments
- **Email notifications** to both customer and service team
- **Photo upload** capability for fault documentation
- **Fully responsive** design for desktop and mobile
- **Form validation** with user-friendly error messages

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Stripe** for payment processing
- **Nodemailer** for email notifications
- **React Dropzone** for file uploads

## Prerequisites

- Node.js 18+ and npm
- Stripe account (for payment processing)
- SMTP email service (Gmail, SendGrid, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kept-cold
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your credentials:
   ```env
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

   # SMTP Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM="KeptCold" <noreply@keptcold.co.uk>

   # Service Email
   SERVICE_EMAIL=service@keptcold.co.uk
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
kept-cold/
├── app/
│   ├── api/
│   │   ├── create-payment-intent/    # Stripe payment intent API
│   │   └── send-booking-emails/      # Email notification API
│   ├── book-service/                  # Main booking funnel page
│   ├── booking-confirmation/          # Success page after payment
│   └── page.tsx                       # Homepage
├── components/
│   └── booking/
│       ├── Step1BusinessDetails.tsx   # Business info form
│       ├── Step2FaultDescription.tsx  # Equipment & fault details
│       ├── Step3Priority.tsx          # Service tier selection
│       └── Step4Payment.tsx           # Payment with Stripe
├── types/
│   └── booking.ts                     # TypeScript interfaces
├── .env.example                       # Environment variables template
└── README.md
```

## Configuration

### Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. For testing, use test mode keys (starting with `pk_test_` and `sk_test_`)
4. For production, use live keys (starting with `pk_live_` and `sk_live_`)

### Email Setup (Gmail)

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password
3. Use this password in your `.env.local` file

### Alternative Email Providers

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-smtp-username
SMTP_PASSWORD=your-mailgun-smtp-password
```

## Booking Flow

1. **Step 1: Business Details**
   - Business name and address
   - Contact information
   - Site access hours

2. **Step 2: Fault Description**
   - Equipment type selection
   - Detailed fault description
   - Optional photo uploads

3. **Step 3: Service Priority**
   - Choose between Standard, Same Day, or Emergency service
   - View pricing and availability

4. **Step 4: Payment**
   - Review booking summary
   - Secure payment via Stripe
   - Automatic email confirmations

## Email Notifications

After successful payment, two emails are sent:

1. **Customer Confirmation Email**
   - Booking details
   - Payment receipt
   - Next steps information

2. **Service Team Notification**
   - All booking information
   - Customer contact details
   - Priority level highlighted
   - Action required notice

## Customization

### Changing Prices

Edit `types/booking.ts`:

```typescript
export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'standard',
    name: 'Standard Call-Out',
    price: 120, // Change this value
    // ...
  },
  // ...
];
```

### Adding Equipment Types

Edit `types/booking.ts`:

```typescript
export const EQUIPMENT_TYPES = [
  'Freezer',
  'Chiller',
  'Your New Type', // Add here
  // ...
];
```

### Customizing Email Templates

Edit `app/api/send-booking-emails/route.ts` to modify the email HTML.

### Changing Brand Colors

The primary brand color is `#003366` (navy blue). To change:

1. Update Tailwind config or
2. Find and replace `#003366` throughout the codebase

## Testing

### Test Stripe Payments

Use these [test card numbers](https://stripe.com/docs/testing):

- **Success:** 4242 4242 4242 4242
- **Declined:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

Use any future expiry date, any 3-digit CVC, and any postal code.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- Use **live** Stripe keys (not test keys)
- Use production SMTP credentials
- Set proper FROM email address
- Set correct SERVICE_EMAIL for notifications

## Security Considerations

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Enable Stripe webhook signature verification (optional but recommended)
- Implement rate limiting on API routes (optional but recommended)
- Use HTTPS in production (automatic with Vercel)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- Photos are uploaded but not currently attached to emails (requires storage solution like AWS S3)
- No booking management dashboard (future enhancement)
- No cancellation/rescheduling flow (future enhancement)

## Future Enhancements

- [ ] Admin dashboard for managing bookings
- [ ] SMS notifications via Twilio
- [ ] Photo storage in AWS S3/Cloudinary
- [ ] Calendar integration for scheduling
- [ ] Customer portal for tracking bookings
- [ ] Recurring maintenance contracts

## Support

For issues or questions:
- Email: support@keptcold.co.uk
- Phone: set via `NEXT_PUBLIC_CONTACT_PHONE` environment variable (defaults to 0800 123 4567)


## License

Proprietary - KeptCold Ltd. All rights reserved.

---

Built with ❄️ by KeptCold
