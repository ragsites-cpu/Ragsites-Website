'use client';

import { useRef, useState, useEffect } from 'react';
import { Volume2, CheckCircle2, Mail, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import type MuxPlayerElement from '@mux/mux-player';
import { trackPageVisit } from '@/app/actions/track';

export default function ThankYouPage() {
    const playerRef = useRef<MuxPlayerElement>(null);
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
        if (playerRef.current) {
            playerRef.current.muted = false;
            playerRef.current.volume = 1;
            setShowUnmute(false);
        }
    };

    const campaignImages = [
        { src: '/meta-campaigns/campaign-2.png', alt: 'Meta Ad Campaign Results – Client 1' },
        { src: '/meta-campaigns/campaign-3.png', alt: 'Meta Ad Campaign Results – Client 2' },
        { src: '/meta-campaigns/campaign-4.png', alt: 'Meta Ad Campaign Results – Client 3' },
        { src: '/meta-campaigns/campaign-5.png', alt: 'Meta Ad Campaign Results – Client 4' },
    ];

    const testimonialVideos = [
        { id: '21FnKkcSO35SRsOPw3CvxBmBL3HfSh6hPvxfPUIt1pE', before: '"From \'Chuck in a Truck\' to ', highlight: '30+ Extra Sales Monthly', after: '"' },
        { id: 'vHFqs02Mc6rOksLZ02nmKPgdl7WEwKZO00YiE01Vbk0001Vf8', before: '"It\'s A ', highlight: 'Game Changer', after: '"' },
        { id: '11mLPLDOWTi02LW2PsM00TEENCkkTFf7H1QDqwPUye9DM', before: '"', highlight: 'I Got My Life Back', after: '"' },
        { id: 'eEuKPe3XUUicrWrV8Oj259ca7xyTgyNlOeDOIfX01R02o', before: '"Doubled Booking Rate to ', highlight: '44% in Just One Month', after: '"' },
        { id: 'cMqAuUp2KtjGB6iGF9RFR62JkRRLWBVplKAr01p8L2Js', before: '"I\'m ', highlight: 'Not on the Phone', after: ' Until 9 PM Anymore"' },
    ];

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
                        <span className="text-[#991b1b]">You&apos;re Almost Booked.</span> Complete These 3 Steps Before Your Call
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 font-medium">
                        Follow each step below so we can hit the ground running on your call.
                    </p>
                </div>
            </div>

            {/* ─── STEP 1 BANNER ─── */}
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #1: Watch This Video Before Your Call
                </p>
            </div>

            {/* Step 1 — VSL Video */}
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

            {/* ─── STEP 2 BANNER ─── */}
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #2: Confirm Your Spot
                </p>
            </div>

            {/* Step 2 Content */}
            <div className="py-10 px-4 bg-white">
                <div className="max-w-3xl mx-auto">
                    <p className="text-center text-slate-600 text-lg mb-8 leading-relaxed">
                        Do these two things right now so your call is locked in and you don&apos;t miss it.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Text confirmation card */}
                        <div className="flex flex-col items-center text-center bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 gap-4 shadow-sm">
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
                        <div className="flex flex-col items-center text-center bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 gap-4 shadow-sm">
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
            <div className="bg-[#991b1b] border-y-2 border-black py-4 px-4">
                <p className="text-center text-white font-black text-xl md:text-2xl uppercase tracking-wide">
                    Step #3: See What We&apos;ve Done for Other Clients
                </p>
            </div>

            {/* Step 3 — Meta Campaign Proof */}
            <div className="py-12 px-4 bg-slate-900">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-2">
                        Real Ad Campaigns. <span className="text-[#991b1b]">Real Results.</span>
                    </h2>
                    <p className="text-slate-400 text-center mb-10 text-lg">
                        Here&apos;s actual proof from campaigns we&apos;ve run for roofing clients just like you.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {campaignImages.map((img, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-800">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={800}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step 3 — Testimonial Videos */}
            <div className="py-10 px-4 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-8">
                        Hear It From Our <span className="text-[#991b1b]">Clients</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-8">
                        {testimonialVideos.map((video, index) => (
                            <div key={index} className="flex flex-col">
                                <p className="text-lg md:text-xl font-black text-slate-900 mb-3 text-center">
                                    {video.before}
                                    <span className="text-[#991b1b] underline">{video.highlight}</span>
                                    {video.after}
                                </p>
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
