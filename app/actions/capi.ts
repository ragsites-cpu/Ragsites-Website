'use server';

import crypto from 'crypto';
import { headers } from 'next/headers';

/* ─── Pixel Configs (one per A/B landing page) ─── */

const PIXEL_CONFIGS = {
    go: {
        pixelId: '1458916382371186',
        accessToken: 'EAAP4qriDd3EBRBfRDGC6GIPWvT67e3wrvJZC15fIkdqrSfUKUO40OAqpEnUb4h4nIZArngKyKE1OzyED3xfGcWCqt7lW8LQdcYGDzjZBY7tWEdZBYrZBEZA5FJ9jrSOkZCXjA3l7OrQPzzkSAtDu70eqY3xSZBzZAlvGsOFv56QSO98e8ZCeMwgd9CGZCf16ScRDAZDZD',
        testEventCode: 'TEST47250',
    },
    go2: {
        pixelId: '827605470377523',
        accessToken: 'EAAP4qriDd3EBRBfRDGC6GIPWvT67e3wrvJZC15fIkdqrSfUKUO40OAqpEnUb4h4nIZArngKyKE1OzyED3xfGcWCqt7lW8LQdcYGDzjZBY7tWEdZBYrZBEZA5FJ9jrSOkZCXjA3l7OrQPzzkSAtDu70eqY3xSZBzZAlvGsOFv56QSO98e8ZCeMwgd9CGZCf16ScRDAZDZD',
        testEventCode: 'TEST97685',
    },
} as const;

type PageKey = keyof typeof PIXEL_CONFIGS;

function hashData(data: string | undefined): string | undefined {
    if (!data) return undefined;
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

export async function sendMetaCAPIEvent(
    page: PageKey,
    eventName: 'Lead' | 'Schedule',
    userData: { email?: string; phone?: string } = {},
    customData: Record<string, any> = {},
    eventId?: string
) {
    const config = PIXEL_CONFIGS[page];

    try {
        const headersList = await headers();
        const sourceIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '';
        const userAgent = headersList.get('user-agent') || '';

        // Strip non-digits from phone number before hashing per Meta requirements
        const phoneClean = userData.phone ? userData.phone.replace(/[^0-9]/g, '') : undefined;

        const hashedEmail = hashData(userData.email);
        const hashedPhone = hashData(phoneClean);

        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: 'website',
                    user_data: {
                        client_ip_address: sourceIp.split(',')[0].trim() || undefined,
                        client_user_agent: userAgent || undefined,
                        ...(hashedEmail && { em: [hashedEmail] }),
                        ...(hashedPhone && { ph: [hashedPhone] }),
                    },
                    custom_data: customData,
                    ...(eventId && { event_id: eventId }),
                },
            ],
            ...('testEventCode' in config && { test_event_code: config.testEventCode }),
        };

        const url = `https://graph.facebook.com/v19.0/${config.pixelId}/events?access_token=${config.accessToken}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log(`[Meta CAPI][${page}] Event: ${eventName} | Pixel: ${config.pixelId} | Status: ${response.status}`, result);
        return result;
    } catch (error) {
        console.error(`[Meta CAPI][${page}] Error:`, error);
        return { error: 'Failed' };
    }
}
