'use client';

import { ArrowLeft, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AudioCard from '@/components/AudioCard';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cyber-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
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
            <span className="gradient-text">AI Voice Receptionist</span>
          </h1>
          <p className="text-xl text-gray-400">
            Never miss a call again. Our AI answers, qualifies, and books appointments 24/7.
          </p>
        </div>
      </section>

      {/* AI Voice Receptionist Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="glass-card p-8 h-full flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyber-cyan to-blue-500 flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">How It Works</h3>
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

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to automate your reception?</h2>
          <p className="text-gray-400 mb-8">
            Get in touch to learn how our AI receptionist can help your business.
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
              <Image src="/logo.png" alt="Ragsites" width={24} height={24} className="rounded-full" />
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
