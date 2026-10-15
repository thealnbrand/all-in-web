-- ========================================================
-- ALL IN STUDIO [ ALN ] — SUPABASE DATABASE SCHEMA
-- Tangier HQ // Creative Technology Systems & Products
-- ========================================================

-- 1. Studio Inquiries (Client Contact Form submissions)
CREATE TABLE IF NOT EXISTS public.studio_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  project_tier TEXT,
  project_scope TEXT NOT NULL,
  status TEXT DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'IN_PROGRESS', 'ARCHIVED')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for inquiries
ALTER TABLE public.studio_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous users to insert new inquiries
CREATE POLICY "Allow anon insert inquiries"
  ON public.studio_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated/service role full read/update/delete
CREATE POLICY "Allow full access for service role on inquiries"
  ON public.studio_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anon read/manage for studio admin (using custom admin API with timing-safe token)
CREATE POLICY "Allow anon select and manage inquiries"
  ON public.studio_inquiries
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);


-- 2. Studio Products (Gumroad & Digital Products)
CREATE TABLE IF NOT EXISTS public.studio_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'LIVE ON GUMROAD',
  badge TEXT DEFAULT 'COMMERCIAL TEMPLATE',
  image TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  stack TEXT,
  access TEXT,
  price_tag TEXT,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for products
ALTER TABLE public.studio_products ENABLE ROW LEVEL SECURITY;

-- Public can read all products
CREATE POLICY "Allow public select on products"
  ON public.studio_products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow full manage access for admin/service
CREATE POLICY "Allow full manage on products"
  ON public.studio_products
  FOR ALL
  TO anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);


-- 3. Studio Projects (01 // Systems & Case Studies)
CREATE TABLE IF NOT EXISTS public.studio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'marketplace',
  url TEXT NOT NULL,
  display_url TEXT,
  type_badge TEXT DEFAULT 'FEATURED LIVE BUILD // SAAS PLATFORM',
  metric1_label TEXT DEFAULT 'UPTIME TARGET',
  metric1_value TEXT DEFAULT '99.99%',
  metric1_sub TEXT DEFAULT 'Global Edge',
  metric2_label TEXT DEFAULT 'RESPONSE SPEED',
  metric2_value TEXT DEFAULT 'INSTANT',
  metric2_sub TEXT DEFAULT 'Sub-second',
  deliverables JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for projects
ALTER TABLE public.studio_projects ENABLE ROW LEVEL SECURITY;

-- Public can read all projects
CREATE POLICY "Allow public select on projects"
  ON public.studio_projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow full manage access
CREATE POLICY "Allow full manage on projects"
  ON public.studio_projects
  FOR ALL
  TO anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);


-- ========================================================
-- SEED DATA (INITIAL GUMROAD PRODUCTS & SYSTEMS PORTFOLIO)
-- ========================================================

