import flowerImg from '@/assets/bandhan/flower.png';

interface MenuItem {
  text: string;
  highlight?: boolean;
}

interface Station {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
  accompaniments?: MenuItem[];
  origin: { flag: string; city: string; country: string; code: string };
}

const stations: Station[] = [
  {
    id: 'teppanyaki',
    name: 'Teppanyaki',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇯🇵', city: 'Tokyo', country: 'Japan', code: 'jp' },
    items: [
      { text: 'Spicy Greens & Asparagus in Lemongrass and Hot Basil Sauce' },
      { text: 'Silken Tofu, Mushroom in Hot Coriander Sauce' },
      { text: 'Teppanyaki Greens' },
      { text: 'Chilli Udon' },
      { text: 'Teppanyaki Shredded Chicken with Korean Sauce', highlight: true },
      { text: 'Teriyaki Chicken', highlight: true },
    ],
  },
  {
    id: 'dimsum',
    name: 'Dimsum Station',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇨🇳', city: 'Guangzhou', country: 'China', code: 'cn' },
    items: [
      { text: 'Wild Mushroom and Basil Dimsum' },
      { text: 'Black Pepper Crushed Water Chestnut Dimsum' },
      { text: 'Exotic Vegetable Dimsum Beetroot Dimsum' },
      { text: 'Chives and Chicken Dimsum', highlight: true },
      { text: 'Prawns Hargao', highlight: true },
      { text: 'Served with Chilli Oil, Sesame Tomato, Scallion Sauce' },
    ],
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam Station',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇳🇱', city: 'Amsterdam', country: 'Netherlands', code: 'nl' },
    items: [
      { text: 'Hot Dog' },
      { text: 'New York Cheese Hot Dogs' },
      { text: 'Chicken Sausage Hot Dog', highlight: true },
      { text: 'Peri Peri / Cheesy Fries' },
      { text: 'Potato Wedges' },
      { text: 'Cottage Cheese Slider' },
      { text: 'Falafel Slider', highlight: true },
      { text: 'Chicken Slider', highlight: true },
    ],
  },
  {
    id: 'sushi',
    name: 'Sushi Station',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇯🇵', city: 'Osaka', country: 'Japan', code: 'jp' },
    items: [
      { text: 'Asparagus Cream Cheese Maki, Carrot, Radish, Cucumber Roll' },
      { text: 'Red and Green Pepper Nigri' },
      { text: 'Spicy Avocado Roll' },
      { text: 'Dragon Chicken', highlight: true },
      { text: 'Tempura Crispy Prawn Roll / Norwegian Smoked Salmon', highlight: true },
      { text: 'Served with Soya Sauce, Gari' },
    ],
  },
  {
    id: 'mexican',
    name: 'Mexican Station',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇲🇽', city: 'Mexico City', country: 'Mexico', code: 'mx' },
    items: [
      { text: 'Crispy Corn Easy Veggie Tacos' },
      { text: 'Mushroom & Cheese Quesadillas' },
      { text: 'Guacamole Chicken Tacos', highlight: true },
      { text: 'Cajun Spice Chicken Quesadillas', highlight: true },
    ],
    accompaniments: [{ text: 'Salsa (Watermelon / Pineapple / Tomato)' }],
  },
  {
    id: 'continental',
    name: 'Continental',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇪🇺', city: 'Paris', country: 'Europe', code: 'fr' },
    items: [
      { text: 'Exotic Veg Shashlik' },
      { text: 'Grilled Pineapple in BBQ Sauce' },
      { text: 'Grilled Mushroom in Porchini Sauce' },
      { text: 'Orange Dijon Grilled Chicken', highlight: true },
      { text: 'Huli Huli Chicken / Grilled Chicken Piccata', highlight: true },
      { text: 'Grilled Fish Parsley Lemon Butter Sauce', highlight: true },
    ],
  },
  {
    id: 'avocado',
    name: 'Avocado Bar',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🥑', city: 'California', country: 'USA', code: 'us' },
    items: [
      { text: 'Avocado, Cream Cheese and Roasted Pumpkin Seed Brochette' },
      { text: 'Sliced Avocado with Tangy Sauce' },
      { text: 'Avocado, Cranberry, Walnut Salad' },
      { text: 'Stuffed Greek Avocado with Lemon Dressing' },
      { text: 'Chicken Brochette with Guacamole', highlight: true },
      { text: 'Stuffed Avocado with Flavored Chicken', highlight: true },
    ],
  },
  {
    id: 'pasta',
    name: 'Gourmet Pasta',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇮🇹', city: 'Rome', country: 'Italy', code: 'it' },
    items: [
      { text: 'Handmade Pasta' },
      { text: 'Truffle Scented Wild Mushroom Ravioli (in Porchini Sauce)' },
      { text: 'Garlic Boursin with Shiitake Mushroom and Chicken Tortellini (in Pomodoro Sauce)', highlight: true },
      { text: 'Variety of Pastas (Penne / Fusilli / Spaghetti)' },
    ],
  },
  {
    id: 'korean',
    name: 'Korean Station',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=700&h=420&fit=crop&q=80',
    origin: { flag: '🇰🇷', city: 'Seoul', country: 'Korea', code: 'kr' },
    items: [
      { text: 'Korean Easy Veggie Bao' },
      { text: 'Tteobokki Rice Cake' },
      { text: 'Korean Fried BBQ Chicken Bulgogi Bao', highlight: true },
      { text: 'Korean Style Chicken Wrap in Rice Sheet' },
      { text: 'Tteobokki Chicken', highlight: true },
    ],
    accompaniments: [{ text: 'Green Chilli Pepper Pickle' }],
  },
];

