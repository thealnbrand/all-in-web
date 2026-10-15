"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import { ContactSection } from '../../components/ContactSection';
import { ScrollReveal } from '../../components/ScrollReveal';
import { BackgroundWatermark } from '../../components/BackgroundWatermark';
import { NavigationHeader } from '../../components/NavigationHeader';

interface RealCaseStudy {
  id: string;
  code: string;
  category: 'marketplace' | 'saas' | 'interactive' | 'ecommerce';
  categoryLabel: string;
  title: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  logo: string;
  stack: string[];
  deliverables: string[];
  benchmarks: { label: string; value: string; hint: string }[];
  description: string;
}

const REAL_PROJECTS: RealCaseStudy[] = [
  {
    id: 'rihlatbladna',
    code: 'SYS-01 // MARKETPLACE',
    category: 'marketplace',
    categoryLabel: 'TRAVEL MARKETPLACE',
    title: 'RihlatBladna',
    subtitle: 'Direct Moroccan Travel Network',
    url: 'https://rihlatbladna.vercel.app/',
    displayUrl: 'rihlatbladna.vercel.app',
    logo: '/logos/rihlatbladna.png',
    stack: ['React', 'Node API', 'Tailwind', 'Vercel Edge', 'WhatsApp Alerts'],
    deliverables: [
      'Multi-Vendor Agency & Traveler Dashboards',
      'Real-Time WhatsApp & SMS Inquiry Triggers',
      'Interactive 24h Stories & Itineraries',
      'Direct Tour Booking & Multi-City Filtering',
    ],
    benchmarks: [
      { label: 'UPTIME', value: '99.99%', hint: 'Live Cloud Edge' },
      { label: 'NOTIFICATIONS', value: '< 1.5s', hint: 'Instant WhatsApp' },
      { label: 'DISCOVERY', value: 'Instant', hint: 'Client-Side Filter' },
    ],
    description:
      'Multi-sided travel marketplace enabling agencies to publish tours, manage bookings, post 24-hour video stories, and receive instant traveler leads directly via WhatsApp.',
  },
  {
    id: 'postresa',
    code: 'SYS-02 // SAAS PLATFORM',
    category: 'saas',
    categoryLabel: 'CAMPUS SCHEDULING',
    title: 'PostResa',
    subtitle: 'Academic Space & Room Reservation System',
    url: 'https://postresa.vercel.app/',
    displayUrl: 'postresa.vercel.app',
    logo: '/logos/postresa.png',
    stack: ['React', 'TypeScript', 'Tailwind', 'RBAC Security', 'Vite'],
    deliverables: [
      'Student, Teacher & Admin Workspaces',
      'Conflict-Free Room & Amphitheater Booking',
      'Live Campus Announcement Alerts',
      'Multi-Level Administrative Validation',
    ],
    benchmarks: [
      { label: 'BOOKING SPEED', value: '< 0.3s', hint: 'Zero Conflict' },
      { label: 'SECURITY', value: '100% RBAC', hint: 'Multi-Role Access' },
      { label: 'UPTIME', value: '99.99%', hint: 'Campus Cloud' },
    ],
    description:
      'Campus operations platform eliminating room booking overlap for lecture halls, computer labs, and meeting spaces with role-based validation workflows.',
  },
  {
    id: 'jbala-peak',
    code: 'SYS-03 // E-COMMERCE',
    category: 'ecommerce',
    categoryLabel: 'ARTISAN E-COMMERCE',
    title: 'Jbala Peak',
    subtitle: 'Northern Moroccan Artisan Flagship',
    url: 'https://jbala-peak.vercel.app/',
    displayUrl: 'jbala-peak.vercel.app',
    logo: '/logos/jbalapeak.png',
    stack: ['Full-Stack E-Com', 'Tri-Lingual (EN/FR/AR)', 'Tailwind', 'Vercel'],
    deliverables: [
      'Tri-Lingual Localization (English, Français, العربية)',
      'Multi-Currency Cart & Instant Checkout',
      'Artisan Heritage Storytelling & Lookbook',
      'High-Speed Mobile Product Showcase',
    ],
    benchmarks: [
      { label: 'PAGE LOAD', value: '< 0.6s', hint: 'Optimized Media' },
      { label: 'LOCALIZATION', value: '3 Languages', hint: 'EN / FR / AR' },
      { label: 'CHECKOUT', value: '1-Click', hint: 'Direct Order Flow' },
    ],
    description:
      'Tri-lingual digital flagship exporting handcrafted pottery, traditional winter djellabas, and natural honey worldwide with instant language and currency switching.',
  },
  {
    id: 'smartinvoice',
    code: 'SYS-04 // SAAS & UTILITY',
    category: 'saas',
    categoryLabel: 'FINTECH & BILLING',
    title: 'Smart Invoice Pro',
    subtitle: 'Automated Financial & Invoicing Platform',
    url: 'https://smartinvoice-six.vercel.app/',
    displayUrl: 'smartinvoice-six.vercel.app',
    logo: '/logos/smartinvoice.png',
    stack: ['Next.js 16', 'TypeScript', 'PDF Engine', 'Vercel Edge'],
    deliverables: [
      '1-Click Tax-Compliant PDF Invoice Generation',
      'Real-Time Cash Flow & Overdue Balance Tracking',
      'Multi-Currency Rate Calculations & Storage',
      'Sub-Second Search Across Accounts',
    ],
    benchmarks: [
      { label: 'EXPORT SPEED', value: 'Instant', hint: 'Zero Wait PDF' },
      { label: 'ACCURACY', value: '100%', hint: 'Tax Calculations' },
      { label: 'TIME SAVED', value: '10+ Hrs/wk', hint: 'Automated Billing' },
    ],
    description:
      'SaaS billing engine generating compliant client invoices, tracking cash flow, and managing account balances with zero database lag.',
  },
  {
    id: 'my-maze',
    code: 'SYS-05 // INTERACTIVE',
    category: 'interactive',
    categoryLabel: 'SIMULATION & GAMIFICATION',
    title: 'My Maze',
    subtitle: 'Interactive Decision & Dilemma Engine',
    url: 'https://my-maze.vercel.app/',
    displayUrl: 'my-maze.vercel.app',
    logo: '/logos/mymaze.svg',
    stack: ['React', 'Node.js API', 'Live Leaderboard', 'Real-Time Stopwatch'],
    deliverables: [
      'Multi-Branching Decision Scenarios',
      'Millisecond Speedrun & Global Leaderboards',
      'Automated Decision Profiling & Metrics',
      'Real-Time Decision Review System',
    ],
    benchmarks: [
      { label: 'FRAME RATE', value: '60 FPS', hint: 'Fluid Canvas' },
      { label: 'API SYNC', value: '< 25ms', hint: 'Live Leaderboard' },
      { label: 'REPLAY', value: 'High', hint: 'Dynamic Dilemmas' },
    ],
    description:
      'Interactive web simulation putting users inside realistic workplace dilemmas under time pressure, tracking decision velocity and ranking players live.',
  },
  {
    id: 'solayman',
    code: 'SYS-06 // INTERACTIVE',
    category: 'interactive',
    categoryLabel: 'CREATIVE PORTFOLIO',
    title: 'Solayman',
    subtitle: 'Fluid Creative Engineering Interface',
    url: 'https://solayman.vercel.app/',
    displayUrl: 'solayman.vercel.app',
    logo: '/logos/solayman.jpg',
    stack: ['React', 'Tailwind', 'Interactive Canvas', 'Vercel'],
    deliverables: [
      'Fluid Micro-Interactions & Touch Mechanics',
      'Dark-Mode Tactile Typography & Palettes',
      'High-Speed Architecture Catalog',
      'Zero-Bloat Minimalist Layout',
    ],
    benchmarks: [
      { label: 'LIGHTHOUSE', value: '100 / 100', hint: 'Web Vitals' },
      { label: 'FIRST PAINT', value: '< 0.4s', hint: 'Instant Render' },
      { label: 'MOBILE FIT', value: '100%', hint: 'Fluid Responsive' },
    ],
    description:
      'Minimalist creative studio interface demonstrating creative front-end architecture, ambient gradients, and crisp interaction design built for instant loading.',
  },
];

