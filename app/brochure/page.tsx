'use client';

import { Inter } from 'next/font/google';
import {
    Phone,
    PhoneOutgoing,
    Languages,
    CalendarCheck,
    BarChart3,
    Settings,
    UtensilsCrossed,
    ChefHat,
    Building2,
    Sparkles,
    Wrench,
    Home,
    HeartPulse,
    Smile,
    Dumbbell,
    Scale,
    Layers,
    CheckCircle2,
    Star,
    ChevronDown,
    MessageSquare,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

const FEATURES = [
    {
        icon: Phone,
        title: 'Never Lose Another Client \u2014 Even After Hours',
        desc: 'Your AI answers calls, texts, website chats, and social media messages instantly \u2014 24/7.',
    },
    {
        icon: PhoneOutgoing,
        title: 'Turn Old Leads Into New Revenue Automatically',
        desc: 'Your AI follows up with missed callers and inactive contacts \u2014 bringing back business you already paid for.',
    },
    {
        icon: Languages,
        title: "Speak Your Customer\u2019s Language \u2014 Naturally",
        desc: 'Multilingual AI that sounds human, professional, and aligned with your brand.',
    },
    {
        icon: CalendarCheck,
        title: 'Fill Your Calendar Automatically',
        desc: 'Whether they call, text, or message you \u2014 appointments sync directly into your CRM.',
    },
    {
        icon: BarChart3,
        title: 'See the Revenue It Generates',
        desc: "Call recordings, transcripts, and real performance tracking \u2014 so you know exactly what\u2019s converting.",
    },
    {
        icon: Settings,
        title: 'Done-For-You Setup. Live in Minutes.',
        desc: 'We configure everything for you \u2014 no tech skills required.',
    },
];

const INBOUND_PLANS = [
    {
        name: 'SMALL',
        price: 99,
        conversations: 60,
        extraCall: 1.65,
        languages: 60,
    },
    {
        name: 'MEDIUM',
        price: 299,
        conversations: 200,
        extraCall: 1.5,
        languages: 60,
        popular: true,
    },
    {
        name: 'LARGE',
        price: 499,
        conversations: 400,
        extraCall: 1.25,
        languages: 60,
    },
    {
        name: 'CORP',
        price: 799,
        conversations: 800,
        extraCall: 1.0,
        languages: 60,
    },
];

const CONTACT_SERVICES = [
    'Outbound Calling',
    'CRM Integration',
    'Live Dispatch',
    'Payment Processing',
    'HIPAA Compliance',
];

const INDUSTRIES = [
    { icon: UtensilsCrossed, name: 'Restaurant', desc: 'Table bookings, catering, delivery, private dining' },
    { icon: ChefHat, name: 'Catering', desc: 'Event quotes, menu customization, scheduling' },
    { icon: Building2, name: 'Hospitality / Hotels', desc: 'Reservations, concierge, multilingual support' },
    { icon: Sparkles, name: 'Cleaning Services', desc: 'Instant quotes, recurring bookings, ZIP verification' },
    { icon: Wrench, name: 'HVAC / Plumbing', desc: 'Emergency dispatch, appointment scheduling, estimates' },
    { icon: Home, name: 'Home Services', desc: 'Multi-trade coordination, technician routing' },
    { icon: HeartPulse, name: 'Healthcare', desc: 'Patient intake, insurance verification' },
    { icon: Smile, name: 'Dental & Orthodontics', desc: 'New patient scheduling, treatment coordination, recall' },
    { icon: Dumbbell, name: 'Fitness & Beauty', desc: 'Class bookings, membership management, reminders' },
    { icon: Scale, name: 'Legal & Law Firms', desc: 'Client intake, case screening, appointment setting' },
    { icon: Layers, name: 'And Many More...', desc: 'If you have a phone, we\u2019ve got you covered' },
];

const FAQ = [
    {
        q: 'What does the Ragsites AI Receptionist do?',
        a: 'The Ragsites AI Receptionist answers phone calls, text messages, website chats, and social media messages for your business \u2014 24/7. It greets callers naturally, answers their questions, books appointments, captures lead information, and follows up with missed callers automatically.',
    },
    {
        q: 'What are the main benefits?',
        a: 'Never miss a call or lead again \u2014 even after hours, on weekends, or during holidays. You\u2019ll book more appointments, recover lost revenue from missed calls, save hundreds of hours on phone time, and deliver a consistently professional experience to every caller.',
    },
    {
        q: 'How long does setup take?',
        a: 'Most businesses are fully live within 24\u201348 hours. Our team handles everything \u2014 custom AI training on your business, calendar and CRM integration, voice and greeting selection, and live testing with your account manager.',
    },
    {
        q: 'Can I customize how the AI talks?',
        a: 'Yes. You choose the voice, tone, language, and personality. We train it on your specific services, pricing, policies, and FAQs so it sounds like a natural extension of your team \u2014 not a generic robot.',
    },
    {
        q: 'How many calls can it handle?',
        a: 'There\u2019s no limit. The AI handles unlimited simultaneous calls \u2014 no hold times, no busy signals, no voicemail. Whether you get 10 calls a day or 10,000, every caller gets answered instantly.',
    },
    {
        q: 'Does it work with booking systems or CRMs?',
        a: 'Yes. It integrates directly with popular calendars, CRMs, and booking platforms to schedule appointments in real time. No manual data entry required \u2014 everything syncs automatically.',
    },
    {
        q: 'What reports do I get?',
        a: 'You get a full dashboard with call recordings, transcripts, performance metrics, and revenue tracking. See exactly how many calls were answered, appointments booked, leads captured, and how much revenue the AI is generating.',
    },
    {
        q: 'Can I keep my current phone number?',
        a: 'Absolutely. We set up call forwarding from your existing business number. Your customers dial the same number they always have \u2014 zero disruption to your operations.',
    },
    {
        q: 'Does it sound like a real person?',
        a: 'Yes. The AI uses advanced natural-language voice technology that sounds human, professional, and conversational. Most callers can\u2019t tell the difference between the AI and a live receptionist.',
    },
    {
        q: 'What if a customer wants a human?',
        a: 'The AI can transfer calls to your team anytime. You set the rules \u2014 for example, VIP clients, emergency situations, or specific request types can be routed directly to a live person.',
    },
];

const INTEGRATIONS = [
    { name: 'Google Calendar', logo: '/integrations/googlecalendar.svg' },
    { name: 'HubSpot', logo: '/integrations/hubspot.svg' },
    { name: 'Salesforce', logo: '/integrations/salesforce.svg' },
    { name: 'Google Maps', logo: '/integrations/googlemaps.svg' },
    { name: 'Zapier', logo: '/integrations/zapier.svg' },
    { name: 'Calendly', logo: '/integrations/calendly.svg' },
    { name: 'Stripe', logo: '/integrations/stripe.svg' },
    { name: 'Square', logo: '/integrations/square.svg' },
    { name: 'Twilio', logo: '/integrations/twilio.svg' },
    { name: 'Slack', logo: '/integrations/slack.svg' },
    { name: 'WhatsApp', logo: '/integrations/whatsapp.svg' },
    { name: 'QuickBooks', logo: '/integrations/quickbooks.svg' },
];

/* Inline SVG noise filter — applied as overlay on dark sections */
function NoiseOverlay() {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" style={{ opacity: 0.045 }}>
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    );
}

