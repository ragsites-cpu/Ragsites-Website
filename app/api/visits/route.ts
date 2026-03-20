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
    const ids = await redis.lrange('visit_ids', offset, offset + limit - 1);
    const total = await redis.llen('visit_ids');

    const visits = await Promise.all(
      ids.map(async (id) => {
        const data = await redis.get(`visit:${id}`);
        return typeof data === 'string' ? JSON.parse(data) : data;
      })
    );

    return NextResponse.json({
      visits: visits.filter(Boolean),
      total,
      limit,
      offset,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 });
  }
}
