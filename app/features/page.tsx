'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, MessageSquare, BarChart3, Zap, Server, AudioLines, PhoneOutgoing, Bell, BrainCircuit, MessageSquareText, Search, PhoneOff, Star, ClipboardList } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

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
    { name: 'GoHighLevel', logo: '/integrations/gohighlevel.svg' },
    { name: 'Google Ads', logo: '/integrations/googleads.svg' },
    { name: 'Meta', logo: '/integrations/meta.svg' },
    { name: 'Make', logo: '/integrations/make.svg' },
    { name: 'Notion', logo: '/integrations/notion.svg' },
];

const FAQS = [
    {
        question: 'What Do You Guys Do?',
        answer: "We run the entire lead-to-close pipeline for roofing contractors. That means a combination of Meta ads and Google Local Service Ads (LSA) — widely considered the best lead sources for roofers — generating exclusive homeowner leads in your area. From there, our AI agent calls and texts every lead within minutes to pre-qualify them, automated daily reminders ensure your appointments actually show up, and our proprietary software transcribes your sales calls and coaches you on how to close more deals. You focus on roofing — we fill your calendar.",
    },
    {
        question: 'How Much Does It Cost?',
        answer: "Think about it this way: if we put 40 booked, pre-qualified roof replacement estimates on your calendar over the next 90 days, what would that be worth to you?\n\nThere is no cookie-cutter pricing here. Every plan we put together is built around your business, your goals, and your budget.\n\nIf you are shopping around for the cheapest lead source, we are probably not the right fit. But if you want exclusive, pre-qualified roof replacement estimates on your calendar, that is exactly what we deliver.",
    },
    {
        question: 'Do You Pre-Qualify Leads?',
        answer: "Absolutely. Before a lead ever reaches your team, it goes through our multi-step qualification process powered by AI. Our agent calls and texts every lead within minutes of them filling out a form. We verify homeowner status, project scope, damage type, and buying intent so your crew only shows up to appointments that are worth the trip. No more wasted afternoons chasing tire kickers.",
    },
    {
        question: 'How Fast Will I Start Getting Leads?',
        answer: "We move fast. During the first two weeks, our team builds your AI qualification agent, sets up your ad campaigns, and configures your entire system. By day 14, your Meta ads go live and leads start flowing. Most clients see their first qualified appointments on the calendar within the first week of ads running.",
    },
    {
        question: 'Do I Have To Sign a Long-Term Contract?',
        answer: "No. We don't lock you into long-term contracts because we don't need to. Our clients stay because the system works, not because they're stuck. We earn your business every single month with real results — booked jobs on your calendar.",
    },
    {
        question: 'What Areas Do You Service?',
        answer: "We work with roofing contractors across the United States and Canada. Our Meta ad campaigns are hyper-targeted to homeowners in your specific service areas — down to the zip code. Whether you cover one city or an entire metro, we build campaigns around your exact footprint.",
    },
    {
        question: 'How Do You Reduce No-Shows?',
        answer: "No-shows kill your productivity. That's why we built an automated reminder system that sends daily texts and calls leading up to every booked appointment. On the morning of the meeting, the lead gets a final confirmation call with all the details. If they don't respond, our AI follows up to reschedule before you ever waste a trip.",
    },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-6 text-left group">
                <span className="text-lg font-bold text-white group-hover:text-[#40c9ff] transition-colors pr-4">{question}</span>
                <span className={`text-2xl text-slate-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            {isOpen && (
                <div className="overflow-hidden">
                    <p className="pb-6 text-slate-400 leading-relaxed whitespace-pre-line">{answer}</p>
                </div>
            )}
        </div>
    );
}

const features = [
    {
        icon: Phone,
        title: 'Answers Every Call in < 1s',
        description: 'Instant pickup. No hold music. No voicemail. Just instant, natural conversation that sounds completely human.',
    },
    {
        icon: Calendar,
        title: 'Live Calendar Booking',
        description: 'Integrates natively with your calendar to find slots, handle timezone math, and schedule appointments mid-conversation.',
    },
    {
        icon: MessageSquare,
        title: 'Smart Lead Qualification',
        description: 'Asks the right questions based on your custom criteria to filter out tire-kickers and prioritize high-intent buyers.',
    },
    {
        icon: BarChart3,
        title: 'Deep Analytics & Insights',
        description: 'Transcripts, sentiment analysis, call summaries, and actionable performance metrics synced back to your CRM automatically.',
    },
    {
        icon: AudioLines,
        title: 'Proprietary Barge-In Handling',
        description: 'Our custom-built model detects when callers interrupt mid-sentence and responds naturally — no awkward pauses, no talking over people.',
    },
    {
        icon: PhoneOutgoing,
        title: 'Outbound Lead Follow-Up',
        description: 'Automatically follows up with missed calls, abandoned quotes, and cold leads. Re-engages prospects with personalized outbound calls on your schedule.',
    },
    {
        icon: Zap,
        title: 'Cost-Effective Meta Ad Leads',
        description: 'We run high-converting Meta ad campaigns targeting homeowners actively looking for roof replacements. Every lead is exclusive to you — no shared leads, no bidding wars.',
    },
    {
        icon: Search,
        title: 'Google LSA Management',
        description: 'We set up and manage your Google Local Service Ads — the highest-intent lead source for roofers. Homeowners searching for roof repair in your area call you directly.',
    },
    {
        icon: Bell,
        title: 'Daily Appointment Reminders',
        description: 'Automated daily reminders via call and text before every booked meeting. Drastically reduces no-shows so your crew never wastes a trip on a lead who forgot.',
    },
    {
        icon: PhoneOff,
        title: 'Automated No-Show Recovery',
        description: 'When a prospect misses a meeting, our AI calls them within 5 minutes to reschedule. Handles objections, finds a new time, and updates your calendar automatically.',
    },
    {
        icon: BrainCircuit,
        title: 'Sales Call Transcription & Coaching',
        description: 'Every sales call is automatically recorded and transcribed. Our AI analyzes the conversation, pinpoints where deals are lost, and delivers actionable coaching to boost your close rate.',
    },
    {
        icon: MessageSquareText,
        title: 'Post-Estimate Follow-Up',
        description: 'After you give an estimate, our AI follows up automatically with the homeowner via call and text. No more deals falling through because you forgot to call back.',
    },
    {
        icon: Star,
        title: '5-Star Review Requests',
        description: 'After a job is completed, our AI calls the homeowner to check satisfaction and guides happy customers to leave a Google review — growing your reputation on autopilot.',
    },
    {
        icon: ClipboardList,
        title: 'Daily Performance Reports',
        description: 'Get a daily summary of homeowners contacted, appointments booked, no-shows recovered, and close rates. Know exactly how your pipeline is performing at a glance.',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-40 pb-20 px-4 relative overflow-hidden">
                <div className="glow-orb glow-orb-blue w-[600px] h-[600px] top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-30" />
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full dark-glass-card border border-white/20"
                    >
                        <Server className="w-5 h-5 text-[#e81cff]" />
                        <span className="text-sm font-bold tracking-widest text-[#e81cff] uppercase">Built For Roofing Contractors</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Not Just a Bot. <br /><span className="text-gradient-skye">An Entire Revenue Team.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light"
                    >
                        We don&apos;t just provide standard SaaS features. We deploy a fully capable AI system purpose-built for roofing contractors — from lead generation to sales coaching.
                    </motion.p>
                </div>
            </section>

            {/* Voice Superiority Banner */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto dark-glass-card p-8 md:p-12 rounded-3xl border border-brand-accent/30 relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e81cff]/10 to-[#40c9ff]/10 z-0"></div>
                    <div className="relative z-10">
                        <Zap className="w-12 h-12 text-[#40c9ff] mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Voice AI Advantage</h2>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            While others offer text-based chatbots, our cutting-edge Voice AI understands tone, nuance, and context. It handles interruptions gracefully and adapts its pitch to the customer&apos;s mood in real-time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {features.map((feature) => (
                            <motion.div
                                key={feature.title}
                                variants={fadeUp}
                                transition={{ duration: 0.5 }}
                                className="dark-glass-card p-8 rounded-2xl group border-white/5 hover:border-white/20 transition-all bg-white/5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#40c9ff]/20 to-[#e81cff]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-[#40c9ff]" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-20 px-4 bg-black border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Works With Your Favorite Tools</h2>
                    <p className="text-slate-400 text-center mb-12">Seamlessly connects with the platforms you already use</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {INTEGRATIONS.map((item) => (
                            <div key={item.name} className="flex flex-col items-center gap-2 group" title={item.name}>
                                <Image src={item.logo} alt={item.name} width={36} height={36} className="w-9 h-9 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                                <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 px-4 bg-black">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Frequently Asked <span className="text-gradient-skye">Questions</span>
                    </h2>
                    <p className="text-slate-400 text-center mb-12">Everything you need to know about working with us</p>
                    <div>
                        {FAQS.map((faq) => (
                            <FaqItem key={faq.question} {...faq} />
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-12 px-4 border-t border-white/10 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <Image src="/new-logo.png" alt="Ragsites" width={24} height={24} />
                            <span className="font-bold text-white">RAGSITES</span>
                        </div>
                        <p className="text-sm text-slate-500">
                            Built by Ragsites. &copy; 2026
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
