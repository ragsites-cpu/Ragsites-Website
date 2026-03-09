'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

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

const CAL_LINK = 'ragsites/30min';
const THANK_YOU_URL = '/thank-you';

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

function CalInlineBooking({ name, email }: { name?: string; email?: string }) {
  const calReady = useRef(false);
  const [calLoaded, setCalLoaded] = useState(false);

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
          config: {
            theme: 'dark',
            name: name || undefined,
            email: email || undefined,
          },
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
          action: '__iframeReady',
          callback: () => setCalLoaded(true),
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
    <div
      key="booking"
    >
      <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
        Final Step
      </p>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Pick a Time That Works For You
      </h3>
      <p className="text-slate-600 text-sm mb-6">
        Select a date and time below to lock in your free strategy call.
      </p>
      <div
        id="cal-embed-modal"
        className="w-full min-h-[450px] rounded-xl overflow-hidden flex items-center justify-center"
      >
        {!calLoaded && (
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-[#991b1b]  mx-auto mb-3" />
            <p className="text-slate-600 text-sm">Loading calendar...</p>
          </div>
        )}
      </div>
    </div>
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
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; email?: string }>({});
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
    if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative z-10 w-full glass-card p-8 md:p-10 border-slate-200 bg-white overflow-y-auto max-h-[90vh] ${step === 'booking' ? 'max-w-4xl' : 'max-w-lg'}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-slate-900" />
        </button>

        <>
          {/* ─── Step 1: Business Size ─── */}
          {step === 'size' && (
            <div
              key="size"
            >
              <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
                Step 1 of 6
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                What&apos;s the size of your business?
              </h3>
              <p className="text-slate-600 text-sm mb-8">Annual revenue</p>

              <div className="space-y-3">
                {BUSINESS_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 2: Roofs Per Month ─── */}
          {step === 'roofs' && (
            <div
              key="roofs"
            >
              <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
                Step 2 of 6
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Roughly how many roofs does your company typically complete in a month?
              </h3>
              <p className="text-slate-600 text-sm mb-8">This helps us understand your capacity</p>

              <div className="space-y-3">
                {ROOFS_PER_MONTH.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleRoofsSelect(option)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 3: Licensing Status ─── */}
          {step === 'licensing' && (
            <div
              key="licensing"
            >
              <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
                Step 3 of 6
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Are you licensed, bonded, &amp; insured?
              </h3>
              <p className="text-slate-600 text-sm mb-8">Select the option that best describes your situation</p>

              <div className="space-y-3">
                {LICENSING_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleLicensingSelect(option)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 5: Contact Info ─── */}
          {step === 'contact' && (
            <div
              key="contact"
            >
              <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
                Step 5 of 6
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Contact Details</h3>
              <p className="text-slate-600 text-sm mb-8">
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
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#991b1b] focus:ring-1 focus:ring-[#991b1b] transition-colors"
                  />
                </div>
                <div>
                  <div className="relative">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.phone ? 'text-red-500' : 'text-slate-500'}`} />
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border ${fieldErrors.phone ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 text-slate-900 focus:border-[#991b1b] focus:ring-[#991b1b]'} placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-colors`}
                    />
                  </div>
                  {fieldErrors.phone && <p className="text-red-500 text-sm mt-1 px-1 font-bold">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${fieldErrors.email ? 'text-red-500' : 'text-slate-500'}`} />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border ${fieldErrors.email ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 text-slate-900 focus:border-[#991b1b] focus:ring-[#991b1b]'} placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-colors`}
                    />
                  </div>
                  {fieldErrors.email && <p className="text-red-500 text-sm mt-1 px-1 font-bold">{fieldErrors.email}</p>}
                </div>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    name="website"
                    placeholder="Company website"
                    value={formData.website}
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#991b1b] focus:ring-1 focus:ring-[#991b1b] transition-colors"
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
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#991b1b] focus:ring-1 focus:ring-[#991b1b] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-skye text-white font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(153,27,27,0.3)] flex items-center justify-center gap-2 mt-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* ─── Step 4: Timeline ─── */}
          {step === 'roi' && (
            <div
              key="roi"
            >
              <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
                Step 4 of 6
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                If we are a good fit, when could we get started?
              </h3>
              <p className="text-slate-600 text-sm mb-8">Select the best option</p>

              <div className="space-y-3">
                {['This week', 'This month', 'Unsure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleTimelineSelect(option)}
                    className="w-full text-left px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium hover:bg-gradient-skye hover:border-transparent transition-all duration-200 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 6: Disclaimers ─── */}
          {step === 'disclaimers' && (
            <div
              key="disclaimers"
            >
              <p className="text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-3">
                Step 6 of 6
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Almost There!</h3>

              {/* Meeting Disclaimer */}
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 mb-4">
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  <span className="text-slate-900 font-bold">DISCLAIMER:</span> This meeting will be
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
                    className="mt-1 w-4 h-4 rounded border-slate-600 text-[#991b1b] focus:ring-[#991b1b] bg-transparent"
                  />
                  <span className="text-sm text-slate-700">
                    Will you be able to commit and attend to this call at the time of this booking?
                  </span>
                </label>
              </div>

              {/* Spam Disclaimer */}
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={spamConsent}
                    onChange={(e) => {
                      setSpamConsent(e.target.checked);
                      if (error) setError('');
                    }}
                    className="mt-1 w-4 h-4 rounded border-slate-600 text-[#991b1b] focus:ring-[#991b1b] bg-transparent"
                  />
                  <span className="text-sm text-slate-700">
                    We hate spammers and will never spam you. Do you consent to us reaching out in a
                    meaningful way regarding this offer?
                  </span>
                </label>
              </div>

              {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

              <button
                onClick={handleFinalSubmit}
                className="w-full py-4 rounded-xl bg-gradient-skye text-white font-bold text-lg hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(153,27,27,0.3)] flex items-center justify-center gap-2"
              >
                Book My Call Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* ─── Submitting ─── */}
          {step === 'submitting' && (
            <div
              key="submitting"
              className="text-center py-8"
            >
              <Loader2 className="w-12 h-12 text-[#991b1b]  mx-auto mb-4" />
              <p className="text-slate-900 font-bold text-lg">Reserving your spot...</p>
            </div>
          )}

          {/* ─── Done ─── */}
          {step === 'done' && (
            <div
              key="done"
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">You&apos;re In!</h3>
              <p className="text-slate-600 text-sm">
                Loading the calendar...
              </p>
            </div>
          )}

          {/* ─── Booking (Cal.com inline) ─── */}
          {step === 'booking' && (
            <CalInlineBooking name={formData.name} email={formData.email} />
          )}
        </>

        {/* Progress dots */}
        {!['submitting', 'done', 'booking'].includes(step) && (
          <div className="flex justify-center gap-2 mt-8">
            {(['size', 'roofs', 'licensing', 'roi', 'contact', 'disclaimers'] as const).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${s === step
                  ? 'w-8 bg-gradient-skye'
                  : i < ['size', 'roofs', 'licensing', 'contact', 'roi', 'disclaimers'].indexOf(step)
                    ? 'w-2 bg-[#991b1b]/60'
                    : 'w-2 bg-white/20'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FAQs ─── */

const FAQS = [
  {
    question: 'What Do You Guys Do?',
    answer:
      'Ragsites is a leading AI-powered lead and revenue generation solution dedicated to helping roofers grow their business. We dominate both organic and paid traffic to establish you as a trusted pillar in your community, crafting compelling ads and personalized AI lead qualification systems that ensure a successful launch and rapid results. Our streamlined, automated system pre-qualifies your leads before you go out for estimates, allowing you to focus on closing deals and scaling your roofing business with confidence.',
  },
  {
    question: 'How Much Does It Cost?',
    answer:
      "Think about it this way: if we put an extra $150k on your books over the next 90 days, what would that be worth to you?\n\nThere is no cookie-cutter pricing here. Every plan we put together is built around your business, your goals, and your budget.\n\nIf you are shopping around for the cheapest lead source, we are probably not the right fit. But if you want exclusive, pre-qualified roof replacement estimates on your calendar, that is exactly what we deliver.",
  },
  {
    question: 'Do You Pre-Qualify Leads?',
    answer:
      "Absolutely. Before a lead ever reaches your team, it goes through our multi-step qualification process powered by AI. We verify homeowner status, project scope, damage type, and buying intent so your crew only shows up to appointments that are worth the trip. No more wasted afternoons chasing tire kickers.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-[#991b1b] transition-colors pr-4">
          {question}
        </span>
        <span className={`text-2xl text-slate-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <>
        {isOpen && (
          <div
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </div>
        )}
      </>
    </div>
  );
}

/* ─── Main Page ─── */

export default function RoofingLanding() {
  const [showQuiz, setShowQuiz] = useState(false);

  // Initialize Meta Pixel for this page
  useMetaPixel();

  const openQuiz = (source: string) => {
    trackMetaGo('Lead', { content_name: 'Book Call CTA', content_category: source });
    setShowQuiz(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Simple top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900/40 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
            <span className="text-xl font-bold text-slate-900">RAGSITES</span>
          </div>
          <button
            onClick={() => openQuiz('navbar')}
            className="px-5 py-2 rounded-full bg-gradient-skye text-white font-semibold text-sm shadow-[0_0_15px_rgba(153,27,27,0.4)] hover:scale-105 transition-all"
          >
            Book Call Now
          </button>
        </div>
      </div>

      {/* Hero Section — matching main page style */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden pt-16 pb-4">
        {/* Background Video */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-50/50 to-slate-50 z-0 pointer-events-none" />

        {/* Glow orbs */}


        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500 border border-yellow-400"
          >
            <Zap className="w-5 h-5 text-black" />
            <span className="text-sm font-black tracking-wide text-black uppercase">
              WARNING: This Is ONLY For Roofers With Crews That Can Handle New Installs Weekly.
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] mb-12 leading-[1.1] tracking-normal text-slate-900 uppercase font-black flex flex-col items-center"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.05)' }}
          >
            <div className="flex flex-wrap justify-center items-end gap-x-3 gap-y-3 text-center px-2">
              <span>30 ROOF REPLACEMENT</span>
              <span>JOBS IN 30 DAYS</span>
              <span>OR</span>
            </div>
            <div className="flex flex-wrap justify-center mt-3 md:mt-5 text-center">
              <span className="text-gradient-skye border-b-[6px] md:border-b-[8px] border-[#991b1b] pb-0 md:pb-1 leading-[0.85]">
                YOU DON&apos;T PAY
              </span>
            </div>
          </h1>

          <div
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={() => openQuiz('hero')}
              className="group relative flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-gradient-skye text-2xl font-bold text-white shadow-[0_0_40px_rgba(153,27,27,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <Phone className="w-8 h-8 " />
              Book Call Now
            </button>
            <p className="text-slate-600 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 " />
              Limited spots available &mdash; only 5 new clients per month
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="pt-8 pb-2 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-semibold text-[#991b1b] tracking-wide uppercase mb-2">
            Real Results
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Our <span className="text-gradient-skye">Success Stories</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:gap-12 mb-16 max-w-3xl mx-auto">
            {[
              { id: '21FnKkcSO35SRsOPw3CvxBmBL3HfSh6hPvxfPUIt1pE', before: '"From \'Chuck in a Truck\' to ', highlight: '30+ Extra Sales Monthly', after: '"' },
              { id: 'vHFqs02Mc6rOksLZ02nmKPgdl7WEwKZO00YiE01Vbk0001Vf8', before: '"It\'s A ', highlight: 'Game Changer', after: '"' },
              { id: 'cc02iEl00DqKNsS8RgywwL90202rxFwQwC01vqUmKF01AQsJk', before: '"It\'s Not Just Leads, It\'s ', highlight: 'Actual Work', after: '"' },
              { id: 'wEYR00xmhOjwjL3XLztNIBShHzPuDkewDvs9WosXYOYM', before: '"', highlight: 'I\'m Not Chasing People', after: ' Who Aren\'t Interested"' },
              { id: '11mLPLDOWTi02LW2PsM00TEENCkkTFf7H1QDqwPUye9DM', before: '"', highlight: 'I Got My Life Back', after: '"' },
              { id: 'cMqAuUp2KtjGB6iGF9RFR62JkRRLWBVplKAr01p8L2Js', before: '"I\'m ', highlight: 'Not on the Phone', after: ' Until 9 PM Anymore"' },
              { id: 'eEuKPe3XUUicrWrV8Oj259ca7xyTgyNlOeDOIfX01R02o', before: '"Doubled Booking Rate to ', highlight: '44% in Just One Month', after: '"' },
            ].map((video, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-lg md:text-xl font-black text-slate-900 mb-3 text-center">{video.before}<span className="text-[#991b1b] underline">{video.highlight}</span>{video.after}</p>
                <div className="rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-200 aspect-video">
                  <iframe
                    src={`https://player.mux.com/${video.id}`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={`Success Story Video ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Got A <span className="text-gradient-skye">Question?</span>
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Here are some of the most common questions we get.
          </p>
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
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
          <p className="text-xl text-slate-700 mb-10 max-w-xl mx-auto">
            Stop chasing leads. Let our AI fill your schedule with qualified roof replacement jobs —
            guaranteed.
          </p>
          <button
            onClick={() => openQuiz('bottom_cta')}
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-gradient-skye text-2xl font-bold text-white shadow-[0_0_40px_rgba(153,27,27,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            Book Call Now
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-slate-600">
            Ragsites &copy; 2025 - All Rights Reserved
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</a>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
            This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
        </div>
      </footer>


      {/* Questionnaire Modal */}
      <>
        {showQuiz && <QuestionnaireModal onClose={() => setShowQuiz(false)} />}
      </>
    </main>
  );
}
