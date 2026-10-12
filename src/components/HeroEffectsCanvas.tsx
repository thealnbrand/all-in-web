"use client";

import React, { useEffect, useRef } from 'react';

export const HeroEffectsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const shockwaves: Array<{ x: number; y: number; radius: number; opacity: number }> = [];
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    // Entrance scanline state
    let scanY = 0;
    let scanActive = true;

    // Scroll state tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 120 Vibrant Golden Dust Particles
    const particleCount = 120;
    const colors = ['#D4AF37', '#F3E5AB', '#FFD700', '#E5E7EB'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      color: string;
    }> = [];

    const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
    const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.6 + 0.35,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        color: colors[i % colors.length],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 5,
        opacity: 0.9,
      });
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = Math.abs(currentScroll - lastScrollY);

      if (currentScroll > 30) {
        particles.forEach((p) => {
          p.vy += (Math.random() * 1.5 - 0.75);
        });
      }

      lastScrollY = currentScroll;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frame = 0;
    const render = () => {
      frame++;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      scrollVelocity *= 0.92;

      const w = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const h = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

      ctx.clearRect(0, 0, w, h);

      // Kinetic background grid lines
      const gridScrollShift = (window.scrollY * 0.2) % 40;
      const baseAlpha = 0.05 + Math.min(scrollVelocity * 0.008, 0.12);
      const gridSize = 40;

      ctx.strokeStyle = `rgba(212, 175, 55, ${baseAlpha})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = gridScrollShift; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // FIRST LOAD ENTRANCE LASER SCANLINE SWEEP
      if (scanActive) {
        scanY += 10;
        if (scanY > h + 100) {
          scanActive = false;
        }

        ctx.save();
        const beamGlow = ctx.createLinearGradient(0, scanY - 8, 0, scanY + 8);
        beamGlow.addColorStop(0, 'rgba(212, 175, 55, 0)');
        beamGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.85)');
        beamGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = beamGlow;
        ctx.fillRect(0, scanY - 8, w, 16);

        ctx.fillStyle = '#FFD700';
        for (let x = 0; x < w; x += gridSize) {
          ctx.beginPath();
          ctx.arc(x, scanY, 3, 0, Math.PI * 2);
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 12;
          ctx.fill();
        }
        ctx.restore();
      }

      // Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 5.5;
        sw.opacity -= 0.022;

        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${sw.opacity})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.restore();
      }

      // 120 Vibrant Golden Dust Particles Rendering
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repelling force
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 170) {
          const force = (1 - dist / 170) * 2.2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        p.alpha += Math.sin(frame * p.pulseSpeed) * 0.008;
        const currentAlpha = Math.max(0.2, Math.min(0.95, p.alpha));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
        ctx.restore();

        // Connecting lines between particles
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
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Mouse Spotlight Glow Effect
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        mouseGlow.addColorStop(0, 'rgba(212, 175, 55, 0.28)');
        mouseGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none z-15"
    />
  );
};
