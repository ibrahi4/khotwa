import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { areas } from "@/config/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // عدّل التاريخ ده لتاريخ آخر تحديث حقيقي لكل صفحة/مجموعة لو متاح عندك
  // (من الـ CMS أو من تاريخ آخر commit للملف). لحد ما يبقى عندك مصدر حقيقي،
  // سيبه كـ "آخر تحديث معروف" وحدّثه يدوي كل مرة تغيّر محتوى فعلي.
  const contentLastUpdated = new Date("2025-01-01");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: contentLastUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/areas`, lastModified: contentLastUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: contentLastUpdated, changeFrequency: "monthly", priority: 0.7 },
    // /blog نفسها (صفحة الفهرس) هتتغير كل ما تنشر مقال جديد، فخليها "أسبوعي"
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    // صفحتان قانونيتان، نادراً ما تتغيران وأولويتهما منخفضة عمداً
    { url: `${baseUrl}/privacy`, lastModified: contentLastUpdated, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: contentLastUpdated, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${baseUrl}/areas/${a.slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // TODO: لما /blog يبقى فيه مقالات فعلية، ضيف هنا:
  // const blogPages = posts.map((p) => ({ url: `${baseUrl}/blog/${p.slug}`, lastModified: p.updatedAt, ... }));

  return [...staticPages, ...servicePages, ...areaPages];
}