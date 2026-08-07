import { siteConfig } from "@/config/site";

// ========================================
// 1. Main Business Schema (Enhanced)
// ========================================
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "Khotwa Moving", "Khatwa Moving", "خطوة"],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.jpeg`,
      width: 512,
      height: 512,
      caption: siteConfig.name,
    },
    image: [
      `${siteConfig.url}/logo.jpeg`,
      `${siteConfig.url}/herosection.jpeg`,
      `${siteConfig.url}/images/gallery/taghleef.webp`,
      `${siteConfig.url}/images/gallery/fareq-3amal.webp`,
      `${siteConfig.url}/images/gallery/tarkeeb.webp`,
    ],
    telephone: siteConfig.phoneIntl,
    email: siteConfig.email,
    foundingDate: siteConfig.foundingYear.toString(),
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 20,
      maxValue: 50,
    },
    priceRange: "$$$",
    slogan: "خدمة نقل أثاث تليق بمنزلك",
    address: {
      "@type": "PostalAddress",
      streetAddress: "التجمع الخامس",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: {
        "@type": "Country",
        name: siteConfig.countryCode,
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${siteConfig.coordinates.latitude},${siteConfig.coordinates.longitude}`,
    areaServed: [
      {
        "@type": "Country",
        name: "مصر",
        alternateName: "Egypt",
      },
      {
        "@type": "AdministrativeArea",
        name: "القاهرة",
      },
      {
        "@type": "AdministrativeArea",
        name: "الجيزة",
      },
      { "@type": "City", name: "التجمع الخامس" },
      { "@type": "City", name: "مدينتي" },
      { "@type": "City", name: "الشيخ زايد" },
      { "@type": "City", name: "6 أكتوبر" },
      { "@type": "City", name: "القاهرة الجديدة" },
      { "@type": "City", name: "العاصمة الإدارية" },
      { "@type": "City", name: "الرحاب" },
      { "@type": "City", name: "مدينة المستقبل" },
      { "@type": "City", name: "المعادي" },
      { "@type": "City", name: "مصر الجديدة" },
      { "@type": "City", name: "المهندسين" },
      { "@type": "City", name: "الزمالك" },
      { "@type": "City", name: "مدينة نصر" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday", "Sunday", "Monday", "Tuesday",
          "Wednesday", "Thursday", "Friday",
        ],
        opens: siteConfig.businessHours.open,
        closes: siteConfig.businessHours.close,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.ratings.value.toString(),
      reviewCount: siteConfig.ratings.count.toString(),
      bestRating: siteConfig.ratings.best.toString(),
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "أحمد محمد" },
        datePublished: "2024-12-15",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody: "خدمة استثنائية، نقلوا فيلتي في التجمع الخامس بكل احترافية والتغليف كان ممتاز. أنصح أي حد في الكمبوندات يتعامل معاهم.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "سارة عبدالله" },
        datePublished: "2024-11-20",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody: "التزام بالمواعيد وأسعار شفافة، نقلوا عفش شقتي من مدينتي للشيخ زايد بدون أي خدش. أنصح بالتعامل معهم.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "محمود حسن" },
        datePublished: "2024-10-05",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody: "فريق محترف ومدرب، تعاملوا مع النجف والتحف بحرص شديد. خدمة تستحق كل جنيه.",
      },
    ],
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "Vodafone Cash", "InstaPay"],
    currenciesAccepted: "EGP",
    sameAs: [
      siteConfig.socialMedia?.facebook,
      siteConfig.socialMedia?.instagram,
      siteConfig.socialMedia?.tiktok,
      siteConfig.socialMedia?.youtube,
    ].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات نقل الأثاث",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "نقل الأثاث",
            description: "نقل الأثاث والعفش بأمان في جميع محافظات مصر",
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "فك وتركيب الأثاث",
            description: "فك وتركيب جميع أنواع الأثاث بدقة واحترافية",
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "فك وتركيب التكييفات",
            description: "خبراء فك ونقل وإعادة تركيب جميع أنواع التكييفات",
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "تغليف الأثاث",
            description: "تغليف احترافي بمواد عالية الجودة",
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ونش رفع الأثاث",
            description: "ونش رفع للأدوار المرتفعة والأماكن الضيقة",
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "نقل المقتنيات الحساسة",
            description: "نقل الزجاج والنجف والتحف بأمان تام",
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        },
      ],
    },
    knowsAbout: [
      "نقل الأثاث",
      "نقل العفش",
      "فك وتركيب الأثاث",
      "تغليف الأثاث",
      "ونش رفع الأثاث",
      "نقل التكييفات",
      "نقل المقتنيات الحساسة",
      "شحن الأثاث",
      "تخزين الأثاث",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "معاينة مجانية",
        description: "معاينة مجانية في الموقع بدون أي التزام",
        price: "0",
        priceCurrency: "EGP",
      },
    ],
  };
}

