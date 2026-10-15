"use client";

import React from 'react';
import Link from 'next/link';

export const StudioAnchor: React.FC = () => {
  return (
    <div className="w-full border-t border-[#E5E7EB]/10 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 font-sans select-none">
        {/* Telemetry Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-8 font-mono text-xs">
          <span className="text-[#E5E7EB]/40 tracking-widest uppercase">
            // STUDIO INDEX // 2026
          </span>
          <span className="text-[#D4AF37]/80 tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            TANGIER, MOROCCO · 35.7595° N, 5.8340° W · SYS: ACTIVE
          </span>
        </div>

        {/* Editorial Mission Statement (High-Impact Typography) */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-snug text-[#E5E7EB] max-w-4xl">
            ALL IN is an independent technology studio engineering{' '}
            <span className="text-white font-semibold underline decoration-[#D4AF37]/50 underline-offset-8">
              distributed web systems
            </span>
            ,{' '}
            <span className="text-[#D4AF37] font-semibold">
              digital platforms
            </span>
            , and{' '}
            <span className="text-white font-semibold underline decoration-[#D4AF37]/50 underline-offset-8">
              heavyweight physical goods
            </span>{' '}
            from the Strait of Gibraltar.
          </h2>

          {/* Supporting Subtext & Route Anchor */}
          <div className="pt-2 space-y-4 max-w-2xl">
            <p className="text-sm md:text-base text-[#E5E7EB]/60 font-mono leading-relaxed">
              Bridging computational architecture and tactile materials. Every build is executed with zero bloat, modular discipline, and production-grade longevity.
            </p>

            <div>
              <Link
                href="/philosophy"
                className="inline-block text-xs font-mono text-[#D4AF37] hover:underline underline-offset-4 tracking-wider uppercase font-bold transition-all hover:translate-x-1"
              >
                [ READ THE PHILOSOPHY → ]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
