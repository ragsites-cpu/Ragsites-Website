'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Phone, Calendar, MessageSquare, BarChart3, Zap, Clock, Shield } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AudioCard from '@/components/AudioCard';
import Pricing from '@/components/Pricing';
import AuditForm from '@/components/AuditForm';
import HeroAnimation from '@/components/HeroAnimation';
import AnimatedCounter from '@/components/AnimatedCounter';

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
    icon: Zap,
    title: 'Transfers Calls',
    description: 'Seamlessly transfers to your team when a human touch is needed. Smart routing built in.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Detailed call summaries, sentiment analysis, and performance metrics delivered to your inbox.',
  },
  {
    icon: Shield,
    title: 'Custom AI Scripts',
    description: 'Tailored to your business. Your AI receptionist knows your services, pricing, and FAQs.',
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
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
              >
                <Phone className="w-5 h-5 text-cyber-cyan" />
                <span className="text-sm font-semibold text-cyber-cyan">AI VOICE RECEPTIONIST</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Never Miss a Call.</span>
                <br />
                <span className="gradient-text">Ever Again.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-400 mb-10 max-w-xl"
              >
                AI that answers every call in 1 second, books appointments, and captures leads 24/7.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg shadow-2xl shadow-cyber-cyan/30 inline-flex items-center gap-3"
              >
                Get Started
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 grid grid-cols-3 gap-4 max-w-sm md:max-w-md"
              >
                <div className="glass-card p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold gradient-text">24/7</p>
                  <p className="text-xs text-gray-400 mt-1">Always On</p>
                </div>
                <div className="glass-card p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold gradient-text">&lt;1s</p>
                  <p className="text-xs text-gray-400 mt-1">Response Time</p>
                </div>
                <div className="glass-card p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold gradient-text">0</p>
                  <p className="text-xs text-gray-400 mt-1">Missed Calls</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="hidden md:block"
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-6 h-6 text-cyber-cyan" />
        </motion.div>
      </section>

      {/* How It Works - Steps */}
      <section id="how-it-works" className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">How It </span>
              <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-400">
              Up and running in 3 simple steps
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-2xl text-center hover:border-cyber-cyan/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center mx-auto mb-6">
                  <span className="text-lg font-bold text-black">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Audio Demo */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 h-full flex flex-col justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Hear It In Action</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Listen to a real conversation with our AI receptionist. Natural voice. Zero awkwardness.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                  Natural conversation flow
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                  Calendar integration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                  Custom scripts for your business
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                  Works for any industry
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
              <AudioCard />
            </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Everything You </span>
              <span className="gradient-text">Need</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A complete AI receptionist that handles calls like a real person
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-2xl hover:border-cyber-cyan/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyber-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">The Cost of </span>
              <span className="gradient-text">Missed Calls</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              <p className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                <AnimatedCounter value="62%" />
              </p>
              <p className="text-sm text-gray-400">of calls to small businesses go unanswered</p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value="85%" />
              </p>
              <p className="text-sm text-gray-400">of customers won&apos;t call back if you miss their call</p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold text-cyber-cyan mb-2">
                $<AnimatedCounter value="1.2K" />
              </p>
              <p className="text-sm text-gray-400">average lifetime value lost per missed call</p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-2xl text-center">
              <p className="text-4xl md:text-5xl font-bold text-cyber-purple mb-2">
                <AnimatedCounter value="40%" />
              </p>
              <p className="text-sm text-gray-400">revenue increase when every call is answered</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-10 rounded-2xl border border-cyber-cyan/20 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">1/10th</p>
                <p className="text-sm text-gray-400">the cost of a human receptionist</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">&infin;</p>
                <p className="text-sm text-gray-400">parallel calls handled simultaneously</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">0</p>
                <p className="text-sm text-gray-400">sick days, breaks, or bad moods</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">AI vs. </span>
              <span className="gradient-text">Traditional Receptionist</span>
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
              className="glass-card p-8 rounded-2xl border-2 border-cyber-cyan/30"
            >
              <h3 className="text-xl font-bold text-cyber-cyan mb-6">AI Receptionist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Available 24/7/365</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Answers in under 1 second</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Handles unlimited parallel calls</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Perfect memory &amp; data tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Starting at $99/month</span>
                </li>
              </ul>
            </motion.div>

            {/* Traditional Column */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl opacity-60"
            >
              <h3 className="text-xl font-bold text-gray-400 mb-6">Traditional Receptionist</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Business hours only</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Calls go to voicemail</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">One call at a time</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Notes get lost</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">$3,000+ per month</span>
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
            <p className="text-gray-400 text-lg">
              Businesses using AI receptionists see an average
              <span className="text-white font-bold"> 27% increase in booked appointments </span>
              and
              <span className="text-white font-bold"> 35% reduction in missed opportunities</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* CTA / Contact Section */}
      <section id="contact-section" className="py-24 px-4 bg-cyber-gray/30">
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
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Ragsites" width={24} height={24} className="rounded" />
              <span className="font-bold gradient-text">RAGSITES</span>
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