const resolveProjectLogo = (proj: { id?: string; name?: string; url?: string }): string => {
  const n = (proj.name || proj.id || '').toLowerCase();
  const u = (proj.url || '').toLowerCase();
  if (n.includes('rihlat') || u.includes('rihlat')) return '/logos/rihlatbladna.png';
  if (n.includes('invoice') || u.includes('invoice')) return '/logos/smartinvoice.png';
  if (n.includes('postresa') || u.includes('postresa')) return '/logos/postresa.png';
  if (n.includes('jbala') || u.includes('jbala')) return '/logos/jbalapeak.png';
  if (n.includes('maze') || u.includes('maze')) return '/logos/mymaze.svg';
  if (n.includes('solayman') || u.includes('solayman')) return '/logos/solayman.jpg';
  return '/logos/rihlatbladna.png';
};

export default function SystemsPage() {
  const [inquirySubject, setInquirySubject] = useState<string>('COMMISSION: 01 // SYSTEMS');
  const [projectsList, setProjectsList] = useState<RealCaseStudy[]>(REAL_PROJECTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'marketplace' | 'saas' | 'ecommerce' | 'interactive'>('all');

  useEffect(() => {
    const loadDynamicProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
            const mapped: RealCaseStudy[] = data.projects.map((p: any, idx: number) => {
              const matchedStatic = REAL_PROJECTS.find(
                (item) => item.id === p.id || item.url.includes(p.url) || p.url?.includes(item.id)
              );

              return {
                id: p.id || `db-sys-${idx}`,
                code: p.type_badge || `SYS-${String(idx + 1).padStart(2, '0')}`,
                category: (p.category || 'saas') as any,
                categoryLabel: (p.category || 'saas').toUpperCase(),
                title: p.name || matchedStatic?.title || 'Custom System',
                subtitle: matchedStatic?.subtitle || p.name || 'Full-Stack Web Platform',
                url: p.url,
                displayUrl: p.display_url || p.url.replace(/^https?:\/\//, ''),
                logo: resolveProjectLogo(p),
                stack: Array.isArray(p.stack) && p.stack.length > 0 ? p.stack : matchedStatic?.stack || ['Next.js 16', 'TypeScript', 'Tailwind', 'Vercel Edge'],
                deliverables: Array.isArray(p.deliverables) && p.deliverables.length > 0 ? p.deliverables : matchedStatic?.deliverables || ['Full-Stack Architecture', 'Responsive UI/UX'],
                benchmarks: [
                  { label: p.metric1_label || 'UPTIME', value: p.metric1_value || '99.99%', hint: p.metric1_sub || 'Cloud Edge' },
                  { label: p.metric2_label || 'SPEED', value: p.metric2_value || 'INSTANT', hint: p.metric2_sub || 'Zero-Lag' },
                  { label: 'OWNERSHIP', value: '100%', hint: 'Git Handover' },
                ],
                description: matchedStatic?.description || p.description || p.name,
              };
            });
            setProjectsList(mapped);
          }
        }
      } catch (err) {
        console.warn('Using static verified portfolio fallback', err);
      }
    };

    loadDynamicProjects();
  }, []);

  const filteredProjects = projectsList.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const handleSelectTrack = (trackName: string) => {
    setInquirySubject(`COMMISSION: ${trackName.toUpperCase()}`);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommissionClick = (title: string) => {
    setInquirySubject(`COMMISSION: PLATFORM SIMILAR TO ${title.toUpperCase()}`);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#243528] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F] relative">
      <BackgroundWatermark />
      {/* Fixed Navigation Header */}
      <NavigationHeader activeRoute="systems" actionLabel="[ START BUILD ]" actionHref="#contact" />

      {/* Main Page Content Container */}
      <main className="pt-[115px] pb-20 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto space-y-28">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO (PUNCHY, CONCISE, ZERO FLUFF)                            */}
        {/* ========================================================================= */}
        <section className="space-y-6 border-b border-[#E5E7EB]/10 pb-14 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#D4AF37] font-bold">01 // SYSTEMS</span>
              <span>/</span>
              <span className="text-[#E5E7EB]/50">PRODUCTION ENGINEERING</span>
            </div>
            <div className="bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-bold">
              📍 35.7595° N, 5.8340° W · TANGIER HQ
            </div>
          </div>

          <div className="space-y-4 max-w-[950px]">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>CUSTOM SOFTWARE STUDIO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E5E7EB] tracking-tight leading-[1.1]">
              Custom Web Platforms & Scalable Systems. Engineered From Scratch.
            </h1>
            <p className="text-[#E5E7EB]/85 font-sans text-base sm:text-lg max-w-[780px] leading-relaxed">
              No templates. No slow CMS plugins. We build high-speed web apps, SaaS platforms, and marketplaces with complete client code ownership.
            </p>
          </div>

          {/* 4 Quick Stat Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 font-mono text-xs">
            <div className="bg-[#1B291F] p-4 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between">
              <span className="text-[#D4AF37] font-bold">[ OWNERSHIP ]</span>
              <span className="text-white font-extrabold text-sm mt-1">100% Git Handover</span>
              <span className="text-[#9CA3AF] text-[10px] mt-0.5">Zero platform lock-in</span>
            </div>
            <div className="bg-[#1B291F] p-4 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between">
              <span className="text-[#D4AF37] font-bold">[ FULL-STACK ]</span>
              <span className="text-white font-extrabold text-sm mt-1">Design + DB + Cloud</span>
              <span className="text-[#9CA3AF] text-[10px] mt-0.5">Figma to Edge hosting</span>
            </div>
            <div className="bg-[#1B291F] p-4 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between">
              <span className="text-[#D4AF37] font-bold">[ SPEED ]</span>
              <span className="text-white font-extrabold text-sm mt-1">&lt; 0.5s Global TTFB</span>
              <span className="text-[#9CA3AF] text-[10px] mt-0.5">100/100 Core Web Vitals</span>
            </div>
            <div className="bg-[#1B291F] p-4 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between">
              <span className="text-[#D4AF37] font-bold">[ DIRECT TEAM ]</span>
              <span className="text-white font-extrabold text-sm mt-1">Tangier Studio HQ</span>
              <span className="text-[#9CA3AF] text-[10px] mt-0.5">Direct senior engineers</span>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <a
              href="#contact"
              className="font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-7 py-3 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>[ START YOUR BUILD ]</span>
              <span>→</span>
            </a>
            <a
              href="#tracks"
              className="font-bold text-[#E5E7EB] bg-[#1B291F] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-6 py-3 rounded-full transition-all cursor-pointer"
            >
              SYSTEM TRACKS ↓
            </a>
            <a
              href="#stacking-deck"
              className="font-bold text-[#9CA3AF] hover:text-[#D4AF37] px-4 py-3 transition-colors cursor-pointer"
            >
              VERIFIED PROJECTS ({projectsList.length}) ↓
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE 4 ARCHITECTURE TRACKS (WITH AI GENERATED IMAGES)           */}
        {/* ========================================================================= */}
        <section id="tracks" className="space-y-12 scroll-mt-28">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase">
              // ARCHITECTURE TRACKS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              What We Engineer For You
            </h2>
            <p className="text-[#E5E7EB]/80 font-sans text-sm sm:text-base max-w-[700px]">
              Select the system architecture suited for your business model. Every build is 100% custom-coded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Track 01 */}
            <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all shadow-xl group flex flex-col justify-between">
              <div className="relative w-full aspect-[16/9] bg-[#111A13] overflow-hidden">
                <Image
                  src="/Track 01.webp"
                  alt="Track 01 - Custom SaaS & Enterprise Portals"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 left-4 font-mono text-[10px] font-extrabold text-[#D4AF37] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  TRACK 01 // SAAS & UTILITIES
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                    Custom SaaS & Enterprise Portals
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5E7EB]/80 font-sans leading-relaxed">
                    Client dashboards, automated PDF invoicing, subscription billing, and multi-role access control (RBAC).
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-sans text-[#E5E7EB]/90 bg-[#243528]/60 p-3.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Role-Based Permissions & User Portals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Automated PDF Billing & Financial Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Sub-Second PostgreSQL Sync</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#9CA3AF] text-[11px]">EXAMPLE: SmartInvoice Pro / PostResa</span>
                  <button
                    onClick={() => handleSelectTrack('Custom SaaS & Enterprise Portals')}
                    className="font-bold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md cursor-pointer hover:scale-105"
                  >
                    [ ORDER TRACK ]
                  </button>
                </div>
              </div>
            </div>

            {/* Track 02 */}
            <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all shadow-xl group flex flex-col justify-between">
              <div className="relative w-full aspect-[16/9] bg-[#111A13] overflow-hidden">
                <Image
                  src="/Track 02.webp"
                  alt="Track 02 - Multi-Vendor Marketplaces & Booking"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 left-4 font-mono text-[10px] font-extrabold text-[#D4AF37] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  TRACK 02 // MARKETPLACES
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                    Multi-Vendor Marketplaces & Booking
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5E7EB]/80 font-sans leading-relaxed">
                    Double-sided platforms connecting travelers or buyers with verified agencies, with instant WhatsApp lead triggers.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-sans text-[#E5E7EB]/90 bg-[#243528]/60 p-3.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Multi-Vendor Publishing Dashboards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Instant WhatsApp & SMS Inquiry Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>24h Visual Stories & Multi-City Filtering</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#9CA3AF] text-[11px]">EXAMPLE: RihlatBladna Network</span>
                  <button
                    onClick={() => handleSelectTrack('Multi-Vendor Marketplace')}
                    className="font-bold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md cursor-pointer hover:scale-105"
                  >
                    [ ORDER TRACK ]
                  </button>
                </div>
              </div>
            </div>

            {/* Track 03 */}
            <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all shadow-xl group flex flex-col justify-between">
              <div className="relative w-full aspect-[16/9] bg-[#111A13] overflow-hidden">
                <Image
                  src="/Track 03.webp"
                  alt="Track 03 - High-Conversion E-Commerce Flagships"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 left-4 font-mono text-[10px] font-extrabold text-[#D4AF37] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  TRACK 03 // E-COMMERCE
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                    High-Conversion E-Commerce Flagships
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5E7EB]/80 font-sans leading-relaxed">
                    Tri-lingual digital storefronts exporting physical goods worldwide with multi-currency conversion and fast 1-click cart.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-sans text-[#E5E7EB]/90 bg-[#243528]/60 p-3.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Tri-Lingual Localization (EN / FR / AR)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Multi-Currency Dynamic Conversion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Mobile-First High-Speed Catalog & Cart</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#9CA3AF] text-[11px]">EXAMPLE: Jbala Peak Artisan Flagship</span>
                  <button
                    onClick={() => handleSelectTrack('High-Conversion E-Commerce Flagship')}
                    className="font-bold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md cursor-pointer hover:scale-105"
                  >
                    [ ORDER TRACK ]
                  </button>
                </div>
              </div>
            </div>

            {/* Track 04 */}
            <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all shadow-xl group flex flex-col justify-between">
              <div className="relative w-full aspect-[16/9] bg-[#111A13] overflow-hidden">
                <Image
                  src="/Track 04.webp"
                  alt="Track 04 - Interactive Simulators & Real-Time Engines"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 left-4 font-mono text-[10px] font-extrabold text-[#D4AF37] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  TRACK 04 // INTERACTIVE
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                    Interactive Simulators & Real-Time Engines
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5E7EB]/80 font-sans leading-relaxed">
                    Workplace simulation engines, millisecond speedrun timers, competitive leaderboards, and custom client calculators.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-sans text-[#E5E7EB]/90 bg-[#243528]/60 p-3.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Branching Decision Dilemma Engines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>Sub-25ms Live Leaderboards & Timers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>60 FPS Fluid Canvas Micro-Interactions</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#9CA3AF] text-[11px]">EXAMPLE: My Maze / Solayman</span>
                  <button
                    onClick={() => handleSelectTrack('Interactive Simulation & Gamification')}
                    className="font-bold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md cursor-pointer hover:scale-105"
                  >
                    [ ORDER TRACK ]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: THE 5-PHASE ENGINEERING GUARANTEE (COMPACT VISUAL TIMELINE)    */}
        {/* ========================================================================= */}
        <section className="bg-[#1B291F] border border-[#E5E7EB]/10 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase">
                // DELIVERY PIPELINE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                What Every ALL IN Build Includes
              </h2>
            </div>
            <span className="font-mono text-xs text-emerald-400 font-bold bg-[#243528] px-3 py-1 rounded-full border border-emerald-400/30">
              100% TRANSPARENT SPRINT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
            <div className="bg-[#243528] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#D4AF37] font-bold block">01 // BLUEPRINT</span>
              <span className="text-white font-extrabold block text-sm">Figma & UX</span>
              <p className="text-[11px] text-[#9CA3AF] font-sans">Full user flow & wireframes approved before code starts.</p>
            </div>
            <div className="bg-[#243528] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#D4AF37] font-bold block">02 // DATABASE</span>
              <span className="text-white font-extrabold block text-sm">PostgreSQL & Auth</span>
              <p className="text-[11px] text-[#9CA3AF] font-sans">Relational schemas, secure auth, and REST/GraphQL APIs.</p>
            </div>
            <div className="bg-[#243528] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#D4AF37] font-bold block">03 // FRONTEND</span>
              <span className="text-white font-extrabold block text-sm">Next.js 16 / React 19</span>
              <p className="text-[11px] text-[#9CA3AF] font-sans">Fluid 60fps responsive UI for mobile, tablet, and desktop.</p>
            </div>
            <div className="bg-[#243528] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#D4AF37] font-bold block">04 // DEPLOY</span>
              <span className="text-white font-extrabold block text-sm">Cloud Edge & SSL</span>
              <p className="text-[11px] text-[#9CA3AF] font-sans">Custom domain setup, global CDN edge, and 99.99% uptime.</p>
            </div>
            <div className="bg-[#243528] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#D4AF37] font-bold block">05 // HANDOVER</span>
              <span className="text-white font-extrabold block text-sm">Git + 30d Warranty</span>
              <p className="text-[11px] text-[#9CA3AF] font-sans">Full repo ownership, technical docs, and launch warranty.</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: STICKY OVERLAPPING CARDS (ONE OVERLAPPING THE OTHER ON SCROLL) */}
        {/* ========================================================================= */}
        <section id="stacking-deck" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E7EB]/10 pb-5">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase">
                // PROOF OF CAPABILITY ({filteredProjects.length} RELEASES)
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Verified Production Builds
              </h2>
              <p className="text-[#9CA3AF] text-xs font-mono">
                [ SCROLL TO STACK & OVERLAP PLATFORMS · SCROLL UP TO REMOVE ]
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                    : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
                }`}
              >
                ALL ({projectsList.length})
              </button>
              <button
                onClick={() => setActiveFilter('marketplace')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === 'marketplace'
                    ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                    : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
                }`}
              >
                MARKETPLACE
              </button>
              <button
                onClick={() => setActiveFilter('saas')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === 'saas'
                    ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                    : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
                }`}
              >
                SAAS
              </button>
              <button
                onClick={() => setActiveFilter('ecommerce')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === 'ecommerce'
                    ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                    : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
                }`}
              >
                E-COMMERCE
              </button>
              <button
                onClick={() => setActiveFilter('interactive')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === 'interactive'
                    ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                    : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
                }`}
              >
                INTERACTIVE
              </button>
            </div>
          </div>

          {/* STICKY STACKING DECK CONTAINER */}
          <div className="relative space-y-16 pb-24">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                style={{
                  top: `calc(105px + ${idx * 20}px)`,
                  zIndex: idx + 10,
                }}
                className="sticky bg-[#152319] border-2 border-[#D4AF37]/35 hover:border-[#D4AF37] rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-[0_-25px_50px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Column: Live Browser Frame */}
                <div className="lg:col-span-6 space-y-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl overflow-hidden border border-[#E5E7EB]/20 bg-[#0E150F] group/frame hover:border-[#D4AF37] transition-all shadow-xl"
                  >
                    {/* Browser Bar */}
                    <div className="h-9 bg-[#0A100B] border-b border-[#E5E7EB]/10 px-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#1B291F] px-3 py-0.5 rounded text-[11px] font-mono text-[#E5E7EB]/80 max-w-[220px] truncate">
                        <span className="text-emerald-400">🔒</span>
                        <span className="truncate">{project.displayUrl}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>LIVE ↗</span>
                      </div>
                    </div>

                    {/* Viewport Frame */}
                    <div className="relative w-full h-[260px] sm:h-[310px] bg-white overflow-hidden">
                      <iframe
                        src={project.url}
                        title={project.title}
                        className="w-full h-full border-0 pointer-events-none transform origin-top transition-transform duration-500 group-hover/frame:scale-[1.01]"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-[#1B291F]/0 group-hover/frame:bg-[#1B291F]/40 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="opacity-0 group-hover/frame:opacity-100 transform translate-y-2 group-hover/frame:translate-y-0 transition-all duration-300 bg-[#1B291F]/95 backdrop-blur-md border border-[#D4AF37] px-5 py-2.5 rounded-full shadow-2xl text-xs font-mono font-bold text-[#D4AF37] flex items-center gap-2">
                          <span>OPEN LIVE SITE</span>
                          <span className="text-white">↗</span>
                        </div>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center justify-between text-xs font-mono px-1">
                    <span className="text-[#9CA3AF] text-[11px]">
                      URL: <span className="text-white font-bold">{project.displayUrl}</span>
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold text-[11px]"
                    >
                      <span>LAUNCH APP</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Spec Sheet */}
                <div className="lg:col-span-6 space-y-5 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-lg bg-[#243528] border border-[#D4AF37]/40 flex items-center justify-center overflow-hidden shrink-0">
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="font-extrabold text-[#D4AF37]">{project.code}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-[#243528] px-2.5 py-0.5 rounded-full border border-emerald-400/30 uppercase">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#D4AF37]/90 font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#E5E7EB]/80 leading-relaxed font-sans pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2 bg-[#243528]/80 p-3.5 rounded-xl border border-white/5 text-xs font-sans text-[#E5E7EB]/90">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block">
                      // DELIVERABLES & FEATURES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {project.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">✔</span>
                          <span className="text-[11px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[#D4AF37]">
                    {project.stack.map((tech) => (
                      <span key={tech} className="bg-[#243528] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 font-mono pt-1">
                    {project.benchmarks.map((bm) => (
                      <div key={bm.label} className="bg-[#243528] p-2.5 rounded-lg border border-white/5">
                        <span className="text-[8px] text-[#9CA3AF] block uppercase tracking-wider">{bm.label}</span>
                        <span className="text-xs font-extrabold text-[#D4AF37] block mt-0.5">{bm.value}</span>
                        <span className="text-[8px] text-emerald-400 block mt-0.5 truncate">{bm.hint}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Controls */}
                  <div className="pt-1 flex flex-wrap items-center gap-3 font-mono text-xs">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2.5 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>LAUNCH LIVE PLATFORM</span>
                      <span>↗</span>
                    </a>
                    <button
                      onClick={() => handleCommissionClick(project.title)}
                      className="font-bold text-[#E5E7EB] bg-[#243528] hover:bg-[#243528]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] px-5 py-2.5 rounded-full transition-all cursor-pointer"
                    >
                      [ COMMISSION THIS TYPE ]
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Direct Inquiry Contact Form */}
        <section id="contact" className="scroll-mt-28">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
