'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { User, Mail, Phone, Building2, Loader2, CheckCircle, ArrowRight, Star } from 'lucide-react';

/* ─── Quiz Data ─── */

interface QuizOption {
  label: string;
  sublabel: string;
}

interface QuizQuestion {
  question: string;
  subtitle: string;
  options: QuizOption[];
  key: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'How many calls does your business receive per week?',
    subtitle: 'This helps us understand your scale',
    key: 'weekly_calls',
    options: [
      { label: 'Less than 20', sublabel: 'Small but growing' },
      { label: '20 - 50', sublabel: 'Steady flow' },
      { label: '50 - 200', sublabel: 'High volume' },
      { label: '200+', sublabel: 'Enterprise level' },
    ],
  },
  {
    question: "What's your biggest challenge with incoming calls?",
    subtitle: 'Select the one that resonates most',
    key: 'biggest_challenge',
    options: [
      { label: 'Missing calls after hours', sublabel: 'Losing leads overnight' },
      { label: 'Long hold times', sublabel: 'Callers hang up waiting' },
      { label: 'Hiring receptionists', sublabel: 'Expensive and unreliable' },
      { label: 'All of the above', sublabel: 'We need help everywhere' },
    ],
  },
  {
    question: 'How do you currently handle incoming calls?',
    subtitle: "Be honest - we've seen it all",
    key: 'current_handling',
    options: [
      { label: 'We answer in-house', sublabel: 'Our team picks up the phone' },
      { label: 'Voicemail', sublabel: 'Hope callers leave messages' },
      { label: 'Answering service', sublabel: 'Third-party handles calls' },
      { label: "It's a mess", sublabel: 'We miss most of them' },
    ],
  },
  {
    question: "What's your average customer value?",
    subtitle: 'This helps us calculate the ROI we can deliver',
    key: 'avg_customer_value',
    options: [
      { label: 'Under $500', sublabel: 'High volume, lower ticket' },
      { label: '$500 - $2,000', sublabel: 'Sweet spot for most' },
      { label: '$2,000 - $10,000', sublabel: 'High-value services' },
      { label: '$10,000+', sublabel: 'Premium contracts' },
    ],
  },
];

/* ─── Testimonials ─── */

const TESTIMONIALS = [
  {
    name: 'Maria Santos',
    business: 'Glow & Grace Salon',
    quote: 'Every call gets answered now and my books are fuller than ever. My clients even compliment how easy it is to schedule.',
  },
  {
    name: 'Mike Thompson',
    business: 'Thompson Plumbing Co.',
    quote: 'Last month alone, it booked 23 jobs I would\'ve missed. Pays for itself ten times over.',
  },
  {
    name: 'Dr. Priya Sharma',
    business: 'Bright Smile Dental',
    quote: 'The AI handles routine calls now, so my staff can focus on patients. Wait times are down, satisfaction is up.',
  },
  {
    name: 'Carlos Rivera',
    business: 'Rivera HVAC Services',
    quote: 'A customer called at 2am during a heat wave and got their appointment booked. That\'s a customer for life.',
  },
];

function TestimonialCard({ name, business, quote }: { name: string; business: string; quote: string }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-brand-primary text-sm">{name}</p>
        <p className="text-slate-500 text-xs">{business}</p>
      </div>
    </div>
  );
}

const HEARTS = [
  { left: '5%', size: 18, duration: '7s', delay: '0s', color: 'text-red-400' },
  { left: '15%', size: 14, duration: '5.5s', delay: '1.2s', color: 'text-pink-300' },
  { left: '28%', size: 20, duration: '8s', delay: '0.5s', color: 'text-red-500' },
  { left: '40%', size: 12, duration: '6s', delay: '2.5s', color: 'text-pink-400' },
  { left: '52%', size: 16, duration: '7.5s', delay: '1s', color: 'text-red-300' },
  { left: '65%', size: 22, duration: '6.5s', delay: '3s', color: 'text-pink-500' },
  { left: '75%', size: 14, duration: '5s', delay: '0.8s', color: 'text-red-400' },
  { left: '88%', size: 18, duration: '7s', delay: '2s', color: 'text-pink-300' },
  { left: '95%', size: 12, duration: '6s', delay: '1.5s', color: 'text-red-300' },
  { left: '35%', size: 10, duration: '8.5s', delay: '3.5s', color: 'text-pink-400' },
  { left: '58%', size: 16, duration: '5.8s', delay: '0.3s', color: 'text-red-500' },
  { left: '82%', size: 20, duration: '7.2s', delay: '2.8s', color: 'text-pink-300' },
];

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className={`absolute bottom-0 animate-float-heart ${h.color}`}
          style={{
            left: h.left,
            fontSize: h.size,
            '--heart-duration': h.duration,
            '--heart-delay': h.delay,
          } as React.CSSProperties}
        >
          &#x2764;&#xFE0F;
        </span>
      ))}
    </div>
  );
}

