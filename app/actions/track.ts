'use server';

import { headers } from 'next/headers';
import { Redis } from '@upstash/redis';

interface VisitData {
  ip: string;
  timestamp: string;
  page: string;
  location: {
    city: string;
    country: string;
    region: string;
    latitude: string;
    longitude: string;
    timezone: string;
  };
  device: {
    browser: string;
    os: string;
    type: string;
  };
  userAgent: string;
}

function getRedis(): Redis {
  return new Redis({
    url: 'https://intimate-seasnail-78625.upstash.io',
    token: 'gQAAAAAAATMhAAIncDI2NGE5YWRiZmE3NmU0M2U0ODg0OWM4NDBkZTFiNjQ3ZnAyNzg2MjU',
  });
}

function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let os = 'Unknown';
  let type = 'Desktop';

  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh') || ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';

  if (ua.includes('Mobile') || ua.includes('iPhone')) type = 'Mobile';
  else if (ua.includes('iPad') || ua.includes('Tablet')) type = 'Tablet';

  return { browser, os, type };
}

export async function trackPageVisit(page: string) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const visit: VisitData = {
      ip,
      timestamp: new Date().toISOString(),
      page,
      location: {
        city: decodeURIComponent(headersList.get('x-vercel-ip-city') || 'unknown'),
        country: headersList.get('x-vercel-ip-country') || 'unknown',
        region: headersList.get('x-vercel-ip-country-region') || 'unknown',
        latitude: headersList.get('x-vercel-ip-latitude') || '',
        longitude: headersList.get('x-vercel-ip-longitude') || '',
        timezone: headersList.get('x-vercel-ip-timezone') || 'unknown',
      },
      device: parseUserAgent(userAgent),
      userAgent,
    };

    const redis = getRedis();
    await redis.lpush('page_visits', JSON.stringify(visit));

    return { success: true };
  } catch (error) {
    console.error('[Visit Tracker] Error:', error);
    return { success: false };
  }
}
