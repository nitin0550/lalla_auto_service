/**
 * LALLA AUTO SERVICE - BUDAUN
 * Business Data: Workshop Services, Genuine Spares Catalog, Tracking Records & Business Config
 * (NO price menus - pure business landing page focus)
 */

const LALLA_CONFIG = {
  businessName: 'Lalla Auto Service',
  tagline: '100% Genuine Spare Parts & Expert Motorcycle Workshop in Budaun',
  phone: '9012891452',
  whatsappNumber: '919012891452',
  address: {
    line1: 'Water Works Road, near Budaun Roadways',
    line2: 'In the lane opposite Hanuman Mandir',
    city: 'Budaun',
    state: 'Uttar Pradesh',
    pincode: '243601'
  },
  hours: 'Monday – Sunday: 9:00 AM – 8:00 PM (Open All 7 Days)',
  supportedBrands: ['Hero', 'Bajaj', 'TVS', 'Honda'],
  googleMapsUrl: 'https://maps.app.goo.gl/drYQJRckM2p1J5NS7'
};

// Workshop Specializations (Visual-first presentation - capabilities and service excellence)
const WORKSHOP_SERVICES = [
  {
    id: 'general-service',
    title: 'Periodic General Servicing',
    hindiTitle: 'कंप्लीट जनरल सर्विस & ट्यूनिंग',
    time: '2 - 3 Hours',
    badge: 'Recommended',
    icon: '🔧',
    image: 'assets/images/service_general.webp',
    tagline: '28-Point multi-point inspection, fresh engine oil & pressure wash.',
    visualHighlights: [
      { icon: '🛢️', text: 'Fresh Engine Oil' },
      { icon: '🔍', text: '28-Point Check' },
      { icon: '🚿', text: 'Pressure Wash' },
      { icon: '⛓️', text: 'Chain Clean & Lube' }
    ],
    inclusions: [
      '28-Point multi-point inspection',
      'Engine oil drain & fresh refill',
      'Air & fuel filter cleaning & inspection',
      'Drive chain cleaning, tensioning & lubrication',
      'Front & rear brake check & calibration',
      'Spark plug clean & gap setting',
      'High-pressure wash & protective polish'
    ]
  },
  {
    id: 'engine-overhaul',
    title: 'Engine Repair & Overhaul',
    hindiTitle: 'इंजन रिपेयर & फुल मैकेनिकल काम',
    time: 'Same Day',
    badge: 'Master Mechanic',
    icon: '⚙️',
    image: 'assets/images/service_engine.webp',
    tagline: 'Engine rebuild, piston cylinder kit, smoke fix & valve timing.',
    visualHighlights: [
      { icon: '⚙️', text: 'Piston & Cylinder Kit' },
      { icon: '🔧', text: 'Valve Seat Lapping' },
      { icon: '💨', text: 'Smoke & Noise Fix' },
      { icon: '🛡️', text: '100% OEM Gaskets' }
    ],
    inclusions: [
      'Piston & cylinder block kit replacement',
      'Precision valve seat cutting & lapping',
      'Crankshaft truing & bearing fitting',
      'Timing chain & tensioner replacement',
      'Complete engine decarb & OEM gasket kit',
      'Rigorous performance road test'
    ]
  },
  {
    id: 'clutch-transmission',
    title: 'Clutch & Gearbox Work',
    hindiTitle: 'क्लच प्लेट & गियरबॉक्स सर्विस',
    time: '1 - 2 Hours',
    badge: 'OEM Friction Plates',
    icon: '⚡',
    image: 'assets/images/service_clutch.webp',
    tagline: 'Restore peak pickup, eliminate slipping and ensure smooth gear shift.',
    visualHighlights: [
      { icon: '⚡', text: 'OEM Clutch Plates' },
      { icon: '🔄', text: 'Smooth Gear Shift' },
      { icon: '🚀', text: 'Instant Pickup Restored' },
      { icon: '🎯', text: 'Cable Calibration' }
    ],
    inclusions: [
      'Genuine clutch friction plates installation',
      'Steel clutch drive plates inspection',
      'Clutch hub & center assembly check',
      'Clutch cable free-play calibration',
      'Smooth gear selector fork tuning'
    ]
  },
  {
    id: 'brake-safety',
    title: 'Brake Overhaul & Safety Service',
    hindiTitle: 'ब्रेक सर्विस & शू/पैड चेंज',
    time: '45 Mins',
    badge: 'Safety Assurance',
    icon: '🛑',
    image: 'assets/images/service_brakes.webp',
    tagline: 'High progressive stopping bite for drum & disc with zero squeak.',
    visualHighlights: [
      { icon: '🛑', text: 'Genuine Brake Shoes' },
      { icon: '💿', text: 'Disc Rotor Skimming' },
      { icon: '💧', text: 'Brake Fluid Bleeding' },
      { icon: '🔇', text: 'Zero Squeaking' }
    ],
    inclusions: [
      'OEM brake shoe/pad replacement',
      'Disc rotor inspection & skimming',
      'Brake drum deglazing & cleaning',
      'DOT-4 brake fluid top-up / bleeding',
      'Brake linkage & return spring greasing'
    ]
  },
  {
    id: 'electrical-battery',
    title: 'Electrical & Battery Diagnostics',
    hindiTitle: 'इलेक्ट्रिकल, वायरिंग & बैटरी',
    time: '1 - 2 Hours',
    badge: 'Digital Diagnostic',
    icon: '🔋',
    image: 'assets/images/service_electrical.webp',
    tagline: 'Self-start motor overhauls, digital battery test & wiring check.',
    visualHighlights: [
      { icon: '🔋', text: 'Battery Load Test' },
      { icon: '⚡', text: 'Starter Motor Repair' },
      { icon: '💡', text: 'Headlight & Horns' },
      { icon: '🔌', text: 'Wiring Short Check' }
    ],
    inclusions: [
      'Digital battery load & charging test',
      'Starter motor carbon brush check',
      'RR Unit / Alternator stator inspection',
      'Wiring harness short circuit check',
      'Horn, indicator & headlight relay tuning'
    ]
  },
  {
    id: 'doorstep-pickup',
    title: 'Doorstep Bike Pickup & Drop',
    hindiTitle: 'डोरस्टेप पिकअप & ड्रॉप (बदायूँ)',
    time: 'Same Day Service',
    badge: 'Budaun-Wide',
    icon: '🚚',
    image: 'assets/images/service_pickup.webp',
    tagline: 'Safe bike carrier transit from home or office across Budaun.',
    visualHighlights: [
      { icon: '🚚', text: 'Safe Bike Carrier' },
      { icon: '📲', text: 'Live WhatsApp Photo' },
      { icon: '🧼', text: 'Wash & Delivered' },
      { icon: '📍', text: 'All Budaun Areas' }
    ],
    inclusions: [
      'Trained rider collection from your location',
      'Digital job-card with photos & fuel level',
      'Real-time WhatsApp status updates',
      'Pre-delivery road test in Budaun',
      'Safe transit across all Budaun neighborhoods'
    ]
  }
];

