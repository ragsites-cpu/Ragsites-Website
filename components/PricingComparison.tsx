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
      <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
        Why Switch to AI?
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-gray-400 font-normal">
                Feature
              </th>
              <th className="text-center py-4 px-4">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-white">Human Receptionist</p>
                  <p className="text-2xl font-bold text-red-400">$3,200/mo</p>
                  <p className="text-xs text-gray-500">+ benefits</p>
                </div>
              </th>
              <th className="text-center py-4 px-4">
                <div className="space-y-1">
                  <p className="text-xl font-bold gradient-text">Ragsites AI</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
                    Contact Our Team
                  </p>
                  <p className="text-xs text-cyber-cyan">custom pricing</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4 text-gray-300">{feature.name}</td>
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
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20">
                      <Check className="w-5 h-5 text-cyber-cyan" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
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
          className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl cyber-glow inline-flex items-center gap-3"
        >
          Get Custom Pricing
          <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
}
