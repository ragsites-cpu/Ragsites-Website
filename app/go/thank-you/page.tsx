'use client';

import { useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import type MuxPlayerElement from '@mux/mux-player';

export default function ThankYouPage() {
    const playerRef = useRef<MuxPlayerElement>(null);
    const [showUnmute, setShowUnmute] = useState(true);

    const handleUnmute = () => {
        if (playerRef.current) {
            playerRef.current.muted = false;
            playerRef.current.volume = 1;
            setShowUnmute(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900 flex flex-col">
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900/40 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
                        <span className="text-xl font-bold text-slate-900">RAGSITES</span>
                    </div>
                </div>
            </div>

            {/* Hero headline */}
            <div className="pt-24 pb-6 px-4 text-center bg-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                        <span className="text-[#991b1b]">Urgent</span>, Your Scale Session Registration Is Not Yet Complete, You <span className="text-[#991b1b]">Must Watch</span> This Video In Full Prior To The Meeting
                    </h1>
                </div>
            </div>

            {/* Step 1 Banner */}
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #1: Watch This Video Before Your Call
                </p>
            </div>

            {/* Video */}
            <div className="py-8 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-xl overflow-hidden border-2 border-black shadow-2xl">
                        <MuxPlayer
                            ref={playerRef}
                            playbackId="8fgpDLmVvg3c13alcYgFAEM02Opsc5A1Qxm5GvsFpptM"
                            autoPlay
                            muted
                            accentColor="#991b1b"
                            style={{ width: '100%', aspectRatio: '16/9' }}
                        />
                        {showUnmute && (
                            <button
                                onClick={handleUnmute}
                                className="absolute top-4 right-4 z-20 flex items-center gap-2 px-5 py-3 rounded-full bg-[#991b1b] text-white font-bold text-sm shadow-lg hover:scale-105 transition-all animate-pulse"
                            >
                                <Volume2 className="w-5 h-5" />
                                Tap to Unmute
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Step 2 Banner */}
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #2: Respond &quot;CONFIRM&quot; to Our Text to Confirm Your Call
                </p>
            </div>

            {/* Step 2 Content */}
            <div className="py-8 px-4 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-slate-700 leading-relaxed">
                        Within the next 5 minutes, you&apos;ll receive a confirmation text from our team.
                        Please reply <span className="font-black text-[#991b1b]">CONFIRM</span> to let us know you&apos;ll be joining the meeting.
                        This helps us prepare your custom growth plan ahead of time.
                    </p>
                </div>
            </div>

            {/* Step 3 Banner */}
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #3: Be Ready for Your Call
                </p>
            </div>

            {/* Step 3 Content */}
            <div className="py-8 px-4 bg-white">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="border-2 border-black rounded-xl p-6">
                        <h3 className="text-lg font-black text-slate-900 mb-2 uppercase">Check Your Email</h3>
                        <p className="text-slate-700 mb-4">
                            You&apos;ll receive a confirmation email with your Google Meet link. Add it to your calendar so you don&apos;t miss it.
                        </p>
                        <div className="rounded-lg overflow-hidden border border-slate-200">
                            <img
                                src="/email_guide.jpg"
                                alt="Email confirmation guide"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="border-2 border-black rounded-xl p-6">
                        <h3 className="text-lg font-black text-slate-900 mb-2 uppercase">Show Up on Time</h3>
                        <p className="text-slate-700">
                            We have limited spots and a waitlist. If you need to reschedule, let us know at least 24 hours before your call.
                        </p>
                    </div>
                    <div className="border-2 border-black rounded-xl p-6">
                        <h3 className="text-lg font-black text-slate-900 mb-2 uppercase">Come Prepared</h3>
                        <p className="text-slate-700">
                            Know your current monthly revenue, how many roofs you&apos;re closing, and your growth goals. We&apos;ll build your custom plan live on the call.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-10 px-4 border-t-2 border-black bg-white">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <p className="text-sm text-slate-600">
                        Ragsites &copy; 2026 - All Rights Reserved
                    </p>
                    <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
                    </p>
                </div>
            </footer>
        </main>
    );
}
