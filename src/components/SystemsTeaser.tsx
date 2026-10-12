"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SystemsTeaserProps {
  onInquire?: (subject: string) => void;
}

interface SystemShowcase {
  id: string;
  name: string;
  logo: string;
  url: string;
}

const DEFAULT_SYSTEMS: SystemShowcase[] = [
  {
    id: "smart-invoice",
    name: "SMART INVOICE PRO",
    logo: "/logos/smartinvoice.png",
    url: "https://smartinvoice-six.vercel.app/",
  },
  {
    id: "rihlat-bladna",
    name: "RIHLAT BLADNA",
    logo: "/logos/rihlatbladna.png",
    url: "https://rihlatbladna.vercel.app/",
  },
  {
    id: "postresa",
    name: "POSTRESA",
    logo: "/logos/postresa.png",
    url: "https://postresa.vercel.app/",
  },
  {
    id: "jbala-peak",
    name: "JBALA PEAK",
    logo: "/logos/jbalapeak.png",
    url: "https://jbala-peak.vercel.app/",
  },
  {
    id: "my-maze",
    name: "MY MAZE",
    logo: "/logos/mymaze.svg",
    url: "https://my-maze.vercel.app/",
  },
  {
    id: "solayman",
    name: "SOLAYMAN",
    logo: "/logos/solayman.jpg",
    url: "https://solayman.vercel.app/",
  },
];

interface RoadmapStage {
  step: string;
  nodeLabel: string;
  title: string;
  description: string;
  deliverable: string;
  highlights: string[];
  bgImage: string;
  visualType: 'blueprint' | 'database' | 'frontend' | 'deploy' | 'scale';
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    step: "01",
    nodeLabel: "01 // BLUEPRINT",
    title: "UI / UX Architecture & System Blueprint",
    description:
      "We translate your raw concept into a complete product blueprint, mapping out every user flow, screen wireframe, and brand design token before writing a single line of code. You see and approve the exact look and feel of your platform upfront.",
    deliverable: "Interactive Figma Prototype & System Architecture Spec",
    highlights: ["User Flow Mapping", "High-Craft UI Wireframes", "Brand & Design System", "Technical Scope Lock"],
    bgImage: "/DigitalProducts.jfif",
    visualType: "blueprint",
  },
  {
    step: "02",
    nodeLabel: "02 // DATABASE",
    title: "Backend Engine, APIs & Database Schema",
    description:
      "We engineer the core data foundation of your platform with relational PostgreSQL schemas, role-based authentication, and secure API routes. Whether you need Stripe payments, admin dashboards, or real-time syncing, your backend is built to handle real business logic.",
    deliverable: "Production PostgreSQL Database, Auth & Secure API Layer",
    highlights: ["PostgreSQL / Supabase Schema", "Secure User Authentication", "Payment & Webhook APIs", "Row-Level Data Security"],
    bgImage: "/Engineering.jfif",
    visualType: "database",
  },
  {
    step: "03",
    nodeLabel: "03 // FRONTEND",
    title: "Responsive Frontend & Interactive Interface",
    description:
      "We build your customer-facing application in Next.js and TypeScript with instant page transitions, tactile motion, and pixel-accurate responsiveness across desktop and mobile. Every button, form, and dashboard is wired directly to your live backend.",
    deliverable: "Full-Stack Next.js Application (Desktop & Mobile Ready)",
    highlights: ["Next.js 16 & Strict TypeScript", "Mobile-First Responsive UI", "60–120 FPS Smooth Motion", "Live Dashboard State"],
    bgImage: "/iPhone 16 Pro, Glossy.jpeg",
    visualType: "frontend",
  },
  {
    step: "04",
    nodeLabel: "04 // DEPLOY",
    title: "Global Cloud Deployment & Speed Hardening",
    description:
      "We configure your custom domain, provision SSL encryption, and deploy your platform onto global edge servers for sub-second loading worldwide. Every release undergoes rigorous stress-testing to hit top Lighthouse performance and SEO benchmarks.",
    deliverable: "Live Production Platform on Your Custom Domain (SSL + CDN)",
    highlights: ["Custom Domain & SSL Setup", "Global Edge CDN Routing", "100/100 Core Web Vitals", "Automated CI/CD Pipeline"],
    bgImage: "/background2.png",
    visualType: "deploy",
  },
  {
    step: "05",
    nodeLabel: "05 // SCALE",
    title: "Ongoing Support, Updates & Long-Term Scaling",
    description:
      "We don't disappear after launch day—our studio stays on as your technical partner to monitor uptime, ship new features, and scale your infrastructure as your traffic grows. Whenever you need help, improvements, or expansion, you have direct engineering access.",
    deliverable: "Direct Studio Support Channel, Uptime Monitoring & Feature Upgrades",
    highlights: ["Direct Engineering Support", "Zero-Downtime Updates", "Performance & Uptime Alerts", "New Feature Rollouts"],
    bgImage: "/Engineering.jfif",
    visualType: "scale",
  },
];

