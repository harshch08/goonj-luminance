export interface ServiceImage {
  src: string;
  alt: string;
}

export interface ServiceOption {
  title: string;
  description?: string;
  image: ServiceImage;
  features?: string[];
}

export interface ServicePortfolioItem {
  images: ServiceImage[];
  title?: string;
  subtitle?: string;
}

export interface ConceptShowcase {
  title: string;
  subtitle?: string;
  images: ServiceImage[];
  layout?: "default" | "threeColumn" | "masonry";
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  heroImages: ServiceImage[];
  options?: ServiceOption[];
  optionsTitle?: string;
  conceptShowcase?: ConceptShowcase;
  features?: string[];
  benefits?: string[];
}

export interface ServicesDataCollection {
  [key: string]: ServiceData;
}
