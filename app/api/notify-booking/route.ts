import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';

export async function POST(request: NextRequest) {
  const payload = await request.json();

  console.log('[notify-booking] fields:', Object.keys(payload));

  waitUntil(
    fetch('https://keptcoldbackend-production.up.railway.app/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const text = await res.text();
      console.log('[notify-booking] railway:', res.status, text);
    }).catch((err) => console.error('[notify-booking] error:', err))
  );

  return NextResponse.json({ success: true });
}
