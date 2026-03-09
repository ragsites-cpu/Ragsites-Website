'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const META_PIXEL_ID = '1749584679784093';
const CAL_LINK = 'ragsites/30min';

export default function BookingPage() {
    const router = useRouter();
    const calInitialized = useRef(false);

    useEffect(() => {
        if (calInitialized.current) return;
        calInitialized.current = true;

        // ── Load Cal.com embed script ──
        (function (C: any, A: string, L: string) {
            const p = function (a: unknown, ar: unknown) {
                a = a || {};
                (C.Cal as any).ns = (C.Cal as any).ns || {};
                if (!(C.Cal as any).loaded) {
                    (C.Cal as any).ns = {};
                    (C.Cal as any).q = (C.Cal as any).q || [];
                    const d = A as unknown as Document;
                    const s = d.createElement(L);
                    (s as HTMLScriptElement).async = true;
                    (s as HTMLScriptElement).src = 'https://app.cal.com/embed/embed.js';
                    d.head.appendChild(s);
                    C.Cal = function (...args: unknown[]) {
                        C.Cal.q = C.Cal.q || [];
                        C.Cal.q.push(args);
                    } as any;
                    (C.Cal as any).loaded = true;
                }
            };
            p(null, null);
        })(window, document as any, 'script');

        // Wait a tick for the script stub to be ready, then init
        setTimeout(() => {
            if (typeof window.Cal === 'function') {
                window.Cal('init', { origin: 'https://app.cal.com' });

                window.Cal('inline', {
                    elementOrSelector: '#cal-embed',
                    calLink: CAL_LINK,
                    layout: 'month_view',
                    config: {
                        theme: 'dark',
                    },
                });

                // Listen for successful booking
                window.Cal('on', {
                    action: 'bookingSuccessful',
                    callback: () => {
                        // Fire Meta Pixel Schedule event
                        if (typeof window.fbq === 'function') {
                            window.fbq('trackSingle', META_PIXEL_ID, 'Schedule', {
                                content_name: 'Cal.com Booking',
                            });
                        }
                        // Fire GA event
                        if (typeof window.gtag === 'function') {
                            window.gtag('event', 'booking_confirmed', {
                                source: 'roofing_landing',
                            });
                        }
                        // Redirect to thank-you page
                        setTimeout(() => {
                            router.push('/go/thank-you');
                        }, 1500);
                    },
                });

                // Also listen for V2 event
                window.Cal('on', {
                    action: 'bookingSuccessfulV2',
                    callback: () => {
                        if (typeof window.fbq === 'function') {
                            window.fbq('trackSingle', META_PIXEL_ID, 'Schedule', {
                                content_name: 'Cal.com Booking',
                            });
                        }
                        if (typeof window.gtag === 'function') {
                            window.gtag('event', 'booking_confirmed', {
                                source: 'roofing_landing',
                            });
                        }
                        setTimeout(() => {
                            router.push('/go/thank-you');
                        }, 1500);
                    },
                });

                // Style the embed
                window.Cal('ui', {
                    theme: 'dark',
                    styles: { branding: { brandColor: '#40c9ff' } },
                    hideEventTypeDetails: false,
                    layout: 'month_view',
                });
            }
        }, 100);
    }, [router]);

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
                        <span className="text-xl font-bold text-white">RAGSITES</span>
                    </div>
                </div>
            </div>

            {/* Booking content */}
            <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <p className="text-[#40c9ff] text-xs font-bold uppercase tracking-widest mb-3">
                        Final Step
                    </p>
                    <h1 className="text-3xl md:text-5xl font-black mb-3">
                        Pick a Time That Works <span className="text-gradient-skye">For You</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Select a date and time below to lock in your free strategy call.
                    </p>
                </div>

                {/* Cal.com embed container */}
                <div
                    id="cal-embed"
                    className="w-full min-h-[600px] rounded-2xl overflow-hidden flex items-center justify-center"
                >
                    <div className="text-center">
                        <Loader2 className="w-10 h-10 text-[#40c9ff] animate-spin mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">Loading calendar...</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
