import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbw-3vJKwiuYaOXon6Brs0vzmlXY7oH3iFkFituZCCiQYBj17AzYsKjZPzGkoxAAwlH_Kg/exec';

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
      // Apps Script returns 302 which changes POST→GET, so follow redirect manually
      const sheetsRes = await fetch(SHEETS_WEBHOOK, {
        method: 'POST',
        body: JSON.stringify(visit),
        redirect: 'manual',
      });
      if (sheetsRes.status >= 300 && sheetsRes.status < 400) {
        const location = sheetsRes.headers.get('location');
        if (location) {
          await fetch(location, { method: 'POST', body: JSON.stringify(visit) });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