function resolveProjectLogo(p: any, fallbackLogo: string): string {
  if (p.logo && typeof p.logo === 'string' && p.logo.trim()) return p.logo.trim();
  if (p.image && typeof p.image === 'string' && p.image.trim()) return p.image.trim();

  const haystack = `${p.name || ''} ${p.url || ''}`.toLowerCase();
  if (haystack.includes('rihlat')) return '/logos/rihlatbladna.png';
  if (haystack.includes('invoice')) return '/logos/smartinvoice.png';
  if (haystack.includes('postresa')) return '/logos/postresa.png';
  if (haystack.includes('jbala')) return '/logos/jbalapeak.png';
  if (haystack.includes('maze')) return '/logos/mymaze.svg';
  if (haystack.includes('solayman')) return '/logos/solayman.jpg';

  return fallbackLogo;
}

const STAGE_DURATION_MS = 4500; // 4.5 seconds per stage

export const SystemsTeaser: React.FC<SystemsTeaserProps> = ({ onInquire }) => {
  const [systemsList, setSystemsList] = useState<SystemShowcase[]>(DEFAULT_SYSTEMS);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Automated Timeline Stepper State
  const [activeStage, setActiveStage] = useState<number>(0);
  const [stageProgress, setStageProgress] = useState<number>(0); // 0 to 100 within current stage
  const [isStagePaused, setIsStagePaused] = useState<boolean>(false);

  // Moving Logo Ticker State
  const [isTickerPaused, setIsTickerPaused] = useState<boolean>(false);
  const tickerRef = React.useRef<HTMLDivElement>(null);

  // Sync with /api/projects so future projects added in Command Center automatically appear
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
            const mapped: SystemShowcase[] = data.projects.map((p: any, idx: number) => {
              const fallback = DEFAULT_SYSTEMS[idx] || DEFAULT_SYSTEMS[0];
              return {
                id: p.id || fallback.id || `sys-${idx}`,
                name: p.name || fallback.name,
                logo: resolveProjectLogo(p, fallback.logo),
                url: p.url || fallback.url,
              };
            });
            setSystemsList(mapped);
          }
        }
      } catch (err) {
        console.warn('Using default systems showcase list', err);
      }
    };
    fetchProjects();
  }, []);

  // Seamless, slow, infinite logo glide that never snaps back to the start
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    let animId: number;
    let pos = el.scrollLeft;

    const step = () => {
      if (!isTickerPaused && el) {
        pos += 0.35; // Slow, smooth continuous speed
        const oneSetWidth = el.scrollWidth / 4;
        if (oneSetWidth > 0 && pos >= oneSetWidth) {
          pos -= oneSetWidth;
        }
        el.scrollLeft = pos;
      } else if (el) {
        pos = el.scrollLeft;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isTickerPaused, systemsList]);

  // Automated Timeline Stepper Timer (cycles Step 1 -> Step 5 every 4.5s, pauses on hover)
  useEffect(() => {
    if (isStagePaused) return;

    const intervalMs = 45;
    const increment = (intervalMs / STAGE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setStageProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveStage((currentIdx) => (currentIdx + 1) % ROADMAP_STAGES.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isStagePaused]);

  const handleSelectStage = (idx: number) => {
    setActiveStage(idx);
    setStageProgress(0);
  };

  // Calculate overall line fill percentage across the 4 connecting segments (0% to 100%)
  const totalSegments = ROADMAP_STAGES.length - 1; // 4 segments between 5 nodes
  const lineFillPercent = Math.min(
    100,
    activeStage === totalSegments
      ? 100
      : ((activeStage + stageProgress / 100) / totalSegments) * 100
  );

  const current = systemsList[activeIndex] || systemsList[0];
  const currentStage = ROADMAP_STAGES[activeStage] || ROADMAP_STAGES[0];

  const handleCommissionClick = () => {
    if (onInquire) {
      onInquire(`PROJECT INQUIRY: FULL-STACK SYSTEM BUILD`);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="systems"
      className="relative py-20 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto select-none font-sans scroll-mt-24 space-y-12 overflow-hidden rounded-3xl"
    >
      {/* Visible Ambient Background Atmospheric Image */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-3xl">
        <img
          src="/Engineering.jfif"
          alt=""
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#243528]/85 via-transparent to-[#243528]/95" />
      </div>

      {/* =====================================================================
          1. WHAT WE DO: Clear Studio Value Proposition Header
      ===================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8 relative z-10">
        <div className="space-y-3 max-w-3xl text-left">
          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
            <span>01 // SYSTEMS & CUSTOM ENGINEERING</span>
            <span className="h-px w-12 bg-[#D4AF37]/40" />
            <span className="text-emerald-400 text-[10px] bg-[#1B291F] px-3 py-0.5 rounded-full border border-emerald-400/30 font-bold uppercase">
              IDEA TO LIVE PRODUCTION
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight">
            We design, engineer, and launch complete digital platforms from scratch.
          </h2>

          <p className="text-sm sm:text-base text-[#E5E7EB]/80 font-sans leading-relaxed">
            Whether you need a custom SaaS application, an e-commerce store, a booking marketplace, or a high-impact company website—we handle the design, frontend, backend database, deployment, and ongoing support under one roof.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
          <button
            type="button"
            onClick={handleCommissionClick}
            className="font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-6 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer uppercase tracking-wider whitespace-nowrap"
          >
            [ START YOUR PROJECT ]
          </button>

          <Link
            href="/systems"
            className="font-bold text-[#E5E7EB] bg-[#1B291F] hover:bg-[#1B291F]/80 border border-[#D4AF37]/40 hover:border-[#D4AF37] px-5 py-3.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <span>ALL SYSTEMS</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* =====================================================================
          2. COMPANIES & PLATFORMS WE BUILT (Slow Seamless Logos-Only Strip)
      ===================================================================== */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between font-mono text-xs text-[#D4AF37] px-1">
          <span className="font-bold uppercase tracking-wider">
            // PLATFORMS & COMPANIES WE ENGINEERED — CLICK ANY LOGO TO PREVIEW BELOW
          </span>
          <span className="text-[#9CA3AF] hidden sm:inline">
            ACTIVE PREVIEW: <strong className="text-white">{current.name}</strong>
          </span>
        </div>

        <div
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
          onTouchStart={() => setIsTickerPaused(true)}
          onTouchEnd={() => setIsTickerPaused(false)}
          className="relative overflow-hidden rounded-2xl bg-[#152319] border border-[#D4AF37]/35 py-4 shadow-xl"
        >
          {/* Soft edge fade overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#152319] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#152319] to-transparent z-10 pointer-events-none" />

          <div
            ref={tickerRef}
            className="flex items-center overflow-x-auto no-scrollbar py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[0, 1, 2, 3].map((copyIdx) => (
              <div key={copyIdx} className="flex items-center gap-10 pr-10 shrink-0">
                {systemsList.map((sys, idx) => {
                  const isSelected = current.id === sys.id;
                  return (
                    <button
                      key={`${copyIdx}-${sys.id}-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative p-3 rounded-2xl border transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#1B291F] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] scale-110 ring-2 ring-[#D4AF37]/30'
                          : 'bg-[#1A261E]/80 border-white/10 hover:border-[#D4AF37]/60 hover:bg-[#1B291F] hover:scale-105'
                      }`}
                      title={`Preview ${sys.name}`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shrink-0 p-1.5">
                        <Image
                          src={sys.logo}
                          alt={sys.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {isSelected && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#152319] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. CLEAN FULL-WIDTH LIVE PREVIEW WINDOW ALONE + BUTTONS UNDERNEATH
      ===================================================================== */}
      <div className="space-y-5 relative z-10">
        {/* Standalone Full-Width Browser Preview */}
        <div className="w-full h-[420px] sm:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 bg-[#152319] group shadow-[0_25px_70px_rgba(0,0,0,0.65)] relative">
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full relative cursor-pointer"
            title={`Click to open ${current.name} live in a new tab`}
          >
            {/* Browser Top Chrome Bar */}
            <div className="h-10 bg-[#111A13] border-b border-[#E5E7EB]/10 px-5 flex items-center justify-between z-20 relative">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] font-bold text-[#D4AF37] hidden sm:inline">
                  {current.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#1B291F] px-4 py-1 rounded-md border border-[#E5E7EB]/10 text-[11px] font-mono text-[#E5E7EB]/80 max-w-[320px] truncate">
                <span className="text-emerald-400">🔒</span>
                <span className="truncate">{current.url}</span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-mono text-[#D4AF37] font-bold group-hover:text-white transition-colors">
                <span className="hidden sm:inline">OPEN LIVE SITE</span>
                <span>↗</span>
              </div>
            </div>

            {/* Embedded Live Web Application Viewport */}
            <div className="relative w-full h-[calc(100%-40px)] bg-white overflow-hidden">
              <iframe
                key={current.id}
                src={current.url}
                title={`${current.name} Live Viewport`}
                className="w-full h-full border-0 pointer-events-none transform origin-top transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />

              {/* Hover Launch Prompt */}
              <div className="absolute inset-0 bg-[#1B291F]/0 group-hover:bg-[#1B291F]/25 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-[#1B291F]/95 backdrop-blur-md border border-[#D4AF37] px-6 py-3 rounded-full shadow-2xl text-xs font-mono font-bold text-[#D4AF37] flex items-center gap-2">
                  <span>LAUNCH {current.name} IN NEW TAB</span>
                  <span className="text-white">↗</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Clean Action Bar Directly Under the Live Preview */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1 font-mono text-xs">
          <button
            type="button"
            onClick={handleCommissionClick}
            className="font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer uppercase tracking-wider"
          >
            [ BUILD YOUR PROJECT WITH US → ]
          </button>

          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white bg-[#1B291F] hover:bg-[#152319] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-6 py-4 rounded-full transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>VISIT {current.name} LIVE</span>
            <span>↗</span>
          </a>

          <Link
            href="/systems"
            className="font-bold text-[#E5E7EB]/85 bg-[#1B291F]/80 hover:bg-[#1B291F] border border-white/15 hover:border-[#D4AF37]/50 px-6 py-4 rounded-full transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>EXPLORE ALL SYSTEMS</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* =====================================================================
          4. FOLLOW THE LINE: AUTOMATED TIMELINE STEPPER & 2-COLUMN STAGE DECK
      ===================================================================== */}
      <div
        onMouseEnter={() => setIsStagePaused(true)}
        onMouseLeave={() => setIsStagePaused(false)}
        className="bg-[#1B291F] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10 relative z-10 overflow-hidden"
      >
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D4AF37] font-bold uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>// HOW WE TAKE YOUR PROJECT FROM IDEA TO LAUNCH & BEYOND</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Follow the Line: Your End-to-End Engineering Roadmap
            </h3>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-[11px] bg-[#152319] px-4 py-2 rounded-full border border-white/10 self-start md:self-auto">
            <span
              className={`w-2 h-2 rounded-full ${
                isStagePaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'
              }`}
            />
            <span className="text-[#E5E7EB]/80 font-bold">
              {isStagePaused ? 'PAUSED ON HOVER // CLICK ANY NODE' : 'AUTO-CYCLING // CLICK ANY POINT'}
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            A. THE PROGRESS LINE TRACKER (. ── . ── . ── . ── .)
        ------------------------------------------------------------------- */}
        <div className="pt-2 pb-4 px-2 sm:px-6">
          {/* Desktop / Tablet Horizontal Line Tracker */}
          <div className="relative">
            {/* Phase Labels Above Each Point */}
            <div className="grid grid-cols-5 mb-5">
              {ROADMAP_STAGES.map((stage, idx) => {
                const isCompleted = idx < activeStage;
                const isCurrent = idx === activeStage;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => handleSelectStage(idx)}
                    className={`group flex flex-col items-center text-center cursor-pointer focus:outline-none transition-all ${
                      idx === 0
                        ? 'items-start text-left'
                        : idx === ROADMAP_STAGES.length - 1
                        ? 'items-end text-right'
                        : 'items-center text-center'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] sm:text-xs font-extrabold tracking-wider uppercase transition-colors ${
                        isCurrent
                          ? 'text-[#D4AF37] scale-105'
                          : isCompleted
                          ? 'text-emerald-400'
                          : 'text-[#9CA3AF]/70 group-hover:text-white'
                      }`}
                    >
                      {stage.nodeLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Single Horizontal Track Line + 5 Sequential Node Points */}
            <div className="relative flex items-center justify-between">
              {/* Background Unfilled Track Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#111A13] border border-white/10 rounded-full overflow-hidden z-0">
                {/* Live Gold Progress Line Fill */}
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-[#D4AF37] to-[#F3E5AB] shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all duration-75 ease-linear"
                  style={{ width: `${lineFillPercent}%` }}
                />
              </div>

              {/* The 5 Sequential Node Points (. ── . ── . ── . ── .) */}
              {ROADMAP_STAGES.map((stage, idx) => {
                const isCompleted = idx < activeStage;
                const isCurrent = idx === activeStage;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => handleSelectStage(idx)}
                    aria-label={`Select ${stage.nodeLabel}`}
                    className="relative z-10 flex items-center justify-center focus:outline-none cursor-pointer group"
                  >
                    {/* Glowing Pulse Aura on Active Node */}
                    {isCurrent && (
                      <span className="absolute -inset-2.5 rounded-full bg-[#D4AF37]/35 animate-ping pointer-events-none" />
                    )}

                    <span
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all duration-300 border-2 ${
                        isCurrent
                          ? 'bg-[#D4AF37] text-[#1B291F] border-white scale-125 shadow-[0_0_25px_rgba(212,175,55,0.9)]'
                          : isCompleted
                          ? 'bg-emerald-400 text-[#1B291F] border-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                          : 'bg-[#152319] text-[#9CA3AF] border-white/25 group-hover:border-[#D4AF37] group-hover:text-white'
                      }`}
                    >
                      {isCompleted ? '✓' : stage.step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            B. THE 2-COLUMN STAGE DISPLAY CONTAINER (UNDER THE LINE)
        ------------------------------------------------------------------- */}
        <div
          key={currentStage.step}
          className="bg-[#152319] border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-inner grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 animate-fadeIn"
        >
          {/* LEFT COLUMN: Phase Name, 2-Sentence End-to-End Explanation & Deliverable Tag */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 font-mono text-xs text-[#D4AF37] bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-extrabold uppercase tracking-wider">
                  {currentStage.nodeLabel}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {currentStage.title}
              </h4>

              <p className="text-sm sm:text-base text-[#E5E7EB]/85 font-sans leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Key Capabilities Handled in This Stage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {currentStage.highlights.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1B291F]/90 border border-white/10 px-3.5 py-2.5 rounded-xl font-mono text-xs text-[#E5E7EB] flex items-center gap-2"
                >
                  <span className="text-emerald-400 font-black">✓</span>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>

            {/* Final Deliverable Tag + Stage Navigation */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="bg-[#243528]/90 border border-[#D4AF37]/40 rounded-xl px-4 py-3 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider shrink-0">
                  FINAL DELIVERABLE:
                </span>
                <span className="text-white font-extrabold">
                  {currentStage.deliverable}
                </span>
              </div>

              <div className="flex items-center justify-between font-mono text-xs pt-1">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectStage(
                      (activeStage - 1 + ROADMAP_STAGES.length) % ROADMAP_STAGES.length
                    )
                  }
                  className="text-[#9CA3AF] hover:text-[#D4AF37] transition-colors cursor-pointer font-bold flex items-center gap-1.5"
                >
                  <span>← PREVIOUS PHASE</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectStage((activeStage + 1) % ROADMAP_STAGES.length)
                  }
                  className="text-[#D4AF37] hover:text-white transition-colors cursor-pointer font-extrabold flex items-center gap-1.5"
                >
                  <span>
                    NEXT: {ROADMAP_STAGES[(activeStage + 1) % ROADMAP_STAGES.length].nodeLabel} →
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated High-Res Stage Preview Mockup */}
          <div className="lg:col-span-6">
            <div className="relative h-[320px] sm:h-[370px] w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 bg-[#0F1712] shadow-2xl flex flex-col justify-between p-5 sm:p-6">
              {/* Ambient Stage Background Image */}
              <Image
                src={currentStage.bgImage}
                alt={currentStage.title}
                fill
                className="object-cover object-center opacity-25 filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F1712]/90 via-[#152319]/85 to-[#0F1712]/95" />

              {/* Top Mockup Window Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[#D4AF37] font-bold">
                    {currentStage.nodeLabel} // STUDIO WORKSPACE
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-400/30 font-bold">
                  STAGE {currentStage.step} OF 05
                </span>
              </div>

              {/* Dedicated Interactive Mockup Content per Stage */}
              <div className="relative z-10 my-auto py-3">
                {/* STAGE 01 MOCKUP: Wireframe & UI Design System */}
                {currentStage.visualType === 'blueprint' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-12 gap-3">
                      {/* Left Sidebar Tokens */}
                      <div className="col-span-4 bg-[#1B291F]/90 border border-[#D4AF37]/30 rounded-xl p-3 space-y-2">
                        <span className="text-[10px] text-[#D4AF37] font-bold block">
                          DESIGN TOKENS
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-[#D4AF37] border border-white/20" />
                          <span className="text-[10px] text-white">#D4AF37</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-[#243528] border border-white/20" />
                          <span className="text-[10px] text-white">#243528</span>
                        </div>
                        <div className="pt-1 border-t border-white/10 text-[10px] text-emerald-400">
                          ✓ Grid: 12-Col
                        </div>
                      </div>

                      {/* Right Wireframe Canvas */}
                      <div className="col-span-8 bg-[#152319]/95 border border-white/15 rounded-xl p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="h-2.5 w-20 rounded bg-[#D4AF37]/80" />
                          <div className="flex gap-1.5">
                            <div className="h-2 w-8 rounded bg-white/20" />
                            <div className="h-2 w-8 rounded bg-white/20" />
                          </div>
                        </div>
                        <div className="h-16 rounded-lg bg-[#243528] border border-[#D4AF37]/40 p-2.5 flex flex-col justify-between">
                          <span className="text-[10px] text-[#D4AF37] font-bold">
                            HERO WIREFRAME // APPROVED
                          </span>
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[#1B291F] text-[9px] font-black">
                              PRIMARY CTA
                            </span>
                            <span className="px-2 py-0.5 rounded border border-white/20 text-white/70 text-[9px]">
                              SECONDARY
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 rounded bg-white/5 border border-white/10" />
                          <div className="h-8 rounded bg-white/5 border border-white/10" />
                          <div className="h-8 rounded bg-white/5 border border-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 02 MOCKUP: Database & API Schema */}
                {currentStage.visualType === 'database' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#1B291F]/95 border border-[#D4AF37]/40 rounded-xl p-3.5 space-y-2 text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="text-[#D4AF37] font-bold">TABLE // users_auth</span>
                          <span className="text-[10px] text-emerald-400">PK · UUID</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-white/85">
                          <div className="flex justify-between">
                            <span>id</span>
                            <span className="text-[#D4AF37]">uuid [PK]</span>
                          </div>
                          <div className="flex justify-between">
                            <span>role</span>
                            <span className="text-emerald-400">admin | client</span>
                          </div>
                          <div className="flex justify-between">
                            <span>encrypted_token</span>
                            <span className="text-white/50">sha256</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#1B291F]/95 border border-emerald-400/30 rounded-xl p-3.5 space-y-2 text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="text-emerald-400 font-bold">API // /api/orders</span>
                          <span className="text-[10px] text-[#D4AF37]">200 OK</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-white/85">
                          <div className="flex justify-between">
                            <span>POST /checkout</span>
                            <span className="text-emerald-400">Stripe / Auth</span>
                          </div>
                          <div className="flex justify-between">
                            <span>GET /analytics</span>
                            <span className="text-[#D4AF37]">14ms query</span>
                          </div>
                          <div className="flex justify-between">
                            <span>RLS Policy</span>
                            <span className="text-emerald-400">✓ ENFORCED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 03 MOCKUP: Live Responsive Frontend */}
                {currentStage.visualType === 'frontend' && (
                  <div className="grid grid-cols-12 gap-3 font-mono text-xs items-center">
                    <div className="col-span-8 bg-[#1B291F]/95 border border-[#D4AF37]/40 rounded-xl p-4 space-y-2.5 text-left">
                      <div className="flex items-center justify-between text-[10px] text-[#D4AF37]">
                        <span>DESKTOP VIEWPORT // NEXT.JS 16</span>
                        <span className="text-emerald-400 font-bold">120 FPS</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111A13] border border-white/10 space-y-1.5 text-[11px]">
                        <div className="text-[#D4AF37]">&lt;AppRouter layout=&quot;responsive&quot;&gt;</div>
                        <div className="pl-3 text-white">&lt;InteractiveDashboard liveSync /&gt;</div>
                        <div className="pl-3 text-emerald-400">&lt;ZeroLagCheckout /&gt;</div>
                        <div className="text-[#D4AF37]">&lt;/AppRouter&gt;</div>
                      </div>
                    </div>

                    <div className="col-span-4 bg-[#152319] border-2 border-[#D4AF37]/50 rounded-2xl p-3 flex flex-col items-center justify-between h-36">
                      <div className="w-8 h-1 rounded-full bg-white/30" />
                      <div className="text-center space-y-1">
                        <span className="text-[10px] text-[#D4AF37] font-bold block">MOBILE UI</span>
                        <span className="text-xs text-white font-black block">100% FLUID</span>
                      </div>
                      <div className="w-full py-1 rounded bg-[#D4AF37] text-[#1B291F] text-[9px] font-black text-center">
                        TOUCH READY
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 04 MOCKUP: Cloud Deployment Logs & Vitals */}
                {currentStage.visualType === 'deploy' && (
                  <div className="bg-[#111A13]/95 border border-emerald-400/40 rounded-xl p-4 font-mono text-xs space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[#D4AF37] font-bold">$ vercel deploy --prod</span>
                      <span className="text-emerald-400 font-extrabold">● EDGE LIVE</span>
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div className="text-white/80">
                        <span className="text-emerald-400 mr-2">✓</span>
                        Production build compiled cleanly (Strict TypeScript)
                      </div>
                      <div className="text-white/80">
                        <span className="text-emerald-400 mr-2">✓</span>
                        SSL Certificate &amp; Custom Domain provisioned
                      </div>
                      <div className="text-[#D4AF37] font-bold">
                        <span className="text-emerald-400 mr-2">★</span>
                        Lighthouse Performance: 100 / 100 · Global Latency: 18ms
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 05 MOCKUP: Ongoing Support & Scaling */}
                {currentStage.visualType === 'scale' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-left">
                    <div className="bg-[#1B291F]/95 border border-emerald-400/40 rounded-xl p-4 space-y-2">
                      <span className="text-[10px] text-emerald-400 font-bold block uppercase">
                        LIVE UPTIME & HEALTH
                      </span>
                      <div className="text-2xl font-black text-white">99.99% ONLINE</div>
                      <div className="text-[11px] text-[#E5E7EB]/75">
                        24/7 automated health checks &amp; instant cloud scaling.
                      </div>
                    </div>

                    <div className="bg-[#1B291F]/95 border border-[#D4AF37]/40 rounded-xl p-4 space-y-2">
                      <span className="text-[10px] text-[#D4AF37] font-bold block uppercase">
                        DIRECT STUDIO PARTNER
                      </span>
                      <div className="text-base font-black text-white">PRIORITY UPDATES</div>
                      <div className="text-[11px] text-[#E5E7EB]/75">
                        Direct access to our engineers for new features &amp; support.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Mockup Telemetry Footer */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-[#9CA3AF]">
                <span>ALL IN ENGINEERING PIPELINE</span>
                <span className="text-[#D4AF37] font-bold">
                  {currentStage.nodeLabel} → VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
