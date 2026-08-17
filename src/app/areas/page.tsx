import Link from "next/link";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, MapPin, Crown,
  Building2, Shield, Award, Star, Users,
  TrendingUp, Sparkles, CheckCircle2,
} from "lucide-react";
import { areaGroups, vipAreas, areas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "مناطق خدمات نقل الأثاث في القاهرة والجيزة | خطوة",
  description:
    "خطوة تخدم أكثر من 20 منطقة في القاهرة والجيزة والمدن الجديدة. من التجمع الخامس ومدينتي إلى الشيخ زايد و6 أكتوبر والعاصمة الإدارية. فرق محلية بخبرة عميقة.",
  path: "/areas",
  keywords: [
    "مناطق نقل الأثاث في القاهرة",
    "شركة نقل عفش المدن الجديدة",
    "نقل عفش الكمبوندات الفاخرة",
    "خدمة نقل التجمع الخامس مدينتي الشيخ زايد",
  ],
});

export default function AreasPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: siteConfig.url },
    { name: "مناطق الخدمة", url: `${siteConfig.url}/areas` },
  ]);

  const totalAreas = areas.length;
  const totalCompounds = areas.reduce((sum, a) => sum + (a.compounds?.length || 0), 0);
  const totalNeighborhoods = areas.reduce((sum, a) => sum + (a.neighborhoods?.length || 0), 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label="مناطق الخدمة"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px]" />
        </div>

        <div className="relative container-custom py-20 md:py-28">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-green-300 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li aria-hidden="true">
                <ArrowLeft className="w-3 h-3" />
              </li>
              <li className="text-white font-semibold" aria-current="page">
                مناطق الخدمة
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
              <MapPin className="w-4 h-4 text-green-400" aria-hidden="true" />
              حضور محلي في {totalAreas}+ منطقة
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.15] tracking-tight">
              فرقنا المحلية
              <span className="block text-green-400 mt-2">قريبة منك أينما كنت</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8">
              نمتلك فرقاً متخصصة في كل منطقة نخدمها، تعرف شوارعها وكمبونداتها وتحدياتها.
              هذه المعرفة المحلية العميقة هي ما يجعل خدمتنا أسرع وأكثر كفاءة من غيرنا.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white gap-2 text-base h-13 px-7 rounded-2xl shadow-xl shadow-green-500/25"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  احجز موعدك الآن
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 gap-2 text-base h-13 px-7 rounded-2xl font-bold"
              >
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  تواصل معنا
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
                  {totalAreas}+
                </div>
                <div className="text-xs text-white/60 font-medium">منطقة مخدومة</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
                  {totalCompounds}+
                </div>
                <div className="text-xs text-white/60 font-medium">كمبوند</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
                  {totalNeighborhoods}+
                </div>
                <div className="text-xs text-white/60 font-medium">حي وشارع</div>
              </div>
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

      {/* ═══════════════ INTRO ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="intro-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              حضورنا الجغرافي
            </p>
            <h2
              id="intro-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-6 leading-tight"
            >
              معرفة محلية عميقة تصنع الفارق
            </h2>
            <div className="text-base md:text-lg text-slate-600 leading-loose space-y-4 text-right">
              <p>
                الفرق بين شركة نقل أثاث عادية وشركة رائدة يكمن في التفاصيل الصغيرة: معرفة أفضل
                الطرق لتجنب الزحام، فهم إجراءات الأمن في الكمبوندات، خبرة التعامل مع طبيعة كل حي.
                هذا ما نمتلكه في خطوة على مدار أكثر من عشر سنوات من العمل الميداني.
              </p>
              <p>
                فرقنا الميدانية ليست فرقاً مركزية تسافر لكل منطقة، بل هي فرق متخصصة لكل منطقة
                جغرافية، تعمل في نفس المكان يومياً وتعرف كل تفاصيله. هذا النموذج التشغيلي يوفر لك
                استجابة أسرع، خدمة أكثر دقة، وأسعاراً أفضل نتيجة توفير تكاليف التنقل الطويل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VIP AREAS ═══════════════ */}
      {vipAreas.length > 0 && (
        <section className="section-padding bg-green-50/40" aria-labelledby="vip-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-green-700 text-white border-0 mb-4 px-4 py-1.5 shadow-lg shadow-green-700/30">
                <Crown className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                خدمة VIP الحصرية
              </Badge>
              <h2
                id="vip-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                تخصصنا الأول: الكمبوندات الفاخرة
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                نُقدم مستوى استثنائي من الخدمة يليق بمستوى المعيشة في هذه المناطق المتميّزة
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {vipAreas.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                  <article className="relative bg-gradient-to-br from-green-800 via-green-900 to-green-950 rounded-2xl overflow-hidden border border-green-700/30 hover:border-green-400/50 transition-all hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all" />

                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Crown className="w-2.5 h-2.5" aria-hidden="true" />
                        VIP
                      </div>
                    </div>

                    <div className="relative p-5 md:p-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                        <MapPin className="w-7 h-7 text-green-300 group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>

                      <h3 className="font-black text-white text-lg md:text-xl mb-2 leading-tight">
                        {area.name}
                      </h3>

                      {area.compounds && area.compounds.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
                          <Building2 className="w-3 h-3 text-green-400" aria-hidden="true" />
                          <span>{area.compounds.length}+ كمبوند فاخر</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-xs text-green-300 font-bold">استكشف المنطقة</span>
                        <div className="w-7 h-7 bg-green-500/20 group-hover:bg-green-500 rounded-full flex items-center justify-center transition-all">
                          <ArrowLeft
                            className="w-3.5 h-3.5 text-green-300 group-hover:text-white group-hover:-translate-x-0.5 transition-all"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ ALL AREAS BY GROUP ═══════════════ */}
      {Object.entries(areaGroups).map(([key, group], groupIndex) => (
        <section
          key={key}
          className={`section-padding ${groupIndex % 2 === 0 ? "bg-white" : "bg-green-50/40"}`}
          aria-labelledby={`group-${key}-heading`}
        >
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                منطقة جغرافية
              </p>
              <h2
                id={`group-${key}-heading`}
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                {group.label}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                نغطي {group.areas.length} منطقة في {group.label} بفرق متخصصة
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {group.areas.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                  <article className="bg-white border border-green-100/60 rounded-2xl p-5 hover:border-green-300 hover:shadow-lg transition-all h-full relative overflow-hidden hover:-translate-y-1">
                    {area.isVip && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-green-700 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                          <Crown className="w-2 h-2" aria-hidden="true" />
                          VIP
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 group-hover:bg-green-700 text-green-700 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all border border-green-100 group-hover:border-green-700">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-black text-sm md:text-base text-green-950 group-hover:text-green-700 transition-colors mb-1">
                        {area.name}
                      </h3>
                      {area.compounds && area.compounds.length > 0 && (
                        <p className="text-[10px] md:text-xs text-slate-500">
                          {area.compounds.length}+ كمبوند
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ═══════════════ WHY LOCAL ═══════════════ */}
      <section
        className="section-padding bg-gradient-to-br from-green-900 via-green-950 to-green-900 relative overflow-hidden"
        aria-labelledby="local-heading"
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-4 px-4 py-1.5">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              التميّز المحلي
            </Badge>
            <h2
              id="local-heading"
              className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
            >
              لماذا الفرق المحلية أفضل؟
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              نموذجنا التشغيلي المحلي يحقق مزايا ملموسة لكل عميل
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "معرفة الطرق والمواعيد",
                desc: "نعرف أفضل أوقات النقل في كل منطقة لتجنب الزحام والحصول على تصاريح الوقوف بسرعة",
              },
              {
                icon: Building2,
                title: "علاقات مع الإدارات",
                desc: "علاقات ممتازة مع إدارات الكمبوندات والحراس تُسهّل إجراءات الدخول وتوفر الوقت",
              },
              {
                icon: CheckCircle2,
                title: "استجابة أسرع",
                desc: "فرقنا القريبة منك يمكنها الوصول خلال 30-60 دقيقة في حالات الطوارئ والاستفسارات",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={i}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-400/40 hover:bg-white/10 transition-all"
                >
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-black text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        className="section-padding bg-white"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              منطقتك ليست في القائمة؟
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              نضيف مناطق جديدة باستمرار حسب الطلب. اتصل بنا للاستفسار عن الخدمة في منطقتك،
              فنحن نغطي معظم أنحاء القاهرة والجيزة والمدن الجديدة.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white h-13 px-8 rounded-2xl font-bold text-base gap-2"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  اتصل: {siteConfig.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white h-13 px-8 rounded-2xl font-bold text-base gap-2 shadow-lg shadow-green-500/30"
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
        </div>
      </section>
    </>
  );
}