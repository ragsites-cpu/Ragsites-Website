'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Globe, MapPin, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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

const CAL_LINK = 'ragsites/30min';
const THANK_YOU_URL = '/thank-you';

const QUESTIONS: QuizQuestion[] = [
  {
    question: "What's the size of your business?",
    subtitle: 'Annual revenue',
    key: 'business_size',
    options: [
      { label: 'Less than $200k', sublabel: 'Just getting started' },
      { label: '$200k - $400k', sublabel: 'Building momentum' },
      { label: '$400k - $1M', sublabel: 'Solid and growing' },
      { label: '$1M - $10M', sublabel: 'Established operation' },
      { label: '$10M+ per year', sublabel: 'Major player' },
    ],
  },
  {
    question: 'Roughly how many roofs does your company complete in a month?',
    subtitle: 'This helps us understand your capacity',
    key: 'roofs_per_month',
    options: [
      { label: '0 - 1 roofs per month', sublabel: 'Looking to grow' },
      { label: '2 - 4 roofs per month', sublabel: 'Steady workload' },
      { label: '5 - 8 roofs per month', sublabel: 'High capacity' },
      { label: '9+ roofs per month', sublabel: 'Full operation' },
    ],
  },
  {
    question: 'Are you licensed, bonded, & insured?',
    subtitle: 'Select the option that best describes your situation',
    key: 'licensing_status',
    options: [
      { label: "Yes we're fully licensed, bonded, & insured", sublabel: 'Ready to scale' },
      { label: 'We have some, but not all of these', sublabel: 'Working on it' },
      { label: "No, we're working on getting these in place", sublabel: 'In progress' },
      { label: "No, I'm not a roofing contractor", sublabel: 'Different industry' },
    ],
  },
  {
    question: 'If we are a good fit, when could we get started?',
    subtitle: 'Select the best option',
    key: 'timeline',
    options: [
      { label: 'This week', sublabel: 'Ready to go now' },
      { label: 'This month', sublabel: 'Soon but not immediately' },
      { label: 'Unsure', sublabel: 'Need more info first' },
    ],
  },
];

/* ─── Analytics Helper ─── */

function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function trackMeta(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
}

function trackMetaStandard(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}


/* ─── Types ─── */

type Step = 'quiz' | 'done' | 'form' | 'disclaimers' | 'submitting' | 'success' | 'booking';

type FormStatus = 'idle' | 'submitting';

/* ─── Component ─── */

export default function QuizPage() {
  return (
    <Suspense>
      <QuizContent />
    </Suspense>
  );
}

