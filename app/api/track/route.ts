import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzZ1-UYal3Am6kAB9jfTVvZ1F0dpKBsD9A2-b1RBN4Cwb1vo71USKkmBb_to1RTpwDYzA/exec';

function getRedis(): Redis {
  return new Redis({
    url: 'https://intimate-seasnail-78625.upstash.io',
    token: 'gQAAAAAAATMhAAIncDI2NGE5YWRiZmE3NmU0M2U0ODg0OWM4NDBkZTFiNjQ3ZnAyNzg2MjU',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { visitId, timeOnPageSeconds, maxScrollPercent } = await request.json();

    if (!visitId) {
      return NextResponse.json({ error: 'Missing visitId' }, { status: 400 });
    }

    const redis = getRedis();
    const existing = await redis.get(`visit:${visitId}`);

    if (existing) {
      const visit = typeof existing === 'string' ? JSON.parse(existing) : existing;
      visit.timeOnPageSeconds = timeOnPageSeconds;
      visit.maxScrollPercent = maxScrollPercent;
      await redis.set(`visit:${visitId}`, JSON.stringify(visit));

      // Push complete row to Google Sheets
      fetch(SHEETS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visit),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
