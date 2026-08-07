import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/private/",
          "/thank-you",
          "/*.json$",
          "/*?*utm_",
          "/*?*fbclid",
          "/*?*gclid",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/logo.jpeg", "/herosection.jpeg"],
      },
      {
        userAgent: "Googlebot-Video",
        allow: "/videos/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        crawlDelay: 5,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        crawlDelay: 3,
      },
      {
        // Block AI scrapers if needed (optional - remove if you want AI to see your content)
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web"],
        disallow: [],
      },
    ],
    sitemap: [`${siteConfig.url}/sitemap.xml`],
    host: siteConfig.url,
  };
}