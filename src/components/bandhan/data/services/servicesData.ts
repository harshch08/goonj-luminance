import { ServicesDataCollection } from "./types";
import { serviceImages } from "./servicesImages";

export const servicesData: ServicesDataCollection = {
  destinationWeddings: {
    id: "destination-weddings",
    slug: "destination-weddings",
    title: "DESTINATION WEDDINGS",
    subtitle: "Create unforgettable experiences in breathtaking locations worldwide",
    description: "Transform your dream destination into the perfect wedding venue. We specialize in creating magical celebrations in stunning locations, handling every detail from travel arrangements to local vendor coordination.",
    heroImages: serviceImages.destinationWeddings.hero,
    optionsTitle: "TYPES OF WEDDINGS AVAILABLE",
    options: [
      {
        title: "RIVERSIDE",
        description: "Serene waterfront ceremonies with natural beauty",
        image: serviceImages.destinationWeddings.weddingTypes[0],
      },
      {
        title: "INDOOR",
        description: "Elegant ballroom and venue celebrations",
        image: serviceImages.destinationWeddings.weddingTypes[1],
      },
      {
        title: "OUTDOOR",
        description: "Garden and open-air wedding experiences",
        image: serviceImages.destinationWeddings.weddingTypes[2],
      },
    ],
    features: [
      "Venue scouting and selection",
      "Travel and accommodation arrangements",
      "Local vendor coordination",
      "Cultural integration and customs",
      "Guest travel management",
      "Destination-specific permits and legalities",
    ],
    conceptShowcase: {
      title: "OUR PORTFOLIO",
      subtitle: "DESTINATION WEDDING DECOR IDEAS\nCAN BE RECREATED",
      images: serviceImages.destinationWeddings.conceptShowcase,
    },
  },

  photography: {
    id: "photography",
    slug: "photography",
    title: "PHOTOGRAPHY & VIDEOGRAPHY",
    subtitle: "Capture every precious moment with professional artistry",
    description: "Preserve your memories with our expert photography and videography services. Our talented team captures the emotion, beauty, and joy of your special day with artistic vision and technical excellence.",
    heroImages: serviceImages.photography.hero,
    features: [
      "Pre-wedding photo shoots",
      "Cinematic wedding films",
      "Drone photography and videography",
      "Same-day editing available",
      "Traditional and candid photography",
      "Photo albums and prints",
      "Highlight reels and full-length films",
      "Professional editing and color grading",
    ],
    conceptShowcase: {
      title: "OUR PORTFOLIO",
      subtitle: "PHOTOGRAPHY SETUP CONCEPTS\nCAN BE RECREATED",
      images: serviceImages.photography.conceptShowcase,
    },
  },

  catering: {
    id: "catering",
    slug: "catering",
    title: "CATERING & DECOR",
    subtitle: "Exquisite cuisine and stunning aesthetics for your event",
    description: "Delight your guests with exceptional culinary experiences and breathtaking decor. We combine gourmet cuisine with artistic presentation to create unforgettable dining experiences.",
    heroImages: serviceImages.catering.hero,
    options: [
      {
        title: "LEBANESE STATION",
        description: "Authentic Middle Eastern flavors",
        image: serviceImages.catering.cuisineStations[0],
        features: [
          "Falafel pita pockets",
          "Cottage cheese shawarma",
          "Classical chicken shawarma",
          "Accompaniments and salads",
        ],
      },
      {
        title: "BURRATA BAR",
        description: "Italian cheese delicacies",
        image: serviceImages.catering.cuisineStations[1],
        features: [
          "Burrata caprese bruschette",
          "Focaccia with mushroom and burrata",
          "Tomato pomegranate burrata salad",
          "Imported Italian burrata with accompaniments",
        ],
      },
      {
        title: "WOOD FIRED PIZZA",
        description: "Artisan pizzas made fresh",
        image: serviceImages.catering.cuisineStations[2],
        features: [
          "New York style margherita pizza",
          "Smoked arrabiata pizza",
          "Choice of various toppings",
          "Fresh from wood-fired oven",
        ],
      },
      {
        title: "INTERNATIONAL CUISINE STATIONS",
        description: "Global flavors at your event",
        image: serviceImages.catering.cuisineStations[3],
        features: [
          "Teppanyaki station",
          "Dimsum station",
          "Amsterdam station",
          "Custom international menus",
        ],
      },
    ],
    features: [
      "Branded food stalls (Bikaner, Haldirams, Barista)",
      "Custom menu design",
      "Floral arrangements and centerpieces",
      "Premium quality linens and tableware",
      "Live cooking stations",
      "Dietary accommodations",
    ],
    conceptShowcase: {
      title: "OUR PORTFOLIO",
      subtitle: "CATERING & DECOR CONCEPT SETUPS\nCAN BE RECREATED",
      images: serviceImages.catering.conceptShowcase,
    },
  },

  stageSetup: {
    id: "stage-setup",
    slug: "stage-setup",
    title: "STAGE SETUP & LIGHTING / SOUND",
    subtitle: "State-of-the-art audio-visual production",
    description: "Transform your venue with professional stage design, lighting, and sound systems. Our technical expertise ensures perfect ambiance and flawless audio-visual experiences for your guests.",
    heroImages: serviceImages.stageSetup.hero,
    features: [
      "Professional sound systems",
      "Ambient and dramatic lighting",
      "Custom stage design and construction",
      "Technical support throughout event",
      "LED screens and projections",
      "Wireless microphone systems",
      "DJ equipment and setup",
      "Lighting design and programming",
    ],
    conceptShowcase: {
      title: "OUR PORTFOLIO",
      subtitle: "STAGE SETUP CONCEPT DESIGNS\nCAN BE RECREATED",
      images: serviceImages.stageSetup.conceptShowcase,
    },
  },
};
