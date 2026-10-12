"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EXTERNAL_LINKS } from '../lib/externalLinks';

interface TactileGoodsTeaserProps {
  onInquire?: (subject: string) => void;
}

interface CapsuleItem {
  id: string;
  code: string;
  watermark: string;
  name: string;
  shortTitle: string;
  status: string;
  badge: string;
  price: string;
  primaryImage: string;
  secondaryImage: string;
  visual1Tag: string;
  visual1Sub: string;
  visual2Tag: string;
  visual2Sub: string;
  description: string;
  blankSelection: string;
  printMethod: string;
  fitProfile: string;
  productionModel: string;
  retailCheckout: string;
  ctaLabel: string;
  url: string;
}

const DEFAULT_CAPSULE_ITEMS: CapsuleItem[] = [
  {
    id: 'capsule-001',
    code: '01',
    watermark: 'CPS.01',
    name: 'CAPSULE_001 // TANGIER DOCK FLEECE HOODIE',
    shortTitle: 'TANGIER DOCK FLEECE HOODIE',
    status: 'STUDIO GRAPHIC EDITION // ON-DEMAND DISPATCH',
    badge: 'CAPSULE 001 // FLEECE',
    price: '$160.00 USD',
    primaryImage: '/TactileGoods.jfif',
    secondaryImage: '/Lifestyle, Black (1).jpeg',
    visual1Tag: '[ GRAPHIC PRINT ]',
    visual1Sub: 'ARCHIVAL DTG PRINT',
    visual2Tag: '[ SILHOUETTE ]',
    visual2Sub: 'BOXY STREETWEAR FIT',
    description:
      'Engineered with high-resolution studio typography, Tangier coordinate stamps (35.7595° N, 5.8340° W), and architectural wireframe prints on premium structured blanks.',
    blankSelection: 'Curated Heavyweight Streetwear Cotton',
    printMethod: 'High-Resolution Direct-to-Garment (DTG)',
    fitProfile: 'Architectural Relaxed / Drop-Shoulder',
    productionModel: 'On-Demand via Printify (Zero Waste)',
    retailCheckout: 'Dispatched Directly via Official Etsy Shop',
    ctaLabel: 'CAPSULE 001',
    url: EXTERNAL_LINKS.ETSY.CAPSULE_001_FLEECE,
  },
  {
    id: 'capsule-002',
    code: '02',
    watermark: 'CPS.02',
    name: 'CAPSULE_002 // ALN GRAPHIC OVERSIZED TEE — NOIR',
    shortTitle: 'ALN GRAPHIC OVERSIZED TEE',
    status: 'ARCHIVAL GRAPHIC EDITION // ON-DEMAND DISPATCH',
    badge: 'CAPSULE 002 // HEAVY TEE',
    price: '$65.00 USD',
    primaryImage: '/t-shirt (1).png',
    secondaryImage: '/t-shirt (2).png',
    visual1Tag: '[ FRONT & BACK ]',
    visual1Sub: 'STUDIO TYPOGRAPHY',
    visual2Tag: '[ EDITION VIEW ]',
    visual2Sub: 'HEAVYWEIGHT JERSEY',
    description:
      'Curated heavyweight combed cotton streetwear tee featuring bespoke studio typographic back print, architectural coordinate stamps, and reinforced collar ribbing.',
    blankSelection: 'Curated Heavyweight Combed Jersey Cotton',
    printMethod: 'High-Resolution Direct-to-Garment (DTG)',
    fitProfile: 'Oversized Streetwear / Drop-Shoulder',
    productionModel: 'On-Demand via Printify (Zero Waste)',
    retailCheckout: 'Dispatched Directly via Official Etsy Shop',
    ctaLabel: 'CAPSULE 002',
    url: 'https://chillguyso.etsy.com',
  },
  {
    id: 'capsule-003',
    code: '03',
    watermark: 'CPS.03',
    name: 'CAPSULE_003 // STRAIT BORDERLAND EDITION — CRIMSON & NOIR',
    shortTitle: 'STRAIT BORDERLAND EDITION',
    status: 'HERITAGE GRAPHIC EDITION // ON-DEMAND DISPATCH',
    badge: 'CAPSULE 003 // HERITAGE',
    price: '$145.00 USD',
    primaryImage: '/Lifestyle, Red.jpeg',
    secondaryImage: '/Lifestyle, Black.jpeg',
    visual1Tag: '[ CRIMSON EDITION ]',
    visual1Sub: 'HERITAGE COLORWAY',
    visual2Tag: '[ NOIR EDITION ]',
    visual2Sub: 'STUDIO LOOKBOOK',
    description:
      'Graphic edition pairing crimson and noir streetwear silhouettes with Atlantic-Mediterranean strait telemetry markers and precision vector wireframe graphics.',
    blankSelection: 'Structured Heavyweight Combed Cotton Blank',
    printMethod: 'High-Resolution Direct-to-Garment (DTG)',
    fitProfile: 'Boxy Contemporary Streetwear Cut',
    productionModel: 'On-Demand via Printify (Zero Waste)',
    retailCheckout: 'Dispatched Directly via Official Etsy Shop',
    ctaLabel: 'CAPSULE 003',
    url: 'https://chillguyso.etsy.com',
  },
];

