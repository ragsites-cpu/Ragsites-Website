'use client';

import Image from 'next/image';
import Link from 'next/link';

const CASE_IMAGES = [
  '/first-roofing.jpeg',
  '/WhatsApp Image 2026-04-11 at 01.52.50 (1).jpeg',
  '/WhatsApp Image 2026-04-11 at 01.53.20.jpeg',
  '/WhatsApp Image 2026-04-11 at 01.53.20 (1).jpeg',
  '/WhatsApp Image 2026-04-11 at 01.53.20 (2).jpeg',
];

export default function CasePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/new-logo.png" alt="Ragsites" width={32} height={32} />
            <span className="text-xl font-bold text-white">RAGSITES</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 pt-16 pb-6 md:pt-20 md:pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-[#991b1b] mb-4">
            Case Studies In Canada
          </p>
          <h1
            className="text-4xl md:text-6xl font-black uppercase leading-[1.05] text-slate-900"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.05)' }}
          >
            Real Clients. <span className="text-[#991b1b]">Real Numbers.</span>
          </h1>
        </div>
      </section>

      {/* Case Study Images */}
      <section className="px-4 pt-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {CASE_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
            >
              <Image
                src={src}
                alt={`Case study ${idx + 1}`}
                width={1600}
                height={2000}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* Outbound Agent Demo */}
      <section className="px-4 py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#991b1b] mb-3">
              Try It Yourself
            </p>
            <h2
              className="text-3xl md:text-5xl font-black uppercase text-slate-900 leading-[1.1]"
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.05)' }}
            >
              Test Our <span className="text-[#991b1b]">Roofing Lead Qualifier</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Drop your number below and our AI agent will call you in real time. This is the same
              agent that qualifies leads for the roofers above.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-black">
            <iframe
              src="https://personaplex-receptionist.fly.dev/demo"
              width="100%"
              height="900"
              frameBorder="0"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
              title="AI Outbound Agent Demo"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-500">
          &copy; 2026 Ragsites. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
