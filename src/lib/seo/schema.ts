import { siteConfig } from "@/config/site";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const LOGO_OBJECT = {
  "@type": "ImageObject" as const,
  url: `${siteConfig.url}/logo.webp`,
  width: 512,
  height: 512,
  caption: siteConfig.name,
};

const POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "التجمع الخامس",
  addressLocality: siteConfig.city,
  addressRegion: siteConfig.region,
  postalCode: siteConfig.postalCode,
  addressCountry: {
    "@type": "Country" as const,
    name: siteConfig.countryCode,
  },
};

const PROVIDER_REFERENCE = {
  "@type": "MovingCompany" as const,
  "@id": ORG_ID,
  name: siteConfig.name,
  telephone: siteConfig.phoneIntl,
  url: siteConfig.url,
    hasMap: "https://g.page/r/CdCTBbp7TvxgEAI",
    sameAs: ["https://g.page/r/CdCTBbp7TvxgEAI"],
  logo: `${siteConfig.url}/logo.webp`,
};

const AGGREGATE_RATING = {
  "@type": "AggregateRating" as const,
  ratingValue: siteConfig.ratings.value.toString(),
  reviewCount: siteConfig.ratings.count.toString(),
  bestRating: siteConfig.ratings.best.toString(),
  worstRating: "1",
};

export function generateLocalBusinessSchema() {
  const reviews = [
    {
      name: "أحمد محمد",
      body: "خدمة استثنائية، نقلوا فيلتي في التجمع الخامس بكل احترافية والتغليف كان ممتاز.",
      date: "2024-12-15"
    },
    {
      name: "سارة عبدالله",
      body: "التزام بالمواعيد وأسعار شفافة، نقلوا عفش شقتي من مدينتي للشيخ زايد بدون أي خدش.",
      date: "2024-11-20"
    },
    {
      name: "محمود حسن",
      body: "فريق محترف ومدرب، تعاملوا مع النجف والتحف بحرص شديد. خدمة تستحق كل جنيه.",
      date: "2024-10-05"
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "LocalBusiness"],
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "Khotwa Moving", "Khatwa Moving", "خطوة"],
    description: siteConfig.description,
    url: siteConfig.url,
    hasMap: "https://g.page/r/CdCTBbp7TvxgEAI",
    sameAs: ["https://g.page/r/CdCTBbp7TvxgEAI"],
    logo: LOGO_OBJECT,
    image: [`${siteConfig.url}/herosection.webp`],
    telephone: siteConfig.phoneIntl,
    email: siteConfig.email,
    address: POSTAL_ADDRESS,
    priceRange: "$$$",
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    aggregateRating: AGGREGATE_RATING,
    review: reviews.map(r => ({
      "@type": "Review",
      itemReviewed: {
        "@type": "MovingCompany",
        name: siteConfig.name,
        image: `${siteConfig.url}/logo.webp`,
        telephone: siteConfig.phoneIntl,
        address: POSTAL_ADDRESS
      },
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: r.body,
    })),
    areaServed: ["القاهرة", "الجيزة", "التجمع الخامس", "الشيخ زايد", "مدينتي", "6 أكتوبر"]
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    hasMap: "https://g.page/r/CdCTBbp7TvxgEAI",
    sameAs: ["https://g.page/r/CdCTBbp7TvxgEAI"],
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "ar-EG"
  };
}

export function generateServiceSchema(name: string, desc: string, url: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: desc,
    url,
    image: image || `${siteConfig.url}/logo.webp`,
    provider: { "@id": ORG_ID }
  };
}

export function generateAreaSchema(name: string, desc: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `نقل أثاث ${name}`,
    description: desc,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name }
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}