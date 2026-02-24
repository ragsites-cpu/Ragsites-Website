'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Loader2, RotateCcw, ArrowRight } from 'lucide-react';
import { useRealtimeVoice, CallStatus } from '@/hooks/useRealtimeVoice';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function VoiceOrb({ volumeLevel, isSpeaking, status }: { volumeLevel: number; isSpeaking: boolean; status: CallStatus }) {
  const scale = status === 'active' ? 1 + volumeLevel * 0.3 : 1;
  const isActive = status === 'active';

  return (
    <div className="relative w-40 h-40 mx-auto">
      {/* Outer glow rings */}
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
      {/* Main orb */}
      <motion.div
        className="absolute inset-4 rounded-full overflow-hidden shadow-lg"
        animate={{ scale }}
        transition={{ duration: 0.1 }}
        style={{
          background: isActive
            ? 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb 40%, #7c3aed 70%, #c084fc 90%)'
            : 'radial-gradient(circle at 30% 30%, #93c5fd, #bfdbfe 40%, #ddd6fe 70%, #e9d5ff 90%)',
        }}
      >
        {/* Inner highlight */}
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

export default function LiveVoiceDemo() {
  const {
    callStatus,
    volumeLevel,
    isSpeaking,
    transcript,
    elapsedSeconds,
    error,
    startCall,
    endCall,
    reset,
  } = useRealtimeVoice();

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

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
    <div className="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <AnimatePresence mode="wait">
        {/* ─── IDLE STATE ─── */}
        {callStatus === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 text-center"
          >
            <VoiceOrb volumeLevel={0} isSpeaking={false} status="idle" />

            <h3 className="text-xl font-bold text-brand-primary mt-6 mb-2">
              Talk to Our AI — Live
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Press the button and have a real conversation
            </p>

            <motion.button
              onClick={startCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-brand-accent mx-auto flex items-center justify-center shadow-lg hover:bg-brand-accent-hover transition-colors"
            >
              <Mic className="w-7 h-7 text-white" />
            </motion.button>

            <p className="text-xs text-slate-400 mt-4">2-minute demo &middot; Uses your microphone</p>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ─── CONNECTING STATE ─── */}
        {callStatus === 'connecting' && (
          <motion.div
            key="connecting"
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

        {/* ─── ACTIVE STATE ─── */}
        {callStatus === 'active' && (
          <motion.div
            key="active"
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
                <button className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                  <Mic className="w-5 h-5 text-slate-600" />
                </button>
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

        {/* ─── ENDED STATE ─── */}
        {callStatus === 'ended' && (
          <motion.div
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-brand-primary">Call Ended</h3>
              <p className="text-sm text-slate-500">Duration: {formatTime(elapsedSeconds)}</p>
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
                onClick={reset}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
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
      </AnimatePresence>
    </div>
  );
}
