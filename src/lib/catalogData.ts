import { EXTERNAL_LINKS } from './externalLinks';

export interface GoodsCatalogItem {
  id: string;
  name: string;
  status: string;
  badge: string;
  price_tag: string;
  image: string;
  secondary_image?: string;
  gallery: string[];
  description: string;
  materials: string;
  url: string;
  sort_order: number;
}

export interface DigitalCatalogItem {
  id: string;
  number: string;
  name: string;
  status: string;
  badge: string;
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  stack: string;
  access: string;
  url: string;
  priceTag: string;
}

export const DEFAULT_GOODS_CATALOG: GoodsCatalogItem[] = [
  {
    id: 'capsule-001',
    name: 'CAPSULE_001 // TANGIER DOCK FLEECE HOODIE',
    status: 'STUDIO GRAPHIC EDITION // ON-DEMAND DISPATCH',
    badge: 'CAPSULE 001 // FLEECE',
    price_tag: '$160.00 USD',
    image: '/TactileGoods.webp',
    secondary_image: '/Lifestyle, Black (1).jpeg',
    gallery: ['/TactileGoods.webp', '/Lifestyle, Black (1).jpeg'],
    description:
      'Engineered with high-resolution studio typography, Tangier coordinate stamps (35.7595° N, 5.8340° W), and architectural wireframe prints on premium structured blanks. Built for everyday studio wear with a boxy drop-shoulder silhouette and double-layered hood.',
    materials: 'Curated Heavyweight Streetwear Cotton',
    url: EXTERNAL_LINKS.ETSY.CAPSULE_001_FLEECE,
    sort_order: 1,
  },
  {
    id: 'capsule-002',
    name: 'CAPSULE_002 // ALN GRAPHIC OVERSIZED TEE — NOIR',
    status: 'ARCHIVAL GRAPHIC EDITION // ON-DEMAND DISPATCH',
    badge: 'CAPSULE 002 // HEAVY TEE',
    price_tag: '$65.00 USD',
    image: '/t-shirt (1).png',
    secondary_image: '/t-shirt (2).png',
    gallery: ['/t-shirt (1).png', '/t-shirt (2).png'],
    description:
      'Curated heavyweight combed cotton streetwear tee featuring bespoke studio typographic back print, architectural coordinate stamps, and reinforced collar ribbing. Designed with a relaxed streetwear drape and durable direct-to-garment archival print.',
    materials: 'Curated Heavyweight Combed Jersey Cotton',
    url: 'https://chillguyso.etsy.com',
    sort_order: 2,
  },
  {
    id: 'capsule-003',
    name: 'CAPSULE_003 // STRAIT BORDERLAND EDITION — CRIMSON & NOIR',
    status: 'HERITAGE GRAPHIC EDITION // ON-DEMAND DISPATCH',
    badge: 'CAPSULE 003 // HERITAGE',
    price_tag: '$145.00 USD',
    image: '/Lifestyle, Red.jpeg',
    secondary_image: '/Lifestyle, Black.jpeg',
    gallery: ['/Lifestyle, Red.jpeg', '/Lifestyle, Black.jpeg'],
    description:
      'Graphic edition pairing crimson and noir streetwear silhouettes with Atlantic-Mediterranean strait telemetry markers and precision vector wireframe graphics. Dispatched worldwide via Etsy with zero inventory waste.',
    materials: 'Structured Heavyweight Combed Cotton Blank',
    url: 'https://chillguyso.etsy.com',
    sort_order: 3,
  },
];

