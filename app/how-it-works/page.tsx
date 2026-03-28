'use client';

import { motion } from 'framer-motion';
import { Settings, Wrench, Rocket, TrendingUp, Cpu, BrainCircuit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const timelineSteps = [
    {
        day: 'Days 1-3',
        icon: Settings,
        title: 'Strategy & Knowledge Transfer',
        description: 'We meet with you to understand your roofing business inside out. We map your service areas, pricing structure, ideal customer profile, and common homeowner objections.',
        team: 'Growth Analyst & Success Manager'
    },
    {
        day: 'Days 4-10',
        icon: Wrench,
        title: 'Build, Integrate & Ad Setup',
        description: 'Our engineers build your AI qualification agent, integrate with your CRM, and set up your Meta ad campaigns targeting homeowners in your service areas looking for roof replacements.',
        team: 'AI Engineer'
    },
    {
        day: 'Days 11-13',
        icon: Cpu,
        title: 'Internal Testing & QA',
        description: 'We run hundreds of simulated calls against the AI, deliberately trying to confuse it or interrupt it, ensuring it handles every edge case flawlessly.',
        team: 'QA Specialist'
    },
    {
        day: 'Day 14',
        icon: Rocket,
        title: 'Launch & Ads Go Live',
        description: 'We flip the switch. Your Meta ad campaigns go live, your AI qualification agent starts calling leads within minutes of form submission, and appointment reminders are automated.',
        team: 'Full Team'
    },
    {
        day: 'Day 15+',
        icon: TrendingUp,
        title: 'Optimization & Sales Coaching',
        description: 'We monitor your ad performance, listen to AI qualification calls, and analyze your sales call transcripts. We continuously optimize your campaigns, AI scripts, and deliver coaching insights to improve your close rate week over week.',
        team: 'Growth Analyst'
    },
    {
        day: 'Week 3+',
        icon: BrainCircuit,
        title: 'Sales Call Intelligence Activated',
        description: 'Our proprietary transcription software begins analyzing your sales calls. You get scorecards showing exactly what went right, what went wrong, and specific rebuttals to use on your next estimate.',
        team: 'AI Coach'
    },
    {
        day: 'Month 2+',
        icon: TrendingUp,
        title: 'Scale & Expand',
        description: 'With data flowing in, we scale your ad budget into winning campaigns, expand into new zip codes, and fine-tune your AI agent based on real qualification call data. Your pipeline grows every month.',
        team: 'Growth Team'
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-40 pb-20 px-4 relative overflow-hidden">
                <div className="glow-orb glow-orb-purple w-[800px] h-[800px] top-0 left-0 -translate-x-1/4 -translate-y-1/4 opacity-20" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Zero to <span className="text-gradient-skye">Automated</span><br /> in 14 Days.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light"
                    >
                        Forget DIY software. We assign a dedicated team to build your entire roofing growth system — from Meta ad campaigns to AI lead qualification to sales call coaching.
                    </motion.p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative border-l-2 border-brand-accent/30 md:ml-20 ml-6">

                        {timelineSteps.map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                variants={fadeUp}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mb-16 ml-10 md:ml-16 relative"
                            >
                                {/* Connecting Node */}
                                <div className="absolute -left-[50px] md:-left-[74px] top-6 w-6 h-6 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(64,201,255,0.8)] border-4 border-black"></div>

                                <div className="dark-glass-card p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#40c9ff]/20 to-[#e81cff]/20 flex items-center justify-center">
                                                <step.icon className="w-6 h-6 text-[#40c9ff]" />
                                            </div>
                                            <div>
                                                <span className="text-[#e81cff] font-bold text-sm uppercase tracking-wider block mb-1">{step.day}</span>
                                                <h3 className="text-2xl font-bold">{step.title}</h3>
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-right">
                                            <span className="text-slate-500 text-sm uppercase tracking-wider block">Managed By</span>
                                            <span className="text-slate-300 font-medium">{step.team}</span>
                                        </div>
                                    </div>

                                    <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                                        {step.description}
                                    </p>

                                    <div className="md:hidden mt-6 pt-4 border-t border-white/10">
                                        <span className="text-slate-500 text-sm uppercase tracking-wider block mb-1">Managed By</span>
                                        <span className="text-slate-300 font-medium">{step.team}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Audit Form Section (Lead Gen) */}
            <section className="py-24 px-4 bg-white/5 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">See What 40 Booked Jobs Looks Like</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Book a strategy call and we&apos;ll show you exactly how we&apos;d fill your roofing calendar in the first 90 days.
                    </p>
                    <a href="/go" className="inline-block px-10 py-5 rounded-full bg-gradient-skye text-white font-bold text-xl shadow-[0_0_30px_rgba(232,28,255,0.3)] hover:scale-105 transition-all">
                        Book a Strategy Call
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
