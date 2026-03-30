import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  console.log('[notify-booking] fields:', Object.keys(payload));

  // convert JSON to FormData — Railway uses multer (expects multipart/form-data)
  const form = new FormData();
  Object.entries(payload).forEach(([key, val]) => {
    if (key === 'attachments') {
      form.append(key, JSON.stringify(val ?? []));
    } else {
      form.append(key, String(val ?? ''));
    }
  });

  waitUntil(
    fetch('https://keptcoldbackend-production.up.railway.app/webhook', {
      method: 'POST',
      body: form,
    }).then(async (res) => {
      const text = await res.text();
      console.log('[notify-booking] railway:', res.status, text);
    }).catch((err) => console.error('[notify-booking] error:', err))
  );

  return NextResponse.json({ success: true });
}
