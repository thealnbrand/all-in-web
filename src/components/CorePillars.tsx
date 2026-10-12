"use client";

import React, { useState } from 'react';
import { STUDIO_PILLARS } from '../data/studioData';

export const CorePillars: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(STUDIO_PILLARS[0].id);

  const activePillar = STUDIO_PILLARS.find((p) => p.id === activePillarId) || STUDIO_PILLARS[0];

  return (
    <section id="pillars" className="py-24 bg-[#1B291F] border-t border-b border-[#9CA3AF]/10 relative">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#9CA3AF]/20">
          <div>
            <div className="font-mono text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-2">
              CORE CAPABILITIES // 03 DOMAINS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E5E7EB] tracking-tight">
              Studio Pillars
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#9CA3AF] max-w-md font-sans">
            Three distinct engineering disciplines working as a unified studio model. Zero compromise across digital logic and physical craft.
          </p>
        </div>

        {/* Pillar Domain Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STUDIO_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                type="button"
                className={`text-left p-6 sm:p-8 rounded-sm transition-all duration-300 relative border flex flex-col justify-between group ${
                  isActive
                    ? 'bg-[#243528] border-[#D4AF37] shadow-xl gold-glow-sm'
                    : 'bg-[#1B291F]/80 border-[#9CA3AF]/20 hover:border-[#D4AF37]/40 hover:bg-[#243528]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-[#D4AF37]">
                      {pillar.number}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-xs border ${
                        isActive
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                          : 'bg-[#1B291F] border-[#9CA3AF]/20 text-[#9CA3AF]'
                      }`}
                    >
                      {pillar.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#E5E7EB] mb-2 font-sans group-hover:text-[#D4AF37] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] line-clamp-3 font-sans leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#9CA3AF]/10 flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
                  <span className="group-hover:text-[#D4AF37] transition-colors">
                    {isActive ? 'VIEWING SPECIFICATIONS' : 'SELECT DOMAIN'}
                  </span>
                  <span className={`transition-transform duration-300 ${isActive ? 'translate-x-1 text-[#D4AF37]' : 'group-hover:translate-x-1'}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Blueprint Specs View */}
        <div className="bg-[#243528] border border-[#D4AF37]/40 p-6 sm:p-10 rounded-sm relative shadow-2xl">
          {/* Tech Spec Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#9CA3AF]/20">
            <div>
              <div className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
                SPECIFICATION SHEET // PILLAR {activePillar.number}
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] mt-1">
                {activePillar.title}
              </h4>
            </div>
            <div className="font-mono text-xs text-[#9CA3AF] bg-[#1B291F] px-4 py-2 border border-[#9CA3AF]/20 rounded-xs">
              SIGNATURE: <span className="text-[#E5E7EB]">{activePillar.signatureProject}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
            {/* Column 1: Domain Description & Overview */}
            <div className="lg:col-span-1 space-y-4">
              <h5 className="font-mono text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                DOMAN OVERVIEW & PHILOSOPHY
              </h5>
              <p className="text-sm text-[#E5E7EB] leading-relaxed font-sans">
                {activePillar.description}
              </p>
              
              {/* Domain Metrics */}
              <div className="pt-4 space-y-2">
                {activePillar.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-[#1B291F] border border-[#9CA3AF]/10 rounded-xs font-mono text-xs"
                  >
                    <span className="text-[#9CA3AF]">{m.label}</span>
                    <span className="text-[#D4AF37] font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Specific Capabilities */}
            <div className="lg:col-span-1 space-y-4">
              <h5 className="font-mono text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                TECHNICAL CAPABILITIES
              </h5>
              <ul className="space-y-2.5">
                {activePillar.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#E5E7EB]">
                    <span className="font-mono text-[#D4AF37] text-xs mt-0.5">0{idx + 1}.</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Tech Stack or Materials */}
            <div className="lg:col-span-1 space-y-4">
              <h5 className="font-mono text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                {activePillar.category === 'physical' ? 'MATERIALS & HARDWARE STACK' : 'ENGINEERING TECH STACK'}
              </h5>
              <div className="flex flex-wrap gap-2">
                {activePillar.techOrMaterials.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs bg-[#1B291F] text-[#E5E7EB] border border-[#9CA3AF]/30 px-3 py-1.5 rounded-xs hover:border-[#D4AF37] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-[#9CA3AF]/10">
                <a
                  href="#showcase"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2.5 rounded-xs transition-colors"
                >
                  <span>VIEW RELEASES IN {activePillar.title.toUpperCase()}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
