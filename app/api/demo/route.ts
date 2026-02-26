import { NextRequest, NextResponse } from 'next/server';
import Firecrawl from '@mendable/firecrawl-js';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per window per IP

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

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap) {
    const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (recent.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, recent);
  }
}, 5 * 60 * 1000);

let firecrawl: Firecrawl;

function getFirecrawl() {
  if (!firecrawl) {
    firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY!.trim() });
  }
  return firecrawl;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Scrape the website
    const siteContent = await scrapeWebsite(url);

    if (!siteContent) {
      return NextResponse.json(
        { error: 'Could not access that website. Please check the URL and try again.' },
        { status: 400 }
      );
    }

    const businessName = extractBusinessName(siteContent, url);

    // 2. Build a custom system prompt from the scraped content
    const systemPrompt = buildSystemPrompt(businessName, siteContent);

    // 3. Get an ephemeral token from OpenAI Realtime API
    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY?.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-realtime-1.5',
        voice: 'marin',
        instructions: systemPrompt,
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
            description: 'End the phone call after saying goodbye. Use this when the caller asks to hang up/end the call, or when the conversation is complete.',
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
      businessName,
    });
  } catch (error) {
    console.error('Demo creation error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(businessName: string, siteContent: string): string {
  return `You are a friendly and professional AI receptionist for ${businessName}. You are answering incoming phone calls for this business.

Here is information about the business scraped from their website:
---
${siteContent}
---

Based on the above information, you should:
1. Greet callers warmly and identify yourself as the AI receptionist for ${businessName}
2. Answer questions about the business's services, hours, location, and other details based on what you know from the website
3. If asked something you don't know, say you'd be happy to have someone from the team follow up with that information
4. Collect the caller's name and phone number if they're interested in scheduling or learning more
5. Keep responses concise and conversational - 1-2 sentences per response
6. Be helpful, natural, and professional

IMPORTANT RULES:
- This is a DEMO call. If the caller asks, let them know this is a demo of the Ragsites AI receptionist service
- Ask only ONE question at a time
- Keep each response SHORT - 1-2 sentences max
- Never use technical jargon or mention AI/automation unless asked
- Sound natural and human-like
- After asking a question, STOP and wait for the caller's next reply before speaking again

CALL ENDING: You MUST call the end_call function to hang up in any of these situations:
1. The caller explicitly asks to end the call, hang up, or says they are done
2. You have collected all needed information, confirmed the details back, and the caller has acknowledged — say a brief goodbye and immediately call end_call
3. The conversation has clearly concluded with mutual goodbyes or the caller says "yes", "that's correct", "sounds good", etc. after your final confirmation

Always say one complete goodbye sentence first, then immediately call end_call. Do NOT continue the conversation after confirming all details — wrap up and hang up.`;
}

async function scrapeWebsite(url: string): Promise<string | null> {
  try {
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await getFirecrawl().scrape(normalizedUrl, {
      formats: ['markdown'],
    });

    if (!result.markdown) return null;

    const markdown = result.markdown;
    const title = result.metadata?.title || '';
    const description = result.metadata?.description || '';

    const header = [
      title && `Business Name/Title: ${title}`,
      description && `Description: ${description}`,
    ].filter(Boolean).join('\n');

    // Limit content length to avoid huge prompts
    const truncatedContent = markdown.substring(0, 4000);

    return `${header}\n\nWebsite Content:\n${truncatedContent}`;
  } catch {
    return null;
  }
}

function extractBusinessName(content: string, url: string): string {
  const titleMatch = content.match(/Business Name\/Title: (.+)/);
  if (titleMatch) {
    const raw = titleMatch[1].trim();
    // Titles often follow "Page Name - Business Name" or "Business Name | Tagline"
    const parts = raw.split(/\s*[-|–—]\s*/);
    // Filter out generic page names
    const generic = /^(home|welcome|about|contact|services)$/i;
    const meaningful = parts.filter(p => p.trim() && !generic.test(p.trim()));
    // Prefer the first meaningful part, or fallback to the longest part
    const name = meaningful.length > 0
      ? meaningful[0].trim()
      : parts.sort((a, b) => b.length - a.length)[0]?.trim();
    if (name) return name;
  }
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
  } catch {
    return url;
  }
}
