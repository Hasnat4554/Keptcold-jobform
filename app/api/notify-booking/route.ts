import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';

export async function POST(request: NextRequest) {
  const body = await request.formData();

  const form = new FormData();
  body.forEach((value, key) => {
    form.append(key, value);
  });

  console.log('[notify-booking] fields:', [...body.keys()]);

  waitUntil(
    fetch('https://keptcoldbackend-production.up.railway.app/webhook', {
      method: 'POST',
      body: form,
    }).then(async (res) => {
      const text = await res.text();
      console.log('[notify-booking] railway status:', res.status, text);
    }).catch((err) => console.error('[notify-booking] railway error:', err))
  );

  return NextResponse.json({ success: true });
}
