export interface QuotationArtist {
  id: string;
  name: string;
  description: string;
  detailDescription?: string;
  highlights?: string[];
  price: number;
  category: string;
  image?: string;
}

export interface QuotationCategory {
  id: string;
  label: string;
  icon: string;
  artists: QuotationArtist[];
}

export const staticQuotationCategories: QuotationCategory[] = [
  {
    id: 'live-music',
    label: 'Live Music',
    icon: '🎵',
    artists: [
      {
        id: 'lm-1', name: 'Rahul Thapa Ryan', category: 'Live Music', price: 10000,
        image: '/Rahul_Thapa_Ryan.jpeg',
        description: 'Solo Singer & Performer – Western Country Pop Indie',
        detailDescription: 'A Western Country Pop Indie Musician with a stage experience of 15+ years. An experienced judge, a music teacher, and a Guitar + Piano grade & degree holder with mastery in western vocals.',
        highlights: ['15+ years stage experience', 'Guitar + Piano grade & degree holder', 'Mastery in western vocals', 'Experienced judge & music teacher'],
      },
      {
        id: 'lm-2', name: 'Manisha', category: 'Live Music', price: 8000,
        image: '/manisha.jpeg',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician trained in classical music, bringing depth and finesse to every performance.',
        highlights: ['Trained in classical music', 'Bollywood mix repertoire', 'Refined vocal technique', '2–3 hour live performance'],
      },
      {
        id: 'lm-3', name: 'Krrish', category: 'Live Music', price: 4000,
        image: '/krish.jpeg',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician and new beginner artist with a fresh and enthusiastic approach to every performance.',
        highlights: ['Bollywood mix repertoire', 'Fresh new talent', 'Enthusiastic stage presence', '2–3 hour live performance'],
      },
      {
        id: 'lm-4', name: 'Ranjan', category: 'Live Music', price: 8000,
        image: '/ranjan.jpeg',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician experienced in gigs, bringing energy and versatility to every performance.',
        highlights: ['Experienced in gigs', 'Bollywood mix repertoire', 'High-energy crowd engagement', '2–3 hour live performance'],
      },
      {
        id: 'lm-5', name: 'Ajay', category: 'Live Music', price: 4000,
        image: '/Ajay.jpeg',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician and new beginner artist with a fresh and enthusiastic approach to every performance.',
        highlights: ['Bollywood mix repertoire', 'New beginner artist', 'Enthusiastic stage presence', '2–3 hour live performance'],
      },
      {
        id: 'lm-6', name: 'Vansh', category: 'Live Music', price: 4000,
        image: '/Vansh.png',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician and a regular gigs performer, delivering consistent and engaging live performances.',
        highlights: ['Regular gigs performer', 'Bollywood mix repertoire', 'Consistent live performer', '2–3 hour live performance'],
      },
      {
        id: 'lm-7', name: 'Rahul Thapa Ryan + Pianist', category: 'Live Music', price: 15000,
        image: '/Rahul_Thapa_Ryan.jpeg',
        description: 'Duo Performers – Western Country Pop Indie',
        detailDescription: 'A Western Country Pop Indie Musician with 15+ years of stage experience performing alongside a pianist. An experienced judge, music teacher, and Guitar + Piano grade & degree holder with mastery in western vocals.',
        highlights: ['15+ years stage experience', 'Live pianist accompaniment', 'Western Country Pop Indie', '3 hour live set'],
      },
      {
        id: 'lm-8', name: 'Manisha + Guitarist', category: 'Live Music', price: 10000,
        image: '/manisha.jpeg',
        description: 'Duo Performers – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician trained in classical music performing alongside a guitarist, bringing depth and finesse to every performance.',
        highlights: ['Trained in classical music', 'Live guitarist accompaniment', 'Bollywood mix repertoire', '3 hour live set'],
      },
      {
        id: 'lm-9', name: 'Ranjan + Pianist', category: 'Live Music', price: 8000,
        image: '/ranjan.jpeg',
        description: 'Duo Performers – Bolly Mix',
        detailDescription: 'A Bollywood Mix Musician experienced in gigs performing alongside a pianist, bringing energy and versatility to every performance.',
        highlights: ['Experienced in gigs', 'Live pianist accompaniment', 'Bollywood mix repertoire', '3 hour live set'],
      },
      {
        id: 'lm-10', name: 'Sirat Band', category: 'Live Music', price: 20000,
        image: '/Sirat band.jpeg',
        description: 'Band – Bolly Mix | Per Weekend Gig: ₹15,000 | Per Party Gig: ₹20,000 to ₹25,000',
        detailDescription: 'A Bollywood Mix Musician with an artist trained in classical music, delivering powerful ensemble performances.',
        highlights: ['Trained in classical music', 'Full band ensemble', 'Bollywood mix repertoire', '3–4 hour performance'],
      },
    ],
  },
  {
    id: 'dj',
    label: 'DJ Services',
    icon: '🎧',
    artists: [
      {
        id: 'dj-1', name: 'DJ With LED Wall 8x8', category: 'DJ Services', price: 130000,
        description: 'DJ + LED Wall 8x8 + Guest Transfer 4x – Per Day',
        detailDescription: 'A premium DJ package complete with a stunning 8x8 LED wall backdrop that transforms your venue into a visual spectacle. Includes professional DJ, full sound system, LED wall setup, and 4 guest transfers — everything you need for an unforgettable night.',
        highlights: ['8x8 LED wall display', 'Professional DJ & sound system', '4x guest transfers included', 'Full setup & breakdown', 'Per day pricing'],
      },
      {
        id: 'dj-2', name: 'DJ Setup (Basic)', category: 'DJ Services', price: 50000,
        description: 'Professional DJ with sound system',
        detailDescription: 'A professional DJ setup with high-quality sound system suitable for events of all sizes. Our DJ curates the perfect playlist for your event — from pre-dinner ambience to late-night dance floor energy.',
        highlights: ['Professional DJ', 'High-quality sound system', 'Custom playlist curation', 'Suitable for all event sizes', 'Setup & breakdown included'],
      },
    ],
  },
  {
    id: 'event-services',
    label: 'Event Services',
    icon: '🎪',
    artists: [
      {
        id: 'es-1', name: 'Female Anchor', category: 'Event Services', price: 45000,
        description: 'Female Anchor for Haldi + Sangeet + Wedding (2 Days)',
        detailDescription: 'A professional female anchor who hosts your Haldi, Sangeet, and Wedding ceremonies across 2 days. She keeps the energy high, manages the flow of events, and ensures every moment is announced and celebrated beautifully.',
        highlights: ['Covers Haldi, Sangeet & Wedding', '2-day engagement', 'Bilingual hosting (Hindi/English)', 'Script & event flow coordination', 'Crowd engagement activities'],
      },
      {
        id: 'es-2', name: 'Wedding Planner Team', category: 'Event Services', price: 100000,
        description: 'Wedding Planner + Guest Management (2 Days)',
        detailDescription: 'A dedicated wedding planner team that handles every detail of your big day. From vendor coordination to guest management, they ensure everything runs smoothly so you can be fully present in every moment.',
        highlights: ['Dedicated planner + assistant', 'Guest management & seating', 'Vendor coordination', '2-day on-ground support', 'Timeline & logistics management'],
      },
      {
        id: 'es-3', name: 'Decor Touchup', category: 'Event Services', price: 100000,
        description: 'Premium Decor Touchup Package',
        detailDescription: 'Elevate your venue with our premium decor touchup package. Our team adds finishing touches — floral arrangements, lighting accents, table styling, and more — to transform your space into something truly special.',
        highlights: ['Floral arrangements', 'Lighting accents & draping', 'Table & stage styling', 'Entrance decor', 'Customisable theme'],
      },
      {
        id: 'es-4', name: 'Digital Invitation + Goodies', category: 'Event Services', price: 36000,
        description: 'Digital Invitation Card Video + Customized Wedding Goodies (3 Functions)',
        detailDescription: 'Make a lasting first impression with a beautifully crafted digital invitation video and personalised wedding goodies for your guests. Covers 3 functions with custom-designed materials that match your wedding theme.',
        highlights: ['Custom digital invitation video', 'Personalised wedding goodies', 'Covers 3 functions', 'Theme-matched design', 'WhatsApp & social media ready'],
      },
      {
        id: 'es-5', name: 'Mirror Ramp Walk + Photography', category: 'Event Services', price: 180000,
        description: 'Mirror Ramp Walk + Brand Stall 1x + Photographer',
        detailDescription: 'Create a show-stopping moment with a mirror ramp walk setup that makes every guest feel like a star. Includes a branded stall and a professional photographer to capture every glamorous moment.',
        highlights: ['Mirror ramp walk setup', '1x branded stall', 'Professional photographer', 'Perfect for sangeet & receptions', 'Memorable guest experience'],
      },
      {
        id: 'es-6', name: 'Bridal Entry Package', category: 'Event Services', price: 150000,
        description: 'Bridal Themed Entry + Bridal Entry Dance + Makeup & Mehndi Artist',
        detailDescription: 'Make your bridal entry truly unforgettable. This all-inclusive package covers a themed bridal entry setup, a choreographed entry dance, and professional makeup and mehndi artists — everything to make the bride shine.',
        highlights: ['Themed bridal entry setup', 'Choreographed entry dance', 'Professional makeup artist', 'Mehndi artist included', 'Full bridal experience'],
      },
    ],
  },
];

export const formatPrice = (price: number): string => {
  if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2)},00,000`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatPriceShort = (price: number): string => {
  if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(0)}K`;
  }
  return `₹${price}`;
};

export const quotationCategories = staticQuotationCategories;
