"use client";

import React, { useState } from 'react';

interface CustomerHeroVisualProps {
  onSelectSubject?: (subject: string) => void;
}

export const CustomerHeroVisual: React.FC<CustomerHeroVisualProps> = ({ onSelectSubject }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'capsule' | 'digital'>('all');
  const [reserved, setReserved] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<'3d' | 'specs'>('3d');

  const handleReserve = () => {
    setReserved(true);
    if (onSelectSubject) {
      onSelectSubject('CAPSULE_001 Reserve Inquiry');
    }
  };

  const handleInquireDigital = () => {
    if (onSelectSubject) {
      onSelectSubject('Bespoke Digital Build Inquiry');
    }
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto space-y-6 select-none font-sans">
      {/* Top Experience Switcher Pills */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-[#1B291F] border border-[#D4AF37]/30 rounded-full w-fit mx-auto shadow-lg">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#D4AF37] text-[#1B291F] shadow-md'
              : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
          }`}
        >
          DUAL-STUDIO OVERVIEW
        </button>
        <button
          onClick={() => setActiveTab('capsule')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'capsule'
              ? 'bg-[#D4AF37] text-[#1B291F] shadow-md'
              : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
          PHYSICAL DROP (01)
        </button>
        <button
          onClick={() => setActiveTab('digital')}
          className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'digital'
              ? 'bg-[#D4AF37] text-[#1B291F] shadow-md'
              : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
          }`}
        >
          DIGITAL CRAFT (02)
        </button>
      </div>

      {/* Dual Chamber Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Chamber 1: PHYSICAL DROP (CAPSULE_001) */}
        {(activeTab === 'all' || activeTab === 'capsule') && (
          <div
            className={`group relative bg-[#1B291F] border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 rounded-xs p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden ${
              activeTab === 'capsule' ? 'lg:col-span-2 max-w-2xl mx-auto w-full' : ''
            }`}
          >
            {/* Background Subtle Monogram Watermark */}
            <div className="absolute -right-8 -bottom-8 font-mono text-[140px] font-black text-[#243528]/50 pointer-events-none tracking-tighter leading-none select-none">
              ALN
            </div>

            {/* Chamber Header */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs border-b border-[#9CA3AF]/15 pb-4 mb-6">
                <span className="text-[#D4AF37] font-bold tracking-widest flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#243528] rounded-xs border border-[#D4AF37]/30">PHYSICAL DROP</span>
                  <span className="text-[#E5E7EB]">CAPSULE_001</span>
                </span>
                <span className="text-[#10B981] font-semibold tracking-wider bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                  RESERVE OPEN
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-tight mb-2">
                TANGIER DOCK FLEECE
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                Curated heavyweight streetwear blanks featuring high-resolution archival studio graphics and Tangier coordinate stamps. Retailed via Etsy.
              </p>

              {/* Interactive Visual Preview Box */}
              <div className="relative bg-[#243528] border border-[#9CA3AF]/20 rounded-xs p-5 mb-6 overflow-hidden">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#9CA3AF] mb-3">
                  <span>SPECIFICATION SUMMARY</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewMode('3d')}
                      className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                        previewMode === '3d' ? 'bg-[#D4AF37] text-[#1B291F] font-bold' : 'hover:text-[#E5E7EB]'
                      }`}
                    >
                      OVERVIEW
                    </button>
                    <button
                      onClick={() => setPreviewMode('specs')}
                      className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                        previewMode === 'specs' ? 'bg-[#D4AF37] text-[#1B291F] font-bold' : 'hover:text-[#E5E7EB]'
                      }`}
                    >
                      MATERIALS
                    </button>
                  </div>
                </div>

                {previewMode === '3d' ? (
                  <div className="relative w-full h-48 rounded-xs overflow-hidden border border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors">
                    <img
                      src="/t-shirt (1).png"
                      alt="Capsule 001 Apparel"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center font-mono text-[10px] text-[#D4AF37] z-10 bg-[#1B291F]/80 backdrop-blur-xs p-1.5 rounded-xs border border-[#D4AF37]/30">
                      <span>CURATED HEAVYWEIGHT STREETWEAR</span>
                      <span>[ ALN // TANGIER HQ ]</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-xs text-[#E5E7EB]">
                    <div className="flex justify-between border-b border-[#9CA3AF]/10 pb-1.5">
                      <span className="text-[#9CA3AF]">BLANK SPEC:</span>
                      <span className="text-[#D4AF37] font-semibold">Curated Heavyweight Streetwear Cotton</span>
                    </div>
                    <div className="flex justify-between border-b border-[#9CA3AF]/10 pb-1.5">
                      <span className="text-[#9CA3AF]">PRINT METHOD:</span>
                      <span className="text-[#E5E7EB]">Archival DTG Print Lab</span>
                    </div>
                    <div className="flex justify-between border-b border-[#9CA3AF]/10 pb-1.5">
                      <span className="text-[#9CA3AF]">GRAPHICS:</span>
                      <span className="text-[#D4AF37]">Tangier Coordinates & Blueprints</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-[#9CA3AF]">FULFILLMENT:</span>
                      <span className="text-[#10B981]">Printify On-Demand · Etsy Dispatch</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chamber Footer / CTAs */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs bg-[#243528] px-4 py-2.5 rounded-xs border border-[#D4AF37]/20">
                <span className="text-[#9CA3AF]">DROP COUNTDOWN:</span>
                <span className="text-[#D4AF37] font-bold tracking-wider">04d : 18h : 32m</span>
              </div>

              <a
                href="#contact"
                onClick={handleReserve}
                className={`w-full py-3.5 px-6 rounded-xs font-mono font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  reserved
                    ? 'bg-[#10B981] text-[#1B291F]'
                    : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#1B291F]'
                }`}
              >
                <span>{reserved ? '✔ RESERVATION INQUIRED' : 'RESERVE CAPSULE_001 PIECE'}</span>
                {!reserved && <span>→</span>}
              </a>
            </div>
          </div>
        )}

        {/* Chamber 2: DIGITAL CRAFT (BESPOKE WEBSITES & APPS) */}
        {(activeTab === 'all' || activeTab === 'digital') && (
          <div
            className={`group relative bg-[#1B291F] border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 rounded-xs p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden ${
              activeTab === 'digital' ? 'lg:col-span-2 max-w-2xl mx-auto w-full' : ''
            }`}
          >
            {/* Background Subtle Grid Element */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

            {/* Chamber Header */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs border-b border-[#9CA3AF]/15 pb-4 mb-6">
                <span className="text-[#D4AF37] font-bold tracking-widest flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#243528] rounded-xs border border-[#D4AF37]/30">DIGITAL STUDIO</span>
                  <span className="text-[#E5E7EB]">BESPOKE BUILDS</span>
                </span>
                <span className="text-[#D4AF37] font-semibold tracking-wider bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                  TAKING PROJECTS
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-tight mb-2">
                HIGH-PERFORMANCE DIGITAL CRAFT
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                Custom WebGL interactive platforms, luxury e-commerce, and high-performance digital experiences tailored for ambitious brands.
              </p>

              {/* Interactive Visual Preview Window with Product Image */}
              <div className="bg-[#243528] border border-[#9CA3AF]/20 rounded-xs p-5 mb-6 overflow-hidden">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#9CA3AF] mb-3">
                  <span>STUDIO DIGITAL ARCHITECTURE</span>
                  <span className="text-[#10B981] font-semibold">60 FPS REALTIME</span>
                </div>

                <div className="relative w-full h-48 rounded-xs overflow-hidden border border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors mb-3">
                  <img
                    src="/iPhone 16 Pro, Glossy.jpeg"
                    alt="Digital Products Mobile Suite"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center font-mono text-[10px] text-[#D4AF37] z-10 bg-[#1B291F]/80 backdrop-blur-xs p-1.5 rounded-xs border border-[#D4AF37]/30">
                    <span>ALN-MOBILE // PRO UTILITY SUITE</span>
                    <span>[ iOS & WEB APPS ]</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-2.5 bg-[#1B291F] rounded-xs border border-[#9CA3AF]/15 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[#D4AF37] font-bold mb-0.5">01 / IMMERSIVE</div>
                    <div className="text-[#E5E7EB] text-[10px]">Interactive 3D & WebGL</div>
                  </div>

                  <div className="p-2.5 bg-[#1B291F] rounded-xs border border-[#9CA3AF]/15 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[#D4AF37] font-bold mb-0.5">02 / E-COMMERCE</div>
                    <div className="text-[#E5E7EB] text-[10px]">Bespoke Luxury Stores</div>
                  </div>

                  <div className="p-2.5 bg-[#1B291F] rounded-xs border border-[#9CA3AF]/15 hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[#D4AF37] font-bold mb-0.5">03 / APPS & UTILS</div>
                    <div className="text-[#E5E7EB] text-[10px]">Custom High-Speed Apps</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chamber Footer / CTAs */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs bg-[#243528] px-4 py-2.5 rounded-xs border border-[#D4AF37]/20">
                <span className="text-[#9CA3AF]">STUDIO AVAILABILITY:</span>
                <span className="text-[#10B981] font-bold tracking-wider">Q4 PROJECT SLOT OPEN</span>
              </div>

              <a
                href="#contact"
                onClick={handleInquireDigital}
                className="w-full py-3.5 px-6 rounded-xs font-mono font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md bg-[#243528] hover:bg-[#243528]/80 text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37]"
              >
                <span>INQUIRE FOR DIGITAL PROJECT</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
