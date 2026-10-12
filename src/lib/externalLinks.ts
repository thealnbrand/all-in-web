/**
 * Centralized external dispatch destinations for ALL IN ([ALN]) Studio.
 *
 * Monetization & fulfillment are strictly separated:
 * - 01 // SYSTEMS: In-house bespoke software service (on-site contact dispatch)
 * - 02 // DIGITAL PRODUCTS: Hosted & licensed via Gumroad (https://chillguystore.gumroad.com)
 * - 03 // TACTILE GOODS: Manufactured physical goods sold via Etsy (https://chillguyso.etsy.com)
 */

export const EXTERNAL_LINKS = {
  // Gumroad Store & Live Products
  GUMROAD: {
    STORE: process.env.NEXT_PUBLIC_GUMROAD_STORE_URL || 'https://chillguystore.gumroad.com',
    TRAVEL_LANDING: 'https://chillguystore.gumroad.com/l/travel-landing',
    GOAT_LOGO: 'https://chillguystore.gumroad.com/l/yrsaff',
    QUEUE_SYNC: 'https://chillguystore.gumroad.com',
    SMART_INVOICE: 'https://chillguystore.gumroad.com',
    TITANIUM_UI: 'https://chillguystore.gumroad.com',
    EDGE_PROBE: 'https://chillguystore.gumroad.com',
    REST_BURST: 'https://chillguystore.gumroad.com',
  },

  // Etsy Shop & Future Physical Capsule Drops
  ETSY: {
    SHOP: process.env.NEXT_PUBLIC_ETSY_SHOP_URL || 'https://chillguyso.etsy.com',
    CAPSULE_001_FLEECE: process.env.NEXT_PUBLIC_ETSY_SHOP_URL || 'https://chillguyso.etsy.com',
  },

  // Direct Channels
  WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/?text=Hello%20ALL%20IN%20Studio%20Tangier%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.',
} as const;
