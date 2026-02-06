import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SERVICE_OPTIONS } from '@/types/booking';

export async function POST(request: NextRequest) {
  try {
    const { businessDetails, faultDetails, serviceType, totalPrice, paymentIntentId } = await request.json();

    const selectedService = SERVICE_OPTIONS.find(s => s.id === serviceType);

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

    // Email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .booking-details { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #003366; }
            .footer { background-color: #f5f5f5; padding: 20px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>KEPTCOLD</h1>
            <h2>Booking Confirmation</h2>
          </div>
          <div class="content">
            <p>Dear ${businessDetails.contactName},</p>
            <p>Thank you for booking a refrigeration service call-out with KeptCold. Your booking has been confirmed and payment has been received.</p>

            <div class="booking-details">
              <h3>Booking Details</h3>
              <div class="detail-row">
                <span class="label">Service Type:</span> ${selectedService?.name}
              </div>
              <div class="detail-row">
                <span class="label">Business Name:</span> ${businessDetails.businessName}
              </div>
              <div class="detail-row">
                <span class="label">Job Address:</span> ${businessDetails.jobAddress || businessDetails.businessAddress}
              </div>
              <div class="detail-row">
                <span class="label">Equipment Type:</span> ${faultDetails.equipmentType}
              </div>
              <div class="detail-row">
                <span class="label">Fault Description:</span> ${faultDetails.faultDescription}
              </div>
              <div class="detail-row">
                <span class="label">Site Access Hours:</span> ${businessDetails.siteAccessHours}
              </div>
              <div class="detail-row">
                <span class="label">Contact Phone:</span> ${businessDetails.contactPhone}
              </div>
              <div class="detail-row">
                <span class="label">Total Paid:</span> £${totalPrice.toFixed(2)} (inc. VAT)
              </div>
              <div class="detail-row">
                <span class="label">Payment Reference:</span> ${paymentIntentId}
              </div>
            </div>

            <p>Our team will contact you shortly to schedule the engineer visit.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>

            <p>Best regards,<br>The KeptCold Team</p>
          </div>
          <div class="footer">
            <p>KeptCold - Fast & Reliable Commercial Refrigeration Repairs</p>
            <p>www.keptcold.co.uk</p>
          </div>
        </body>
      </html>
    `;

    // Email to service team
    const serviceEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #003366; color: white; padding: 20px; }
            .content { padding: 20px; }
            .booking-details { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .detail-row { margin: 10px 0; padding: 8px; border-bottom: 1px solid #ddd; }
            .label { font-weight: bold; color: #003366; display: inline-block; width: 200px; }
            .priority-badge { display: inline-block; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
            .standard { background-color: #003366; color: white; }
            .sameDay { background-color: #ff9800; color: white; }
            .emergency { background-color: #f44336; color: white; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚨 NEW SERVICE BOOKING</h1>
            <h2><span class="priority-badge ${serviceType}">${selectedService?.name.toUpperCase()}</span></h2>
          </div>
          <div class="content">
            <h3>BOOKING DETAILS</h3>

            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Service Priority:</span>
                <strong style="color: ${serviceType === 'emergency' ? '#f44336' : serviceType === 'sameDay' ? '#ff9800' : '#003366'}">
                  ${selectedService?.name}
                </strong>
              </div>
              <div class="detail-row">
                <span class="label">Business Name:</span> ${businessDetails.businessName}
              </div>
              <div class="detail-row">
                <span class="label">Business Address:</span> ${businessDetails.businessAddress}
              </div>
              <div class="detail-row">
                <span class="label">Job Address:</span> ${businessDetails.jobAddress || businessDetails.businessAddress}
              </div>
              <div class="detail-row">
                <span class="label">Contact Name:</span> ${businessDetails.contactName}
              </div>
              <div class="detail-row">
                <span class="label">Contact Phone:</span> <strong>${businessDetails.contactPhone}</strong>
              </div>
              <div class="detail-row">
                <span class="label">Contact Email:</span> ${businessDetails.contactEmail}
              </div>
              <div class="detail-row">
                <span class="label">Site Access Hours:</span> ${businessDetails.siteAccessHours}
              </div>
            </div>

            <h3>EQUIPMENT & FAULT INFORMATION</h3>
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Equipment Type:</span> <strong>${faultDetails.equipmentType}</strong>
              </div>
              <div class="detail-row">
                <span class="label">Fault Description:</span>
                <p style="margin-top: 10px; white-space: pre-wrap;">${faultDetails.faultDescription}</p>
              </div>
              ${faultDetails.photos && faultDetails.photos.length > 0 ? `
              <div class="detail-row">
                <span class="label">Photos Uploaded:</span> ${faultDetails.photos.length} photo(s)
              </div>
              ` : ''}
            </div>

            <h3>PAYMENT INFORMATION</h3>
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Call-Out Fee:</span> £${(totalPrice / 1.2).toFixed(2)}
              </div>
              <div class="detail-row">
                <span class="label">VAT (20%):</span> £${(totalPrice - (totalPrice / 1.2)).toFixed(2)}
              </div>
              <div class="detail-row">
                <span class="label">Total Paid:</span> <strong>£${totalPrice.toFixed(2)}</strong>
              </div>
              <div class="detail-row">
                <span class="label">Payment Reference:</span> ${paymentIntentId}
              </div>
              <div class="detail-row">
                <span class="label">Payment Status:</span> <strong style="color: green;">PAID ✓</strong>
              </div>
            </div>

            <p style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;">
              <strong>⚠️ ACTION REQUIRED:</strong> Please schedule a technician for this ${selectedService?.name} call-out.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"KeptCold" <noreply@keptcold.co.uk>',
      to: businessDetails.contactEmail,
      subject: 'KeptCold - Service Booking Confirmation',
      html: customerEmailHtml,
    });

    // Send email to service team
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"KeptCold Bookings" <bookings@keptcold.co.uk>',
      to: process.env.SERVICE_EMAIL || 'service@keptcold.co.uk',
      subject: `🚨 NEW ${selectedService?.name.toUpperCase()} Booking - ${businessDetails.businessName}`,
      html: serviceEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
