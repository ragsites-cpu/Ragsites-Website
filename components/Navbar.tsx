'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/#pricing-section' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt="Ragsites" width={36} height={36} className="rounded-full" />
            <span className="text-2xl font-bold text-white">RAGSITES</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/quiz"
              className="px-6 py-2.5 rounded-full bg-gradient-skye text-white font-semibold text-sm shadow-[0_0_15px_rgba(232,28,255,0.4)] hover:shadow-[0_0_25px_rgba(64,201,255,0.6)] hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-slate-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-black/95 backdrop-blur-xl absolute left-0 right-0 px-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-left text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 mt-2 px-6 py-3 rounded-full bg-gradient-skye text-white font-semibold text-sm text-center shadow-[0_0_15px_rgba(232,28,255,0.4)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
