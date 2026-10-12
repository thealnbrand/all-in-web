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
import { CustomerHeroVisual } from '../components/CustomerHeroVisual';
import { MouthDroppingHero2D } from '../components/MouthDroppingHero2D';
import { HeroEffectsCanvas } from '../components/HeroEffectsCanvas';
import { Preloader } from '../components/Preloader';
import { ScrollReveal } from '../components/ScrollReveal';
import { FloatingNavDock } from '../components/FloatingNavDock';

export default function Home() {
  const [inquirySubject, setInquirySubject] = useState<string>('');
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollYOffset, setScrollYOffset] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(1);

  React.useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const lineInterval = setInterval(() => {
      setActiveLineIndex((prev) => (prev + 1) % 3);
    }, 2200);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX = (e.clientX - centerX) * 0.025;
      mouseY = (e.clientY - centerY) * 0.025;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollYOffset(scrollY * 0.25);
      const heroElement = document.querySelector('section');
      const heroThreshold = heroElement ? heroElement.offsetHeight - 100 : 700;
      setIsScrolled(scrollY > heroThreshold);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const updateParallax = () => {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;
      setParallaxOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      clearInterval(lineInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleInquireFromShowcase = (subject: string) => {
    setInquirySubject(subject);
  };

  return (
    <div className="min-h-screen h-full w-full bg-[#243528] text-[#E5E7EB] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#1B291F] font-sans">
      {/* Fullscreen Dark Green & Gold Sequence Preloader */}
      <Preloader />
      {/* Top Navbar Header with Dynamic Scroll Transition & The Full Bar Layout */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[88px] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-xl'
            : 'bg-transparent backdrop-blur-none border-b border-[#D4AF37]/15'
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
            <span><span className="text-[#D4AF37]">[</span> ALN <span className="text-[#D4AF37]">]</span></span>
            <span className="text-white/30 font-normal">|</span>
            <span className="text-xs font-bold text-[#E5E7EB]/90 tracking-widest">ALL IN</span>
          </span>
        </Link>

        {/* Center: The 4 Core Routes */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] lg:text-xs font-bold tracking-wider text-[#E5E7EB]/90">
          <Link href="/systems" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
            <span className="text-[#D4AF37] group-hover:underline">01 //</span> SYSTEMS
          </Link>
          <Link href="/products" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
            <span className="text-[#D4AF37] group-hover:underline">02 //</span> PRODUCTS
          </Link>
          <Link href="/goods" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
            <span className="text-[#D4AF37] group-hover:underline">03 //</span> GOODS
          </Link>
          <Link href="/manifesto" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
            <span className="text-[#D4AF37] group-hover:underline">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        {/* Far Right: Action Trigger */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* INITIATE Action Button */}
          <a
            href="#contact"
            className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 cursor-pointer flex items-center gap-1.5"
          >
            <span>[ INITIATE ]</span>
          </a>
        </div>
      </header>

      {/* Unified Hero Section (Navbar, Background Image & Big Logo + Overlapping Product Cards on Right) */}
      <section className="relative w-full min-h-[850px] sm:min-h-[880px] lg:min-h-[920px] bg-[#243528] overflow-hidden">
        {/* Custom Background Image Overlay Stretching Under Top Navbar with Smooth Mouse Parallax Depth */}
        <div
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y - scrollYOffset}px, 0) scale(1.05)`,
          }}
        >
          <Image
            src="/background2.png"
            alt="ALL IN Hero Background"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
          {/* Subtle Gradient Blend at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#243528]/20 to-[#243528]" />
        </div>

        {/* Interactive Hero Effects Canvas Layer (120 Glowing Gold Dust Particles, Kinetic Grid & Laser Spotlight) */}
        <HeroEffectsCanvas />

        {/* Left Side: Industrial Telemetry HUD, Kinetic Tagline & Action Deck */}
        <div className="absolute top-[100px] sm:top-[115px] lg:top-[130px] left-6 sm:left-10 lg:left-16 xl:left-24 max-w-[500px] lg:max-w-[580px] z-20 flex flex-col gap-5 sm:gap-6 text-left pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-widest bg-[#152319]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-lg w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
            </span>
            <span className="text-[#D4AF37] font-extrabold uppercase">
              // ALL IN STUDIO · TANGIER OPERATIONAL LAB
            </span>
          </div>

          {/* High-Impact Kinetic Headline with Cycling Golden Metallic Highlight */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E5E7EB] tracking-tight leading-none uppercase font-sans flex flex-col items-start gap-1">
              <span
                className={`transition-all duration-700 cursor-pointer ${
                  activeLineIndex === 0
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] translate-x-1.5'
                    : 'text-[#E5E7EB] opacity-75'
                }`}
              >
                ALL LINES.
              </span>
              <span
                className={`transition-all duration-700 cursor-pointer ${
                  activeLineIndex === 1
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] translate-x-1.5'
                    : 'text-[#E5E7EB] opacity-75'
                }`}
              >
                ALL IDEAS.
              </span>
              <span
                className={`transition-all duration-700 cursor-pointer ${
                  activeLineIndex === 2
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] translate-x-1.5'
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

          {/* Telemetry Coordinates Bar */}
          <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] text-[#9CA3AF] bg-[#152319]/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 w-fit">
            <div>
              <span className="text-[#D4AF37] font-bold">LAT:</span> 35.7595° N
            </div>
            <span className="text-[#D4AF37]/40">•</span>
            <div>
              <span className="text-[#D4AF37] font-bold">LON:</span> 5.8340° W
            </div>
            <span className="text-[#D4AF37]/40">•</span>
            <div className="text-emerald-400 font-bold">
              SYS ONLINE
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs sm:text-sm">
            <a
              href="#contact"
              className="font-extrabold text-[#152319] bg-[#D4AF37] hover:bg-[#E5C158] px-7 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 flex items-center gap-2 group cursor-pointer"
            >
              <span>[ INITIATE PROJECT ]</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#philosophy"
              className="font-bold text-[#E5E7EB] bg-[#152319]/80 hover:bg-[#152319] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-7 py-3.5 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              PHILOSOPHY
            </a>
          </div>
        </div>

        {/* Ambient Gold Radial Glow behind Logo */}
        <div className="absolute top-[70px] sm:top-[90px] right-4 sm:right-12 lg:right-20 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none z-10 animate-pulse" />

        {/* Big Logo & 3 Main Product Pictures Positioned Higher and to the Right */}
        <div className="absolute top-[85px] sm:top-[95px] lg:top-[105px] right-4 sm:right-10 lg:right-16 xl:right-24 z-20 flex flex-col items-end gap-4 sm:gap-5 p-2">
          {/* Big Logo */}
          <div className="relative w-[260px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[660px] aspect-[3/1] max-w-[85vw] transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_0_45px_rgba(212,175,55,0.45)]">
            <Image
              src="/logo.png"
              alt="ALL IN Studio Big Logo"
              fill
              priority
              className="object-contain object-right-top"
            />
          </div>

          {/* 3 Main Product Showcase Pills (Matching User Reference Composition Exactly) */}
          <div className="relative w-[280px] sm:w-[440px] md:w-[520px] lg:w-[580px] h-[200px] sm:h-[260px] md:h-[300px] mt-1">
            {/* 1. Top Left Pill: Digital Products (Laptop on Desk) */}
            <Link
              href="/products"
              className="group absolute top-0 left-0 w-[56%] h-[62%] rounded-[999px] overflow-hidden border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-2xl transition-all duration-500 hover:scale-105 hover:z-30 bg-[#152319]"
            >
              <Image
                src="/DigitalProducts.jfif"
                alt="02 // PRODUCTS"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <span className="absolute bottom-2.5 left-5 font-mono text-[9px] sm:text-[10px] font-extrabold text-[#D4AF37] bg-black/75 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                02 // PRODUCTS
              </span>
            </Link>

            {/* 2. Top Right Pill: Systems / Engineering (Code & Keyboard) */}
            <Link
              href="/systems"
              className="group absolute top-0 right-0 w-[56%] h-[62%] rounded-[999px] overflow-hidden border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-2xl transition-all duration-500 hover:scale-105 hover:z-30 bg-[#152319]"
            >
              <Image
                src="/Engineering.jfif"
                alt="01 // SYSTEMS"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <span className="absolute bottom-2.5 right-5 font-mono text-[9px] sm:text-[10px] font-extrabold text-[#D4AF37] bg-black/75 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                01 // SYSTEMS
              </span>
            </Link>

            {/* 3. Center Bottom Overlapping Pill: Tactile Goods ([ALN] Metal Badge Rivet) */}
            <Link
              href="/goods"
              className="group absolute bottom-0 left-1/2 -translate-x-1/2 w-[62%] h-[66%] rounded-[999px] overflow-hidden border-2 border-[#D4AF37]/75 hover:border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-105 z-20 bg-[#152319]"
            >
              <Image
                src="/TactileGoods.jfif"
                alt="03 // GOODS"
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-[10px] font-extrabold text-[#D4AF37] bg-black/80 backdrop-blur-xs px-3 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-lg">
                03 // GOODS
              </span>
            </Link>
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
