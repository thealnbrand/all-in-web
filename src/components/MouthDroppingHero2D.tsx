"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LetterParticle {
  char: string;
  line: 1 | 2;
  relX: number;
  relY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  color: string;
  font: string;
}

interface ProductItem {
  id: number;
  src: string;
  alt: string;
  tabLabel: string;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  techTags: string[];
  status: string;
}

interface MouthDroppingHero2DProps {
  onInquire?: (subject: string) => void;
}

export const MouthDroppingHero2D: React.FC<MouthDroppingHero2DProps> = ({ onInquire }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [fps, setFps] = useState<number>(60);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [hudGridVisible, setHudGridVisible] = useState<boolean>(true);

  // Shockwaves & Physics state
  const shockwavesRef = useRef<Array<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }>>([]);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const logoImageRef = useRef<HTMLImageElement | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Letter dispersion physics state
  const lettersRef = useRef<LetterParticle[]>([]);
  const dispersionStateRef = useRef<'assembled' | 'dispersing' | 'assembling'>('assembled');
  const phaseTimerRef = useRef<number>(0);

  // Product Stage Catalog
  const products: ProductItem[] = [
    {
      id: 0,
      src: '/Engineering.webp',
      alt: 'Systems Infrastructure',
      tabLabel: '01 // SYSTEMS',
      badge: '[ 01 // SYSTEMS ]',
      category: 'ENGINEERING & ARCHITECTURE',
      title: 'RUST CORE & DISTRIBUTED ENGINE',
      subtitle: 'High-throughput microservices, WebGL shaders & ultra-low latency API layer.',
      techTags: ['React 19', 'Next.js 16', 'Rust Engine', 'WebGL Shaders'],
      status: 'OPERATIONAL · v2.4',
    },
    {
      id: 1,
      src: '/iPhone 16 Pro, Glossy.jpeg',
      alt: 'ALN Mobile SaaS Suite',
      tabLabel: '02 // PRODUCTS',
      badge: '[ 02 // PRODUCTS ]',
      category: 'DIGITAL RELEASE LAB & MEDIA',
      title: 'OPEN DIGITAL CREATIONS CATALOG',
      subtitle: 'Published books, indie games, 6K wallpapers, asset packs & production software.',
      techTags: ['Books & Guides', 'Indie Games', '6K Wallpapers', 'Gumroad Store'],
      status: 'AVAILABLE NOW',
    },
    {
      id: 2,
      src: '/t-shirt (1).png',
      alt: 'Tangier Heavyweight Garments',
      tabLabel: '03 // GOODS',
      badge: '[ 03 // GOODS ]',
      category: 'PHYSICAL APPAREL & GOODS',
      title: 'CURATED HEAVYWEIGHT STREETWEAR',
      subtitle: 'Archival graphic editions with architectural typography and Tangier coordinate stamps.',
      techTags: ['Heavyweight Blanks', 'DTG Archival Print', 'Printify On-Demand', 'Etsy Checkout'],
      status: 'LIVE ON ETSY',
    },
    {
      id: 3,
      src: '/Lifestyle, Black.jpeg',
      alt: 'Industrial Studio Lookbook',
      tabLabel: '04 // LOOKBOOK',
      badge: '[ 04 // LOOKBOOK ]',
      category: 'STUDIO LOOKBOOK & HARDWARE',
      title: 'TANGIER INDUSTRIAL LOOKBOOK',
      subtitle: 'Visual identity showcase blending physical apparel with hardware design.',
      techTags: ['Studio Identity', 'Hardware Drop', 'Lookbook 2026', 'Tangier Lab'],
      status: 'CURATED LOOKBOOK',
    },
    {
      id: 4,
      src: '/iPhone 15.jpeg',
      alt: 'Sensor & Mobile Utilities',
      tabLabel: '05 // HARDWARE',
      badge: '[ 05 // HARDWARE ]',
      category: 'HARDWARE & MOBILE SENSORS',
      title: 'TITANIUM SENSOR & CORE HUD',
      subtitle: 'Direct hardware telemetry integrations for modern digital platforms.',
      techTags: ['Titanium Case', 'Telemetry HUD', 'Sensor API', 'Zero Lag'],
      status: 'HARDWARE READY',
    },
    {
      id: 5,
      src: '/iPhone 13.jpeg',
      alt: 'Legacy Platform Architecture',
      tabLabel: '06 // ARCHITECTURE',
      badge: '[ 06 // ARCHITECTURE ]',
      category: 'CLOUD PLATFORM & INFRA',
      title: 'LEGACY CLOUD ARCHITECTURE',
      subtitle: 'Scalable backend infrastructure engineered for enterprise workloads.',
      techTags: ['Cloud Infra', 'Docker Native', 'PostgreSQL', 'GRPC'],
      status: 'SYSTEM ONLINE',
    },
  ];

  useEffect(() => {
    // Preload logo.png
    const img = new window.Image();
    img.src = '/logo.png';
    img.onload = () => {
      logoImageRef.current = img;
    };

    // Auto product carousel orbit (every 4.2 seconds when not hovered)
    const orbitInterval = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveSlot((prev) => (prev + 1) % products.length);
      }
    }, 4200);

    return () => {
      clearInterval(orbitInterval);
    };
  }, [products.length]);

  // Initialize Letter Particles
  const initLetters = (centerX: number, centerY: number) => {
    const letters: LetterParticle[] = [];

    // Line 1: "ALL IN"
    const line1Text = "ALL IN";
    const line1Font = '900 38px "Space Grotesk", sans-serif';
    const line1Y = 70;
    const line1Width = 170;
    const line1CharSpacing = line1Width / (line1Text.length - 1);

    for (let i = 0; i < line1Text.length; i++) {
      const char = line1Text[i];
      if (char === ' ') continue;
      const relX = -line1Width / 2 + i * line1CharSpacing;
      letters.push({
        char,
        line: 1,
        relX,
        relY: line1Y,
        x: centerX + relX,
        y: centerY + line1Y,
        vx: 0,
        vy: 0,
        angle: 0,
        vAngle: 0,
        color: '#D4AF37',
        font: line1Font,
      });
    }

    // Line 2: "ALL LINES. ALL IDEAS. NOW."
    const line2Text = "ALL LINES. ALL IDEAS. NOW.";
    const line2Font = '700 15px "JetBrains Mono", monospace';
    const line2Y = 110;
    const line2Width = 310;
    const line2CharSpacing = line2Width / (line2Text.length - 1);

    for (let i = 0; i < line2Text.length; i++) {
      const char = line2Text[i];
      if (char === ' ') continue;
      const relX = -line2Width / 2 + i * line2CharSpacing;
      letters.push({
        char,
        line: 2,
        relX,
        relY: line2Y,
        x: centerX + relX,
        y: centerY + line2Y,
        vx: 0,
        vy: 0,
        angle: 0,
        vAngle: 0,
        color: '#E5E7EB',
        font: line2Font,
      });
    }

    lettersRef.current = letters;
  };

  // Trigger Letter Dispersion Explosion
  const triggerDispersion = () => {
    if (dispersionStateRef.current !== 'assembled') return;
    dispersionStateRef.current = 'dispersing';
    phaseTimerRef.current = performance.now();

    lettersRef.current.forEach((lp) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 2.5;
      lp.vx = Math.cos(angle) * speed;
      lp.vy = Math.sin(angle) * speed;
      lp.vAngle = (Math.random() - 0.5) * 0.25;
    });
  };

  // Trigger Letter Re-assembly
  const triggerReassemble = () => {
    dispersionStateRef.current = 'assembling';
    phaseTimerRef.current = performance.now();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
      const cX = rect.width >= 1024 ? rect.width * 0.26 : rect.width / 2;
      const cY = rect.width >= 1024 ? 175 : 130;
      initLetters(cX, cY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle System
    const particleCount = 170;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
    const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2.4 + 0.7,
        color: i % 4 === 0 ? '#D4AF37' : i % 3 === 0 ? '#E5E7EB' : '#9CA3AF',
        alpha: Math.random() * 0.65 + 0.25,
      });
    }

    // Render loop
    const render = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const currentWidth = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const currentHeight = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      // Radial Vignette
      const gradient = ctx.createRadialGradient(
        currentWidth / 2,
        currentHeight / 2,
        30,
        currentWidth / 2,
        currentHeight / 2,
        Math.max(currentWidth, currentHeight) / 1.1
      );
      gradient.addColorStop(0, 'rgba(27, 41, 31, 0.2)');
      gradient.addColorStop(0.7, 'rgba(27, 41, 31, 0.45)');
      gradient.addColorStop(1, 'rgba(21, 33, 24, 0.75)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      // Grid lines
      if (hudGridVisible) {
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.06)';
        ctx.lineWidth = 1;
        const gridSize = 36;

        for (let x = 0; x < currentWidth; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, currentHeight);
          ctx.stroke();
        }
        for (let y = 0; y < currentHeight; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(currentWidth, y);
          ctx.stroke();
        }
      }

      // Shockwaves
      shockwavesRef.current.forEach((wave, index) => {
        wave.radius += 4.8;
        wave.opacity -= 0.022;

        if (wave.opacity <= 0) {
          shockwavesRef.current.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${wave.opacity})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      });

      // Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > currentWidth) p.vx *= -1;
        if (p.y < 0 || p.y > currentHeight) p.vy *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 190) {
          const force = (1 - dist / 190) * 2.4;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        if (p.color === '#D4AF37') {
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.restore();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 90) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Center position
      const isDesktop = currentWidth >= 1024;
      const centerX = isDesktop ? currentWidth * 0.26 : currentWidth / 2;
      const centerY = isDesktop ? 175 : 130;

      ctx.save();
      const offsetX = (mouseRef.current.x - centerX) * 0.04;
      const offsetY = (mouseRef.current.y - centerY) * 0.04;

      // Vertical beam
      const beamGlow = ctx.createLinearGradient(centerX + offsetX, 0, centerX + offsetX, currentHeight);
      beamGlow.addColorStop(0, 'rgba(212, 175, 55, 0)');
      beamGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
      beamGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = beamGlow;
      ctx.fillRect(centerX + offsetX - 75, 0, 150, currentHeight);

      // Gold Halo Ring
      const ringGlow = Math.sin(now * 0.003) * 12 + 145;
      ctx.beginPath();
      ctx.arc(centerX + offsetX, centerY + offsetY - 18, ringGlow, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 16;
      ctx.stroke();

      // Render Gold Logo
      if (logoImageRef.current) {
        const logo = logoImageRef.current;
        const logoWidth = 280;
        const logoHeight = (logo.height / logo.width) * logoWidth;

        ctx.save();
        ctx.shadowColor = 'rgba(212, 175, 55, 0.65)';
        ctx.shadowBlur = 28;
        ctx.drawImage(
          logo,
          centerX + offsetX - logoWidth / 2,
          centerY + offsetY - logoHeight / 2 - 25,
          logoWidth,
          logoHeight
        );
        ctx.restore();
      }

      // Physics animation for letters
      const state = dispersionStateRef.current;
      const elapsed = now - phaseTimerRef.current;

      if (state === 'dispersing') {
        if (elapsed > 1800) {
          dispersionStateRef.current = 'assembling';
        }
      } else if (state === 'assembling') {
        let allAssembled = true;
        lettersRef.current.forEach((lp) => {
          const targetX = centerX + offsetX + lp.relX;
          const targetY = centerY + offsetY + lp.relY;
          const dist = Math.sqrt((lp.x - targetX) ** 2 + (lp.y - targetY) ** 2);
          if (dist > 1) allAssembled = false;
        });

        if (allAssembled || elapsed > 3500) {
          dispersionStateRef.current = 'assembled';
        }
      }

      lettersRef.current.forEach((lp) => {
        const targetX = centerX + offsetX + lp.relX;
        const targetY = centerY + offsetY + lp.relY;

        if (dispersionStateRef.current === 'dispersing') {
          lp.x += lp.vx;
          lp.y += lp.vy;
          lp.angle += lp.vAngle;
          lp.vx *= 0.98;
          lp.vy *= 0.98;
        } else if (dispersionStateRef.current === 'assembling') {
          lp.x += (targetX - lp.x) * 0.1;
          lp.y += (targetY - lp.y) * 0.1;
          lp.angle += (0 - lp.angle) * 0.1;
        } else {
          lp.x = targetX;
          lp.y = targetY;
          lp.angle = 0;
        }

        ctx.save();
        ctx.translate(lp.x, lp.y);
        ctx.rotate(lp.angle);

        ctx.font = lp.font;
        ctx.fillStyle = lp.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (lp.color === '#D4AF37') {
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 10;
        }

        ctx.fillText(lp.char, 0, 0);
        ctx.restore();
      });

      ctx.restore();

      // Mouse Spotlight
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        ctx.save();
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          110
        );
        mouseGlow.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
        mouseGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 110, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 60 && lastScrollY <= 60) {
        triggerDispersion();
      } else if (currentScrollY <= 20 && lastScrollY > 20) {
        dispersionStateRef.current = 'assembling';
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hudGridVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    setMousePos({ x: Math.round(x), y: Math.round(y) });
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = stageRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setTilt({ rx, ry });
  };

  const handleStageMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    shockwavesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 220,
      opacity: 0.85,
    });

    triggerDispersion();
  };

  const currentProduct = products[activeSlot];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative w-full min-h-[780px] lg:min-h-[820px] bg-transparent overflow-hidden cursor-crosshair select-none z-10"
    >
      {/* 2D HTML5 Canvas Background Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-auto z-0" />

      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDE: CYBER-INDUSTRIAL HUD BLUEPRINT CONSOLE            */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-[80px] left-4 sm:left-8 lg:left-12 z-20 pointer-events-auto flex flex-col gap-4 max-w-[340px] sm:max-w-[420px]">
        {/* HUD Telemetry Header Status Box */}
        <div className="bg-[#152319]/85 backdrop-blur-md p-3 rounded-xl border border-[#D4AF37]/35 shadow-xl flex flex-col gap-1.5 font-mono text-[10px] text-[#E5E7EB]">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[#D4AF37] font-extrabold">SYS_STATUS: ONLINE</span>
            </div>
            <span className="text-[#9CA3AF]">{fps} FPS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[9px] text-[#9CA3AF]">
            <div>
              <span className="text-[#D4AF37]">LOC:</span> TANGIER [35.7595° N]
            </div>
            <div>
              <span className="text-[#D4AF37]">POS:</span> X:{mousePos.x} Y:{mousePos.y}
            </div>
          </div>
        </div>

        {/* Interactive Physics Control Badges */}
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDispersion();
            }}
            className="bg-[#152319]/90 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#152319] border border-[#D4AF37]/40 px-3 py-1.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>[ 💥 DISPERSE LOGO ]</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerReassemble();
            }}
            className="bg-[#152319]/90 hover:bg-[#E5E7EB] text-[#E5E7EB] hover:text-[#152319] border border-white/20 px-3 py-1.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>[ 🧲 RE-ASSEMBLE ]</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT SIDE: FLOATING HOLOGRAPHIC 3D GLASS PRODUCT STAGE       */}
      {/* ------------------------------------------------------------- */}
      <div
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        className="absolute right-0 lg:right-0 xl:right-0 top-[76px] sm:top-[80px] w-full sm:w-[94%] lg:w-[48%] xl:w-[49%] h-[520px] sm:h-[560px] lg:h-[590px] z-20 pointer-events-auto flex flex-col gap-3 pr-0 sm:pr-4 lg:pr-0"
      >
        {/* Stage Pill Tabs Bar */}
        <div className="flex items-center justify-between gap-1 p-1.5 rounded-l-2xl sm:rounded-2xl bg-[#152319]/90 backdrop-blur-md border-y border-l border-[#D4AF37]/40 border-r-0 sm:border-r shadow-xl mr-0 sm:mr-2 lg:mr-4">
          {products.slice(0, 3).map((prod, idx) => {
            const isActive = activeSlot === idx;
            return (
              <button
                key={prod.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlot(idx);
                  triggerDispersion();
                }}
                className={`flex-1 py-2 px-3 rounded-xl font-mono text-[10px] sm:text-[11px] font-extrabold tracking-wider transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#152319] shadow-lg scale-[1.02]'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#152319]' : 'bg-[#D4AF37]/40'}`} />
                <span>{prod.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Holographic Glass Stage Card Container */}
        <div
          ref={stageRef}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          onClick={(e) => {
            e.stopPropagation();
            setActiveSlot((prev) => (prev + 1) % products.length);
          }}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-full flex-1 rounded-l-3xl rounded-r-none border-y border-l border-[#D4AF37]/60 border-r-0 shadow-2xl shadow-emerald-950/95 bg-[#152319] group cursor-pointer overflow-hidden"
        >
          {products.map((prod, idx) => {
            const isActive = activeSlot === idx;
            return (
              <div
                key={prod.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                <Image
                  src={prod.src}
                  alt={prod.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 750px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority={isActive}
                />

                {/* Dark Vignette & Holographic Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#152319] via-[#152319]/40 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

                {/* Top Header Status & Category Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <span className="bg-[#152319]/90 text-[#E5E7EB] backdrop-blur-md px-3 py-1 rounded-full font-mono text-[9px] font-extrabold border border-white/10">
                    {prod.category}
                  </span>
                  <div className="bg-[#152319]/90 text-[#D4AF37] backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] font-extrabold border border-[#D4AF37]/40 shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span>{prod.status}</span>
                  </div>
                </div>

                {/* Bottom Overlay & CTAs */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-[#152319] via-[#152319]/90 to-transparent text-left space-y-2.5 z-20">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-[#D4AF37]">
                    {prod.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#152319]/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#D4AF37]/35 font-extrabold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-white font-extrabold text-lg sm:text-xl tracking-wide drop-shadow-md">
                    {prod.title}
                  </h3>

                  <p className="text-[#E5E7EB]/90 font-sans text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {prod.subtitle}
                  </p>

                  {/* Interactive Action Row on Active Product Card */}
                  <div className="pt-1 flex items-center gap-3">
                    <a
                      href="#showcase"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] sm:text-xs font-bold text-[#152319] bg-[#D4AF37] hover:bg-[#E5C158] px-4 py-2 rounded-full transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>EXPLORE DOMAIN</span>
                      <span>→</span>
                    </a>

                    {onInquire && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInquire(prod.title);
                          const contactElem = document.getElementById('contact');
                          if (contactElem) {
                            contactElem.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="font-mono text-[10px] sm:text-xs font-bold text-[#E5E7EB] bg-[#152319]/80 hover:bg-[#152319] border border-[#D4AF37]/40 px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>INQUIRE THIS SPEC</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Thumbnail Selector Strip (All 6 Products) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 pr-2 sm:pr-4 no-scrollbar">
          {products.map((prod, idx) => {
            const isActive = activeSlot === idx;
            return (
              <button
                key={prod.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlot(idx);
                }}
                className={`relative h-12 w-20 shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105'
                    : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <Image src={prod.src} alt={prod.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-0.5 left-1 font-mono text-[8px] font-bold text-white drop-shadow">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM CENTER HERO ACTION BAR                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-6 left-4 sm:left-8 lg:left-12 z-20 pointer-events-auto flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-xs sm:text-sm font-extrabold text-[#152319] bg-[#D4AF37] hover:bg-[#E5C158] px-6 sm:px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 flex items-center gap-2 group cursor-pointer"
        >
          <span>[ INITIATE PROJECT ]</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>

        <a
          href="#offerings"
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-xs sm:text-sm font-bold text-[#E5E7EB] bg-[#152319]/85 hover:bg-[#152319] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-6 sm:px-8 py-3.5 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          EXPLORE DOMAINS (04)
        </a>
      </div>
    </div>
  );
};
