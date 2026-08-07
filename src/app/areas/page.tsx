import Link from "next/link";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, MapPin, Crown, Sparkles,
} from "lucide-react";
import { areaGroups, vipAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "مناطق الخدمة | خطوة لنقل الأثاث - تغطية شاملة لجميع محافظات مصر",
  description:
    "خطوة لنقل الأثاث تخدم جميع محافظات مصر: التجمع الخامس، مدينتي، الشيخ زايد، 6 أكتوبر، القاهرة الجديدة، العاصمة الإدارية، الرحاب، وأكثر.",
  path: "/areas",
  keywords: [
    "مناطق نقل الأثاث",
    "شركة نقل عفش القاهرة",
    "شركة نقل عفش الجيزة",
    "نقل عفش المدن الجديدة",
    "نقل عفش الكمبوندات",
  ],
});

export default function AreasPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: siteConfig.url },
    { name: "مناطق الخدمة", url: `${siteConfig.url}/areas` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-[#1C1C1C] text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#E85D04] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-[#E85D04]">
                  الرئيسية
                </Link>
              </li>
              <li>
                <ArrowLeft className="w-3 h-3" />
              </li>
              <li className="text-white font-semibold">مناطق الخدمة</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Badge className="bg-[#E85D04]/20 border border-[#E85D04]/40 text-white mb-6 px-4 py-1.5">
              <MapPin className="w-3 h-3 ml-1" />
              تغطية شاملة
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
              مناطق خدماتنا
              <br />
              <span className="text-[#E85D04]">في جميع أنحاء مصر</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
              خطوة لنقل الأثاث تغطي جميع محافظات مصر بفرق متخصصة في كل منطقة،
              مع خبرة عميقة في الكمبوندات والمدن الجديدة.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-14 px-8 rounded-md border-0"
              >
                <Phone className="w-4 h-4" />
                اتصل الآن
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white h-14 px-8 rounded-md backdrop-blur"
              >
                <MessageCircle className="w-4 h-4" />
                تواصل واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-[#1C1C1C] text-white border-0 mb-4">
              <Crown className="w-3 h-3 ml-1" />
              خدمة VIP
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-4 tracking-tight">
              مناطقنا المميّزة
            </h2>
            <p className="text-[#64748B]">
              متخصصون في خدمة الكمبوندات والفلل الفاخرة في هذه المناطق
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vipAreas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                <Card className="border-[#E5E7EB] hover:border-[#E85D04] hover:shadow-lg transition-all bg-[#FAF5EE] hover:bg-white relative overflow-hidden h-full">
                  <Badge className="absolute top-2 left-2 bg-[#1C1C1C] text-white border-0 text-[10px] z-10">
                    <Crown className="w-2.5 h-2.5 ml-0.5" />
                    VIP
                  </Badge>
                  <CardContent className="p-5 text-center">
                    <div className="w-14 h-14 bg-white group-hover:bg-[#E85D04] text-[#1C1C1C] group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all border border-[#E5E7EB] group-hover:border-[#E85D04]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#1C1C1C] mb-1">{area.name}</h3>
                    <p className="text-xs text-[#64748B]">
                      {area.compounds ? `${area.compounds.length}+ كمبوند` : "خدمة VIP"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {Object.values(areaGroups).map((group) => (
        <section key={group.label} className="section-padding bg-[#FAF5EE] even:bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                منطقة جغرافية
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-4 tracking-tight">
                {group.label}
              </h2>
              <p className="text-[#64748B]">
                نغطي {group.areas.length} منطقة في {group.label}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.areas.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                  <Card className="border-[#E5E7EB] hover:border-[#E85D04] hover:shadow-md transition-all bg-white h-full">
                    <CardContent className="p-5 text-center relative">
                      {area.isVip && (
                        <Badge className="absolute top-2 left-2 bg-[#E85D04] text-white border-0 text-[9px]">
                          <Crown className="w-2 h-2 ml-0.5" />
                          VIP
                        </Badge>
                      )}
                      <div className="w-12 h-12 bg-[#F5F5F5] group-hover:bg-[#E85D04] text-[#1C1C1C] group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-sm text-[#1C1C1C] group-hover:text-[#E85D04] transition-colors">
                        {area.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#1C1C1C] text-white py-16 md:py-20">
        <div className="container-custom text-center">
          <Badge className="bg-[#E85D04] text-white border-0 mb-6 px-4 py-1.5">
            <Sparkles className="w-3 h-3 ml-1" />
            منطقتك مش في القائمة؟
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            نغطي <span className="text-[#E85D04]">كل مصر</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            اتصل بنا للاستفسار عن الخدمة في منطقتك
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white h-14 px-8 rounded-md border-0"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-white h-14 px-8 rounded-md"
            >
              <MessageCircle className="w-4 h-4" />
              واتساب
            </a>
          </div>
        </div>
      </section>
    </>
  );
}