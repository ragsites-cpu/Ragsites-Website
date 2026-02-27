'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Phone, Calendar, MessageSquare, BarChart3, Zap, Clock, Shield, Globe, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import LiveVoiceDemo from '@/components/LiveVoiceDemo';
import Pricing from '@/components/Pricing';
import AuditForm from '@/components/AuditForm';
import AnimatedCounter from '@/components/AnimatedCounter';
import DemoWidget from '@/components/DemoWidget';

const features = [
  {
    icon: Phone,
    title: 'Answers Every Call',
    description: 'AI picks up in under 1 second. No hold music. No voicemail. Just instant, natural conversation.',
  },
  {
    icon: Calendar,
    title: 'Books Appointments',
    description: 'Integrates with your calendar to schedule appointments in real-time during the call.',
  },
  {
    icon: MessageSquare,
    title: 'Qualifies Leads',
    description: 'Asks the right questions to filter serious customers from tire kickers before they reach you.',
  },
  {
    icon: Globe,
    title: '50+ Languages',
    description: 'Fluently converses in over 50 languages — covering 97% of the world\'s speakers. No translation lag.',
  },
  {
    icon: Truck,
    title: 'Smart Dispatch',
    description: 'AI checks your CRM for available workers, finds the best match by location and skill, and dispatches them — all during the call.',
  },
  {
    icon: CreditCard,
    title: 'Payments on the Call',
    description: 'Collect deposits, process payments, and confirm transactions in real-time while the AI is still on the phone with your customer.',
  },
  {
    icon: ShieldCheck,
    title: 'HIPAA Compliant',
    description: 'Enterprise-grade security and HIPAA compliance built in. Safe for healthcare, dental, and any business handling sensitive data.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Detailed call summaries, sentiment analysis, and performance metrics delivered to your inbox.',
  },
];

