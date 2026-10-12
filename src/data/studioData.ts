import { StudioPillar, StudioRelease, PhilosophyPrinciple, StudioMetric } from '../types';

export const STUDIO_METADATA = {
  name: 'ALL IN',
  tagline: 'Where engineering precision meets physical & digital artifacts.',
  shortBranding: '[ ALN ]',
  email: 'thealnbrand@gmail.com',
  coordinates: '35.7595° N, 5.8340° W',
  location: 'Tangier HQ, Morocco',
  timezone: 'WEST (UTC+1)',
  statusText: 'STUDIO STATUS: OPERATIONAL',
  manifesto:
    'ALL IN ([ ALN ]) is an independent creative technology studio operating at the intersection of high-performance software engineering, modern digital utilities, and tactile physical capsule drops. Founded in Tangier—where Africa meets Europe and the Mediterranean meets the Atlantic—we build without compromise.',
};

export const STUDIO_METRICS: StudioMetric[] = [
  {
    id: 'm-1',
    label: 'Core Domains',
    value: '03',
    subtext: 'Software, Digital, Physical',
  },
  {
    id: 'm-2',
    label: 'Engineered Releases',
    value: '14+',
    subtext: 'Case studies & capsule drops',
  },
  {
    id: 'm-3',
    label: 'Studio Coordinates',
    value: '35.75° N',
    subtext: 'Tangier Gateway HQ',
  },
  {
    id: 'm-4',
    label: 'Execution Standard',
    value: '100%',
    subtext: 'Zero compromise synthesis',
  },
];

export const STUDIO_PILLARS: StudioPillar[] = [
  {
    id: 'pillar-software',
    number: '01',
    category: 'software',
    title: 'Software & Engineering',
    subtitle: 'Bespoke Systems, High-Frequency Architectures & Custom Algorithms',
    description:
      'We engineer custom software architectures designed for high reliability, scale, and computational elegance. From distributed web platforms to real-time telemetry systems, our software solutions treat code as modern industrial design.',
    capabilities: [
      'Full-Stack Distributed Web Architecture',
      'High-Performance API & Microservice Infrastructure',
      'Real-Time Telemetry & Data Visualization',
      'Cryptographic Protocol & Security Engineering',
      'Custom Algorithmic Workflows & Automation',
    ],
    signatureProject: 'ALN-KERNEL // High-Throughput Data Pipeline',
    techOrMaterials: ['Next.js 16', 'TypeScript', 'Rust / WebAssembly', 'Go', 'Tailwind CSS', 'PostgreSQL'],
    metrics: [
      { label: 'System Uptime Target', value: '99.99%' },
      { label: 'Latency Benchmark', value: '< 45ms' },
      { label: 'Code Quality Standard', value: 'Strict TS' },
    ],
  },
  {
    id: 'pillar-digital',
    number: '02',
    category: 'digital',
    title: 'Digital Products',
    subtitle: 'Standalone Creations, Books, Games, Wallpapers & Tools',
    description:
      'Our digital release lab encompasses anything creative or technical that we build and package: published books across diverse genres, indie games, 6K wallpapers, vector asset packs, and software utilities. Dispatched instantly via Gumroad with zero account creation required.',
    capabilities: [
      'Published Books & Field Guides (PDF, ePub)',
      'Indie Games & Interactive Canvas Experiences',
      '6K Ultra-Res Wallpaper Collections & Art Packs',
      'Scalable Vector Marks & Design Asset Libraries',
      'Production Software Tools & Developer Starters',
    ],
    signatureProject: 'THE MULTIDISCIPLINARY LAB // Digital Field Guide',
    techOrMaterials: ['Digital Publications', 'Canvas & Web Audio', '6K PNGs', 'Vector Assets', 'Next.js & TypeScript'],
    metrics: [
      { label: 'Catalog Model', value: 'Open Lab' },
      { label: 'Fulfillment', value: 'Instant via Gumroad' },
      { label: 'Access Tier', value: 'Zero Account Friction' },
    ],
  },
  {
    id: 'pillar-physical',
    number: '03',
    category: 'physical',
    title: 'Tactile Goods',
    subtitle: 'Studio Uniforms, Archival Prints & Curated Streetwear',
    description:
      'Physicality validates digital theory. ALN designs graphic editions featuring technical typography, coordinate stamps, and architectural wireframes on curated heavyweight streetwear blanks, fulfilled on-demand worldwide via Etsy with zero inventory waste.',
    capabilities: [
      'Curated Heavyweight Streetwear Blanks (Lane Seven, Shaka Wear)',
      'High-Resolution Direct-to-Garment (DTG) Archival Prints',
      'Architectural Wireframe Graphics & Studio Coordinate Stamps',
      'On-Demand Production via Printify (Zero Waste)',
      'Direct Retail Fulfillment Worldwide via Etsy',
    ],
    signatureProject: 'CAPSULE 001 // Tangier Dock Heavyweight Fleece Hoodie',
    techOrMaterials: ['Curated Heavyweight Cotton', 'High-Res DTG Print', 'Printify On-Demand', 'Etsy Global Dispatch'],
    metrics: [
      { label: 'Production Model', value: 'Zero Inventory Waste' },
      { label: 'Print Standard', value: 'Archival DTG' },
      { label: 'Dispatch', value: 'Worldwide via Etsy' },
    ],
  },
];

