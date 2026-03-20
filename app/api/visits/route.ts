import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

function getRedis(): Redis {
  return new Redis({
    url: 'https://intimate-seasnail-78625.upstash.io',
    token: 'gQAAAAAAATMhAAIncDI2NGE5YWRiZmE3NmU0M2U0ODg0OWM4NDBkZTFiNjQ3ZnAyNzg2MjU',
  });
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');

  if (key !== 'ragsites-visits-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const redis = getRedis();

  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '100');
  const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0');

  try {
    const [visits, total] = await Promise.all([
      redis.lrange('page_visits', offset, offset + limit - 1),
      redis.llen('page_visits'),
    ]);

    return NextResponse.json({
      visits: visits.map((v) => (typeof v === 'string' ? JSON.parse(v) : v)),
      total,
      limit,
      offset,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 });
  }
}
