import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SERVICE_OPTIONS } from '@/types/booking';

// Generate unique booking reference
function generateBookingReference(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `KC-${dateStr}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const { businessDetails, faultDetails, serviceType, totalPrice, paymentIntentId } = await request.json();

    const selectedService = SERVICE_OPTIONS.find(s => s.id === serviceType);
    const bookingReference = generateBookingReference();
    const submittedDateTime = new Date().toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Create a transporter (configure with your SMTP settings)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to customer - Updated template
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #003366; color: white; padding: 20px; }
            .content { padding: 20px; max-width: 600px; margin: 0 auto; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; font-size: 16px; color: #003366; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #003366; padding-bottom: 5px; }
            .detail-row { margin: 8px 0; }
            .label { font-weight: bold; color: #003366; display: inline-block; width: 160px; }
            .value { color: #333; }
            .highlight-box { background-color: #f5f5f5; padding: 15px; border-left: 4px solid #003366; margin: 15px 0; }
            .footer { background-color: #f5f5f5; padding: 20px; text-align: center; margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>KEPTCOLD</h1>
            <p>Commercial Refrigeration Specialists</p>
          </div>
          <div class="content">
            <p>Hi ${businessDetails.contactName},</p>
            <p>Thank you for choosing Kept Cold.</p>
            <p>We've received your booking and payment successfully. Our team will now review the details and schedule your visit. If we need any additional information, we'll contact you.</p>

            <div class="section">
              <div class="section-title">Booking Summary</div>
              <div class="detail-row">
                <span class="label">Reference:</span>
                <span class="value"><strong>${bookingReference}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Business name:</span>
                <span class="value">${businessDetails.businessName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Service address:</span>
                <span class="value">${businessDetails.jobAddress || businessDetails.businessAddress}</span>
              </div>
              <div class="detail-row">
                <span class="label">Contact name:</span>
                <span class="value">${businessDetails.contactName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Contact number:</span>
                <span class="value">${businessDetails.contactPhone}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${businessDetails.contactEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Equipment type:</span>
                <span class="value">${faultDetails.equipmentType}</span>
              </div>
              <div class="detail-row">
                <span class="label">Issue description:</span>
                <span class="value">${faultDetails.faultDescription}</span>
              </div>
              <div class="detail-row">
                <span class="label">Service type:</span>
                <span class="value">${selectedService?.name}</span>
              </div>
            </div>

            <div class="highlight-box">
              <div class="section-title" style="margin-top: 0;">What your call-out includes</div>
              <p>Your call-out includes up to 1 hour labour for diagnosis and repair where possible.</p>
              <p>If parts or additional labour are required, we will send a quotation for your approval before proceeding.</p>
            </div>

            <p>If you need to update your booking, please reply to this email or contact us at service@keptcold.co.uk.</p>

            <p>Kind regards,<br><strong>Kept Cold Team</strong><br>Commercial Refrigeration Specialists<br>service@keptcold.co.uk<br>www.keptcold.co.uk</p>
          </div>
          <div class="footer">
            <p>KeptCold - Fast & Reliable Commercial Refrigeration Repairs</p>
          </div>
        </body>
      </html>
    `;

    // Email to service team - Updated template
    const serviceEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #003366; color: white; padding: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; max-width: 700px; margin: 0 auto; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; font-size: 14px; color: white; background-color: #003366; padding: 10px; margin: 15px 0 10px 0; }
            .detail-row { margin: 8px 0; padding: 5px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #003366; display: inline-block; width: 180px; }
            .value { color: #333; }
            .paid-badge { background-color: #4CAF50; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
            .footer { background-color: #f5f5f5; padding: 15px; text-align: center; margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
            .alert { background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NEW SERVICE BOOKING RECEIVED (PAID)</h1>
          </div>
          <div class="content">
            
            <div class="alert">
              ⚠️ New booking received - Action required to schedule visit
            </div>

            <div class="section">
              <div class="section-title">BOOKING REFERENCE & TIMING</div>
              <div class="detail-row">
                <span class="label">Booking Reference:</span>
                <span class="value"><strong>${bookingReference}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Date/Time Submitted:</span>
                <span class="value">${submittedDateTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Service Type:</span>
                <span class="value"><strong>${selectedService?.name}</strong></span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">CUSTOMER / SITE DETAILS</div>
              <div class="detail-row">
                <span class="label">Business Name:</span>
                <span class="value">${businessDetails.businessName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Contact Name:</span>
                <span class="value">${businessDetails.contactName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span class="value"><strong>${businessDetails.contactPhone}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${businessDetails.contactEmail}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">SERVICE ADDRESS</div>
              <div class="detail-row">
                <span class="value">${businessDetails.jobAddress || businessDetails.businessAddress}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">JOB DETAILS</div>
              <div class="detail-row">
                <span class="label">Service Type:</span>
                <span class="value">${selectedService?.name}</span>
              </div>
              <div class="detail-row">
                <span class="label">Equipment Type:</span>
                <span class="value"><strong>${faultDetails.equipmentType}</strong></span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">ISSUE DESCRIPTION</div>
              <div class="detail-row">
                <span class="value" style="white-space: pre-wrap;">${faultDetails.faultDescription}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">ACCESS / NOTES</div>
              <div class="detail-row">
                <span class="value">${businessDetails.siteAccessHours}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">PAYMENT</div>
              <div class="detail-row">
                <span class="label">Payment Status:</span>
                <span class="value"><span class="paid-badge">PAID</span></span>
              </div>
              <div class="detail-row">
                <span class="label">Amount Paid:</span>
                <span class="value">£${totalPrice.toFixed(2)}</span>
              </div>
              <div class="detail-row">
                <span class="label">Payment Method:</span>
                <span class="value">Stripe</span>
              </div>
              <div class="detail-row">
                <span class="label">Stripe Payment ID:</span>
                <span class="value"><code>${paymentIntentId}</code></span>
              </div>
            </div>

          </div>
          <div class="footer">
            <p>KeptCold - Fast & Reliable Commercial Refrigeration Repairs</p>
          </div>
        </body>
      </html>
    `;

    // Send email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"KeptCold" <noreply@keptcold.co.uk>',
      to: businessDetails.contactEmail,
      subject: 'Your Kept Cold Booking Reference: ' + bookingReference,
      html: customerEmailHtml,
    });

    // Send email to service team
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"KeptCold Bookings" <bookings@keptcold.co.uk>',
      to: process.env.SERVICE_EMAIL || 'service@keptcold.co.uk',
      subject: `NEW BOOKING (PAID) – ${businessDetails.businessName} – Ref ${bookingReference}`,
      html: serviceEmailHtml,
    });

    return NextResponse.json({ 
      success: true,
      bookingReference: bookingReference,
      submittedDateTime: submittedDateTime
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
