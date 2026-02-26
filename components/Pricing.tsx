'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const plans = [
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

  return (
    <section id="pricing-section" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
            Simple, Transparent <span className="text-brand-accent">Pricing</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your business. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-medium ${!isYearly ? 'text-brand-primary' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isYearly ? 'bg-brand-accent' : 'bg-slate-300'
              }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${isYearly ? 'translate-x-7' : 'translate-x-0'
                }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-brand-primary' : 'text-slate-500'}`}>
            Yearly
            <span className="ml-2 text-xs text-brand-accent font-semibold bg-blue-50 px-2 py-1 rounded-full">Save 20%</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.popular
                  ? 'glass-card border-2 border-brand-accent shadow-xl'
                  : 'glass-card'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-accent text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-brand-primary mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-brand-primary">
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
                    <Check className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/quiz"
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-sm text-center block ${plan.popular
                    ? 'bg-brand-accent text-white hover:bg-brand-accent-hover'
                    : 'bg-white border border-slate-200 text-brand-primary hover:bg-slate-50 hover:border-slate-300'
                  }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center glass-card p-8 rounded-2xl bg-blue-50 border-blue-100">
          <h3 className="text-xl font-bold text-brand-primary mb-2">Need more volume?</h3>
          <p className="text-slate-600 mb-6">
            Contact us for a custom Enterprise plan with unlimited conversations and dedicated support.
          </p>
          <button
            onClick={() => {
              document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 rounded-xl bg-white border border-slate-200 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
