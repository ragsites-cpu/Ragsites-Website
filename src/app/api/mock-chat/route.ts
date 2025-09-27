// app/api/mock-chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message || '').slice(0, 1000);

    // Demo logic: basic canned replies. Replace with real AI endpoint later.
    let reply = `Thanks — demo received: "${message}".`;
    if (/book|appointment|schedule/i.test(message)) {
      reply = 'I can help schedule. What day/time works best? (demo)';
    } else if (/pricing|cost/i.test(message)) {
      reply = 'We offer setup + monthly plans — contact sales for a tailored quote.';
    }

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: 'Demo error: could not parse request.' }, { status: 500 });
  }
}