const steps = [
  {
    number: '01',
    title: 'We Build Your AI Agent',
    description: 'We train your AI receptionist on your business, services, and brand voice.',
  },
  {
    number: '02',
    title: 'Connect Your Phone',
    description: 'Forward your calls or get a new number. Setup takes less than 5 minutes.',
  },
  {
    number: '03',
    title: 'Go Live 24/7',
    description: 'Your AI starts answering calls, booking appointments, and capturing leads instantly.',
  },
  {
    number: '04',
    title: 'CRM & Transaction Processing',
    description: 'Every call, lead, and payment flows into your CRM automatically — no manual entry.',
  },
  {
    number: '05',
    title: 'Chat Support on CRM',
    description: 'Your AI handles customer chats directly inside your CRM, keeping everything in one place.',
  },
  {
    number: '06',
    title: 'Custom Sales Agent',
    description: 'A dedicated AI sales agent that follows up with leads, qualifies prospects, and closes deals.',
  },
  {
    number: '07',
    title: 'Business Manager',
    description: 'A personal business manager to oversee your account, optimize performance, and scale with you.',
  },
  {
    number: '08',
    title: 'AI Engineer',
    description: 'A dedicated AI engineer to customize, fine-tune, and evolve your AI as your business grows.',
  },
];

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
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20 bg-black">
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
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full dark-glass-card border border-white/20"
          >
            <Phone className="w-5 h-5 text-brand-accent" />
            <span className="text-sm font-semibold text-white">AI VOICE RECEPTIONIST</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
            {'Never Miss a Customer.'.split('').map((char, i) => (
              <motion.span
                key={`line1-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.4 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            {'Ever Again.'.split('').map((char, i) => (
              <motion.span
                key={`line2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.4 + 23 * 0.05 + i * 0.05 }}
                className="text-brand-accent"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.0 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl mx-auto font-light"
          >
            AI that answers every call in 1 second, books appointments, and captures leads 24/7.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToContact}
            className="primary-button text-lg px-8 py-4 gap-3 group"
          >
            Get Started
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            <div className="dark-glass-card p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-accent">24/7</p>
              <p className="text-xs text-slate-300 mt-1">Always On</p>
            </div>
            <div className="dark-glass-card p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-accent">&lt;1s</p>
              <p className="text-xs text-slate-300 mt-1">Response Time</p>
            </div>
            <div className="dark-glass-card p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-accent">0</p>
              <p className="text-xs text-slate-300 mt-1">Missed Calls</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-6 h-6 text-brand-accent" />
        </motion.div>
      </section>

      {/* Demo Video */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary">
              From Call to <span className="text-brand-accent">Cash</span>
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <video
              className="w-full rounded-2xl shadow-xl"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/RagsitesDemo.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* Live Voice Demo */}
      <section className="py-24 px-4 section-bg-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
              Try It <span className="text-brand-accent">Live</span>
            </h2>
            <p className="text-xl text-slate-600">
              Have a real conversation with our AI receptionist — right now, in your browser
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 h-full flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">No Recording. No Script. 100% Live.</h3>
              <p className="text-slate-600 mb-6 text-lg">
                This isn&apos;t a pre-recorded demo. Click the mic and talk to our AI receptionist in real time. Ask anything.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                  Responds in under 1 second
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                  Natural, human-like voice
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                  See the live transcript as you talk
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <LiveVoiceDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Widget */}
      <DemoWidget />

      {/* How It Works - Steps */}
      <section id="how-it-works" className="py-24 px-4 section-bg-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
              How It <span className="text-brand-accent">Works</span>
            </h2>
            <p className="text-xl text-slate-600">
              Up and running in 3 simple steps
            </p>
          </motion.div>

          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex gap-6 md:gap-8 mb-12 last:mb-0"
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-accent flex items-center justify-center shadow-lg">
                  <span className="text-sm md:text-lg font-bold text-white">{step.number}</span>
                </div>

                {/* Content card */}
                <div className="glass-card p-6 md:p-8 rounded-2xl flex-1 mt-1">
                  <h3 className="text-xl font-bold text-brand-primary mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-section" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
              Everything You <span className="text-brand-accent">Need</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A complete AI receptionist that handles calls like a real person
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-2xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 px-4 section-bg-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
              The Cost of <span className="text-brand-accent">Missed Calls</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every unanswered call is revenue walking out the door
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-accent mb-2">
                <AnimatedCounter value="62%" />
              </p>
              <p className="text-sm text-slate-600">of calls to small businesses go unanswered</p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                <AnimatedCounter value="85%" />
              </p>
              <p className="text-sm text-slate-600">of customers won&apos;t call back if you miss their call</p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-accent mb-2">
                $<AnimatedCounter value="1.2K" />
              </p>
              <p className="text-sm text-slate-600">average lifetime value lost per missed call</p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                <AnimatedCounter value="40%" />
              </p>
              <p className="text-sm text-slate-600">revenue increase when every call is answered</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-10 rounded-2xl border-none max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-brand-accent mb-1">1/10th</p>
                <p className="text-sm text-slate-600">the cost of a human receptionist</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-brand-accent mb-1">30</p>
                <p className="text-sm text-slate-600">parallel calls handled simultaneously</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-brand-accent mb-1">0</p>
                <p className="text-sm text-slate-600">sick days, breaks, or bad moods</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI vs Traditional */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
              AI vs. <span className="text-brand-accent">Traditional Receptionist</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* AI Column */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl border-2 border-brand-accent shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-6">AI Receptionist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">Available 24/7/365</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">Answers in under 1 second</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">Handles up to 30 parallel calls</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">Perfect memory &amp; data tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">Starting at $99/month</span>
                </li>
              </ul>
            </motion.div>

            {/* Traditional Column */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <h3 className="text-xl font-bold text-slate-500 mb-6">Traditional Receptionist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-500">Business hours only</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-500">Calls go to voicemail</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-500">One call at a time</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-500">Notes get lost</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-500">$3,000+ per month</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Bottom stat callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-600 text-lg">
              Businesses using AI receptionists see an average
              <span className="text-brand-primary font-bold"> 27% increase in booked appointments </span>
              and
              <span className="text-brand-primary font-bold"> 35% reduction in missed opportunities</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* CTA / Contact Section */}
      <section id="contact-section" className="py-24 px-4 section-bg-alt">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <AuditForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Ragsites" width={24} height={24} className="rounded-full" />
              <span className="font-bold text-brand-primary">RAGSITES</span>
            </div>


            <p className="text-sm text-gray-500">
              Built by Ragsites. &copy; 2025
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
