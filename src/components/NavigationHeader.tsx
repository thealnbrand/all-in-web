"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationHeaderProps {
  activeRoute?: 'home' | 'systems' | 'products' | 'goods' | 'philosophy';
  transparentOnTop?: boolean;
  actionLabel?: string;
  actionHref?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeRoute = 'home',
  transparentOnTop = false,
  actionLabel = '[ INITIATE ]',
  actionHref = '#contact',
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(!transparentOnTop);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!transparentOnTop) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 80;
      setIsScrolled(scrollY > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparentOnTop]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[76px] sm:h-[88px] transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-xl'
            : 'bg-transparent backdrop-blur-none border-b border-[#D4AF37]/15'
        }`}
      >
        {/* Far Left: Logo Anchor */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
        >
          <div className="relative h-8 sm:h-9 w-20 sm:w-24 flex items-center">
            <Image
              src="/logo.png"
              alt="[ALN] Logo"
              width={110}
              height={70}
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="font-mono text-sm sm:text-base font-extrabold tracking-widest text-[#E5E7EB] hidden xs:flex items-center gap-2">
            <span>
              <span className="text-[#D4AF37]">[</span> ALN{' '}
              <span className="text-[#D4AF37]">]</span>
            </span>
            <span className="text-white/30 font-normal">|</span>
            <span className="text-xs font-bold text-[#E5E7EB]/90 tracking-widest">ALL IN</span>
          </span>
        </Link>

        {/* Center: The 4 Core Routes (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] lg:text-xs font-bold tracking-wider text-[#E5E7EB]/90">
          <Link
            href="/systems"
            className={`transition-colors flex items-center gap-1 group pb-0.5 ${
              activeRoute === 'systems'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'hover:text-[#D4AF37]'
            }`}
          >
            <span className="text-[#D4AF37] group-hover:underline">01 //</span> SYSTEMS
          </Link>
          <Link
            href="/products"
            className={`transition-colors flex items-center gap-1 group pb-0.5 ${
              activeRoute === 'products'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'hover:text-[#D4AF37]'
            }`}
          >
            <span className="text-[#D4AF37] group-hover:underline">02 //</span> PRODUCTS
          </Link>
          <Link
            href="/goods"
            className={`transition-colors flex items-center gap-1 group pb-0.5 ${
              activeRoute === 'goods'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'hover:text-[#D4AF37]'
            }`}
          >
            <span className="text-[#D4AF37] group-hover:underline">03 //</span> GOODS
          </Link>
          <Link
            href="/philosophy"
            className={`transition-colors flex items-center gap-1 group pb-0.5 ${
              activeRoute === 'philosophy'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'hover:text-[#D4AF37]'
            }`}
          >
            <span className="text-[#D4AF37] group-hover:underline">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        {/* Far Right: Action CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Action Button */}
          <a
            href={actionHref}
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-[11px] sm:text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-3.5 sm:px-5 py-2 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <span>{actionLabel}</span>
          </a>

          {/* Mobile Menu Toggle Button (Visible only on < md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#152319] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#243528] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0E1710]/95 backdrop-blur-xl pt-[84px] sm:pt-[96px] flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="space-y-4 pt-2">
            <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase border-b border-white/10 pb-2">
              // STUDIO NAVIGATION
            </div>

            <nav className="flex flex-col space-y-2.5 font-mono text-base font-bold">
              <Link
                href="/systems"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  activeRoute === 'systems'
                    ? 'bg-[#152319] border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#1B291F]/60 border-white/10 text-white hover:border-[#D4AF37]/50'
                }`}
              >
                <span><span className="text-[#D4AF37]">01 //</span> SYSTEMS</span>
                <span className="text-xs text-[#D4AF37]">→</span>
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  activeRoute === 'products'
                    ? 'bg-[#152319] border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#1B291F]/60 border-white/10 text-white hover:border-[#D4AF37]/50'
                }`}
              >
                <span><span className="text-[#D4AF37]">02 //</span> PRODUCTS</span>
                <span className="text-xs text-[#D4AF37]">→</span>
              </Link>

              <Link
                href="/goods"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  activeRoute === 'goods'
                    ? 'bg-[#152319] border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#1B291F]/60 border-white/10 text-white hover:border-[#D4AF37]/50'
                }`}
              >
                <span><span className="text-[#D4AF37]">03 //</span> GOODS</span>
                <span className="text-xs text-[#D4AF37]">→</span>
              </Link>

              <Link
                href="/philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  activeRoute === 'philosophy'
                    ? 'bg-[#152319] border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#1B291F]/60 border-white/10 text-white hover:border-[#D4AF37]/50'
                }`}
              >
                <span><span className="text-[#D4AF37]">04 //</span> PHILOSOPHY</span>
                <span className="text-xs text-[#D4AF37]">→</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Telemetry & Direct Action */}
          <div className="space-y-4 pt-6 border-t border-white/10 font-mono text-xs">
            <div className="flex items-center justify-between text-[#9CA3AF]">
              <span>📍 35.7595° N, 5.8340° W</span>
              <span className="text-emerald-400 font-bold">SYS ACTIVE</span>
            </div>

            <a
              href={actionHref}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center font-bold text-[#152319] bg-[#D4AF37] py-3.5 rounded-xl shadow-lg uppercase"
            >
              {actionLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
