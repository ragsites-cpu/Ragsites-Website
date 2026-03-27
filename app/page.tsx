'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Outfit, Rubik } from 'next/font/google';
import { ArrowRight, Phone, MessageSquare, Globe, Zap, Clock } from 'lucide-react';
import Script from 'next/script';
import { trackPageVisit } from '@/app/actions/track';
import Navbar from '@/components/Navbar';
import LiveVoiceDemo from '@/components/LiveVoiceDemo';
import DemoWidget from '@/components/DemoWidget';
import AnimatedCounter from '@/components/AnimatedCounter';
import Image from 'next/image';
import PersonaPlexDemo from '@/components/PersonaPlexDemo';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-outfit' });
const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-rubik' });

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home() {
  const visitIdRef = useRef('');

  useEffect(() => {
    trackPageVisit('/').then((id) => { visitIdRef.current = id; });

    const startTime = Date.now();
    let maxScroll = 0;
    let sent = false;

    const updateScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (pct > maxScroll) maxScroll = pct;
    };

    const sendEngagement = () => {
      if (sent || !visitIdRef.current) return;
      sent = true;
      const blob = new Blob([JSON.stringify({
        visitId: visitIdRef.current,
        timeOnPageSeconds: Math.round((Date.now() - startTime) / 1000),
        maxScrollPercent: Math.round(maxScroll),
      })], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') sendEngagement();
    });
    window.addEventListener('pagehide', sendEngagement);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pagehide', sendEngagement);
    };
  }, []);

  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={`min-h-screen bg-black text-white ${outfit.variable} ${rubik.variable}`} style={{ fontFamily: 'var(--font-rubik), sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center justify-center px-4 overflow-hidden pt-32 pb-24">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay - Gradient to let center shine and fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0 pointer-events-none"></div>

        {/* Glowing Orbs for Skye AI Vibe */}
        <div className="glow-orb glow-orb-purple w-[600px] h-[600px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40 z-0" />
        <div className="glow-orb glow-orb-blue w-[500px] h-[500px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-30 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full dark-glass-card border border-white/20"
          >
            <Zap className="w-5 h-5 text-[#40c9ff]" />
            <span className="text-sm font-bold tracking-widest text-[#40c9ff] uppercase">AI-Powered Growth For Roofing Contractors</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight text-white" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            {'Book More Roofs.'.split('').map((char, i) => (
              <motion.span
                key={`line1-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.2 + i * 0.05 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <br />
            {'Close More Deals.'.split('').map((char, i) => (
              <motion.span
                key={`line2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.2 + 16 * 0.05 + i * 0.05 }}
                className="text-gradient-skye inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light"
          >
            We generate exclusive roofing leads, pre-qualify them with AI, keep your calendar full with automated reminders, and analyze every sales call so your close rate climbs month over month.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            {/* Massive Call Button */}
            <button
              onClick={scrollToDemo}
              className="group relative flex items-center justify-center gap-4 px-10 py-6 rounded-full bg-gradient-skye text-2xl font-bold text-white shadow-[0_0_40px_rgba(232,28,255,0.4)] hover:shadow-[0_0_60px_rgba(64,201,255,0.6)] hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Phone className="w-8 h-8 animate-pulse" />
              See Our AI Qualify a Lead — Live
            </button>
            <p className="text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Trusted by 100+ roofing contractors</p>
          </motion.div>
        </div>
      </section>

      {/* Your Complete Roofing Growth System */}
      <section className="py-24 px-4 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              Your Complete Roofing Growth System
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
              We don&apos;t just hand you leads and disappear. We built a full-stack AI system that fills your pipeline, qualifies your leads, protects your calendar, and coaches your sales team.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            <motion.div variants={fadeUp} className="dark-glass-card p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-[#40c9ff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>Exclusive Roofing Leads</h3>
              <p className="text-slate-400 leading-relaxed">We run high-converting Meta ad campaigns that target homeowners actively looking for roof replacements in your area. Every lead is exclusively yours — no shared leads, no bidding wars.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="dark-glass-card p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6 text-[#e81cff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>AI Lead Qualification Agent</h3>
              <p className="text-slate-400 leading-relaxed">Our AI agent calls and texts every lead within minutes to verify homeowner status, project scope, and buying intent. Only pre-qualified prospects make it to your calendar.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="dark-glass-card p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 text-[#40c9ff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>Daily Meeting Reminders</h3>
              <p className="text-slate-400 leading-relaxed">Automated daily reminders via call and text before every meeting drastically reduce no-shows, so your crew never wastes a trip on a lead who forgot.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="dark-glass-card p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6 text-[#e81cff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>Sales Call Intelligence</h3>
              <p className="text-slate-400 leading-relaxed">Our proprietary transcription software records and analyzes every sales call, pinpoints exactly what went wrong, and gives you actionable coaching to improve your close rate.</p>
            </motion.div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/how-it-works" className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-lg font-medium flex items-center justify-center gap-2">
              See How It Works <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/quiz" className="px-8 py-4 rounded-xl bg-gradient-skye text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,28,255,0.3)] hover:scale-105 transition-all text-lg">
              Book a Strategy Call <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>


      {/* AI Demo Widget */}
      <section id="demo-section" className="py-24 px-2 md:px-8 bg-black">
        <div className="mx-auto" style={{ maxWidth: '1600px' }}>
          <iframe
            src="https://personaplex-receptionist.fly.dev/demo"
            width="100%"
            height="900"
            frameBorder="0"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
            title="AI Lead Qualification Demo"
          />
        </div>
      </section>

      {/* Testimonials (Senja) */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-white text-center" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            Our <span className="text-gradient-skye">Success Stories</span>
          </h2>
          <Script
            src="https://widget.senja.io/widget/630388b8-5925-43a5-8d32-217aee54ab75/platform.js"
            strategy="afterInteractive"
          />
          <div
            className="senja-embed"
            data-id="630388b8-5925-43a5-8d32-217aee54ab75"
            data-mode="shadow"
            data-lazyload="false"
            style={{ display: 'block', width: '100%' }}
          />
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 px-4 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}><AnimatedCounter value="10K+" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Leads Generated</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}><AnimatedCounter value="40%+" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Avg. Close Rate Lift</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}><AnimatedCounter value="90%" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Show-Up Rate</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-[#e81cff] mb-2" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>&lt;<AnimatedCounter value="5min" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Lead Response Time</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="glow-orb glow-orb-pink w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-8" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>Ready to Fill Your Roofing Calendar?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Stop chasing leads that ghost you. Let our AI system generate, qualify, remind, and coach — so you just show up and close.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/workflows" className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold flex items-center justify-center gap-2 transition-all">
              See Workflows <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/quiz" className="px-8 py-4 rounded-xl bg-gradient-skye text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,28,255,0.3)] hover:scale-105 transition-all">
              Book a Strategy Call <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8 px-4 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Top section: Brand + Nav columns + CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/new-logo.png" alt="Ragsites" width={32} height={32} />
                <span className="text-xl font-bold text-white">RAGSITES</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                AI-powered lead generation and sales automation for roofing contractors. From exclusive leads to pre-qualified appointments that actually show up.
              </p>
            </div>

            {/* Product column */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="/features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/workflows" className="text-sm text-slate-400 hover:text-white transition-colors">Workflows</a></li>
                <li><a href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Services column */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-3">
                <li><a href="/quiz" className="text-sm text-slate-400 hover:text-white transition-colors">Find Your Fit</a></li>
                <li><a href="/brochure" className="text-sm text-slate-400 hover:text-white transition-colors">Brochure</a></li>
              </ul>
            </div>

            {/* CTA column */}
            <div className="lg:col-span-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Ready to Grow Your Roofing Business?</h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                See how we generate exclusive leads, qualify them with AI, and put pre-qualified appointments on your calendar.
              </p>
              <a
                href="/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-skye text-white font-semibold text-sm shadow-[0_0_20px_rgba(232,28,255,0.3)] hover:scale-105 transition-all"
              >
                Book a Strategy Call <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                &copy; {new Date().getFullYear()} Ragsites. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
