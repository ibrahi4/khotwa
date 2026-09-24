import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getAreaKeywords, getServiceKeywords } from "@/config/seo-keywords";

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
  image = "/logo.webp",
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
 *
 * الافتراضي هنا بيتغطى بيه أي صفحة منطقة ملهاش عنوان/وصف مخصص —
 * وده معظم صفحات /areas/* حاليًا. العنوان والوصف مبنيين على
 * عناصر جذب فعلية (سرعة + خصم + تقييم + رقم مباشر) بدل الوصف
 * العام القديم اللي كان بيجيب ظهور بدون نقرات.
 */
export function buildAreaMetadata(area: {
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  return buildMetadata({
    title:
      area.metaTitle ||
      `نقل أثاث ${area.name} نفس اليوم | خطوة - خصم 30%`,
    description:
      area.metaDescription ||
      `خطوة لنقل الأثاث في ${area.name}: تنفيذ من نفس اليوم، فرق مدربة وتغليف احترافي وضمان كامل. تقييم 4.9★ من 500+ عميل. خصم 30% لفترة محدودة. اتصل ${siteConfig.phone}`,
    path: `/areas/${area.slug}`,
    keywords: getAreaKeywords(area.name),
  });
}

/**
 * Helper: Build metadata for service pages
 *
 * ملاحظة: كل الخدمات الـ 6 الحالية عندها metaTitle/metaDescription
 * مخصص في config/services.ts، فالافتراضي هنا بيشتغل بس لو
 * اتضافت خدمة جديدة من غير ما حد يحدد لها عنوان/وصف بنفسه.
 */
export function buildServiceMetadata(service: {
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  return buildMetadata({
    title:
      service.metaTitle ||
      `${service.name} نفس اليوم | خطوة - خصم 30%`,
    description:
      service.metaDescription ||
      `${service.name} من خطوة بأعلى معايير الجودة والأمان، تنفيذ سريع وضمان كامل. تقييم 4.9★ من 500+ عميل. خصم 30% حاليًا. اتصل ${siteConfig.phone}`,
    path: `/services/${service.slug}`,
    keywords: getServiceKeywords(service.name),
  });
}