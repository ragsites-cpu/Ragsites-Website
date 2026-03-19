'use client';

import { useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import type MuxPlayerElement from '@mux/mux-player';

export default function ThankYouPage() {
    const playerRef = useRef<MuxPlayerElement>(null);
    const [showUnmute, setShowUnmute] = useState(true);
    const [dailyAdSpend, setDailyAdSpend] = useState(30);
    const [avgJobValue, setAvgJobValue] = useState(8000);

    const spend = dailyAdSpend;
    const job = avgJobValue;
    const monthlyAdSpend = spend * 30;
    const monthlyLeads = monthlyAdSpend / 40;
    const monthlyJobs = Math.floor(monthlyLeads * 0.5);
    const monthlyRevenue = monthlyJobs * job;
    const monthlyProfit = monthlyRevenue - monthlyAdSpend;
    const roiPercent = monthlyAdSpend > 0 ? Math.round((monthlyProfit / monthlyAdSpend) * 100) : 0;
    const showResults = true;

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
                        <Image src="/new-logo.png" alt="Ragsites" width={32} height={32} />
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

            {/* ROI Calculator */}
            <div className="py-12 px-4 bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-2">
                        Monthly <span className="text-[#991b1b]">ROI</span> Calculator
                    </h2>
                    <p className="text-slate-400 text-center mb-8">
                        See how much profit you&apos;ll generate with our system.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Inputs */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                                        Daily Ad Spend
                                    </label>
                                    <span className="text-lg font-black text-white bg-slate-800 border border-slate-600 rounded-lg px-4 py-1">
                                        ${dailyAdSpend}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={10}
                                    max={200}
                                    step={5}
                                    value={dailyAdSpend}
                                    onChange={(e) => setDailyAdSpend(Number(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700 accent-[#991b1b]"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                                        Average Roofing Job Value
                                    </label>
                                    <span className="text-lg font-black text-white bg-slate-800 border border-slate-600 rounded-lg px-4 py-1">
                                        ${avgJobValue.toLocaleString()}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={1000}
                                    max={50000}
                                    step={500}
                                    value={avgJobValue}
                                    onChange={(e) => setAvgJobValue(Number(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700 accent-[#991b1b]"
                                />
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-slate-200">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#991b1b] mb-4">
                                Your Estimated Monthly Returns
                            </p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600 text-sm">Monthly ad spend</span>
                                    <span className="font-bold text-slate-900">${monthlyAdSpend.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600 text-sm">Leads generated</span>
                                    <span className="font-bold text-slate-900">{Math.floor(monthlyLeads)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600 text-sm">Jobs closed</span>
                                    <span className="font-bold text-slate-900">{monthlyJobs}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600 text-sm">Monthly revenue</span>
                                    <span className="font-bold text-slate-900">${monthlyRevenue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-slate-900 font-black text-lg">Profit</span>
                                    <span className="font-black text-2xl text-emerald-600">${monthlyProfit.toLocaleString()}</span>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                                    <p className="text-sm text-emerald-700 font-medium">Return on Ad Spend</p>
                                    <p className="text-4xl font-black text-emerald-600">{roiPercent.toLocaleString()}%</p>
                                </div>
                            </div>
                        </div>
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
                        Before 24 hours of the call, you&apos;ll receive a confirmation text from our team.
                        Please reply <span className="font-black text-[#991b1b]">CONFIRM</span> to let us know you&apos;ll be joining the meeting.
                        This helps us prepare your custom growth plan ahead of time.
                    </p>
                </div>
            </div>

            {/* Step 3 Banner */}
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #3: See What Our Clients Have to Say
                </p>
            </div>

            {/* Step 3 Content — Testimonial Videos */}
            <div className="py-8 px-4 bg-white">
                <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
                    {[
                        { id: '21FnKkcSO35SRsOPw3CvxBmBL3HfSh6hPvxfPUIt1pE', before: '"From \'Chuck in a Truck\' to ', highlight: '30+ Extra Sales Monthly', after: '"' },
                        { id: 'vHFqs02Mc6rOksLZ02nmKPgdl7WEwKZO00YiE01Vbk0001Vf8', before: '"It\'s A ', highlight: 'Game Changer', after: '"' },
                        { id: '11mLPLDOWTi02LW2PsM00TEENCkkTFf7H1QDqwPUye9DM', before: '"', highlight: 'I Got My Life Back', after: '"' },
                        { id: 'eEuKPe3XUUicrWrV8Oj259ca7xyTgyNlOeDOIfX01R02o', before: '"Doubled Booking Rate to ', highlight: '44% in Just One Month', after: '"' },
                        { id: 'cMqAuUp2KtjGB6iGF9RFR62JkRRLWBVplKAr01p8L2Js', before: '"I\'m ', highlight: 'Not on the Phone', after: ' Until 9 PM Anymore"' },
                    ].map((video, index) => (
                        <div key={index} className="flex flex-col">
                            <p className="text-lg md:text-xl font-black text-slate-900 mb-3 text-center">{video.before}<span className="text-[#991b1b] underline">{video.highlight}</span>{video.after}</p>
                            <div className="rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-200 aspect-video">
                                <iframe
                                    src={`https://player.mux.com/${video.id}`}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    title={`Testimonial Video ${index + 1}`}
                                />
                            </div>
                        </div>
                    ))}
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
