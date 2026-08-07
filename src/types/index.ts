export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  metaTitle: string;
  metaDescription: string;
  icon?: string;
  features?: string[];
  benefits?: { title: string; description: string }[];
  process?: { step: number; title: string; description: string }[];
  faqs?: FAQ[];
  priceRange?: string;
  suitableFor?: string[];
  includedServices?: string[];
};

export type Area = {
  slug: string;
  name: string;
  group: "cairo" | "giza" | "new-cities";
  isVip?: boolean;
  metaTitle: string;
  metaDescription: string;
  description?: string;
  longDescription?: string;
  compounds?: string[];
  neighborhoods?: string[];
  highlights?: string[];
  challenges?: string[];
  whyChooseUs?: { title: string; description: string }[];
  faqs?: FAQ[];
  nearbyAreas?: string[];
};

export type Governorate = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  cities?: City[];
};

export type City = {
  slug: string;
  name: string;
  governorate: string;
  metaTitle: string;
  metaDescription: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type BlogCategory = {
  slug: string;
  name: string;
};