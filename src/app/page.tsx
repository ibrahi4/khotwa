import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import HomeContent from "./HomeContent";

export const metadata: Metadata = buildMetadata({
  // كان: "شركة نقل اثاث بالقاهرة والجيزة | خصم 30% اليوم | خطوة"
  // شلت "خصم 30% اليوم" لأن الادّعاء مش موجود ولا مؤكد على الصفحة نفسها،
  // وده كان بيرفع معدل الارتداد (73.7% مقابل 58% لعنوان سابق حسب GA4).
  title: "شركة نقل عفش وأثاث بالقاهرة والجيزة",
  description:
    "أفضل شركة نقل عفش وأثاث بالونش في التجمع الخامس، الشيخ زايد، 6 أكتوبر ومدينتي. فك وتغليف وتركيب بأيدي محترفين مع ضمان شامل. اتصل الآن: 01042532253",
  path: "/",
});

export default function HomePage() {
  return <HomeContent />;
}