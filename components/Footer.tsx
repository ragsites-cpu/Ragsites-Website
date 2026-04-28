import Image from 'next/image';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#991b1b]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top CTA banner */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Fill Your Roofing Calendar?
          </h3>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8">
            See how we generate exclusive leads, qualify them with AI, and put pre-qualified appointments on your calendar.
          </p>
          <a
            href="/quiz"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-skye text-white font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-red-900/20"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 mb-5">
                <Image src="/new-logo.png" alt="Ragsites" width={36} height={36} />
                <span className="text-xl font-bold text-white tracking-tight">RAGSITES</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                AI-powered lead generation and sales automation for roofing contractors. From exclusive leads to pre-qualified appointments that actually show up.
              </p>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:admin@ragsites.com" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  admin@ragsites.com
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">Product</h4>
              <ul className="space-y-3">
                <li><a href="/features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/workflows" className="text-sm text-slate-400 hover:text-white transition-colors">Workflows</a></li>
                <li><a href="/customers" className="text-sm text-slate-400 hover:text-white transition-colors">Customers</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">Company</h4>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Get Started */}
            <div className="lg:col-span-3 lg:col-start-10">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">Get Started</h4>
              <ul className="space-y-3">
                <li><a href="/quiz" className="text-sm text-slate-400 hover:text-white transition-colors">Take the Quiz</a></li>
                <li><a href="/go" className="text-sm text-slate-400 hover:text-white transition-colors">Book a Call</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Ragsites. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
              <span className="text-slate-700">|</span>
              <a href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
