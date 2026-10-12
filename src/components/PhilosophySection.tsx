"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const PhilosophySection: React.FC = () => {
  const [tangierTime, setTangierTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Casablanca',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTangierTime(`${timeStr} (GMT+1)`);
      } catch {
        setTangierTime('12:00:00 (GMT+1)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="philosophy" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto select-none font-sans scroll-mt-24 space-y-16">
      {/* A. Section Header with Live Tangier Coordinates & Time Telemetry */}
      <div className="text-left space-y-4 max-w-4xl border-b border-[#E5E7EB]/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[#E5E7EB]/40 font-mono text-xs tracking-widest uppercase">
              04 // PHILOSOPHY
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/30" />
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="font-mono text-xs text-[#D4AF37] bg-[#1B291F] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>35.7595° N, 5.8340° W // TANGIER HQ</span>
            </div>

            {tangierTime && (
              <div className="hidden sm:flex items-center gap-1.5 text-[#9CA3AF] bg-[#1B291F] px-3 py-1.5 rounded-full border border-[#E5E7EB]/10">
                <span className="text-[#D4AF37]">LOCAL:</span>
                <span>{tangierTime}</span>
              </div>
            )}
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
        <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(212,175,55,0.15)] relative">
          <div>
            {/* Visual Header Image */}
            <div className="relative h-48 w-full overflow-hidden bg-[#111A13]">
              <img
                src="/Engineering.jfif"
                alt="Engineering Architecture & Code Discipline"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/40 to-transparent" />
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[#D4AF37] drop-shadow-md">01</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-white bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded border border-[#D4AF37]/40">
                  CODE AS STRUCTURE
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                Architectural Discipline
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/75 leading-relaxed font-sans">
                Software is digital civil engineering. We build resilient, low-latency architectures with zero algorithmic bloat and sub-second execution.
              </p>
            </div>
          </div>
        </div>

        {/* Thesis 02: Tactile Craft */}
        <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(212,175,55,0.15)] relative">
          <div>
            {/* Visual Header Image */}
            <div className="relative h-48 w-full overflow-hidden bg-[#111A13]">
              <img
                src="/TactileGoods.jfif"
                alt="Tactile Hardware & Fabric Engineering"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/40 to-transparent" />
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[#D4AF37] drop-shadow-md">02</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-white bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded border border-[#D4AF37]/40">
                  VISUAL & TACTILE GOODS
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                Physical Graphic Editions
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/75 leading-relaxed font-sans">
                Studio uniforms and technical typography on curated heavyweight streetwear blanks. High-resolution direct prints with zero inventory waste.
              </p>
            </div>
          </div>
        </div>

        {/* Thesis 03: The Strait Intersection */}
        <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(212,175,55,0.15)] relative">
          <div>
            {/* Visual Header Image */}
            <div className="relative h-48 w-full overflow-hidden bg-[#111A13]">
              <img
                src="/DigitalProducts.jfif"
                alt="Tangier Borderland & Dual Discipline Standard"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/40 to-transparent" />
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[#D4AF37] drop-shadow-md">03</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-white bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded border border-[#D4AF37]/40">
                  END-TO-END OWNERSHIP
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
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
      <div className="bg-[#1B291F] border border-[#D4AF37]/40 rounded-2xl p-8 sm:p-14 relative overflow-hidden shadow-2xl text-center space-y-6 group">
        {/* Subtle Background Photography */}
        <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
          <img
            src="/Lifestyle, Black (1).jpeg"
            alt="Studio Tangier Craft"
            className="w-full h-full object-cover object-center filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/80 to-[#1B291F]" />
        </div>

        <div className="absolute top-4 left-6 font-mono text-6xl text-[#D4AF37]/10 pointer-events-none select-none">
          “
        </div>
        <div className="absolute -bottom-6 right-6 font-mono text-6xl text-[#D4AF37]/10 pointer-events-none select-none">
          ”
        </div>

        <div className="relative z-10 space-y-4">
          <span className="font-mono text-xs text-[#D4AF37] font-bold tracking-widest uppercase block">
            // THE CORE DOCTRINE
          </span>

          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-snug max-w-4xl mx-auto">
            &ldquo;We don&apos;t outsource the hard parts. We ship the entire machine.&rdquo;
          </blockquote>

          <div className="pt-4 flex items-center justify-center gap-3 font-mono text-xs text-[#9CA3AF]">
            <span className="w-8 h-px bg-[#D4AF37]/40" />
            <span>ALL IN STUDIO [ ALN ] · TANGIER, MOROCCO · 35.7595° N, 5.8340° W</span>
            <span className="w-8 h-px bg-[#D4AF37]/40" />
          </div>
        </div>
      </div>

      {/* D. The Exit Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#1B291F]/70 border border-[#E5E7EB]/10 hover:border-[#D4AF37]/30 transition-colors backdrop-blur-sm">
        <div className="text-left">
          <span className="font-mono text-xs text-[#D4AF37] font-bold tracking-wider uppercase block">
            // EDITORIAL DISPATCHES & BEHIND-THE-SCENES
          </span>
          <p className="text-sm text-[#E5E7EB]/80 mt-1 font-sans">
            Read our long-form essays on Mediterranean engineering, studio manufacturing photojournalism, and technical design notes.
          </p>
        </div>

        <Link
          href="/manifesto"
          className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer shrink-0 text-center flex items-center gap-2"
        >
          <span>[ READ STUDIO PHILOSOPHY ]</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};
