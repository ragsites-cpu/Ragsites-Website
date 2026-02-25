'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Loader2, Mic, X, ArrowRight, RotateCcw } from 'lucide-react';
import { useRealtimeVoice, CallStatus } from '@/hooks/useRealtimeVoice';

type DemoState = 'idle' | 'loading' | 'ready' | 'voice' | 'error';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function VoiceOrb({ volumeLevel, isSpeaking, status }: { volumeLevel: number; isSpeaking: boolean; status: CallStatus }) {
  const scale = status === 'active' ? 1 + volumeLevel * 0.3 : 1;
  const isActive = status === 'active';

  return (
    <div className="relative w-32 h-32 mx-auto">
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/10"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-blue-400/10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </>
      )}
      <motion.div
        className="absolute inset-3 rounded-full overflow-hidden shadow-lg"
        animate={{ scale }}
        transition={{ duration: 0.1 }}
        style={{
          background: isActive
            ? 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb 40%, #7c3aed 70%, #c084fc 90%)'
            : 'radial-gradient(circle at 30% 30%, #93c5fd, #bfdbfe 40%, #ddd6fe 70%, #e9d5ff 90%)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.6) 0%, transparent 50%)',
          }}
        />
      </motion.div>
    </div>
  );
}

export default function DemoWidget() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<DemoState>('idle');
  const [businessName, setBusinessName] = useState('');
  const [demoToken, setDemoToken] = useState('');
  const [error, setError] = useState('');

  const {
    callStatus,
    volumeLevel,
    isSpeaking,
    transcript,
    elapsedSeconds,
    error: voiceError,
    startCall,
    endCall,
    reset: resetVoice,
  } = useRealtimeVoice();

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [transcript]);

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

      setDemoToken(data.token);
      setBusinessName(data.businessName);
      setState('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('error');
    }
  };

  const handleStartVoice = async () => {
    setState('voice');
    await startCall({
      token: demoToken,
      greeting: `Hi, welcome to ${businessName}! How can we help you today?`,
    });
  };

  const handleReset = () => {
    resetVoice();
    setState('idle');
    setUrl('');
    setDemoToken('');
    setBusinessName('');
    setError('');
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const statusLabel = (() => {
    if (callStatus === 'connecting') return 'Connecting...';
    if (callStatus !== 'active') return '';
    if (isSpeaking) return 'Speaking';
    return 'Listening';
  })();

  const remaining = 120 - elapsedSeconds;
  const isWarning = remaining <= 15 && remaining > 0;

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
            Try It With <span className="text-brand-accent">Your Business</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-xl mx-auto">
            Drop your website URL and talk to a personalized AI receptionist in under 1 minute
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* ─── IDLE / ERROR STATE — URL Form ─── */}
            {(state === 'idle' || state === 'error') && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative z-10 p-8 md:p-10"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (state === 'error') setState('idle');
                      }}
                      placeholder="yourwebsite.com"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-lg"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="primary-button md:px-8 py-4 text-lg justify-center gap-2 whitespace-nowrap"
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

            {/* ─── LOADING STATE ─── */}
            {state === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 text-center py-8 p-8 md:p-10"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-brand-accent/20 border-t-brand-accent flex items-center justify-center"
                >
                  <Loader2 className="w-6 h-6 text-brand-accent" />
                </motion.div>

                <h3 className="text-xl font-bold text-brand-primary mb-2">Building Your Demo</h3>
                <div className="space-y-2 text-slate-500 text-sm">
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
                    Setting up your live demo...
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* ─── READY STATE — Mic Button ─── */}
            {state === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 text-center py-8 p-8 md:p-10"
              >
                <VoiceOrb volumeLevel={0} isSpeaking={false} status="idle" />

                <h3 className="text-xl font-bold text-brand-primary mt-6 mb-2">
                  Your Demo for <span className="text-brand-accent">{businessName}</span> is Ready!
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  Press the button to start a live conversation with your AI receptionist
                </p>

                <motion.button
                  onClick={handleStartVoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-brand-accent mx-auto flex items-center justify-center shadow-lg hover:bg-brand-accent-hover transition-colors"
                >
                  <Mic className="w-7 h-7 text-white" />
                </motion.button>

                <p className="text-xs text-slate-400 mt-4">2-minute demo &middot; Uses your microphone</p>
              </motion.div>
            )}

            {/* ─── VOICE: CONNECTING ─── */}
            {state === 'voice' && callStatus === 'connecting' && (
              <motion.div
                key="voice-connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 text-center"
              >
                <VoiceOrb volumeLevel={0} isSpeaking={false} status="connecting" />
                <div className="mt-6 flex items-center justify-center gap-2 text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Setting up your call...</span>
                </div>
              </motion.div>
            )}

            {/* ─── VOICE: ACTIVE ─── */}
            {state === 'voice' && callStatus === 'active' && (
              <motion.div
                key="voice-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row min-h-[400px]"
              >
                {/* Left panel — Voice orb */}
                <div className="flex-shrink-0 w-full md:w-56 bg-gradient-to-b from-blue-50 to-slate-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
                  <VoiceOrb volumeLevel={volumeLevel} isSpeaking={isSpeaking} status="active" />

                  <p className="text-sm font-medium text-slate-500 mt-4">{statusLabel}</p>

                  <p className={`text-xs font-mono mt-2 ${isWarning ? 'text-amber-500' : 'text-slate-400'}`}>
                    {formatTime(elapsedSeconds)} / 2:00
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={endCall}
                      className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Right panel — Transcript */}
                <div className="flex-1 p-5 flex flex-col min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Transcript</span>
                    </div>
                    <span className="text-xs text-brand-accent font-medium">{businessName}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 max-h-72 pr-1">
                    {transcript.length === 0 && (
                      <p className="text-slate-400 text-sm italic">Waiting for conversation to begin...</p>
                    )}
                    {transcript.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                            msg.role === 'assistant'
                              ? 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm shadow-sm'
                              : 'bg-brand-accent text-white rounded-2xl rounded-tr-sm shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={transcriptEndRef} />
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isWarning ? 'bg-amber-400' : 'bg-brand-accent'}`}
                      style={{ width: `${(elapsedSeconds / 120) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── VOICE: ENDED ─── */}
            {state === 'voice' && callStatus === 'ended' && (
              <motion.div
                key="voice-ended"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-brand-primary">Call Ended</h3>
                  <p className="text-sm text-slate-500">Duration: {formatTime(elapsedSeconds)} &middot; {businessName}</p>
                </div>

                {transcript.length > 0 && (
                  <div className="overflow-y-auto space-y-3 max-h-56 mb-6 pr-1">
                    {transcript.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                            msg.role === 'assistant'
                              ? 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm shadow-sm'
                              : 'bg-brand-accent text-white rounded-2xl rounded-tr-sm shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Another Website
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:bg-brand-accent-hover transition-colors"
                  >
                    Get This For Your Business
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── VOICE ERROR (during call) ─── */}
            {state === 'voice' && callStatus === 'idle' && voiceError && (
              <motion.div
                key="voice-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 text-center py-8 p-8 md:p-10"
              >
                <p className="text-red-500 text-sm mb-4">{voiceError}</p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-brand-accent text-sm font-medium hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
