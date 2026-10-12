"use client";

import React, { useState, useEffect } from 'react';
import { STUDIO_METADATA } from '../data/studioData';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    category: 'software',
    budgetScope: 'Standard ($10k - $25k)',
    subject: initialSubject || 'Software & Engineering Inquiry',
    message: '',
  });

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [honeypot, setHoneypot] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_METADATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('PLEASE COMPLETE ALL REQUIRED FIELDS (NAME, EMAIL, MESSAGE)');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('PLEASE PROVIDE A VALID EMAIL ADDRESS');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          honeypot,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to dispatch inquiry to studio database.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'TRANSMISSION FAILED. PLEASE TRY AGAIN OR EMAIL US DIRECTLY.';
      setErrorMessage(errText.toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#243528] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#9CA3AF]/20">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-mono text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
                DIRECT DISPATCH CHANNEL // CLIENT INQUIRIES
              </span>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-[#1B291F] px-3 py-1 rounded-full border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVG. RESPONSE: &lt; 4 HOURS · SLOTS: 2 AVAILABLE</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E5E7EB] tracking-tight">
              Initiate Inquiry
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#9CA3AF] max-w-md font-sans">
            Reach our Tangier studio team directly for software architecture projects, digital utilities, or physical capsule orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Email & Studio Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#1B291F] border border-[#E5E7EB]/15 hover:border-[#D4AF37]/40 rounded-xl p-8 shadow-xl relative transition-all">
              <div className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-4">
                DIRECT EMAIL & CHANNELS
              </div>

              <div className="text-xl sm:text-2xl font-bold text-[#E5E7EB] font-mono mb-2 break-all">
                {STUDIO_METADATA.email}
              </div>

              <p className="text-xs sm:text-sm text-[#9CA3AF] mb-6 font-sans leading-relaxed">
                Connect directly with our engineering team in Tangier via verified email or instant WhatsApp dispatch.
              </p>

              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="font-bold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-5 py-3 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{copiedEmail ? '✓ COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                </button>

                <a
                  href={`mailto:${STUDIO_METADATA.email}?subject=${encodeURIComponent(
                    formData.subject
                  )}`}
                  className="text-[#E5E7EB] bg-[#243528] hover:bg-[#243528]/80 border border-[#9CA3AF]/30 px-5 py-3 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>MAIL CLIENT</span>
                  <span>↗</span>
                </a>

                {/* Direct WhatsApp Channel Button */}
                <a
                  href="https://wa.me/?text=Hello%20ALL%20IN%20Studio%20Tangier%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 bg-[#152319] hover:bg-emerald-950/60 border border-emerald-500/40 px-5 py-3 rounded-lg transition-all flex items-center gap-2 font-bold shadow-md hover:border-emerald-400"
                >
                  <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-1.109-.06-.264-.085-.609-.204-1.047-.393-1.857-.803-3.064-2.678-3.157-2.802-.093-.124-.755-1.006-.755-1.921 0-.915.48-1.365.65-1.551.17-.186.371-.232.496-.232.124 0 .248.001.356.006.114.006.267-.043.418.32.155.371.531 1.294.577 1.388.046.094.077.204.015.328-.062.124-.093.201-.186.309-.093.109-.196.243-.28.327-.093.093-.19.195-.082.381.108.186.48 1.045 1.028 1.534.707.632 1.303.829 1.489.922.186.093.294.078.402-.047.108-.124.464-.541.588-.727.124-.186.248-.155.418-.093.17.062 1.08.51 1.265.603.186.093.309.139.356.216.047.078.047.45-.097.855z"/>
                  </svg>
                  <span>DISPATCH VIA WHATSAPP</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Studio HQ Metadata Card */}
            <div className="bg-[#1B291F]/60 border border-[#9CA3AF]/10 p-6 rounded-xl space-y-4 font-mono text-xs text-[#9CA3AF]">
              <div className="flex items-center justify-between border-b border-[#9CA3AF]/10 pb-2">
                <span>STUDIO HEADQUARTERS</span>
                <span className="text-[#E5E7EB] font-semibold">{STUDIO_METADATA.location}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#9CA3AF]/10 pb-2">
                <span>GEOGRAPHIC COORDINATES</span>
                <span className="text-[#D4AF37]">{STUDIO_METADATA.coordinates}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#9CA3AF]/10 pb-2">
                <span>EXPECTED RESPONSE TIME</span>
                <span className="text-emerald-400 font-semibold">&lt; 4 HOURS (ACTIVE DISPATCH)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>PREFERRED ENGAGEMENTS</span>
                <span className="text-[#E5E7EB] font-semibold">BESPOKE / HIGH IMPACT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#1B291F] border border-[#D4AF37]/30 p-6 sm:p-10 rounded-sm shadow-2xl relative">
            {/* Technical Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-fade-in font-mono">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2 font-sans">
                    INQUIRY DISPATCHED
                  </h3>
                  <p className="text-sm text-[#9CA3AF] max-w-md mx-auto font-sans leading-relaxed">
                    Thank you for reaching out to ALL IN (<span className="text-[#D4AF37]">[ ALN ]</span>). Our studio team in Tangier will review your transmission and respond within 24 hours.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#9CA3AF]/20 text-xs text-[#D4AF37]">
                  TRANSMISSION DESTINATION: {STUDIO_METADATA.email}
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  type="button"
                  className="px-6 py-2.5 bg-[#243528] text-[#E5E7EB] hover:text-[#D4AF37] border border-[#9CA3AF]/30 rounded-xs text-xs transition-colors"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest pb-3 border-b border-[#9CA3AF]/20">
                  INQUIRY SPECIFICATION FORM
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/80 border border-red-500 text-red-300 font-mono text-xs rounded-xs">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Domain Category Selector */}
                <div>
                  <label className="block font-mono text-xs text-[#E5E7EB] mb-2 uppercase">
                    SELECT DOMAIN CATEGORY <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'software', label: 'Software & Eng' },
                      { id: 'digital', label: 'Digital Utility' },
                      { id: 'physical', label: 'Physical Drop' },
                      { id: 'collaboration', label: 'Collaboration' },
                      { id: 'general', label: 'General Inquiry' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            category: item.id as any,
                            subject: `${item.label} Inquiry`,
                          }))
                        }
                        className={`font-mono text-xs p-2.5 rounded-xs border text-left transition-colors ${
                          formData.category === item.id
                            ? 'bg-[#243528] border-[#D4AF37] text-[#D4AF37] font-semibold'
                            : 'bg-[#243528]/50 border-[#9CA3AF]/20 text-[#9CA3AF] hover:text-[#E5E7EB]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anti-spam honeypot (hidden from human visitors) */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs text-[#E5E7EB] mb-2 uppercase">
                      YOUR NAME / ORGANISATION <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#243528] border border-[#9CA3AF]/30 focus:border-[#D4AF37] text-[#E5E7EB] placeholder-[#9CA3AF]/50 text-sm p-3 rounded-xs outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#E5E7EB] mb-2 uppercase">
                      EMAIL ADDRESS <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="name@domain.com"
                      className="w-full bg-[#243528] border border-[#9CA3AF]/30 focus:border-[#D4AF37] text-[#E5E7EB] placeholder-[#9CA3AF]/50 text-sm p-3 rounded-xs outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block font-mono text-xs text-[#E5E7EB] mb-2 uppercase">
                    SUBJECT <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="Brief description of inquiry"
                    className="w-full bg-[#243528] border border-[#9CA3AF]/30 focus:border-[#D4AF37] text-[#E5E7EB] text-sm p-3 rounded-xs outline-none font-sans"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block font-mono text-xs text-[#E5E7EB] mb-2 uppercase">
                    PROJECT SPECIFICATIONS / TRANSMISSION DETAILS <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Provide detailed goals, project timelines, material requirements, or questions..."
                    className="w-full bg-[#243528] border border-[#9CA3AF]/30 focus:border-[#D4AF37] text-[#E5E7EB] placeholder-[#9CA3AF]/50 text-sm p-3 rounded-xs outline-none font-sans resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <span className="text-[#9CA3AF]">
                    DIRECT CHANNEL: <span className="text-[#D4AF37]">{STUDIO_METADATA.email}</span>
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="font-semibold text-[#1B291F] bg-[#D4AF37] hover:bg-[#E5C158] px-8 py-3.5 rounded-xs transition-colors shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>{loading ? 'DISPATCHING...' : 'DISPATCH TRANSMISSION'}</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
