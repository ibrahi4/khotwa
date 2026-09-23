import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/private/", "/thank-you"],
      },
      {
        // نفس استثناءات المجموعة العامة + /thank-you، عشان Googlebot تحديداً
        // ميختلفش عن باقي البوتات في الصفحات اللي مينفعش تتفهرس.
        // /thank-you لسه ممكن تتفهرس لو حد عمل لينك ليها من مكان تاني رغم
        // المنع هنا؛ لو عايز تمنعها من نتائج البحث فعلياً 100%، ضيف
        // <meta name="robots" content="noindex"> على الصفحة نفسها كمان.
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/thank-you"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 2,
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
      // شلت مجموعتي Googlebot-Image وGooglebot-Video: كانتا "Allow" من غير
      // "Disallow"، وده تقنياً بيدّيهم إذن يزحفوا على الموقع كله من غير أي
      // قيد فعلي — يعني ماكانوش بيعملوا اللي متوقع منهم. الصور والفيديوهات
      // أصلاً متاحة عن طريق /_next/image ومسارات تانية غير /images/ حرفياً،
      // فتقييدهم كان ممكن يمنع فهرسة صور حقيقية بالغلط. لو عايز تقيّدهم
      // فعلاً لمسار معين مستقبلاً، ضيف "disallow: '/'" في نفس المجموعة قبل
      // الـ allow.
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}