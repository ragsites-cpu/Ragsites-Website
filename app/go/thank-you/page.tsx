'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Phone } from 'lucide-react';
import Image from 'next/image';

export default function ThankYouPage() {

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
            {/* Top bar — matches /go landing page */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900/40 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
                        <span className="text-xl font-bold text-slate-900">RAGSITES</span>
                    </div>
                </div>
            </div>

            {/* Hero area with gradient — matches /go landing page */}
            <section className="relative pt-28 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-50/50 to-slate-50 z-0 pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    {/* Success badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-black mb-3"
                    >
                        You&apos;re <span className="text-gradient-skye">All Set!</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-slate-600 mb-6 leading-relaxed max-w-xl mx-auto"
                    >
                        Your strategy call has been booked. Check your email for the confirmation and Google Meet link.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="bg-yellow-50 border border-yellow-300 rounded-xl px-5 py-4 mb-10 max-w-xl mx-auto"
                    >
                        <p className="text-sm text-slate-800 font-bold">
                            Within the next 5 minutes, you&apos;ll receive a confirmation text. Please reply <span className="text-[#991b1b]">CONFIRM</span> to let us know you&apos;ll be joining the meeting.
                        </p>
                    </motion.div>

                    {/* Video — top priority */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-black mb-4">
                            Watch This <span className="text-gradient-skye">Before Your Call</span>
                        </h2>
                        <div className="rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-200" style={{ aspectRatio: '302/135' }}>
                            <iframe
                                src="https://player.mux.com/8fgpDLmVvg3c13alcYgFAEM02Opsc5A1Qxm5GvsFpptM?autoplay=any"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                title="Watch before your call"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What Happens Next */}
            <section className="py-16 px-4 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-lg mx-auto space-y-4"
                >
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">What Happens Next:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#991b1b] text-xs font-bold">1</span>
                                </span>
                                <span className="text-slate-700 text-sm">Check your inbox for the confirmation email with a Google Meet link</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#991b1b] text-xs font-bold">2</span>
                                </span>
                                <span className="text-slate-700 text-sm">Show up on time &mdash; we have limited spots and a waitlist</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#991b1b] text-xs font-bold">3</span>
                                </span>
                                <span className="text-slate-700 text-sm">We&apos;ll build your custom growth plan live on the call</span>
                            </li>
                        </ul>
                    </div>

                    <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Need to reschedule? Let us know 24h before your call.
                    </p>
                </motion.div>
            </section>

            {/* Footer — matches /go landing page */}
            <footer className="py-10 px-4 border-t border-slate-200 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <p className="text-sm text-slate-600">
                        Ragsites &copy; 2026 - All Rights Reserved
                    </p>
                    <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
                        This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
                    </p>
                </div>
            </footer>
        </main>
    );
}
