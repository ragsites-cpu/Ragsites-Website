'use client';

import { ArrowLeft, MessageSquare, Star, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AudioCard from '@/components/AudioCard';
import ChatDemo from '@/components/ChatDemo';
import ReputationFlow from '@/components/ReputationFlow';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cyber-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded" />
              <span className="text-xl font-bold gradient-text">RAGSITES</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Our AI Solutions</span>
          </h1>
          <p className="text-xl text-gray-400">
            Automation tools that help businesses scale without increasing overhead.
          </p>
        </div>
      </section>

      {/* AI Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Solution 1: AI Voice Receptionist */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
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
            <div>
              <AudioCard />
            </div>
          </div>

          {/* Solution 2: Smart Chatbot */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
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
            <div>
              <ChatDemo />
            </div>
          </div>

          {/* Solution 3: Reputation Engine */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
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
            <div>
              <ReputationFlow />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to automate your business?</h2>
          <p className="text-gray-400 mb-8">
            Get in touch to learn how our AI solutions can help you scale.
          </p>
          <Link
            href="/#contact-section"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg hover:scale-105 transition-transform"
          >
            Contact Us
          </Link>
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
              Built by Ragsites. © 2025
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
