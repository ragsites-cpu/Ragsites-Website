'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

const CAL_LINK = 'ragsite/30min';
const THANK_YOU_URL = '/go/thank-you';

/* ─── Analytics Helpers ─── */

const META_PIXEL_ID = '1749584679784093';

function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function trackMetaGo(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackSingle', META_PIXEL_ID, eventName, params);
  }
}

/**
 * Initializes Meta Pixel for /go page:
 * - Loads fbevents.js (if not already loaded)
 * - Inits pixel with ID 1749584679784093
 * - Fires PageView on mount
 * - Fires ViewContent once user scrolls past 25% of page
 */
function useMetaPixel() {
  const viewContentFired = useRef(false);

  useEffect(() => {
    // Load the SDK if not already present
    if (typeof window.fbq === 'undefined') {
      const n: any = (window.fbq = function (...args: unknown[]) {
        n.callMethod ? n.callMethod(...args) : n.queue.push(args);
      });
      (window as any)._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [] as unknown[][];
      const t = document.createElement('script');
      t.async = true;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const s = document.getElementsByTagName('script')[0];
      s?.parentNode?.insertBefore(t, s);
    }

    // Disable auto-config so Facebook doesn't auto-track "Subscribe" or other random button click events
    window.fbq('set', 'autoConfig', false, META_PIXEL_ID);
    window.fbq('init', META_PIXEL_ID);
    window.fbq('trackSingle', META_PIXEL_ID, 'PageView');
  }, []);

  // ViewContent on scroll engagement (25% of page)
  useEffect(() => {
    const handleScroll = () => {
      if (viewContentFired.current) return;
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.25) {
        viewContentFired.current = true;
        trackMetaGo('ViewContent', { content_name: '30 Roofs Landing' });
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/* ─── Cal.com Inline Booking ─── */

function CalInlineBooking() {
  const calReady = useRef(false);

  useEffect(() => {
    if (calReady.current) return;
    calReady.current = true;

    // Load Cal.com embed script
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
          elementOrSelector: '#cal-embed-modal',
          calLink: CAL_LINK,
          layout: 'month_view',
          config: { theme: 'dark' },
        });

        // Listen for successful booking → fire Schedule + redirect
        window.Cal('on', {
          action: 'bookingSuccessful',
          callback: () => {
            trackMetaGo('Schedule', { content_name: 'Cal.com Booking' });
            setTimeout(() => {
              window.location.href = THANK_YOU_URL;
            }, 1500);
          },
        });

        window.Cal('on', {
          action: 'bookingSuccessfulV2',
          callback: () => {
            trackMetaGo('Schedule', { content_name: 'Cal.com Booking' });
            setTimeout(() => {
              window.location.href = THANK_YOU_URL;
            }, 1500);
          },
        });

        window.Cal('ui', {
          theme: 'dark',
          styles: { branding: { brandColor: '#40c9ff' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      }
    }, 100);
  }, []);

  return (
    <motion.div
      key="booking"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
        Final Step
      </p>
      <h3 className="text-2xl font-bold text-white mb-2">
        Pick a Time That Works For You
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Select a date and time below to lock in your free strategy call.
      </p>
      <div
        id="cal-embed-modal"
        className="w-full min-h-[450px] rounded-xl overflow-hidden flex items-center justify-center"
      >
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#40c9ff] animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading calendar...</p>
        </div>
      </div>
    </motion.div>
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

const ROOFS_PER_MONTH = [
  '0 - 1 roofs per month',
  '2 - 4 roofs per month',
  '5 - 8 roofs per month',
  '9+ roofs per month',
];

const LICENSING_OPTIONS = [
  "Yes we're fully licensed, bonded, & insured",
  'We have some, but not all of these',
  'No, we\'re working on getting these in place',
  'No, I\'m not a roofing contractor',
];

type QuizStep = 'size' | 'roofs' | 'licensing' | 'contact' | 'roi' | 'disclaimers' | 'submitting' | 'done' | 'booking';

function QuestionnaireModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<QuizStep>('size');
  const [businessSize, setBusinessSize] = useState('');
  const [roofsPerMonth, setRoofsPerMonth] = useState('');
  const [licensingStatus, setLicensingStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    city: '',
  });
  const [timeline, setTimeline] = useState('');
  const [meetingCommit, setMeetingCommit] = useState(false);
  const [spamConsent, setSpamConsent] = useState(false);
  const [error, setError] = useState('');
  const calInitialized = useRef(false);

  const handleSizeSelect = (size: string) => {
    setBusinessSize(size);
    setTimeout(() => setStep('roofs'), 300);
  };

  const handleRoofsSelect = (value: string) => {
    setRoofsPerMonth(value);
    setTimeout(() => setStep('licensing'), 300);
  };

  const handleLicensingSelect = (value: string) => {
    setLicensingStatus(value);
    setTimeout(() => setStep('roi'), 300);
  };

  const handleTimelineSelect = (value: string) => {
    setTimeline(value);
    setTimeout(() => setStep('contact'), 300);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('disclaimers');
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
    body.append('roofs_per_month', roofsPerMonth);
    body.append('licensing_status', licensingStatus);
    body.append('timeline', timeline);
    body.append('campaign', '30 Roofs in 30 Days');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body,
      });
      if (res.ok) {
        setStep('done');
        setTimeout(() => {
          setStep('booking');
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
        className={`relative z-10 w-full dark-glass-card p-8 md:p-10 border-white/10 bg-[#0a0a0a] overflow-y-auto max-h-[90vh] ${step === 'booking' ? 'max-w-4xl' : 'max-w-lg'}`}
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
                Step 1 of 6
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

          {/* ─── Step 2: Roofs Per Month ─── */}
          {step === 'roofs' && (
            <motion.div
              key="roofs"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 2 of 6
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">
                Roughly how many roofs does your company typically complete in a month?
              </h3>
              <p className="text-slate-400 text-sm mb-8">This helps us understand your capacity</p>

              <div className="space-y-3">
                {ROOFS_PER_MONTH.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleRoofsSelect(option)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Step 3: Licensing Status ─── */}
          {step === 'licensing' && (
            <motion.div
              key="licensing"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 3 of 6
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">
                Are you licensed, bonded, &amp; insured?
              </h3>
              <p className="text-slate-400 text-sm mb-8">Select the option that best describes your situation</p>

              <div className="space-y-3">
                {LICENSING_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleLicensingSelect(option)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Step 5: Contact Info ─── */}
          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 5 of 6
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

          {/* ─── Step 4: Timeline ─── */}
          {step === 'roi' && (
            <motion.div
              key="roi"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 4 of 6
              </p>
              <h3 className="text-2xl font-bold text-white mb-2">
                If we are a good fit, when could we get started?
              </h3>
              <p className="text-slate-400 text-sm mb-8">Select the best option</p>

              <div className="space-y-3">
                {['This week', 'This month', 'Unsure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleTimelineSelect(option)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Step 6: Disclaimers ─── */}
          {step === 'disclaimers' && (
            <motion.div
              key="disclaimers"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                Step 6 of 6
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
                Loading the calendar...
              </p>
            </motion.div>
          )}

          {/* ─── Booking (Cal.com inline) ─── */}
          {step === 'booking' && (
            <CalInlineBooking />
          )}
        </AnimatePresence>

        {/* Progress dots */}
        {!['submitting', 'done', 'booking'].includes(step) && (
          <div className="flex justify-center gap-2 mt-8">
            {(['size', 'roofs', 'licensing', 'roi', 'contact', 'disclaimers'] as const).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${s === step
                  ? 'w-8 bg-gradient-skye'
                  : i < ['size', 'roofs', 'licensing', 'contact', 'roi', 'disclaimers'].indexOf(step)
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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Initialize Meta Pixel for this page
  useMetaPixel();

  const openQuiz = (source: string) => {
    trackMetaGo('Lead', { content_name: 'Book Call CTA', content_category: source });
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
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden pt-16 pb-4">
        {/* Background Video */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0 pointer-events-none" />

        {/* Glow orbs */}


        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500 border border-yellow-400"
          >
            <Zap className="w-5 h-5 text-black" />
            <span className="text-sm font-black tracking-wide text-black uppercase">
              WARNING: This Is ONLY For Roofers With Sub Crews That Can Handle 3 New Installs A Week.
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-4 leading-[1.1] tracking-tight text-white">
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
            className="text-2xl md:text-4xl font-black mb-6"
          >
            <span className="text-gradient-skye">Or You Don&apos;t Pay.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={() => openQuiz('hero')}
              className="group relative flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-gradient-skye text-2xl font-bold text-white shadow-[0_0_40px_rgba(232,28,255,0.4)] hover:shadow-[0_0_60px_rgba(64,201,255,0.6)] hover:scale-105 transition-all duration-300"
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

      {/* Reviews */}
      <section className="pt-8 pb-2 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-semibold text-[#40c9ff] tracking-wide uppercase mb-2">
            Real Results
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            What Roofing Contractors <span className="text-gradient-skye">Are Saying</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {['/review2.jpeg', '/review3.jpeg', '/review5.jpeg', '/review6.jpeg', '/review7.jpeg', '/review8.jpeg', '/review9.jpeg', '/review10.png'].map((src) => (
              <button key={src} onClick={() => setLightboxSrc(src)} className="rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300">
                <Image src={src} alt="Client review" width={600} height={450} className="w-full h-auto object-contain rounded-xl" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-6 pb-24 px-4 relative overflow-hidden">

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

      {/* Review Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="Review"
                width={1200}
                height={900}
                className="w-full h-auto rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questionnaire Modal */}
      <AnimatePresence>
        {showQuiz && <QuestionnaireModal onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </main>
  );
}
