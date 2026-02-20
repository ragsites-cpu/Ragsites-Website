'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const conversation = [
  { role: 'ai', text: "Hi, thanks for calling! How can I help you today?" },
  { role: 'caller', text: "I need to book an appointment for tomorrow" },
  { role: 'ai', text: "I have openings at 10am and 2pm. Which works better?" },
  { role: 'caller', text: "2pm works great" },
  { role: 'ai', text: "You're all set for 2pm tomorrow. We'll send a confirmation!" },
];

const TOTAL_DURATION = 12; // seconds for one full cycle

export default function HeroAnimation() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="bg-white rounded-[32px] p-2 border border-slate-200 shadow-xl mx-auto ring-1 ring-slate-900/5">
        {/* Screen */}
        <div className="bg-slate-50 rounded-[24px] p-4 pb-6 min-h-[320px] md:min-h-[380px] flex flex-col relative overflow-hidden ring-1 ring-slate-200">
          {/* Call header */}
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Phone className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-primary">AI Receptionist</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <p className="text-xs text-emerald-600 font-medium">Active call</p>
              </div>
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                style={{ willChange: 'opacity, transform' }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  translateY: [10, 0, 0, 0],
                }}
                transition={{
                  duration: TOTAL_DURATION,
                  times: [
                    (i * 1.5) / TOTAL_DURATION,
                    (i * 1.5 + 0.4) / TOTAL_DURATION,
                    (TOTAL_DURATION - 1.5) / TOTAL_DURATION,
                    (TOTAL_DURATION - 0.5) / TOTAL_DURATION,
                  ],
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className={`flex ${msg.role === 'caller' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'ai'
                      ? 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm shadow-sm'
                      : 'bg-brand-accent text-white rounded-2xl rounded-tr-sm shadow-sm'
                    }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Waveform indicator */}
          <div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 h-7 rounded-full bg-brand-accent/60 origin-bottom"
                animate={{
                  scaleY: [0.15, (0.4 + (i % 3) * 0.3), 0.15],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
