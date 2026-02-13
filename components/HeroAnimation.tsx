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
      <div className="glass-card rounded-3xl p-1 border border-white/10 shadow-2xl shadow-cyber-cyan/10">
        {/* Screen */}
        <div className="bg-cyber-black/80 rounded-[20px] p-4 pb-6 min-h-[320px] md:min-h-[380px] flex flex-col">
          {/* Call header */}
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center">
              <Phone className="w-4 h-4 text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Receptionist</p>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <p className="text-xs text-green-400">Active call</p>
              </div>
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: [0, 1, 1, 0], y: [15, 0, 0, 0], scale: [0.95, 1, 1, 1] }}
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
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'ai'
                      ? 'bg-white/10 text-gray-200 rounded-2xl rounded-tl-md'
                      : 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-white rounded-2xl rounded-tr-md border border-cyber-cyan/20'
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
                className="w-0.5 rounded-full bg-cyber-cyan/60"
                animate={{
                  height: [4, 12 + (i % 3) * 8, 4],
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
