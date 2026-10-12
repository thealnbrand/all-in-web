"use client";

import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'systems', label: '01', title: 'SYSTEMS' },
  { id: 'products', label: '02', title: 'PRODUCTS' },
  { id: 'apparel', label: '03', title: 'GOODS' },
  { id: 'philosophy', label: '04', title: 'PHILOSOPHY' },
  { id: 'contact', label: '05', title: 'INQUIRY' },
];

export const FloatingNavDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('systems');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [recentChangeTitle, setRecentChangeTitle] = useState<string | null>(null);

  const prevActiveRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling past the top hero
      setIsVisible(scrollY > 400);

      const sectionElements = SECTIONS.map((sec) => ({
        id: sec.id,
        title: sec.title,
        label: sec.label,
        el: document.getElementById(sec.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, title, label, el } = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            if (prevActiveRef.current !== id) {
              prevActiveRef.current = id;
              setActiveSection(id);

              // Flash the section name momentarily when it changes so it doesn't hide page content
              setRecentChangeTitle(`${label} // ${title}`);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => {
                setRecentChangeTitle(null);
              }, 2200);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string, label: string, title: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      prevActiveRef.current = id;

      // Show the name briefly on click transition
      setRecentChangeTitle(`${label} // ${title}`);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRecentChangeTitle(null);
      }, 2200);
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Section Quick Navigation"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Floating Section Name Badge (Only appears briefly on section change to prevent hiding content) */}
      {recentChangeTitle && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 mr-2 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-right-2">
          <div className="bg-[#152319]/95 text-[#D4AF37] font-mono text-[11px] font-black px-3 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-2xl backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span>{recentChangeTitle}</span>
          </div>
        </div>
      )}

      {/* Ultra-Slim Dock Showing ONLY Numbers */}
      <div className="bg-[#1B291F]/90 backdrop-blur-md border border-[#D4AF37]/30 p-1.5 rounded-2xl shadow-2xl flex flex-col items-center gap-1.5 font-mono text-[11px] w-9">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div key={sec.id} className="relative flex items-center">
              {/* Tooltip on individual number hover */}
              {isHovered && !recentChangeTitle && (
                <div className="absolute right-full mr-2.5 pointer-events-none z-50">
                  <div className="bg-[#152319]/95 text-[#E5E7EB] font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 shadow-xl backdrop-blur-md whitespace-nowrap flex items-center gap-1">
                    <span className="text-[#D4AF37]">{sec.label} //</span>
                    <span>{sec.title}</span>
                  </div>
                </div>
              )}

              {/* Number-Only Button */}
              <button
                type="button"
                onClick={() => scrollToSection(sec.id, sec.label, sec.title)}
                onMouseEnter={() => setHoveredSection(sec.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer font-bold ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#152319] font-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-110'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/10'
                }`}
                title={`${sec.label} // ${sec.title}`}
              >
                {sec.label}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
