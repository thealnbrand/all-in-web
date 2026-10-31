"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';

export interface CategoryOption {
  id: string;
  label: string;
  count?: number;
}

interface CatalogSearchAndCategoriesProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchPlaceholder: string;
  categories: CategoryOption[];
  activeCategory: string;
  onCategoryChange: (catId: string) => void;
  totalMatching: number;
}

export const CatalogSearchAndCategories: React.FC<CatalogSearchAndCategoriesProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  categories,
  activeCategory,
  onCategoryChange,
  totalMatching,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Repeat categories 3x so the track is always scrollable and loops seamlessly
  const repeatedCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    return [
      ...categories.map((c) => ({ ...c, _LoopKey: `set0-${c.id}` })),
      ...categories.map((c) => ({ ...c, _LoopKey: `set1-${c.id}` })),
      ...categories.map((c) => ({ ...c, _LoopKey: `set2-${c.id}` })),
    ];
  }, [categories]);

  // Continuous smooth auto-scroll that pauses when hovered or touched
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let accumulated = el.scrollLeft;

    const step = () => {
      if (!isPaused && el) {
        accumulated += 0.55; // Smooth glide speed
        const singleSetWidth = el.scrollWidth / 3;

        if (singleSetWidth > 0 && accumulated >= singleSetWidth) {
          accumulated -= singleSetWidth;
        }
        el.scrollLeft = accumulated;
      } else if (el) {
        // Keep accumulated synced with any manual scroll while paused
        accumulated = el.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, repeatedCategories]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    const offset = direction === 'left' ? -240 : 240;

    let target = el.scrollLeft + offset;
    if (target < 0 && singleSetWidth > 0) {
      target += singleSetWidth;
    } else if (singleSetWidth > 0 && target >= singleSetWidth * 2) {
      target -= singleSetWidth;
    }

    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  // Allow mouse wheel to scroll horizontally when hovering the category track
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="pt-4 space-y-3.5">
      {/* ROW 1: Full-Width Search Bar */}
      <div className="relative w-full font-mono text-xs">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] pointer-events-none text-sm">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-[#111A2E] text-white placeholder-[#9CA3AF]/60 pl-11 pr-36 py-3.5 rounded-2xl border border-white/15 focus:border-[#8B0000] focus:outline-none transition-all shadow-inner text-xs sm:text-sm"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-white bg-[#8B0000] hover:bg-[#A30000] px-2.5 py-1 rounded-lg cursor-pointer font-extrabold text-[10px] transition-colors"
              title="Clear search"
            >
              CLEAR ✕
            </button>
          )}
          <span className="hidden sm:inline-block bg-[#0A0F1D] text-[#8B0000] px-2.5 py-1 rounded-lg border border-[#8B0000]/30 font-bold text-[10px]">
            {String(totalMatching).padStart(2, '0')} ITEMS
          </span>
        </div>
      </div>

      {/* ROW 2: Auto-Moving & Scrollable Category Track (Stops on Hover / Touch) */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative flex items-center gap-2 bg-[#16231A]/95 border border-white/10 hover:border-[#8B0000]/40 rounded-2xl p-2 transition-colors"
      >
        {/* Left Manual Scroll Button */}
        <button
          type="button"
          onClick={() => scrollByAmount('left')}
          aria-label="Scroll categories left"
          className="shrink-0 w-8 h-8 rounded-xl font-mono text-sm font-black flex items-center justify-center border bg-[#111A2E] text-white border-[#8B0000]/40 hover:bg-[#8B0000] hover:text-white cursor-pointer shadow-md transition-all z-10"
        >
          ‹
        </button>

        {/* Horizontal Auto-Gliding + Manually Scrollable Strip */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex-1 flex items-center gap-2.5 overflow-x-auto py-0.5 px-1 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {repeatedCategories.map((cat) => {
            const isActive = activeCategory.toUpperCase() === cat.id.toUpperCase();
            return (
              <button
                key={cat._LoopKey}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-xl border font-mono text-xs transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-[0_0_15px_rgba(139,0,0,0.3)]'
                    : 'bg-[#111A2E] text-[#E5E7EB]/80 border-white/10 hover:border-[#8B0000] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                {typeof cat.count === 'number' && cat.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-black/30 text-white font-extrabold'
                        : 'text-red-400'
                    }`}
                  >
                    {String(cat.count).padStart(2, '0')}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Manual Scroll Button */}
        <button
          type="button"
          onClick={() => scrollByAmount('right')}
          aria-label="Scroll categories right"
          className="shrink-0 w-8 h-8 rounded-xl font-mono text-sm font-black flex items-center justify-center border bg-[#111A2E] text-white border-[#8B0000]/40 hover:bg-[#8B0000] hover:text-white cursor-pointer shadow-md transition-all z-10"
        >
          ›
        </button>
      </div>
    </div>
  );
};
