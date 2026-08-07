import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
};

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/logo.jpeg",
  keywords,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: BuildMetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
      languages: {
        "ar-EG": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "ar_EG",
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: author ? [author] : [siteConfig.name],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: author || siteConfig.name, url: siteConfig.url }],
    other: {
      "geo.region": "EG-C",
      "geo.placename": "Cairo, Egypt",
      "geo.position": `${siteConfig.coordinates.latitude};${siteConfig.coordinates.longitude}`,
    },
  };
}

/**
 * Helper: Build metadata for area pages
 */
export function buildAreaMetadata(area: {
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  return buildMetadata({
    title: area.metaTitle || `نقل أثاث ${area.name} | خطوة - أفضل شركة نقل عفش`,
    description:
      area.metaDescription ||
      `خطوة لنقل الأثاث في ${area.name} - خدمة احترافية بأسعار منافسة، فرق مدربة، تغليف احترافي، وضمان كامل. اتصل الآن لعرض سعر مجاني.`,
    path: `/areas/${area.slug}`,
    keywords: [
      `نقل عفش ${area.name}`,
      `نقل أثاث ${area.name}`,
      `شركة نقل عفش ${area.name}`,
      `أفضل شركة نقل أثاث ${area.name}`,
      `أسعار نقل الأثاث ${area.name}`,
    ],
  });
}

/**
 * Helper: Build metadata for service pages
 */
export function buildServiceMetadata(service: {
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  return buildMetadata({
    title: service.metaTitle || `${service.name} | خطوة - خدمة احترافية`,
    description:
      service.metaDescription ||
      `${service.name} من خطوة لنقل الأثاث - خدمة احترافية بأعلى معايير الجودة والأمان. اتصل الآن لعرض سعر مجاني.`,
    path: `/services/${service.slug}`,
    keywords: [
      service.name,
      `${service.name} في مصر`,
      `${service.name} في القاهرة`,
      `${service.name} في التجمع الخامس`,
      `أفضل ${service.name}`,
      `شركة ${service.name}`,
    ],
  });
}