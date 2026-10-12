"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { StudioRelease } from '../types';
import { STUDIO_METADATA } from '../data/studioData';

interface ReleaseModalProps {
  release: StudioRelease | null;
  onClose: () => void;
  onInquire: (subject: string) => void;
}

export const ReleaseModal: React.FC<ReleaseModalProps> = ({
  release,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (release) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [release, onClose]);

  if (!release) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RELEASED':
        return 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]';
      case 'LIMITED DROP':
        return 'bg-emerald-950 border-emerald-500 text-emerald-400';
      case 'BETA':
        return 'bg-amber-950 border-amber-500 text-amber-300';
      case 'IN DEVELOPMENT':
        return 'bg-sky-950 border-sky-500 text-sky-300';
      case 'ARCHIVED':
        return 'bg-zinc-800 border-zinc-500 text-zinc-400';
      default:
        return 'bg-[#1B291F] border-[#9CA3AF] text-[#9CA3AF]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#1B291F] border border-[#D4AF37]/50 rounded-md p-6 sm:p-8 shadow-2xl my-auto text-[#E5E7EB]">
        {/* Technical Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#9CA3AF]/20 pb-5 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider">
                CODE: {release.code}
              </span>
              <span
                className={`font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 rounded-xs border ${getStatusColor(
                  release.status
                )}`}
              >
                [ {release.status} ]
              </span>
              <span className="font-mono text-xs text-[#9CA3AF]">
                {release.releaseDate}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] font-sans tracking-tight">
              {release.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#243528] rounded-sm transition-colors font-mono text-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="space-y-6">
          {/* Visual Blueprint Banner */}
          <div className="w-full h-44 sm:h-56 bg-[#243528] border border-[#9CA3AF]/20 rounded-xs flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
            {/* Embedded Studio Logo Emblem */}
            <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none p-6">
              <Image
                src="/logo.png"
                alt="Studio Blueprint Seal"
                width={320}
                height={200}
                className="object-contain max-h-full"
              />
            </div>
            <div className="font-mono text-xs text-[#D4AF37] tracking-widest mb-1 relative z-10">
              ALN BLUEPRINT MATRIX // {release.category.toUpperCase()}
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-[#E5E7EB] tracking-wider relative z-10">
              {release.imagePlaceholderText}
            </div>
            {release.editionDetails && (
              <div className="mt-2 font-mono text-xs text-[#9CA3AF] bg-[#1B291F] px-3 py-1 border border-[#D4AF37]/30 rounded-xs relative z-10">
                {release.editionDetails}
              </div>
            )}
          </div>

          {/* Narrative Summary */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              PROJECT NARRATIVE
            </h4>
            <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed font-sans">
              {release.fullDescription}
            </p>
          </div>

          {/* Technical Specifications List */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              ENGINEERING & MATERIAL SPECIFICATIONS
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-[#E5E7EB]">
              {release.specifications.map((spec, idx) => (
                <li
                  key={idx}
                  className="bg-[#243528] p-2.5 border border-[#9CA3AF]/10 rounded-xs flex items-start gap-2"
                >
                  <span className="text-[#D4AF37] font-bold">›</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack / Materials Tags */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              {release.category === 'physical' ? 'MATERIALS USED' : 'TECHNOLOGY STACK'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {release.techStackOrMaterials.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs bg-[#243528] text-[#E5E7EB] border border-[#9CA3AF]/20 px-3 py-1 rounded-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer & Actions */}
        <div className="mt-8 pt-6 border-t border-[#9CA3AF]/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="text-[#9CA3AF]">
            STUDIO CONTACT: <span className="text-[#E5E7EB]">{STUDIO_METADATA.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-[#9CA3AF] hover:text-[#E5E7EB] border border-[#9CA3AF]/30 rounded-xs transition-colors"
            >
              DISMISS
            </button>

            <button
              onClick={() => {
                onClose();
                onInquire(`Inquiry: ${release.title} (${release.code})`);
              }}
              type="button"
              className="px-5 py-2 font-semibold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xs transition-colors shadow-sm"
            >
              {release.primaryActionLabel} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
