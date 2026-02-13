import { NextRequest, NextResponse } from 'next/server';
import Firecrawl from '@mendable/firecrawl-js';

const VAPI_API_KEY = process.env.VAPI_API_KEY!;
const VAPI_DEMO_PHONE_ID = process.env.VAPI_DEMO_PHONE_ID!;
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY!;

const firecrawl = new Firecrawl({ apiKey: FIRECRAWL_API_KEY });

export async function POST(req: NextRequest) {
  try {
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

    // 2. Create a VAPI assistant with the scraped content
    const assistant = await createVapiAssistant(url, siteContent);

    // 3. Assign the assistant to the demo phone number
    await assignAssistantToPhone(assistant.id);

    return NextResponse.json({
      success: true,
      phoneNumber: '+1 (628) 253-2869',
      businessName: extractBusinessName(siteContent, url),
    });
  } catch (error) {
    console.error('Demo creation error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

async function scrapeWebsite(url: string): Promise<string | null> {
  try {
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await firecrawl.scrapeUrl(normalizedUrl, {
      formats: ['markdown'],
    });

    if (!result.success || !result.markdown) return null;

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
    // Clean up common title suffixes
    return titleMatch[1]
      .replace(/\s*[-|–—]\s*.+$/, '') // Remove " - Tagline" or " | Tagline"
      .replace(/\s*Home\s*$/i, '')
      .trim() || new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
  }
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
  } catch {
    return url;
  }
}

async function createVapiAssistant(url: string, siteContent: string) {
  const businessName = extractBusinessName(siteContent, url);

  const systemPrompt = `You are a friendly and professional AI receptionist for ${businessName}. You are answering incoming phone calls for this business.

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
- Sound natural and human-like`;

  const response = await fetch('https://api.vapi.ai/assistant', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `Demo - ${businessName}`,
      firstMessage: `Hi, thanks for calling ${businessName}! How can I help you today?`,
      model: {
        provider: 'openai',
        model: 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 150,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
        ],
      },
      voice: {
        provider: '11labs',
        voiceId: 'BHr135B5EUBtaWheVj8S',
        model: 'eleven_turbo_v2_5',
        optimizeStreamingLatency: 4,
        stability: 0.5,
        similarityBoost: 0.75,
      },
      transcriber: {
        provider: 'deepgram',
        model: 'nova-3',
        language: 'en',
        endpointing: 100,
      },
      maxDurationSeconds: 300, // 5 min max for demos
      silenceTimeoutSeconds: 30,
      backgroundSound: 'office',
      backgroundDenoisingEnabled: true,
      startSpeakingPlan: {
        waitSeconds: 0.2,
        smartEndpointingEnabled: true,
        transcriptionEndpointingPlan: {
          onPunctuationSeconds: 0.05,
          onNoPunctuationSeconds: 0.8,
          onNumberSeconds: 0.3,
        },
      },
      stopSpeakingPlan: {
        numWords: 1,
        voiceSeconds: 0.2,
        backoffSeconds: 1,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`VAPI assistant creation failed: ${errorText}`);
  }

  return response.json();
}

async function assignAssistantToPhone(assistantId: string) {
  const response = await fetch(`https://api.vapi.ai/phone-number/${VAPI_DEMO_PHONE_ID}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assistantId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`VAPI phone assignment failed: ${errorText}`);
  }

  return response.json();
}