function QuizContent() {
  const [step, setStep] = useState<Step>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', website: '', city: '' });
  const [meetingCommit, setMeetingCommit] = useState(false);
  const [spamConsent, setSpamConsent] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; email?: string }>({});
  const [loadingMsg, setLoadingMsg] = useState(0);
  const searchParams = useSearchParams();
  const isPremium = searchParams.get('tier') === 'premium';

  const loadingMessages = [
    'Analyzing your answers...',
    'Matching you with the right plan...',
    'Calculating your potential ROI...',
    'You\'re a great fit!',
  ];

  const handleOptionClick = (option: QuizOption) => {
    const q = QUESTIONS[questionIndex];
    setAnswers((prev) => ({ ...prev, [q.key]: option.label }));
    trackEvent('quiz_step', { step: q.key, value: option.label, question_number: String(questionIndex + 1) });
    trackMeta('QuizStep', { step: q.key, value: option.label });

    if (questionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setQuestionIndex((i) => i + 1), 300);
    } else {
      trackEvent('quiz_complete', { source: 'main_quiz' });
      trackMeta('QuizComplete', { source: 'main_quiz' });
      setTimeout(() => setStep('form'), 300);
    }
  };

  // Cycle through loading messages then advance to booking
  useEffect(() => {
    if (step !== 'success') return;
    const msgInterval = setInterval(() => {
      setLoadingMsg((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 1200);
    const timer = setTimeout(() => setStep('booking'), 5000);
    return () => {
      clearInterval(msgInterval);
      clearTimeout(timer);
      setLoadingMsg(0);
    };
  }, [step]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formError) setFormError('');
    if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { phone?: string; email?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStep('disclaimers');
  };

  const handleFinalSubmit = async () => {
    if (!meetingCommit) {
      setFormError('Please confirm you can attend the call.');
      return;
    }
    if (!spamConsent) {
      setFormError('Please provide consent to continue.');
      return;
    }
    setFormError('');
    setStep('submitting');

    const body = new FormData();
    body.append('access_key', 'a9e80fab-4da4-44c6-b31f-3369557abdbe');
    body.append('subject', `Roofing Lead (Quiz): ${formData.name} — ${formData.city}`);
    body.append('from_name', 'Ragsites Quiz');
    body.append('name', formData.name);
    body.append('phone', formData.phone);
    body.append('email', formData.email);
    body.append('website', formData.website);
    body.append('city', formData.city);

    // Append quiz answers
    for (const q of QUESTIONS) {
      body.append(q.key, answers[q.key] || '');
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      if (res.ok) {
        trackEvent('generate_lead', { source: 'main_quiz', business: formData.name });
        trackMetaStandard('Lead', { content_name: 'Roofing Quiz', content_category: 'main_quiz' });
        setStep('success');
      } else {
        setFormError('Something went wrong. Please try again.');
        setStep('disclaimers');
      }
    } catch {
      setFormError('Something went wrong. Please try again.');
      setStep('disclaimers');
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col">
      {/* Logo */}
      <div className="flex justify-center pt-6 pb-2">
        <button onClick={() => (window.location.href = '/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/new-logo.png" alt="Ragsites" width={36} height={36} />
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

          {/* ─── Step 5: Contact Form ─── */}
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
                <p className="text-center text-emerald-600 font-bold text-sm tracking-wide uppercase">
                  Step 5 of 6
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary text-center mt-2 leading-tight">
                  Your Contact Details
                </h1>
                <p className="text-slate-500 text-center mt-3 text-base max-w-lg mx-auto">
                  So we can reach out and schedule your strategy call
                </p>

                <form onSubmit={handleContactSubmit} className="mt-10 space-y-5 max-w-md mx-auto">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="name"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.phone ? 'text-red-500' : 'text-slate-400'}`} />
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white border ${fieldErrors.phone ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 text-brand-primary focus:border-brand-accent focus:ring-brand-accent'} placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-colors text-base`}
                      />
                    </div>
                    {fieldErrors.phone && <p className="text-red-500 text-sm mt-1 px-1 font-bold">{fieldErrors.phone}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.email ? 'text-red-500' : 'text-slate-400'}`} />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleFormChange}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white border ${fieldErrors.email ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 text-brand-primary focus:border-brand-accent focus:ring-brand-accent'} placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-colors text-base`}
                      />
                    </div>
                    {fieldErrors.email && <p className="text-red-500 text-sm mt-1 px-1 font-bold">{fieldErrors.email}</p>}
                  </div>

                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="website"
                      placeholder="Company website"
                      value={formData.website}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="city"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-brand-primary placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors text-base"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ─── Step 6: Disclaimers ─── */}
          {step === 'disclaimers' && (
            <motion.div
              key="disclaimers"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="quiz-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
                <p className="text-center text-emerald-600 font-bold text-sm tracking-wide uppercase">
                  Step 6 of 6
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary text-center mt-2 leading-tight">
                  Almost There!
                </h1>

                <div className="mt-8 space-y-4 max-w-md mx-auto">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">
                      <span className="text-brand-primary font-bold">DISCLAIMER:</span> This meeting will be hosted on Google Meet, the link will be sent in the confirmation email. We have a waiting list and limit the number of clients we take on each month. If you need to reschedule, you must let us know 24h prior to our call.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={meetingCommit}
                        onChange={(e) => {
                          setMeetingCommit(e.target.checked);
                          if (formError) setFormError('');
                        }}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <span className="text-sm text-slate-700">
                        Will you be able to commit and attend to this call at the time of this booking?
                      </span>
                    </label>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={spamConsent}
                        onChange={(e) => {
                          setSpamConsent(e.target.checked);
                          if (formError) setFormError('');
                        }}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <span className="text-sm text-slate-700">
                        We hate spammers and will never spam you. Do you consent to us reaching out in a meaningful way regarding this offer?
                      </span>
                    </label>
                  </div>

                  {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}

                  <button
                    onClick={handleFinalSubmit}
                    className="w-full py-4 rounded-xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    Book My Call Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Submitting ─── */}
          {step === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className="quiz-card rounded-3xl p-12 text-center">
                <Loader2 className="w-12 h-12 text-brand-accent mx-auto mb-4 animate-spin" />
                <p className="text-brand-primary font-bold text-lg">Reserving your spot...</p>
              </div>
            </motion.div>
          )}

          {/* ─── Success Screen (loading animation before booking) ─── */}
          {step === 'success' && (
            <motion.div
              key="success"
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
                  className="w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center mx-auto"
                >
                  {loadingMsg < 3 ? (
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  ) : (
                    <CheckCircle className="w-10 h-10 text-white" />
                  )}
                </motion.div>

                <div className="mt-6 h-16 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={loadingMsg}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-brand-primary">
                        {loadingMessages[loadingMsg]}
                      </h2>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6 mx-auto w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-accent rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.8, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Cal.com Inline Booking ─── */}
          {step === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="quiz-card rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-brand-primary text-center mb-2">Pick a Time That Works For You</h2>
                <p className="text-slate-500 text-center mb-6 text-sm">Select a date and time below to lock in your free strategy call.</p>
                <CalEmbed name={formData.name} email={formData.email} phone={formData.phone} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CalEmbed({ name, email, phone }: { name?: string; email?: string; phone?: string }) {
  const calReady = useRef(false);
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    if (calReady.current) return;
    calReady.current = true;

    (function (C: any, A: any, L: string) {
      const p = function () {
        if (!(C.Cal as any)?.loaded) {
          (C.Cal as any) = function (...args: unknown[]) {
            (C.Cal as any).q = (C.Cal as any).q || [];
            (C.Cal as any).q.push(args);
          };
          (C.Cal as any).ns = {};
          (C.Cal as any).loaded = true;
          const d = A as Document;
          const s = d.createElement(L) as HTMLScriptElement;
          s.async = true;
          s.src = 'https://app.cal.com/embed/embed.js';
          d.head.appendChild(s);
        }
      };
      p();
    })(window, document, 'script');

    setTimeout(() => {
      if (typeof window.Cal === 'function') {
        window.Cal('init', { origin: 'https://app.cal.com' });
        window.Cal('inline', {
          elementOrSelector: '#cal-embed-quiz',
          calLink: CAL_LINK,
          layout: 'month_view',
          config: {
            theme: 'light',
            name: name || undefined,
            email: email || undefined,
            phoneNumber: phone ? `+1${phone.replace(/\D/g, '').replace(/^1/, '')}` : undefined,
          },
        });
        window.Cal('on', {
          action: 'bookingSuccessful',
          callback: () => {
            trackMetaStandard('Schedule', { content_name: 'Cal.com Booking' });
            setTimeout(() => {
              window.location.href = THANK_YOU_URL;
            }, 1500);
          },
        });
        window.Cal('on', {
          action: '__iframeReady',
          callback: () => setCalLoaded(true),
        });
        window.Cal('ui', {
          styles: { branding: { brandColor: '#40c9ff' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      }
    }, 100);
  }, []);

  return (
    <div id="cal-embed-quiz" className="w-full min-h-[450px] rounded-xl overflow-hidden flex items-center justify-center">
      {!calLoaded && (
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-accent mx-auto mb-3 animate-spin" />
          <p className="text-slate-500 text-sm">Loading calendar...</p>
        </div>
      )}
    </div>
  );
}