export const DEFAULT_DIGITAL_CATALOG: DigitalCatalogItem[] = [
  {
    id: 'travel-landing',
    number: '01',
    name: 'TRAVEL OFFER LANDING PAGE',
    status: 'LIVE ON GUMROAD',
    badge: 'UTILITY',
    image: 'https://public-files.gumroad.com/77d3qzgy6b7v5yh72m5uzi59u6w3',
    gallery: [
      'https://public-files.gumroad.com/77d3qzgy6b7v5yh72m5uzi59u6w3',
      '/DigitalProducts.webp',
    ],
    tagline: 'High-Converting Travel & Agency Web Architecture',
    description:
      'Production-ready, ultra-fast landing page template engineered for travel agencies, tour operators, and experiential platforms. Includes responsive layouts, optimized asset loading, interactive destination cards, and clean modular code ready to deploy in minutes.',
    stack: 'HTML5, CSS3, Modern JavaScript',
    access: '$7.00 USD // Instant Download',
    priceTag: '$7.00',
    url: EXTERNAL_LINKS.GUMROAD.TRAVEL_LANDING,
  },
  {
    id: 'goat-logo',
    number: '02',
    name: 'GOAT & RISING STAR LOGO',
    status: 'LIVE ON GUMROAD',
    badge: 'ASSET PACK',
    image: 'https://public-files.gumroad.com/wrpiac3396k8wftwl8hx8pud9o84',
    gallery: [
      'https://public-files.gumroad.com/wrpiac3396k8wftwl8hx8pud9o84',
      '/DigitalProducts.webp',
    ],
    tagline: 'Precision Vector Emblem Package for High-Impact Branding',
    description:
      'Premium vector brand mark package celebrating generational football legacy. Crafted with geometric balance and scalable vectors ready for apparel printing, digital badges, social branding, and high-resolution merchandise.',
    stack: 'Vector Assets, High-Res PNG & ZIP',
    access: '$10.00 USD // Commercial Vector',
    priceTag: '$10.00',
    url: EXTERNAL_LINKS.GUMROAD.GOAT_LOGO,
  },
  {
    id: 'multidisciplinary-lab',
    number: '03',
    name: 'THE MULTIDISCIPLINARY LAB',
    status: 'AVAILABLE NOW',
    badge: 'BOOK',
    image: '/DigitalProducts.webp',
    gallery: ['/DigitalProducts.webp', '/Engineering.webp'],
    tagline: 'Studio Principles for Independent Creators & Engineers',
    description:
      'A practical studio publication breaking down how to bridge full-stack engineering with visual identity, physical apparel pipelines, and self-published digital products without venture bloat. Delivered in clean PDF, ePub, and Notion workspace formats.',
    stack: 'Digital Publication (PDF + ePub + Notion)',
    access: '$15.00 USD // Instant Download',
    priceTag: '$15.00',
    url: EXTERNAL_LINKS.GUMROAD.STORE,
  },
  {
    id: 'tangier-wallpapers',
    number: '04',
    name: 'TANGIER CROSSROADS // 6K WALLPAPERS',
    status: 'AVAILABLE NOW',
    badge: 'WALLPAPER',
    image: '/background2.png',
    gallery: ['/background2.png', '/iPhone 15.jpeg'],
    tagline: '16 Architectural & Generative Vector Display Backgrounds',
    description:
      'A curated collection of ultra-high-resolution 6K desktop, ultrawide, and mobile wallpapers featuring studio wireframes, geographic coordinate stamps, and deep pine colorways engineered for OLED and Retina displays.',
    stack: '6K Ultra-Res PNGs (Desktop + Mobile)',
    access: '$8.00 USD // Instant Download',
    priceTag: '$8.00',
    url: EXTERNAL_LINKS.GUMROAD.STORE,
  },
  {
    id: 'grid-shifter',
    number: '05',
    name: 'GRID SHIFTER // VECTOR ARCADE',
    status: 'AVAILABLE NOW',
    badge: 'GAME',
    image: '/iPhone 16 Pro, Glossy.jpeg',
    gallery: ['/iPhone 16 Pro, Glossy.jpeg', '/iPhone 15.jpeg'],
    tagline: 'Minimalist Procedural Vector Runner & Soundscape',
    description:
      'A standalone indie browser and desktop mini-game built with pure canvas physics, reactive generative audio, and crisp 120 FPS geometric particle systems. Includes full source files and standalone offline builds.',
    stack: 'HTML5 Canvas, Web Audio API',
    access: '$12.00 USD // Instant Download',
    priceTag: '$12.00',
    url: EXTERNAL_LINKS.GUMROAD.STORE,
  },
  {
    id: 'smart-invoice',
    number: '06',
    name: 'SMART-INVOICE PRO',
    status: 'PRODUCTION LIVE',
    badge: 'SOFTWARE',
    image: '/smartinvoice-icon.png',
    gallery: ['/smartinvoice-icon.png', '/Engineering.webp'],
    tagline: 'Automated Multi-Currency Invoicing for Independent Creators',
    description:
      'Bespoke SaaS invoicing engine tailored for freelancers and studios. Generates compliant PDF bills, calculates multi-currency rates, and tracks unpaid balances with zero paperwork.',
    stack: 'Next.js 16, TypeScript, Vercel Edge',
    access: 'Free Web Utility // Live App',
    priceTag: 'FREE',
    url: 'https://smartinvoice-six.vercel.app/',
  },
];

