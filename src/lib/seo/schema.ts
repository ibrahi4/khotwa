import { siteConfig } from "@/config/site";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    image: `${siteConfig.url}/logo.webp`,
    logo: `${siteConfig.url}/logo.webp`,
    url: siteConfig.url,
    telephone: siteConfig.phoneIntl,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: siteConfig.businessHours.open,
        closes: siteConfig.businessHours.close,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(siteConfig.ratings.value),
      reviewCount: String(siteConfig.ratings.count),
      bestRating: String(siteConfig.ratings.best),
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ar-EG",
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "MovingCompany",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url,
    ...(image ? { image } : {}),
  };
}

export function generateAreaSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `نقل أثاث في ${name}`,
    description,
    serviceType: "نقل أثاث وعفش",
    areaServed: {
      "@type": "AdministrativeArea",
      name,
    },
    provider: {
      "@type": "MovingCompany",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url,
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  slug: string,
  image?: string,
  datePublished?: string,
  author?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteConfig.url}/blog/${slug}`,
    ...(image ? { image: `${siteConfig.url}${image}` } : {}),
    ...(datePublished ? { datePublished } : {}),
    author: {
      "@type": "Organization",
      name: author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.webp`,
      },
    },
  };
}

export function generateBlogPostSchema(
  titleOrPost: any,
  description?: string,
  slug?: string,
  image?: string,
  datePublished?: string,
  author?: string
) {
  if (typeof titleOrPost === "object" && titleOrPost !== null) {
    const post = titleOrPost;
    return generateArticleSchema(
      post.title || post.name || "",
      post.description || post.excerpt || post.shortDescription || "",
      post.slug || "",
      post.image || post.coverImage,
      post.datePublished || post.publishedAt || post.date,
      post.author
    );
  }

  return generateArticleSchema(
    String(titleOrPost || ""),
    description || "",
    slug || "",
    image,
    datePublished,
    author
  );
}