-- Seed initial products (Multidisciplinary Digital Catalog: Books, Games, Wallpapers, Software, Assets)
INSERT INTO public.studio_products (name, status, badge, image, tagline, description, stack, access, price_tag, url, sort_order)
VALUES
  (
    'TRAVEL OFFER LANDING PAGE',
    'LIVE ON GUMROAD',
    'COMMERCIAL TEMPLATE',
    'https://public-files.gumroad.com/77d3qzgy6b7v5yh72m5uzi59u6w3',
    'High-Converting Travel & Agency Web Architecture',
    'Production-ready, ultra-fast landing page template engineered for travel agencies, tour operators, and experiential platforms. Includes responsive layouts, optimized asset loading, and clean component structure.',
    'HTML5, CSS3, Modern JavaScript',
    '$7.00 USD // Instant Download',
    '$7.00',
    'https://chillguystore.gumroad.com/l/travel-landing',
    1
  ),
  (
    'GOAT & RISING STAR LOGO',
    'LIVE ON GUMROAD',
    'ASSET PACK',
    'https://public-files.gumroad.com/wrpiac3396k8wftwl8hx8pud9o84',
    'Precision Vector Emblem – Inspired by Messi & Lamine',
    'Premium vector brand mark package celebrating generational football legacy. Crafted with geometric balance and scalable vectors ready for apparel, digital badges, and high-impact branding.',
    'Vector Assets, High-Res PNG & ZIP',
    '$10.00 USD // Commercial Vector',
    '$10.00',
    'https://chillguystore.gumroad.com/l/yrsaff',
    2
  ),
  (
    'THE MULTIDISCIPLINARY LAB',
    'AVAILABLE NOW',
    'BOOK',
    '/DigitalProducts.webp',
    'Field Guide to Independent Creative Technology & Digital Craft',
    'A practical studio publication breaking down how to bridge full-stack engineering with visual identity, physical apparel pipelines, and self-published digital products without venture bloat.',
    'Digital Publication (PDF + ePub + Notion)',
    '$15.00 USD // Instant Download',
    '$15.00',
    'https://chillguystore.gumroad.com',
    3
  ),
  (
    'TANGIER CROSSROADS // 6K WALLPAPERS',
    'AVAILABLE NOW',
    'WALLPAPER',
    '/background2.png',
    '16 Architectural & Generative Vector Display Backgrounds',
    'A curated collection of ultra-high-resolution 6K desktop, ultrawide, and mobile wallpapers featuring studio wireframes, geographic coordinate stamps, and deep pine colorways.',
    '6K Ultra-Res PNGs (Desktop + Mobile)',
    '$8.00 USD // Instant Download',
    '$8.00',
    'https://chillguystore.gumroad.com',
    4
  ),
  (
    'GRID SHIFTER // VECTOR ARCADE',
    'AVAILABLE NOW',
    'GAME',
    '/iPhone 16 Pro, Glossy.jpeg',
    'Minimalist Procedural Vector Runner & Soundscape',
    'A standalone indie browser and desktop mini-game built with pure canvas physics, reactive generative audio, and crisp 120 FPS geometric particle systems.',
    'HTML5 Canvas, Web Audio API, Standalone Build',
    '$12.00 USD // Instant Play & Download',
    '$12.00',
    'https://chillguystore.gumroad.com',
    5
  ),
  (
    'SMART-INVOICE PRO',
    'PRODUCTION LIVE',
    'SOFTWARE',
    '/smartinvoice-icon.png',
    'Instant Invoicing & Automated Financial Flow for Creators',
    'Bespoke web utility tailored for freelancers and studios. Generates compliant PDF bills, calculates multi-currency rates, and tracks unpaid balances with zero paperwork.',
    'Next.js 16, TypeScript, Vercel Edge',
    'Free Web Utility // Live App',
    'FREE',
    'https://smartinvoice-six.vercel.app/',
    6
  )
ON CONFLICT DO NOTHING;

-- Seed initial systems portfolio projects
INSERT INTO public.studio_projects (name, category, url, display_url, type_badge, metric1_label, metric1_value, metric1_sub, metric2_label, metric2_value, metric2_sub, deliverables, sort_order)
VALUES
  (
    'RihlatBladna — Direct Moroccan Travel Network',
    'marketplace',
    'https://rihlatbladna.vercel.app/',
    'rihlatbladna.vercel.app',
    'SYS-01 // TRAVEL MARKETPLACE',
    'PLATFORM UPTIME',
    '99.99%',
    'Live Cloud Edge',
    'NOTIFICATION LAG',
    '< 1.5s',
    'Instant WhatsApp Alerts',
    '["Multi-Vendor Agency & Traveler Dashboards", "Real-Time WhatsApp & SMS Inquiry Triggers", "Interactive 24h Destination Stories & Itineraries", "Direct Tour Booking & Multi-City Filtering"]'::jsonb,
    1
  ),
  (
    'PostResa — Academic Space & Room Reservation System',
    'saas',
    'https://postresa.vercel.app/',
    'postresa.vercel.app',
    'SYS-02 // SAAS PLATFORM',
    'REQUEST SPEED',
    '< 0.3s',
    'Instant Slot Confirmation',
    'ACCESS CONTROL',
    '100% RBAC',
    'Director / Faculty / Student',
    '["Student, Teacher & Administration Workspaces", "Conflict-Free Room & Amphitheater Booking", "Live Campus Announcement Feed", "Administrative Validation & Audit Workflow"]'::jsonb,
    2
  ),
  (
    'Jbala Peak — Northern Moroccan Artisan Flagship',
    'ecommerce',
    'https://jbala-peak.vercel.app/',
    'jbala-peak.vercel.app',
    'SYS-03 // ARTISAN E-COMMERCE',
    'PAGE LOAD',
    '< 0.6s',
    'Optimized Image Delivery',
    'LOCALIZATION',
    '3 Languages',
    'English / Français / العربية',
    '["Tri-Lingual Localization (EN/FR/AR)", "Multi-Currency Cart & Seamless Checkout", "Artisan Heritage Storytelling", "Mobile-First Product Showcases"]'::jsonb,
    3
  ),
  (
    'Smart Invoice Pro — Automated Financial Platform',
    'saas',
    'https://smartinvoice-six.vercel.app/',
    'smartinvoice-six.vercel.app',
    'SYS-04 // SAAS & UTILITY',
    'INVOICE SPEED',
    'Instant',
    'Zero Wait PDF Export',
    'AVAILABILITY',
    '99.99%',
    'Production Cloud Live',
    '["1-Click Tax-Compliant PDF Invoice Generation", "Real-Time Cash Flow & Overdue Payment Dashboards", "Multi-Currency Rate Calculations & Storage", "Sub-Second Search Across Accounts"]'::jsonb,
    4
  ),
  (
    'My Maze — Interactive Workplace Decision Engine',
    'interactive',
    'https://my-maze.vercel.app/',
    'my-maze.vercel.app',
    'SYS-05 // INTERACTIVE SIMULATION',
    'FRAME RATE',
    '60 FPS',
    'Fluid Canvas Animation',
    'API SYNC',
    '< 25ms',
    'Live Score Broadcasting',
    '["Multi-Branching Dilemma & Scenario Engine", "Millisecond Speedrun Timer & Live Leaderboards", "Automated Performance Rating & Profiling", "Comprehensive Post-Game Decision Feedback"]'::jsonb,
    5
  )
