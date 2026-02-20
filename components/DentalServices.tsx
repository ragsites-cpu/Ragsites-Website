'use client';

import { motion } from 'framer-motion';
import { Users, Clock, Calendar, TrendingUp, Shield, Sparkles } from 'lucide-react';

const stats = [
  { value: '60', label: 'Patients Guaranteed', icon: Users },
  { value: '90', label: 'Days', icon: Calendar },
  { value: '60s', label: 'AI Response Time', icon: Clock },
  { value: '316%', label: 'Average ROI', icon: TrendingUp },
];

const features = [
  {
    title: 'AI-Powered Meta Ads',
    description: 'Our AI creates and optimizes campaigns specifically for cosmetic dentistry, generating 70-80 qualified leads monthly.',
    icon: Sparkles,
  },
  {
    title: '60-Second AI Response',
    description: 'Our proprietary AI voice agent contacts leads within 60 seconds, booking consultations while you focus on patients.',
    icon: Clock,
  },
  {
    title: 'Trust-Building Videos',
    description: 'Personalized videos featuring you and your work prepare patients to say yes before they walk through your door.',
    icon: Users,
  },
  {
    title: '87% Show-Up Rate',
    description: 'Multi-touch reminder system eliminates no-shows with strategic texts, emails, and AI confirmation calls.',
    icon: Calendar,
  },
];

const guaranteePoints = [
  'Full refund of service fee',
  'You keep all the leads',
  'Zero risk guarantee',
];

export default function DentalServices() {
  return (
    <section id="dental-section" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <span className="text-2xl">🦷</span>
            <span className="text-sm font-bold text-brand-accent tracking-wide uppercase">FOR DENTAL PRACTICES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-brand-primary"
          >
            Get <span className="text-brand-accent">60 Cosmetic Patients</span>
            <br />
            in 90 Days.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Guaranteed. Or you don't pay a single dollar.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl text-center border border-slate-200 hover:border-brand-accent/50 transition-colors shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-brand-accent mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-brand-primary">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="glass-card p-8 rounded-2xl hover:border-brand-accent/30 transition-all border border-slate-200 shadow-sm group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-3xl border-2 border-slate-200 bg-slate-50 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Shield Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-200">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                100% Risk-Free Guarantee
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                If we don't deliver 60 qualified, booked cosmetic patients in 90 days, you don't pay our service fee. We only win when you win.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {guaranteePoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-brand-accent">
                      ✓
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact-section"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-md"
          >
            Book Your Strategy Call
            <span className="text-xl">→</span>
          </a>
          <p className="text-slate-500 mt-4 text-sm">
            Limited spots available • No obligation consultation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
