"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const CHANNELS = [
  {
    id: 'clothes',
    tag: '01 // CLOTHES',
    name: 'Clothes & Tactical Goods',
    desc: 'Archival streetwear drops, heavyweight blanks, and limited capsule alerts.',
  },
  {
    id: 'digital_products',
    tag: '02 // DIGITAL PRODUCTS',
    name: 'Digital Products & Kits',
    desc: 'UI/UX frameworks, full web templates, vector assets, and engineering manuals.',
  },
  {
    id: 'systems',
    tag: '03 // SYSTEMS',
    name: 'Systems & Software',
    desc: 'Turnkey codebases, full-stack SaaS builds, and production platform sales.',
  },
] as const;

export const PhilosophySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['clothes', 'digital_products', 'systems']);
  const [confirmedChannels, setConfirmedChannels] = useState<string[]>([]);

  const toggleChannel = (id: string) => {
    if (status !== 'idle') setStatus('idle');
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatus('error');
      setErrorMessage('INVALID_EMAIL_FORMAT // SPECIFY VALID TRANSMISSION ADDRESS');
      return;
    }

    if (selectedChannels.length === 0) {
      setStatus('error');
      setErrorMessage('CHANNEL_REQUIRED // PLEASE SELECT AT LEAST ONE DISPATCH CHANNEL (CLOTHES, DIGITAL PRODUCTS, OR SYSTEMS)');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          interests: selectedChannels,
          source: 'landing_philosophy',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'SUBSCRIPTION_REJECTED');
      }

      setConfirmedChannels([...selectedChannels]);
      setStatus('success');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'TRANSMISSION_ERROR';
      setErrorMessage(msg.toUpperCase());
    }
  };

  return (
    <section
      id="philosophy"
      className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto select-none font-sans scroll-mt-24 space-y-16"
    >
      {/* A. Section Header */}
      <div className="text-left space-y-4 max-w-4xl border-b border-[#E5E7EB]/10 pb-8">
        <div className="flex items-center gap-3">
          <span className="text-[#8B0000] font-mono text-xs tracking-widest uppercase font-bold">
            04 // ABOUT &amp; PHILOSOPHY
          </span>
          <span className="h-px w-16 bg-[#8B0000]/40" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E5E7EB] tracking-tight leading-tight pt-1">
          Standing at the strait between computational logic and tactile permanence.
        </h2>

        <p className="text-sm sm:text-base text-[#E5E7EB]/75 font-sans leading-relaxed max-w-3xl">
          Tangier sits where the Atlantic meets the Mediterranean, and Africa meets Europe. ALL IN embraces that same borderland identity by refusing the false boundary between software engineering and physical craft.
        </p>
      </div>

      {/* B. Brutalist Two-Column Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Studio Origins / Operational Lab Overview */}
        <div className="lg:col-span-6 bg-[#111A2E] border border-[#E5E7EB]/15 hover:border-[#8B0000]/40 rounded-sm p-8 sm:p-10 relative shadow-2xl transition-all flex flex-col justify-between group">
          {/* Brutalist Corner Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#8B0000]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#8B0000]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#8B0000]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#8B0000]" />

          <div className="space-y-6">
            <div className="border-b border-[#E5E7EB]/10 pb-4">
              <span className="font-mono text-xs text-[#8B0000] font-bold tracking-widest uppercase">
                [ ORIGINS // OPERATIONAL LAB ]
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-tight">
                An Independent Lab Forged at the Continental Crossroads.
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/80 leading-relaxed font-sans">
                Founded in Tangier, Morocco — a historic crossroads of maritime trade, cultural collision, and international territory — ALL IN operates as a self-reliant laboratory outside conventional tech epicenters, free from venture contagion and corporate homogenization.
              </p>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/70 leading-relaxed font-sans">
                We are structured not as an agency, but as an applied craft laboratory. Our work spans three interdependent vectors: high-frequency distributed systems, autonomous digital tools, and physical graphic streetwear editions.
              </p>
            </div>

            {/* Brutalist Lab Telemetry Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="bg-[#0A0F1D]/80 border border-[#E5E7EB]/10 p-3.5 space-y-1">
                <span className="text-[#8B0000] font-bold block text-[11px] uppercase tracking-wider">
                  DISCIPLINES
                </span>
                <span className="text-[#E5E7EB] text-xs">
                  Software &bull; Digital Tools &bull; Apparel
                </span>
              </div>
              <div className="bg-[#0A0F1D]/80 border border-[#E5E7EB]/10 p-3.5 space-y-1">
                <span className="text-[#8B0000] font-bold block text-[11px] uppercase tracking-wider">
                  PRODUCTION MODEL
                </span>
                <span className="text-[#E5E7EB] text-xs">
                  Zero Middlemen &bull; 100% In-House
                </span>
              </div>
              <div className="bg-[#0A0F1D]/80 border border-[#E5E7EB]/10 p-3.5 space-y-1">
                <span className="text-[#8B0000] font-bold block text-[11px] uppercase tracking-wider">
                  SYSTEM ARCHITECTURE
                </span>
                <span className="text-[#E5E7EB] text-xs">
                  Sub-second Edge Latency
                </span>
              </div>
              <div className="bg-[#0A0F1D]/80 border border-[#E5E7EB]/10 p-3.5 space-y-1">
                <span className="text-[#8B0000] font-bold block text-[11px] uppercase tracking-wider">
                  TACTILE STANDARD
                </span>
                <span className="text-[#E5E7EB] text-xs">
                  Curated Heavyweight DTG
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E5E7EB]/10 font-mono text-xs text-[#9CA3AF] flex items-center justify-between">
            <span className="text-[#8B0000] font-bold">// TANGIER HQ LAB</span>
            <span>AUTONOMOUS EXECUTION</span>
          </div>
        </div>

        {/* Right Column: Core Philosophy & Execution Ethos (Sharp Dark Red Borders) */}
        <div className="lg:col-span-6 bg-[#111A2E] border-2 border-[#8B0000] rounded-sm p-8 sm:p-10 relative shadow-[0_0_35px_rgba(139,0,0,0.18)] hover:shadow-[0_0_45px_rgba(139,0,0,0.28)] transition-all flex flex-col justify-between group">
          {/* Brutalist Corner Brackets in Bright Crimson */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white/60" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white/60" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white/60" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white/60" />

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#8B0000]/40 pb-4">
              <span className="font-mono text-xs text-[#8B0000] font-bold tracking-widest uppercase">
                [ CORE PHILOSOPHY // EXECUTION ETHOS ]
              </span>
              <span className="font-mono text-[11px] text-emerald-400">
                ACTIVE DOCTRINE
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-tight">
              &ldquo;We don&apos;t outsource the hard parts. We ship the entire machine.&rdquo;
            </h3>

            {/* Three Core Ethos Statements */}
            <div className="space-y-4 pt-2">
              {/* Ethos 01 */}
              <div className="border-l-2 border-[#8B0000] pl-4 py-1 space-y-1 bg-[#0A0F1D]/40 p-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#8B0000] font-bold">01 //</span>
                  <h4 className="text-sm font-bold text-[#E5E7EB] tracking-wide">
                    ARCHITECTURAL DISCIPLINE
                  </h4>
                </div>
                <p className="text-xs text-[#E5E7EB]/75 font-sans leading-relaxed">
                  Software is digital civil engineering. We build resilient, low-latency architectures with zero algorithmic bloat and sub-second execution. No rented fragility, no unnecessary abstractions.
                </p>
              </div>

              {/* Ethos 02 */}
              <div className="border-l-2 border-[#8B0000] pl-4 py-1 space-y-1 bg-[#0A0F1D]/40 p-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#8B0000] font-bold">02 //</span>
                  <h4 className="text-sm font-bold text-[#E5E7EB] tracking-wide">
                    TACTILE PERMANENCE
                  </h4>
                </div>
                <p className="text-xs text-[#E5E7EB]/75 font-sans leading-relaxed">
                  Physicality validates digital theory. Studio uniforms and technical typography on curated heavyweight streetwear blanks with zero inventory waste. Direct-to-garment archival permanence.
                </p>
              </div>

              {/* Ethos 03 */}
              <div className="border-l-2 border-[#8B0000] pl-4 py-1 space-y-1 bg-[#0A0F1D]/40 p-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#8B0000] font-bold">03 //</span>
                  <h4 className="text-sm font-bold text-[#E5E7EB] tracking-wide">
                    THE UNIFIED STANDARD
                  </h4>
                </div>
                <p className="text-xs text-[#E5E7EB]/75 font-sans leading-relaxed">
                  The same engineering rigor that powers distributed backends dictates our vector typography and graphic production. Everything is measured against real-world production utility.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#8B0000]/40 flex items-center justify-between">
            <span className="font-mono text-xs text-[#9CA3AF]">
              ALL IN STUDIO [ ALN ]
            </span>
            <Link
              href="/philosophy"
              className="font-mono text-xs font-bold text-[#8B0000] hover:text-[#EF4444] transition-colors flex items-center gap-1.5"
            >
              <span>[ READ FULL MANIFESTO ]</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* C. Terminal-Style Newsletter Sign-Up Block */}
      <div className="bg-[#0D1527] border border-[#8B0000]/60 rounded-sm overflow-hidden shadow-2xl relative">
        {/* Terminal Header Bar */}
        <div className="bg-[#0A0F1D] border-b border-[#8B0000]/40 px-5 py-3 flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B0000]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B0000]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B0000]/25" />
            <span className="ml-2 text-[#E5E7EB] font-bold tracking-wider">
              ALL_IN_DISPATCH // TERMINAL v2.4.0
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CHANNEL: SECURE_SUBSCRIBE // 256-BIT</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-2 font-mono">
            <div className="text-xs text-[#8B0000] font-semibold flex items-center gap-1.5 flex-wrap">
              <span>$ ./subscribe.sh</span>
              <span className="text-[#E5E7EB]">
                --channels={selectedChannels.length === 3 ? 'all' : selectedChannels.length === 0 ? 'none' : selectedChannels.join(',')}
              </span>
              <span className="text-[#9CA3AF] opacity-60">--frequency=bi-weekly</span>
            </div>
            <div className="text-sm sm:text-base text-[#E5E7EB] font-sans font-medium">
              Join the studio network for bi-weekly engineering dispatches, open-source lab releases, and archival capsule drop alerts.
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-5">
            {/* Interactive Channel Selection Deck */}
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-[11px] text-[#9CA3AF]">
                <span>// CHOOSE YOUR DISPATCH STREAMS (CLICK TO TOGGLE):</span>
                <span className="text-[#8B0000] font-bold">
                  [{selectedChannels.length}/3 ACTIVE]
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CHANNELS.map((ch) => {
                  const isSelected = selectedChannels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => toggleChannel(ch.id)}
                      className={`text-left p-3.5 rounded-sm border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-[#111A2E] border-[#8B0000] shadow-[0_0_20px_rgba(139,0,0,0.35)] text-[#E5E7EB]'
                          : 'bg-[#0A0F1D]/80 border-white/10 text-[#9CA3AF] hover:border-white/30 hover:text-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className={`font-bold font-mono text-[11px] ${isSelected ? 'text-[#8B0000]' : 'text-[#9CA3AF]'}`}>
                          {ch.tag}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-[#8B0000] text-white shadow-sm'
                              : 'bg-white/5 text-[#9CA3AF] border border-white/10'
                          }`}
                        >
                          {isSelected ? '✓ ACTIVE' : '+ SELECT'}
                        </span>
                      </div>
                      <div className="font-sans font-bold text-xs sm:text-sm text-white mb-1">
                        {ch.name}
                      </div>
                      <div className="font-sans text-[11px] text-[#9CA3AF] leading-tight line-clamp-2">
                        {ch.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terminal Input with prompt prefix + Subscribe Button */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-1">
              <div className="flex-1 flex items-center bg-[#0A0F1D] border border-[#8B0000]/40 focus-within:border-[#8B0000] px-4 py-3 transition-colors">
                <span className="font-mono text-xs text-[#8B0000] mr-3 select-none font-bold">
                  usr@aln:~$
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="architect@domain.com"
                  disabled={status === 'loading'}
                  className="bg-transparent border-none text-[#E5E7EB] placeholder-[#9CA3AF]/40 text-xs sm:text-sm font-mono w-full focus:outline-none focus:ring-0"
                />
              </div>

              {/* Sharp Brutalist Subscribe Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-mono font-bold text-xs sm:text-sm text-white bg-[#8B0000] hover:bg-[#A30000] px-8 py-3.5 border border-[#8B0000] rounded-none transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,0,0,0.4)] cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 active:scale-95"
              >
                <span>
                  {status === 'loading' ? '[ TRANSMITTING... ]' : '[ SUBSCRIBE ]'}
                </span>
                {status !== 'loading' && <span>→</span>}
              </button>
            </div>

            {/* Terminal Status Feedback Messages */}
            {status === 'success' && (
              <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-none animate-fade-in space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <span>✓ TRANSMISSION CONFIRMED // YOU ARE SUBSCRIBED TO:</span>
                </div>
                <div className="text-[11px] text-emerald-300 flex flex-wrap gap-2 pt-0.5">
                  {confirmedChannels.map((c) => (
                    <span key={c} className="bg-emerald-900/60 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                      [{c === 'clothes' ? '01 // CLOTHES' : c === 'digital_products' ? '02 // DIGITAL PRODUCTS' : '03 // SYSTEMS'}]
                    </span>
                  ))}
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="font-mono text-xs text-[#EF4444] bg-red-950/40 border border-[#8B0000] p-3 rounded-none animate-fade-in flex items-center gap-2">
                <span className="font-bold">✕</span>
                <span>{errorMessage}</span>
              </div>
            )}
          </form>

          <div className="pt-2 border-t border-[#E5E7EB]/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#9CA3AF]">
            <span>// NO SPAM. NO THIRD-PARTY TRACKERS. UNSUBSCRIBE ANYTIME.</span>
            <span className="text-[#8B0000]">DISPATCHED DIRECTLY FROM TANGIER HQ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
