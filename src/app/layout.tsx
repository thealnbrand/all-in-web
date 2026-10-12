import "../utils/react19Polyfill";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://all-in.studio"),
  title: "ALL IN [ ALN ] // Independent Creative Technology Studio",
  description:
    "Where engineering precision meets physical & digital artifacts. Custom software architectures, digital utility suites, and physical capsule drops from Tangier HQ.",
  keywords: [
    "ALL IN",
    "ALN",
    "Creative Technology Studio",
    "Software Engineering",
    "Digital Products",
    "Physical Goods",
    "Tangier Studio",
  ],
  authors: [{ name: "ALL IN STUDIO", url: "https://all-in.studio" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ALL IN [ ALN ] // Creative Technology Studio",
    description:
      "Where engineering precision meets physical & digital artifacts. Operating at the crossroads of continents in Tangier.",
    siteName: "ALL IN [ ALN ]",
    images: [
      {
        url: "/logo.png",
        width: 640,
        height: 400,
        alt: "ALL IN [ ALN ] Studio Insignia",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALL IN [ ALN ] // Creative Technology Studio",
    description:
      "Where engineering precision meets physical & digital artifacts. Tangier HQ.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ALL IN",
  "alternateName": ["ALN", "[ ALN ]", "ALL IN STUDIO"],
  "url": "https://all-in.studio",
  "logo": "https://all-in.studio/logo.png",
  "image": "https://all-in.studio/logo.png",
  "email": "thealnbrand@gmail.com",
  "description":
    "Independent creative technology studio engineering software architectures, digital products, and physical capsule drops.",
  "location": {
    "@type": "Place",
    "name": "Tangier HQ",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.7595,
      "longitude": -5.834,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Schema.org Structured Data for Google Search Logo & Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#243528] text-[#E5E7EB]">
        {children}
      </body>
    </html>
  );
}
