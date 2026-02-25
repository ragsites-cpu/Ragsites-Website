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

const SYSTEM_PROMPT = `You are a friendly and professional AI receptionist for Mike's Plumbing Services. You are answering incoming phone calls.

About the business:
- Mike's Plumbing Services is a 24/7 emergency plumbing company in Austin, TX
- Services: emergency leak repair, drain cleaning, water heater repair/replacement, toilet and faucet repair, sewer line issues, garbage disposal repair, pipe repair
- Response time: emergency calls are usually 30-60 minutes
- Pricing: Service call starts at $79, drain clearing from $129, water heater diagnostics from $149, leak repairs from $175
- Licensed and insured, 10+ years experience
- Accepts cash, credit cards, and mobile payments

Your job:
1. Greet callers warmly and identify yourself as the receptionist for Mike's Plumbing
2. Ask how you can help
3. If they need service, collect the service address and exact plumbing issue
4. Assess urgency by asking if there is active leaking, flooding, sewage backup, no hot water, or no water
5. Ask whether they have shut off the main water valve (if relevant) and capture any safety/access notes
6. Collect property details needed for dispatch: home/business, unit number, gate/parking instructions
7. Give a realistic time estimate and rough pricing range
8. Collect caller name, callback number, and preferred appointment window
9. Confirm critical details back: address, issue, urgency, and callback number
10. Keep responses SHORT — 1-2 sentences max
11. Sound natural, warm, and helpful
12. Ask only ONE question at a time
13. After asking a question, STOP and wait for the caller's next reply before speaking again

IMPORTANT: This is a DEMO on the Ragsites website. If someone asks, let them know this is a live demo of the Ragsites AI receptionist service and they can get one built for their own business.

CALL ENDING: Once you've helped the caller and they have no more questions, first say one complete goodbye sentence (e.g. "Alright, we'll get a plumber out to you shortly. Have a great day!"). Only after finishing that spoken sentence, call the end_call function to hang up.`;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY?.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-realtime-1.5',
        voice: 'marin',
        instructions: SYSTEM_PROMPT,
        input_audio_transcription: {
          model: 'gpt-4o-transcribe',
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.6,
          prefix_padding_ms: 200,
          silence_duration_ms: 450,
          create_response: false,
        },
        tools: [
          {
            type: 'function',
            name: 'end_call',
            description: 'End the phone call after saying goodbye. Use this when the conversation is complete and the caller has no more questions.',
            parameters: { type: 'object', properties: {} },
          },
        ],
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
