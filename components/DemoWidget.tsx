'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Loader2, Phone, ArrowRight, RotateCcw } from 'lucide-react';

type DemoState = 'idle' | 'loading' | 'success' | 'error';

export default function DemoWidget() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<DemoState>('idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setState('loading');
    setError('');

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setPhoneNumber(data.phoneNumber);
      setBusinessName(data.businessName);
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setUrl('');
    setPhoneNumber('');
    setBusinessName('');
    setError('');
  };

  return (
    <section id="demo-section" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Try It With </span>
            <span className="gradient-text">Your Business</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Drop your website URL and get a personalized AI receptionist demo in under 1 minute
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card p-8 md:p-10 rounded-2xl border border-cyber-cyan/20 relative overflow-hidden"
        >
          {/* Subtle animated background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-cyan/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyber-purple/5 rounded-full blur-3xl" />

          <AnimatePresence mode="wait">
            {(state === 'idle' || state === 'error') && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative z-10"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (state === 'error') setState('idle');
                      }}
                      placeholder="yourwebsite.com"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors text-lg"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-lg inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Build My Demo
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {state === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

              </motion.form>
            )}

            {state === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-cyber-cyan/20 border-t-cyber-cyan flex items-center justify-center"
                >
                  <Loader2 className="w-6 h-6 text-cyber-cyan" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2">Building Your Demo</h3>
                <div className="space-y-2 text-gray-400 text-sm">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Scanning {url}...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    Training your AI receptionist...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                  >
                    Setting up your demo phone line...
                  </motion.p>
                </div>
              </motion.div>
            )}

            {state === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/30 flex items-center justify-center"
                >
                  <Phone className="w-8 h-8 text-cyber-cyan" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Your Demo for <span className="gradient-text">{businessName}</span> is Ready!
                </h3>
                <p className="text-gray-400 mb-8">
                  Call the number below to talk to your personalized AI receptionist
                </p>

                <motion.a
                  href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-bold text-2xl md:text-3xl tracking-wider shadow-2xl shadow-cyber-cyan/30"
                >
                  <Phone className="w-7 h-7" />
                  {phoneNumber}
                </motion.a>

                <div className="mt-6 flex flex-col items-center gap-3">
                  <p className="text-gray-500 text-sm">
                    Demo limited to 5 minutes
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-cyber-cyan text-sm font-medium hover:underline"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try a different website
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
