
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const protectedPaths = [
    "/api/",
    "/admin/",
    "/private/",
  ];

  return {
    rules: [
      // General search engine crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          ...protectedPaths,
          "/thank-you",
        ],
      },

      // OpenAI ChatGPT Search crawler
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: protectedPaths,
      },

      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          ...protectedPaths,
          "/thank-you",
        ],
      },

      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 2,
      },

      // DuckDuckGo
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },

      // Yandex
      {
        userAgent: "YandexBot",
        allow: "/",
        crawlDelay: 3,
      },
    ],

    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,

    host: siteConfig.url.replace(/\/$/, ""),
  };
}
