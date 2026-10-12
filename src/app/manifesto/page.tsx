"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContactSection } from '../../components/ContactSection';
import { Footer } from '../../components/Footer';

export default function ManifestoPage() {
  const [inquirySubject, setInquirySubject] = useState<string>('INQUIRY: STUDIO MANIFESTO & PHILOSOPHY');

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
          <Link href="/systems" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">01 //</span> SYSTEMS
          </Link>
          <Link href="/products" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">02 //</span> PRODUCTS
          </Link>
          <Link href="/goods" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">03 //</span> GOODS
          </Link>
          <Link href="/manifesto" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 flex items-center gap-1">
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

      {/* Main Container */}
      <main className="pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto space-y-20">
        {/* Breadcrumb & Hero Statement */}
        <div className="space-y-4 border-b border-[#E5E7EB]/10 pb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
            <Link href="/" className="hover:underline text-[#E5E7EB]/60">HOME</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">INDEX // 04 // PHILOSOPHY</span>
            <span>/</span>
            <span className="text-[#E5E7EB]/40">DISPATCHES & DOCTRINE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div>
              <span className="font-mono text-xs text-[#D4AF37] tracking-widest block uppercase mb-1">
                35.7595° N, 5.8340° W · STRAIT OF GIBRALTAR
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                04 // THE STUDIO PHILOSOPHY
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#E5E7EB]/70 max-w-lg font-sans leading-relaxed">
              Why an independent technology studio in Northern Morocco bridges digital civil engineering with heavyweight tactile artifacts.
            </p>
          </div>
        </div>

        {/* The Signature Quote Banner */}
        <div className="bg-[#1B291F] border border-[#D4AF37]/40 rounded-2xl p-8 sm:p-14 relative overflow-hidden shadow-2xl text-center space-y-6">
          <div className="font-mono text-xs text-[#D4AF37] font-bold tracking-widest uppercase">
            // CORE STUDIO DOCTRINE
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-snug max-w-4xl mx-auto">
            &ldquo;We don&apos;t outsource the hard parts. We ship the entire machine.&rdquo;
          </blockquote>
          <div className="pt-2 font-mono text-xs text-[#9CA3AF]">
            ALL IN STUDIO [ ALN ] · TANGIER HQ · 35.7595° N, 5.8340° W
          </div>
        </div>

        {/* Editorial Essays: The 3 Foundational Pillars */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {/* Essay 01 */}
          <article className="space-y-6 border-b border-[#E5E7EB]/10 pb-16">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#D4AF37] font-bold">DISPATCH 01</span>
              <span className="text-[#9CA3AF]">/</span>
              <span className="text-[#E5E7EB]/60">GEOGRAPHIC SYNTHESIS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tangier as a Gateway: The Borderland Perspective
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#E5E7EB]/85 font-sans leading-relaxed">
              <p>
                Tangier has never been a city of single identities. Perched at the northernmost tip of Morocco, looking directly across 14 kilometers of water to Europe, it is where the Mediterranean Sea collapses into the Atlantic Ocean. For centuries, this geography forced thinkers, writers, and craftsmen to exist in a permanent state of synthesis.
              </p>
              <p>
                We founded ALL IN in Tangier because we recognized that the global technology landscape had become spiritually homogenous. Silicon Valley and European tech hubs preach ephemeral software trends that vanish every eighteen months. In contrast, Northern Morocco is defined by physical stone, cedar woodwork, and hand-woven wool that lasts for generations.
              </p>
              <p className="border-l-2 border-[#D4AF37] pl-4 italic text-[#E5E7EB]">
                Standing at this crossroads, we refuse to choose between writing high-throughput web protocols and creating tangible studio visual goods. We do both, because the discipline required to build one elevates the other.
              </p>
            </div>
          </article>

          {/* Essay 02 */}
          <article className="space-y-6 border-b border-[#E5E7EB]/10 pb-16">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#D4AF37] font-bold">DISPATCH 02</span>
              <span className="text-[#9CA3AF]">/</span>
              <span className="text-[#E5E7EB]/60">TECHNICAL DISCIPLINE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Discipline Over Fluff: Engineering Zero Friction
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#E5E7EB]/85 font-sans leading-relaxed">
              <p>
                The modern internet is plagued by artificial complexity. Simple websites ship with 80 megabytes of client-side tracking scripts, sluggish component frameworks, and brittle third-party dependencies that break within months.
              </p>
              <p>
                We treat software engineering as civil infrastructure. When you cross a bridge or enter a building, you do not expect it to fail under moderate weather. When we write an API endpoint or engineer a database query, we optimize for determinism, sub-millisecond execution, and architectural longevity.
              </p>
              <p>
                This same discipline governs our tactile streetwear editions. We reject flimsy, disposable promotional merchandise. Instead, we select premium heavyweight structured blanks and high-precision direct-to-garment print techniques, stamped with our architectural wireframes and studio coordinates, fulfilled on-demand with zero inventory waste.
              </p>
            </div>
          </article>

          {/* Essay 03 */}
          <article className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#D4AF37] font-bold">DISPATCH 03</span>
              <span className="text-[#9CA3AF]">/</span>
              <span className="text-[#E5E7EB]/60">OPERATIONAL ETHOS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The &ldquo;All In&rdquo; Ethos: Complete Pipeline Ownership
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#E5E7EB]/85 font-sans leading-relaxed">
              <p>
                Most modern agencies are middlemen. They outsource their code to disconnected third parties and white-label generic digital tools.
              </p>
              <p>
                Our name—<strong>ALL IN</strong>—is an operational commitment. We own our entire creative and engineering pipeline from beginning to end:
              </p>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#D4AF37] pl-4">
                <li>✔ We design every visual interface and interaction in-house.</li>
                <li>✔ We architect the database models, server endpoints, and cloud edge routines.</li>
                <li>✔ We publish independent developer starters and digital blueprints on Gumroad.</li>
                <li>✔ We create our typographic and wireframe graphics, retailing curated apparel editions on Etsy.</li>
              </ul>
              <p>
                There are no handoffs, no corporate fluff, and no diluted standards. When our name is on a digital platform or stamped on a piece, it represents disciplined execution.
              </p>
            </div>
          </article>
        </div>

        {/* Contact Section */}
        <section id="contact" className="pt-12">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
