"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContactSection } from '../../components/ContactSection';
import { Footer } from '../../components/Footer';
import { EXTERNAL_LINKS } from '../../lib/externalLinks';
import {
  DigitalCatalogItem,
  DEFAULT_DIGITAL_CATALOG,
  normalizeDigitalList,
} from '../../lib/catalogData';
import {
  CatalogSearchAndCategories,
  CategoryOption,
} from '../../components/CatalogSearchAndCategories';
import { BackgroundWatermark } from '../../components/BackgroundWatermark';
import { NavigationHeader } from '../../components/NavigationHeader';

const CORE_CATEGORIES = [
  'ALL',
  'UTILITY',
  'ASSET PACK',
  'SOFTWARE',
] as const;

export default function ProductsPage() {
  const [inquirySubject] = useState<string>('COMMISSION: DIGITAL PRODUCTS & MEDIA');
  const [productsList, setProductsList] = useState<DigitalCatalogItem[]>(DEFAULT_DIGITAL_CATALOG);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadDynamicProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProductsList(normalizeDigitalList(data.products));
          }
        }
      } catch (err) {
        console.warn('Using static digital products fallback', err);
      }
    };

    loadDynamicProducts();
  }, []);

  // Build stable category options: always keep all core categories visible + any custom DB badges
  const categoryOptions: CategoryOption[] = useMemo(() => {
    const base: string[] = [...CORE_CATEGORIES];
    productsList.forEach((p) => {
      const upper = (p.badge || '').trim().toUpperCase();
      if (upper && !base.includes(upper)) {
        base.push(upper);
      }
    });

    return base.map((cat) => {
      const count =
        cat === 'ALL'
          ? productsList.length
          : productsList.filter((p) => p.badge.toUpperCase() === cat).length;
      return {
        id: cat,
        label: cat === 'ALL' ? 'ALL RELEASES' : cat,
        count,
      };
    });
  }, [productsList]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toUpperCase();
    return productsList.filter((p) => {
      const matchesCat =
        activeCategory === 'ALL' || p.badge.toUpperCase() === activeCategory.toUpperCase();
      const haystack = `${p.name} ${p.badge} ${p.tagline} ${p.description} ${p.stack} ${p.access}`.toUpperCase();
      const matchesSearch = !q || haystack.includes(q);
      return matchesCat && matchesSearch;
    });
  }, [productsList, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-[#243528] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F] relative">
      <BackgroundWatermark />
      {/* Fixed Navigation Header */}
      <NavigationHeader activeRoute="products" actionLabel="[ INITIATE INQUIRY ]" actionHref="#contact" />

      {/* Main Container */}
      <main className="pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto space-y-16">
        {/* Breadcrumb & Hero Statement */}
        <div className="space-y-4 border-b border-[#E5E7EB]/10 pb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
            <Link href="/" className="hover:underline text-[#E5E7EB]/60">HOME</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">INDEX // 02 // DIGITAL PRODUCTS</span>
            <span>/</span>
            <span className="text-[#E5E7EB]/40">RELEASE LAB</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#E5E7EB]/40 tracking-widest block uppercase">
                ALL IN RELEASE LAB // OPEN DIGITAL CATALOG
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                DIGITAL CREATIONS & MEDIA
              </h1>
              <p className="text-sm sm:text-base text-[#E5E7EB]/70 max-w-2xl font-sans leading-relaxed">
                An open, multidisciplinary catalog of standalone creations packaged by our studio: published books, indie games, 6K wallpapers, vector assets, and software tools. Click any release to open its dedicated product page.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={EXTERNAL_LINKS.GUMROAD.STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-6 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <span>[ GO STRAIGHT TO GUMROAD STORE ]</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Search Bar on Top + Scrollable Category Track Underneath */}
          <CatalogSearchAndCategories
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search digital books, games, 6K wallpapers, vector assets, tools..."
            categories={categoryOptions}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            totalMatching={filteredProducts.length}
          />
        </div>

        {/* 2-Column Digital Release Decks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[#D4AF37] border-b border-[#E5E7EB]/10 pb-3 uppercase tracking-wider">
            <span>
              CATALOG // {activeCategory} ({String(filteredProducts.length).padStart(2, '0')} RELEASES)
            </span>
            <span>INSTANT GUMROAD FULFILLMENT</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#1B291F] border border-white/10 rounded-2xl p-12 text-center space-y-3">
              <p className="font-mono text-sm text-[#D4AF37] font-bold">
                {searchQuery
                  ? `NO DIGITAL RELEASES MATCH "${searchQuery.toUpperCase()}"`
                  : `NO RELEASES PUBLISHED IN [${activeCategory}] YET`}
              </p>
              <p className="text-xs text-[#9CA3AF]">
                {searchQuery
                  ? 'Try clearing your search or switching back to ALL categories.'
                  : 'New digital creations in this category can be added anytime from the Command Center.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                [ SHOW ALL DIGITAL RELEASES ]
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {filteredProducts.map((prod) => {
                const productHref = `/products/${encodeURIComponent(prod.id)}`;

                return (
                  <div
                    key={prod.id}
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
                            REL // {prod.number}
                          </span>
                          <span className="text-white/20">|</span>
                          <span className="text-[10px] font-extrabold text-[#D4AF37] bg-[#243528] px-2.5 py-0.5 rounded border border-[#D4AF37]/35 uppercase tracking-wider truncate">
                            {prod.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="hidden sm:inline-block font-mono text-[10px] text-[#9CA3AF] uppercase">
                            {prod.status}
                          </span>
                          <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/30">
                            {prod.priceTag}
                          </span>
                        </div>
                      </div>

                      {/* 2. Horizontal Split Body: Left Screen Viewport + Right Release Dossier */}
                      <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                        {/* Left: Framed Digital Viewport */}
                        <Link
                          href={productHref}
                          className="sm:col-span-5 relative h-48 sm:h-44 w-full rounded-xl overflow-hidden border border-[#E5E7EB]/15 bg-[#0F1712] group-hover:border-[#D4AF37]/50 transition-all block cursor-pointer"
                          title={`Open ${prod.name} Release Page`}
                        >
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            unoptimized={prod.image.startsWith('http')}
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 256px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712]/90 via-transparent to-transparent opacity-75" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[9px] text-[#E5E7EB]/90 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
                            <span className="text-[#D4AF37] font-bold">OPEN PAGE →</span>
                            <span>INSTANT DL</span>
                          </div>
                        </Link>

                        {/* Right: Release Title, Payoff & Format Spec */}
                        <div className="sm:col-span-7 space-y-2.5 text-left min-w-0">
                          <Link href={productHref} className="block">
                            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-[#D4AF37] transition-colors cursor-pointer">
                              {prod.name}
                            </h2>
                          </Link>

                          {prod.tagline && (
                            <p className="text-xs font-mono text-[#D4AF37] line-clamp-1">
                              {prod.tagline}
                            </p>
                          )}

                          <p className="text-xs text-[#E5E7EB]/75 leading-relaxed font-sans line-clamp-2">
                            {prod.description}
                          </p>

                          <div className="pt-1 space-y-1.5 font-mono text-[10px]">
                            <div className="bg-[#243528]/90 px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between gap-2">
                              <span className="text-[#9CA3AF] shrink-0">FORMAT:</span>
                              <span className="text-white font-bold truncate">{prod.stack}</span>
                            </div>
                            <div className="bg-[#243528]/90 px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between gap-2">
                              <span className="text-[#9CA3AF] shrink-0">ACCESS:</span>
                              <span className="text-emerald-400 font-bold truncate">{prod.access}</span>
                            </div>
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
                        <span>VIEW PRODUCT PAGE</span>
                        <span>→</span>
                      </Link>

                      <a
                        href={prod.url}
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
          )}

          {/* Outbound Store Footer Banner */}
          <div className="pt-4 text-xs font-mono text-[#9CA3AF] flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E7EB]/10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>DIGITAL ASSETS, MEDIA & TOOL LICENSES FULFILLED SECURELY VIA GUMROAD</span>
            </span>
            <a
              href={EXTERNAL_LINKS.GUMROAD.STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline font-bold"
            >
              VISIT FULL GUMROAD STORE (CHILL GUY) ↗
            </a>
          </div>
        </div>

        {/* Contact & Inquiries */}
        <section id="contact" className="pt-12">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
