"use client";

import React from 'react';

export const BackgroundWatermark: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="aln-watermark-pattern"
            width="220"
            height="110"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-25)"
          >
            <text
              x="25"
              y="50"
              fill="#D4AF37"
              fillOpacity="0.055"
              stroke="#D4AF37"
              strokeOpacity="0.035"
              strokeWidth="0.5"
              fontFamily="var(--font-geist-mono), monospace"
              fontWeight="900"
              fontSize="26"
              letterSpacing="0.35em"
            >
              ALN
            </text>
            <text
              x="135"
              y="105"
              fill="#D4AF37"
              fillOpacity="0.055"
              stroke="#D4AF37"
              strokeOpacity="0.035"
              strokeWidth="0.5"
              fontFamily="var(--font-geist-mono), monospace"
              fontWeight="900"
              fontSize="26"
              letterSpacing="0.35em"
            >
              ALN
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aln-watermark-pattern)" />
      </svg>
    </div>
  );
};
