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
import { useState } from 'react';
import Image from 'next/image';

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

export default function BrochurePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
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
                        <Image src="/logo.png" alt="Ragsites" width={32} height={32} />
                        <span className="text-xl font-bold text-white tracking-tight">RAGSITES</span>
                    </div>
                    <a
                        href="#pricing"
                        className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25"
                    >
                        Get Started for $99
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <section className="py-24 px-4 relative overflow-hidden" style={{ background: '#060d18' }}>
                <NoiseOverlay />
                {/* Animated mesh gradient — Retell AI style */}
                <style>{`
                    @keyframes meshBlob1 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(200px,-100px) scale(1.3)} 50%{transform:translate(-100px,120px) scale(0.8)} 75%{transform:translate(150px,80px) scale(1.15)} 100%{transform:translate(0,0) scale(1)} }
                    @keyframes meshBlob2 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(-250px,80px) scale(1.25)} 50%{transform:translate(150px,-150px) scale(0.85)} 75%{transform:translate(-120px,-100px) scale(1.2)} 100%{transform:translate(0,0) scale(1)} }
                    @keyframes meshBlob3 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(120px,180px) scale(0.8)} 50%{transform:translate(-200px,-80px) scale(1.3)} 75%{transform:translate(80px,-150px) scale(1.1)} 100%{transform:translate(0,0) scale(1)} }
                    @keyframes meshBlob4 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(-180px,-120px) scale(1.2)} 50%{transform:translate(220px,60px) scale(0.85)} 75%{transform:translate(-80px,160px) scale(1.25)} 100%{transform:translate(0,0) scale(1)} }
                    @keyframes meshBlob5 { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(100px,-200px) scale(1.15)} 50%{transform:translate(-150px,100px) scale(0.9)} 75%{transform:translate(180px,50px) scale(1.2)} 100%{transform:translate(0,0) scale(1)} }
                `}</style>
                <div className="absolute inset-0 overflow-hidden">
                    {/* Large deep blue — dominant center glow */}
                    <div className="absolute rounded-full" style={{ width: '900px', height: '700px', background: 'radial-gradient(circle, #1d4ed8 0%, #1e3a8a 40%, transparent 70%)', top: '-15%', left: '15%', opacity: 0.9, filter: 'blur(80px)', animation: 'meshBlob1 10s ease-in-out infinite' }} />
                    {/* Bright blue — right side */}
                    <div className="absolute rounded-full" style={{ width: '700px', height: '600px', background: 'radial-gradient(circle, #2563eb 0%, #1d4ed8 35%, transparent 70%)', top: '10%', right: '-10%', opacity: 0.8, filter: 'blur(70px)', animation: 'meshBlob2 12s ease-in-out infinite' }} />
                    {/* Teal accent — bottom-left */}
                    <div className="absolute rounded-full" style={{ width: '600px', height: '500px', background: 'radial-gradient(circle, #0d9488 0%, #0f766e 30%, transparent 70%)', bottom: '-20%', left: '-10%', opacity: 0.6, filter: 'blur(90px)', animation: 'meshBlob3 14s ease-in-out infinite' }} />
                    {/* Indigo — top-right */}
                    <div className="absolute rounded-full" style={{ width: '550px', height: '550px', background: 'radial-gradient(circle, #4f46e5 0%, #3730a3 35%, transparent 70%)', top: '-15%', right: '10%', opacity: 0.5, filter: 'blur(75px)', animation: 'meshBlob4 8s ease-in-out infinite' }} />
                    {/* Mid blue — center fill */}
                    <div className="absolute rounded-full" style={{ width: '800px', height: '600px', background: 'radial-gradient(circle, #3b82f6 0%, #2563eb 30%, transparent 65%)', top: '0%', left: '30%', opacity: 0.6, filter: 'blur(85px)', animation: 'meshBlob5 11s ease-in-out infinite' }} />
                    {/* Edge vignette — softer so blobs show through */}
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 35%, #060d18 85%)' }} />
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
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
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl">
                            <p className="text-[#22d3ee] font-semibold text-lg mb-2">Ready to get started?</p>
                            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Book a Demo Call</h3>
                            <p className="text-slate-400 mb-6">See how our AI receptionist works for your business in a quick 15-minute call.</p>
                            <a
                                href="#pricing"
                                className="block w-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                            >
                                Get Started for $99
                            </a>
                        </div>
                    </div>
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
                        href="mailto:team@ragsites.com?subject=Get Started with Ragsites"
                        className="inline-block bg-white hover:bg-slate-50 text-[#3b82f6] font-bold py-4 px-12 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        Get Started for $99
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-4 bg-[#0c1929] text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Image src="/logo.png" alt="Ragsites" width={28} height={28} />
                        <span className="text-lg font-bold text-white tracking-tight">RAGSITES</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        Ragsites &copy; 2026 &mdash; All Rights Reserved
                    </p>
                    <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
                    </p>
                </div>
            </footer>
        </main>
    );
}