export const STUDIO_RELEASES: StudioRelease[] = [
  {
    id: 'rel-01',
    title: 'ALN-OS // Minimalist Studio Dashboard',
    code: 'ALN-SW-01',
    category: 'software',
    status: 'RELEASED',
    releaseDate: 'Q3 2026',
    summary: 'High-speed monitoring and operational dispatch dashboard built for independent technology studios.',
    fullDescription:
      'ALN-OS is a lightweight telemetry and dispatch platform designed specifically for creative technology studios. Featuring real-time status feeds, project milestone tracking, and embedded analytics with zero external tracking dependencies.',
    specifications: [
      'Sub-50ms render latency across all viewport sizes',
      'Built-in WebSockets for live status updates',
      'Custom dark-theme matrix styling with Deep Pine and Polished Gold color palette',
      'Fully responsive keyboard navigation shortcuts',
    ],
    techStackOrMaterials: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'WebSockets', 'Chart Engine'],
    featured: true,
    imagePlaceholderText: 'SOFTWARE // ALN-OS TELEMETRY INTERFACE',
    image: '/Engineering.jfif',
    primaryActionLabel: 'EXPLORE CASE STUDY',
  },
  {
    id: 'rel-02',
    title: 'CAPSULE 01 // Tangier Archival Graphic Fleece',
    code: 'ALN-TG-01',
    category: 'physical',
    status: 'RELEASED',
    releaseDate: 'Q4 2026',
    summary: 'Curated heavyweight streetwear hoodie featuring high-resolution architectural typography and Tangier coordinate stamps.',
    fullDescription:
      'Designed by ALL IN Studio in Tangier, Morocco. Printed via precision DTG print labs on premium heavyweight blanks and dispatched on-demand worldwide via Etsy with zero inventory waste.',
    specifications: [
      'Curated heavyweight combed streetwear cotton blank',
      'High-resolution archival direct-to-garment (DTG) print',
      'Tangier studio coordinates typography (35.7595° N, 5.8340° W)',
      'Fulfilled on-demand via Printify and dispatched via Etsy',
    ],
    techStackOrMaterials: ['Curated Heavyweight Cotton', 'DTG Archival Print', 'Printify Fulfillment', 'Etsy Storefront'],
    featured: true,
    imagePlaceholderText: 'PHYSICAL // CAPSULE 01 APPAREL & GRAPHICS',
    image: '/t-shirt (1).png',
    primaryActionLabel: 'ACQUIRE ON ETSY',
    editionDetails: 'On-Demand Archival Edition',
  },
  {
    id: 'rel-03',
    title: 'ALN-MOBILE // Glossy Pro Mobile Suite',
    code: 'ALN-DP-01',
    category: 'digital',
    status: 'BETA',
    releaseDate: 'Q3 2026',
    summary: 'Bespoke iOS and digital product suite featuring fluid micro-interactions and high-FPS motion.',
    fullDescription:
      'ALN-MOBILE provides developers and clients with a high-touch mobile interface to launch hardware-accelerated interfaces, real-time analytics, and spatial design systems.',
    specifications: [
      'Built for iPhone 16 Pro hardware acceleration',
      '60 FPS smooth motion transitions',
      'Automatic TypeScript binding generation',
      'Zero-dependency bundling mode',
    ],
    techStackOrMaterials: ['iOS Swift', 'TypeScript', 'GLSL Shaders', 'Web Assembly Engine'],
    featured: true,
    imagePlaceholderText: 'DIGITAL // ALN-MOBILE PRO SUITE',
    image: '/iPhone 16 Pro, Glossy.jpeg',
    primaryActionLabel: 'ACCESS BETA DOCS',
  },
  {
    id: 'rel-04',
    title: 'ALN-MATRIX // Enterprise Micro-App Suite',
    code: 'ALN-SW-02',
    category: 'software',
    status: 'IN DEVELOPMENT',
    releaseDate: 'Q1 2027',
    summary: 'Modular client portal and dynamic data visualization engine for high-touch client engagements.',
    fullDescription:
      'ALN-MATRIX simplifies project delivery by pairing immutable audit logs with real-time feedback loops. Built on edge-first architecture with end-to-end encryption for sensitive intellectual property handoffs.',
    specifications: [
      'Edge-rendered server components with optimistic UI updates',
      'AES-256 encrypted artifact repository',
      'Custom export options (PDF, Markdown, JSON Specs)',
    ],
    techStackOrMaterials: ['React 19', 'Next.js App Router', 'PostgreSQL', 'Prisma ORM'],
    featured: false,
    imagePlaceholderText: 'SOFTWARE // ALN-MATRIX CLIENT ENGINE',
    image: '/iPhone 15.jpeg',
    primaryActionLabel: 'VIEW SPECIFICATIONS',
  },
  {
    id: 'rel-05',
    title: 'STUDIO GRAPHIC EDITION 02 // Noir Heavyweight Tee',
    code: 'ALN-TG-02',
    category: 'physical',
    status: 'RELEASED',
    releaseDate: 'Q2 2026',
    summary: 'Curated heavyweight combed cotton tee with high-definition typographic back print.',
    fullDescription:
      'Engineered on structured streetwear blanks with archival studio graphics and Tangier coordinates typography. Fulfilled on-demand via Printify and dispatched worldwide via Etsy.',
    specifications: [
      'Curated heavyweight combed jersey cotton blank',
      'High-resolution archival direct-to-garment (DTG) print',
      'Architectural typography & Tangier coordinate marks',
      'Worldwide dispatch via official Etsy shop',
    ],
    techStackOrMaterials: ['Combed Cotton', 'DTG Archival Print', 'Printify On-Demand'],
    featured: false,
    imagePlaceholderText: 'PHYSICAL // NOIR GRAPHIC TEE',
    image: '/Lifestyle, Black.jpeg',
    primaryActionLabel: 'VIEW ON ETSY',
    editionDetails: 'On-Demand Edition',
  },
  {
    id: 'rel-06',
    title: 'ALN-TYPE // Mobile Pro Workspace App',
    code: 'ALN-DP-02',
    category: 'digital',
    status: 'RELEASED',
    releaseDate: 'Q1 2026',
    summary: 'Custom mobile application interface engineered for maximum productivity on mobile hardware.',
    fullDescription:
      'ALN-TYPE features hyper-legible code ligatures, distinct bracket styling, and monospaced tabular numbers optimized for high-density financial, technical, and telemetry displays.',
    specifications: [
      'Optimized for mobile viewports',
      'Includes specialized UI icon glyphs',
      'WebFont, OTF, and TTF formats included',
    ],
    techStackOrMaterials: ['iOS Native', 'TypeScript', 'WOFF2', 'Canvas API'],
    featured: false,
    imagePlaceholderText: 'DIGITAL // ALN-TYPE MOBILE APP',
    image: '/iPhone 13.jpeg',
    primaryActionLabel: 'DOWNLOAD FONT PACK',
  },
];

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    id: 'prin-1',
    number: '01',
    title: 'Zero Compromise Execution',
    tagline: 'Precision in code, depth in physical form.',
    description:
      'We reject the divide between functional engineering and aesthetic beauty. Every line of code, every stitch of textile, and every pixel on a canvas receives the exact same meticulous craft.',
    highlights: ['Pixel-perfect responsive design', 'Clean architecture', 'Enduring material choices'],
  },
  {
    id: 'prin-2',
    number: '02',
    title: 'Tangier Crossroads Heritage',
    tagline: 'Bridging continents, cultures, and disciplines.',
    description:
      'Rooted in Tangier, Morocco—the historic port city standing at the gateway of the Mediterranean and the Atlantic. Our global perspective blends Northern European technical rigor with Mediterranean artistic warmth and African creative resilience.',
    highlights: ['Global mindset', 'Artisan collaboration', 'Cross-continental synthesis'],
  },
  {
    id: 'prin-3',
    number: '03',
    title: 'Physical-Digital Synthesis',
    tagline: 'Digital intelligence anchored by tactile reality.',
    description:
      'Software should feel tangible; physical objects should reflect computational logic. By producing both digital platforms and engineered physical goods, we maintain a complete feedback loop between virtual ideas and real-world utility.',
    highlights: ['Tactile design language', 'Limited capsule drops', 'Integrated product philosophy'],
  },
  {
    id: 'prin-4',
    number: '04',
    title: 'Built for Longevity',
    tagline: 'Resisting disposable tech & fast fashion.',
    description:
      'We build tools and artifacts intended to last for years, not weeks. We favor strict TypeScript, minimal runtime overhead, robust hardware materials, and classic minimalist aesthetics over ephemeral trends.',
    highlights: ['Future-proof codebase', 'Durable materials', 'Timeless aesthetic'],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What is ALL IN ([ ALN ])?',
    answer:
      'ALL IN ([ ALN ]) is an independent creative technology studio based in Tangier. We design and build enterprise software systems, digital utility products, and engineered physical capsule drops.',
  },
  {
    question: 'How do client collaborations work with Software & Engineering?',
    answer:
      'We work with selected founders, enterprises, and creative leaders on a project basis or retainer model. Inquiries can be submitted directly via the form below or sent to thealnbrand@gmail.com.',
  },
  {
    question: 'How can I purchase or acquire Tactile Studio Goods?',
    answer:
      'Physical goods and studio apparel are fulfilled on-demand via Printify and retailed directly through our official Etsy storefront (https://chillguyso.etsy.com), ensuring high-definition graphic prints on curated heavyweight blanks with zero inventory waste.',
  },
  {
    question: 'Where is the studio based?',
    answer:
      'Our primary studio is located in Tangier, Morocco (35.7595° N, 5.8340° W), with distributed operations across Europe and North Africa.',
  },
];
