"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  const triggerOpenSite = React.useCallback(() => {
    setStep(4);
    setTimeout(() => {
      setIsFinished(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 800);
  }, []);

  useEffect(() => {
    // Stage 1: Big phrase "ALL LINES. ALL IDEAS. NOW." (0ms - 1200ms)
    // Stage 2: "ALL IN" (1200ms - 2200ms)
    // Stage 3: Official Logo image /logo.png (2200ms - 3200ms)
    // Stage 4: Open site (3200ms)

    const timer1 = setTimeout(() => {
      setStep(2);
    }, 1200);

    const timer2 = setTimeout(() => {
      setStep(3);
    }, 2200);

    const timer3 = setTimeout(() => {
      setStep(4);
    }, 3200);

    const timer4 = setTimeout(() => {
      setIsFinished(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 4000);

    // Keyboard interaction to skip preloader:
    // Only active while preloader is currently visible and never intercepts form inputs.
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        triggerOpenSite();
        window.removeEventListener('keydown', handleKeyDown);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerOpenSite]);

  if (isFinished) return null;

  return (
    <div
      onClick={triggerOpenSite}
      className={`fixed inset-0 z-[100] bg-[#0D150F] flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out cursor-pointer ${
        step === 4 ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Gold Glow behind Center Content */}
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Center Content Sequence Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-[90vw]">
        {/* STAGE 1: Big Phrase */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            step === 1
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-6 absolute pointer-events-none'
          }`}
        >
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-snug">
            <span className="text-[#E5E7EB]">ALL LINES.</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_35px_rgba(212,175,55,0.6)]">
              ALL IDEAS.
            </span> <br />
            <span className="text-[#E5E7EB]">NOW.</span>
          </h2>
        </div>

        {/* STAGE 2: ALL IN */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            step === 2
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-6 absolute pointer-events-none'
          }`}
        >
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_45px_rgba(212,175,55,0.65)] uppercase">
            ALL IN
          </h1>
        </div>

        {/* STAGE 3: Official [ ALN ] Logo */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            step === 3
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-6 absolute pointer-events-none'
          }`}
        >
          <div className="relative w-[280px] sm:w-[420px] md:w-[560px] lg:w-[660px] aspect-[3/1] max-w-[85vw] filter drop-shadow-[0_0_55px_rgba(212,175,55,0.7)]">
            <Image
              src="/logo.png"
              alt="ALL IN Studio Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
