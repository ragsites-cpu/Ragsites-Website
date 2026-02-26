'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero-section' },
    { label: 'Demo', id: 'demo-section' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing-section' },
    { label: 'Contact', id: 'contact-section' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt="Ragsites" width={32} height={32} className="rounded-full" />
            <span className="text-xl font-bold gradient-text">RAGSITES</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-black hover:text-gray-700 hover:bg-black/5 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="/quiz"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-semibold text-sm hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-black hover:text-gray-700"
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
          <div className="md:hidden py-4 border-t border-black/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 text-left text-sm font-medium text-black hover:text-gray-700 hover:bg-black/5 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/quiz"
                className="mx-4 mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-semibold text-sm text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
