"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContactSection } from '../../components/ContactSection';
import { Footer } from '../../components/Footer';
import { BackgroundWatermark } from '../../components/BackgroundWatermark';

export default function ManifestoPage() {
  const [inquirySubject, setInquirySubject] = useState<string>('INQUIRY: STUDIO MANIFESTO & ABOUT');
  const [reelScene, setReelScene] = useState<number>(0);
  const [reelFinished, setReelFinished] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Bulletproof skip: cancels all running timeouts and reveals About immediately
  const skipReel = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    setReelFinished(true);
  }, []);

  // Cinematic Video Reel Sequence
  useEffect(() => {
    timersRef.current.push(
      setTimeout(() => {
        setHasStarted(true);
        setReelScene(1);
      }, 400)
    );

    // Scene 1: Logo & Coordinates (0.4s -> 3.0s)
    timersRef.current.push(
      setTimeout(() => {
        setReelScene(2);
      }, 3000)
    );

    // Scene 2: The Motto (3.0s -> 5.5s)
    timersRef.current.push(
      setTimeout(() => {
        setReelScene(3);
      }, 5500)
    );

    // Scene 3: The 3 Pillars (5.5s -> 8.2s)
    timersRef.current.push(
      setTimeout(() => {
        setReelScene(4);
      }, 8200)
    );

    // Scene 4: The Humans (8.2s -> 11.0s)
    timersRef.current.push(
      setTimeout(() => {
        skipReel();
      }, 11000)
    );

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [skipReel]);

  // Keyboard controls: Enter or Spacebar immediately skips film
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      const key = e.key;
      const code = e.code;

      if (
        key === 'Enter' ||
        key === ' ' ||
        key === 'Spacebar' ||
        code === 'Space' ||
        code === 'Enter' ||
        code === 'NumpadEnter'
      ) {
        e.preventDefault();
        e.stopPropagation();
        skipReel();
      }
    };

    if (!reelFinished) {
      window.addEventListener('keydown', handleKeyDown, true);
      document.addEventListener('keydown', handleKeyDown, true);
      // Automatically focus overlay so keystrokes register immediately
      overlayRef.current?.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [reelFinished, skipReel]);

  return (
    <div className="min-h-screen w-full bg-[#243528] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F] relative">
      <BackgroundWatermark />
      {/* ========================================================================= */}
      {/* PHASE 1: CINEMATIC REEL EXPERIENCE (STARTS COMPLETELY EMPTY)              */}
      {/* ========================================================================= */}
      {!reelFinished && (
        <div
          ref={overlayRef}
          tabIndex={0}
          onClick={skipReel}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
              e.preventDefault();
              skipReel();
            }
          }}
          className="fixed inset-0 z-[100] bg-[#0A100B] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none cursor-pointer outline-none"
          title="Click anywhere or press Enter/Space to enter About page"
        >
          {/* Top Header Bar inside Reel */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[#D4AF37] font-bold tracking-widest uppercase">
                {hasStarted ? `SCENE 0${reelScene} // 04` : 'STANDBY'}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                skipReel();
              }}
              className="px-4 py-1.5 rounded-full bg-[#1B291F] text-[#E5E7EB] hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer font-bold flex items-center gap-1.5"
            >
              <span>[ SKIP TO ABOUT ]</span>
              <span>→</span>
            </button>
          </div>

          {/* Central Cinematic Scene Projection */}
          <div className="relative flex-1 flex items-center justify-center text-center px-4 max-w-4xl mx-auto w-full">
            {/* Ambient Gold Glow */}
            <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

            {/* SCENE 1: The Origin & Logo */}
            <div
              className={`transition-all duration-1000 ease-out transform ${
                reelScene === 1
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-6 absolute pointer-events-none'
              }`}
            >
              <div className="space-y-6 flex flex-col items-center">
                <div className="relative w-[280px] sm:w-[420px] md:w-[500px] aspect-[3/1] filter drop-shadow-[0_0_40px_rgba(212,175,55,0.6)]">
                  <Image
                    src="/logo.png"
                    alt="ALL IN Studio Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1 font-mono">
                  <span className="text-[#D4AF37] font-extrabold text-xs sm:text-sm tracking-widest uppercase block">
                    📍 35.7595° N, 5.8340° W · TANGIER HQ
                  </span>
                  <span className="text-[#9CA3AF] text-xs tracking-wider block">
                    STRAIT OF GIBRALTAR · MOROCCO
                  </span>
                </div>
              </div>
            </div>

            {/* SCENE 2: The Core Motto */}
            <div
              className={`transition-all duration-1000 ease-out transform ${
                reelScene === 2
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-6 absolute pointer-events-none'
              }`}
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase block">
                  // THE STUDIO ETHOS
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_35px_rgba(212,175,55,0.6)]">
                    ALL LINES.
                  </span> <br />
                  <span>ALL IDEAS.</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                    NOW.
                  </span>
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#E5E7EB]/80 italic pt-2 max-w-lg mx-auto">
                  “We don&apos;t outsource the machine. We ship the entire architecture.”
                </p>
              </div>
            </div>

            {/* SCENE 3: The Three Pillars */}
            <div
              className={`transition-all duration-1000 ease-out transform ${
                reelScene === 3
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-6 absolute pointer-events-none'
              }`}
            >
              <div className="space-y-6 w-full max-w-2xl mx-auto">
                <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase block">
                  // THE THREE CORE DISCIPLINES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-left">
                  <div className="bg-[#152319] p-5 rounded-xl border border-[#D4AF37]/40 space-y-2">
                    <span className="text-[#D4AF37] font-extrabold block text-sm">01 // SYSTEMS</span>
                    <p className="text-white text-xs font-bold">Custom Web Software</p>
                    <p className="text-[11px] text-[#9CA3AF] font-sans">Full-stack SaaS, marketplaces & cloud systems.</p>
                  </div>

                  <div className="bg-[#152319] p-5 rounded-xl border border-[#D4AF37]/40 space-y-2">
                    <span className="text-[#D4AF37] font-extrabold block text-sm">02 // PRODUCTS</span>
                    <p className="text-white text-xs font-bold">Digital Creations</p>
                    <p className="text-[11px] text-[#9CA3AF] font-sans">Tools, starters & utilities on Gumroad.</p>
                  </div>

                  <div className="bg-[#152319] p-5 rounded-xl border border-[#D4AF37]/40 space-y-2">
                    <span className="text-[#D4AF37] font-extrabold block text-sm">03 // GOODS</span>
                    <p className="text-white text-xs font-bold">Tactile Apparel</p>
                    <p className="text-[11px] text-[#9CA3AF] font-sans">Heavyweight graphic streetwear on Etsy.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SCENE 4: The Humans */}
            <div
              className={`transition-all duration-1000 ease-out transform ${
                reelScene === 4
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-6 absolute pointer-events-none'
              }`}
            >
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="font-mono text-xs text-emerald-400 font-extrabold tracking-widest uppercase block">
                  // THE REAL CREATORS
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  No Account Managers. <br />
                  No 40-Person Email Chains.
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#E5E7EB]/85 leading-relaxed">
                  Just two caffeinated Moroccan nerds in Tangier turning ideas into production code and physical garments.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-xs text-[#D4AF37] bg-[#152319] px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
                    FUELED BY MINT TEA & ZERO BULLSHIT 🍵
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="w-full space-y-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] transition-all duration-1000 ease-linear"
                style={{
                  width: `${Math.min(100, (reelScene / 4) * 100)}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-[#9CA3AF]">
              <span>ALL IN STUDIO FILM · TANGIER</span>
              <button
                onClick={skipReel}
                className="hover:text-[#D4AF37] text-white/70 transition-colors cursor-pointer font-bold"
              >
                [ PRESS ENTER, SPACEBAR, OR CLICK ANYWHERE TO ENTER → ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 2: CLEAN, MINIMAL "ABOUT US" PAGE (FEW WORDS, BIG IMPACT)           */}
      {/* ========================================================================= */}
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[88px] bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-xl">
        {/* Far Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="relative h-9 w-24 flex items-center">
            <Image src="/logo.png" alt="[ALN] Logo" width={110} height={70} className="h-full w-auto object-contain" priority />
          </div>
          <span className="font-mono text-base font-extrabold tracking-widest text-[#E5E7EB] hidden xs:flex items-center gap-2">
            <span><span className="text-[#D4AF37]">[</span> ALN <span className="text-[#D4AF37]">]</span></span>
            <span className="text-white/30 font-normal">|</span>
            <span className="text-xs font-bold text-[#E5E7EB]/90 tracking-widest">ALL IN</span>
          </span>
        </Link>

        {/* Center: Route Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] lg:text-xs font-bold tracking-wider">
          <Link href="/systems" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">01 //</span> SYSTEMS
          </Link>
          <Link href="/products" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">02 //</span> PRODUCTS
          </Link>
          <Link href="/goods" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">03 //</span> GOODS
          </Link>
          <Link href="/philosophy" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 flex items-center gap-1">
            <span className="text-[#D4AF37]">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        {/* Far Right: Contact */}
        <a
          href="#contact"
          className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer"
        >
          [ GET IN TOUCH ]
        </a>
      </header>

      {/* Main Clean About Content */}
      <main className="pt-32 pb-20 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto space-y-20">
        {/* HERO: EDITORIAL PHOTO (OPTION B) & PUNCHY STATEMENT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E5E7EB]/10 pb-16">
          {/* Left Column: Short Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#9CA3AF]">
              <span className="text-[#D4AF37] font-bold">04 // PHILOSOPHY</span>
              <span>/</span>
              <span>ABOUT THE STUDIO</span>
              <span className="bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-bold">
                📍 TANGIER HQ
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                We Ship the Entire Machine. From Tangier to the World.
              </h1>
              <p className="text-sm sm:text-base text-[#D4AF37] font-mono italic">
                “ALL LINES. ALL IDEAS. NOW.”
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#E5E7EB]/85 font-sans leading-relaxed max-w-xl">
              <p>
                <strong>ALL IN</strong> is an independent multidisciplinary studio in Tangier, Morocco. Perched where the Mediterranean meets the Atlantic, we build at the boundary of heavy tactile craftsmanship and modern digital engineering.
              </p>
              <p>
                No corporate layers, no outsourced middleman code. We partner directly with founders to architect scalable production software, publish independent digital tools, and drop archival heavyweight streetwear.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-bold">
                100% CODE OWNERSHIP
              </span>
              <span className="bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-white font-bold">
                ZERO MIDDLEMEN
              </span>
              <span className="bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-emerald-400 font-bold">
                DIRECT FOUNDER ACCESS
              </span>
            </div>
          </div>

          {/* Right Column: The Option B Picture */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl group bg-[#111A13]">
              <Image
                src="/Option B.jfif"
                alt="ALL IN Studio Archival Piece"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <span className="text-[#D4AF37] font-bold">[ ALN ] STUDIO ARCHIVE</span>
                <span className="text-[#9CA3AF] text-[10px]">TANGIER · 35.7595° N</span>
              </div>
            </div>
          </div>
        </section>

        {/* THE 3 CORE PILLARS (CLEAN & DIRECT) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase">
              // WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Three Disciplines. One Studio.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* 01 Systems */}
            <div className="bg-[#1B291F] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[#D4AF37] font-extrabold text-sm block">01 // SYSTEMS</span>
                <h3 className="text-lg font-bold text-white font-sans">Full-Stack Web Engineering</h3>
                <p className="text-xs text-[#9CA3AF] font-sans leading-relaxed">
                  We build custom SaaS, marketplaces, and e-commerce flagships from scratch. PostgreSQL, Next.js 16, sub-second speeds.
                </p>
              </div>
              <Link
                href="/systems"
                className="font-bold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] py-2 px-4 rounded-full text-center transition-all block mt-2"
              >
                [ EXPLORE SYSTEMS → ]
              </Link>
            </div>

            {/* 02 Products */}
            <div className="bg-[#1B291F] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[#D4AF37] font-extrabold text-sm block">02 // PRODUCTS</span>
                <h3 className="text-lg font-bold text-white font-sans">Digital Tools & Blueprints</h3>
                <p className="text-xs text-[#9CA3AF] font-sans leading-relaxed">
                  Independent developer starters, billing engines, and simulators published directly on our Gumroad storefront.
                </p>
              </div>
              <a
                href="https://allinbrand.gumroad.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white bg-[#243528] hover:bg-[#111A13] border border-[#D4AF37]/40 py-2 px-4 rounded-full text-center transition-all block mt-2"
              >
                [ GUMROAD STORE ↗ ]
              </a>
            </div>

            {/* 03 Goods */}
            <div className="bg-[#1B291F] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[#D4AF37] font-extrabold text-sm block">03 // GOODS</span>
                <h3 className="text-lg font-bold text-white font-sans">Tactile Archival Apparel</h3>
                <p className="text-xs text-[#9CA3AF] font-sans leading-relaxed">
                  Heavyweight structured graphic tees and hoodies stamped with our architectural wireframes and coordinates on Etsy.
                </p>
              </div>
              <a
                href="https://www.etsy.com/shop/allinbrand/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white bg-[#243528] hover:bg-[#111A13] border border-[#D4AF37]/40 py-2 px-4 rounded-full text-center transition-all block mt-2"
              >
                [ ETSY SHOP ↗ ]
              </a>
            </div>
          </div>
        </section>

        {/* THE WITTY CLOSING SIGN-OFF */}
        <section className="bg-[#1B291F] border-2 border-[#D4AF37] rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#D4AF37] font-bold tracking-widest uppercase bg-[#243528] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 inline-block">
              // THE NEXT MOVE IS YOURS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Three Ways to Move Forward:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left font-sans">
            <div className="bg-[#243528] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#D4AF37] font-extrabold block">[ 01 // HIRE US ]</span>
                <h4 className="text-base font-bold text-white mt-1">Engineer a System</h4>
                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  Have an ambitious web platform or SaaS? Talk directly with the engineers.
                </p>
              </div>
              <a
                href="#contact"
                className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] py-2 px-4 rounded-full text-center block transition-all mt-3"
              >
                START A PROJECT ↓
              </a>
            </div>

            <div className="bg-[#243528] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-3 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#D4AF37] font-extrabold block">[ 02 // SHOP ]</span>
                <h4 className="text-base font-bold text-white mt-1">Digital Tools & Goods</h4>
                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  Get our code templates on Gumroad or our heavyweight streetwear on Etsy.
                </p>
              </div>
              <div className="flex gap-2 mt-3 font-mono text-[11px]">
                <a
                  href="https://allinbrand.gumroad.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-full text-center bg-[#1B291F] text-white hover:text-[#D4AF37] border border-white/10"
                >
                  GUMROAD ↗
                </a>
                <a
                  href="https://www.etsy.com/shop/allinbrand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-full text-center bg-[#1B291F] text-white hover:text-[#D4AF37] border border-white/10"
                >
                  ETSY ↗
                </a>
              </div>
            </div>

            <div className="bg-[#243528] p-6 rounded-2xl border border-emerald-400/30 space-y-3 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-extrabold block">[ 03 // RELAX ]</span>
                <h4 className="text-base font-bold text-white mt-1">Drink Mint Tea 🍵</h4>
                <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                  Close your laptop, step away from the screen, and brew a hot pot of fresh mint tea.
                </p>
              </div>
              <div className="py-2 bg-[#1B291F] text-emerald-400 font-mono text-[11px] font-bold rounded-full text-center border border-emerald-400/20 mt-3">
                ENJOY LIFE · NO STRESS
              </div>
            </div>
          </div>
        </section>

        {/* 1-CLICK ALL-ACCESS HUB */}
        <section className="bg-[#1B291F] border border-[#E5E7EB]/10 rounded-2xl p-6 sm:p-8 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[#D4AF37] font-bold uppercase">// 1-CLICK ALL-ACCESS HUB</span>
            <span className="text-[#9CA3AF] text-[11px]">DIRECT DESTINATIONS</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <Link href="/systems" className="bg-[#243528] p-3 rounded-xl border border-white/5 hover:border-[#D4AF37] transition-all">
              <span className="text-[#D4AF37] font-bold block">01 // SYSTEMS</span>
              <span className="text-white text-[11px] block mt-0.5">Software Builds</span>
            </Link>
            <Link href="/products" className="bg-[#243528] p-3 rounded-xl border border-white/5 hover:border-[#D4AF37] transition-all">
              <span className="text-[#D4AF37] font-bold block">02 // PRODUCTS</span>
              <span className="text-white text-[11px] block mt-0.5">Gumroad Store</span>
            </Link>
            <Link href="/goods" className="bg-[#243528] p-3 rounded-xl border border-white/5 hover:border-[#D4AF37] transition-all">
              <span className="text-[#D4AF37] font-bold block">03 // GOODS</span>
              <span className="text-white text-[11px] block mt-0.5">Etsy Apparel</span>
            </Link>
            <a
              href="https://github.com/thealnbrand/all-in-web"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#243528] p-3 rounded-xl border border-white/5 hover:border-emerald-400 transition-all text-emerald-400 font-bold"
            >
              <span className="block">GITHUB ↗</span>
              <span className="text-white text-[11px] font-normal block mt-0.5">Open Codebase</span>
            </a>
          </div>
        </section>

        {/* DIRECT CONTACT FORM */}
        <section id="contact" className="scroll-mt-28">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