ON CONFLICT DO NOTHING;


-- ========================================================
-- 4. Studio Goods & Apparel Capsules (03 // Tactile Goods)
-- ========================================================

CREATE TABLE IF NOT EXISTS public.studio_goods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'STUDIO GRAPHIC EDITION // ON-DEMAND DISPATCH',
  badge TEXT DEFAULT 'CAPSULE EDITION',
  price_tag TEXT DEFAULT '$160.00 USD',
  image TEXT NOT NULL,
  secondary_image TEXT,
  description TEXT,
  materials TEXT DEFAULT 'Curated Heavyweight Streetwear Cotton / DTG Print',
  url TEXT NOT NULL DEFAULT 'https://chillguyso.etsy.com',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for goods
ALTER TABLE public.studio_goods ENABLE ROW LEVEL SECURITY;

-- Public can read all goods
CREATE POLICY "Allow public select on goods"
  ON public.studio_goods
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow full manage access for admin
CREATE POLICY "Allow full manage on goods"
  ON public.studio_goods
  FOR ALL
  TO anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- Seed the 3 capsule apparel releases using the clothing photos in public/
INSERT INTO public.studio_goods (name, status, badge, price_tag, image, secondary_image, description, materials, url, sort_order)
VALUES
  (
    'CAPSULE_001 // TANGIER DOCK FLEECE HOODIE',
    'STUDIO GRAPHIC EDITION // ON-DEMAND DISPATCH',
    'CAPSULE 001 // FLEECE',
    '$160.00 USD',
    '/TactileGoods.webp',
    '/Lifestyle, Black (1).jpeg',
    'Engineered with high-resolution studio typography, Tangier coordinate stamps (35.7595° N, 5.8340° W), and architectural wireframe prints on premium structured blanks.',
    'Curated Heavyweight Streetwear Cotton',
    'https://chillguyso.etsy.com',
    1
  ),
  (
    'CAPSULE_002 // ALN GRAPHIC OVERSIZED TEE — NOIR',
    'ARCHIVAL GRAPHIC EDITION // ON-DEMAND DISPATCH',
    'CAPSULE 002 // HEAVY TEE',
    '$65.00 USD',
    '/t-shirt (1).png',
    '/t-shirt (2).png',
    'Curated heavyweight combed cotton streetwear tee featuring bespoke studio typographic back print, architectural coordinate stamps, and reinforced collar ribbing.',
    'Curated Heavyweight Combed Jersey Cotton',
    'https://chillguyso.etsy.com',
    2
  ),
  (
    'CAPSULE_003 // STRAIT BORDERLAND EDITION — CRIMSON & NOIR',
    'HERITAGE GRAPHIC EDITION // ON-DEMAND DISPATCH',
    'CAPSULE 003 // HERITAGE',
    '$145.00 USD',
    '/Lifestyle, Red.jpeg',
    '/Lifestyle, Black.jpeg',
    'Graphic edition pairing crimson and noir streetwear silhouettes with Atlantic-Mediterranean strait telemetry markers and precision vector wireframe graphics.',
    'Structured Heavyweight Combed Cotton Blank',
    'https://chillguyso.etsy.com',
    3
  )
ON CONFLICT DO NOTHING;

