"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ContactSection } from '../../../components/ContactSection';
import { Footer } from '../../../components/Footer';
import { EXTERNAL_LINKS } from '../../../lib/externalLinks';
import {
  DEFAULT_GOODS_CATALOG,
  GoodsCatalogItem,
  normalizeGoodsList,
} from '../../../lib/catalogData';

export default function SingleGoodsProductPage() {
  const params = useParams<{ id: string }>();
  const rawId = decodeURIComponent(params?.id || '');

  const [goodsList, setGoodsList] = useState<GoodsCatalogItem[]>(DEFAULT_GOODS_CATALOG);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

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

  // Reset active photo index when switching product
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [rawId]);

  const product = useMemo(() => {
    const byId = goodsList.find(
      (item) => String(item.id).toLowerCase() === rawId.toLowerCase()
    );
    if (byId) return byId;

    const byIndex = Number(rawId);
    if (!Number.isNaN(byIndex) && byIndex >= 1 && byIndex <= goodsList.length) {
      return goodsList[byIndex - 1];
    }

    const byDefaultSlug = DEFAULT_GOODS_CATALOG.findIndex(
      (d) => d.id.toLowerCase() === rawId.toLowerCase()
    );
    if (byDefaultSlug !== -1 && goodsList[byDefaultSlug]) {
      return goodsList[byDefaultSlug];
    }

    return goodsList[0] || DEFAULT_GOODS_CATALOG[0];
  }, [goodsList, rawId]);

  const photos = useMemo(() => {
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    return Array.from(
      new Set([product.image, product.secondary_image].filter(Boolean) as string[])
    );
  }, [product]);

  const otherGoods = useMemo(
    () => goodsList.filter((item) => item.id !== product.id),
    [goodsList, product.id]
  );

  const [inquirySubject, setInquirySubject] = useState<string>(`INQUIRY: ${product.name}`);

  useEffect(() => {
    setInquirySubject(`INQUIRY: ${product.name}`);
  }, [product.name]);

  return (
    <div className="min-h-screen w-full bg-[#243528] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F]">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between h-[88px] bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-xl">
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
          <Link href="/philosophy" className="text-[#E5E7EB]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span className="text-[#D4AF37]">04 //</span> PHILOSOPHY
          </Link>
        </nav>

        <Link
          href="#contact"
          className="font-mono text-xs font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-2 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer"
        >
          [ INITIATE ]
        </Link>
      </header>

      <main className="pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto space-y-16">
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB]/10 pb-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
            <Link href="/" className="hover:underline text-[#E5E7EB]/60">HOME</Link>
            <span>/</span>
            <Link href="/goods" className="hover:underline text-[#E5E7EB]/60">03 // TACTILE GOODS</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">{product.badge}</span>
          </div>

          <Link
            href="/goods"
            className="font-mono text-xs font-bold text-[#E5E7EB] hover:text-[#D4AF37] bg-[#1B291F] px-4 py-2 rounded-full border border-white/10 hover:border-[#D4AF37] transition-all inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>BACK TO ALL GOODS</span>
          </Link>
        </div>

        {/* Dedicated Full Product Dossier (Multi-Photo Gallery + Full Specs) */}
        <div className="bg-[#1B291F] border-2 border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl">
          {/* Dossier Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-10 py-4 bg-[#152319] border-b border-white/10">
            <div className="flex items-center gap-2.5 font-mono text-xs text-[#D4AF37]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-bold uppercase">{product.badge}</span>
              <span className="text-white/20">|</span>
              <span className="text-white/70">{product.status}</span>
            </div>

            <div className="font-mono text-xs text-emerald-400 font-bold">
              ● PRINTIFY ON-DEMAND · ETSY WORLDWIDE DISPATCH
            </div>
          </div>

          {/* Main Split Grid: Left Multi-Photo Viewer | Right Full Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10">
            {/* Left Column: High-Res Photo Viewer + Thumbnail Switcher */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-[400px] sm:h-[520px] w-full rounded-2xl overflow-hidden bg-[#111A13] border border-[#D4AF37]/30">
                <Image
                  src={photos[activePhotoIndex] || product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] bg-black/80 backdrop-blur-xs text-[#E5E7EB] px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="text-[#D4AF37] font-bold">
                    PHOTO 0{activePhotoIndex + 1} / 0{photos.length}
                  </span>
                  <span>CLICK THUMBNAILS BELOW TO SWITCH VIEW</span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {photos.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {photos.map((photoUrl, pIdx) => {
                    const isCurrent = activePhotoIndex === pIdx;
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setActivePhotoIndex(pIdx)}
                        className={`relative h-28 sm:h-32 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-[1.02]'
                            : 'border-white/15 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={photoUrl}
                          alt={`${product.name} view ${pIdx + 1}`}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] bg-black/80 text-[#D4AF37] px-2 py-0.5 rounded font-bold">
                          VIEW 0{pIdx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Complete Garment Information & Checkout */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 text-left">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                      // FULL GARMENT DOSSIER
                    </span>
                    <span className="font-mono text-lg font-extrabold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30">
                      {product.price_tag}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {product.name}
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-[#E5E7EB]/85 font-sans leading-relaxed">
                  {product.description}
                </p>

                {/* Full Specification Table */}
                <div className="bg-[#243528]/90 rounded-2xl border border-[#E5E7EB]/10 p-6 space-y-3.5 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-3 gap-1">
                    <span className="text-[#9CA3AF]">BLANK FABRICATION:</span>
                    <span className="text-white font-bold">{product.materials}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-3 gap-1">
                    <span className="text-[#9CA3AF]">PRINT EXECUTION:</span>
                    <span className="text-[#D4AF37] font-bold">High-Resolution Direct-to-Garment (DTG)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-3 gap-1">
                    <span className="text-[#9CA3AF]">SILHOUETTE & FIT:</span>
                    <span className="text-white font-bold">Structured Streetwear / Relaxed Fit</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB]/10 pb-3 gap-1">
                    <span className="text-[#9CA3AF]">WASH & CARE:</span>
                    <span className="text-white">Cold Wash Inside-Out · Hang Dry</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[#9CA3AF]">FULFILLMENT:</span>
                    <span className="text-emerald-400 font-bold">Printify On-Demand · Etsy Checkout</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
                <a
                  href={product.url || EXTERNAL_LINKS.ETSY.CAPSULE_001_FLEECE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full font-extrabold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] py-3.5 px-6 rounded-full transition-all shadow-xl hover:scale-[1.01] cursor-pointer text-center flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <span>[ BUY ON ETSY ]</span>
                  <span>↗</span>
                </a>

                <a
                  href="#contact"
                  className="w-full font-bold text-[#E5E7EB] bg-[#243528] hover:bg-[#243528]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] py-3.5 px-6 rounded-full transition-all cursor-pointer text-center block"
                >
                  ASK A QUESTION ABOUT THIS PIECE ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* More Pieces From the Capsule */}
        {otherGoods.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#D4AF37] border-b border-[#E5E7EB]/10 pb-3 uppercase tracking-wider">
              <span>// OTHER PIECES IN THE CAPSULE</span>
              <Link href="/goods" className="hover:underline">VIEW ALL GOODS →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherGoods.map((item) => {
                const shortTitle = item.name.replace(/^CAPSULE_\d+\s*\/\/\s*/i, '');
                return (
                  <Link
                    key={item.id}
                    href={`/goods/${encodeURIComponent(item.id)}`}
                    className="bg-[#1B291F] border border-[#E5E7EB]/10 hover:border-[#D4AF37]/60 rounded-2xl p-5 flex items-center gap-5 group transition-all shadow-xl"
                  >
                    <div className="relative w-28 h-32 rounded-xl overflow-hidden bg-[#111A13] border border-white/10 shrink-0">
                      <Image
                        src={item.image}
                        alt={shortTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-[#D4AF37] bg-[#243528] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 uppercase">
                        {item.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                        {shortTitle}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] line-clamp-2">
                        {item.description}
                      </p>
                      <div className="pt-1 flex items-center justify-between font-mono text-xs">
                        <span className="text-emerald-400 font-bold">{item.price_tag}</span>
                        <span className="text-[#D4AF37] font-bold">OPEN PAGE →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contact" className="pt-8">
          <ContactSection initialSubject={inquirySubject} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
