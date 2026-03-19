'use server';

import crypto from 'crypto';
import { headers } from 'next/headers';

const META_PIXEL_ID = '913942544750622';
const META_ACCESS_TOKEN = 'EAAP4qriDd3EBQZCFBymvNkkTcXC2w1H0kjgvL8D4S1XNLJZByeSwLSK5eIJdbNnxRZB40O4CDBM647e0REhw1ivj3fOHUY75KAZBg76Lxa6zYE3R4jC9wJj2xZCyyiHolKRq0ZACFqE69ow4efnyYMzyDPI4r2sIX0NphUSeEJdMiExLu8o2Q0zut530VBJAZDZD';

function hashData(data: string | undefined): string | undefined {
    if (!data) return undefined;
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

export async function sendMetaCAPIEvent(
    eventName: 'Lead' | 'Schedule',
    userData: { email?: string; phone?: string } = {},
    customData: Record<string, any> = {}
) {
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
                },
            ],
        };

        const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log(`[Meta CAPI] Event: ${eventName} | Status: ${response.status}`, result);
        return result;
    } catch (error) {
        console.error('[Meta CAPI] Error:', error);
        return { error: 'Failed' };
    }
}
