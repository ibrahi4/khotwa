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

/**
 * بيضمن إن اسم الشركة موجود دايماً في العنوان، بدل ما كل استدعاء
 * (هوم، منطقة، خدمة) يفتكر يضيفه بنفسه. ده اللي بيساعد جوجل يعرض
 * اسم الشركة في نتائج البحث بدل ما يلجأ لعرض الدومين الخام.
 */
function withBrand(title: string): string {
  return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
}

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
  const brandedTitle = withBrand(title);

  return {
    title: brandedTitle,
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
      title: brandedTitle,
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
          alt: brandedTitle,
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
      title: brandedTitle,
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
 * تنبيه مهم: الافتراضي القديم هنا كان فيه "خصم 30%" و"تقييم 4.9★ من
 * 500+ عميل" ثابتين كرقم مضمون لكل صفحة منطقة من غير override. الرقم
 * الحقيقي على Google Business Profile حالياً 4.5★ بـ8 تقييمات، ومفيش
 * تأكيد إن خصم الـ30% عرض شغال وموثّق. استخدام أرقام غير مطابقة للواقع
 * في وصف يظهر لكل الزوار في نتائج البحث مخاطرة مصداقية وسياسة، مش
 * تفصيل تجميلي. شلت الرقمين وخليت الوصف يعتمد على مزايا حقيقية بدل
 * أرقام غير موثّقة.
 *
 * "نفس اليوم" لسه موجودة بافتراض إنها خدمة حقيقية بتقدر تتعهد بيها؛
 * لو مش مضمونة لكل الحالات، بلّغني نعدلها لصيغة أعم زي "خدمة سريعة".
 */
export function buildAreaMetadata(area: {
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  return buildMetadata({
    title: area.metaTitle || `نقل أثاث ${area.name}`,
    description:
      area.metaDescription ||
      `نقل أثاث وعفش في ${area.name}: فرق مدربة، تغليف احترافي، ضمان شامل، ومعاينة مجانية قبل السعر النهائي. اتصل ${siteConfig.phone}`,
    path: `/areas/${area.slug}`,
    keywords: getAreaKeywords(area.name),
  });
}

/**
 * Helper: Build metadata for service pages
 *
 * نفس التصحيح المطبّق في buildAreaMetadata، ونفس السبب بالظبط.
 */
export function buildServiceMetadata(service: {
  name: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  return buildMetadata({
    title: service.metaTitle || service.name,
    description:
      service.metaDescription ||
      `${service.name} من خطوة بأعلى معايير الجودة والأمان، فريق مدرب وضمان شامل ومعاينة مجانية. اتصل ${siteConfig.phone}`,
    path: `/services/${service.slug}`,
    keywords: getServiceKeywords(service.name),
  });
}