/* ─── Intake Questionnaire Modal ─── */

const INTEREST_OPTIONS = [
    'Inbound call handling (AI receptionist)',
    'Outbound lead qualification (AI calls your leads)',
    'Appointment setting & reminders',
    'All of the above',
];

const INDUSTRY_OPTIONS = [
    'Roofing', 'HVAC', 'Plumbing', 'Solar', 'Dental', 'Legal', 'Real Estate', 'Insurance', 'Restaurant', 'Other',
];

const VOLUME_OPTIONS = [
    { label: 'Under 50', sublabel: 'Just getting started' },
    { label: '50 - 200', sublabel: 'Growing steadily' },
    { label: '200 - 500', sublabel: 'High volume' },
    { label: '500+', sublabel: 'Enterprise level' },
];

const CRM_OPTIONS = [
    'GoHighLevel', 'HubSpot', 'Salesforce', 'Calendly', 'None / Spreadsheets', 'Other',
];

const BOTTLENECK_OPTIONS = [
    'Leads going cold before we follow up',
    'Too many no-shows',
    "Can't handle call volume",
    'No system to track or qualify leads',
];

type IntakeStep = 'interest' | 'industry' | 'volume' | 'crm' | 'bottleneck' | 'contact' | 'disclaimers' | 'submitting' | 'success' | 'booking' | 'booked';