// Genuine Spare Parts Catalog (Hero, Bajaj, TVS, Honda) - NO PRICES, focus on OEM genuine quality & WhatsApp inquiries
const SPARE_PARTS_CATALOG = [
  {
    id: 'sp-01',
    name: 'Genuine Front Brake Shoe Set',
    brand: 'Hero',
    category: 'Brake Parts',
    partNumber: 'HERO-06450-KCC-900',
    compatibleBikes: 'Splendor+, Passion Pro, HF Deluxe, Glamour',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.9,
    description: '100% Original Hero asbestos-free brake shoes for high heat resistance, progressive stopping bite, and zero wheel squeaking.',
    imageIcon: '🛑'
  },
  {
    id: 'sp-02',
    name: 'Heavy-Duty Brass Chain Sprocket Kit',
    brand: 'Bajaj',
    category: 'Chain & Sprocket',
    partNumber: 'BAJ-CS-P150-HD',
    compatibleBikes: 'Pulsar 150 UG4, Pulsar 180, Pulsar Neon',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.8,
    description: 'Hardened high-carbon steel 428 pitch chain sprocket kit with induction-hardened teeth for extended 25,000+ km lifespan.',
    imageIcon: '⚙️'
  },
  {
    id: 'sp-03',
    name: 'Complete Clutch Plate & Pressure Set',
    brand: 'Honda',
    category: 'Clutch Parts',
    partNumber: 'HON-22201-KTC-900',
    compatibleBikes: 'CB Shine 125, SP 125, Unicorn 150/160',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 5.0,
    description: 'Factory-calibrated OEM friction material ensures maximum torque transfer, silky smooth gear shifts, and superior fuel economy.',
    imageIcon: '⚡'
  },
  {
    id: 'sp-04',
    name: 'Sintered Front Disc Brake Pad Kit',
    brand: 'TVS',
    category: 'Brake Parts',
    partNumber: 'TVS-K6320500',
    compatibleBikes: 'Apache RTR 160 4V, RTR 180, RTR 200 4V',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.9,
    description: 'High-friction sintered ceramic-metallic pads delivering fade-free performance even under aggressive monsoon and highway braking.',
    imageIcon: '🛑'
  },
  {
    id: 'sp-05',
    name: 'High-Flow Polyurethane Air Filter',
    brand: 'Hero',
    category: 'Filters',
    partNumber: 'HERO-17211-KCC-900',
    compatibleBikes: 'Splendor, Passion, HF Deluxe, Super Splendor',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.7,
    description: 'Micro-pore dry paper & foam element capturing 99.4% of dust particles while preserving optimum engine air intake.',
    imageIcon: '💨'
  },
  {
    id: 'sp-06',
    name: 'Premium 4T 10W-30 Synthetic Engine Oil',
    brand: 'Honda',
    category: 'Lubricants',
    partNumber: 'HON-LUBE-4T-900',
    compatibleBikes: 'Activa 6G/125, Shine 125, Dio, SP 125, Unicorn',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.9,
    description: 'Genuine Honda 4T premium engine oil specially formulated for low friction, superior thermal stability, and clean engine internals.',
    imageIcon: '🛢️'
  },
  {
    id: 'sp-07',
    name: 'Heavy Duty Front Shock Absorber Oil Seal (Pair)',
    brand: 'Bajaj',
    category: 'Suspension',
    partNumber: 'BAJ-39101321',
    compatibleBikes: 'Pulsar 150/180/220, Platina 100/110, Discover',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.8,
    description: 'Double-lip nitrile elastomer fork seals with dual garter springs to prevent hydraulic oil leaks and protect fork stanchions.',
    imageIcon: '🔩'
  },
  {
    id: 'sp-08',
    name: 'Iridium Spark Plug (Single Electrode)',
    brand: 'TVS',
    category: 'Electrical',
    partNumber: 'TVS-M1060010',
    compatibleBikes: 'Apache RTR 160/180/200, Raider 125, Ronin',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.9,
    description: 'Laser-welded iridium center electrode guarantees instantaneous cold morning starts, cleaner combustion, and reduced carbon fouling.',
    imageIcon: '⚡'
  },
  {
    id: 'sp-09',
    name: 'Teflon-Lined Smooth Clutch Cable Assembly',
    brand: 'Hero',
    category: 'Cables',
    partNumber: 'HERO-22870-KCC-900',
    compatibleBikes: 'Splendor Pro, Splendor Plus, Passion Xpro',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.8,
    description: 'Stainless steel braided inner wire with internal Teflon lining for effortless one-finger clutch lever actuation and long life.',
    imageIcon: '🔗'
  },
  {
    id: 'sp-10',
    name: 'Original Rear Brake Shoe Assembly',
    brand: 'Honda',
    category: 'Brake Parts',
    partNumber: 'HON-06430-GCC-B50',
    compatibleBikes: 'Activa 3G/4G/5G/6G, Activa 125, Dio, Aviator',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.9,
    description: 'Engineered specifically for Honda gearless scooters for responsive, chatter-free rear wheel braking and extended lining life.',
    imageIcon: '🛑'
  },
  {
    id: 'sp-11',
    name: 'Complete Cylinder & Piston Kit (OEM Bore)',
    brand: 'Hero',
    category: 'Engine Parts',
    partNumber: 'HERO-12100-KCC-900',
    compatibleBikes: 'Splendor+, Passion Plus, HF Deluxe (97.2cc)',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 5.0,
    description: 'Cast iron cylinder block with graphite-coated aluminum alloy piston, rings, pin, and circlips for factory compression restoration.',
    imageIcon: '⚙️'
  },
  {
    id: 'sp-12',
    name: 'Maintenance-Free 12V 4Ah Motorcycle Battery',
    brand: 'Bajaj',
    category: 'Electrical',
    partNumber: 'BAJ-BAT-12V4AH',
    compatibleBikes: 'Pulsar, Discover, Platina ES, Avenger',
    stockStatus: 'Ready in Shop',
    inStock: true,
    rating: 4.9,
    description: 'High cranking AGM VRLA battery with 36 months warranty. Instant self-start response in all weather conditions.',
    imageIcon: '🔋'
  }
];

// Helper: build WhatsApp URL
function createWhatsAppLink(message) {
  return `https://wa.me/${LALLA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
