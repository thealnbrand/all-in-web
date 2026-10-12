"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContactSection } from '../../components/ContactSection';
import { Footer } from '../../components/Footer';
import { EXTERNAL_LINKS } from '../../lib/externalLinks';
import {
  GoodsCatalogItem,
  DEFAULT_GOODS_CATALOG,
  normalizeGoodsList,
} from '../../lib/catalogData';
import {
  CatalogSearchAndCategories,
  CategoryOption,
} from '../../components/CatalogSearchAndCategories';

const FILTER_TABS = [
  { id: 'ALL', label: 'ALL RELEASES' },
  { id: 'FLEECE', label: 'HOODIES & FLEECE' },
  { id: 'TEE', label: 'GRAPHIC TEES' },
  { id: 'HERITAGE', label: 'HERITAGE EDITIONS' },
  { id: 'JACKET', label: 'OUTERWEAR & JACKETS' },
  { id: 'ACCESSORIES', label: 'CAPS & ACCESSORIES' },
] as const;

export default function GoodsPage() {
  const [inquirySubject] = useState<string>('INQUIRY: STUDIO TACTILE GOODS');
  const [goodsList, setGoodsList] = useState<GoodsCatalogItem[]>(DEFAULT_GOODS_CATALOG);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchGoodsData = async () => {
      try {
        const res = await fetch('/api/goods');
        if (res.ok) {
          const data = await res.json();
          if (data.goods && Array.isArray(data.goods) && data.goods.length > 0) {
            setGoodsList(normalizeGoodsList(data.goods));
          }
        }
      } catch (err) {
        console.warn('Using static goods fallback', err);
      }
    };
    fetchGoodsData();
  }, []);

  const goodsCategoryOptions: CategoryOption[] = useMemo(() => {
    const baseTabs: CategoryOption[] = FILTER_TABS.map((t) => {
      const count =
        t.id === 'ALL'
          ? goodsList.length
          : goodsList.filter((item) =>
              `${item.name} ${item.badge} ${item.description}`.toUpperCase().includes(t.id)
            ).length;
      return { id: t.id, label: t.label, count };
    });

    // Also include any custom badges added in the database
    goodsList.forEach((item) => {
      const cleanBadge = (item.badge || '').replace(/^CAPSULE\s*\d+\s*\/\/\s*/i, '').trim().toUpperCase();
      if (
        cleanBadge &&
        !baseTabs.some((b) => b.id.toUpperCase() === cleanBadge || b.label.toUpperCase().includes(cleanBadge))
      ) {
        const count = goodsList.filter((g) => (g.badge || '').toUpperCase().includes(cleanBadge)).length;
        baseTabs.push({ id: cleanBadge, label: cleanBadge, count });
      }
    });

    return baseTabs;
  }, [goodsList]);

  const filteredGoods = useMemo(() => {
    const q = searchQuery.trim().toUpperCase();
    return goodsList.filter((item) => {
      const haystack = `${item.name} ${item.badge} ${item.description} ${item.materials} ${item.price_tag}`.toUpperCase();
      const matchesTab = activeFilter === 'ALL' || haystack.includes(activeFilter);
      const matchesSearch = !q || haystack.includes(q);
      return matchesTab && matchesSearch;
    });
  }, [goodsList, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-[#243528] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F]">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[88px] bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-xl">
        {/* Far Left: Logo Anchor */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="relative h-9 w-24 flex items-center">
            <Image src="/logo.png" alt="[ALN] Logo" width={110} height={70} className="h-full w-auto object-contain" priority />
          </div>
          <span className="font-mono text-base font-extrabold tracking-widest text-[#E5E7EB] hidden xs:flex items-center gap-2">
            <span><span className="text-[#D4AF37]">[</span> ALN <span className="text-[#D4AF37]">]</span></span>
            <span className="text-white/30 font-normal">|</span>
            <span className="text-xs font-bold text-[#E5E7EB]/90 tracking-widest">ALL IN</span>
          </span>
        </Link>

        {/* Center: Route Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] lg:text-xs font-bold tracking-wider">
          <Link href="/systems" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">01 //</span> SYSTEMS
          </Link>
          <Link href="/products" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">02 //</span> PRODUCTS
          </Link>
          <Link href="/goods" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 flex items-center gap-1">
            <span className="text-[#D4AF37]">03 //</span> GOODS
          </Link>
          <Link href="/manifesto" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        {/* Far Right: Initiate CTA */}
        <Link
          href="#contact"
          className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer"
        >
          [ INITIATE ]
        </Link>
      </header>

      {/* Main Container */}
      <main className="pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto space-y-20">
        {/* 1. Breadcrumb & Store Header */}
        <div className="space-y-4 border-b border-[#E5E7EB]/10 pb-10">
          <div className="flex items-center gap-3 font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
            <Link href="/" className="hover:underline text-[#E5E7EB]/60">HOME</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">INDEX // 03 // TACTILE GOODS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#E5E7EB]/40 tracking-widest block uppercase">
                ALL IN APPAREL DIVISION // TANGIER 35.7595° N, 5.8340° W
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                TACTILE GOODS & ARCHIVAL PRINTS
              </h1>
              <p className="text-sm sm:text-base text-[#E5E7EB]/70 max-w-2xl font-sans leading-relaxed">
                Curated heavyweight streetwear blanks printed with our studio&apos;s technical typography, coordinate stamps, and architectural wireframes. Click any piece to open its dedicated product page with full photos and specifications.
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

          {/* Search Bar on Top + Scrollable Category Track Underneath */}
          <CatalogSearchAndCategories
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search hoodies, graphic tees, heavyweight cotton, capsules..."
            categories={goodsCategoryOptions}
            activeCategory={activeFilter}
            onCategoryChange={setActiveFilter}
            totalMatching={filteredGoods.length}
          />
        </div>

        {/* 2. Store Catalog Grid (All Products Visible Side-by-Side with Front/Back Hover + Dedicated Page Link) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[#D4AF37] border-b border-[#E5E7EB]/10 pb-3 uppercase tracking-wider">
            <span>APPAREL CATALOG ({String(filteredGoods.length).padStart(2, '0')} RELEASES)</span>
            <span>PRINTIFY ON-DEMAND · ETSY WORLDWIDE CHECKOUT</span>
          </div>

          {filteredGoods.length === 0 ? (
            <div className="bg-[#1B291F] border border-white/10 rounded-2xl p-12 text-center space-y-3">
              <p className="font-mono text-sm text-[#D4AF37] font-bold">
                NO APPAREL PIECES MATCH &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-[#9CA3AF]">
                Try clearing your search or switching the category filter back to ALL RELEASES.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('ALL');
                }}
                className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                [ RESET FILTERS ]
              </button>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGoods.map((item, idx) => {
              const secImg = item.secondary_image || DEFAULT_GOODS_CATALOG[idx]?.secondary_image || item.image;
              const shortTitle = item.name.replace(/^CAPSULE_\d+\s*\/\/\s*/i, '');
              const photoCount = item.gallery ? item.gallery.length : 2;
              const productHref = `/goods/${encodeURIComponent(item.id)}`;

              return (
                <div
                  key={item.id || idx}
                  className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all hover:shadow-[0_0_35px_rgba(212,175,55,0.15)]"
                >
                  <div>
                    {/* Front-to-Back Hover Image Container (Links to Dedicated Product Page) */}
                    <Link
                      href={productHref}
                      className="relative h-[380px] sm:h-[420px] w-full overflow-hidden bg-[#111A13] cursor-pointer border-b border-white/10 block"
                    >
                      {/* Primary Image */}
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                        priority={idx === 0}
                      />
                      {/* Secondary Image (Revealed on Hover) */}
                      <Image
                        src={secImg}
                        alt={`${item.name} - Alternate View`}
                        fill
                        className="object-cover object-center opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#111A13]/90 via-transparent to-transparent opacity-75" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#D4AF37] bg-[#1B291F]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/40 uppercase">
                          {item.badge}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-emerald-400 bg-[#1B291F]/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
                          {item.price_tag}
                        </span>
                      </div>

                      {/* Bottom Overlay: Photo Counter & Page Trigger */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px]">
                        <span className="bg-black/80 text-white/90 px-2.5 py-1 rounded-md border border-white/10">
                          📷 {photoCount} PHOTOS
                        </span>
                        <span className="bg-[#D4AF37] text-[#1B291F] font-extrabold px-3 py-1 rounded-md shadow-md group-hover:scale-105 transition-transform">
                          [ OPEN PRODUCT PAGE → ]
                        </span>
                      </div>
                    </Link>

                    {/* Product Card Body */}
                    <div className="p-6 space-y-3 text-left">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#D4AF37]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="uppercase tracking-wider">{item.status}</span>
                      </div>

                      <Link href={productHref} className="block">
                        <h2 className="text-lg sm:text-xl font-black text-white tracking-wide group-hover:text-[#D4AF37] transition-colors cursor-pointer">
                          {shortTitle}
                        </h2>
                      </Link>

                      <p className="text-xs text-[#E5E7EB]/75 font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-1">
                        <div className="bg-[#243528]/90 px-3 py-2 rounded-xl border border-[#E5E7EB]/10 font-mono text-[11px] flex items-center justify-between">
                          <span className="text-[#9CA3AF]">BLANK SPEC:</span>
                          <span className="text-white font-bold truncate ml-2">{item.materials}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="px-6 pb-6 pt-2 flex items-center gap-2.5 font-mono text-xs">
                    <Link
                      href={productHref}
                      className="flex-1 font-bold text-[#E5E7EB] bg-[#243528] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 hover:border-[#D4AF37] py-3 px-4 rounded-xl transition-all cursor-pointer text-center"
                    >
                      VIEW PRODUCT →
                    </Link>

                    <a
                      href={item.url || EXTERNAL_LINKS.ETSY.CAPSULE_001_FLEECE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] py-3 px-4 rounded-xl transition-all shadow-lg hover:scale-[1.02] cursor-pointer text-center flex items-center justify-center gap-1"
                    >
                      <span>BUY ON ETSY</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>

        {/* 3. Garment Care, Print Lab & Etsy Fulfillment Guide */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-[#D4AF37] border-b border-[#E5E7EB]/10 pb-3 uppercase tracking-wider">
            // GARMENT CARE, PRODUCTION & ETSY DISPATCH STANDARDS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1B291F]/90 border border-white/10 rounded-2xl p-6 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">01 // BLANK & PRINT QUALITY</span>
              <h3 className="text-base font-bold text-white">Curated Heavyweight Blanks</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                We source structured streetwear blanks (Lane Seven, Shaka Wear, Comfort Colors) selected for fabric weight, collar retention, and relaxed drape, paired with high-resolution DTG archival prints.
              </p>
            </div>

            <div className="bg-[#1B291F]/90 border border-white/10 rounded-2xl p-6 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">02 // GARMENT WASH & CARE</span>
              <h3 className="text-base font-bold text-white">Preserving Archival DTG Prints</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Turn garment inside-out before washing. Machine wash cold on a gentle cycle with mild detergent. Hang dry or tumble dry low. Do not iron directly over the graphic print.
              </p>
            </div>

            <div className="bg-[#1B291F]/90 border border-white/10 rounded-2xl p-6 space-y-2.5">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">03 // ETSY CHECKOUT & SHIPPING</span>
              <h3 className="text-base font-bold text-white">Worldwide Tracked Fulfillment</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Every piece is produced on-demand via Printify to eliminate inventory waste and retailed through our official Etsy shop with full buyer protection and global tracking.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Contact & Custom Merch Inquiries */}
        <section id="contact" className="pt-8">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
