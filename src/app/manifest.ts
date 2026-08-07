import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF5EE",
    theme_color: "#E85D04",
    orientation: "portrait-primary",
    scope: "/",
    lang: "ar",
    dir: "rtl",
    categories: ["business", "moving", "transport", "services"],
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "اتصل بنا",
        short_name: "اتصال",
        description: "اتصل بخطوة لنقل الأثاث",
        url: "/contact",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "خدماتنا",
        short_name: "خدمات",
        description: "استعرض خدمات خطوة",
        url: "/services",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}