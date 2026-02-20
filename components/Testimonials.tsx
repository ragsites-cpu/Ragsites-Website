'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  business: string;
  industry: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Maria Santos',
    business: 'Glow & Grace Salon',
    industry: 'Beauty',
    quote: "I was skeptical at first—AI answering my clients? But honestly, it's been a game changer. I used to miss calls while I was with clients, and those were lost appointments. Now every call gets answered, and my books are fuller than ever. My clients even compliment how easy it is to schedule.",
    rating: 5,
  },
  {
    name: 'Mike Thompson',
    business: 'Thompson Plumbing Co.',
    industry: 'Plumbing',
    quote: "We're a small team, and I can't afford a full-time receptionist. The AI handles calls when we're on jobs, books the appointments, and even filters out the tire-kickers. Last month alone, it booked 23 jobs I would've missed. Pays for itself ten times over.",
    rating: 5,
  },
  {
    name: 'Dr. Priya Sharma',
    business: 'Bright Smile Dental',
    industry: 'Dental',
    quote: "Our front desk was overwhelmed with calls—appointment requests, insurance questions, you name it. The AI handles the routine stuff now, so my staff can actually focus on patients in the office. Wait times are down, patient satisfaction is up. Wish I'd done this sooner.",
    rating: 5,
  },
  {
    name: 'Carlos Rivera',
    business: 'Rivera HVAC Services',
    industry: 'HVAC',
    quote: "Summer is crazy for us. Phones ringing off the hook, and we just couldn't keep up. Now the AI catches every call, day or night. Had a customer tell me they called at 2am during a heat wave and got their appointment booked. That's a customer for life right there.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Add a staggered delay based on index
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              }, index * 150);
            }
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
          }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-brand-primary">What Business Owners Say</span>
          </h2>
          <p className="text-xl text-slate-600">
            Real stories from real businesses
          </p>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="glass-card p-8 border border-slate-200 shadow-sm"
              style={{
                opacity: visibleCards.has(index) ? 1 : 0,
                transform: visibleCards.has(index) ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-brand-accent/30 mb-4" />

              {/* Quote Text */}
              <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-bold text-brand-primary">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 font-medium">
                    {testimonial.business} · {testimonial.industry}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-200'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
