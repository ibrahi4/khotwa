import { siteConfig } from "@/config/site";

// ============================================================
// SHARED CONSTANTS (DRY Principle)
// ============================================================
const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const LOGO_OBJECT = {
  "@type": "ImageObject" as const,
  url: `${siteConfig.url}/logo.webp`,
  width: 512,
  height: 512,
  caption: siteConfig.name,
};

const PROVIDER_REFERENCE = {
  "@type": "MovingCompany" as const,
  "@id": ORG_ID,
  name: siteConfig.name,
  telephone: siteConfig.phoneIntl,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.webp`,
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

const AGGREGATE_RATING = {
  "@type": "AggregateRating" as const,
  ratingValue: siteConfig.ratings.value.toString(),
  reviewCount: siteConfig.ratings.count.toString(),
  bestRating: siteConfig.ratings.best.toString(),
  worstRating: "1",
};

// ============================================================
// 1. LocalBusiness / MovingCompany Schema (Main Entity)
// ============================================================
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "LocalBusiness"],
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "Khotwa Moving", "Khatwa Moving", "خطوة"],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: LOGO_OBJECT,
    image: [
      `${siteConfig.url}/logo.webp`,
      `${siteConfig.url}/herosection.webp`,
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
    address: POSTAL_ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${siteConfig.coordinates.latitude},${siteConfig.coordinates.longitude}`,
    areaServed: [
      { "@type": "Country", name: "مصر", alternateName: "Egypt" },
      { "@type": "AdministrativeArea", name: "القاهرة" },
      { "@type": "AdministrativeArea", name: "الجيزة" },
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
    // ✅ aggregateRating صحيح هنا (LocalBusiness مسموح)
    aggregateRating: AGGREGATE_RATING,
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "أحمد محمد" },
        datePublished: "2024-12-15",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "خدمة استثنائية، نقلوا فيلتي في التجمع الخامس بكل احترافية والتغليف كان ممتاز.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "سارة عبدالله" },
        datePublished: "2024-11-20",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "التزام بالمواعيد وأسعار شفافة، نقلوا عفش شقتي من مدينتي للشيخ زايد بدون أي خدش.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "محمود حسن" },
        datePublished: "2024-10-05",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
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
            provider: { "@id": ORG_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "فك وتركيب الأثاث",
            description: "فك وتركيب جميع أنواع الأثاث بدقة واحترافية",
            provider: { "@id": ORG_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "فك وتركيب التكييفات",
            description: "خبراء فك ونقل وإعادة تركيب جميع أنواع التكييفات",
            provider: { "@id": ORG_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "تغليف الأثاث",
            description: "تغليف احترافي بمواد عالية الجودة",
            provider: { "@id": ORG_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ونش رفع الأثاث",
            description: "ونش رفع للأدوار المرتفعة والأماكن الضيقة",
            provider: { "@id": ORG_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "نقل المقتنيات الحساسة",
            description: "نقل الزجاج والنجف والتحف بأمان تام",
            provider: { "@id": ORG_ID },
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

// ============================================================
// 2. Service Schema (CLEAN - no aggregateRating)
// ============================================================
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
    image: serviceImage || `${siteConfig.url}/logo.webp`,
    provider: PROVIDER_REFERENCE,
    areaServed: {
      "@type": "Country",
      name: "مصر",
    },
    audience: {
      "@type": "Audience",
      audienceType: "سكان الكمبوندات والمدن الجديدة",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EGP",
      },
    },
    // ❌ تم حذف aggregateRating (غير مسموح في Service)
    // ✅ التقييم موجود في LocalBusiness Schema (الأساسي)
  };
}

// ============================================================
// 3. Area Schema (CLEAN - no aggregateRating)
// ============================================================
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
    provider: PROVIDER_REFERENCE,
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
    // ❌ تم حذف aggregateRating (غير مسموح في Service)
  };
}

// ============================================================
// 4. FAQ Schema
// ============================================================
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

// ============================================================
// 5. Breadcrumb Schema
// ============================================================
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

// ============================================================
// 6. Blog Post Schema
// ============================================================
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
        url: `${siteConfig.url}/logo.webp`,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.webp`,
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

// ============================================================
// 7. Website Schema
// ============================================================
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ar-EG",
    publisher: {
      "@id": ORG_ID,
    },
  };
}

// ============================================================
// 8. Organization Schema
// ============================================================
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.webp`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneIntl,
    address: POSTAL_ADDRESS,
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

// ============================================================
// 9. HowTo Schema
// ============================================================
export function generateHowToSchema(
  steps: { name: string; description: string; image?: string }[]
) {
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

// ============================================================
// 10. Article Schema
// ============================================================
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
        url: `${siteConfig.url}/logo.webp`,
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