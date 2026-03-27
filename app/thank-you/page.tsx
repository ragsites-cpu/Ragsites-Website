'use client';

import { useRef, useState, useEffect } from 'react';
import { Volume2, CheckCircle2, Mail, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import PersonaPlexDemo from '@/components/PersonaPlexDemo';
import { trackPageVisit } from '@/app/actions/track';

export default function ThankYouPage() {
    const [showUnmute, setShowUnmute] = useState(true);
    const visitIdRef = useRef('');

    useEffect(() => {
        trackPageVisit('/thank-you').then((id) => { visitIdRef.current = id; });

        const startTime = Date.now();
        let maxScroll = 0;
        let sent = false;

        const updateScroll = () => {
            const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (pct > maxScroll) maxScroll = pct;
        };

        const sendEngagement = () => {
            if (sent || !visitIdRef.current) return;
            sent = true;
            const blob = new Blob([JSON.stringify({
                visitId: visitIdRef.current,
                timeOnPageSeconds: Math.round((Date.now() - startTime) / 1000),
                maxScrollPercent: Math.round(maxScroll),
            })], { type: 'application/json' });
            navigator.sendBeacon('/api/track', blob);
        };

        window.addEventListener('scroll', updateScroll, { passive: true });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') sendEngagement();
        });
        window.addEventListener('pagehide', sendEngagement);

        return () => {
            window.removeEventListener('scroll', updateScroll);
            window.removeEventListener('pagehide', sendEngagement);
        };
    }, []);

    const handleUnmute = () => {
        setShowUnmute(false);
    };

    const campaignImages = [
        { src: '/meta-campaigns/campaign-2.png', alt: 'Meta Ad Campaign Results – Client 1' },
        { src: '/meta-campaigns/campaign-3.png', alt: 'Meta Ad Campaign Results – Client 2' },
        { src: '/meta-campaigns/campaign-4.png', alt: 'Meta Ad Campaign Results – Client 3' },
        { src: '/meta-campaigns/campaign-5.png', alt: 'Meta Ad Campaign Results – Client 4' },
    ];

    const testimonialVideos = [
        { id: 'OhDg8ahNr01gbToDYtYvrurAPGVZKdGxChldKuqz5t5E', before: '"Doubled Weekly Booking Rates ', highlight: 'in 30 Days', after: '"' },
        { id: '21FnKkcSO35SRsOPw3CvxBmBL3HfSh6hPvxfPUIt1pE', before: '"From \'Chuck in a Truck\' to ', highlight: '30+ Extra Sales Monthly', after: '"' },
        { id: 'jsOjDYJRqSEfTDmcXY31mj68PIMjXXX1kQg1G02evppU', before: '"', highlight: 'Job Volume Doubled', after: '"' },
        { id: 'vHFqs02Mc6rOksLZ02nmKPgdl7WEwKZO00YiE01Vbk0001Vf8', before: '"It\'s A ', highlight: 'Game Changer', after: '"' },
        { id: '11mLPLDOWTi02LW2PsM00TEENCkkTFf7H1QDqwPUye9DM', before: '"', highlight: 'I Got My Life Back', after: '"' },
        { id: 'eEuKPe3XUUicrWrV8Oj259ca7xyTgyNlOeDOIfX01R02o', before: '"Doubled Booking Rate to ', highlight: '44% in Just One Month', after: '"' },
        { id: 'cMqAuUp2KtjGB6iGF9RFR62JkRRLWBVplKAr01p8L2Js', before: '"I\'m ', highlight: 'Not on the Phone', after: ' Until 9 PM Anymore"' },
    ];

    return (
        <main className="min-h-screen bg-[#F0F7FF] text-slate-900 flex flex-col">
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/new-logo.png" alt="Ragsites" width={32} height={32} />
                        <span className="text-xl font-bold text-slate-900">RAGSITES</span>
                    </div>
                </div>
            </div>

            {/* Hero headline */}
            <div className="relative pt-28 pb-14 px-4 text-center bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F0F7FF] to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-white">
                        <span className="text-[#991b1b]">You&apos;re Almost Booked.</span> Please Watch This 90 Second Video.
                    </h1>
                    <p className="mt-5 text-lg text-slate-400 font-medium">
                        Follow each step below so we can hit the ground running on your call.
                    </p>
                </div>
            </div>

            {/* ─── STEP 1 BANNER ─── */}
            <div className="px-4 py-2 bg-[#F0F7FF]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-[#991b1b] px-6 py-4 flex items-center gap-4">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#991b1b] text-white font-black text-lg flex items-center justify-center">1</span>
                        <p className="text-slate-900 font-black text-lg md:text-xl uppercase tracking-wide">
                            Important: Don&apos;t Skip This
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 1 — VSL Video */}
            <div className="py-8 px-4 bg-[#F0F7FF]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-md p-3 md:p-4">
                        <div className="relative rounded-xl overflow-hidden">
                            <iframe
                                src="https://player.mux.com/rPDaogXw4RXBt85c6a2nB99tgH5vi7Zfo01EXXmaI01t8?autoplay=1&muted=1"
                                style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                title="Strategy Call Video"
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
            </div>

            {/* ─── STEP 2 BANNER ─── */}
            <div className="px-4 py-2 bg-[#F0F7FF]">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-[#991b1b] px-6 py-4 flex items-center gap-4">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#991b1b] text-white font-black text-lg flex items-center justify-center">2</span>
                        <p className="text-slate-900 font-black text-lg md:text-xl uppercase tracking-wide">
                            Confirm Your Spot
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 2 Content */}
            <div className="py-8 px-4 bg-[#F0F7FF]">
                <div className="max-w-3xl mx-auto">
                    <p className="text-center text-slate-600 text-lg mb-8 leading-relaxed">
                        Do these two things right now so your call is locked in and you don&apos;t miss it.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Text confirmation card */}
                        <div className="flex flex-col items-center text-center bg-white border border-slate-200 rounded-2xl p-8 gap-4 shadow-md">
                            <div className="w-16 h-16 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                                <MessageSquare className="w-8 h-8 text-[#991b1b]" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Reply &quot;CONFIRM&quot;</h3>
                            <p className="text-slate-600 leading-relaxed">
                                You&apos;ll receive a text from our team before your call.
                                Reply <span className="font-black text-[#991b1b]">CONFIRM</span> so we know you&apos;ll be there and can prepare your custom growth plan.
                            </p>
                            <div className="flex items-center gap-2 bg-[#991b1b]/10 text-[#991b1b] font-bold rounded-full px-4 py-2 text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Reply CONFIRM to our text
                            </div>
                        </div>

                        {/* Email / calendar card */}
                        <div className="flex flex-col items-center text-center bg-white border border-slate-200 rounded-2xl p-8 gap-4 shadow-md">
                            <div className="w-16 h-16 rounded-full bg-[#991b1b]/10 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-[#991b1b]" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Star Your Calendar Invite</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Check your inbox for a calendar invite from Ragsites. Star it or mark it as important so it doesn&apos;t get buried — then add it to your calendar.
                            </p>
                            <div className="flex items-center gap-2 bg-[#991b1b]/10 text-[#991b1b] font-bold rounded-full px-4 py-2 text-sm">
                                <Star className="w-4 h-4" />
                                Star the email &amp; add to calendar
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── STEP 3 BANNER ─── */}
            <div className="px-4 py-2 bg-[#F0F7FF]">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-[#991b1b] px-6 py-4 flex items-center gap-4">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#991b1b] text-white font-black text-lg flex items-center justify-center">3</span>
                        <p className="text-slate-900 font-black text-lg md:text-xl uppercase tracking-wide">
                            Experience Your Lead Qualification Agent Live
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 3 — AI Demo */}
            <div className="py-10 px-4 bg-[#F0F7FF]">
                <div className="max-w-7xl mx-auto">
                    <iframe
                        src="https://personaplex-receptionist.fly.dev/demo"
                        width="100%"
                        height="900"
                        frameBorder="0"
                        style={{ borderRadius: '20px', overflow: 'hidden' }}
                        title="AI Lead Qualification Demo"
                    />
                </div>
            </div>

            {/* Step 3 — Testimonial Videos */}
            <div className="py-10 px-4 bg-[#F0F7FF]">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-8">
                        Hear It From Our <span className="text-[#991b1b]">Clients</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-8">
                        {testimonialVideos.map((video, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">
                                <p className="text-lg md:text-xl font-black text-slate-900 mb-4 text-center">
                                    {video.before}
                                    <span className="text-[#991b1b] underline">{video.highlight}</span>
                                    {video.after}
                                </p>
                                <div className="rounded-xl overflow-hidden bg-black aspect-video">
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
            </div>

            {/* Footer */}
            <footer className="py-10 px-4 border-t border-slate-200 bg-[#F0F7FF]">
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
