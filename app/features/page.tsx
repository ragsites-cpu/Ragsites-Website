'use client';

import { motion } from 'framer-motion';
import { Phone, Calendar, MessageSquare, BarChart3, Globe, ShieldCheck, Truck, CreditCard, Zap, Server, Users, AudioLines, PhoneOutgoing, Brain } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

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
        icon: Globe,
        title: '50+ Languages Fluency',
        description: 'Speaks practically every major language natively without translation lag, expanding your serviceable market instantly.',
    },
    {
        icon: Truck,
        title: 'Dynamic Smart Dispatch',
        description: 'Checks CRM for available workers, finds the best match by location/skill, and dispatches them—all during the active call.',
    },
    {
        icon: CreditCard,
        title: 'Mid-Call Payment Collection',
        description: 'Collects deposits, processes payments via PCI-compliant paths, and confirms transactions while the customer is on the line.',
    },
    {
        icon: ShieldCheck,
        title: 'Enterprise-Grade HIPAA',
        description: 'Built for compliance. Safe for healthcare providers, dental offices, legal firms, and any business handling sensitive data.',
    },
    {
        icon: BarChart3,
        title: 'Deep Analytics & Insights',
        description: 'Transcripts, sentiment analysis, call summaries, and actionable performance metrics synced back to your CRM automatically.',
    },
    {
        icon: Users,
        title: '30 Concurrent Calls',
        description: 'Handles up to 30 live calls simultaneously with zero degradation in quality. Peak hours, holiday rushes, marketing spikes — never miss a single lead.',
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
        icon: Brain,
        title: 'Self-Learning AI Memory',
        description: 'Remembers returning callers, past conversations, and preferences. Gets smarter with every interaction to deliver increasingly personalized service.',
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
                        <span className="text-sm font-bold tracking-widest text-[#e81cff] uppercase">Platform Capabilities</span>
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
                        We don&apos;t just provide standard SaaS features. We deploy a fully capable Voice AI agent that outperforms human receptionists across every metric.
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

            <footer className="py-12 px-4 border-t border-white/10 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.png" alt="Ragsites" width={24} height={24} className="rounded-full" />
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
