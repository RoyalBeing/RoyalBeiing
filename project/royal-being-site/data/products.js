// Royal Being — all 33 products (Appendix A = source of truth).
// publicDescription is claims-safe cosmetic copy; sourceDescription preserves
// original wording for owner review. Internal color/formula notes never render
// as customer copy. Media: `primary`/`gallery` reference imported client assets;
// `placeholder:true` products render a branded, color-matched fallback.
//
// status: active | coming_soon | testing | preorder | sold_out | draft
// "ABOUT TO UNDERGO TEST MODE" products default to coming_soon (waitlist).

const P = (o) => o;

module.exports = [
  // ============ THE ROYAL COLLECTION (7) ============
  P({
    name: 'Glow-rify', slug: 'glow-rify', collection: 'royal',
    price: 21.99, sku: 'GLO-HER-BAR-06', weightOz: 6.3,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#E3B96A', colorDirection: 'Honeyed gold', shape: 'Bar',
    publicDescription:
      'Elevate your glow. A luxurious herbal bar with Goat’s Milk and Carrot Seed Oil that gently cleanses and helps reveal soft, radiant, rejuvenated-looking skin.',
    sourceDescription:
      'Elevate your glow with Glow-rify. This luxurious soap with skin loving, moisturizing ingredients and beneficial essential oils such as Goats Milk and Carrot Seed Oil, also harbors one of Cleopatra’s beauty secrets: known to deeply hydrate and balance skin complexion.',
    keyIngredients: ['Goat’s Milk', 'Raw Honey', 'Carrot Seed Oil', 'Frankincense Oil'],
    fullIngredients: 'Goats Milk, Raw Honey, Glycerin, Carrot Seed Oil, Frankincense Oil, Jasmine Oil, Cypress Oil, Lavender Oil, Geranium Oil, and Natural Preservative.',
    media: { primary: '/assets/client/products/glow-rify/glow-rify-1.png', gallery: [] },
  }),
  P({
    name: 'The Rose Garden', slug: 'the-rose-garden', collection: 'royal',
    price: 19.99, sku: 'ROS-HER-BAR-06', weightOz: 6.3,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#C98A93', colorDirection: 'Rose', shape: 'Bar',
    publicDescription:
      'A delightful floral ritual of Goat’s Milk, Honey, and Rose Hip Oil that leaves skin feeling nourished and softly perfumed with a luxurious rose fragrance.',
    sourceDescription:
      'Elevate your skincare with the enriching scents of The Rose Garden Herbal soap. Our unique blend of Goat’s Milk, Honey, and Rose Hip oil is a delightful treat for your skin, and offers a luxurious floral fragrance that uplifts and brightens your mood.',
    keyIngredients: ['Goat’s Milk', 'Honey', 'Rose Hip Oil', 'Rose Oil'],
    fullIngredients: 'Goat Milk, Honey, Rose Hip Powder, Rose Hip Oil, Vanilla Oil, Rose Oil, Clove Oil, and Black Rose & Oud FO.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Fresh Floral Fiesta', slug: 'fresh-floral-fiesta', collection: 'royal',
    price: 21.99, sku: 'FRE-HER-BAR-06', weightOz: 7.3,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#E8B7C4', colorDirection: 'Soft floral pink', shape: 'Bar',
    publicDescription:
      'Light, airy, blossoming florals. A moisturizing blend of pure Goat’s Milk and sweet Japanese Magnolia for a gentle yet effective cleanse suited to every skin type.',
    sourceDescription:
      'Embrace natures light, airy, and blossoming scents with our Fresh Floral Fiesta Herbal soap. This perfectly formulated soap with a moisturizing blend of pure Goat’s milk and the sweet aroma of Japanese Magnolia, provides a gentle, yet effective cleanse for every skin type.',
    keyIngredients: ['Goat’s Milk', 'Rose Oil', 'Jasmine Oil', 'Japanese Magnolia Oil'],
    fullIngredients: 'Goats Milk, Palmarosa Oil, Rosewood Oil, Ylang Ylang, Geranium Oil, Rose Oil, Neroli Oil, Lavender Oil, Jasmine Oil, Coconut Oil, Chamomile Roman, Clary Sage Oil, Japanese Magnolia Oil and Natural Preservative.',
    media: { primary: '/assets/client/products/fresh-floral-fiesta/fresh-floral-fiesta-1.png', gallery: [] },
  }),
  P({
    name: 'The Enchanted Garden', slug: 'the-enchanted-garden', collection: 'royal',
    price: 21.99, sku: 'ENC-HER-BAR-06', weightOz: 6.3,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#C7B7D6', colorDirection: 'Cream with petal pink / purple / green', shape: 'Bar',
    publicDescription:
      'Bright, fairy-like florals with Coconut and Jasmine of the Arabias for a luxurious lather that leaves skin feeling dewy, nourished, and revitalized.',
    sourceDescription:
      'Get swept up in the wonderful aromas of the Enchanted Garden. With skin-loving all natural ingredients such as Coconut, infused with intoxicating essential oils such as Jasmine of the Arabias, the Enchanted Garden will take your breath away; leaving dewy, nourished, and revitalized skin.',
    keyIngredients: ['Coconut Milk', 'Rose Absolute Oil', 'Warm Oud Oil', 'Sandalwood Oil'],
    fullIngredients: 'Coconut Milk Base, Goats Milk, Rose Absolute Oil, Geranium Oil, Neroli Oil, Cedarwood Oil, Sandalwood Oil, Patchouli Oil, Vetiver Oil, Lavender Oil, Basil Oil, Amber Oil, Warm Oud Oil, Watermelon FO, Lime Oil, Bergamot Oil, Natural Coloring, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Gilded Age', slug: 'gilded-age', collection: 'royal',
    price: 21.99, sku: 'GLO-HER-BAR-06', skuNote: 'Source PDF lists GLO-HER-BAR-06, a duplicate of Glow-rify — likely a copy error. Confirm correct SKU before launch.', weightOz: 6.3,
    status: 'coming_soon', featured: true, subscriptionEligible: false,
    colorHex: '#9B7BA0', colorDirection: 'Plum, Navy, Peach or Ivory with Gold Mica — rich earth tones', shape: 'Bar',
    publicDescription:
      'Deep, warm floral notes reminiscent of vintage luxury. Cocoa Butter, Rose, and Ylang Ylang leave behind a rich, opulent scent and a blissful, bubbly lather.',
    sourceDescription:
      'Step into a dynamic era with our Gilded Age herbal soap bar. Known for its rich, opulent and hydrating ingredients, Gilded Age balances your skin’s surface while leaving behind a luxurious scent. Enjoy deep, warm, floral notes, reminiscent of vintage luxury, alongside blissful bubbly lathers.',
    keyIngredients: ['Cocoa Butter', 'Goat’s Milk', 'Rose Oil', 'Ylang Ylang Oil'],
    fullIngredients: 'Cocoa Butter Base, Goats Milk Base, Patchouli Oil, Violet Oil, Lavender Oil, Rose Oil, Ylang Ylang Oil, Frankincense Oil, Glycerin Base, Cedarwood Oil, Sweet Orange Oil, Bergamot Oil, Cinnamon Oil, Jasmine Oil, Natural Coloring and Natural Preservative.',
    media: { primary: '/assets/client/products/gilded-age/gilded-age-1.png', gallery: [] },
  }),
  P({
    name: 'The Reiny', slug: 'the-reiny', collection: 'royal',
    price: 21.99, sku: null, skuNote: 'Source PDF shows TUR-HER-BAR-05 (Turmeric Swirl’s code) — copy error, SKU not confirmed.', weightOz: 6.7,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#C56B7A', colorDirection: 'Red, Lime Green, Fuchsia, Canary Yellow or Royal Blue', shape: 'Bar',
    publicDescription:
      'A clarifying, captivating bar with Glycerin, Goat’s Milk, Honey, Bergamot, and Ylang Ylang for luxurious lathers that revive and nourish tired-looking skin.',
    sourceDescription:
      'Captivate your audience with the lingering scents of The Reiny. Formulated with skin-loving, moisturizing ingredients such Glycerin, Goat’s Milk, Honey, and infused with essential oils such as Bergamot and Ylang Ylang.',
    keyIngredients: ['Goat’s Milk', 'Glycerin', 'Bergamot Oil', 'Saffron Oil'],
    fullIngredients: 'Glycerin Base, Goat’s Milk, Bergamot Oil, Ylang Ylang Oil, Jasmine Oil, Saffron Oil, Cedarwood Oil, Sandalwood Oil, Orange Oil, Honey, Vanilla Oil, Natural Coloring and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'The Duchess', slug: 'the-duchess', collection: 'royal',
    price: 25.99, sku: 'DUC-HER-BAR-6.7', weightOz: 6.7,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#B49AC9', colorDirection: 'Purple, or White with Purple Swirl', shape: 'Bar',
    publicDescription:
      'Sophisticated elegance with Goat’s Milk, Mango Butter, Lily, and Jasmine. Crisp, delicate florals make an exquisite first step in your cleansing ritual.',
    sourceDescription:
      'Embody the sophisticated elegance of the Duchess. The Duchess is formulated with rich nourishing ingredients such as Goat’s Milk, Mango Butter, and infused with delicate florals such as Lily and Jasmine.',
    keyIngredients: ['Goat’s Milk', 'Mango Butter', 'Lily of the Valley Oil', 'Jasmine Oil'],
    fullIngredients: 'Goats Milk, Mango Butter, Organic Lily of the Valley Oil, Jasmine Oil, Bergamot Oil, Sandalwood Oil, Vetiver Oil, Amber Oil, Grape Seed Oil, Vitamin E Oil, Natural Coloring, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),

  // ============ THE SIGNATURE COLLECTION (10) ============
  P({
    name: 'African Rhapsody', slug: 'african-rhapsody', collection: 'signature',
    price: 18.99, sku: 'AFR-HER-BAR-06', weightOz: 6.7,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#3B2F2A', colorDirection: 'Deep espresso (African black soap)', shape: 'Bar',
    publicDescription:
      'The deep-cleansing character of African black soap, made from plantain skins and cocoa pod, blended with Shea Butter and Goat’s Milk for a wholesome, balancing cleanse.',
    sourceDescription:
      'Experience the cleansing power of African black soap made from plantain skins and cocoa pod. African Rhapsody balances oils, moisturizes skin with the wholesome goodness of Goat’s milk and cleanses without any harsh synthetic chemicals.',
    keyIngredients: ['African Black Soap', 'Shea Butter', 'Goat’s Milk', 'Frankincense Oil'],
    fullIngredients: 'Organic African Black Soap, Shea Butter, Goats Milk, Lemon Oil, Sweet Orange Oil, Sweet Almond Oil, Frankincense Oil, Eucalyptus Oil, Neroli Oil, Raw Honey, Vanilla Oil, Clove Oil, Cypress Oil, and Natural Preservative.',
    media: { placeholder: true, editorial: '/assets/client/editorial/purify-detox.jpg', gallery: [] },
  }),
  P({
    name: 'Aquatic Escape', slug: 'aquatic-escape', collection: 'signature',
    price: 25.00, sku: 'AQU-HER-BAR-04', weightOz: 7.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#6E8FA6', colorDirection: 'Ocean blue', shape: 'Bar',
    publicDescription:
      'Delightful scents of the ocean and beyond. Goat’s Milk and Hawaiian Sandalwood create a deeply cleansing, earthy, refreshing bar for skin and senses.',
    sourceDescription:
      'Elevate your skincare routine with Aquatic Escape made from skin loving moisturizing ingredients such as Goat’s Milk and Hawaiian Sandalwood. Treat your skin and senses to the delightful scents of the ocean and beyond without any harsh synthetic chemicals.',
    keyIngredients: ['Goat’s Milk', 'Hawaiian Sandalwood', 'Grapefruit Oil', 'Eucalyptus Oil'],
    fullIngredients: 'Goats Milk, Glycerin, Coconut Oil, Lime Oil, Lavender Oil, Violet Oil, East Indian Sandalwood, Hawaiian Sandalwood, Sweet Orange Oil, Grapefruit Oil, Eucalyptus Oil, Seaweed FO, and Natural Preservative.',
    media: { primary: '/assets/client/products/aquatic-escape/aquatic-escape-1.png', gallery: [] },
  }),
  P({
    name: 'Herbal Galaxy Renewal Soap', slug: 'herbal-galaxy-renewal', collection: 'signature',
    price: 13.99, sku: 'HER-HER-BAR-06', weightOz: 7.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#3E5B45', colorDirection: 'Deep herbal green (spirulina)', shape: 'Bar',
    publicDescription:
      'A herbal fusion of Shea Butter, Goat’s Milk, and Vanilla that lifts the spirits one blissful lather at a time, leaving skin feeling soft, radiant, and hydrated.',
    sourceDescription:
      'Experience the invigorating power of nature with our Herbal Galaxy Renewal soap. This unique blend of skin loving, moisturizing ingredients, with beneficial essential oils such as Shea Butter, Goats Milk and Vanilla provide the wholesome goodness your skin craves.',
    keyIngredients: ['Shea Butter', 'Goat’s Milk', 'Vanilla Oil', 'Spirulina Powder'],
    fullIngredients: 'Shea Butter, Goats Milk, Honey, Coconut Oil, Vitamin E Oil, Turmeric Oil, Vanilla Oil, Clove Oil, Eucalyptus Oil, Rose Oil, Peppermint Oil, Spirulina Powder, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Sweet Madagascar', slug: 'sweet-madagascar', collection: 'signature',
    price: 21.99, sku: 'SWE-HER-BAR-06', weightOz: 6.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#E7D8B8', colorDirection: 'Warm vanilla cream', shape: 'Bar',
    publicDescription:
      'Sophisticated notes of coconut, vanilla, and Ravintsara transport you to the orchids of Madagascar in a gentle, effective cleanse.',
    sourceDescription:
      'Experience the ultimate in skincare with our Sweet Madagascar Herbal soap, enriched with skin loving, moisturizing ingredients and beneficial essential oils such as Goat Milk, Coconut, and Vanilla oil.',
    keyIngredients: ['Goat’s Milk', 'Coconut Oil', 'Vanilla Oil', 'Ravintsara Oil'],
    fullIngredients: 'Goat Milk, Coconut Oil, Ravintsara (Cinnamomum Camphora) Oil, Geranium Oil, Vanilla Oil, Jasmine Oil, Saro Oil, Orange Blossom Oil, Ylang Ylang Oil, Clove Oil and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Melanin Popping', slug: 'melanin-popping', collection: 'signature',
    price: 19.99, sku: 'MEL-HER-BAR-05', weightOz: 6.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#4A3B33', colorDirection: 'Rich cocoa brown (African black soap)', shape: 'Bar',
    publicDescription:
      'African black soap enriched with Shea Butter and nourishing botanicals that balance, soothe, and revitalize — thoughtfully crafted for brown and black skin.',
    sourceDescription:
      'Experience the cleansing power of African black soap made from organic plantain skins and cocoa pod. Melanin Popping is perfect for Brown and Black skin, and is infused with essential oils that balance, moisturize, and cleanse the skin with wholesome goodness and zero harsh chemicals.',
    keyIngredients: ['African Black Soap', 'Shea Butter', 'Goat’s Milk', 'Turmeric Oil'],
    fullIngredients: 'African Black Soap, Goat Milk, Shea Butter, Coconut Oil, Jojoba Oil, Lavender Oil, Carrot Seed Oil, Geranium Oil, Tea Tree Oil, Frankincense Oil, Myrrh Oil, Turmeric Oil, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Turmeric Swirl', slug: 'turmeric-swirl', collection: 'signature',
    price: 11.99, sku: 'TUR-HER-BAR-05', weightOz: 6.7,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#D9A441', colorDirection: 'Golden turmeric', shape: 'Bar',
    publicDescription:
      'Coconut Milk and Turmeric root powder help brighten the look of skin and support a natural, radiant glow. A luminous weekly ritual.',
    sourceDescription:
      'Enjoy the brightening effects of Turmeric Swirl. This Herbal soap is formulated with skin loving, moisturizing ingredients, such Coconut Milk and Turmeric root powder to help even out skin tone and promotes a natural, radiant glow. Utilize once a week for a radiant glow.',
    keyIngredients: ['Coconut Milk', 'Turmeric Root Powder', 'Shea Butter', 'Kaolin Clay'],
    fullIngredients: 'Coconut Milk, Turmeric root powder, Turmeric Oil, Olive Oil, Shea Butter, Kaolin Clay, Orange Oil, Lavender Oil, and Tea Tree Oil.',
    media: { primary: '/assets/client/products/turmeric-swirl/turmeric-swirl-1.png', gallery: [] },
  }),
  P({
    name: 'Charcoal Moment', slug: 'charcoal-moment', collection: 'signature',
    price: 14.99, sku: 'CHA-HER-BAR-05', weightOz: 7.3,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#4B4E52', colorDirection: 'Deep charcoal grey (confirmed match)', shape: 'Bar',
    publicDescription:
      'Deep-pore cleansing with Activated Charcoal, Bentonite Clay, and Goat’s Milk — the gentlest exfoliation that helps draw out the look of impurities.',
    sourceDescription:
      'Experience deep pore cleansing with our Charcoal Moment Herbal soap. Our unique blend of Goat’s Milk, Activated Charcoal Powder, and Bentonite Clay, offer the gentlest form of exfoliating, while drawing out impurities from your skin.',
    keyIngredients: ['Activated Charcoal', 'Goat’s Milk', 'Bentonite Clay', 'Tea Tree Oil'],
    fullIngredients: 'Coconut Oil, Activated Charcoal Powder, Goat Milk, Glycerin, Shea Butter, Bentonite Clay, Tea tree Oil, Peppermint Oil, Eucalyptus Oil, and Lavender Oil.',
    media: { primary: '/assets/client/products/charcoal-moment/charcoal-moment-1.png', gallery: [], editorial: '/assets/client/editorial/purify-detox.jpg' },
  }),
  P({
    name: 'Islander', slug: 'islander', collection: 'signature',
    price: 21.99, sku: 'ISL-HER-BAR-06', weightOz: 7.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#E3C9A0', colorDirection: 'Warm tropical cream', shape: 'Bar',
    publicDescription:
      'Creamy coconut, sun-sweetened mango, and ocean breeze. A lush, vacation-inspired lather that treats skin and elevates the senses.',
    sourceDescription:
      'Embrace the tropical scents of the Islander. Scents of the islands, defined by notes of creamy coconut, sun-sweetened mango, and the ocean breeze, treat not only your skin, but also elevate your senses.',
    keyIngredients: ['Coconut Milk', 'Mango Butter', 'Bergamot Oil', 'Vanilla Oil'],
    fullIngredients: 'Coconut Milk, Glycerin, Coconut Oil, Honey, Ylang Ylang Oil, Lime Oil, Lemon Oil, Orange Oil, Spearmint Oil, Bergamot Oil, Mango Butter, Vanilla Oil, Pineapple Oil, Ginger Oil, Plumeria Oil, Tea Tree Oil, Vetiver Oil, Patchouli Oil, Clary Sage Oil, Geranium Oil, Frankincense oil, Sandalwood Oil, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Watermelon Fusion', slug: 'watermelon-fusion', collection: 'signature',
    price: 19.99, sku: 'WM-ORG-BR-04-ST', weightOz: 6.7,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#E48C8C', colorDirection: 'Pink clay with poppy seed', shape: 'Bar',
    hasVideo: true,
    publicDescription:
      'A tropical oasis of Goat’s Milk, Peppermint, and Watermelon with poppy seeds for gentle exfoliation. Leaves skin feeling refreshed, smoother, softer, and radiant.',
    sourceDescription:
      'Elevate your skincare cleansing routine with our Watermelon Fusion Herbal soap. Formulated with skin loving ingredients, the wholesome goodness of poppy seeds for exfoliation, and enriched with beneficial essential oils, Watermelon Fusion leaves your skin feeling refreshed, smoother, softer, and radiant, time after time.',
    keyIngredients: ['Goat’s Milk', 'Watermelon Oil', 'Peppermint Oil', 'Poppy Seeds'],
    fullIngredients: 'Goat’s Milk, Oat Milk Base, Coconut Oil, Watermelon Oil, Lavender Oil, Rose Oil, Eucalyptus Oil, Vanilla Oil, Peppermint Oil, Clove Oil, Pink Clay Powder, Poppy Seeds, Watermelon FO, Natural Coloring, and Natural Preservative.',
    ritualBlock: true, // "The Ritual of Being" editorial — requiresApproval (white tea / cold-pressed / aging)
    media: { placeholder: true, video: '/assets/client/videos/watermelon-fusion.mp4', gallery: [] },
  }),
  P({
    name: 'Zen Moment', slug: 'zen-moment', collection: 'signature',
    price: 19.99, sku: null, weightOz: 6.3,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#CFD3C4', colorDirection: 'Mist, Sand or Sandstone', shape: 'Bar',
    publicDescription:
      'A tranquil, spa-like exhale. Lavender, eucalyptus, and peppermint turn an everyday routine into a mindful, wholesome ritual.',
    sourceDescription:
      'Go zen with Zen Moment. From the soothing touch of lavender to the refreshing pick-up of eucalyptus, Zen Moment turns your everyday routine into a mindful, wholesome ritual.',
    keyIngredients: ['Aloe Vera Base', 'Lavender Oil', 'Eucalyptus Oil', 'Peppermint Oil'],
    fullIngredients: 'Aloe Vera Base, Coconut Oil Base, Aloe Vera Oil, Lavender Oil, Frankincense Oil, Peppermint Oil, Eucalyptus Oil, Tea Tree Oil, Violet Oil, Natural Coloring and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),

  // ============ THE COMMON COLLECTION (7) ============
  P({
    name: 'Anti-Aging Herbal Soap', slug: 'anti-aging-herbal', collection: 'common',
    price: 25.00, sku: 'AA-SH-ROS-BR-04', weightOz: 6.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#C9A98C', colorDirection: 'Soft rosewood', shape: 'Bar',
    publicDescription:
      'A time-capsule in a bar. Rich butters and Frankincense produce a very gentle lather that leaves skin feeling deeply hydrated and renewed.',
    sourceDescription:
      'Our Anti-Aging Herbal soap is formulated with age reversing butters that are powerful, skin loving, and infused with beneficial essential oils such as Frankincense Oil to target signs of aging. Renew, and rejuvenate your skin with each cleanse.',
    keyIngredients: ['Goat’s Milk', 'Kokum Butter', 'Frankincense Oil', 'Chamomile Oil'],
    fullIngredients: 'Goats Milk, Oat Milk Base, Honey Base, Kokum Butter, Murumuru Butter, Tucuma Butter, Cupuacu Butter, Ucuuba Butter, Coconut Oil, Frankincense Oil, Lotus Oil, Eucalyptus Oil, Lavender Oil, Chamomile Oil, Japanese Magnolia Oil, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'Aloe Vera Wave', slug: 'aloe-vera-wave', collection: 'common',
    price: 14.99, sku: 'ALO-HER-BAR-06', weightOz: 6.7,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#9FC08A', colorDirection: 'Translucent Green', shape: 'Bar',
    publicDescription:
      'A revitalizing bar built on Aloe Vera base and gel, celebrated for its moisturizing, soothing feel and a calming, purifying cleansing experience.',
    sourceDescription:
      'Discover the healing essence of Aloe Vera Wave. This revitalizing herbal soap bar with skin-healing ingredients such as Aloe Vera Base and gel is infused with Aloe Vera Oil and Violet to bring about a calming, relaxing, body cleansing experience.',
    keyIngredients: ['Aloe Vera Base', 'Aloe Vera Gel', 'Goat’s Milk', 'Cucumber Oil'],
    fullIngredients: 'Aloe Vera Base, Aloe Vera Gel, Goat’s Milk, Aloe Vera Oil, Cucumber Oil, Violet Oil, Natural Coloring and Natural Preservative.',
    media: { primary: '/assets/client/products/aloe-vera-wave/aloe-vera-wave-1.png', gallery: [] },
  }),
  P({
    name: 'Beef Tallow', slug: 'beef-tallow', collection: 'common',
    price: 14.99, sku: 'BEE-HER-BAR-06', weightOz: 6.39,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#EAD9BE', colorDirection: 'Warm cream', shape: 'Bar',
    publicDescription:
      'Grass-fed, pasture-raised Beef Tallow and Goat’s Milk deeply moisturize without a greasy feel — a nourishing blend that leaves skin feeling renewed.',
    sourceDescription:
      'Our unique blend of grass fed, pasture raised Beef Tallow and Goat’s Milk, offer a nourishing blend that deeply moisturizes skin without a greasy feel. Our formulation exfoliates, hydrates, and renews your skin with every use.',
    keyIngredients: ['Beef Tallow', 'Goat’s Milk', 'Oatmeal', 'Tea Tree Oil'],
    fullIngredients: 'Pasture Raised, Grass Fed Beef Tallow, Goat’s Milk, Oatmeal Base, Honey, Coconut Oil, Olive Oil, Castor Oil, Tea tree Oil, Mint Oil, and Lavender Oil.',
    media: { primary: '/assets/client/products/beef-tallow/beef-tallow-1.png', gallery: [], editorial: '/assets/client/editorial/gilded-luxury.jpg' },
  }),
  P({
    name: 'Blissful Lavender', slug: 'blissful-lavender', collection: 'common',
    price: 14.99, sku: null, skuNote: 'Source PDF shows only "B" — SKU truncated/incomplete. Needs full code.', weightOz: 6.3,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#B9A6CE', colorDirection: 'Soft lavender', shape: 'Bar',
    publicDescription:
      'A naturally calming ritual. Goat’s Milk, Lavender Oil, and Lavender Buds create a soothing lather with a beloved, relaxing aroma.',
    sourceDescription:
      'Invite a natural calming effect with our Blissful Lavender Herbal soap bar enriched with skin loving moisturizing ingredients and beneficial essential oils such as Goat’s Milk and Lavender Oil. Experience the wonderful cleansing power of Blissful Lavender while enjoying hydration, restoration, and rejuvenation of your skin with each use.',
    keyIngredients: ['Goat’s Milk', 'Lavender Oil', 'Lavender Buds', 'Bergamot Oil'],
    fullIngredients: 'Goat’s Milk, Lavender Oil, Vitamin E Oil, Bergamot Oil, Mint Oil, Lavender Buds, Natural Coloring and Natural Preservative.',
    media: { primary: '/assets/client/products/blissful-lavender/blissful-lavender-1.png', gallery: [], editorial: '/assets/client/editorial/calm-soothe.jpg' },
  }),
  P({
    name: 'Detoxify', slug: 'detoxify', collection: 'common',
    price: 17.99, sku: 'DET-HER-BAR-06', weightOz: 6.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#8A9A86', colorDirection: 'Clay green-grey', shape: 'Bar',
    publicDescription:
      'Pure Bentonite Clay paired with Goat’s Milk and Shea Butter for a clarifying cleanse that helps absorb the look of excess oil without dryness.',
    sourceDescription:
      'Experience the ultimate in skincare with our Detoxify herbal soap perfectly formulated with skin loving, moisturizing ingredients such as Goat’s Milk and pure, high-quality Bentonite Clay. The benefit of combining Goat’s milk and Shea butter adds an extra layer of care and hydration to Detoxify.',
    keyIngredients: ['Goat’s Milk', 'Bentonite Clay', 'Shea Butter', 'Patchouli Oil'],
    fullIngredients: 'Goats Milk, Shea Butter, Bentonite Clay, Frankincense Oil, Lemongrass Oil, Patchouli Oil, Grape Seed Oil, and Natural Preservative.',
    media: { primary: '/assets/client/products/detoxify/detoxify-1.png', gallery: [], editorial: '/assets/client/editorial/purify-detox.jpg' },
  }),
  P({
    name: 'Citrus Heaven', slug: 'citrus-heaven', collection: 'common',
    price: 15.99, sku: 'CIT-HER-BAR-06', weightOz: 7.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#E6B84D', colorDirection: 'Bright citrus gold', shape: 'Bar',
    publicDescription:
      'Bright, zesty, refreshing citrus. Goat’s Milk, Tangerine, and Sweet Orange transport skin to a sweet, tropical oasis with every use.',
    sourceDescription:
      'Embrace the invigorating power of bright, zesty, and refreshing citrus. Treat your skin to our luxurious blend of citrus notes which transports you to a sweet, tropical oasis with every use.',
    keyIngredients: ['Goat’s Milk', 'Tangerine Oil', 'Sweet Orange Oil', 'Grapefruit Oil'],
    fullIngredients: 'Goats Milk, Lime Oil, Tangerine Oil, Sweet Orange Oil, Bergamot Oil, Lemongrass Oil, Grapefruit Oil, Lemon Oil, and Natural Preservative.',
    media: { primary: '/assets/client/products/citrus-heaven/citrus-heaven-1.png', gallery: [] },
  }),
  P({
    name: 'Calm', slug: 'calm', collection: 'common',
    price: 16.99, sku: 'CAL-HER-BAR-06', weightOz: 6.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#E4D2A8', colorDirection: 'Oat & honey cream', shape: 'Bar',
    publicDescription:
      'The natural essence of Oat Milk and Honey with calming essential oils and an invigorating ocean-breeze scent for a deeply cleansing daily ritual.',
    sourceDescription:
      'Embrace the natural essence of Oat Milk and Honey. Calm offers a luxurious blend of skin loving nourishing ingredients, infused with beneficial essential oils. Treat your skin and senses to the delightful notes of ocean breeze without any harsh synthetic chemicals.',
    keyIngredients: ['Oat Milk', 'Honey', 'Jojoba Oil', 'Chamomile Oil'],
    fullIngredients: 'Oat Milk, Honey, Jojoba Oil, Lavender Oil, Geranium Oil, Ylang Ylang Oil, Chamomile Oil, Tea Tree Oil and Natural Preservative.',
    media: { primary: '/assets/client/products/calm/calm-1.png', gallery: [], editorial: '/assets/client/editorial/calm-soothe.jpg' },
  }),

  // ============ THE ROYAL DUKE COLLECTION (5) — real tested photos ============
  P({
    name: 'The Ethan', slug: 'the-ethan', collection: 'royal-duke',
    price: 21.99, sku: null, weightOz: 7.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#6B7C8C', colorDirection: 'Light Ashy Blue or Navy Blue', shape: 'Bar',
    publicDescription:
      'Grounded, strong, and bold. Warm sage balanced with spicy black pepper for an enduring, earthy, fresh shower experience with remarkable staying power.',
    sourceDescription:
      'Experience The Ethan, our remarkable Herbal Soap Bar for the enduring man. Warm notes like sage, balanced with spicy hints of black pepper, the Ethan evokes an unforgettable shower experience.',
    keyIngredients: ['Goat’s Milk', 'Sage Oil', 'Black Pepper', 'Warm Oud FO'],
    fullIngredients: 'Goat’s Milk, Vanilla Oil, Cedarwood Oil, Sandalwood Oil, Amber Oil, Vetiver Oil, Bergamot Oil, Black Pepper, Fresh Linen FO, Sage Oil, White Tea FO, Eucalyptus Oil, Warm Oud FO, Natural Coloring, and Natural Preservative.',
    media: { primary: '/assets/client/products/the-ethan/the-ethan-1.jpg', gallery: ['/assets/client/products/the-ethan/the-ethan-2.jpg', '/assets/client/products/the-ethan/the-ethan-3.jpg', '/assets/client/products/the-ethan/the-ethan-4.jpg'] },
  }),
  P({
    name: 'The Aristocrat', slug: 'the-aristocrat', collection: 'royal-duke',
    price: 20.99, sku: null, weightOz: 7.3,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#37505A', colorDirection: 'Navy or Hunter Green', shape: 'Bar',
    publicDescription:
      'The noble bar for the refined, ambitious man. A crisp, fresh blend of cedar, amber, and bergamot that refreshes skin then settles into inviting warmth.',
    sourceDescription:
      'Wander into the spellbinding world of the Aristocrat, the noble herbal soap for the refined and ambitious man. Its crisp, fresh, and wonderful blend of essential oils that deliver notes of cedar, amber, and bergamot.',
    keyIngredients: ['Goat’s Milk', 'Cedarwood', 'Amber Oil', 'Bergamot Oil'],
    fullIngredients: 'Goat’s Milk, Cedarwood, Patchouli Oil, Amber Oil, Warm Oud Oil, Watermelon FO, Lime Oil, Bergamot Oil, Natural Coloring, and Natural Preservative.',
    media: { primary: '/assets/client/products/the-aristocrat/the-aristocrat-1.jpg', gallery: ['/assets/client/products/the-aristocrat/the-aristocrat-2.jpg', '/assets/client/products/the-aristocrat/the-aristocrat-3.jpg'], editorial: '/assets/client/editorial/gilded-luxury.jpg' },
  }),
  P({
    name: 'Woody', slug: 'woody', collection: 'royal-duke',
    price: 20.99, sku: null, weightOz: 7.3,
    status: 'active', featured: false, subscriptionEligible: true,
    colorHex: '#A8917A', colorDirection: 'Cream Tan, Gray-Brown or Ash Gray', shape: 'Bar',
    publicDescription:
      'Earthy roots with a twist of Tobacco Oud. Patchouli and Sandalwood create a rich, warm, intense cleanse with remarkable, lasting scent.',
    sourceDescription:
      'Wind back time with Woody. The herbal soap with earthy roots, formulated with Goat’s Milk and all natural essential oils such as Patchouli and Sandalwood to create the ultimate fusion of earthy scents, with a twist of Tobacco Oud.',
    keyIngredients: ['Goat’s Milk', 'Sandalwood Oil', 'Tobacco Oil', 'Patchouli Oil'],
    fullIngredients: 'Goat’s Milk, Cedar wood Oil, Sandalwood Oil, Tobacco Oil, Patchouli Oil, Sweet Orange Oil, Bergamot Oil, Natural Coloring, and Natural Preservative.',
    media: { primary: '/assets/client/products/woody/woody-1.jpg', gallery: ['/assets/client/products/woody/woody-2.jpg', '/assets/client/products/woody/woody-3.jpg', '/assets/client/products/woody/woody-4.jpg'] },
  }),
  P({
    name: 'Bamboozled', slug: 'bamboozled', collection: 'royal-duke',
    price: 19.99, sku: null, weightOz: 7.3,
    status: 'active', featured: true, subscriptionEligible: true,
    colorHex: '#BFCBB4', colorDirection: 'Light Golden-Green to very pale green', shape: 'Bar',
    publicDescription:
      'The crisp world of Green Bamboo, with delicate balsam and bamboo reeds. Masculine, grounding, and unpretentious — a fresh, wild, clean finish.',
    sourceDescription:
      'Step into the wonderful, invigorating world of the Green Bamboo which offers a crisp experience, with the delicate notes of balsam and bamboo reeds. Masculine, powerful, grounding, and unpretentious.',
    keyIngredients: ['Goat’s Milk', 'Fir Balsam Oil', 'White Tea Oil', 'Cedar Wood Oil'],
    fullIngredients: 'Goat’s Milk, Bamboo FO, Organic Fir Balsam Oil, White Tea Oil, Cedar Wood Oil, Sandalwood Oil, Patchouli Oil, Natural Coloring, and Natural Preservative.',
    media: { primary: '/assets/client/products/bamboozled/bamboozled-1.jpg', gallery: ['/assets/client/products/bamboozled/bamboozled-2.jpg', '/assets/client/products/bamboozled/bamboozled-3.jpg', '/assets/client/products/bamboozled/bamboozled-4.jpg'] },
  }),
  P({
    name: 'Teakwood', slug: 'teakwood', collection: 'royal-duke',
    price: 21.99, sku: null, weightOz: 7.3,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#B7AE9B', colorDirection: 'Very Light Grey, Light Brown or light Khaki', shape: 'Bar',
    publicDescription:
      'Warm, woody, and provocative. Teakwood, Warm Oud, and Patchouli over Goat’s Milk for a rich, luxurious lather with smoky, outdoorsy notes.',
    sourceDescription:
      'Experience Teakwood, the herbal, botanical soap for the rich, rugged, or sophisticated man. Infused with indulgent all-natural essential oils such as Warm Oud, Patchouli and Teakwood, to revive the senses.',
    keyIngredients: ['Goat’s Milk', 'Teakwood Oil', 'Tobacco Oud', 'Warm Oud Oil'],
    fullIngredients: 'Goat’s Milk, Teakwood Oil, Tobacco Oud, Patchouli Oil, Lavender Oil, Black Pepper Oil, Warm Oud Oil, Clove Oil, Cardamom Oil, Bergamot Oil, Natural Coloring, and Natural Preservative.',
    media: { primary: '/assets/client/products/teakwood/teakwood-1.jpg', gallery: ['/assets/client/products/teakwood/teakwood-2.jpg', '/assets/client/products/teakwood/teakwood-3.jpg'] },
  }),

  // ============ THE ROYAL KID HERBAL COLLECTION (4) ============
  P({
    name: 'The Chloe', slug: 'the-chloe', collection: 'royal-kid',
    price: 12.99, sku: null, weightOz: 5.29,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#F0A9BE', colorDirection: 'Bubble Gum Pink or Cherry Blossom Pink', shape: 'Heart',
    publicDescription:
      'Full bloom for little ones. Gentle lavender and spearmint with a soft, caressing lather that leaves delicate skin feeling supple, smooth, and restored.',
    sourceDescription:
      'Say hello to full bloom with Chloe, our herbal bar soap formulated with skin-loving ingredients and infused with delicate essential oils. Chloe is ideal for every child with delicate skin.',
    keyIngredients: ['Coconut Milk', 'Mango Base', 'Lavender Oil', 'Roman Chamomile Oil'],
    fullIngredients: 'Coconut Milk, Mango Base, Lavender Oil, Organic Roman Chamomile Oil, Sweet Orange Oil, Cherry Blossom Oil, Natural Coloring, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'The Bodhi', slug: 'the-bodhi', collection: 'royal-kid',
    price: 9.99, sku: null, weightOz: 3.0,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#A9C7C4', colorDirection: 'Light Blue, Deep Green, Yellow or Orange with Cream swirls', shape: 'Cube',
    publicDescription:
      'Gentle care for sensitive skin. Oatmeal, honey, aloe, and shea with a touch of sweet orange — a soft, lofty lather perfect for bedtime baths.',
    sourceDescription:
      'Experience a renewal with Bodhi, our kid friendly herbal soap bar for sensitive skin. Formulated with gentle ingredients that soothe and calm, it is infused with Sweet Orange to lift up the spirits of your little one, and perfect for bedtime baths.',
    keyIngredients: ['Oatmeal Base', 'Honey Base', 'Aloe Vera Base', 'Shea Butter'],
    fullIngredients: 'Oatmeal Base, Honey Base, Aloe Vera Base, Shea Butter Base, Lavender Oil, Organic Roman Chamomile Oil, Sweet Orange Oil, Oatmeal, Natural Coloring, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'The Matthew', slug: 'the-matthew', collection: 'royal-kid',
    price: 9.99, sku: null, weightOz: 3.0,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#F2CE9E', colorDirection: 'Very Light Orange, Yellow or Cream', shape: 'Square',
    publicDescription:
      'Tried and approved by kids. Shea Butter and calendula help nourish delicate skin with a gentle, bath-time-friendly lather they love.',
    sourceDescription:
      'Experience the ultimate soap in our Royal Kid Herbal Collection: The Matthew. Tried and approved by kids, who love and sing its praises at bath time. Formulated with skin-loving ingredients such as Shea Butter and calendula oil.',
    keyIngredients: ['Oatmeal Base', 'Aloe Vera Base', 'Shea Butter', 'Roman Chamomile Oil'],
    fullIngredients: 'Oatmeal Base, Aloe Vera Base, Shea Butter Base, Coconut Oil, Aloe Vera Oil, Aloe Vera Gel, Castor Oil, Organic Roman Chamomile Oil, Sweet Orange Oil, Melon Oil, Organic Cucumber Oil, Oatmeal, Natural Coloring, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
  P({
    name: 'The Iris', slug: 'the-iris', collection: 'royal-kid',
    price: 12.99, sku: null, weightOz: 5.29,
    status: 'coming_soon', featured: false, subscriptionEligible: false,
    colorHex: '#B39BD0', colorDirection: 'Deep Violet or Light Purple with Yellow & Pink Swirls', shape: 'Heart',
    publicDescription:
      'True to its name. Soothing lavender and uplifting sweet orange make bath time a fun, invigorating moment for every child.',
    sourceDescription:
      'Introducing Iris, the Royal bar that’s true to its name. Formulated with delicate skin-loving ingredients, with notes of soothing lavender and the uplifting effect of sweet smelling orange, bath time is sure to be a fun, and invigorating time for every child.',
    keyIngredients: ['Goat’s Milk Base', 'Aloe Vera Base', 'Lavender Oil', 'Sweet Orange Oil'],
    fullIngredients: 'Goat’s Milk Base, Aloe Vera Base, Lavender Oil, Organic Roman Chamomile Oil, Sweet Orange Oil, Natural Coloring, and Natural Preservative.',
    media: { placeholder: true, gallery: [] },
  }),
];