// Flower image decoration using the actual asset
const FlowerDecor = ({ size = 90, rotate = 0, opacity = 0.85 }: { size?: number; rotate?: number; opacity?: number }) => (
  <img
    src={flowerImg}
    alt=""
    style={{ width: size, height: 'auto', transform: `rotate(${rotate}deg)`, opacity, display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}
  />
);



const StationCard = ({ station, reverse }: { station: Station; reverse: boolean }) => {
  const flowerSide = reverse ? 'left' : 'right';
  const clipId = `torn-${station.id}`;

  // Each card gets a unique organic torn path using cubic beziers
  // Path traces: top-left → top-right (jagged top) → right side (jagged) → bottom-right → bottom-left (jagged bottom) → left side (jagged) → close
  // Using a 1000×400 coordinate space
  const tornPaths: Record<string, string> = {
    teppanyaki:   'M 8,12 C 30,0 55,18 80,6 C 110,0 130,14 160,4 C 195,0 220,16 255,3 C 285,0 310,12 345,5 C 375,0 400,14 435,2 C 465,0 490,16 525,4 C 555,0 580,12 615,6 C 645,0 670,14 705,3 C 735,0 760,16 795,5 C 825,0 850,12 885,4 C 915,0 940,14 975,6 C 990,8 1000,0 1000,0 C 1002,35 998,80 1003,115 C 998,150 1004,185 999,220 C 1003,255 997,290 1002,325 C 998,360 1003,385 1000,400 C 975,392 950,400 920,395 C 890,400 860,393 830,398 C 800,400 770,394 740,399 C 710,400 680,393 650,397 C 620,400 590,394 560,398 C 530,400 500,393 470,397 C 440,400 410,394 380,399 C 350,400 320,393 290,397 C 260,400 230,394 200,398 C 170,400 140,393 110,397 C 80,400 50,394 20,398 C 0,400 0,400 0,400 C -2,370 2,340 -3,310 C 2,280 -2,250 3,220 C -2,190 2,160 -3,130 C 2,100 -2,70 3,40 C -2,20 0,0 8,12 Z',
    dimsum:       'M 5,8 C 35,0 60,15 95,4 C 125,0 150,18 185,5 C 215,0 240,14 275,3 C 305,0 330,16 365,6 C 395,0 420,12 455,4 C 485,0 510,18 545,3 C 575,0 600,14 635,5 C 665,0 690,16 725,4 C 755,0 780,12 815,6 C 845,0 870,14 905,3 C 935,0 960,16 995,5 C 1000,4 1000,0 1000,0 C 1003,40 997,85 1002,120 C 998,155 1003,190 998,225 C 1003,260 997,295 1002,330 C 998,365 1002,390 1000,400 C 970,396 940,400 910,394 C 880,400 850,395 820,400 C 790,395 760,400 730,394 C 700,400 670,395 640,400 C 610,395 580,400 550,394 C 520,400 490,395 460,400 C 430,395 400,400 370,394 C 340,400 310,395 280,400 C 250,395 220,400 190,394 C 160,400 130,395 100,400 C 70,395 40,400 10,394 C 0,396 0,400 0,400 C -3,365 1,330 -2,295 C 3,260 -1,225 2,190 C -3,155 1,120 -2,85 C 3,50 -1,15 5,8 Z',
    amsterdam:    'M 12,5 C 40,0 65,16 100,3 C 130,0 155,14 190,6 C 220,0 245,18 280,4 C 310,0 335,12 370,5 C 400,0 425,16 460,3 C 490,0 515,14 550,6 C 580,0 605,18 640,4 C 670,0 695,12 730,5 C 760,0 785,16 820,3 C 850,0 875,14 910,6 C 940,0 965,18 1000,4 C 1000,0 1000,0 1000,0 C 1002,45 998,90 1003,125 C 998,160 1004,195 999,230 C 1003,265 997,300 1002,335 C 998,370 1003,395 1000,400 C 965,396 930,400 895,394 C 860,400 825,395 790,400 C 755,395 720,400 685,394 C 650,400 615,395 580,400 C 545,395 510,400 475,394 C 440,400 405,395 370,400 C 335,395 300,400 265,394 C 230,400 195,395 160,400 C 125,395 90,400 55,394 C 30,400 10,396 0,400 C -2,375 2,345 -3,315 C 2,285 -2,255 3,225 C -2,195 2,165 -3,135 C 2,105 -2,75 3,45 C -2,25 0,0 12,5 Z',
    sushi:        'M 6,14 C 28,0 58,16 88,5 C 118,0 148,14 178,4 C 208,0 238,18 268,3 C 298,0 328,12 358,6 C 388,0 418,16 448,4 C 478,0 508,14 538,5 C 568,0 598,18 628,3 C 658,0 688,12 718,6 C 748,0 778,16 808,4 C 838,0 868,14 898,5 C 928,0 958,18 988,4 C 1000,2 1000,0 1000,0 C 1003,38 997,78 1002,118 C 998,158 1003,198 998,238 C 1003,278 997,318 1002,358 C 998,378 1002,400 1000,400 C 972,394 944,400 916,395 C 888,400 860,394 832,399 C 804,400 776,394 748,399 C 720,400 692,394 664,399 C 636,400 608,394 580,399 C 552,400 524,394 496,399 C 468,400 440,394 412,399 C 384,400 356,394 328,399 C 300,400 272,394 244,399 C 216,400 188,394 160,399 C 132,400 104,394 76,399 C 48,400 20,394 0,400 C -2,372 2,342 -3,312 C 2,282 -2,252 3,222 C -2,192 2,162 -3,132 C 2,102 -2,72 3,42 C -2,22 0,0 6,14 Z',
    mexican:      'M 10,6 C 38,0 62,18 92,4 C 122,0 152,14 182,5 C 212,0 242,16 272,3 C 302,0 332,12 362,6 C 392,0 422,18 452,4 C 482,0 512,14 542,5 C 572,0 602,16 632,3 C 662,0 692,12 722,6 C 752,0 782,18 812,4 C 842,0 872,14 902,5 C 932,0 962,16 992,3 C 1000,2 1000,0 1000,0 C 1002,42 998,88 1003,122 C 998,158 1004,192 999,228 C 1003,262 997,298 1002,332 C 998,368 1003,392 1000,400 C 968,396 936,400 904,394 C 872,400 840,395 808,400 C 776,395 744,400 712,394 C 680,400 648,395 616,400 C 584,395 552,400 520,394 C 488,400 456,395 424,400 C 392,395 360,400 328,394 C 296,400 264,395 232,400 C 200,395 168,400 136,394 C 104,400 72,395 40,400 C 20,396 5,400 0,400 C -3,368 1,336 -2,304 C 3,272 -1,240 2,208 C -3,176 1,144 -2,112 C 3,80 -1,48 10,6 Z',
    continental:  'M 4,10 C 32,0 56,16 86,5 C 116,0 146,14 176,4 C 206,0 236,18 266,3 C 296,0 326,12 356,6 C 386,0 416,16 446,4 C 476,0 506,14 536,5 C 566,0 596,18 626,3 C 656,0 686,12 716,6 C 746,0 776,16 806,4 C 836,0 866,14 896,5 C 926,0 956,18 986,4 C 1000,2 1000,0 1000,0 C 1003,36 997,76 1002,116 C 998,156 1003,196 998,236 C 1003,276 997,316 1002,356 C 998,376 1002,400 1000,400 C 970,394 940,400 910,395 C 880,400 850,394 820,399 C 790,400 760,394 730,399 C 700,400 670,394 640,399 C 610,400 580,394 550,399 C 520,400 490,394 460,399 C 430,400 400,394 370,399 C 340,400 310,394 280,399 C 250,400 220,394 190,399 C 160,400 130,394 100,399 C 70,400 40,394 10,399 C 0,400 0,400 0,400 C -2,370 2,338 -3,306 C 2,274 -2,242 3,210 C -2,178 2,146 -3,114 C 2,82 -2,50 4,10 Z',
    avocado:      'M 7,9 C 36,0 60,17 90,4 C 120,0 150,15 180,5 C 210,0 240,17 270,3 C 300,0 330,13 360,6 C 390,0 420,17 450,4 C 480,0 510,15 540,5 C 570,0 600,17 630,3 C 660,0 690,13 720,6 C 750,0 780,17 810,4 C 840,0 870,15 900,5 C 930,0 960,17 990,3 C 1000,2 1000,0 1000,0 C 1002,44 998,92 1003,128 C 998,164 1004,198 999,234 C 1003,268 997,304 1002,338 C 998,372 1003,396 1000,400 C 966,396 932,400 898,394 C 864,400 830,395 796,400 C 762,395 728,400 694,394 C 660,400 626,395 592,400 C 558,395 524,400 490,394 C 456,400 422,395 388,400 C 354,395 320,400 286,394 C 252,400 218,395 184,400 C 150,395 116,400 82,394 C 48,400 24,396 0,400 C -3,366 1,332 -2,298 C 3,264 -1,230 2,196 C -3,162 1,128 -2,94 C 3,60 -1,26 7,9 Z',
    pasta:        'M 9,7 C 34,0 64,18 94,4 C 124,0 154,14 184,5 C 214,0 244,16 274,3 C 304,0 334,12 364,6 C 394,0 424,18 454,4 C 484,0 514,14 544,5 C 574,0 604,16 634,3 C 664,0 694,12 724,6 C 754,0 784,18 814,4 C 844,0 874,14 904,5 C 934,0 964,16 994,3 C 1000,2 1000,0 1000,0 C 1002,40 998,84 1003,120 C 998,156 1004,192 999,228 C 1003,264 997,300 1002,336 C 998,372 1003,396 1000,400 C 964,396 928,400 892,394 C 856,400 820,395 784,400 C 748,395 712,400 676,394 C 640,400 604,395 568,400 C 532,395 496,400 460,394 C 424,400 388,395 352,400 C 316,395 280,400 244,394 C 208,400 172,395 136,400 C 100,395 64,400 28,394 C 10,400 0,396 0,400 C -2,364 2,328 -3,292 C 2,256 -2,220 3,184 C -2,148 2,112 -3,76 C 2,40 -2,10 9,7 Z',
    korean:       'M 11,4 C 38,0 66,16 96,5 C 126,0 156,14 186,4 C 216,0 246,18 276,3 C 306,0 336,12 366,6 C 396,0 426,16 456,4 C 486,0 516,14 546,5 C 576,0 606,18 636,3 C 666,0 696,12 726,6 C 756,0 786,16 816,4 C 846,0 876,14 906,5 C 936,0 966,18 996,3 C 1000,2 1000,0 1000,0 C 1002,46 998,94 1003,130 C 998,166 1004,200 999,236 C 1003,270 997,306 1002,340 C 998,374 1003,398 1000,400 C 962,396 924,400 886,394 C 848,400 810,395 772,400 C 734,395 696,400 658,394 C 620,400 582,395 544,400 C 506,395 468,400 430,394 C 392,400 354,395 316,400 C 278,395 240,400 202,394 C 164,400 126,395 88,400 C 50,395 22,400 0,400 C -3,362 1,324 -2,286 C 3,248 -1,210 2,172 C -3,134 1,96 -2,58 C 3,28 -1,8 11,4 Z',
  };

  const path = tornPaths[station.id] || tornPaths['teppanyaki'];

  return (
    <div className="relative" style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.13))' }}>
      {/* SVG clip definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox"
            transform={`scale(${1/1000} ${1/400})`}>
            <path d={path} />
          </clipPath>
        </defs>
      </svg>

      {/* The torn-paper card */}
      <div
        className={`relative flex ${reverse ? 'flex-row-reverse' : 'flex-row'} items-stretch w-full`}
        style={{ minHeight: 260, clipPath: `url(#${clipId})` }}
      >

      {/* ── Photo panel ── */}
      <div className="relative flex-shrink-0 w-[42%] overflow-hidden">
        <img
          src={station.image}
          alt={station.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          style={{ minHeight: 240 }}
        />
        {/* Wavy fade blending into parchment — wide soft gradient */}
        {!reverse && (
          <svg
            className="absolute inset-y-0 right-0 h-full pointer-events-none"
            style={{ width: 180 }}
            viewBox="0 0 180 300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fadeR" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%"   stopColor="hsl(46,60%,94%)" stopOpacity="0" />
                <stop offset="40%"  stopColor="hsl(46,60%,94%)" stopOpacity="0.15" />
                <stop offset="70%"  stopColor="hsl(46,60%,94%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(46,60%,94%)" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 C40,40 120,30 90,90 C60,150 150,160 110,210 C80,250 30,260 80,300 L180,300 L180,0 Z"
              fill="url(#fadeR)"
            />
          </svg>
        )}
        {reverse && (
          <svg
            className="absolute inset-y-0 left-0 h-full pointer-events-none"
            style={{ width: 180 }}
            viewBox="0 0 180 300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fadeL" x1="1" x2="0" y1="0" y2="0">
                <stop offset="0%"   stopColor="hsl(46,60%,94%)" stopOpacity="0" />
                <stop offset="40%"  stopColor="hsl(46,60%,94%)" stopOpacity="0.15" />
                <stop offset="70%"  stopColor="hsl(46,60%,94%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(46,60%,94%)" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M180,0 C140,40 60,30 90,90 C120,150 30,160 70,210 C100,250 150,260 100,300 L0,300 L0,0 Z"
              fill="url(#fadeL)"
            />
          </svg>
        )}
      </div>

      {/* ── Parchment menu panel ── */}
      <div
        className="relative flex-1 flex flex-col justify-center px-10 py-8 text-center"
        style={{
          background: 'hsl(46,60%,94%)',
        }}
      >
        {/* Station title */}
        <h3 className="font-heading font-bold tracking-[0.2em] uppercase mb-2 text-base md:text-lg" style={{ color: '#8B6914' }}>
          {station.name}
        </h3>
        <div className="w-16 h-px mx-auto mb-5" style={{ background: '#C4952A' }} />

        {/* Menu items */}
        <ul className="space-y-2">
          {station.items.map((item, i) => (
            <li
              key={i}
              className={`text-xs md:text-[11px] tracking-widest uppercase leading-snug ${
                item.highlight ? 'font-semibold' : 'text-stone-600'
              }`}
              style={item.highlight ? { color: '#c0392b' } : {}}
            >
              {item.text}
            </li>
          ))}
        </ul>

        {station.accompaniments && (
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-700 mb-1">Accompaniments</p>
            {station.accompaniments.map((a, i) => (
              <p key={i} className="text-[10px] uppercase tracking-widest text-stone-500">{a.text}</p>
            ))}
          </div>
        )}
      </div>

      {/* ── Decorative flower — inside clip (removed, moved outside) ── */}
    </div>

      {/* ── Flower sits ABOVE the card — outside clip-path ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          [flowerSide]: -24,
          bottom: -20,
          width: 100,
          zIndex: 20,
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.22)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
        }}
      >
        <FlowerDecor size={100} rotate={reverse ? 15 : -15} opacity={0.95} />
      </div>
    </div>
  );
};

const InternationalCuisineStations = () => (
  <section className="py-24 relative overflow-hidden bg-background">
    {/* Floating background flowers — large, blurred, ghostly */}
    <div className="absolute top-20 left-8 pointer-events-none" style={{ opacity: 0.12, filter: 'blur(8px)' }}>
      <FlowerDecor size={320} rotate={-10} opacity={1} />
    </div>
    <div className="absolute top-1/3 right-10 pointer-events-none" style={{ opacity: 0.10, filter: 'blur(10px)' }}>
      <FlowerDecor size={280} rotate={15} opacity={1} />
    </div>
    <div className="absolute bottom-40 left-1/3 pointer-events-none" style={{ opacity: 0.09, filter: 'blur(12px)' }}>
      <FlowerDecor size={260} rotate={5} opacity={1} />
    </div>
    <div className="absolute bottom-10 right-1/4 pointer-events-none" style={{ opacity: 0.11, filter: 'blur(8px)' }}>
      <FlowerDecor size={240} rotate={-18} opacity={1} />
    </div>
    <div className="absolute top-2/3 left-10 pointer-events-none" style={{ opacity: 0.08, filter: 'blur(14px)' }}>
      <FlowerDecor size={300} rotate={8} opacity={1} />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Header */}
      <div className="mb-16 animate-fade-in">
        <div className="w-16 h-1 bg-accent mb-6" />
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary tracking-tight leading-none">
          International<br />Cuisine Stations
        </h2>
      </div>

      {/* Zigzag off-grid */}
      <div className="flex flex-col gap-10">
        {stations.map((station, i) => {
          const isReverse = i % 2 !== 0;
          return (
            <div key={station.id} className="relative flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>

              {/* Origin tag — fills the empty side */}
              <div
                className={`hidden md:flex flex-col items-center justify-center gap-2 flex-shrink-0 ${isReverse ? 'order-first' : 'order-last'}`}
                style={{ width: '18%' }}
              >
                <img
                  src={`https://flagcdn.com/w80/${station.origin.code}.png`}
                  alt={station.origin.country}
                  className="rounded shadow-md"
                  style={{ width: 56, height: 'auto', objectFit: 'cover' }}
                />
                <div className="text-center">
                  <p className="font-heading font-bold text-sm tracking-widest uppercase" style={{ color: '#8B6914' }}>
                    {station.origin.city}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-stone-400 mt-0.5">
                    {station.origin.country}
                  </p>
                </div>
                <div className="w-8 h-px" style={{ background: '#C4952A', opacity: 0.5 }} />
              </div>

              {/* Card */}
              <div style={{ width: '82%', maxWidth: 900 }}>
                <StationCard station={station} reverse={isReverse} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default InternationalCuisineStations;
