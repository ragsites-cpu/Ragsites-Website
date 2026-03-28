'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold tracking-wide uppercase mb-4 text-center" style={{ color: '#40c9ff' }}>
            Proven Impact, Real Conversations
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            Customers
          </h1>
          <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto mb-16">
            Discover how roofing contractors use Ragsites&apos; lead generation and qualification system to fill their calendars, pre-qualify leads, and close more deals.
          </p>
        </div>
      </div>

      <footer className="py-12 px-4 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/new-logo.png" alt="Ragsites" width={24} height={24} />
              <span className="font-bold text-white">RAGSITES</span>
            </div>
            <p className="text-sm text-slate-500">
              Built by Ragsites. &copy; 2026
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
