'use client';

import { motion } from 'framer-motion';
import { Network, ArrowRight, ArrowDownRight, UserX, UserCheck, CalendarX, Zap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const workflows = [
    {
        icon: PhoneCall,
        title: 'Inbound Answering & Qualification',
        status: 'High Volume',
        color: 'text-[#40c9ff]',
        bg: 'bg-[#40c9ff]/10',
        description: 'Instantly pick up inbound calls from ads, organic search, or direct marketing. Qualify the caller, answer FAQs, and push the lead to CRM immediately.',
        steps: [
            'Customer calls business number',
            'AI answers in < 1 second',
            'Determines intent (Lead vs Support)',
            'Asks qualifying questions (Budget, Timeline, Needs)',
            'Books appointment or routes to human if complex'
        ]
    },
    {
        icon: CalendarX,
        title: 'No-Show Recovery',
        status: 'Revenue Savior',
        color: 'text-[#e81cff]',
        bg: 'bg-[#e81cff]/10',
        description: 'When a prospect misses a booked meeting, the AI instantly triggers a personalized voice call to reschedule them before they go to a competitor.',
        steps: [
            'Meeting status changes to No-Show in CRM',
            'AI initiates outbound call within 5 minutes',
            'Handles objections ("Sorry, I got busy")',
            'Finds new calendar availability and reschedules on the spot',
            'Updates CRM with new appointment time'
        ]
    },
    {
        icon: UserX,
        title: 'Dead Lead Revival',
        status: 'Hidden Goldmine',
        color: 'text-[#FF8E53]',
        bg: 'bg-[#FF8E53]/10',
        description: 'Got thousands of old leads in your database? Unleash the AI to call them, reignite interest, and book them straight to your sales team.',
        steps: [
            'Pulls list of leads inactive for 90+ days',
            'Dials sequentially with personalized openers',
            'Presents new offer or checks in on their previous interest',
            'If engaged, qualifies their current situation',
            'Live-transfers hot leads directly to your closers'
        ]
    }
];

// Need a missing import
function PhoneCall(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /><path d="M14.05 2a9 9 0 0 1 8 7.94" /><path d="M14.05 6A5 5 0 0 1 18 10" /></svg>
}

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function WorkflowsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-40 pb-20 px-4 relative overflow-hidden">
                <div className="glow-orb glow-orb-pink w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full dark-glass-card border border-white/20"
                    >
                        <Network className="w-5 h-5 text-[#FF8E53]" />
                        <span className="text-sm font-bold tracking-widest text-[#FF8E53] uppercase">Automated Sequences</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Watch Your Leads <br /><span className="text-gradient-vibrant">Convert Automatically.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light"
                    >
                        See exactly how our Voice AI handles complex scenarios, from the first contact to recovering lost revenue.
                    </motion.p>
                </div>
            </section>

            {/* Workflows Visualization */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto space-y-24">
                    {workflows.map((flow, idx) => (
                        <motion.div
                            key={flow.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Connector line for large screens */}
                            {idx !== workflows.length - 1 && (
                                <div className="hidden lg:block absolute left-12 top-24 bottom-[-96px] w-[2px] bg-gradient-to-b from-white/20 to-transparent"></div>
                            )}

                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Left side info */}
                                <div className="lg:w-1/3">
                                    <div className="sticky top-32">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-16 h-16 rounded-2xl ${flow.bg} flex items-center justify-center`}>
                                                <flow.icon className={`w-8 h-8 ${flow.color}`} />
                                            </div>
                                            <div>
                                                <span className={`text-xs font-bold uppercase tracking-wider ${flow.color}`}>{flow.status}</span>
                                                <h2 className="text-3xl font-bold">{flow.title}</h2>
                                            </div>
                                        </div>
                                        <p className="text-lg text-slate-400 font-light mb-8">
                                            {flow.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Right side steps */}
                                <div className="lg:w-2/3">
                                    <div className="dark-glass-card p-8 md:p-12 rounded-3xl border border-white/10 bg-black/50">
                                        <div className="space-y-6">
                                            {flow.steps.map((step, stepIdx) => (
                                                <div key={stepIdx} className="flex flex-col">
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-1 flex-shrink-0">
                                                            <CheckCircle2 className={`w-6 h-6 ${flow.color}`} />
                                                        </div>
                                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full">
                                                            <p className="text-lg text-white font-medium">{step}</p>
                                                        </div>
                                                    </div>
                                                    {stepIdx !== flow.steps.length - 1 && (
                                                        <div className="ml-7 mt-2 mb-2">
                                                            <ArrowDownRight className="w-5 h-5 text-slate-600" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Box */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto dark-glass-card p-12 text-center rounded-3xl border border-[#40c9ff]/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-skye opacity-10 z-0"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Need a Custom Workflow?</h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            Our AI Engineers can build bespoke voice workflows specifically mapped to your CRM logic and sales process.
                        </p>
                        <a href="/how-it-works" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-slate-200 transition-colors">
                            Learn About Our Process <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-12 px-4 border-t border-white/10 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.png" alt="Ragsites" width={24} height={24} />
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
