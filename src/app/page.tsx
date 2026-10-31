"use client";

import '../utils/react19Polyfill';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PhilosophySection } from '../components/PhilosophySection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

import { SystemsTeaser } from '../components/SystemsTeaser';
import { DigitalProductsTeaser } from '../components/DigitalProductsTeaser';
import { TactileGoodsTeaser } from '../components/TactileGoodsTeaser';
import { StudioAnchor } from '../components/StudioAnchor';
import { Preloader } from '../components/Preloader';
import { ScrollReveal } from '../components/ScrollReveal';
import { FloatingNavDock } from '../components/FloatingNavDock';
import { Hero3DGeometricBackground } from '../components/Hero3DGeometricBackground';

export default function Home() {
  const [inquirySubject, setInquirySubject] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(1);
  React.useEffect(() => {
    const lineInterval = setInterval(() => {
      setActiveLineIndex((prev) => (prev + 1) % 3);
    }, 2200);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = document.querySelector('section');
      const heroThreshold = heroElement ? heroElement.offsetHeight - 100 : 700;
      const nextScrolled = scrollY > heroThreshold;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(lineInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInquireFromShowcase = (subject: string) => {
    setInquirySubject(subject);
  };

  return (
    <div className="min-h-screen h-full w-full bg-[#0A0F1D] text-[#E5E7EB] overflow-x-hidden selection:bg-[#8B0000] selection:text-white font-sans">
      {/* Fullscreen Dark Green & Gold Sequence Preloader */}
      <Preloader />
      {/* Top Navbar Header with Dynamic Scroll Transition & The Full Bar Layout */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[88px] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#111A2E]/95 backdrop-blur-md border-b border-[#8B0000]/35 shadow-xl'
            : 'bg-transparent backdrop-blur-none border-b border-[#8B0000]/15'
        }`}
      >
        {/* Far Left: [ ALN ] Logo Anchor */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="relative h-9 w-24 flex items-center">
            <Image
              src="/logo.png"
              alt="[ALN] Logo"
              width={110}
              height={70}
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="font-mono text-base font-extrabold tracking-widest text-[#E5E7EB] hidden xs:flex items-center gap-2">
            <span><span className="text-[#8B0000]">[</span> ALN <span className="text-[#8B0000]">]</span></span>
            <span className="text-white/30 font-normal">|</span>
            <span className="text-xs font-bold text-[#E5E7EB]/90 tracking-widest">ALL IN</span>
          </span>
        </Link>

        {/* Center: The 4 Core Routes */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] lg:text-xs font-bold tracking-wider text-[#E5E7EB]/90">
          <Link href="/systems" className="hover:text-[#8B0000] transition-colors flex items-center gap-1 group">
            <span className="text-[#8B0000] group-hover:underline">01 //</span> SYSTEMS
          </Link>
          <Link href="/products" className="hover:text-[#8B0000] transition-colors flex items-center gap-1 group">
            <span className="text-[#8B0000] group-hover:underline">02 //</span> PRODUCTS
          </Link>
          <Link href="/goods" className="hover:text-[#8B0000] transition-colors flex items-center gap-1 group">
            <span className="text-[#8B0000] group-hover:underline">03 //</span> GOODS
          </Link>
          <Link href="/philosophy" className="hover:text-[#8B0000] transition-colors flex items-center gap-1 group">
            <span className="text-[#8B0000] group-hover:underline">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        {/* Far Right: Action Trigger */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* INITIATE Action Button */}
          <a
            href="#contact"
            className="font-mono text-xs font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 cursor-pointer flex items-center gap-1.5"
          >
            <span>[ INITIATE ]</span>
          </a>
        </div>
      </header>

      {/* Unified Hero Section (Navbar, Background Image & Big Logo + Overlapping Product Cards on Right) */}
      <section className="relative w-full min-h-[850px] sm:min-h-[880px] lg:min-h-[920px] bg-[#0A0F1D] overflow-hidden">
        {/* 3D Geometric Background — WebGL extruded crimson monolith (Three.js) */}
        <Hero3DGeometricBackground />

        {/* Left Side: Industrial Telemetry HUD, Kinetic Tagline & Action Deck */}
        <div className="absolute top-[100px] sm:top-[115px] lg:top-[130px] left-6 sm:left-10 lg:left-16 xl:left-24 max-w-[500px] lg:max-w-[580px] z-20 flex flex-col gap-5 sm:gap-6 text-left pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-widest bg-[#0D1527]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#8B0000]/40 shadow-lg w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B0000] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0000]" />
            </span>
            <span className="text-[#8B0000] font-extrabold uppercase">
              // ALL IN STUDIO · TANGIER OPERATIONAL LAB
            </span>
          </div>

          {/* High-Impact Kinetic Headline with Cycling Golden Metallic Highlight */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E5E7EB] tracking-tight leading-none uppercase font-sans flex flex-col items-start gap-1">
              <span
                className={`transition-all duration-700 cursor-pointer ${
                  activeLineIndex === 0
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#EF4444] to-[#8B0000] drop-shadow-[0_0_25px_rgba(139,0,0,0.45)] translate-x-1.5'
                    : 'text-[#E5E7EB] opacity-75'
                }`}
              >
                ALL LINES.
              </span>
              <span
                className={`transition-all duration-700 cursor-pointer ${
                  activeLineIndex === 1
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#EF4444] to-[#8B0000] drop-shadow-[0_0_25px_rgba(139,0,0,0.45)] translate-x-1.5'
                    : 'text-[#E5E7EB] opacity-75'
                }`}
              >
                ALL IDEAS.
              </span>
              <span
                className={`transition-all duration-700 cursor-pointer ${
                  activeLineIndex === 2
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#EF4444] to-[#8B0000] drop-shadow-[0_0_25px_rgba(139,0,0,0.45)] translate-x-1.5'
                    : 'text-[#E5E7EB] opacity-75'
                }`}
              >
                NOW.
              </span>
            </h1>
          </div>

          {/* Subheadline Description */}
          <p className="text-[#E5E7EB]/85 font-sans text-xs sm:text-sm lg:text-base leading-relaxed max-w-[480px]">
            An independent multidisciplinary studio in Tangier bridging custom software engineering, an open digital creations lab, and archival graphic streetwear.
          </p>


          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs sm:text-sm">
            <a
              href="#contact"
              className="font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] px-7 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 flex items-center gap-2 group cursor-pointer"
            >
              <span>[ INITIATE PROJECT ]</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#philosophy"
              className="font-bold text-[#E5E7EB] bg-[#0D1527]/80 hover:bg-[#0D1527] border border-[#8B0000]/40 hover:border-[#8B0000] px-7 py-3.5 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              PHILOSOPHY
            </a>
          </div>
        </div>

        {/* Big Logo Positioned Higher and to the Right */}
        <div className="absolute top-[85px] sm:top-[95px] lg:top-[105px] right-4 sm:right-10 lg:right-16 xl:right-24 z-20 flex flex-col items-end gap-4 sm:gap-5 p-2">
          {/* Big Logo */}
          <div className="relative w-[260px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[660px] aspect-[3/1] max-w-[85vw] transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_0_45px_rgba(139,0,0,0.45)]">
            <Image
              src="/logo.png"
              alt="ALL IN Studio Big Logo"
              fill
              priority
              className="object-contain object-right-top"
            />
          </div>
        </div>
      </section>

      {/* Editorial Studio Mission Anchor (Directly beneath Hero, above 01 // SYSTEMS) */}
      <ScrollReveal direction="up">
        <StudioAnchor />
      </ScrollReveal>

      {/* Primary Post-Hero Proof-of-Capability Module: 01 // SYSTEMS & ARCHITECTURE */}
      <ScrollReveal direction="left">
        <SystemsTeaser onInquire={handleInquireFromShowcase} />
      </ScrollReveal>

      {/* 02 // DIGITAL PRODUCTS & UTILITIES Module */}
      <ScrollReveal direction="right">
        <DigitalProductsTeaser onInquire={handleInquireFromShowcase} />
      </ScrollReveal>

      {/* 03 // TACTILE GOODS & APPAREL Module */}
      <ScrollReveal direction="left">
        <TactileGoodsTeaser onInquire={handleInquireFromShowcase} />
      </ScrollReveal>

      {/* Main Studio Sections */}
      <main className="space-y-12">
        {/* Philosophy & Tangier Section */}
        <ScrollReveal direction="right">
          <PhilosophySection />
        </ScrollReveal>

        {/* Direct Contact & Inquiry Section */}
        <ScrollReveal direction="up">
          <ContactSection initialSubject={inquirySubject} />
        </ScrollReveal>
      </main>

      {/* Minimalist Floating Section Quick Nav */}
      <FloatingNavDock />

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}
