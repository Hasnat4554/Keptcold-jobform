import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    const railwayRes = await fetch(
      'https://keptcoldbackend-production.up.railway.app/webhook',
      {
        method: 'POST',
        body,
      }
    );

    const data = await railwayRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: railwayRes.status });
  } catch (err) {
    console.error('[notify-booking] error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
