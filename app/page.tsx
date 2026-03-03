'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageSquare, Globe, Zap, Clock } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import LiveVoiceDemo from '@/components/LiveVoiceDemo';
import AnimatedCounter from '@/components/AnimatedCounter';

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
  const scrollToDemo = () => {
    document.getElementById('live-demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white">
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
            <span className="text-sm font-bold tracking-widest text-[#40c9ff] uppercase">The Voice AI Revenue Engine</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight text-white">
            {'The Voice AI'.split('').map((char, i) => (
              <motion.span
                key={`line1-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.2 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            {'Revenue Engine.'.split('').map((char, i) => (
              <motion.span
                key={`line2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.2 + 12 * 0.05 + i * 0.05 }}
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
            Click below and experience the AI Revenue Engine firsthand. Ask questions, hear how it handles objections, and see why our clients love it.
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
              Call Our Voice AI
            </button>
            <p className="text-slate-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> 127 demos run today</p>
          </motion.div>
        </div>
      </section>

      {/* Done-For-You Value Prop */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Not another tool you have to figure out.
            </h2>
            <p className="text-2xl text-slate-400 max-w-4xl mx-auto font-light">
              We provide a <span className="text-white font-semibold">Done-For-You</span> service. Our dedicated team builds, launches, and optimizes your Voice AI Revenue Engine so you go from Zero to Automated in 14 days.
            </p>
          </motion.div>

          <div className="flex justify-center gap-4">
            <a href="/how-it-works" className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-lg font-medium flex items-center gap-2">
              See How It Works <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Live Voice Demo Section */}
      <section id="live-demo-section" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-primary/20 to-black z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Try It <span className="text-gradient-skye">Live</span>
            </h2>
            <p className="text-xl text-slate-300">
              No forms. No waiting. Have a real conversation with our cutting-edge AI right now.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="dark-glass-card p-10 h-full flex flex-col justify-center border-white/10"
            >
              <h3 className="text-3xl font-bold mb-6 text-white">No Script.<br />100% Real-Time.</h3>
              <p className="text-slate-300 mb-8 text-lg">
                Click the mic and talk to our AI receptionist. Test its emotional intelligence, try to interrupt it, or ask complex pricing questions.
              </p>
              <ul className="space-y-4 text-slate-200">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#40c9ff]" />
                  </div>
                  <span className="text-lg">Sub-second response time</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#e81cff]" />
                  </div>
                  <span className="text-lg">Handles interruptions flawlessly</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-[#40c9ff]" />
                  </div>
                  <span className="text-lg">Speaks 50+ languages</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LiveVoiceDemo />
            </motion.div>
          </div>
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
              <p className="text-5xl font-black text-white mb-2"><AnimatedCounter value="1M+" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Calls Handled</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-5xl font-black text-white mb-2"><AnimatedCounter value="99%" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Satisfaction Rate</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-5xl font-black text-white mb-2"><AnimatedCounter value="24/7" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Availability</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-5xl font-black text-[#e81cff] mb-2">&lt;<AnimatedCounter value="1s" /></p>
              <p className="text-sm text-slate-400 uppercase tracking-wider">Response Time</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="glow-orb glow-orb-pink w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">Ready to Build Your Engine?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">See our features or discover exactly how our workflows turn every missed call into closed revenue.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/features" className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold flex items-center justify-center gap-2 transition-all">
              View Features
            </a>
            <a href="/workflows" className="px-8 py-4 rounded-xl bg-gradient-skye text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,28,255,0.3)] hover:scale-105 transition-all">
              See Workflows <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Ragsites" width={24} height={24} className="rounded-full" />
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
