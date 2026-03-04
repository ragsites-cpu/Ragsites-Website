'use client';

import { useState } from 'react';
import { Check, Phone } from 'lucide-react';

type Category = 'voice-receptionist' | 'premium';

const voicePlans = [
  {
    name: 'Starter',
    description: 'For small businesses getting started',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      '60 phone conversations/mo',
      '120 text conversations/mo',
      'Call transfer',
      'Email summaries',
      'Basic analytics',
      'Business hours support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    description: 'For growing businesses',
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: [
      '200 phone conversations/mo',
      '400 text conversations/mo',
      'Call transfer',
      'Email summaries',
      'Advanced analytics',
      'Calendar integration',
      'Custom AI scripts',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Business',
    description: 'For high-volume operations',
    monthlyPrice: 499,
    yearlyPrice: 399,
    features: [
      '800 phone conversations/mo',
      '1,600 text conversations/mo',
      'Call transfer',
      'Email summaries',
      'Advanced analytics',
      'Calendar integration',
      'Custom AI scripts',
      'Multilingual support',
      'Dedicated account manager',
      '24/7 priority support',
    ],
    cta: 'Get Started',
    popular: false,
  },
];


export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [category, setCategory] = useState<Category>('voice-receptionist');

  return (
    <section id="pricing-section" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Simple, Transparent <span className="text-gradient-skye">Pricing</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your business. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setCategory('voice-receptionist')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              category === 'voice-receptionist'
                ? 'bg-gradient-skye text-white shadow-[0_0_15px_rgba(232,28,255,0.3)]'
                : 'bg-white/10 text-slate-400 hover:bg-white/15'
            }`}
          >
            Voice Receptionist
          </button>
          <button
            onClick={() => setCategory('premium')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              category === 'premium'
                ? 'bg-gradient-skye text-white shadow-[0_0_15px_rgba(232,28,255,0.3)]'
                : 'bg-white/10 text-slate-400 hover:bg-white/15'
            }`}
          >
            Premium
          </button>
        </div>

        {/* Monthly/Yearly Toggle — only for voice-receptionist */}
        {category === 'voice-receptionist' && (
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isYearly ? 'bg-[#40c9ff]' : 'bg-white/20'
                }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${isYearly ? 'translate-x-7' : 'translate-x-0'
                  }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-slate-500'}`}>
              Yearly
              <span className="ml-2 text-xs text-[#40c9ff] font-semibold bg-[#40c9ff]/10 px-2 py-1 rounded-full">Save 20%</span>
            </span>
          </div>
        )}

        {/* Premium CTA */}
        {category === 'premium' && (
          <div className="text-center dark-glass-card p-10 rounded-2xl max-w-2xl mx-auto border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-3">Everything in Voice Receptionist, plus:</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['CRM Integration', 'Live Dispatch', 'HIPAA Compliance', 'Custom Integrations', 'Dedicated Account Manager'].map((feature) => (
                <span key={feature} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white">
                  <Check className="w-4 h-4 text-[#40c9ff]" />
                  {feature}
                </span>
              ))}
            </div>
            <p className="text-slate-400 mb-4">
              We build a fully custom AI solution tailored to your business needs — integrations, workflows, compliance, and more.
            </p>
            <p className="text-slate-300 mb-8 text-sm">
              Book a call with our team and we&apos;ll design the perfect package for you.
            </p>
            <a
              href="/quiz?tier=premium"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-skye text-white font-bold text-lg hover:scale-[1.02] transition-all duration-200 shadow-[0_0_20px_rgba(232,28,255,0.3)]"
            >
              <Phone className="w-5 h-5" />
              Book a Call
            </a>
          </div>
        )}

        {/* Voice Receptionist Plans */}
        {category === 'voice-receptionist' && (
          <div className="grid md:grid-cols-3 gap-8">
            {voicePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.popular
                    ? 'dark-glass-card border-2 border-[#40c9ff]/50 shadow-[0_0_30px_rgba(64,201,255,0.15)]'
                    : 'dark-glass-card border border-white/10'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-skye text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-400">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-slate-500 mt-1">
                      Billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#40c9ff] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/quiz"
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-sm text-center block bg-gradient-skye text-white hover:shadow-[0_0_20px_rgba(232,28,255,0.3)]"
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Enterprise CTA — only for voice-receptionist */}
        {category === 'voice-receptionist' && (
          <div className="mt-12 text-center dark-glass-card p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Need more volume?</h3>
            <p className="text-slate-400 mb-6">
              Contact us for a custom Enterprise plan with unlimited conversations and dedicated support.
            </p>
            <a
              href="/quiz?tier=premium"
              className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/15 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
