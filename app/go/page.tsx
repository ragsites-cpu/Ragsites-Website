'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  ArrowRight,
  Loader2,
  X,
  User,
  Mail,
  Globe,
  MapPin,
  Zap,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';

/* ─── Configuration ─── */

const BOOKING_URL = 'https://cal.com/ragsite/30min?user=ragsite';

/* ─── Analytics Helper ─── */

function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function trackMeta(eventName: string, params?: Record<string, string | boolean>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
}

function trackMetaStandard(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}

/* ─── Review Images ─── */

const REVIEW_IMAGES = [
  '/reveiw1.jpeg',
  '/review2.jpeg',
  '/review3.jpeg',
  '/review4.jpeg',
  '/review5.jpeg',
  '/review6.jpeg',
  '/review7.jpeg',
  '/review8.jpeg',
  '/review9.jpeg',
];

/* ─── Floating Hearts ─── */

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

/* ─── Reviews Carousel ─── */

function ReviewsCarousel() {
  const row1 = [...REVIEW_IMAGES, ...REVIEW_IMAGES];
  const row2 = [...[...REVIEW_IMAGES].reverse(), ...[...REVIEW_IMAGES].reverse()];

  return (
    <section className="py-10 px-4 relative overflow-hidden">
      <FloatingHearts />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-center text-sm font-semibold text-[#40c9ff] tracking-wide uppercase mb-2">
          Real Results
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
          What Roofing Contractors <span className="text-gradient-skye">Are Saying</span>
        </h2>

        <div className="space-y-4 overflow-hidden">
          <div className="animate-marquee-left flex gap-4 w-max">
            {row1.map((src, i) => (
              <div key={`r1-${i}`} className="flex-shrink-0 w-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <Image src={src} alt="Client review" width={400} height={300} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
          <div className="animate-marquee-right flex gap-4 w-max">
            {row2.map((src, i) => (
              <div key={`r2-${i}`} className="flex-shrink-0 w-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <Image src={src} alt="Client review" width={400} height={300} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Questionnaire Modal ─── */

const BUSINESS_SIZES = [
  'Less than $200k',
  '$200k - $400k',
  '$400k - $1M',
  '$1M - $10M',
  '$10M+ per year',
];

type QuizStep = 'size' | 'contact' | 'roi' | 'disclaimers' | 'submitting' | 'done';

function QuestionnaireModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<QuizStep>('size');
  const [businessSize, setBusinessSize] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    city: '',
  });
  const [canInvest, setCanInvest] = useState<boolean | null>(null);
  const [meetingCommit, setMeetingCommit] = useState(false);
  const [spamConsent, setSpamConsent] = useState(false);
  const [error, setError] = useState('');

  const handleSizeSelect = (size: string) => {
    setBusinessSize(size);
    trackEvent('quiz_step', { step: 'business_size', value: size });
    trackMeta('QuizStep', { step: 'business_size', value: size });
    setTimeout(() => setStep('contact'), 300);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('quiz_step', { step: 'contact_info' });
    trackMeta('QuizStep', { step: 'contact_info' });
    setStep('roi');
  };

  const handleRoiSelect = (value: boolean) => {
    setCanInvest(value);
    trackEvent('quiz_step', { step: 'roi_question', value: value ? 'yes' : 'no' });
    trackMeta('QuizStep', { step: 'roi_question', value: value ? 'yes' : 'no' });
    setTimeout(() => setStep('disclaimers'), 300);
  };

  const handleFinalSubmit = async () => {
    if (!meetingCommit) {
      setError('Please confirm you can attend the call.');
      return;
    }
    if (!spamConsent) {
      setError('Please provide consent to continue.');
      return;
    }
    setError('');
    setStep('submitting');

    const body = new FormData();
    body.append('access_key', 'a9e80fab-4da4-44c6-b31f-3369557abdbe');
    body.append('subject', `Roofing Lead: ${formData.name} — ${formData.city}`);
    body.append('from_name', 'Ragsites Roofing Landing');
    body.append('name', formData.name);
    body.append('phone', formData.phone);
    body.append('email', formData.email);
    body.append('website', formData.website);
    body.append('city', formData.city);
    body.append('business_size', businessSize);
    body.append('can_invest_1000_roi', canInvest ? 'Yes' : 'No');
    body.append('campaign', '30 Roofs in 30 Days');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body,
      });
      if (res.ok) {
        trackEvent('generate_lead', { source: 'roofing_landing', business_size: businessSize });
        trackMetaStandard('Lead', { content_name: '30 Roofs in 30 Days', content_category: 'roofing_landing' });
        setStep('done');
        setTimeout(() => {
          trackEvent('booking_redirect', { source: 'roofing_landing' });
          trackMetaStandard('Schedule', { content_name: 'Cal.com Booking' });
          window.location.href = BOOKING_URL;
        }, 2000);
      } else {
        setError('Something went wrong. Please try again.');
        setStep('disclaimers');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setStep('disclaimers');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg dark-glass-card p-8 md:p-10 border-white/10 bg-[#0a0a0a] overflow-y-auto max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <AnimatePresence mode="wait">
          {/* ─── Step 1: Business Size ─── */}
          {step === 'size' && (
            <motion.div
              key="size"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 1 of 4
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">
                What&apos;s the size of your business?
              </h3>
              <p className="text-slate-400 text-sm mb-8">Annual revenue</p>

              <div className="space-y-3">
                {BUSINESS_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Step 2: Contact Info ─── */}
          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 2 of 4
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">Your Contact Details</h3>
              <p className="text-slate-400 text-sm mb-8">
                So we can reach out and schedule your strategy call
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="name"
                    required
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#40c9ff] focus:ring-1 focus:ring-[#40c9ff] transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#40c9ff] focus:ring-1 focus:ring-[#40c9ff] transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#40c9ff] focus:ring-1 focus:ring-[#40c9ff] transition-colors"
                  />
                </div>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="website"
                    placeholder="Company website"
                    value={formData.website}
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#40c9ff] focus:ring-1 focus:ring-[#40c9ff] transition-colors"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="city"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#40c9ff] focus:ring-1 focus:ring-[#40c9ff] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-skye text-white font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(232,28,255,0.3)] flex items-center justify-center gap-2 mt-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}

          {/* ─── Step 3: ROI Question ─── */}
          {step === 'roi' && (
            <motion.div
              key="roi"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 3 of 4
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">One Quick Question</h3>
              <p className="text-slate-300 text-lg mt-6 mb-8 leading-relaxed">
                If there was a 1000% <span className="text-[#40c9ff] font-bold">GUARANTEED</span>{' '}
                ROI &mdash; do you have the financial ability to invest?
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleRoiSelect(true)}
                  className="px-6 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleRoiSelect(false)}
                  className="px-6 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  No
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Step 4: Disclaimers ─── */}
          {step === 'disclaimers' && (
            <motion.div
              key="disclaimers"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 4 of 4
              </p>
              <h3 className="text-2xl font-bold text-white mb-6">Almost There!</h3>

              {/* Meeting Disclaimer */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <span className="text-white font-bold">DISCLAIMER:</span> This meeting will be
                  hosted on Google Meet, the link will be sent in the confirmation email. We have a
                  waiting list and limit the number of clients we take on each month. If you need to
                  reschedule, you must let us know 24h prior to our call.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meetingCommit}
                    onChange={(e) => {
                      setMeetingCommit(e.target.checked);
                      if (error) setError('');
                    }}
                    className="mt-1 w-4 h-4 rounded border-slate-600 text-[#40c9ff] focus:ring-[#40c9ff] bg-transparent"
                  />
                  <span className="text-sm text-slate-300">
                    Will you be able to commit and attend to this call at the time of this booking?
                  </span>
                </label>
              </div>

              {/* Spam Disclaimer */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={spamConsent}
                    onChange={(e) => {
                      setSpamConsent(e.target.checked);
                      if (error) setError('');
                    }}
                    className="mt-1 w-4 h-4 rounded border-slate-600 text-[#40c9ff] focus:ring-[#40c9ff] bg-transparent"
                  />
                  <span className="text-sm text-slate-300">
                    We hate spammers and will never spam you. Do you consent to us reaching out in a
                    meaningful way regarding this offer?
                  </span>
                </label>
              </div>

              {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

              <button
                onClick={handleFinalSubmit}
                className="w-full py-4 rounded-xl bg-gradient-skye text-white font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(232,28,255,0.3)] flex items-center justify-center gap-2"
              >
                Book My Call Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* ─── Submitting ─── */}
          {step === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <Loader2 className="w-12 h-12 text-[#40c9ff] animate-spin mx-auto mb-4" />
              <p className="text-white font-bold text-lg">Reserving your spot...</p>
            </motion.div>
          )}

          {/* ─── Done ─── */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You&apos;re In!</h3>
              <p className="text-slate-400 text-sm">
                Redirecting you to book your call...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        {!['submitting', 'done'].includes(step) && (
          <div className="flex justify-center gap-2 mt-8">
            {(['size', 'contact', 'roi', 'disclaimers'] as const).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-gradient-skye'
                    : i < ['size', 'contact', 'roi', 'disclaimers'].indexOf(step)
                    ? 'w-2 bg-[#40c9ff]/60'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── FAQs ─── */

const FAQS = [
  {
    question: 'What Do You Guys Do?',
    answer:
      'Ragsites is a leading AI-powered lead generation solution dedicated to helping roofers grow their business. We dominate both organic and paid traffic to establish you as a trusted pillar in your community, crafting compelling ads and personalized AI lead qualification systems that ensure a successful launch and rapid results. Our streamlined, automated system pre-qualifies your leads before you go out for estimates, allowing you to focus on closing deals and scaling your roofing business with confidence.',
  },
  {
    question: 'How Much Does It Cost?',
    answer:
      "How much is it worth to you? If we added an additional $150k to your top line in the next 3 months, what would you be willing to pay?\n\nWe don't have a one-size-fits-all approach. We build a customized game plan tailored to your specific needs and will try to work within your budget if possible.\n\nIf you are a tire-kicker looking for the cheapest way to \"get more leads\" — we are not a good fit for you. If you want serious, pre-qualified exclusive booked estimates — we've got you.",
  },
  {
    question: 'Do You Pre-Qualify Leads?',
    answer:
      "Every lead we deliver is thoroughly pre-qualified through a proven system of targeted assessments and AI-powered filters that verify each prospect's intent, interest, and readiness to buy. By ensuring only serious homeowners make it through, we save your team time, increase the efficiency of your sales process, and maximize your chances of closing successful deals.",
  },
  {
    question: 'Do I Own Everything?',
    answer:
      'We believe in giving our clients complete ownership and control. Every system we build and integrate into your business is 100% yours, providing the freedom and flexibility to manage and operate it independently if you choose. Our goal is to ensure you have full command over the tools and strategies we implement, so your business can continue to grow and thrive with or without our direct involvement.',
  },
  {
    question: 'How Do You Guarantee Results?',
    answer:
      "Our confidence in delivering results comes from a proven track record of success. We've refined our AI-driven systems into a set of strategies that consistently produce measurable outcomes. By leveraging these tested methods, we ensure every client experiences significant improvements in both operations and sales — allowing us to confidently guarantee 30 roof replacement jobs in 30 days or you don't pay.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-bold text-white group-hover:text-[#40c9ff] transition-colors pr-4">
          {question}
        </span>
        <span className={`text-2xl text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */

export default function RoofingLanding() {
  const [showQuiz, setShowQuiz] = useState(false);

  const openQuiz = (source: string) => {
    trackEvent('cta_click', { source });
    trackMetaStandard('ViewContent', { content_name: 'Book Call CTA', content_category: source });
    setShowQuiz(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Simple top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
            <span className="text-xl font-bold text-white">RAGSITES</span>
          </div>
          <button
            onClick={() => openQuiz('navbar')}
            className="px-5 py-2 rounded-full bg-gradient-skye text-white font-semibold text-sm shadow-[0_0_15px_rgba(232,28,255,0.4)] hover:scale-105 transition-all"
          >
            Book Call Now
          </button>
        </div>
      </div>

      {/* Hero Section — matching main page style */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-24 pb-8">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0 pointer-events-none" />

        {/* Glow orbs */}
        <div className="glow-orb glow-orb-purple w-[600px] h-[600px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40 z-0" />
        <div className="glow-orb glow-orb-blue w-[500px] h-[500px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-30 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-500 border border-yellow-400"
          >
            <Zap className="w-5 h-5 text-black" />
            <span className="text-sm font-black tracking-wide text-black uppercase">
              WARNING: This Is ONLY For Roofers With Sub Crews That Can Handle 3 New Installs A Week.
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight text-white">
            {'30 Roof Replacement'.split('').map((char, i) => (
              <motion.span
                key={`line1-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: 0.2 + i * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            {'Jobs in 30 Days.'.split('').map((char, i) => (
              <motion.span
                key={`line2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.03,
                  delay: 0.2 + 20 * 0.04 + i * 0.04,
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-2xl md:text-4xl font-black mb-10"
          >
            <span className="text-gradient-skye">Or You Don&apos;t Pay.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={() => openQuiz('hero')}
              className="group relative flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-gradient-skye text-2xl font-bold text-white shadow-[0_0_40px_rgba(232,28,255,0.4)] hover:shadow-[0_0_60px_rgba(64,201,255,0.6)] hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <Phone className="w-8 h-8 animate-pulse" />
              Book Call Now
            </button>
            <p className="text-slate-400 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Limited spots available &mdash; only 5 new clients per month
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <ReviewsCarousel />

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="glow-orb glow-orb-purple w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready for 30 Jobs <span className="text-gradient-skye">This Month?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
            Stop chasing leads. Let our AI fill your schedule with qualified roof replacement jobs —
            guaranteed.
          </p>
          <button
            onClick={() => openQuiz('bottom_cta')}
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-gradient-skye text-2xl font-bold text-white shadow-[0_0_40px_rgba(232,28,255,0.4)] hover:shadow-[0_0_60px_rgba(64,201,255,0.6)] hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            Book Call Now
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Got A <span className="text-gradient-skye">Question?</span>
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Here are some of the most common questions we get.
          </p>
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-slate-400">
            Ragsites &copy; 2025 - All Rights Reserved
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
            This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
        </div>
      </footer>

      {/* Questionnaire Modal */}
      <AnimatePresence>
        {showQuiz && <QuestionnaireModal onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </main>
  );
}
