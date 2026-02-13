'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix/prefix
    const match = value.match(/^([^0-9]*)([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes('.');
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * eased;

      if (step >= steps) {
        setDisplayValue(`${prefix}${isDecimal ? numericTarget.toFixed(1) : Math.round(numericTarget)}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayValue(`${prefix}${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : '0'}
    </span>
  );
}
