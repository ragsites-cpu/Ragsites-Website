'use client';

import { Check, X } from 'lucide-react';

export default function PricingComparison() {
  const features = [
    { name: '24/7 Availability', human: false, ai: true },
    { name: 'No Sick Days', human: false, ai: true },
    { name: 'Instant Response', human: false, ai: true },
    { name: 'Handles Multiple Calls', human: false, ai: true },
    { name: 'Perfect Memory', human: false, ai: true },
    { name: 'Scales Infinitely', human: false, ai: true },
  ];

  return (
    <div className="glass-card p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-brand-primary">
        Why Switch to AI?
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4 px-4 text-slate-500 font-normal">
                Feature
              </th>
              <th className="text-center py-4 px-4">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-slate-500">Human Receptionist</p>
                  <p className="text-2xl font-bold text-red-500">$3,200/mo</p>
                  <p className="text-xs text-slate-400">+ benefits</p>
                </div>
              </th>
              <th className="text-center py-4 px-4">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-brand-primary">Ragsites AI</p>
                  <p className="text-xl font-bold text-brand-accent">
                    Contact Our Team
                  </p>
                  <p className="text-xs text-brand-accent">custom pricing</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-4 px-4 text-slate-700 font-medium">{feature.name}</td>
                <td className="py-4 px-4 text-center">
                  {feature.human ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {feature.ai ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50">
                      <Check className="w-5 h-5 text-brand-accent" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="group px-8 py-4 rounded-xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-sm inline-flex items-center gap-3"
        >
          Get Custom Pricing
          <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
}
