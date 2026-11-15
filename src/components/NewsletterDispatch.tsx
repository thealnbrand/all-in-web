"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface NewsletterDispatchProps {
  id?: string;
  className?: string;
}

export const NewsletterDispatch: React.FC<NewsletterDispatchProps> = ({
  id = 'newsletter',
  className = '',
}) => {
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
    <div id={id} className={`border border-[#8B0000]/40 bg-[#0A0F1D] shadow-2xl relative overflow-hidden scroll-mt-28 ${className}`}>
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
  );
};
