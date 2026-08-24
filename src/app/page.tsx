import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: `شركة نقل اثاث بالقاهرة والجيزة | خصم 30% اليوم | ${siteConfig.shortName}`,
  description: "أفضل شركة نقل عفش وأثاث بالونش في التجمع الخامس، الشيخ زايد، 6 أكتوبر ومدينتي. فك وتغليف وتركيب بأيدي محترفين مع ضمان شامل. اتصل الان لمعاينة مجانية.",
  alternates: {
    canonical: siteConfig.url,
  }
};

export default function HomePage() {
  return <HomeContent />;
}