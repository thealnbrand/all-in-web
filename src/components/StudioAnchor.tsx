"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export const StudioAnchor: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedbackMessage('ERR_SYNTAX: Valid email address required.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('SYS_HANDSHAKE: Registering dispatch node...');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFeedbackMessage(`> 200 OK: Node ${email} registered. Welcome to ALL IN Dispatches.`);
        setEmail('');
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'ERR_REJECTED: Registration failed.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('NET_TIMEOUT: Server unreachable. Retry in a moment.');
    }
  };

  return (
    <section id="about" className="w-full bg-[#0A0F1D] border-t border-[#8B0000]/25 text-[#E5E7EB] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 font-sans space-y-16">
        
        {/* Section Top Header Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/20 pb-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[#8B0000] font-bold tracking-widest uppercase">
              // STUDIO MANIFESTO
            </span>
            <span className="h-px w-12 bg-[#8B0000]/40" />
            <span className="text-[#E5E7EB]/50 uppercase tracking-wider">
              SECTION 00 // TANGIER OPERATIONAL LAB
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#9CA3AF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] animate-pulse" />
            <span className="text-[#8B0000] font-bold">STATUS:</span>
            <span className="text-[#E5E7EB]/80">ACTIVE LAB & PRODUCTION LINE</span>
          </div>
        </div>

        {/* 1. Layout Structure: Two-Column Brutalist Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Studio Origins / Manifesto ("Tangier Operational Lab") */}
          <div className="border border-[#8B0000]/30 bg-[#111A2E]/70 backdrop-blur-sm flex flex-col justify-between transition-all hover:border-[#8B0000]/60 shadow-xl group">
            {/* Dark Red Structural Header Panel */}
            <div className="bg-[#8B0000]/15 border-b border-[#8B0000]/30 px-6 sm:px-8 py-3.5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#8B0000] font-extrabold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8B0000]" />
                ORIGINS // TANGIER OPERATIONAL LAB
              </span>
              <span className="text-[#E5E7EB]/40 font-mono text-[11px]">
                LOC: TNG_STRAIT
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight uppercase font-sans">
                  Multidisciplinary Engineering from the Strait.
                </h3>
                <p className="text-sm sm:text-base text-[#E5E7EB]/80 leading-relaxed font-sans">
                  ALL IN was founded as an independent operational lab in Tangier, Morocco—positioned where the Atlantic meets the Mediterranean and Africa interfaces with Europe. We reject the false boundary separating computational infrastructure from physical craft.
                </p>
                <p className="text-xs sm:text-sm text-[#E5E7EB]/65 leading-relaxed font-sans">
                  From custom high-throughput software architectures and open digital toolchains to heavyweight graphic streetwear blanks engineered for permanence, every artifact is designed, coded, and produced under one singular standard.
                </p>
              </div>

              {/* Core Disciplines Telemetry Deck */}
              <div className="pt-6 border-t border-[#8B0000]/20 space-y-2.5 font-mono text-xs">
                <div className="text-[#8B0000] font-bold tracking-wider text-[11px] uppercase">
                  // CORE DISCIPLINES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-[#0A0F1D] border border-[#8B0000]/25 p-3 text-left">
                    <span className="text-[#8B0000] font-bold block text-[10px]">01 // SYSTEMS</span>
                    <span className="text-[#E5E7EB] font-bold text-xs mt-0.5 block">Distributed Web</span>
                  </div>
                  <div className="bg-[#0A0F1D] border border-[#8B0000]/25 p-3 text-left">
                    <span className="text-[#8B0000] font-bold block text-[10px]">02 // PRODUCTS</span>
                    <span className="text-[#E5E7EB] font-bold text-xs mt-0.5 block">Digital Utilities</span>
                  </div>
                  <div className="bg-[#0A0F1D] border border-[#8B0000]/25 p-3 text-left">
                    <span className="text-[#8B0000] font-bold block text-[10px]">03 // GOODS</span>
                    <span className="text-[#E5E7EB] font-bold text-xs mt-0.5 block">Tactile Apparel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Core Philosophy ("Execution, Not Explanation") */}
          <div className="border border-[#8B0000]/30 bg-[#111A2E]/70 backdrop-blur-sm flex flex-col justify-between transition-all hover:border-[#8B0000]/60 shadow-xl group">
            {/* Dark Red Structural Header Panel */}
            <div className="bg-[#8B0000]/15 border-b border-[#8B0000]/30 px-6 sm:px-8 py-3.5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#8B0000] font-extrabold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8B0000]" />
                CORE DOCTRINE // EXECUTION, NOT EXPLANATION
              </span>
              <span className="text-[#E5E7EB]/40 font-mono text-[11px]">
                CODE: ENX_01
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight uppercase font-sans">
                  We don&apos;t outsource the hard parts. We ship the machine.
                </h3>
                <p className="text-sm sm:text-base text-[#E5E7EB]/80 leading-relaxed font-sans">
                  The world has enough agencies selling abstract slide decks and endless discovery sprints. We operate on compiled truth. If it doesn&apos;t compile, ship, or hold tactile weight in the physical world, it does not exist.
                </p>
                <p className="text-xs sm:text-sm text-[#E5E7EB]/65 leading-relaxed font-sans">
                  Software is digital civil engineering: built with brutalist restraint, sub-second latency, zero algorithmic bloat, and resilient longevity.
                </p>
              </div>

              {/* Execution Principles Checklist */}
              <div className="pt-6 border-t border-[#8B0000]/20 space-y-2.5 font-mono text-xs">
                <div className="text-[#8B0000] font-bold tracking-wider text-[11px] uppercase">
                  // EXECUTION PRINCIPLES
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-start gap-3 bg-[#0A0F1D] border border-[#8B0000]/25 p-2.5">
                    <span className="text-[#8B0000] font-bold">[ 01 ]</span>
                    <span className="text-[#E5E7EB] text-xs">
                      <strong className="text-white">Zero Middlemen:</strong> Direct engineering access from founder to production pipeline.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-[#0A0F1D] border border-[#8B0000]/25 p-2.5">
                    <span className="text-[#8B0000] font-bold">[ 02 ]</span>
                    <span className="text-[#E5E7EB] text-xs">
                      <strong className="text-white">Compiled Integrity:</strong> Sub-second latency, deterministic builds, and rigorous reliability.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-[#0A0F1D] border border-[#8B0000]/25 p-2.5">
                    <span className="text-[#8B0000] font-bold">[ 03 ]</span>
                    <span className="text-[#E5E7EB] text-xs">
                      <strong className="text-white">Tactile Permanence:</strong> Code and physical textiles engineered for generational durability.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Newsletter / Subscribing Component: Terminal-Style Command Prompt Block */}
        <div className="border border-[#8B0000]/40 bg-[#0A0F1D] shadow-2xl relative overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="bg-[#111A2E] border-b border-[#8B0000]/30 px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#8B0000]" />
              <span className="w-2.5 h-2.5 bg-[#8B0000]/40" />
              <span className="w-2.5 h-2.5 bg-[#8B0000]/20" />
              <span className="text-[#E5E7EB] font-bold ml-2 tracking-widest uppercase">
                PHILOSOPHY // DISPATCH
              </span>
            </div>

            <div className="text-[11px] text-[#9CA3AF] flex items-center gap-3">
              <span className="text-[#8B0000] font-bold">DAEMON:</span>
              <span>SUBSCRIBE_TO_DISPATCH.EXE</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-[#E5E7EB]/50">PROTOCOL: RAW_TEXT</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs text-[#8B0000] font-bold tracking-wider uppercase flex items-center gap-2">
                <span>&gt; INITIATING BROADCAST SUBSCRIPTION PROTOCOL</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-extrabold text-[#E5E7EB] tracking-tight uppercase font-sans">
                Subscribe to our long-form engineering essays, studio dispatches, and archival releases.
              </h4>
              <p className="font-mono text-xs sm:text-sm text-[#E5E7EB]/65 max-w-3xl leading-relaxed">
                Zero spam. No promotional marketing funnels. Only occasional technical architectural breakdowns, manufacturing field notes from Tangier, and private release keys.
              </p>
            </div>

            {/* Command-Line Prompt Form */}
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch gap-0 border border-[#8B0000]/50 bg-[#111A2E]/90 focus-within:border-[#8B0000] transition-colors">
                {/* Terminal Prompt Prefix */}
                <div className="font-mono text-xs sm:text-sm text-[#8B0000] font-bold px-4 py-3.5 bg-[#0D1527] border-b sm:border-b-0 sm:border-r border-[#8B0000]/30 flex items-center gap-2 select-none shrink-0">
                  <span>aln@tangier:~$</span>
                  <span className="text-[#E5E7EB]/40 font-normal">./subscribe --email</span>
                </div>

                {/* Minimalist Input Field */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent text-[#E5E7EB] font-mono text-xs sm:text-sm px-4 py-3.5 focus:outline-none placeholder:text-[#E5E7EB]/30 disabled:opacity-50"
                  aria-label="Dispatch Email Address"
                />

                {/* Sharp Dark Red Accent Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="font-mono text-xs font-extrabold text-white bg-[#8B0000] hover:bg-[#A30000] active:bg-[#6B0000] px-8 py-3.5 transition-all tracking-widest uppercase shrink-0 border-t sm:border-t-0 sm:border-l border-[#8B0000] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>[ CONNECTING... ]</span>
                    </>
                  ) : (
                    <span>[ SUBSCRIBE ]</span>
                  )}
                </button>
              </div>

              {/* Terminal Feedback Output Display */}
              {feedbackMessage && (
                <div
                  className={`font-mono text-xs p-3 border transition-all ${
                    status === 'error'
                      ? 'bg-red-950/40 border-red-800/60 text-red-400'
                      : status === 'success'
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                      : 'bg-[#111A2E] border-[#8B0000]/30 text-[#E5E7EB]/70'
                  }`}
                >
                  <span className="font-bold mr-2">&gt;</span>
                  {feedbackMessage}
                </div>
              )}
            </form>

            {/* Terminal Footer Telemetry */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#E5E7EB]/40 border-t border-[#8B0000]/20">
              <div className="flex items-center gap-2">
                <span>ENCRYPTION: TLS_1.3_STABLE</span>
                <span>•</span>
                <span>UNSUBSCRIBE: ONE_CLICK_HEADER</span>
              </div>
              <div>
                <Link
                  href="/philosophy"
                  className="text-[#8B0000] hover:underline uppercase font-bold tracking-wider"
                >
                  [ BROWSE FULL PHILOSOPHY ARCHIVE → ]
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
