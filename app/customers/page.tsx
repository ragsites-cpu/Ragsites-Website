'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outfit, Rubik } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-outfit' });
const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-rubik' });

const TESTIMONIALS = [
  {
    id: 'OhDg8ahNr01gbToDYtYvrurAPGVZKdGxChldKuqz5t5E',
    quote: "I'll admit I was a skeptic, but these guys delivered. Their funnel and ad spend management is so effective that we doubled our weekly jobs after just 30 days of working together.",
    name: 'Mitch Park, Ironwood Roofing',
    stat: '2x',
    statLabel: 'Booking Rate',
  },
  {
    id: '21FnKkcSO35SRsOPw3CvxBmBL3HfSh6hPvxfPUIt1pE',
    quote: "Before Ragsites, we looked like a 'chuck in a truck.' Now, their AI handles every lead instantly with a professional callback. We're landing 30 more roof replacements every single month.",
    name: 'Bill Burrows, Safe Haven Roofing',
    stat: '30+',
    statLabel: 'Extra Sales/Mo',
  },
  {
    id: 'jsOjDYJRqSEfTDmcXY31mj68PIMjXXX1kQg1G02evppU',
    quote: 'Their AI qualifier sounds like a real person and understands the psychology of the sale. Our job volume more than doubled in five weeks because the system vets and calls leads immediately.',
    name: 'Vernon Lamb, Blackwood Roofing',
    stat: '2x',
    statLabel: 'Job Volume',
  },
  {
    id: 'eEuKPe3XUUicrWrV8Oj259ca7xyTgyNlOeDOIfX01R02o',
    quote: 'I was stuck on ladders missing leads. This system handled 120 calls this month and booked 50 jobs I definitely would have lost. My booking rate literally doubled from 22% to 44%.',
    name: 'David Hartmann, Peak Roofing',
    stat: '44%',
    statLabel: 'Booking Rate',
  },
  {
    id: 'vHFqs02Mc6rOksLZ02nmKPgdl7WEwKZO00YiE01Vbk0001Vf8',
    quote: "I've tried every lead service out there, but RagSites is a total game-changer. Their AI calls every lead within a minute and books them straight onto my calendar. My booked appointments jumped from 28% to 47% — those are the real numbers. I'm finally done chasing cold leads!",
    name: 'Jake Garner, Sole Operator',
    stat: '47%',
    statLabel: 'Booking Rate',
  },
  {
    id: '11mLPLDOWTi02LW2PsM00TEENCkkTFf7H1QDqwPUye9DM',
    quote: "I used to spend my evenings returning calls and trying to book estimates, it was killing my family time. Since we plugged in the RagSites AI lead qualifier, it's like I got my life back. The system has already handled over 100 leads for us and has booked them more efficiently than I ever could! If you want to stop being a slave to your phone and start enjoying your business again, you need this system.",
    name: 'Kevin Allen, Point Roofing',
    stat: '100+',
    statLabel: 'Leads Handled',
  },
  {
    id: 'cMqAuUp2KtjGB6iGF9RFR62JkRRLWBVplKAr01p8L2Js',
    quote: "I've been in this business for 20 years and was skeptical about AI, but RagSites changed everything. Their system is like a 24/7 secretary that never sleeps—it grabs leads, handles questions, and books them right away. We're pulling in 20 more jobs a month now, and I'm finally off the phone by 9 PM!",
    name: 'Mike Finnery, Paramount Roofing',
    stat: '+20',
    statLabel: 'Jobs/Month',
  },
];

const CARD_COLORS = [
  'from-[#0a1e3d] to-[#122d5a] border-blue-400/40',
  'from-[#0c2244] to-[#153366] border-blue-400/50',
  'from-[#0e264b] to-[#183a72] border-blue-300/50',
  'from-[#102a52] to-[#1b417e] border-blue-300/60',
  'from-[#122e5a] to-[#1e488a] border-blue-300/60',
  'from-[#143262] to-[#214f96] border-blue-200/60',
  'from-[#0a1e3d] to-[#122d5a] border-blue-400/40',
];

function StickyCard({ testimonial, index, total }: { testimonial: typeof TESTIMONIALS[0]; index: number; total: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <div className="sticky w-full" style={{ top: `calc(15vh + ${index * 40}px)`, zIndex: index + 1, marginBottom: index === total - 1 ? '10vh' : '50vh' }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 150 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${CARD_COLORS[index % CARD_COLORS.length]} shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-8">
                <span className="text-6xl md:text-7xl font-black tracking-tight" style={{ color: '#40c9ff', fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  {testimonial.stat}
                </span>
                <span className="text-sm uppercase tracking-[0.2em] text-cyan-400 font-bold">
                  {testimonial.statLabel}
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-white/20">
              <p className="text-base text-blue-200 font-semibold tracking-wide">
                {testimonial.name}
              </p>
            </div>
          </div>
          <div className="md:w-1/2 bg-black/50 p-2 md:p-6">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video">
              <iframe
                src={`https://player.mux.com/${testimonial.id}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={testimonial.quote}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <main className={`min-h-screen bg-black text-white ${outfit.variable} ${rubik.variable}`} style={{ fontFamily: 'var(--font-rubik), sans-serif' }}>
      <Navbar />

      <div className="pt-32 pb-8 px-4">
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
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-7 h-7 flex items-center justify-center" style={{ backgroundColor: '#00b67a' }}>
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto">
            Trusted by 100+ roofing contractors across the US, UK, and Canada.
          </p>
        </div>
      </div>

      {/* Desktop — sticky stack */}
      <section className="relative px-4 bg-black pt-12 pb-32 hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div className="py-24">
            {TESTIMONIALS.map((t, i) => (
              <StickyCard key={t.id} testimonial={t} index={i} total={TESTIMONIALS.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile — horizontal swipe */}
      <section className="bg-black pt-8 pb-16 md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="snap-center flex-shrink-0 w-[85vw]">
              <div className={`rounded-3xl border bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl font-black tracking-tight" style={{ color: '#40c9ff', fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                      {t.stat}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold">
                      {t.statLabel}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm text-blue-200 font-semibold pb-4 border-b border-white/20 mb-4">
                    {t.name}
                  </p>
                </div>
                <div className="px-2 pb-2">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
                    <iframe
                      src={`https://player.mux.com/${t.id}`}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title={t.quote}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
