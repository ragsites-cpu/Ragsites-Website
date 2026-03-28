'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outfit, Rubik } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-outfit' });
const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-rubik' });

export default function CustomersPage() {
  return (
    <main className={`min-h-screen bg-black text-white ${outfit.variable} ${rubik.variable}`} style={{ fontFamily: 'var(--font-rubik), sans-serif' }}>
      <Navbar />

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold tracking-wide uppercase mb-4 text-center" style={{ color: '#40c9ff' }}>
            Proven Impact, Real Conversations
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            Customers
          </h1>
          <div className="flex items-center justify-center -space-x-3 mb-4">
            {[
              'https://randomuser.me/api/portraits/men/32.jpg',
              'https://randomuser.me/api/portraits/men/52.jpg',
              'https://randomuser.me/api/portraits/men/46.jpg',
              'https://randomuser.me/api/portraits/men/67.jpg',
              'https://randomuser.me/api/portraits/men/22.jpg',
            ].map((src, i) => (
              <div key={i} className="w-11 h-11 rounded-full border-[3px] border-black overflow-hidden">
                <Image src={src} alt={`Customer ${i + 1}`} width={44} height={44} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-11 h-11 rounded-full border-[3px] border-black bg-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-white">+100</span>
            </div>
          </div>
          <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto mb-16">
            Trusted by 100+ roofing contractors across the US and Canada.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
