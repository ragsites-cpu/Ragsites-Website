'use client';

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import DentalServices from '@/components/DentalServices';
import AuditForm from '@/components/AuditForm';

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Owner, Smile Design Studio',
    location: 'Austin, TX',
    quote: "I was skeptical at first. We had tried so many marketing agencies that promised the world and delivered nothing. But within 6 weeks, we had 14 new cosmetic consultations booked. Real patients, not tire kickers. My team finally has a full schedule again.",
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Prosthodontist',
    location: 'Seattle, WA',
    quote: "The AI calling system changed everything for us. We used to lose leads because my front desk couldnt get to every call. Now every inquiry gets a response in under a minute. Last month we closed 8 veneer cases directly from those calls.",
    rating: 5,
  },
  {
    name: 'Dr. Amanda Rodriguez',
    role: 'Cosmetic Dentist',
    location: 'Miami, FL',
    quote: "What impressed me most was the quality of patients. These werent people looking for the cheapest option. They came in educated about our services, ready to discuss treatment. Our case acceptance rate went from 40% to over 70%.",
    rating: 5,
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
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <span className="text-2xl">🦷</span>
            <span className="text-sm font-semibold text-emerald-400">DENTAL PATIENT ACQUISITION</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Get 60 Cosmetic Patients</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyber-cyan bg-clip-text text-transparent">In 90 Days. Guaranteed.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Or you dont pay. We use AI-powered advertising and instant response systems to fill your chair with high-value cosmetic patients.
          </p>

          <button
            onClick={scrollToContact}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl shadow-emerald-500/30 inline-flex items-center gap-3"
          >
            Book Your Strategy Call
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">60</p>
              <p className="text-sm text-gray-400 mt-1">Patients Guaranteed</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">90</p>
              <p className="text-sm text-gray-400 mt-1">Days</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">0</p>
              <p className="text-sm text-gray-400 mt-1">Risk</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-emerald-400" />
        </div>
      </section>

      {/* Dental Services Section */}
      <DentalServices />

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-24 px-4 bg-cyber-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">What Dentists Are </span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Saying</span>
            </h2>
            <p className="text-xl text-gray-400">
              Real results from real dental practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:border-emerald-500/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-sm text-emerald-400">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
