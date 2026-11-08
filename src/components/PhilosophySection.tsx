"use client";

import React from 'react';
import Link from 'next/link';

export const PhilosophySection: React.FC = () => {

  return (
    <section id="philosophy" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto select-none font-sans scroll-mt-24 space-y-16">
      {/* A. Section Header with Live Tangier Coordinates & Time Telemetry */}
      <div className="text-left space-y-4 max-w-4xl border-b border-[#E5E7EB]/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[#E5E7EB]/40 font-mono text-xs tracking-widest uppercase">
              04 // PHILOSOPHY
            </span>
            <span className="h-px w-16 bg-[#8B0000]/30" />
          </div>


        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight pt-2">
          Standing at the strait between computational logic and tactile permanence.
        </h2>

        <p className="text-sm sm:text-base text-[#E5E7EB]/75 font-sans leading-relaxed pt-1 max-w-3xl">
          Tangier sits where the Atlantic meets the Mediterranean, and Africa meets Europe. ALL IN embraces that same borderland identity by refusing the false boundary between software engineering and physical craft.
        </p>

        {/* Ambient Strait Radar Widget */}
        <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#9CA3AF]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            STRAIT BEACON: ONLINE
          </span>
          <span className="text-white/20">|</span>
          <span>MEDITERRANEAN &bull; ATLANTIC INTERSECTION</span>
        </div>
      </div>

      {/* B. The Three Studio Pillars with Visual Photography & Tactile Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thesis 01: Systems & Engineering */}
        <div className="bg-[#111A2E] border border-[#E5E7EB]/10 hover:border-[#8B0000]/50 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(139,0,0,0.15)] relative">
          <div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#8B0000] transition-colors">
                Architectural Discipline
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/75 leading-relaxed font-sans">
                Software is digital civil engineering. We build resilient, low-latency architectures with zero algorithmic bloat and sub-second execution.
              </p>
            </div>
          </div>
        </div>

        {/* Thesis 02: Tactile Craft */}
        <div className="bg-[#111A2E] border border-[#E5E7EB]/10 hover:border-[#8B0000]/50 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(139,0,0,0.15)] relative">
          <div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#8B0000] transition-colors">
                Physical Graphic Editions
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/75 leading-relaxed font-sans">
                Studio uniforms and technical typography on curated heavyweight streetwear blanks. High-resolution direct prints with zero inventory waste.
              </p>
            </div>
          </div>
        </div>

        {/* Thesis 03: The Strait Intersection */}
        <div className="bg-[#111A2E] border border-[#E5E7EB]/10 hover:border-[#8B0000]/50 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(139,0,0,0.15)] relative">
          <div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#8B0000] transition-colors">
                The Unified Standard
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/75 leading-relaxed font-sans">
                Operating from the strait of Tangier, we build real things with zero middlemen. Every line of code and visual artifact is executed with engineering discipline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* C. The Signature Quote with Ambient Studio Photography */}
      <div className="bg-[#111A2E] border border-[#8B0000]/40 rounded-2xl p-8 sm:p-14 relative overflow-hidden shadow-2xl text-center space-y-6 group">

        <div className="absolute top-4 left-6 font-mono text-6xl text-[#8B0000]/10 pointer-events-none select-none">
          “
        </div>
        <div className="absolute -bottom-6 right-6 font-mono text-6xl text-[#8B0000]/10 pointer-events-none select-none">
          ”
        </div>

        <div className="relative z-10 space-y-4">
          <span className="font-mono text-xs text-[#8B0000] font-bold tracking-widest uppercase block">
            // THE CORE DOCTRINE
          </span>

          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-snug max-w-4xl mx-auto">
            &ldquo;We don&apos;t outsource the hard parts. We ship the entire machine.&rdquo;
          </blockquote>

          <div className="pt-4 flex items-center justify-center gap-3 font-mono text-xs text-[#9CA3AF]">
            <span className="w-8 h-px bg-[#8B0000]/40" />
            <span>ALL IN STUDIO [ ALN ] · TANGIER, MOROCCO · 35.7595° N, 5.8340° W</span>
            <span className="w-8 h-px bg-[#8B0000]/40" />
          </div>
        </div>
      </div>

      {/* D. The Exit Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#111A2E]/70 border border-[#E5E7EB]/10 hover:border-[#8B0000]/30 transition-colors backdrop-blur-sm">
        <div className="text-left">
          <span className="font-mono text-xs text-[#8B0000] font-bold tracking-wider uppercase block">
            // EDITORIAL DISPATCHES & BEHIND-THE-SCENES
          </span>
          <p className="text-sm text-[#E5E7EB]/80 mt-1 font-sans">
            Read our long-form essays on Mediterranean engineering, studio manufacturing photojournalism, and technical design notes.
          </p>
        </div>

        <Link
          href="/philosophy"
          className="font-mono text-xs font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer shrink-0 text-center flex items-center gap-2"
        >
          <span>[ READ STUDIO PHILOSOPHY ]</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};