export const TactileGoodsTeaser: React.FC<TactileGoodsTeaserProps> = ({ onInquire }) => {
  const [items, setItems] = useState<CapsuleItem[]>(DEFAULT_CAPSULE_ITEMS);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const res = await fetch('/api/goods');
        if (res.ok) {
          const data = await res.json();
          if (data.goods && Array.isArray(data.goods) && data.goods.length > 0) {
            const mapped: CapsuleItem[] = data.goods.slice(0, 3).map((g: any, idx: number) => {
              const fallback = DEFAULT_CAPSULE_ITEMS[idx] || DEFAULT_CAPSULE_ITEMS[0];
              return {
                id: g.id || fallback.id,
                code: String(idx + 1).padStart(2, '0'),
                watermark: `CPS.0${idx + 1}`,
                name: g.name || fallback.name,
                shortTitle: g.name ? g.name.replace(/^CAPSULE_\d+\s*\/\/\s*/i, '') : fallback.shortTitle,
                status: g.status || fallback.status,
                badge: g.badge || fallback.badge,
                price: g.price_tag || fallback.price,
                primaryImage: g.image || fallback.primaryImage,
                secondaryImage: g.secondary_image || fallback.secondaryImage,
                visual1Tag: fallback.visual1Tag,
                visual1Sub: fallback.visual1Sub,
                visual2Tag: fallback.visual2Tag,
                visual2Sub: fallback.visual2Sub,
                description: g.description || fallback.description,
                blankSelection: g.materials || fallback.blankSelection,
                printMethod: fallback.printMethod,
                fitProfile: fallback.fitProfile,
                productionModel: fallback.productionModel,
                retailCheckout: fallback.retailCheckout,
                ctaLabel: `CAPSULE 00${idx + 1}`,
                url: g.url || fallback.url,
              };
            });
            // If DB has fewer than 3 items, pad with remaining default items so all 3 cards show
            while (mapped.length < 3) {
              mapped.push(DEFAULT_CAPSULE_ITEMS[mapped.length]);
            }
            setItems(mapped);
          }
        }
      } catch (err) {
        console.warn('Using static tactile goods fallback', err);
      }
    };
    fetchGoods();
  }, []);

  const activeItem = items[activeIndex] || items[0];

  return (
    <section id="apparel" className="relative py-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto select-none font-sans scroll-mt-24 space-y-10 overflow-hidden rounded-3xl">
      {/* Visible Ambient Background Atmospheric Image */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-3xl">
        <img
          src="/TactileGoods.jfif"
          alt=""
          className="w-full h-full object-cover object-center opacity-22 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#243528]/85 via-transparent to-[#243528]/95" />
      </div>

      {/* A. Section Header + Direct Etsy Store Link */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
        <div className="text-left space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-[#E5E7EB]/40 font-mono text-xs tracking-widest uppercase">
              03 // TACTILE GOODS & APPAREL
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/30" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight">
            Curated heavyweight streetwear blanks with archival studio graphic prints.
          </h2>

          <p className="text-sm sm:text-base text-[#E5E7EB]/75 font-sans leading-relaxed pt-1">
            We don&apos;t run a fake textile mill. We design high-resolution architectural typography, studio coordinate stamps, and vector blueprints, printed on carefully curated heavyweight blanks and dispatched on-demand worldwide via Etsy with zero inventory waste.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href="https://chillguyso.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-6 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <span>[ GO STRAIGHT TO ETSY SHOP ]</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* B. Upper Feature Block (Dynamically Bound to Active Capsule Item) */}
      <div className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8 hover:shadow-[0_0_35px_rgba(212,175,55,0.12)] transition-all">
        {/* Ambient Background Watermark */}
        <div className="absolute -right-6 -bottom-6 font-mono text-[120px] font-black text-[#243528]/30 pointer-events-none tracking-tighter leading-none select-none">
          {activeItem.watermark}
        </div>

        {/* Top Spec Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB]/10 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D4AF37] font-bold tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>{activeItem.status}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-wide">
              {activeItem.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-[#E5E7EB] bg-[#243528] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 font-bold">
              {activeItem.price}
            </span>
            <span className="text-[#9CA3AF] bg-[#243528] px-3.5 py-1.5 rounded-full border border-[#E5E7EB]/10">
              FULFILLMENT: <span className="text-white font-bold">PRINTIFY ON-DEMAND</span>
            </span>
            <span className="text-[#D4AF37] bg-[#243528] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 font-bold">
              ● LIVE ON ETSY
            </span>
          </div>
        </div>

        {/* Editorial Split Grid: Dual Visuals + Industrial Spec Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Visuals: Editorial Split (2 Mockups linking to Dedicated Product Page) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Visual 1: Primary Mockup */}
            <Link
              href={`/goods/${encodeURIComponent(activeItem.id)}`}
              className="relative h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-[#E5E7EB]/15 bg-[#152319] group block cursor-pointer hover:border-[#D4AF37]/60 transition-colors"
              title={`Open ${activeItem.name} Product Page`}
            >
              <Image
                src={activeItem.primaryImage}
                alt={`${activeItem.name} - Primary View`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111A13]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-xs text-[#D4AF37] px-3 py-1 rounded-full font-mono text-[10px] font-bold border border-[#D4AF37]/40 flex items-center gap-1">
                <span>VIEW PRODUCT PAGE</span>
                <span>→</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-[#E5E7EB] bg-[#1B291F]/90 backdrop-blur-md p-2.5 rounded-lg border border-[#D4AF37]/30 flex items-center justify-between">
                <span className="text-[#D4AF37] font-bold">{activeItem.visual1Tag}</span>
                <span>{activeItem.visual1Sub}</span>
              </div>
            </Link>

            {/* Visual 2: Secondary Mockup / Lifestyle Silhouette */}
            <Link
              href={`/goods/${encodeURIComponent(activeItem.id)}`}
              className="relative h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-[#E5E7EB]/15 bg-[#152319] group block cursor-pointer hover:border-[#D4AF37]/60 transition-colors"
              title={`Open ${activeItem.name} Product Page`}
            >
              <Image
                src={activeItem.secondaryImage}
                alt={`${activeItem.name} - Secondary View`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111A13]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-xs text-[#D4AF37] px-3 py-1 rounded-full font-mono text-[10px] font-bold border border-[#D4AF37]/40 flex items-center gap-1">
                <span>VIEW PRODUCT PAGE</span>
                <span>→</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-[#E5E7EB] bg-[#1B291F]/90 backdrop-blur-md p-2.5 rounded-lg border border-[#D4AF37]/30 flex items-center justify-between">
                <span className="text-[#D4AF37] font-bold">{activeItem.visual2Tag}</span>
                <span>{activeItem.visual2Sub}</span>
              </div>
            </Link>
          </div>

          {/* Right Column: Industrial Material Spec Sheet */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="font-mono text-xs text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">
                // SPEC SHEET & PRODUCTION ARCHITECTURE
              </span>
              <p className="text-sm text-[#E5E7EB]/80 font-sans leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            {/* Specs Table */}
            <div className="bg-[#243528]/80 rounded-xl border border-[#E5E7EB]/10 p-5 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-2.5 gap-1">
                <span className="text-[#9CA3AF]">BLANK SELECTION:</span>
                <span className="text-[#E5E7EB] font-bold">{activeItem.blankSelection}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-2.5 gap-1">
                <span className="text-[#9CA3AF]">PRINT METHOD:</span>
                <span className="text-[#D4AF37] font-bold">{activeItem.printMethod}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-2.5 gap-1">
                <span className="text-[#9CA3AF]">FIT PROFILE:</span>
                <span className="text-[#E5E7EB] font-bold">{activeItem.fitProfile}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-2.5 gap-1">
                <span className="text-[#9CA3AF]">PRODUCTION MODEL:</span>
                <span className="text-emerald-400 font-bold">{activeItem.productionModel}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#9CA3AF]">RETAIL CHECKOUT:</span>
                <span className="text-[#E5E7EB] font-bold">{activeItem.retailCheckout}</span>
              </div>
            </div>

            {/* Direct Action Triggers (Fulfillment Handled on Etsy) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
              <a
                href={activeItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-6 py-3.5 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer text-center flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>[ ACQUIRE ON ETSY ]</span>
                <span>↗</span>
              </a>

              <Link
                href={`/goods/${encodeURIComponent(activeItem.id)}`}
                className="w-full sm:w-auto font-bold text-[#E5E7EB] bg-[#243528] hover:bg-[#243528]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] px-6 py-3.5 rounded-full transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>VIEW PRODUCT PAGE</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* C. Lower Row: 3 Selectable Capsule Product Cards */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between font-mono text-xs text-[#D4AF37] uppercase tracking-wider px-1">
          <span>// SELECT CAPSULE EDITION TO INSPECT ({items.length} RELEASES)</span>
          <span className="text-[#E5E7EB]/50 hidden sm:inline">CLICK ANY EDITION TO LOAD SPECS ABOVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`text-left rounded-2xl p-4 sm:p-5 transition-all cursor-pointer flex items-center gap-4 border group relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#1B291F] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.22)] scale-[1.01]'
                    : 'bg-[#1B291F]/70 border-[#E5E7EB]/10 hover:border-[#D4AF37]/50 hover:bg-[#1B291F]'
                }`}
              >
                {/* Dual Thumbnail Stack Preview */}
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#152319] border border-white/10 shrink-0">
                  <Image
                    src={item.primaryImage}
                    alt={item.shortTitle}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-md overflow-hidden border border-[#D4AF37]/60 shadow-md bg-[#111A13]">
                    <Image
                      src={item.secondaryImage}
                      alt={`${item.shortTitle} alt`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Card Metadata */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#D4AF37] bg-[#243528] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 uppercase">
                      {item.badge}
                    </span>
                    {isSelected && (
                      <span className="font-mono text-[9px] font-extrabold text-[#1B291F] bg-[#D4AF37] px-2 py-0.5 rounded-full uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <h4 className={`font-extrabold text-sm sm:text-base truncate transition-colors ${
                    isSelected ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'
                  }`}>
                    {item.shortTitle}
                  </h4>

                  <p className="text-[11px] text-[#9CA3AF] font-sans line-clamp-2 leading-snug">
                    {item.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between font-mono text-xs">
                    <span className="text-emerald-400 font-bold">{item.price}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-[#D4AF37] font-bold' : 'text-white/40 group-hover:text-white/80'}`}>
                      {isSelected ? '● INSPECTING' : 'SELECT →'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
