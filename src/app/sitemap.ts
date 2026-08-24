import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { areas } from "@/config/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticDate = new Date("2025-01-01");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/areas`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map(s => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: 0.9
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map(a => ({
    url: `${baseUrl}/areas/${a.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: 0.85
  }));

  return [...staticPages, ...servicePages, ...areaPages];
}