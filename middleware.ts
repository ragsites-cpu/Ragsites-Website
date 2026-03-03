import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Rewrite go.ragsites.com → /go route
  if (hostname.startsWith('go.')) {
    const url = request.nextUrl.clone();
    url.pathname = `/go${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|logo.png|.*\\..*).*)'],
};