// ========================================
// 2. Service Schema (Enhanced with pricing)
// ========================================
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  serviceImage?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    image: serviceImage || `${siteConfig.url}/logo.jpeg`,
    provider: {
      "@type": "MovingCompany",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      telephone: siteConfig.phoneIntl,
      logo: `${siteConfig.url}/logo.jpeg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressCountry: siteConfig.countryCode,
      },
    },
    areaServed: {
      "@type": "Country",
      name: "مصر",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceName,
    },
    audience: {
      "@type": "Audience",
      audienceType: "سكان الكمبوندات والمدن الجديدة",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EGP",
      },
      availability: "https://schema.org/InStock",
      availabilityStarts: `${new Date().getFullYear()}-01-01`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.ratings.value.toString(),
      reviewCount: siteConfig.ratings.count.toString(),
    },
  };
}

// ========================================
// 3. Area Schema (Enhanced with LocalBusiness)
// ========================================
export function generateAreaSchema(
  areaName: string,
  areaDescription: string,
  areaUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `نقل أثاث ${areaName}`,
    name: `خدمة نقل الأثاث في ${areaName}`,
    description: areaDescription,
    url: areaUrl,
    provider: {
      "@type": "MovingCompany",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      telephone: siteConfig.phoneIntl,
      logo: `${siteConfig.url}/logo.jpeg`,
    },
    areaServed: {
      "@type": "City",
      name: areaName,
      containedInPlace: {
        "@type": "Country",
        name: "مصر",
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.ratings.value.toString(),
      reviewCount: siteConfig.ratings.count.toString(),
    },
  };
}

// ========================================
// 4. FAQ Schema
// ========================================
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
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

// ========================================
// 5. Breadcrumb Schema
// ========================================
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
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

// ========================================
// 6. Blog Post Schema (Enhanced)
// ========================================
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  author: string;
  slug: string;
  readTime?: number;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: post.image,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.jpeg`,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.jpeg`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(", "),
    ...(post.readTime && {
      timeRequired: `PT${post.readTime}M`,
    }),
    inLanguage: "ar-EG",
  };
}

// ========================================
// 7. Website Schema (with Search)
// ========================================
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ar-EG",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

// ========================================
// 8. Organization Schema (Enhanced E-E-A-T)
// ========================================
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpeg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "التجمع الخامس",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.countryCode,
    },
    foundingDate: siteConfig.foundingYear.toString(),
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 20,
      maxValue: 50,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phoneIntl,
        contactType: "customer service",
        areaServed: "EG",
        availableLanguage: ["Arabic", "English"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.whatsapp}`,
        contactType: "sales",
        areaServed: "EG",
        availableLanguage: ["Arabic"],
      },
    ],
  };
}

// ========================================
// 9. HowTo Schema (لصفحات "كيف نعمل")
// ========================================
export function generateHowToSchema(steps: {
  name: string;
  description: string;
  image?: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "كيف نقوم بنقل أثاثك بأمان",
    description: "خطوات نقل الأثاث الاحترافية من خطوة لنقل الأثاث",
    totalTime: "PT4H",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.description,
      ...(step.image && { image: step.image }),
    })),
  };
}

// ========================================
// 10. Article Schema (للمقالات المتعمقة)
// ========================================
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  slug: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.jpeg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${article.slug}`,
    },
    articleSection: article.category,
    inLanguage: "ar-EG",
  };
}