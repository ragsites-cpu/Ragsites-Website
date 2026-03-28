import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
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

          {/* Product columns */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="space-y-3">
                <li><a href="/features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a></li>
              </ul>
              <ul className="space-y-3">
                <li><a href="/workflows" className="text-sm text-slate-400 hover:text-white transition-colors">Workflows</a></li>
                <li><a href="/customers" className="text-sm text-slate-400 hover:text-white transition-colors">Customers</a></li>
              </ul>
            </div>
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
  );
}
