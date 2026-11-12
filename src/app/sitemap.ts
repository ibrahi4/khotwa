
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { areas } from "@/config/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0 },

    {
      url: `${baseUrl}/services`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap =
    services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      priority: 0.9,
    }));

  const areaPages: MetadataRoute.Sitemap =
    areas.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}`,
      priority: 0.85,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...areaPages,
  ];
}
