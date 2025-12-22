'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ReputationFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const messages = [
    {
      image: '/reputation/message-1.png',
      label: 'AI sends initial follow-up',
      alt: 'First message from AI to customer'
    },
    {
      image: '/reputation/message-2.png',
      label: 'Customer responds positively',
      alt: 'Customer positive response'
    },
    {
      image: '/reputation/message-3.png',
      label: 'AI requests review',
      alt: 'AI asking for review'
    },
  ];

  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 cyber-glow">
      <h3 className="text-2xl font-bold mb-2 gradient-text">
        Automated 5-Star Reviews
      </h3>
      <p className="text-gray-400 mb-6 text-sm">
        Turn happy customers into glowing testimonials automatically.
      </p>

      {/* Message Screenshots */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Message Image */}
            <div className="relative w-full aspect-[9/16] max-h-[500px] rounded-xl overflow-hidden border border-cyber-cyan/30 bg-white/5">
              <Image
                src={messages[activeStep].image}
                alt={messages[activeStep].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-cyber-cyan">
                {messages[activeStep].label}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeStep
                  ? 'w-8 bg-cyber-cyan'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
