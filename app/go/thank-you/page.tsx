'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Phone } from 'lucide-react';
import Image from 'next/image';

export default function ThankYouPage() {

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
                        <span className="text-xl font-bold text-white">RAGSITES</span>
                    </div>
                </div>
            </div>

            {/* Confirmation content */}
            <div className="flex-1 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full text-center"
                >
                    {/* Success icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle className="w-12 h-12 text-emerald-400" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-black mb-4"
                    >
                        You&apos;re <span className="text-gradient-skye">All Set!</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-300 mb-8 leading-relaxed"
                    >
                        Your strategy call has been booked. Check your email for the confirmation and Google Meet link.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        {/* What to expect card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
                            <h3 className="text-lg font-bold text-white mb-4">What Happens Next:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#40c9ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#40c9ff] text-xs font-bold">1</span>
                                    </span>
                                    <span className="text-slate-300 text-sm">Check your inbox for the confirmation email with a Google Meet link</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#40c9ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#40c9ff] text-xs font-bold">2</span>
                                    </span>
                                    <span className="text-slate-300 text-sm">Show up on time &mdash; we have limited spots and a waitlist</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#40c9ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#40c9ff] text-xs font-bold">3</span>
                                    </span>
                                    <span className="text-slate-300 text-sm">We&apos;ll build your custom growth plan live on the call</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact info */}
                        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Need to reschedule? Let us know 24h before your call.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="py-6 px-4 border-t border-white/10 text-center">
                <p className="text-xs text-slate-600">
                    Ragsites &copy; 2025 &mdash; All Rights Reserved
                </p>
            </footer>
        </main>
    );
}
