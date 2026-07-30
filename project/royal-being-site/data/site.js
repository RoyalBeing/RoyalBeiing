// Royal Being — global site configuration (single source of truth)
module.exports = {
  brand: {
    name: 'Royal Being',
    legal: 'Royal Being LLC',
    corePhrase: 'Royal Being — The Ritual of Being',
    tagline: 'Elevate Your Daily Cleansing into a Sacred Spa Ritual',
    supporting: 'Herbal Soaps that Last AND Last',
    est: 'Est. 2021',
    address: 'Newark, DE 19713',
    distribution: 'Distribution Center: Palm Desert, CA 92211',
    madeIn: 'Made in USA',
    domain: 'royalbeing.shop',
    supportEmail: 'hello@royalbeing.shop', // configurable — owner to confirm
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61591471053395',
    instagram: 'https://www.instagram.com/royalbeing2026/',
    tiktok: 'https://www.tiktok.com/@royaliik0ju', // final URL configurable
  },
  markets: ['United States', 'Netherlands', 'Belgium'],
  locales: [
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'fr', label: 'Français' },
  ],
  coupon: { code: 'ROYAL 20', percent: 20, active: true },
  announcements: [
    'Handmade and hand-poured in small batches.',
    'Shipping to the USA, Netherlands & Belgium.',
    'Use ROYAL 20 for 20% off your first ritual.',
  ],
  currency: 'USD',
  currencySymbol: '$',
};
