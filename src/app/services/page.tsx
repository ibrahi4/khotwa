import Link from "next/link";
import Image from "next/image";
import {
  Truck, Wrench, Wind, Box, ArrowUpToLine, Gem,
  ArrowLeft, Phone, MessageCircle, Star, Sparkles,
  Shield, Clock, Award, CheckCircle2, Users, PackageCheck,
  TrendingUp, Zap, HeartHandshake,
} from "lucide-react";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { serviceBackgrounds } from "@/config/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "خدمات نقل الأثاث | 6 خدمات متكاملة - خطوة",
  description:
    "خطوة تقدم 6 خدمات احترافية لنقل الأثاث في القاهرة الجديدة والتجمع الخامس ومدينتي والشيخ زايد. نقل، فك وتركيب، تغليف، ونش رفع، وتكييفات. خبرة +10 سنوات.",
  path: "/services",
});

const serviceIcons: Record<string, React.ElementType> = {
  "naql-athath": Truck,
  "fak-tarkeeb-athath": Wrench,
  "fak-tarkeeb-takyifat": Wind,
  "taghleef-athath": Box,
  "wensh-raf3-athath": ArrowUpToLine,
  "naql-moqtaniat-hassasa": Gem,
};

export default function ServicesPage() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label="خدماتنا"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          aria-hidden="true"
        />

        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
              <Sparkles className="w-4 h-4 text-green-400" aria-hidden="true" />
              6 خدمات متكاملة تحت سقف واحد
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.15] tracking-tight">
              كل ما يحتاجه أثاثك
              <span className="block text-green-400 mt-2">في مكان واحد</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
              من المعاينة المجانية حتى التركيب النهائي، نقدم لك تجربة نقل أثاث متكاملة
              بأعلى معايير الاحترافية. اختر من بين 6 خدمات مصممة خصيصاً لتلبية كل احتياجاتك.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white gap-2 text-base h-13 px-7 rounded-2xl shadow-xl shadow-green-500/25"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  احجز خدمتك الآن
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
                  استشارة مجانية
                </a>
              </Button>
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

      {/* ═══════════════ INTRO CONTENT ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="intro-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              لماذا خدماتنا مختلفة؟
            </p>
            <h2
              id="intro-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-6 leading-tight"
            >
              تجربة نقل أثاث كما يجب أن تكون
            </h2>
            <div className="text-base md:text-lg text-slate-600 leading-loose space-y-4 text-right">
              <p>
                نُدرك في خطوة أن نقل الأثاث ليس مجرد عملية لوجستية، بل هو انتقال حياة كاملة
                من مكان لآخر. كل قطعة أثاث تحمل ذكريات، وكل نقلة تعني بداية جديدة تستحق أن تتم
                بأعلى درجات العناية والاحترافية.
              </p>
              <p>
                على مدار أكثر من عشر سنوات، طوّرنا منظومة خدمات متكاملة تغطي كل جانب من جوانب
                عملية النقل. من المعاينة الأولى وتقييم المتطلبات، مروراً بالتغليف الاحترافي
                والفك الدقيق، وحتى النقل الآمن والتركيب النهائي في المكان الجديد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES GRID ═══════════════ */}
      <section className="section-padding bg-green-50/40" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              خدماتنا
            </p>
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              اختر الخدمة المناسبة لك
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              كل خدمة مصممة بعناية لتقديم أفضل النتائج بأعلى معايير الجودة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug] || Truck;
              const bg = serviceBackgrounds[s.slug];

              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
                  <article className="relative h-[440px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-green-900">
                    {bg && (
                      <Image
                        src={bg.src}
                        alt={bg.alt || `خدمة ${s.name}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={i < 3 ? "eager" : "lazy"}
                        quality={80}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/70 to-green-950/30" />

                    <div className="absolute top-5 left-5 z-10">
                      <div className="w-11 h-11 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-sm tabular-nums">
                          0{i + 1}
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-5 right-5 z-10">
                      <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/40 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 right-0 left-0 p-6 md:p-7 z-10">
                      <div className="w-12 h-0.5 bg-green-400 mb-4 group-hover:w-24 transition-all duration-500" />

                      <h3 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">
                        {s.name}
                      </h3>

                      <p className="text-white/80 text-sm leading-relaxed mb-5 line-clamp-2">
                        {s.shortDescription}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <span className="text-green-300 font-bold text-sm flex items-center gap-2">
                          اكتشف الخدمة
                          <ArrowLeft
                            className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW WE WORK ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="how-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              منهجية العمل
            </p>
            <h2
              id="how-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              كيف نضمن جودة كل خدمة؟
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              منظومة عمل مدروسة تضمن لك تجربة نقل خالية من المفاجآت
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: PackageCheck,
                title: "معايير جودة عالمية",
                desc: "نستخدم مواد تغليف وأدوات مستوردة من أفضل الماركات العالمية",
              },
              {
                icon: Users,
                title: "فرق مؤهلة",
                desc: "فنيون مدربون على أحدث تقنيات النقل والتركيب في المدارس المتخصصة",
              },
              {
                icon: Shield,
                title: "تأمين شامل",
                desc: "غطاء تأميني كامل على كل قطعة أثاث خلال جميع مراحل النقل",
              },
              {
                icon: TrendingUp,
                title: "تطوير مستمر",
                desc: "نطور خدماتنا باستمرار بناءً على ملاحظات عملائنا ومستجدات الصناعة",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={i}
                  className="group bg-green-50/40 border border-green-100/60 rounded-2xl p-6 hover:border-green-300 hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-white border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 group-hover:border-green-700 transition-colors">
                    <Icon
                      className="w-7 h-7 text-green-700 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-green-950 text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPREHENSIVE SOLUTION ═══════════════ */}
      <section
        className="section-padding bg-gradient-to-br from-green-900 via-green-950 to-green-900 relative overflow-hidden"
        aria-labelledby="solution-heading"
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-4 px-4 py-1.5">
                <Zap className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                حل شامل
              </Badge>
              <h2
                id="solution-heading"
                className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
              >
                خدمة واحدة أم باقة متكاملة؟
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
                يمكنك اختيار خدمة واحدة أو الاستفادة من الباقة الكاملة بأسعار مميزة
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">خدمة فردية</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  محتاج فقط لخدمة معينة؟ نقدم لك كل خدمة بشكل مستقل بنفس معايير الجودة
                  والاحترافية، مع مرونة كاملة في الاختيار حسب احتياجاتك.
                </p>
                <ul className="space-y-2">
                  {["أسعار شفافة لكل خدمة", "بدون التزام بخدمات إضافية", "جودة عالية مضمونة"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-green-500/10 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white border-0">الأكثر توفيراً</Badge>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 mt-8">
                  <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">الباقة الشاملة</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  احصل على تجربة نقل متكاملة بأسعار مميزة عند اختيار مجموعة خدمات معاً،
                  مع تنسيق كامل بين جميع المراحل لضمان انسيابية العمل.
                </p>
                <ul className="space-y-2">
                  {["خصم يصل إلى 20%", "تنسيق كامل بين الفرق", "أولوية في المواعيد"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
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
              محتاج مساعدة في اختيار الخدمة المناسبة؟
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              فريقنا متاح على مدار الساعة لمساعدتك في اختيار الحل الأمثل لاحتياجاتك.
              اتصل بنا الآن للحصول على استشارة مجانية وعرض سعر شفاف.
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
                  واتساب مباشر
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}