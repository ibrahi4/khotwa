import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, MapPin, Crown, Sparkles,
  Building2, Shield, Award, Clock, Star, Users, CheckCircle2,
  Home, TrendingUp, Zap,
} from "lucide-react";
import { areaGroups, vipAreas, areas } from "@/config/areas";
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

  const totalAreas = areas.length;
  const totalCompounds = areas.reduce((sum, a) => sum + (a.compounds?.length || 0), 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ========== HERO WITH IMAGE ========== */}
      <section className="relative bg-white text-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt="مناطق خدمات خطوة لنقل الأثاث"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-teal-900/95 via-teal-900/80 to-teal-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent" />
        </div>

        <div className="relative container-custom py-16 md:py-20 w-full">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-[#0F766E] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li><ArrowLeft className="w-3 h-3" /></li>
              <li className="text-white font-semibold">مناطق الخدمة</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F766E] to-[#0D5F5A] px-4 py-1.5 mb-6 shadow-lg shadow-[#0F766E]/30">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-xs font-black text-white tracking-wide">
                تغطية شاملة لجميع محافظات مصر
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              مناطق خدماتنا
              <br />
              <span className="text-[#0F766E]">في جميع أنحاء مصر</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              خطوة لنقل الأثاث تغطي جميع محافظات مصر بفرق متخصصة في كل منطقة،
              مع خبرة عميقة في الكمبوندات والمدن الجديدة.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {[
                { icon: Shield, text: "ضمان كامل" },
                { icon: Clock, text: "24/7" },
                { icon: Award, text: "10+ سنوات" },
                { icon: Star, text: "4.9/5" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5"
                >
                  <b.icon className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span className="text-xs font-semibold text-white">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0D5F5A] text-white font-bold h-14 px-8 rounded-md shadow-lg shadow-[#0F766E]/30 transition-all hover:scale-[1.02] text-base"
              >
                <Phone className="w-4 h-4" />
                احجز موعدك الآن
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-14 px-8 rounded-md backdrop-blur text-base"
              >
                <MessageCircle className="w-4 h-4" />
                تواصل واتساب
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  {totalAreas}+
                </div>
                <div className="text-xs text-white/50 font-medium">منطقة</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  {totalCompounds}+
                </div>
                <div className="text-xs text-white/50 font-medium">كمبوند</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  500+
                </div>
                <div className="text-xs text-white/50 font-medium">عميل راضٍ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES BAR ========== */}
      <section className="bg-[#FAF5EE] border-b border-[#E5E7EB]">
        <div className="container-custom py-10 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "ضمان كامل", desc: "على جميع المقتنيات" },
              { icon: Clock, title: "خدمة 24/7", desc: "طوال أيام الأسبوع" },
              { icon: Users, title: "فرق مدربة", desc: "متخصصون محترفون" },
              { icon: Crown, title: "خدمة VIP", desc: "للكمبوندات والفلل" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#0F766E] hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 bg-[#FAF5EE] group-hover:bg-[#0F766E] text-slate-900 group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all">
                  <f.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm md:text-base">{f.title}</div>
                  <div className="text-xs md:text-sm text-[#64748B]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VIP AREAS (Premium Cards) ========== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-gradient-to-r from-[#0F766E] to-[#0D5F5A] text-white border-0 mb-4 px-4 py-1.5 shadow-lg shadow-[#0F766E]/30">
              <Crown className="w-3 h-3 ml-1" />
              خدمة VIP الحصرية
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              مناطقنا المميّزة
            </h2>
            <p className="text-base text-[#64748B]">
              متخصصون في خدمة الكمبوندات والفلل الفاخرة بأعلى معايير الاحترافية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {vipAreas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                <div className="relative bg-gradient-to-br from-teal-900 via-[#2A2A2A] to-teal-900 rounded-2xl overflow-hidden border border-[#E5E7EB]/10 hover:border-[#0F766E]/50 transition-all hover:shadow-2xl hover:shadow-[#0F766E]/20 hover:-translate-y-1 h-full">
                  {/* Glow effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F766E]/20 rounded-full blur-3xl group-hover:bg-[#0F766E]/30 transition-all" />

                  {/* VIP Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-[#0F766E] to-[#0D5F5A] text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Crown className="w-2.5 h-2.5" />
                      VIP
                    </div>
                  </div>

                  <div className="relative p-5 md:p-6">
                    {/* Icon */}
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#0F766E]/20 to-transparent border border-[#0F766E]/30 rounded-2xl flex items-center justify-center mb-4 group-hover:from-[#0F766E] group-hover:to-[#0D5F5A] group-hover:border-[#0F766E] transition-all">
                      <MapPin className="w-7 h-7 text-[#0F766E] group-hover:text-white transition-colors" />
                    </div>

                    {/* Content */}
                    <h3 className="font-black text-white text-lg md:text-xl mb-2 leading-tight">
                      {area.name}
                    </h3>

                    {area.compounds && area.compounds.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
                        <Building2 className="w-3 h-3 text-[#0F766E]" />
                        <span>{area.compounds.length}+ كمبوند فاخر</span>
                      </div>
                    )}

                    {/* Arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-[#0F766E] font-bold flex items-center gap-1">
                        استكشف المنطقة
                      </span>
                      <div className="w-7 h-7 bg-[#0F766E]/10 group-hover:bg-[#0F766E] rounded-full flex items-center justify-center transition-all">
                        <ArrowLeft className="w-3.5 h-3.5 text-[#0F766E] group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ALL AREAS BY GROUP ========== */}
      {Object.entries(areaGroups).map(([key, group], groupIndex) => (
        <section
          key={key}
          className={`section-padding ${groupIndex % 2 === 0 ? "bg-[#FAF5EE]" : "bg-white"}`}
        >
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4 bg-white">
                <Home className="w-3 h-3 ml-1" />
                منطقة جغرافية
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                {group.label}
              </h2>
              <p className="text-[#64748B]">
                نغطي <strong className="text-[#0F766E]">{group.areas.length}</strong> منطقة في {group.label}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {group.areas.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                  <Card className="border-[#E5E7EB] hover:border-[#0F766E] hover:shadow-lg transition-all bg-white h-full relative overflow-hidden hover:-translate-y-1">
                    {area.isVip && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-gradient-to-r from-[#0F766E] to-[#0D5F5A] text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                          <Crown className="w-2 h-2" />
                          VIP
                        </div>
                      </div>
                    )}
                    <CardContent className="p-5 text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FAF5EE] group-hover:bg-[#0F766E] text-[#0F766E] group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all border border-[#E5E7EB] group-hover:border-[#0F766E]">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h3 className="font-black text-sm md:text-base text-slate-900 group-hover:text-[#0F766E] transition-colors mb-1">
                        {area.name}
                      </h3>
                      {area.compounds && area.compounds.length > 0 && (
                        <p className="text-[10px] md:text-xs text-[#64748B]">
                          {area.compounds.length}+ كمبوند
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ========== WHY US SECTION ========== */}
      <section className="section-padding bg-white text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F766E] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              <Award className="w-3 h-3 ml-1" />
              لماذا خطوة
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              خبرة تصنع الفارق في <span className="text-[#0F766E]">كل منطقة</span>
            </h2>
            <p className="text-white/60">
              نمتلك المعرفة والخبرة اللازمة للتعامل مع كل منطقة بخصوصيتها
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "معرفة محلية عميقة",
                desc: "نعرف كل شارع وكمبوند في المناطق التي نخدمها",
              },
              {
                icon: Zap,
                title: "استجابة سريعة",
                desc: "فرق جاهزة للانطلاق في أقل من ساعة من الاتصال",
              },
              {
                icon: CheckCircle2,
                title: "تصاريح جاهزة",
                desc: "علاقات ممتازة مع إدارات الكمبوندات لتسهيل الإجراءات",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#0F766E]/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 bg-[#0F766E] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-black text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative bg-gradient-to-br from-[#FAF5EE] to-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom text-center">
          <Badge className="bg-gradient-to-r from-[#0F766E] to-[#0D5F5A] text-white border-0 mb-6 px-4 py-1.5 shadow-lg shadow-[#0F766E]/30">
            <Sparkles className="w-3 h-3 ml-1" />
            منطقتك مش في القائمة؟
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            نغطي <span className="text-[#0F766E]">كل مصر</span>
          </h2>
          <p className="text-[#64748B] mb-10 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            اتصل بنا للاستفسار عن الخدمة في منطقتك. نقدم خدمة نقل الأثاث لجميع محافظات مصر بأعلى معايير الجودة والاحترافية.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0D5F5A] text-white font-bold h-14 px-8 rounded-md shadow-lg shadow-[#0F766E]/30 transition-all hover:scale-[1.02] text-base"
            >
              <Phone className="w-4 h-4" />
              اتصل: {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-white h-14 px-8 rounded-md text-base font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل واتساب
            </a>
          </div>
        </div>
      </section>
    </>
  );
}