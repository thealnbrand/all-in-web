"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import { ContactSection } from '../../components/ContactSection';
import { ScrollReveal } from '../../components/ScrollReveal';

interface RealCaseStudy {
  id: string;
  code: string;
  category: 'marketplace' | 'saas' | 'interactive' | 'ecommerce';
  categoryLabel: string;
  title: string;
  subtitle: string;
  url: string;
  displayUrl: string;
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
    title: 'RihlatBladna — Direct Moroccan Travel Network',
    subtitle: 'Multi-sided tourism platform connecting travelers with verified Moroccan agencies.',
    url: 'https://rihlatbladna.vercel.app/',
    displayUrl: 'rihlatbladna.vercel.app',
    stack: ['React', 'Node.js API', 'Tailwind CSS', 'Vercel Edge', 'WhatsApp Alerts'],
    deliverables: [
      'Multi-Vendor Agency & Traveler Dashboards',
      'Real-Time WhatsApp & SMS Inquiry Triggers',
      'Interactive 24h Destination Stories & Itineraries',
      'Direct Tour Booking & Multi-City Filtering',
    ],
    benchmarks: [
      { label: 'PLATFORM UPTIME', value: '99.99%', hint: 'Live Cloud Edge' },
      { label: 'NOTIFICATION LAG', value: '< 1.5s', hint: 'Instant WhatsApp Alerts' },
      { label: 'DISCOVERY SPEED', value: 'Instant', hint: 'Client-Side Filtering' },
    ],
    description:
      'A comprehensive Moroccan travel marketplace enabling agencies to publish tours, manage bookings, post 24-hour video stories, and receive instant traveler leads directly via WhatsApp and email.',
  },
  {
    id: 'postresa',
    code: 'SYS-02 // SAAS PLATFORM',
    category: 'saas',
    categoryLabel: 'CAMPUS SCHEDULING',
    title: 'PostResa — Academic Space & Room Reservation System',
    subtitle: 'Role-based space management platform streamlining campus hall and lab bookings.',
    url: 'https://postresa.vercel.app/',
    displayUrl: 'postresa.vercel.app',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Role-Based Access Control', 'Vite'],
    deliverables: [
      'Student, Teacher & Administration Workspaces',
      'Conflict-Free Room & Amphitheater Booking',
      'Live Campus Announcement Feed & Notification Alerts',
      'Administrative Validation & Audit Workflow',
    ],
    benchmarks: [
      { label: 'REQUEST SPEED', value: '< 0.3s', hint: 'Instant Slot Confirmation' },
      { label: 'ACCESS CONTROL', value: '100% RBAC', hint: 'Director / Faculty / Student' },
      { label: 'CALENDAR ACCURACY', value: 'Zero Conflict', hint: 'Real-Time Schedule Sync' },
    ],
    description:
      'Custom campus operations system engineered to eliminate booking overlap for lecture halls, computer labs, and meeting spaces. Features multi-level approval workflows and live status tracking.',
  },
  {
    id: 'jbala-peak',
    code: 'SYS-03 // E-COMMERCE',
    category: 'ecommerce',
    categoryLabel: 'ARTISAN E-COMMERCE',
    title: 'Jbala Peak — Northern Moroccan Artisan Flagship',
    subtitle: 'Tri-lingual luxury digital storefront exporting authentic Rif craftsmanship worldwide.',
    url: 'https://jbala-peak.vercel.app/',
    displayUrl: 'jbala-peak.vercel.app',
    stack: ['Full-Stack E-Commerce', 'Tri-Lingual (EN/FR/AR)', 'Tailwind CSS', 'Vercel'],
    deliverables: [
      'Tri-Lingual Localization (English, French, Arabic)',
      'Multi-Currency Cart & Seamless Checkout Engine',
      'Artisan Heritage Storytelling & Customer Reviews',
      'Mobile-First Responsive Product Showcases',
    ],
    benchmarks: [
      { label: 'PAGE LOAD', value: '< 0.6s', hint: 'Optimized Image Delivery' },
      { label: 'LOCALIZATION', value: '3 Languages', hint: 'English / Français / العربية' },
      { label: 'CHECKOUT FLOW', value: '1-Click Cart', hint: 'Instant Order Submission' },
    ],
    description:
      'High-conversion digital flagship bringing handcrafted Rif Mountain pottery, traditional winter djellabas, and organic honey to international buyers with fluid language and currency switching.',
  },
  {
    id: 'smartinvoice',
    code: 'SYS-04 // SAAS & UTILITY',
    category: 'saas',
    categoryLabel: 'FINTECH & BILLING',
    title: 'Smart Invoice Pro — Automated Financial Platform',
    subtitle: 'SaaS billing engine generating compliant client invoices and tracking revenues in seconds.',
    url: 'https://smartinvoice-six.vercel.app/',
    displayUrl: 'smartinvoice-six.vercel.app',
    stack: ['Next.js 16', 'TypeScript', 'PDF Generation Engine', 'Vercel Edge'],
    deliverables: [
      '1-Click Tax-Compliant PDF Invoice Generation',
      'Real-Time Cash Flow & Overdue Payment Dashboards',
      'Multi-Currency Rate Calculations & Storage',
      'Sub-Second Search Across Hundreds of Accounts',
    ],
    benchmarks: [
      { label: 'INVOICE SPEED', value: 'Instant', hint: 'Zero Wait PDF Export' },
      { label: 'AVAILABILITY', value: '99.99%', hint: 'Production Cloud Live' },
      { label: 'PAPERWORK SAVED', value: '10+ Hrs/wk', hint: 'Automated Financial Flow' },
    ],
    description:
      'Zero-friction SaaS invoicing platform tailored for modern businesses and freelancers. Enables instant invoice creation, client balance tracking, and automated revenue telemetry with zero database lag.',
  },
  {
    id: 'my-maze',
    code: 'SYS-05 // INTERACTIVE',
    category: 'interactive',
    categoryLabel: 'SIMULATION & GAMIFICATION',
    title: 'My Maze — Interactive Workplace Decision Engine',
    subtitle: 'Gamified simulation testing workplace soft skills through branching scenarios.',
    url: 'https://my-maze.vercel.app/',
    displayUrl: 'my-maze.vercel.app',
    stack: ['React', 'Node.js Backend API', 'Live Leaderboard', 'Real-Time Stopwatch'],
    deliverables: [
      'Multi-Branching Dilemma & Scenario Engine',
      'Millisecond Speedrun Timer & Live Global Leaderboards',
      'Automated Performance Rating & Skill Profiling',
      'Comprehensive Post-Game Decision Feedback',
    ],
    benchmarks: [
      { label: 'FRAME RATE', value: '60 FPS', hint: 'Fluid Canvas Animation' },
      { label: 'API SYNC', value: '< 25ms', hint: 'Live Score Broadcasting' },
      { label: 'ENGAGEMENT', value: 'High Replay', hint: 'Dynamic Question Shuffling' },
    ],
    description:
      'Interactive web simulation putting users inside realistic professional scenarios under time pressure. Tracks decision accuracy and speed, ranking players on live leaderboards with immediate feedback.',
  },
  {
    id: 'solayman',
    code: 'SYS-06 // INTERACTIVE',
    category: 'interactive',
    categoryLabel: 'CREATIVE PORTFOLIO',
    title: 'Solayman — Fluid Creative Developer Interface',
    subtitle: 'Tactile digital portfolio showcasing modern web engineering and creative mechanics.',
    url: 'https://solayman.vercel.app/',
    displayUrl: 'solayman.vercel.app',
    stack: ['React', 'Tailwind CSS', 'Interactive Canvas', 'Vercel'],
    deliverables: [
      'Fluid Micro-Interactions & Responsive Touch Mechanics',
      'Dark-Mode Tactile Typography & Clean Palettes',
      'High-Speed Project Catalog & Code Architecture',
      'Zero-Bloat Minimalist Layout',
    ],
    benchmarks: [
      { label: 'PERFORMANCE', value: '100 / 100', hint: 'Lighthouse Web Vitals' },
      { label: 'FIRST PAINT', value: '< 0.4s', hint: 'Instant Page Rendering' },
      { label: 'DEVICE FIT', value: '100% Adaptive', hint: 'Mobile & Desktop Ready' },
    ],
    description:
      'High-polish personal and studio interface demonstrating creative front-end architecture, subtle ambient gradients, and crisp interaction design built for instant loading.',
  },
];

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
            const mapped: RealCaseStudy[] = data.projects.map((p: any, idx: number) => ({
              id: p.id || `db-sys-${idx}`,
              code: p.type_badge || `SYS-${String(idx + 1).padStart(2, '0')}`,
              category: (p.category || 'saas') as any,
              categoryLabel: (p.category || 'saas').toUpperCase(),
              title: p.name,
              subtitle: p.name,
              url: p.url,
              displayUrl: p.display_url || p.url.replace(/^https?:\/\//, ''),
              stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
              deliverables: Array.isArray(p.deliverables) ? p.deliverables : [],
              benchmarks: [
                { label: p.metric1_label || 'UPTIME', value: p.metric1_value || '99.99%', hint: p.metric1_sub || 'Edge' },
                { label: p.metric2_label || 'RESPONSE', value: p.metric2_value || 'INSTANT', hint: p.metric2_sub || 'Global' },
              ],
              description: p.name,
            }));
            setProjectsList(mapped);
          }
        }
      } catch (err) {
        console.warn('Using static systems portfolio fallback', err);
      }
    };

    loadDynamicProjects();
  }, []);

  const filteredProjects = projectsList.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const handleCommissionClick = (title: string) => {
    setInquirySubject(`COMMISSION: PLATFORM SIMILAR TO ${title.toUpperCase()}`);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#243528] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F]">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[88px] bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-xl">
        {/* Far Left: Logo Anchor */}
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
          <Link href="/systems" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 flex items-center gap-1">
            <span className="text-[#D4AF37]">01 //</span> SYSTEMS
          </Link>
          <Link href="/products" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">02 //</span> PRODUCTS
          </Link>
          <Link href="/goods" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">03 //</span> GOODS
          </Link>
          <Link href="/manifesto" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        {/* Far Right: Initiate CTA */}
        <Link
          href="#contact"
          className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer"
        >
          [ INITIATE ]
        </Link>
      </header>

      {/* Main Page Content Container */}
      <main className="pt-[120px] pb-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto space-y-16">
        {/* Page Hero Header */}
        <div className="space-y-6 border-b border-[#E5E7EB]/10 pb-12">
          {/* Breadcrumb & Coordinates */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#D4AF37] font-bold">INDEX // 01 // SYSTEMS</span>
              <span>/</span>
              <span className="text-[#E5E7EB]/50">PRODUCTION VERIFIED BUILDS</span>
            </div>
            <div className="bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-bold">
              📍 35.7595° N, 5.8340° W · TANGIER HQ
            </div>
          </div>

          {/* Page Headline */}
          <div className="space-y-4 max-w-[1000px]">
            <span className="font-mono text-xs text-[#D4AF37] font-extrabold tracking-widest uppercase bg-[#1B291F] px-3 py-1 rounded-xs border border-[#D4AF37]/30">
              01 // SYSTEMS & PRODUCTION BUILDS
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight">
              Real Web Platforms & Scalable Systems Engineered by ALL IN.
            </h1>
            <p className="text-[#E5E7EB]/80 font-sans text-base sm:text-lg leading-relaxed max-w-[850px]">
              Every project below is a real, live web platform engineered by our studio. From multi-vendor travel marketplaces and campus management systems to artisan e-commerce flagships and interactive web engines — built for speed, zero bloat, and verified reliability.
            </p>
          </div>
        </div>

        {/* Real Projects Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB]/10 pb-5">
          <span className="font-mono text-xs text-[#D4AF37] font-bold tracking-widest uppercase">
            // VERIFIED PRODUCTION RELEASES ({filteredProjects.length})
          </span>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                  : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
              }`}
            >
              ALL PLATFORMS
            </button>
            <button
              onClick={() => setActiveFilter('marketplace')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'marketplace'
                  ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                  : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
              }`}
            >
              MARKETPLACES
            </button>
            <button
              onClick={() => setActiveFilter('saas')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'saas'
                  ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                  : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
              }`}
            >
              SAAS & SCHEDULING
            </button>
            <button
              onClick={() => setActiveFilter('ecommerce')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'ecommerce'
                  ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                  : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
              }`}
            >
              E-COMMERCE
            </button>
            <button
              onClick={() => setActiveFilter('interactive')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFilter === 'interactive'
                  ? 'bg-[#D4AF37] text-[#1B291F] font-bold shadow-md'
                  : 'bg-[#1B291F] text-[#9CA3AF] hover:text-white border border-[#E5E7EB]/10'
              }`}
            >
              INTERACTIVE
            </button>
          </div>
        </div>

        {/* Real Production Case Studies Feed */}
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} direction="up">
              <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 sm:p-10 transition-all shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group">
                {/* Left Column: Live Browser Frame Preview */}
                <div className="lg:col-span-6 space-y-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-xl overflow-hidden border border-[#E5E7EB]/15 bg-[#111A13] group/frame hover:border-[#D4AF37]/60 transition-all shadow-lg"
                    title={`Click to open ${project.title} live in a new tab`}
                  >
                    {/* Browser Mockup Window Bar */}
                    <div className="h-9 bg-[#0E150F] border-b border-[#E5E7EB]/10 px-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#1B291F] px-3 py-1 rounded text-[11px] font-mono text-[#E5E7EB]/80 max-w-[240px] truncate">
                        <span className="text-emerald-400">🔒</span>
                        <span className="truncate">{project.displayUrl}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>LIVE ↗</span>
                      </div>
                    </div>

                    {/* Live Embedded Viewport */}
                    <div className="relative w-full h-[280px] sm:h-[340px] bg-white overflow-hidden">
                      <iframe
                        src={project.url}
                        title={project.title}
                        className="w-full h-full border-0 pointer-events-none transform origin-top transition-transform duration-500 group-hover/frame:scale-[1.01]"
                        loading="lazy"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#1B291F]/0 group-hover/frame:bg-[#1B291F]/40 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="opacity-0 group-hover/frame:opacity-100 transform translate-y-2 group-hover/frame:translate-y-0 transition-all duration-300 bg-[#1B291F]/90 backdrop-blur-md border border-[#D4AF37] px-5 py-2.5 rounded-full shadow-2xl text-xs font-mono font-bold text-[#D4AF37] flex items-center gap-2">
                          <span>CLICK TO LAUNCH LIVE APPLICATION</span>
                          <span className="text-white">↗</span>
                        </div>
                      </div>

                      {/* Footer Badge inside frame */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#E5E7EB] bg-[#1B291F]/90 backdrop-blur-md p-2 rounded-lg border border-[#D4AF37]/30 pointer-events-none">
                        <span className="text-[#D4AF37] font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          VERIFIED PRODUCTION DEPLOYMENT
                        </span>
                        <span className="text-white/80">OPEN SITE ↗</span>
                      </div>
                    </div>
                  </a>

                  {/* Direct Launch Link */}
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-[#9CA3AF]">
                      PRODUCTION URL: <span className="text-white font-bold">{project.displayUrl}</span>
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>VISIT APPLICATION</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Specifications & Client Deliverables */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-extrabold text-[#D4AF37]">
                        {project.code}
                      </span>
                      <span className="h-3 w-px bg-[#E5E7EB]/20" />
                      <span className="font-mono text-[10px] font-bold text-emerald-400 bg-[#243528] px-2.5 py-0.5 rounded-full border border-emerald-400/30 uppercase">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm font-mono text-[#D4AF37]/90 font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#E5E7EB]/80 leading-relaxed font-sans pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Client Deliverables Checklist */}
                  <div className="space-y-2.5 bg-[#243528]/80 p-4 rounded-xl border border-[#E5E7EB]/10">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block">
                      // DELIVERABLES & ARCHITECTURAL FEATURES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#E5E7EB]/90">
                      {project.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#D4AF37] font-bold">✔</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#D4AF37]">
                    {project.stack.map((tech) => (
                      <span key={tech} className="bg-[#243528] px-3 py-1 rounded-full border border-[#D4AF37]/30 font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Benchmarks / Value Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 font-mono pt-1">
                    {project.benchmarks.map((bm) => (
                      <div key={bm.label} className="bg-[#243528] p-3 rounded-xl border border-[#E5E7EB]/10">
                        <span className="text-[9px] text-[#9CA3AF] block uppercase tracking-wider">{bm.label}</span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#D4AF37] block mt-0.5">{bm.value}</span>
                        <span className="text-[9px] text-emerald-400 block mt-0.5 font-sans truncate">{bm.hint}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Controls */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-6 py-3 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>LAUNCH LIVE PLATFORM</span>
                      <span>↗</span>
                    </a>

                    <button
                      onClick={() => handleCommissionClick(project.title)}
                      className="font-bold text-[#E5E7EB] bg-[#243528] hover:bg-[#243528]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] px-6 py-3 rounded-full transition-all cursor-pointer"
                    >
                      [ COMMISSION THIS SYSTEM ]
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Technical Capability Matrix (In Plain Words Understood by Buyers) */}
        <section className="bg-[#1B291F] border border-[#E5E7EB]/10 rounded-2xl p-8 sm:p-12 space-y-8">
          <div>
            <span className="font-mono text-xs text-[#D4AF37] font-bold tracking-widest uppercase">// CAPABILITY MATRIX</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] mt-1">WHAT WE BUILD FOR CLIENTS & COMPANIES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#243528]/80 p-6 rounded-xl border border-[#E5E7EB]/10 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">[01 // MARKETPLACES]</span>
              <h3 className="text-lg font-bold text-white">Multi-Vendor & Booking Networks</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                Full-scale platforms connecting vendors with customers, complete with booking flows, live messaging, and automated WhatsApp/email alert systems.
              </p>
            </div>

            <div className="bg-[#243528]/80 p-6 rounded-xl border border-[#E5E7EB]/10 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">[02 // SAAS PLATFORMS]</span>
              <h3 className="text-lg font-bold text-white">Campus & Enterprise Scheduling</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                Reservation engines and operational portals with role-based access control, conflict-free scheduling, and automated approval workflows.
              </p>
            </div>

            <div className="bg-[#243528]/80 p-6 rounded-xl border border-[#E5E7EB]/10 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">[03 // E-COMMERCE]</span>
              <h3 className="text-lg font-bold text-white">Multi-Lingual Digital Flagships</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                High-conversion international e-commerce stores with multi-currency support, localization in English/French/Arabic, and fast one-click checkout.
              </p>
            </div>

            <div className="bg-[#243528]/80 p-6 rounded-xl border border-[#E5E7EB]/10 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">[04 // BILLING UTILITIES]</span>
              <h3 className="text-lg font-bold text-white">Invoicing & Financial Engines</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                Automated invoice generation, tax reporting, client data management, and instant PDF downloads that eliminate manual accounting hours.
              </p>
            </div>

            <div className="bg-[#243528]/80 p-6 rounded-xl border border-[#E5E7EB]/10 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">[05 // INTERACTIVE APPS]</span>
              <h3 className="text-lg font-bold text-white">Simulations & Gamification</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                Interactive decision trees, live speedrun timers, competitive leaderboards, and educational training modules that captivate audiences.
              </p>
            </div>

            <div className="bg-[#243528]/80 p-6 rounded-xl border border-[#E5E7EB]/10 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">[06 // CLOUD ARCHITECTURE]</span>
              <h3 className="text-lg font-bold text-white">Zero-Downtime Edge Deployment</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                Built on global edge networks with sub-second loading speeds worldwide, automated backups, and 99.99% operational uptime guarantees.
              </p>
            </div>
          </div>
        </section>

        {/* Direct Inquiry Contact Section */}
        <section id="contact">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
