'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32">
        <Pricing />
      </div>

      <footer className="py-12 px-4 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Ragsites" width={24} height={24} />
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