export function normalizeGoodsList(rawGoods: any[]): GoodsCatalogItem[] {
  if (!rawGoods || !Array.isArray(rawGoods) || rawGoods.length === 0) {
    return DEFAULT_GOODS_CATALOG;
  }
  return rawGoods.map((g: any, idx: number) => {
    const fallback = DEFAULT_GOODS_CATALOG[idx] || DEFAULT_GOODS_CATALOG[0];
    const primary = g.image || fallback.image;
    const secondary = g.secondary_image || fallback.secondary_image;
    const uniquePhotos = Array.from(
      new Set([primary, secondary].filter(Boolean) as string[])
    );
    return {
      id: g.id || fallback.id,
      name: g.name || fallback.name,
      status: g.status || fallback.status,
      badge: g.badge || fallback.badge,
      price_tag: g.price_tag || fallback.price_tag,
      image: primary,
      secondary_image: secondary,
      gallery: uniquePhotos,
      description: g.description || fallback.description,
      materials: g.materials || fallback.materials,
      url: g.url || fallback.url,
      sort_order: g.sort_order ?? idx + 1,
    };
  });
}

export function normalizeDigitalBadge(rawBadge?: string, name?: string): string {
  const b = (rawBadge || '').trim().toUpperCase();
  const n = (name || '').trim().toUpperCase();

  if (b === 'WEB TEMPLATE' || b === 'TEMPLATE' || n.includes('LANDING PAGE')) {
    return 'UTILITY';
  }
  if (b === 'BRAND ASSET' || b === 'VECTOR' || n.includes('LOGO')) {
    return 'ASSET PACK';
  }
  if (b === 'LIVE SAAS' || b === 'SAAS' || b === 'WEB APP' || n.includes('INVOICE')) {
    return 'SOFTWARE';
  }
  if (b) return b;
  return 'UTILITY';
}

export function normalizeDigitalList(rawProducts: any[]): DigitalCatalogItem[] {
  if (!rawProducts || !Array.isArray(rawProducts) || rawProducts.length === 0) {
    return DEFAULT_DIGITAL_CATALOG;
  }
  return rawProducts.map((p: any, idx: number) => {
    const fallback = DEFAULT_DIGITAL_CATALOG[idx] || DEFAULT_DIGITAL_CATALOG[0];
    const mainImg = p.image || fallback.image || '/DigitalProducts.webp';
    const secondaryImg = p.secondary_image || fallback.gallery?.[1];
    const uniqueGallery = Array.from(
      new Set([mainImg, secondaryImg].filter(Boolean) as string[])
    );
    const normalizedBadge = normalizeDigitalBadge(p.badge, p.name);

    return {
      id: p.id || fallback.id || `prod-${idx + 1}`,
      number: String(idx + 1).padStart(2, '0'),
      name: p.name || fallback.name,
      status: p.status || 'AVAILABLE ON GUMROAD',
      badge: normalizedBadge,
      image: mainImg,
      gallery: uniqueGallery,
      tagline: p.tagline || fallback.tagline || '',
      description: p.description || fallback.description || '',
      stack: p.stack || fallback.stack || 'Digital Download Package',
      access:
        p.access ||
        (p.price_tag ? `${p.price_tag} USD // Instant Access` : 'Instant Gumroad Download'),
      priceTag: p.price_tag || fallback.priceTag || 'GUMROAD',
      url: p.url || EXTERNAL_LINKS.GUMROAD.STORE,
    };
  });
}
