"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { STUDIO_RELEASES } from '../data/studioData';
import { DomainCategory, StudioRelease } from '../types';
import { ReleaseModal } from './ReleaseModal';

interface ShowcaseGridProps {
  onInquire: (subject: string) => void;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({ onInquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<DomainCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalRelease, setActiveModalRelease] = useState<StudioRelease | null>(null);

  const filterCategories: { id: DomainCategory; label: string }[] = [
    { id: 'all', label: 'ALL RELEASES' },
    { id: 'software', label: 'SOFTWARE & ENG' },
    { id: 'digital', label: 'DIGITAL UTILITIES' },
    { id: 'physical', label: 'PHYSICAL DROPS' },
  ];

  const filteredReleases = useMemo(() => {
    return STUDIO_RELEASES.filter((release) => {
      const matchesCategory =
        selectedCategory === 'all' || release.category === selectedCategory;
      const matchesSearch =
        release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.techStackOrMaterials.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'RELEASED':
        return 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/50';
      case 'LIMITED DROP':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/50';
      case 'BETA':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/50';
      case 'IN DEVELOPMENT':
        return 'bg-sky-950/60 text-sky-300 border-sky-500/50';
      case 'ARCHIVED':
        return 'bg-zinc-800 text-zinc-400 border-zinc-600';
      default:
        return 'bg-[#1B291F] text-[#9CA3AF] border-[#9CA3AF]/30';
    }
  };

  return (
    <section id="showcase" className="py-24 bg-[#243528] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#9CA3AF]/20">
          <div>
            <div className="font-mono text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-2">
              UNIFIED MATRIX // SOFTWARE • DIGITAL • PHYSICAL
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E5E7EB] tracking-tight">
              Releases & Case Studies
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#9CA3AF] max-w-md font-sans">
            A comprehensive registry of software engineering builds, digital utilities, and limited physical capsule drops.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`font-mono text-xs font-semibold tracking-wider px-4 py-2.5 rounded-xs border transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1B291F] border-[#D4AF37] shadow-sm'
                      : 'bg-[#1B291F] text-[#9CA3AF] border-[#9CA3AF]/20 hover:border-[#D4AF37]/40 hover:text-[#E5E7EB]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search release code, tech, or name..."
              className="w-full bg-[#1B291F] border border-[#9CA3AF]/30 focus:border-[#D4AF37] text-[#E5E7EB] placeholder-[#9CA3AF]/60 text-xs font-mono px-4 py-2.5 rounded-xs outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#9CA3AF] hover:text-[#D4AF37]"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Release Grid */}
        {filteredReleases.length === 0 ? (
          <div className="p-12 text-center bg-[#1B291F] border border-[#9CA3AF]/20 rounded-sm font-mono text-sm text-[#9CA3AF]">
            NO RELEASES MATCHING SEARCH QUERY &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReleases.map((release) => (
              <div
                key={release.id}
                onClick={() => setActiveModalRelease(release)}
                className="group bg-[#1B291F] border border-[#9CA3AF]/20 hover:border-[#D4AF37] p-6 rounded-sm transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1 relative"
              >
                {/* Visual Header / Status Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-[#D4AF37]">
                      {release.code}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-xs border ${getStatusBadgeStyle(
                        release.status
                      )}`}
                    >
                      {release.status}
                    </span>
                  </div>

                  {/* Visual Blueprint Container with Product Image or Watermark Logo */}
                  <div className="w-full h-44 bg-[#243528] border border-[#9CA3AF]/10 rounded-xs mb-4 flex flex-col items-center justify-center text-center group-hover:border-[#D4AF37]/40 transition-colors relative overflow-hidden">
                    {release.image ? (
                      <>
                        <Image
                          src={release.image}
                          alt={release.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B291F] via-[#1B291F]/30 to-transparent" />
                        <div className="absolute top-2 left-2 font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase bg-[#1B291F]/80 px-2 py-0.5 rounded-xs border border-[#D4AF37]/30 z-10">
                          [ {release.category.toUpperCase()} MATRIX ]
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-15 flex items-center justify-center pointer-events-none p-4">
                          <Image
                            src="/logo.png"
                            alt="ALN Seal"
                            width={200}
                            height={125}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase mb-1 relative z-10">
                          [ {release.category.toUpperCase()} MATRIX ]
                        </div>
                        <div className="font-mono text-xs text-[#E5E7EB] font-bold tracking-wide group-hover:text-[#D4AF37] transition-colors relative z-10">
                          {release.imagePlaceholderText}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-2 group-hover:text-[#D4AF37] transition-colors font-sans">
                    {release.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] line-clamp-3 mb-4 font-sans leading-relaxed">
                    {release.summary}
                  </p>
                </div>

                {/* Card Footer: Tech tags & Action link */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {release.techStackOrMaterials.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] bg-[#243528] text-[#9CA3AF] border border-[#9CA3AF]/20 px-2 py-0.5 rounded-xs"
                      >
                        {item}
                      </span>
                    ))}
                    {release.techStackOrMaterials.length > 3 && (
                      <span className="font-mono text-[10px] text-[#9CA3AF] px-1 py-0.5">
                        +{release.techStackOrMaterials.length - 3} MORE
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#9CA3AF]/10 flex items-center justify-between font-mono text-xs text-[#D4AF37] group-hover:underline">
                    <span>VIEW BLUEPRINT & SPECS</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blueprint Detail Modal */}
      <ReleaseModal
        release={activeModalRelease}
        onClose={() => setActiveModalRelease(null)}
        onInquire={(subject) => {
          onInquire(subject);
          const contactElement = document.getElementById('contact');
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
};