function TestimonialsMarquee() {
  // Double the array for seamless loop
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

  return (
    <div className="mt-12 space-y-4 relative">
      <FloatingHearts />

      <p className="text-center text-sm font-semibold text-emerald-600 tracking-wide">Testimonials</p>
      <h3 className="text-2xl md:text-3xl font-extrabold text-brand-primary text-center">
        See Why Business Owners Love Us
      </h3>

      <div className="mt-8 space-y-4 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="animate-marquee-left flex gap-4 w-max">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} {...t} />
          ))}
        </div>
        {/* Row 2 — scrolls right */}
        <div className="animate-marquee-right flex gap-4 w-max">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Types ─── */

type Step = 'quiz' | 'done' | 'form' | 'success';

type FormStatus = 'idle' | 'submitting';

/* ─── Component ─── */

export default function QuizPage() {
  const [step, setStep] = useState<Step>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', businessName: '' });
  const [agreed, setAgreed] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

  const handleOptionClick = (option: QuizOption) => {
    const q = QUESTIONS[questionIndex];
    setAnswers((prev) => ({ ...prev, [q.key]: option.label }));

    if (questionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setQuestionIndex((i) => i + 1), 300);
    } else {
      setTimeout(() => setStep('done'), 300);
    }
  };

  // Auto-advance from "done" screen to form after 2.5s
  useEffect(() => {
    if (step !== 'done') return;
    const timer = setTimeout(() => setStep('form'), 2500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setFormError('Please agree to the terms to continue.');
      return;
    }
    setFormStatus('submitting');
    setFormError('');

    const body = new FormData();
    body.append('access_key', 'a9e80fab-4da4-44c6-b31f-3369557abdbe');
    body.append('subject', `Quiz Lead: ${formData.businessName || formData.name}`);
    body.append('from_name', 'Ragsites Quiz');
    body.append('name', formData.name);
    body.append('email', formData.email);
    body.append('phone', formData.phone);
    body.append('business_name', formData.businessName);

    // Append quiz answers
    for (const q of QUESTIONS) {
      body.append(q.key, answers[q.key] || '');
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      if (res.ok) {
        setStep('success');
      } else {
        setFormError('Something went wrong. Please try again.');
        setFormStatus('idle');
      }
    } catch {
      setFormError('Something went wrong. Please try again.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col">
      {/* Logo */}
      <div className="flex justify-center pt-6 pb-2">
        <button onClick={() => (window.location.href = '/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Ragsites" width={36} height={36} className="rounded-full" />
          <span className="text-2xl font-bold text-brand-primary">RAGSITES</span>
        </button>
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col items-center px-4 py-8 ${step === 'form' ? 'justify-start' : 'justify-center'}`}>
        <AnimatePresence mode="wait">
          {/* ─── Quiz Questions ─── */}
          {step === 'quiz' && (
            <motion.div
              key={`q-${questionIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl"
            >
              <div className="quiz-card rounded-3xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-brand-primary text-center leading-tight">
                  {QUESTIONS[questionIndex].question}
                </h1>
                <p className="text-slate-500 text-center mt-3 text-base">
                  {QUESTIONS[questionIndex].subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                  {QUESTIONS[questionIndex].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOptionClick(opt)}
                      className="group text-left px-6 py-5 rounded-2xl bg-brand-accent text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
                    >
                      <span className="block text-lg font-bold">{opt.label}</span>
                      <span className="block text-sm text-white/70 mt-0.5">{opt.sublabel}</span>
                    </button>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === questionIndex ? 'w-8 bg-brand-accent' : i < questionIndex ? 'w-2 bg-brand-accent/60' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Done Screen ─── */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className="quiz-card rounded-3xl p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-brand-primary mt-6">Done!</h2>
                <p className="text-slate-500 mt-1">You&apos;re a great fit</p>

                {/* Loading bar */}
                <div className="mt-6 mx-auto w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-accent rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.2, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Contact Form ─── */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="quiz-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
                <p className="text-center text-emerald-600 font-bold text-sm tracking-wide">
                  Congratulations &mdash; You Qualify!
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary text-center mt-2 leading-tight">
                  Get Your Free AI Receptionist Consultation
                </h1>
                <p className="text-slate-500 text-center mt-3 text-base max-w-lg mx-auto">
                  Based on your answers, you&apos;re a strong fit for an AI receptionist. Spots are limited &mdash; book your call below.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-5 max-w-md mx-auto">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="name"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="businessName"
                      required
                      placeholder="Business name"
                      value={formData.businessName}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (formError) setFormError('');
                      }}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
                    />
                    <span className="text-sm text-slate-500 leading-relaxed">
                      I agree to the terms &amp; conditions. By providing my phone number &amp; email, I consent to receive emails, text messages, and calls.
                    </span>
                  </label>

                  {formError && (
                    <p className="text-red-500 text-sm text-center">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 rounded-xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Book Free Consultation
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <TestimonialsMarquee />
            </motion.div>
          )}

          {/* ─── Success Screen ─── */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className="quiz-card rounded-3xl p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-brand-primary mt-6">You&apos;re All Set!</h2>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  We&apos;ll be in touch within 24 hours to schedule your free AI receptionist consultation.
                </p>

                <button
                  onClick={() => (window.location.href = '/')}
                  className="mt-8 px-8 py-3 rounded-xl border border-slate-200 text-brand-primary font-semibold hover:bg-slate-50 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
