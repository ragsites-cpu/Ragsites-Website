'use client';

import { ArrowDown, Phone, Calendar, MessageSquare, BarChart3, Zap, Clock, Shield } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AudioCard from '@/components/AudioCard';
import Pricing from '@/components/Pricing';
import AuditForm from '@/components/AuditForm';

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
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Phone className="w-5 h-5 text-cyber-cyan" />
            <span className="text-sm font-semibold text-cyber-cyan">AI VOICE RECEPTIONIST</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Never Miss a Call.</span>
            <br />
            <span className="gradient-text">Ever Again.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            AI that answers every call in 1 second, books appointments, and captures leads 24/7.
          </p>

          <button
            onClick={scrollToContact}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl shadow-cyber-cyan/30 inline-flex items-center gap-3"
          >
            Get Started
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold gradient-text">24/7</p>
              <p className="text-sm text-gray-400 mt-1">Always On</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold gradient-text">&lt;1s</p>
              <p className="text-sm text-gray-400 mt-1">Response Time</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold gradient-text">0</p>
              <p className="text-sm text-gray-400 mt-1">Missed Calls</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-cyber-cyan" />
        </div>
      </section>

      {/* How It Works - Steps */}
      <section id="how-it-works" className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">How It </span>
              <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-400">
              Up and running in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {steps.map((step) => (
              <div key={step.number} className="glass-card p-8 rounded-2xl text-center hover:border-cyber-cyan/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center mx-auto mb-6">
                  <span className="text-lg font-bold text-black">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Audio Demo */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="glass-card p-8 h-full flex flex-col justify-center">
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
            </div>
            <div>
              <AudioCard />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-section" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Everything You </span>
              <span className="gradient-text">Need</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A complete AI receptionist that handles calls like a real person
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-8 rounded-2xl hover:border-cyber-cyan/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyber-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">AI vs. </span>
              <span className="gradient-text">Traditional Receptionist</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* AI Column */}
            <div className="glass-card p-8 rounded-2xl border-2 border-cyber-cyan/30">
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
            </div>

            {/* Traditional Column */}
            <div className="glass-card p-8 rounded-2xl opacity-60">
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
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* CTA / Contact Section */}
      <section id="contact-section" className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-4xl mx-auto text-center">
          <AuditForm />
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