const CAL_LINK = 'ragsites/30min';

function IntakeModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<IntakeStep>('interest');
    const [interest, setInterest] = useState('');
    const [industry, setIndustry] = useState('');
    const [volume, setVolume] = useState('');
    const [crm, setCrm] = useState('');
    const [bottleneck, setBottleneck] = useState('');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', businessName: '', website: '' });
    const [meetingCommit, setMeetingCommit] = useState(false);
    const [spamConsent, setSpamConsent] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ phone?: string; email?: string }>({});
    const [calLoaded, setCalLoaded] = useState(false);
    const calReady = useRef(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError('');
        if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
            setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { phone?: string; email?: string } = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address.';
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) errors.phone = 'Please enter a valid phone number.';
        if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
        setFieldErrors({});
        setStep('disclaimers');
    };

    const handleFinalSubmit = async () => {
        if (!meetingCommit) { setError('Please confirm you can attend the call.'); return; }
        if (!spamConsent) { setError('Please provide consent to continue.'); return; }
        setError('');
        setStep('submitting');

        const body = new FormData();
        body.append('access_key', 'a9e80fab-4da4-44c6-b31f-3369557abdbe');
        body.append('subject', `Voice AI Lead (Brochure): ${formData.businessName || formData.name}`);
        body.append('from_name', 'Ragsites Brochure');
        body.append('name', formData.name);
        body.append('phone', formData.phone);
        body.append('email', formData.email);
        body.append('business_name', formData.businessName);
        body.append('website', formData.website);
        body.append('interest', interest);
        body.append('industry', industry);
        body.append('monthly_volume', volume);
        body.append('crm', crm);
        body.append('bottleneck', bottleneck);

        try {
            const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
            if (res.ok) {
                setStep('success');
                setTimeout(() => setStep('booking'), 2000);
            } else {
                setError('Something went wrong. Please try again.');
                setStep('disclaimers');
            }
        } catch {
            setError('Something went wrong. Please try again.');
            setStep('disclaimers');
        }
    };

    // Cal.com embed
    useEffect(() => {
        if (step !== 'booking' || calReady.current) return;
        calReady.current = true;

        (function (C: any, A: any, L: string) {
            const p = function () {
                if (!(C.Cal as any)?.loaded) {
                    (C.Cal as any) = function (...args: unknown[]) { (C.Cal as any).q = (C.Cal as any).q || []; (C.Cal as any).q.push(args); };
                    (C.Cal as any).ns = {}; (C.Cal as any).loaded = true;
                    const d = A as Document; const s = d.createElement(L) as HTMLScriptElement;
                    s.async = true; s.src = 'https://app.cal.com/embed/embed.js'; d.head.appendChild(s);
                }
            };
            p();
        })(window, document, 'script');

        setTimeout(() => {
            if (typeof window.Cal === 'function') {
                window.Cal('init', { origin: 'https://app.cal.com' });
                window.Cal('inline', {
                    elementOrSelector: '#cal-embed-brochure',
                    calLink: CAL_LINK,
                    layout: 'month_view',
                    config: {
                        theme: 'dark',
                        name: formData.name || undefined,
                        email: formData.email || undefined,
                        phoneNumber: formData.phone ? `+1${formData.phone.replace(/\D/g, '').replace(/^1/, '')}` : undefined,
                    },
                });
                window.Cal('on', {
                    action: 'bookingSuccessful',
                    callback: () => setStep('booked'),
                });
                window.Cal('on', {
                    action: '__iframeReady',
                    callback: () => setCalLoaded(true),
                });
                window.Cal('ui', { theme: 'dark', styles: { branding: { brandColor: '#3b82f6' } }, hideEventTypeDetails: false, layout: 'month_view' });
            }
        }, 100);
    }, [step]);

    const stepLabels: Record<string, string> = {
        interest: 'Step 1 of 5', industry: 'Step 2 of 5', volume: 'Step 3 of 5',
        crm: 'Step 4 of 5', bottleneck: 'Step 5 of 5',
    };

    const optionBtnClass = "w-full text-left px-6 py-4 rounded-xl bg-[#0f2035] border border-slate-700/50 text-white font-medium hover:border-[#3b82f6] hover:bg-[#1e3a5f] transition-all duration-200 hover:scale-[1.02]";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative z-10 w-full bg-[#0c1929] border border-slate-700/50 rounded-2xl p-8 md:p-10 overflow-y-auto max-h-[90vh] ${step === 'booking' ? 'max-w-4xl' : 'max-w-lg'}`}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white text-sm">✕</button>

                {/* Quiz steps */}
                {step === 'interest' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">{stepLabels[step]}</p>
                        <h3 className="text-2xl font-bold text-white mb-2">What are you most interested in?</h3>
                        <p className="text-slate-400 text-sm mb-8">Select the option that best describes your needs</p>
                        <div className="space-y-3">
                            {INTEREST_OPTIONS.map((opt) => (
                                <button key={opt} onClick={() => { setInterest(opt); setTimeout(() => setStep('industry'), 300); }} className={optionBtnClass}>{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'industry' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">{stepLabels[step]}</p>
                        <h3 className="text-2xl font-bold text-white mb-2">What industry are you in?</h3>
                        <p className="text-slate-400 text-sm mb-8">This helps us tailor your AI agent</p>
                        <div className="space-y-3">
                            {INDUSTRY_OPTIONS.map((opt) => (
                                <button key={opt} onClick={() => { setIndustry(opt); setTimeout(() => setStep('volume'), 300); }} className={optionBtnClass}>{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'volume' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">{stepLabels[step]}</p>
                        <h3 className="text-2xl font-bold text-white mb-2">How many leads/calls do you handle per month?</h3>
                        <p className="text-slate-400 text-sm mb-8">This helps us size your plan</p>
                        <div className="space-y-3">
                            {VOLUME_OPTIONS.map((opt) => (
                                <button key={opt.label} onClick={() => { setVolume(opt.label); setTimeout(() => setStep('crm'), 300); }} className={optionBtnClass}>{opt.label} <span className="text-slate-500 ml-2 text-sm">— {opt.sublabel}</span></button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'crm' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">{stepLabels[step]}</p>
                        <h3 className="text-2xl font-bold text-white mb-2">What CRM do you currently use?</h3>
                        <p className="text-slate-400 text-sm mb-8">So we can integrate seamlessly</p>
                        <div className="space-y-3">
                            {CRM_OPTIONS.map((opt) => (
                                <button key={opt} onClick={() => { setCrm(opt); setTimeout(() => setStep('bottleneck'), 300); }} className={optionBtnClass}>{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'bottleneck' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">{stepLabels[step]}</p>
                        <h3 className="text-2xl font-bold text-white mb-2">What&apos;s your biggest bottleneck right now?</h3>
                        <p className="text-slate-400 text-sm mb-8">We&apos;ll focus on solving this first</p>
                        <div className="space-y-3">
                            {BOTTLENECK_OPTIONS.map((opt) => (
                                <button key={opt} onClick={() => { setBottleneck(opt); setTimeout(() => setStep('contact'), 300); }} className={optionBtnClass}>{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact form */}
                {step === 'contact' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">Your Details</p>
                        <h3 className="text-2xl font-bold text-white mb-2">Almost there!</h3>
                        <p className="text-slate-400 text-sm mb-8">So we can reach out and schedule your strategy call</p>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <input name="name" required placeholder="Full name" value={formData.name} onChange={handleFormChange} className="w-full px-4 py-4 rounded-xl bg-[#0f2035] border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors" />
                            <div>
                                <input name="phone" type="tel" required placeholder="Phone number" value={formData.phone} onChange={handleFormChange} className={`w-full px-4 py-4 rounded-xl bg-[#0f2035] border ${fieldErrors.phone ? 'border-red-500' : 'border-slate-700/50'} text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors`} />
                                {fieldErrors.phone && <p className="text-red-400 text-sm mt-1">{fieldErrors.phone}</p>}
                            </div>
                            <div>
                                <input name="email" type="email" required placeholder="Email address" value={formData.email} onChange={handleFormChange} className={`w-full px-4 py-4 rounded-xl bg-[#0f2035] border ${fieldErrors.email ? 'border-red-500' : 'border-slate-700/50'} text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors`} />
                                {fieldErrors.email && <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>}
                            </div>
                            <input name="businessName" required placeholder="Business name" value={formData.businessName} onChange={handleFormChange} className="w-full px-4 py-4 rounded-xl bg-[#0f2035] border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors" />
                            <input name="website" placeholder="Website (optional)" value={formData.website} onChange={handleFormChange} className="w-full px-4 py-4 rounded-xl bg-[#0f2035] border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors" />
                            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white font-bold text-lg hover:from-[#2563eb] hover:to-[#4f46e5] transition-all">Continue</button>
                        </form>
                    </div>
                )}

                {/* Disclaimers */}
                {step === 'disclaimers' && (
                    <div>
                        <p className="text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-3">Final Step</p>
                        <h3 className="text-2xl font-bold text-white mb-6">Almost There!</h3>
                        <div className="bg-[#0f2035] border border-slate-700/50 rounded-xl p-5 mb-4">
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                <span className="text-white font-bold">DISCLAIMER:</span> This meeting will be hosted on Google Meet. We limit the number of clients we take on each month. If you need to reschedule, let us know 24h prior.
                            </p>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={meetingCommit} onChange={(e) => { setMeetingCommit(e.target.checked); if (error) setError(''); }} className="mt-1 w-4 h-4 rounded border-slate-600 text-[#3b82f6] focus:ring-[#3b82f6]" />
                                <span className="text-sm text-slate-300">Will you be able to commit and attend this call?</span>
                            </label>
                        </div>
                        <div className="bg-[#0f2035] border border-slate-700/50 rounded-xl p-5 mb-6">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={spamConsent} onChange={(e) => { setSpamConsent(e.target.checked); if (error) setError(''); }} className="mt-1 w-4 h-4 rounded border-slate-600 text-[#3b82f6] focus:ring-[#3b82f6]" />
                                <span className="text-sm text-slate-300">We hate spammers. Do you consent to us reaching out regarding this offer?</span>
                            </label>
                        </div>
                        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                        <button onClick={handleFinalSubmit} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white font-bold text-lg hover:from-[#2563eb] hover:to-[#4f46e5] transition-all">Book My Call Now</button>
                    </div>
                )}

                {/* Submitting */}
                {step === 'submitting' && (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-full border-2 border-[#3b82f6]/20 border-t-[#3b82f6] animate-spin mx-auto mb-4" />
                        <p className="text-white font-bold text-lg">Reserving your spot...</p>
                    </div>
                )}

                {/* Success */}
                {step === 'success' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">You&apos;re In!</h3>
                        <p className="text-slate-400 text-sm">Loading the calendar...</p>
                    </div>
                )}

                {/* Cal.com booking */}
                {step === 'booking' && (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pick a Time That Works</h3>
                        <p className="text-slate-400 text-sm mb-6">Select a date and time below to lock in your call.</p>
                        <div id="cal-embed-brochure" className="w-full min-h-[450px] rounded-xl overflow-hidden flex items-center justify-center">
                            {!calLoaded && (
                                <div className="text-center">
                                    <div className="w-10 h-10 rounded-full border-2 border-[#3b82f6]/20 border-t-[#3b82f6] animate-spin mx-auto mb-3" />
                                    <p className="text-slate-400 text-sm">Loading calendar...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Booked — done */}
                {step === 'booked' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">You&apos;re All Booked!</h3>
                        <p className="text-slate-400 text-sm mb-2">Check your email for the calendar invite and Google Meet link.</p>
                        <p className="text-slate-500 text-xs">You can close this tab now.</p>
                    </div>
                )}

                {/* Progress dots */}
                {['interest', 'industry', 'volume', 'crm', 'bottleneck'].includes(step) && (
                    <div className="flex justify-center gap-2 mt-8">
                        {(['interest', 'industry', 'volume', 'crm', 'bottleneck'] as const).map((s, i) => (
                            <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-[#3b82f6]' : i < ['interest', 'industry', 'volume', 'crm', 'bottleneck'].indexOf(step) ? 'w-2 bg-[#3b82f6]/60' : 'w-2 bg-white/20'}`} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function BrochurePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showIntake, setShowIntake] = useState(false);
    const [callVolume, setCallVolume] = useState(1200);
    const [conversionRate, setConversionRate] = useState(18);
    const [transactionSize, setTransactionSize] = useState(220);
    const [laborCost, setLaborCost] = useState(22);

    const MISSED_CALL_RATE = 0.18;
    const MINUTES_PER_CALL = 4;
    const annualHoursSaved = Math.round(callVolume * MINUTES_PER_CALL / 60 * 12);
    const hoursSavedWorth = annualHoursSaved * laborCost;
    const monthlyMissedCalls = callVolume * MISSED_CALL_RATE;
    const monthlyRecovered = monthlyMissedCalls * (conversionRate / 100);
    const annualProfit = Math.round(monthlyRecovered * transactionSize * 12);

    return (
        <main className={`min-h-screen bg-white text-slate-900 ${inter.className}`} data-brochure="">
            <style>{`[data-brochure], [data-brochure] * { font-family: ${inter.style.fontFamily}, system-ui, sans-serif !important; }`}</style>
            {/* Nav */}
            <nav className="bg-[#0c1929] sticky top-0 z-50 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/new-logo.png" alt="Ragsites" width={32} height={32} />
                        <span className="text-xl font-bold text-white tracking-tight">RAGSITES</span>
                    </div>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setShowIntake(true); }}
                        className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25"
                    >
                        Get Started for $99
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <section className="py-24 px-4 relative overflow-hidden" style={{ background: '#000000' }}>
                {/* Background Video */}
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0 pointer-events-none" />
                <div className="glow-orb glow-orb-purple w-[600px] h-[600px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40 z-0" />
                <div className="glow-orb glow-orb-blue w-[500px] h-[500px] bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-30 z-0" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
                            Never Miss Another Client. Get Started with Your AI Call Center for $99.
                        </h1>
                        <ul className="space-y-4 text-lg text-slate-300">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#22d3ee] shrink-0 mt-0.5" />
                                Answers every call/text 24/7
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#22d3ee] shrink-0 mt-0.5" />
                                Books appointments directly in your CRM
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#22d3ee] shrink-0 mt-0.5" />
                                Follows up with old leads automatically
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-[#22d3ee] shrink-0 mt-0.5" />
                                Zero setup cost or risk
                            </li>
                        </ul>
                        <p className="text-slate-400 mt-6 text-lg font-medium">
                            No contracts. Cancel anytime. Plans starting at $99/mo.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex justify-center">
                        <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl">
                            <p className="text-[#22d3ee] font-semibold text-lg mb-2">Ready to get started?</p>
                            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Book a Demo Call</h3>
                            <p className="text-slate-400 mb-6">See how our AI receptionist works for your business in a quick 15-minute call.</p>
                            <a
                                href="#"
                                onClick={(e: React.MouseEvent) => { e.preventDefault(); setShowIntake(true); }}
                                className="block w-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                            >
                                Get Started for $99
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What You Get */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight">What You Get</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="text-center md:text-left">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3b82f6]/15 to-[#6366f1]/15 flex items-center justify-center mx-auto md:mx-0 mb-4">
                                    <f.icon className="w-8 h-8 text-[#3b82f6]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 tracking-tight">{f.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Demo Widget */}
            <section className="py-20 px-4 bg-[#0c1929]">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Experience It Live</h2>
                    <p className="text-slate-400 text-lg">Talk to our AI agent and see how it qualifies leads in real time</p>
                </div>
                <div className="mx-auto" style={{ maxWidth: '1400px' }}>
                    <iframe
                        src="https://personaplex-receptionist.fly.dev/demo"
                        width="100%"
                        height="900"
                        frameBorder="0"
                        style={{ borderRadius: '20px', overflow: 'hidden' }}
                        title="AI Lead Qualification Demo"
                    />
                </div>
            </section>

            {/* Integrations Strip */}
            <section className="py-14 px-4 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
                        Works With Your Favorite Tools
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {INTEGRATIONS.map((item) => (
                            <div key={item.name} className="flex flex-col items-center gap-2 group" title={item.name}>
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    width={36}
                                    height={36}
                                    className="w-9 h-9 object-contain"
                                />
                                <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Setup */}
            <section className="py-20 px-4 bg-gradient-to-br from-[#0c1929] via-[#162544] to-[#0c1929] relative overflow-hidden">
                <NoiseOverlay />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.1),transparent_50%)]" />
                <div className="max-w-2xl mx-auto text-center relative z-10">
                    <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 tracking-tight">Professional Setup</h2>
                    <ul className="space-y-5 text-left max-w-md mx-auto">
                        {[
                            'Custom AI training for your business',
                            'Calendar, SMS, & email integration setup',
                            'Custom greeting and voice selection',
                            'Live testing and optimization with account manager',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-lg text-slate-300">
                                <CheckCircle2 className="w-6 h-6 text-[#22d3ee] shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10">
                        <p className="text-slate-500 text-lg line-through">Total value: $299</p>
                        <p className="text-5xl font-extrabold text-white mt-1 tracking-tight">Included Free</p>
                    </div>
                    <a
                        href="#pricing"
                        className="inline-block mt-8 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-bold py-4 px-14 rounded-xl text-lg uppercase tracking-wide transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                        See Pricing
                    </a>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-[#0c1929] to-[#162544] relative overflow-hidden">
                <NoiseOverlay />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08),transparent_50%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-3 tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-slate-400 text-center mb-4 text-lg">Choose the plan that fits your business</p>
                    <p className="text-[#22d3ee] text-center font-bold mb-12 text-sm uppercase tracking-widest">
                        Inbound Plans
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {INBOUND_PLANS.map((plan) => (
                            <div
                                key={plan.name}
                                className={`rounded-2xl p-6 text-center flex flex-col transition-transform hover:-translate-y-1 ${
                                    'popular' in plan && plan.popular
                                        ? 'bg-gradient-to-b from-[#1e3a5f] to-[#162544] border-2 border-[#3b82f6] shadow-lg shadow-blue-500/10'
                                        : 'bg-[#0f2035] border border-slate-700/50'
                                }`}
                            >
                                {'popular' in plan && plan.popular && (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#22d3ee] mb-2">Most Popular</span>
                                )}
                                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                                    {plan.name}
                                </p>
                                <p className="text-5xl font-extrabold text-white mb-5 tracking-tight">${plan.price}<span className="text-lg font-medium text-slate-400">/mo</span></p>
                                <a
                                    href={`mailto:team@ragsites.com?subject=Get Started - ${plan.name} Plan`}
                                    className="block bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-bold py-3 px-6 rounded-lg text-sm uppercase tracking-wide transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 mb-6"
                                >
                                    Get Started
                                </a>
                                <div className="space-y-2 text-sm text-slate-400 mt-auto">
                                    <p className="font-semibold text-slate-300">{plan.conversations} conver./mo included</p>
                                    <p>Extra calls: ${plan.extraCall.toFixed(2)}/call</p>
                                    <p>{plan.languages} languages</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact for other services */}
                    <div className="bg-[#0f2035] border border-slate-700/50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
                        <MessageSquare className="w-12 h-12 text-[#22d3ee] mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
                            Need More Than Inbound?
                        </h3>
                        <p className="text-slate-400 mb-6">
                            We offer custom packages for advanced features. Contact our team for pricing on:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {CONTACT_SERVICES.map((service) => (
                                <span
                                    key={service}
                                    className="bg-[#3b82f6]/10 text-[#60a5fa] font-semibold text-sm px-4 py-2 rounded-full border border-[#3b82f6]/20"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                        <a
                            href="mailto:team@ragsites.com?subject=Custom Package Inquiry"
                            className="inline-block bg-white hover:bg-slate-50 text-[#0c1929] font-bold py-3 px-10 rounded-xl text-lg transition-all shadow-lg"
                        >
                            Contact the Team
                        </a>
                    </div>
                </div>
            </section>

            {/* Built for Your Industry */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">Built for Your Industry</h2>
                    <p className="text-slate-500 text-center mb-14 max-w-2xl mx-auto text-lg">
                        Pre-configured AI Receptionists for 10 core industries &mdash; and dozens more. If you have a phone, we&apos;ve got you covered.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {INDUSTRIES.map((ind, i) => (
                            <div key={i} className="text-center group">
                                <ind.icon className="w-10 h-10 mx-auto mb-3 text-slate-700 group-hover:text-[#3b82f6] transition-colors" strokeWidth={1.5} />
                                <h3 className="font-bold text-lg mb-1 tracking-tight">{ind.name}</h3>
                                <p className="text-sm text-slate-500">{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Annual Gains Calculator */}
            <section className="py-20 px-4 bg-gradient-to-br from-[#0c1929] via-[#162544] to-[#0c1929] relative overflow-hidden">
                <NoiseOverlay />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.06),transparent_60%)]" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
                        Annual Gains Calculator
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                            <h3 className="text-2xl font-extrabold mb-1 tracking-tight">Annual gains calculator</h3>
                            <p className="text-slate-500 mb-8">Adjust the sliders to match your business.</p>
                            <div className="space-y-7">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-600 text-sm font-medium">Average monthly call volume</span>
                                        <span className="text-sm font-bold bg-slate-100 border border-slate-200 rounded-lg px-3 py-1">
                                            {callVolume.toLocaleString()}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={100}
                                        max={10000}
                                        step={100}
                                        value={callVolume}
                                        onChange={(e) => setCallVolume(Number(e.target.value))}
                                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-[#3b82f6]"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-600 text-sm font-medium">Monthly conversion rate</span>
                                        <span className="text-sm font-bold bg-slate-100 border border-slate-200 rounded-lg px-3 py-1">
                                            {conversionRate}%
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={50}
                                        step={1}
                                        value={conversionRate}
                                        onChange={(e) => setConversionRate(Number(e.target.value))}
                                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-[#3b82f6]"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-600 text-sm font-medium">Average transaction size</span>
                                        <span className="text-sm font-bold bg-slate-100 border border-slate-200 rounded-lg px-3 py-1">
                                            ${transactionSize}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={10}
                                        max={2000}
                                        step={10}
                                        value={transactionSize}
                                        onChange={(e) => setTransactionSize(Number(e.target.value))}
                                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-[#3b82f6]"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-600 text-sm font-medium">Average hourly front-desk labor cost</span>
                                        <span className="text-sm font-bold bg-slate-100 border border-slate-200 rounded-lg px-3 py-1">
                                            ${laborCost}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={10}
                                        max={75}
                                        step={1}
                                        value={laborCost}
                                        onChange={(e) => setLaborCost(Number(e.target.value))}
                                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-[#3b82f6]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-center shadow-2xl">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-6">
                                Your Estimated Gains
                            </p>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-slate-500 text-sm mb-1 font-medium">Time saved</p>
                                    <p className="text-4xl font-extrabold text-emerald-500 tracking-tight">{annualHoursSaved.toLocaleString()} hours</p>
                                    <p className="text-slate-500 text-sm mt-1">Worth about ${hoursSavedWorth.toLocaleString()} / year</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm mb-1 font-medium">Additional profit</p>
                                    <p className="text-4xl font-extrabold text-emerald-500 tracking-tight">${annualProfit.toLocaleString()}</p>
                                    <p className="text-slate-500 text-sm mt-1">Based on recovered calls and your conversion rate</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-8">
                                Assumes {MINUTES_PER_CALL} minutes per call and a {Math.round(MISSED_CALL_RATE * 100)}% missed-call rate.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                        {FAQ.map((item, i) => (
                            <div key={i} className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-semibold text-lg pr-4">{item.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openFaq === i && (
                                    <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 px-4 bg-gradient-to-r from-[#3b82f6] to-[#6366f1]">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Ready to Stop Missing Calls?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                        Plans starting at $99/mo. No contracts. Cancel anytime.
                    </p>
                    <a
                        href="#"
                        onClick={(e: React.MouseEvent) => { e.preventDefault(); setShowIntake(true); }}
                        className="inline-block bg-white hover:bg-slate-50 text-[#3b82f6] font-bold py-4 px-12 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        Get Started for $99
                    </a>
                </div>
            </section>

            <Footer />

            {showIntake && <IntakeModal onClose={() => setShowIntake(false)} />}
        </main>
    );
}
