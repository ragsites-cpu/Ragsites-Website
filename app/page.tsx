'use client';

import { ArrowDown, Zap, MessageSquare, Star, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AudioCard from '@/components/AudioCard';
import ChatDemo from '@/components/ChatDemo';
import ReputationFlow from '@/components/ReputationFlow';
import PricingComparison from '@/components/PricingComparison';
import AuditForm from '@/components/AuditForm';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animatedd Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Zap className="w-5 h-5 text-cyber-cyan" />
            <span className="text-sm font-semibold gradient-text">RAGSITES</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Scale Revenue Without</span>
            <br />
            <span className="gradient-text">Increasing Overhead.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Stop losing leads to missed calls. Automate your reception and reputation management to capture pure profit 24/7.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToDemo}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl cyber-glow inline-flex items-center gap-3"
          >
            Hear the Difference
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold gradient-text">24/7</p>
              <p className="text-sm text-gray-400 mt-1">Availability</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold gradient-text">$0</p>
              <p className="text-sm text-gray-400 mt-1">Sick Days</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold gradient-text">∞</p>
              <p className="text-sm text-gray-400 mt-1">Scalability</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-cyber-cyan" />
        </div>
      </section>

      {/* AI Solutions Section - Combined Demo & Features */}
      <section id="demo-section" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div id="audio-demo" className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Our AI Solutions</span>
            </h2>
            <p className="text-xl text-gray-400">
              Experience the future of automation. See our AI in action.
            </p>
          </div>

          {/* Solution 1: AI Voice Receptionist */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            {/* Feature Details */}
            <div className="glass-card p-8 h-full flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyber-cyan to-blue-500 flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">AI Voice Receptionist</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Answer calls, book appointments, and qualify leads 24/7. Never miss a customer again.
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
              </ul>
            </div>

            {/* Demo */}
            <div>
              <AudioCard />
            </div>
          </div>

          {/* Solution 2: Smart Chatbot */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            {/* Feature Details */}
            <div className="glass-card p-8 h-full flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyber-purple to-pink-500 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Smart Chatbot</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Capture leads on your website instantly. Convert visitors into customers while you sleep.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-purple" />
                  Lead qualification
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-purple" />
                  Instant email notifications
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyber-purple" />
                  CRM integration
                </li>
              </ul>
            </div>

            {/* Demo */}
            <div>
              <ChatDemo />
            </div>
          </div>

          {/* Solution 3: Reputation Engine */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Feature Details */}
            <div className="glass-card p-8 h-full flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Reputation Engine</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Automated review requests that turn happy customers into 5-star testimonials.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Post-job automation
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Smart timing algorithms
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Multi-platform reviews
                </li>
              </ul>
            </div>

            {/* Demo */}
            <div>
              <ReputationFlow />
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing-section" className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-4xl mx-auto">
          <PricingComparison />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section id="contact-section" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AuditForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyber-cyan" />
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
