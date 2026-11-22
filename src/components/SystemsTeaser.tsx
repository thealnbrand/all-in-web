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
  subtitle: string;
  category: string;
  description: string;
  stack: string[];
  forSaleStatus?: string;
  priceNote?: string;
  logo: string;
  url: string;
}

const DEFAULT_SYSTEMS: SystemShowcase[] = [
  {
    id: "smart-invoice",
    name: "SMART INVOICE PRO",
    subtitle: "Automated Financial & Invoicing Platform",
    category: "FINTECH & SAAS",
    description: "Production-ready automated billing and invoice engine. Generates tax-compliant PDF invoices instantly, tracks cash flow and overdue balances, and supports multi-currency calculations with zero database latency.",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "PDF Engine", "Vercel Edge"],
    forSaleStatus: "FOR SALE // TURNKEY SAAS",
    priceNote: "Turnkey Codebase · Ready to Deploy",
    logo: "/logos/smartinvoice.png",
    url: "https://smartinvoice-six.vercel.app/",
  },
  {
    id: "rihlat-bladna",
    name: "RIHLAT BLADNA",
    subtitle: "Direct Moroccan Travel Network",
    category: "TRAVEL MARKETPLACE",
    description: "Multi-sided travel marketplace platform connecting agencies and travelers. Features real-time WhatsApp & SMS lead dispatch, multi-vendor agency dashboards, interactive 24-hour stories, and multi-city tour booking.",
    stack: ["React", "Node.js API", "Tailwind CSS", "Vercel Edge", "WhatsApp API"],
    forSaleStatus: "FOR SALE // FULL PLATFORM",
    priceNote: "Complete Multi-Vendor Marketplace",
    logo: "/logos/rihlatbladna.png",
    url: "https://rihlatbladna.vercel.app/",
  },
  {
    id: "postresa",
    name: "POSTRESA",
    subtitle: "Academic Space & Room Reservation System",
    category: "CAMPUS SCHEDULING",
    description: "Campus operations platform eliminating room booking overlap for lecture halls, computer labs, and meeting spaces with role-based validation workflows and instant conflict detection.",
    stack: ["React", "TypeScript", "Tailwind CSS", "RBAC Security", "Vite"],
    forSaleStatus: "FOR SALE // COMMERCIAL TURNKEY",
    priceNote: "Full Institutional Reservation Engine",
    logo: "/logos/postresa.png",
    url: "https://postresa.vercel.app/",
  },
  {
    id: "jbala-peak",
    name: "JBALA PEAK",
    subtitle: "Northern Moroccan Artisan Flagship",
    category: "ARTISAN E-COMMERCE",
    description: "Tri-lingual digital flagship exporting handcrafted pottery, traditional winter djellabas, and mountain honey worldwide with instant language and currency switching and 1-click checkout.",
    stack: ["Full-Stack E-Com", "Tri-Lingual (EN/FR/AR)", "Tailwind CSS", "Vercel Edge"],
    forSaleStatus: "FOR SALE // TURNKEY STORE",
    priceNote: "Complete Localized E-Commerce Engine",
    logo: "/logos/jbalapeak.png",
    url: "https://jbala-peak.vercel.app/",
  },
  {
    id: "my-maze",
    name: "MY MAZE",
    subtitle: "Interactive Decision & Dilemma Engine",
    category: "SIMULATION & GAMIFICATION",
    description: "Interactive web simulation putting users inside realistic workplace dilemmas under time pressure, tracking decision velocity and ranking players on global real-time leaderboards.",
    stack: ["React", "Node.js API", "Canvas Physics", "Leaderboard API"],
    forSaleStatus: "FOR SALE // FULL SOURCE",
    priceNote: "Gamified Decision Engine & Scenario Spec",
    logo: "/logos/mymaze.svg",
    url: "https://my-maze.vercel.app/",
  },
  {
    id: "solayman",
    name: "SOLAYMAN",
    subtitle: "Fluid Creative Engineering Interface",
    category: "CREATIVE PORTFOLIO",
    description: "Minimalist creative studio interface demonstrating creative front-end architecture, ambient gradients, and crisp interaction design with 100/100 Lighthouse performance benchmarks.",
    stack: ["React", "Tailwind CSS", "Interactive Canvas", "Vercel Edge"],
    forSaleStatus: "FOR SALE // STUDIO TEMPLATE",
    priceNote: "Ultra-Fast Minimalist Creative Interface",
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
    bgImage: "/DigitalProducts.webp",
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
    bgImage: "/Engineering.webp",
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
    bgImage: "/Engineering.webp",
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
  const [isRoadmapInView, setIsRoadmapInView] = useState<boolean>(false);
  const roadmapRef = React.useRef<HTMLDivElement>(null);

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
              const matchedStatic =
                DEFAULT_SYSTEMS.find(
                  (item) =>
                    item.id === p.id ||
                    (p.url && item.url.includes(p.url)) ||
                    (p.name && item.name.toLowerCase().includes(p.name.toLowerCase()))
                ) || DEFAULT_SYSTEMS[idx % DEFAULT_SYSTEMS.length] || DEFAULT_SYSTEMS[0];

              return {
                id: p.id || matchedStatic.id || `sys-${idx}`,
                name: p.name || matchedStatic.name,
                subtitle: p.subtitle || matchedStatic.subtitle,
                category: p.categoryLabel || p.category || matchedStatic.category,
                description: p.description || matchedStatic.description,
                stack:
                  Array.isArray(p.stack) && p.stack.length > 0
                    ? p.stack
                    : typeof p.stack === 'string' && p.stack.trim()
                    ? p.stack.split(/[,\n]/).map((s: string) => s.trim()).filter(Boolean)
                    : Array.isArray(matchedStatic.stack) && matchedStatic.stack.length > 0
                    ? matchedStatic.stack
                    : ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
                forSaleStatus: p.for_sale_status || p.forSaleStatus || matchedStatic.forSaleStatus || 'FOR SALE // TURNKEY',
                priceNote: p.price_note || p.priceNote || matchedStatic.priceNote || 'Turnkey Codebase · Ready to Deploy',
                logo: p.logo || resolveProjectLogo(p, matchedStatic.logo),
                url: p.url || matchedStatic.url,
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

  // Detect when the viewer scrolls to and reaches the roadmap section
  useEffect(() => {
    const el = roadmapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsRoadmapInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRoadmapInView(true);
          } else {
            setIsRoadmapInView(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automated Timeline Stepper Timer (cycles Step 1 -> Step 5 every 4.5s, ONLY starts when viewer reaches it, pauses on hover)
  useEffect(() => {
    if (!isRoadmapInView || isStagePaused) return;

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
  }, [isRoadmapInView, isStagePaused]);

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

  const current = systemsList[activeIndex] || DEFAULT_SYSTEMS[0];
  const currentStack: string[] =
    Array.isArray(current?.stack) && current.stack.length > 0
      ? current.stack
      : ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'];
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
      className="relative py-20 px-4 sm:px-8 lg:px-12 max-w-[1340px] mx-auto select-none font-sans scroll-mt-24 space-y-12 overflow-hidden rounded-3xl"
    >



      {/* =====================================================================
          1. WHAT WE DO: Clear Studio Value Proposition Header
      ===================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8 relative z-10">
        <div className="space-y-3 max-w-3xl text-left">
          <div className="flex items-center gap-3">
            <span className="text-[#E5E7EB]/40 font-mono text-xs tracking-widest uppercase">
              01 // SYSTEMS & CUSTOM ENGINEERING
            </span>
            <span className="h-px w-16 bg-[#8B0000]/30" />
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
            className="font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] px-6 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer uppercase tracking-wider whitespace-nowrap"
          >
            [ START YOUR PROJECT ]
          </button>

          <Link
            href="/systems"
            className="font-bold text-[#E5E7EB] bg-[#111A2E] hover:bg-[#111A2E]/80 border border-[#8B0000]/40 hover:border-[#8B0000] px-5 py-3.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5"
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

        <div
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
          onTouchStart={() => setIsTickerPaused(true)}
          onTouchEnd={() => setIsTickerPaused(false)}
          className="relative overflow-hidden rounded-2xl bg-[#0D1527] border border-[#8B0000]/35 py-4 shadow-xl"
        >
          {/* Soft edge fade overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#0D1527] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#0D1527] to-transparent z-10 pointer-events-none" />

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
                          ? 'bg-[#111A2E] border-[#8B0000] shadow-[0_0_25px_rgba(139,0,0,0.45)] scale-110 ring-2 ring-[#8B0000]/30'
                          : 'bg-[#1A261E]/80 border-white/10 hover:border-[#8B0000]/60 hover:bg-[#111A2E] hover:scale-105'
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
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0D1527] animate-pulse" />
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
          3. TWO-COLUMN SPLIT: SITE PREVIEW + SITE INFO, BUILT WITH & FOR SALE
      ===================================================================== */}
      <div className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Live Interactive Site Preview (Kept as it is) */}
          <div className="lg:col-span-7 w-full h-full min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] rounded-3xl overflow-hidden border-2 border-[#8B0000]/40 bg-[#0D1527] shadow-[0_25px_70px_rgba(0,0,0,0.65)] relative flex flex-col">
            {/* Browser Top Chrome Bar */}
            <div className="h-10 bg-[#0A0F1D] border-b border-[#8B0000]/25 px-4 sm:px-5 flex items-center justify-between z-20 relative shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs font-bold text-white/70">
                  {current.name}
                </span>
              </div>

              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#8B0000] hover:bg-[#A30000] text-white font-mono text-xs font-bold transition-all shadow-sm hover:shadow-[0_0_12px_rgba(139,0,0,0.5)] cursor-pointer whitespace-nowrap"
                title={`Open ${current.name} live in a new tab`}
              >
                <span>OPEN LIVE SITE</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            {/* Embedded Live Web Application Viewport */}
            <div className="relative w-full flex-1 bg-[#060A14] overflow-hidden">
              <iframe
                key={current.id}
                src={current.url}
                title={`${current.name} Live Viewport`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 2: Site Info, What it was created with & For Sale Commercial Box */}
          <div className="lg:col-span-5 h-full bg-[#111A2E] border-2 border-[#8B0000]/50 hover:border-[#8B0000] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative transition-all group overflow-hidden">
            {/* Technical Brutalist Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#8B0000]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#8B0000]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#8B0000]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#8B0000]" />

            <div className="space-y-5">
              {/* Top Header Badge Row */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#8B0000] font-bold tracking-widest uppercase">
                  [ SYS-0{activeIndex + 1} // {current.category} ]
                </span>
                
                {/* For Sale Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000]/20 border border-[#8B0000] text-rose-400 font-mono text-[11px] font-extrabold shadow-sm animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>FOR SALE // TURNKEY</span>
                </div>
              </div>

              {/* What It Is */}
              <div className="space-y-1.5">
                <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {current.name}
                </h4>
                <div className="text-xs sm:text-sm font-mono text-[#8B0000] font-bold">
                  {current.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[#E5E7EB]/80 leading-relaxed font-sans pt-1">
                  {current.description}
                </p>
              </div>

              {/* What It Was Created With (Tech Stack) */}
              <div className="space-y-2 pt-1 border-t border-white/10">
                <span className="font-mono text-[11px] text-[#9CA3AF] uppercase tracking-wider block font-semibold">
                  // BUILT WITH &amp; ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#0A0F1D] border border-white/15 px-2.5 py-1 text-[#E5E7EB] font-mono text-[11px] rounded transition-colors group-hover:border-[#8B0000]/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commercial For-Sale Callout */}
              <div className="bg-[#0A0F1D]/80 border border-[#8B0000]/40 p-3.5 rounded-xl space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[#8B0000] font-bold">
                  <span>// COMMERCIAL LICENSE</span>
                  <span className="text-emerald-400 font-semibold text-[11px]">
                    {current.priceNote || 'Ready to Deploy'}
                  </span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] font-sans leading-relaxed">
                  Turnkey acquisition includes production source code, database schema, design assets, and full intellectual property.
                </p>
              </div>
            </div>

            {/* Direct Action Buttons for this Specific System */}
            <div className="pt-5 mt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  if (onInquire) {
                    onInquire(`Acquire / Buy Turnkey: ${current.name}`);
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] px-5 py-3.5 rounded-xl transition-all shadow-xl hover:scale-[1.02] cursor-pointer flex-1 flex items-center justify-center gap-2 tracking-wider"
              >
                <span>[ INQUIRE TO BUY THIS SITE ]</span>
                <span>→</span>
              </button>

              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white bg-[#0A0F1D] hover:bg-[#0A0F1D]/80 border border-[#8B0000]/50 hover:border-[#8B0000] px-5 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>LIVE DEMO</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Global Commission / System Exploration Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-xs">
          <button
            type="button"
            onClick={handleCommissionClick}
            className="font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer uppercase tracking-wider"
          >
            [ COMMISSION A BESPOKE SYSTEM WITH US → ]
          </button>

          <Link
            href="/systems"
            className="font-bold text-[#E5E7EB]/85 bg-[#111A2E]/80 hover:bg-[#111A2E] border border-white/15 hover:border-[#8B0000]/50 px-6 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer"
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
        ref={roadmapRef}
        onMouseEnter={() => setIsStagePaused(true)}
        onMouseLeave={() => setIsStagePaused(false)}
        className="bg-[#111A2E] border border-[#8B0000]/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10 relative z-10 overflow-hidden"
      >
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#8B0000] font-bold uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>// HOW WE TAKE YOUR PROJECT FROM IDEA TO LAUNCH & BEYOND</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Follow the Line: Your End-to-End Engineering Roadmap
            </h3>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-[11px] bg-[#0D1527] px-4 py-2 rounded-full border border-white/10 self-start md:self-auto">
            <span
              className={`w-2 h-2 rounded-full ${
                !isRoadmapInView ? 'bg-white/30' : isStagePaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'
              }`}
            />
            <span className="text-[#E5E7EB]/80 font-bold">
              {!isRoadmapInView
                ? 'STANDBY // REACH TO INITIATE'
                : isStagePaused
                ? 'PAUSED ON HOVER // CLICK ANY NODE'
                : 'AUTO-CYCLING // CLICK ANY POINT'}
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
                          ? 'text-[#8B0000] scale-105'
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
                  className="h-full bg-gradient-to-r from-emerald-400 via-[#8B0000] to-[#EF4444] shadow-[0_0_20px_rgba(139,0,0,0.8)] transition-all duration-75 ease-linear"
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
                      <span className="absolute -inset-2.5 rounded-full bg-[#8B0000]/35 animate-ping pointer-events-none" />
                    )}

                    <span
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all duration-300 border-2 ${
                        isCurrent
                          ? 'bg-[#8B0000] text-white border-white scale-125 shadow-[0_0_25px_rgba(139,0,0,0.9)]'
                          : isCompleted
                          ? 'bg-emerald-400 text-[#111A2E] border-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                          : 'bg-[#0D1527] text-[#9CA3AF] border-white/25 group-hover:border-[#8B0000] group-hover:text-white'
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
          className="bg-[#0D1527] border border-[#8B0000]/35 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-inner grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 animate-fadeIn"
        >
          {/* LEFT COLUMN: Phase Name, 2-Sentence End-to-End Explanation & Deliverable Tag */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 font-mono text-xs text-[#8B0000] bg-[#111A2E] px-3.5 py-1.5 rounded-full border border-[#8B0000]/40">
                <span className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse" />
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
                  className="bg-[#111A2E]/90 border border-white/10 px-3.5 py-2.5 rounded-xl font-mono text-xs text-[#E5E7EB] flex items-center gap-2"
                >
                  <span className="text-emerald-400 font-black">✓</span>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>

            {/* Final Deliverable Tag + Stage Navigation */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="bg-[#0A0F1D]/90 border border-[#8B0000]/40 rounded-xl px-4 py-3 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#8B0000] font-bold uppercase tracking-wider shrink-0">
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
                  className="text-[#9CA3AF] hover:text-[#8B0000] transition-colors cursor-pointer font-bold flex items-center gap-1.5"
                >
                  <span>← PREVIOUS PHASE</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectStage((activeStage + 1) % ROADMAP_STAGES.length)
                  }
                  className="text-[#8B0000] hover:text-white transition-colors cursor-pointer font-extrabold flex items-center gap-1.5"
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
            <div className="relative h-[320px] sm:h-[370px] w-full rounded-2xl overflow-hidden border-2 border-[#8B0000]/40 bg-[#0F1712] shadow-2xl flex flex-col justify-between p-5 sm:p-6">
              {/* Ambient Stage Background Image */}
              <Image
                src={currentStage.bgImage}
                alt={currentStage.title}
                fill
                className="object-cover object-center opacity-25 filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F1712]/90 via-[#0D1527]/85 to-[#0F1712]/95" />

              {/* Top Mockup Window Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[#8B0000] font-bold">
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
                      <div className="col-span-4 bg-[#111A2E]/90 border border-[#8B0000]/30 rounded-xl p-3 space-y-2">
                        <span className="text-[10px] text-[#8B0000] font-bold block">
                          DESIGN TOKENS
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-[#8B0000] border border-white/20" />
                          <span className="text-[10px] text-white">#8B0000</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-[#0A0F1D] border border-white/20" />
                          <span className="text-[10px] text-white">#0A0F1D</span>
                        </div>
                        <div className="pt-1 border-t border-white/10 text-[10px] text-emerald-400">
                          ✓ Grid: 12-Col
                        </div>
                      </div>

                      {/* Right Wireframe Canvas */}
                      <div className="col-span-8 bg-[#0D1527]/95 border border-white/15 rounded-xl p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="h-2.5 w-20 rounded bg-[#8B0000]/80" />
                          <div className="flex gap-1.5">
                            <div className="h-2 w-8 rounded bg-white/20" />
                            <div className="h-2 w-8 rounded bg-white/20" />
                          </div>
                        </div>
                        <div className="h-16 rounded-lg bg-[#0A0F1D] border border-[#8B0000]/40 p-2.5 flex flex-col justify-between">
                          <span className="text-[10px] text-[#8B0000] font-bold">
                            HERO WIREFRAME // APPROVED
                          </span>
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#8B0000] text-white text-[9px] font-black">
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
                      <div className="bg-[#111A2E]/95 border border-[#8B0000]/40 rounded-xl p-3.5 space-y-2 text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="text-[#8B0000] font-bold">TABLE // users_auth</span>
                          <span className="text-[10px] text-emerald-400">PK · UUID</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-white/85">
                          <div className="flex justify-between">
                            <span>id</span>
                            <span className="text-[#8B0000]">uuid [PK]</span>
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

                      <div className="bg-[#111A2E]/95 border border-emerald-400/30 rounded-xl p-3.5 space-y-2 text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="text-emerald-400 font-bold">API // /api/orders</span>
                          <span className="text-[10px] text-[#8B0000]">200 OK</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-white/85">
                          <div className="flex justify-between">
                            <span>POST /checkout</span>
                            <span className="text-emerald-400">Stripe / Auth</span>
                          </div>
                          <div className="flex justify-between">
                            <span>GET /analytics</span>
                            <span className="text-[#8B0000]">14ms query</span>
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
                    <div className="col-span-8 bg-[#111A2E]/95 border border-[#8B0000]/40 rounded-xl p-4 space-y-2.5 text-left">
                      <div className="flex items-center justify-between text-[10px] text-[#8B0000]">
                        <span>DESKTOP VIEWPORT // NEXT.JS 16</span>
                        <span className="text-emerald-400 font-bold">120 FPS</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#111A13] border border-white/10 space-y-1.5 text-[11px]">
                        <div className="text-[#8B0000]">&lt;AppRouter layout=&quot;responsive&quot;&gt;</div>
                        <div className="pl-3 text-white">&lt;InteractiveDashboard liveSync /&gt;</div>
                        <div className="pl-3 text-emerald-400">&lt;ZeroLagCheckout /&gt;</div>
                        <div className="text-[#8B0000]">&lt;/AppRouter&gt;</div>
                      </div>
                    </div>

                    <div className="col-span-4 bg-[#0D1527] border-2 border-[#8B0000]/50 rounded-2xl p-3 flex flex-col items-center justify-between h-36">
                      <div className="w-8 h-1 rounded-full bg-white/30" />
                      <div className="text-center space-y-1">
                        <span className="text-[10px] text-[#8B0000] font-bold block">MOBILE UI</span>
                        <span className="text-xs text-white font-black block">100% FLUID</span>
                      </div>
                      <div className="w-full py-1 rounded bg-[#8B0000] text-white text-[9px] font-black text-center">
                        TOUCH READY
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 04 MOCKUP: Cloud Deployment Logs & Vitals */}
                {currentStage.visualType === 'deploy' && (
                  <div className="bg-[#111A13]/95 border border-emerald-400/40 rounded-xl p-4 font-mono text-xs space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[#8B0000] font-bold">$ vercel deploy --prod</span>
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
                      <div className="text-[#8B0000] font-bold">
                        <span className="text-emerald-400 mr-2">★</span>
                        Lighthouse Performance: 100 / 100 · Global Latency: 18ms
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 05 MOCKUP: Ongoing Support & Scaling */}
                {currentStage.visualType === 'scale' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-left">
                    <div className="bg-[#111A2E]/95 border border-emerald-400/40 rounded-xl p-4 space-y-2">
                      <span className="text-[10px] text-emerald-400 font-bold block uppercase">
                        LIVE UPTIME & HEALTH
                      </span>
                      <div className="text-2xl font-black text-white">99.99% ONLINE</div>
                      <div className="text-[11px] text-[#E5E7EB]/75">
                        24/7 automated health checks &amp; instant cloud scaling.
                      </div>
                    </div>

                    <div className="bg-[#111A2E]/95 border border-[#8B0000]/40 rounded-xl p-4 space-y-2">
                      <span className="text-[10px] text-[#8B0000] font-bold block uppercase">
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
                <span className="text-[#8B0000] font-bold">
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
