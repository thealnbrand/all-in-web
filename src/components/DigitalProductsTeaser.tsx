"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DigitalCatalogItem,
  DEFAULT_DIGITAL_CATALOG,
  normalizeDigitalList,
} from '../lib/catalogData';

interface DigitalProductsTeaserProps {
  onInquire?: (subject: string) => void;
}

export const DigitalProductsTeaser: React.FC<DigitalProductsTeaserProps> = () => {
  const [products, setProducts] = useState<DigitalCatalogItem[]>(DEFAULT_DIGITAL_CATALOG);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(normalizeDigitalList(data.products));
          }
        }
      } catch (err) {
        console.warn('Using static products fallback', err);
      }
    };
    fetchLiveProducts();
  }, []);

  return (
    <section id="products" className="relative py-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto select-none font-sans scroll-mt-24 space-y-12 overflow-hidden rounded-3xl">
      {/* Visible Ambient Background Atmospheric Image */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-3xl">
        <img
          src="/DigitalProducts.jfif"
          alt=""
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#243528]/85 via-transparent to-[#243528]/95" />
      </div>

      {/* A. Section Header: Open Digital Catalog Framing + Direct Gumroad Store Link */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
        <div className="text-left space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-[#E5E7EB]/40 font-mono text-xs tracking-widest uppercase">
              02 // DIGITAL PRODUCTS & RELEASES
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/30" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight">
            An evolving catalog of standalone digital creations, tools, and media.
          </h2>

          <p className="text-sm sm:text-base text-[#E5E7EB]/75 font-sans leading-relaxed pt-1">
            Our digital release lab encompasses anything creative or technical that we build and package—from published books and indie games to 6K wallpaper packs, design assets, and production software utilities. Click any release to open its dedicated page.
          </p>

          {/* Dynamic Category Markers */}
          <div className="pt-2 flex flex-wrap gap-2 font-mono text-[10px] text-[#D4AF37]">
            <span className="bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              [ BOOKS & GUIDES ]
            </span>
            <span className="bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              [ INDIE GAMES ]
            </span>
            <span className="bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              [ 6K WALLPAPERS ]
            </span>
            <span className="bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              [ ASSET PACKS ]
            </span>
            <span className="bg-[#1B291F] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              [ SOFTWARE & UTILITIES ]
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <a
            href="https://ychillguy.gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-6 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <span>[ GO STRAIGHT TO GUMROAD STORE ]</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* B. 2-Column Digital Release Decks (Distinct from Tall Apparel Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch relative z-10">
        {products.map((item, idx) => {
          const productHref = `/products/${encodeURIComponent(item.id)}`;

          return (
            <div
              key={item.id || idx}
              className="bg-[#1B291F] border border-[#E5E7EB]/15 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:shadow-[0_0_35px_rgba(212,175,55,0.14)] transition-all"
            >
              <div>
                {/* 1. Top OS / Release Window Telemetry Bar */}
                <div className="bg-[#142018] border-b border-white/10 px-5 py-3 flex items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                    </div>
                    <span className="text-[#9CA3AF] text-[11px] font-bold shrink-0">
                      REL // {item.number}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[10px] font-extrabold text-[#D4AF37] bg-[#243528] px-2.5 py-0.5 rounded border border-[#D4AF37]/35 uppercase tracking-wider truncate">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                    {item.priceTag}
                  </span>
                </div>

                {/* 2. Horizontal Split Body: Left Screen Viewport + Right Release Dossier */}
                <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Left: Framed Digital Viewport */}
                  <Link
                    href={productHref}
                    className="sm:col-span-5 relative h-44 sm:h-40 w-full rounded-xl overflow-hidden border border-[#E5E7EB]/15 bg-[#0F1712] group-hover:border-[#D4AF37]/50 transition-all block cursor-pointer"
                    title={`Open ${item.name} Release Page`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized={item.image.startsWith('http')}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712]/90 via-transparent to-transparent opacity-75" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[9px] text-[#E5E7EB]/90 bg-black/75 backdrop-blur-xs px-2 py-1 rounded border border-white/10">
                      <span className="text-[#D4AF37] font-bold">PREVIEW</span>
                      <span>INSTANT ACCESS</span>
                    </div>
                  </Link>

                  {/* Right: Release Title, Payoff & Format Spec */}
                  <div className="sm:col-span-7 space-y-2.5 text-left min-w-0">
                    <Link href={productHref} className="block">
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-[#D4AF37] transition-colors cursor-pointer truncate">
                        {item.name}
                      </h3>
                    </Link>

                    {item.tagline && (
                      <p className="text-xs font-mono text-[#D4AF37] line-clamp-1">
                        {item.tagline}
                      </p>
                    )}

                    <p className="text-xs text-[#E5E7EB]/75 leading-relaxed font-sans line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-1 flex flex-wrap items-center gap-2 font-mono text-[10px]">
                      <span className="bg-[#243528]/90 text-[#E5E7EB] px-2.5 py-1 rounded border border-white/10 truncate max-w-full">
                        <span className="text-[#9CA3AF] mr-1">FORMAT:</span>
                        <span className="font-bold text-white">{item.stack}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Bottom Action Dock */}
              <div className="bg-[#152219] border-t border-white/10 px-5 py-3.5 flex items-center justify-between gap-3 font-mono text-xs">
                <Link
                  href={productHref}
                  className="font-bold text-[#E5E7EB]/85 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1.5 cursor-pointer"
                >
                  <span>RELEASE DETAILS</span>
                  <span>→</span>
                </Link>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2.5 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>GET ON GUMROAD</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* C. Dedicated Products Repository Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#1B291F]/70 border border-[#E5E7EB]/10 hover:border-[#D4AF37]/30 transition-colors backdrop-blur-sm relative z-10">
        <div className="text-left">
          <span className="font-mono text-xs text-[#D4AF37] font-bold tracking-wider uppercase block">
            // OPEN DIGITAL CATALOG & MEDIA REPOSITORY
          </span>
          <p className="text-sm text-[#E5E7EB]/80 mt-1 font-sans">
            Browse our complete multidisciplinary catalog of books, games, wallpapers, asset packs, and utilities.
          </p>
        </div>

        <Link
          href="/products"
          className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer shrink-0 text-center flex items-center gap-2"
        >
          <span>[ EXPLORE ALL DIGITAL CREATIONS ]</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};
