import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Crown,
  ArrowLeft,
  Building2,
  Phone,
  MessageCircle,
  Shield,
  Clock,
  Truck,
} from "lucide-react";
import { areaGroups } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "مناطق خدمة نقل الأثاث | خطوة - القاهرة والجيزة والمدن الجديدة",
  description:
    "نغطي التجمع الخامس، الشيخ زايد، 6 أكتوبر، مدينتي، الرحاب، المعادي، مصر الجديدة وجميع أحياء القاهرة والجيزة. خدمة نقل عفش احترافية مع ونش وتغليف وضمان كامل.",
  path: "/areas",
});

const groupMeta: Record<
  string,
  { title: string; subtitle: string; icon: "building" | "pin" }
> = {
  "new-cities": {
    title: "المدن الجديدة والكمبوندات",
    subtitle: "تغطية VIP للكمبوندات مع تنسيق مسبق مع الإدارات والأمن",
    icon: "building",
  },
  cairo: {
    title: "القاهرة",
    subtitle: "مدينة نصر، مصر الجديدة، المعادي، الزمالك، المقطم وقطامية",
    icon: "pin",
  },
  giza: {
    title: "الجيزة",
    subtitle: "المهندسين، الدقي، العجوزة، الهرم والمناطق المجاورة",
    icon: "pin",
  },
};

const groupOrder = ["new-cities", "cairo", "giza"] as const;

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-white pb-24">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800 pt-20 pb-24 md:pt-24 md:pb-28"
        aria-label="مناطق الخدمة"
      >
        <div
          className="absolute top-0 right-0 w-[420px] h-[420px] bg-green-500/20 rounded-full blur-[110px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-emerald-400/15 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 35%, #000 25%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 35%, #000 25%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative container-custom z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
              <MapPin className="w-4 h-4 text-green-300" aria-hidden="true" />
              تغطية شاملة للقاهرة الكبرى
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.15] tracking-tight">
              مناطق خدمة
              <span className="block text-green-300 mt-2">نقل الأثاث والعفش</span>
            </h1>

            <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto mb-8">
              من التجمع الخامس ومدينتي إلى الشيخ زايد و6 أكتوبر والمعادي والمهندسين.
              فرق مدربة، ونش رفع، تغليف احترافي، وضمان كامل على كل قطعة.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white h-12 px-7 rounded-2xl font-bold gap-2 shadow-lg shadow-green-900/30"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  اتصل الآن: {siteConfig.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 h-12 px-7 rounded-2xl font-bold gap-2"
              >
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    "السلام عليكم، أحتاج نقل عفش في منطقتي"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  واتساب مباشر
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Shield, text: "ضمان كامل" },
                { icon: Truck, text: "سيارات مجهزة" },
                { icon: Clock, text: "خدمة 24/7" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-sm"
                  >
                    <Icon className="w-4 h-4 text-green-300" aria-hidden="true" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════ MAP RIGHT AFTER HERO ═══════════════ */}
      <section className="container-custom -mt-2 md:-mt-4 relative z-20 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/80">
              <div>
                <h2 className="text-lg md:text-xl font-black text-slate-900">
                  نطاق خدمتنا على الخريطة
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  نغطي القاهرة الجديدة، الجيزة، والمدن الجديدة المحيطة
                </p>
              </div>
              <Badge className="w-fit bg-green-50 text-green-700 border border-green-100 px-3 py-1">
                <MapPin className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                المقر: التجمع الخامس
              </Badge>
            </div>

            <div className="w-full h-[320px] md:h-[420px] bg-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=30.0131,31.4961&z=11&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="مناطق خدمة خطوة لنقل الأثاث"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ AREAS BY GROUP ═══════════════ */}
      <div className="container-custom pt-10 md:pt-14 space-y-16 md:space-y-20">
        {groupOrder.map((groupKey) => {
          const group = areaGroups[groupKey];
          if (!group || !group.areas?.length) return null;
          const meta = groupMeta[groupKey];

          return (
            <section key={groupKey} id={groupKey} className="scroll-mt-28">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-7">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {meta.icon === "building" ? (
                      <Building2 className="w-5 h-5 text-green-700" aria-hidden="true" />
                    ) : (
                      <MapPin className="w-5 h-5 text-green-700" aria-hidden="true" />
                    )}
                    <span className="text-sm font-bold text-green-700 tracking-wide">
                      {meta.title}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    {group.label}
                  </h2>
                  <p className="text-sm md:text-base text-slate-500 mt-1 max-w-2xl">
                    {meta.subtitle}
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-400">
                  {group.areas.length} منطقة
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {group.areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="group block h-full"
                  >
                    <article className="h-full bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm hover:shadow-lg hover:border-green-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center group-hover:bg-green-700 group-hover:border-green-700 transition-colors">
                          <MapPin
                            className="w-5 h-5 text-green-700 group-hover:text-white transition-colors"
                            aria-hidden="true"
                          />
                        </div>

                        {area.isVip && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 text-[10px] font-black">
                            <Crown className="w-3 h-3" aria-hidden="true" />
                            VIP
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-green-800 transition-colors">
                        {area.name}
                      </h3>

                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
                        {area.description ||
                          `خدمة نقل أثاث احترافية في ${area.name} مع تغليف وونش وضمان كامل.`}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(area.compounds?.length
                          ? area.compounds.slice(0, 2)
                          : area.neighborhoods?.slice(0, 2) || []
                        ).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                        {((area.compounds?.length || 0) > 2 ||
                          (!area.compounds?.length &&
                            (area.neighborhoods?.length || 0) > 2)) && (
                          <span className="text-[11px] font-medium text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-1">
                            +
                            {area.compounds?.length
                              ? area.compounds.length - 2
                              : (area.neighborhoods?.length || 0) - 2}{" "}
                            المزيد
                          </span>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-green-700">
                          استكشف المنطقة
                        </span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-green-700 flex items-center justify-center transition-colors">
                          <ArrowLeft
                            className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="container-custom mt-20">
        <div className="max-w-5xl mx-auto rounded-3xl border border-green-100 bg-gradient-to-l from-green-50 via-white to-emerald-50 px-6 py-10 md:px-10 md:py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
            منطقتك مش ظاهرة؟
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6">
            نغطي معظم أحياء القاهرة والجيزة والمحافظات. كلمنا دلوقتي وهنرتب المعاينة والنقل في نفس اليوم عند الإمكان.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              asChild
              className="bg-green-700 hover:bg-green-800 text-white h-12 px-7 rounded-xl font-bold gap-2"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="w-4 h-4" aria-hidden="true" />
                اتصل الآن
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-green-200 text-green-800 hover:bg-green-50 h-12 px-7 rounded-xl font-bold gap-2"
            >
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}