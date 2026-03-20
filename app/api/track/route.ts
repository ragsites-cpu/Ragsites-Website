import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const SHEETS_WEBHOOKS: Record<string, string> = {
  '/': 'https://script.google.com/macros/s/AKfycbxZN7eCv3Ln851lfcBI5nT-KVcAGlPavH3Lp70viqHUZ1gzF4maVOjC_FeN9luUsIrf/exec',
  '/go': 'https://script.google.com/macros/s/AKfycbw-3vJKwiuYaOXon6Brs0vzmlXY7oH3iFkFituZCCiQYBj17AzYsKjZPzGkoxAAwlH_Kg/exec',
  '/thank-you': 'https://script.google.com/macros/s/AKfycbzBK8fADs5cSBXngq9bXEUabWVLvBvN-BzNHpWrM92NX0zCZ0DZKkuN2RhB3RVztQMZ_w/exec',
};

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
      const webhook = SHEETS_WEBHOOKS[visit.page];
      if (!webhook) return NextResponse.json({ success: true });

      const sheetsRes = await fetch(webhook, {
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
