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
        id: 'lm-1', name: 'Rahul Thapa Ryan', category: 'Live Music', price: 35000,
        image: '/Rahul_Thapa_Ryan.jpeg',
        description: 'Solo Singer & Performer – Western, Bollywood & Retro',
        detailDescription: 'Rahul Thapa Ryan is a versatile solo performer known for his soulful voice and energetic stage presence. He covers a wide range of genres including Western pop, classic Bollywood hits, and retro favourites — perfect for weddings, corporate events, and private parties.',
        highlights: ['Western, Bollywood & Retro repertoire', 'Acoustic & electric setups available', 'Ideal for cocktail hours & receptions', '2–3 hour live performance'],
      },
      {
        id: 'lm-2', name: 'Ranjan', category: 'Live Music', price: 30000,
        image: '/ranjan.jpeg',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'Ranjan is a crowd-favourite solo performer specialising in Bollywood mix sets. His high-energy performances keep guests on their feet with a curated mix of current hits and timeless classics.',
        highlights: ['Latest Bollywood hits', 'High-energy crowd engagement', 'Suitable for sangeet & receptions', '2–3 hour live performance'],
      },
      {
        id: 'lm-3', name: 'Ajay', category: 'Live Music', price: 30000,
        image: '/Ajay.jpeg',
        description: 'Solo Singer & Performer – Bolly Mix',
        detailDescription: 'Ajay brings a powerful vocal performance with a Bollywood mix set tailored to your event. Known for his stage energy and audience connection, he ensures every moment is memorable.',
        highlights: ['Bollywood mix repertoire', 'Strong stage presence', 'Customisable song list', '2–3 hour live performance'],
      },
      {
        id: 'lm-4', name: 'Rahul Thapa Ryan Duo', category: 'Live Music', price: 55000,
        image: '/Rahul_Thapa_Ryan.jpeg',
        description: 'Duo Performers – Bolly Mix',
        detailDescription: 'Rahul Thapa Ryan performs alongside a co-artist for a dynamic duo experience. Two voices, double the energy — perfect for sangeet nights and grand receptions where you want a fuller live music experience.',
        highlights: ['Two live vocalists', 'Bollywood mix + Western', 'Harmonised performances', '3 hour live set'],
      },
      {
        id: 'lm-5', name: 'Ranjan & Vansh Duo', category: 'Live Music', price: 50000,
        image: '/ranjan duo.jpeg',
        description: 'Duo Performers – Bolly Mix',
        detailDescription: 'Ranjan and Vansh together create an electrifying duo performance packed with Bollywood energy. Their chemistry on stage and complementary vocal styles make for an unforgettable evening.',
        highlights: ['Dynamic duo chemistry', 'Bollywood mix set', 'Audience interaction', '3 hour live set'],
      },
      {
        id: 'lm-6', name: 'Manisha & Aditya Duo', category: 'Live Music', price: 50000,
        image: '/manisha.jpeg',
        description: 'Duo Performers – Bolly Mix',
        detailDescription: 'Manisha and Aditya bring a beautiful male-female vocal duo experience to your event. Their blend of voices across Bollywood romantic and dance numbers creates the perfect atmosphere for weddings and celebrations.',
        highlights: ['Male-female vocal duo', 'Romantic & dance numbers', 'Perfect for wedding receptions', '3 hour live set'],
      },
      {
        id: 'lm-7', name: 'Sirat Band', category: 'Live Music', price: 65000,
        image: '/Sirat band.jpeg',
        description: 'Band – Bolly Mix',
        detailDescription: 'Sirat Band is a full live band delivering a rich, layered musical experience. With multiple instruments and vocalists, they bring a concert-level performance to your event — ideal for grand weddings and large celebrations.',
        highlights: ['Full live band setup', 'Multiple instruments & vocalists', 'Concert-level experience', 'Bollywood & fusion repertoire', '3–4 hour performance'],
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
