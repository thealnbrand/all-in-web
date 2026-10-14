"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { STUDIO_METADATA } from '../data/studioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1B291F] border-t border-[#9CA3AF]/20 pt-16 pb-12 font-mono text-xs text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#9CA3AF]/10">
          {/* Col 1: Studio Branding with logo.png */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="ALL IN [ ALN ] Studio Emblem"
                width={140}
                height={88}
                className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]"
              />
              <div className="flex flex-col border-l border-[#9CA3AF]/20 pl-3">
                <span className="text-sm font-bold text-[#E5E7EB]">ALL IN STUDIO</span>
                <span className="text-[10px] text-[#D4AF37]">TANGIER HQ</span>
              </div>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm font-sans">
              Independent creative technology studio engineering software architectures, digital products, and physical capsule drops. Tangier, Morocco.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[#E5E7EB] font-bold uppercase tracking-wider mb-2">
              NAVIGATION
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/systems" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">01 //</span> SYSTEMS
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">02 //</span> PRODUCTS
                </Link>
              </li>
              <li>
                <Link href="/goods" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">03 //</span> GOODS
                </Link>
              </li>
              <li>
                <Link href="/philosophy" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">04 //</span> PHILOSOPHY
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">05 //</span> INITIATE INQUIRY
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[#E5E7EB] font-bold uppercase tracking-wider mb-2">
              DIRECT CHANNELS
            </div>
            <div>
              <span className="text-[#9CA3AF]">INQUIRIES & DISPATCH:</span>
              <a
                href={`mailto:${STUDIO_METADATA.email}`}
                className="block text-[#D4AF37] hover:underline font-semibold mt-0.5"
              >
                {STUDIO_METADATA.email}
              </a>
            </div>
            <div>
              <span className="text-[#9CA3AF]">STUDIO COORDINATES:</span>
              <p className="text-[#E5E7EB] mt-0.5">35.7595° N, 5.8340° W (TANGIER HQ)</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-[#9CA3AF]">
            © {new Date().getFullYear()} ALL IN <span className="text-[#D4AF37]">[ ALN ]</span> STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="text-[#9CA3AF]">ZERO COMPROMISE TECH & CRAFT</span>
            <button
              onClick={scrollToTop}
              type="button"
              className="text-[#E5E7EB] hover:text-[#D4AF37] border border-[#9CA3AF]/30 px-3 py-1 rounded-xs transition-colors flex items-center gap-1"
            >
              <span>TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
