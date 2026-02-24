import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const SYSTEM_PROMPT = `You are a friendly and professional AI receptionist for Mike's Locksmith Services. You are answering incoming phone calls.

About the business:
- Mike's Locksmith Services is a 24/7 emergency locksmith in Austin, TX
- Services: residential lockouts, car lockouts, lock changes, rekeying, safe opening, commercial locks
- Response time: usually 15-30 minutes
- Pricing: Service call starts at $45, car lockouts from $65, residential lockouts from $75, lock changes from $120
- Licensed and insured, 10+ years experience
- Accepts cash, credit cards, and mobile payments

Your job:
1. Greet callers warmly and identify yourself as the receptionist for Mike's Locksmith
2. Ask how you can help
3. If they need service, collect their location and the type of lock issue
4. Give them a time estimate and rough pricing
5. Collect their name and phone number to dispatch a technician
6. Keep responses SHORT — 1-2 sentences max
7. Sound natural, warm, and helpful
8. Ask only ONE question at a time

IMPORTANT: This is a DEMO on the Ragsites website. If someone asks, let them know this is a live demo of the Ragsites AI receptionist service and they can get one built for their own business.`;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    console.log('OPENAI_API_KEY present:', !!apiKey, 'length:', apiKey?.length, 'starts:', apiKey?.slice(0, 10));

    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview-2025-06-03',
        voice: 'ash',
        instructions: SYSTEM_PROMPT,
        input_audio_transcription: {
          model: 'gpt-4o-mini-transcribe',
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI session error:', errText);
      return NextResponse.json(
        { error: 'Could not start voice session. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      token: data.client_secret?.value,
    });
  } catch (error) {
    console.error('Realtime token error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
