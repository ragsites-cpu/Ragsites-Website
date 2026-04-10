'use client';

import { ArrowRight, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CASE_IMAGES = [
  '/WhatsApp Image 2026-04-11 at 01.52.50.jpeg',
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
          <Link
            href="/quiz"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#991b1b] text-white text-sm font-bold hover:bg-[#7f1616] transition-colors"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 py-20 md:py-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-[#991b1b] mb-4">
            Case Studies
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
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-12">
          {CASE_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
            >
              <Image
                src={src}
                alt={`Case study ${idx + 1}`}
                width={1200}
                height={1600}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 border-t border-slate-100 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-black uppercase text-slate-900 mb-6 leading-[1.1]"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.05)' }}
          >
            Want These <span className="text-[#991b1b]">Numbers</span>
            <br />
            For Your Business?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We only work with one roofer per service area. Let&apos;s see if yours is still open.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#991b1b] text-white text-lg font-bold hover:bg-[#7f1616] hover:scale-105 transition-all shadow-[0_0_30px_rgba(153,27,27,0.3)]"
          >
            <Phone className="w-5 h-5" />
            Book A Strategy Call
          </Link>
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
