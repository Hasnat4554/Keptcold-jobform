import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';

export async function POST(request: NextRequest) {
  const body = await request.formData();

  // rebuild FormData to forward to Railway
  const form = new FormData();
  body.forEach((value, key) => {
    form.append(key, value);
  });

  // respond immediately — don't make client wait
  waitUntil(
    fetch('https://keptcoldbackend-production.up.railway.app/webhook', {
      method: 'POST',
      body: form,
    }).catch((err) => console.error('[notify-booking] railway error:', err))
  );

  return NextResponse.json({ success: true });
}
