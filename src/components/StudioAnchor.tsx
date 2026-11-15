"use client";

import React from 'react';
import { NewsletterDispatch } from './NewsletterDispatch';

export const StudioAnchor: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#0A0F1D] border-t border-[#8B0000]/25 text-[#E5E7EB] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 font-sans space-y-16">
        
        {/* Section Top Header Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/20 pb-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[#8B0000] font-bold tracking-widest uppercase">
              // STUDIO MANIFESTO
            </span>
            <span className="h-px w-12 bg-[#8B0000]/40" />
            <span className="text-[#E5E7EB]/50 uppercase tracking-wider">
              SECTION 00 // TANGIER OPERATIONAL LAB
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#9CA3AF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] animate-pulse" />
            <span className="text-[#8B0000] font-bold">STATUS:</span>
            <span className="text-[#E5E7EB]/80">ACTIVE LAB & PRODUCTION LINE</span>
          </div>
        </div>

        {/* 1. Layout Structure: Two-Column Brutalist Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Studio Origins / Manifesto ("Tangier Operational Lab") */}
          <div className="border border-[#8B0000]/30 bg-[#111A2E]/70 backdrop-blur-sm flex flex-col justify-between transition-all hover:border-[#8B0000]/60 shadow-xl group">
            {/* Dark Red Structural Header Panel */}
            <div className="bg-[#8B0000]/15 border-b border-[#8B0000]/30 px-6 sm:px-8 py-3.5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#8B0000] font-extrabold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8B0000]" />
                ORIGINS // TANGIER OPERATIONAL LAB
              </span>
              <span className="text-[#E5E7EB]/40 font-mono text-[11px]">
                LOC: TNG_STRAIT
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight uppercase font-sans">
                  Multidisciplinary Engineering from the Strait.
                </h3>
                <p className="text-sm sm:text-base text-[#E5E7EB]/80 leading-relaxed font-sans">
                  ALL IN was founded as an independent operational lab in Tangier, Morocco—positioned where the Atlantic meets the Mediterranean and Africa interfaces with Europe. We reject the false boundary separating computational infrastructure from physical craft.
                </p>
                <p className="text-xs sm:text-sm text-[#E5E7EB]/65 leading-relaxed font-sans">
                  From custom high-throughput software architectures and open digital toolchains to heavyweight graphic streetwear blanks engineered for permanence, every artifact is designed, coded, and produced under one singular standard.
                </p>
              </div>

              {/* Core Disciplines Telemetry Deck */}
              <div className="pt-6 border-t border-[#8B0000]/20 space-y-2.5 font-mono text-xs">
                <div className="text-[#8B0000] font-bold tracking-wider text-[11px] uppercase">
                  // CORE DISCIPLINES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-[#0A0F1D] border border-[#8B0000]/25 p-3 text-left">
                    <span className="text-[#8B0000] font-bold block text-[10px]">01 // SYSTEMS</span>
                    <span className="text-[#E5E7EB] font-bold text-xs mt-0.5 block">Distributed Web</span>
                  </div>
                  <div className="bg-[#0A0F1D] border border-[#8B0000]/25 p-3 text-left">
                    <span className="text-[#8B0000] font-bold block text-[10px]">02 // PRODUCTS</span>
                    <span className="text-[#E5E7EB] font-bold text-xs mt-0.5 block">Digital Utilities</span>
                  </div>
                  <div className="bg-[#0A0F1D] border border-[#8B0000]/25 p-3 text-left">
                    <span className="text-[#8B0000] font-bold block text-[10px]">03 // GOODS</span>
                    <span className="text-[#E5E7EB] font-bold text-xs mt-0.5 block">Tactile Apparel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Core Philosophy ("Execution, Not Explanation") */}
          <div className="border border-[#8B0000]/30 bg-[#111A2E]/70 backdrop-blur-sm flex flex-col justify-between transition-all hover:border-[#8B0000]/60 shadow-xl group">
            {/* Dark Red Structural Header Panel */}
            <div className="bg-[#8B0000]/15 border-b border-[#8B0000]/30 px-6 sm:px-8 py-3.5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#8B0000] font-extrabold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8B0000]" />
                CORE DOCTRINE // EXECUTION, NOT EXPLANATION
              </span>
              <span className="text-[#E5E7EB]/40 font-mono text-[11px]">
                CODE: ENX_01
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight uppercase font-sans">
                  We don&apos;t outsource the hard parts. We ship the machine.
                </h3>
                <p className="text-sm sm:text-base text-[#E5E7EB]/80 leading-relaxed font-sans">
                  The world has enough agencies selling abstract slide decks and endless discovery sprints. We operate on compiled truth. If it doesn&apos;t compile, ship, or hold tactile weight in the physical world, it does not exist.
                </p>
                <p className="text-xs sm:text-sm text-[#E5E7EB]/65 leading-relaxed font-sans">
                  Software is digital civil engineering: built with brutalist restraint, sub-second latency, zero algorithmic bloat, and resilient longevity.
                </p>
              </div>

              {/* Execution Principles Checklist */}
              <div className="pt-6 border-t border-[#8B0000]/20 space-y-2.5 font-mono text-xs">
                <div className="text-[#8B0000] font-bold tracking-wider text-[11px] uppercase">
                  // EXECUTION PRINCIPLES
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-start gap-3 bg-[#0A0F1D] border border-[#8B0000]/25 p-2.5">
                    <span className="text-[#8B0000] font-bold">[ 01 ]</span>
                    <span className="text-[#E5E7EB] text-xs">
                      <strong className="text-white">Zero Middlemen:</strong> Direct engineering access from founder to production pipeline.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-[#0A0F1D] border border-[#8B0000]/25 p-2.5">
                    <span className="text-[#8B0000] font-bold">[ 02 ]</span>
                    <span className="text-[#E5E7EB] text-xs">
                      <strong className="text-white">Compiled Integrity:</strong> Sub-second latency, deterministic builds, and rigorous reliability.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-[#0A0F1D] border border-[#8B0000]/25 p-2.5">
                    <span className="text-[#8B0000] font-bold">[ 03 ]</span>
                    <span className="text-[#E5E7EB] text-xs">
                      <strong className="text-white">Tactile Permanence:</strong> Code and physical textiles engineered for generational durability.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Newsletter / Subscribing Component: Terminal-Style Command Prompt Block */}
        <NewsletterDispatch id="dispatch" />

      </div>
    </section>
  );
};
