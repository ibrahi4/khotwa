import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, MapPin, Building2,
  CheckCircle2, Crown, Sparkles, Shield, Award, Users, Clock,
  Star, Truck, Wrench, Wind, Box, ArrowUpToLine, Gem,
  Target, Zap, HeartHandshake, TrendingUp,
} from "lucide-react";
import { areas, getAreaBySlug, getRelatedAreas } from "@/config/areas";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { buildAreaMetadata } from "@/lib/seo/metadata";
import {
  generateAreaSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const serviceIcons: Record<string, React.ElementType> = {
  "naql-athath": Truck,
  "fak-tarkeeb-athath": Wrench,
  "fak-tarkeeb-takyifat": Wind,
  "taghleef-athath": Box,
  "wensh-raf3-athath": ArrowUpToLine,
  "naql-moqtaniat-hassasa": Gem,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return buildAreaMetadata(area);
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const related = getRelatedAreas(area.slug, 4);
  const areaUrl = `${siteConfig.url}/areas/${area.slug}`;
  const waMessage = encodeURIComponent(`استفسار عن نقل عفش ${area.name}`);

  const areaSchema = generateAreaSchema(
    area.name,
    area.longDescription || area.description || area.metaDescription,
    areaUrl
  );

  const faqSchema = area.faqs && area.faqs.length > 0
    ? generateFAQSchema(area.faqs)
    : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: siteConfig.url },
    { name: "مناطق الخدمة", url: `${siteConfig.url}/areas` },
    { name: area.name, url: areaUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label={`نقل عفش ${area.name}`}
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

        <div className="relative container-custom py-16 md:py-20">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60 flex-wrap">
              <li>
                <Link href="/" className="hover:text-green-300 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li aria-hidden="true">
                <ArrowLeft className="w-3 h-3" />
              </li>
              <li>
                <Link href="/areas" className="hover:text-green-300 transition-colors">
                  مناطق الخدمة
                </Link>
              </li>
              <li aria-hidden="true">
                <ArrowLeft className="w-3 h-3" />
              </li>
              <li className="text-white font-semibold" aria-current="page">
                {area.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {area.isVip ? (
              <Badge className="bg-green-500 text-white border-0 mb-6 px-4 py-2 text-sm gap-2 shadow-lg shadow-green-500/30">
                <Crown className="w-4 h-4" aria-hidden="true" />
                خدمة VIP - منطقة مميّزة
              </Badge>
            ) : (
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
                <MapPin className="w-4 h-4 text-green-400" aria-hidden="true" />
                خدمة متاحة في {area.name}
              </Badge>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              نقل عفش
              <span className="block text-green-400 mt-2">{area.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              {area.description || area.metaDescription}
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
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  واتساب مباشر
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-3xl font-black text-white mb-1 tabular-nums">
                  +{siteConfig.yearsOfExperience}
                </div>
                <div className="text-xs text-white/60 font-medium">سنوات خبرة</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1 tabular-nums">
                  {siteConfig.ratings.count}+
                </div>
                <div className="text-xs text-white/60 font-medium">عميل راضٍ</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1 tabular-nums">24/7</div>
                <div className="text-xs text-white/60 font-medium">خدمة مستمرة</div>
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

      {/* ═══════════════ ABOUT AREA ═══════════════ */}
      {area.longDescription && (
        <section className="section-padding bg-white" aria-labelledby="about-area-heading">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                  خدمتنا في {area.name}
                </p>
                <h2
                  id="about-area-heading"
                  className="text-3xl md:text-4xl font-black text-green-950 mb-6 leading-tight"
                >
                  خبرتنا العميقة
                  <span className="block text-green-700 mt-1">في {area.name}</span>
                </h2>
                <div className="text-base md:text-lg text-slate-600 leading-loose whitespace-pre-line">
                  {area.longDescription}
                </div>
              </div>

              <aside className="lg:sticky lg:top-28">
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" aria-hidden="true">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-black text-xl mb-3">
                      عرض سعر مجاني لـ {area.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      معاينة مجانية في موقعك وعرض سعر شفاف بدون أي التزام
                    </p>
                    <div className="space-y-2">
                      <Button
                        asChild
                        className="w-full bg-white text-green-900 hover:bg-green-50 h-11 rounded-xl font-bold gap-2"
                      >
                        <a href={`tel:${siteConfig.phone}`}>
                          <Phone className="w-4 h-4" aria-hidden="true" />
                          اتصل الآن
                        </a>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-green-500 hover:bg-green-600 text-white h-11 rounded-xl font-bold gap-2"
                      >
                        <a
                          href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          واتساب
                        </a>
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-1.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" aria-hidden="true" />
                      ))}
                      <span className="text-sm font-bold mr-2">{siteConfig.ratings.value}/5</span>
                      <span className="text-xs text-white/60">
                        ({siteConfig.ratings.count}+ عميل)
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ SERVICES IN AREA ═══════════════ */}
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
              خدماتنا في {area.name}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              باقة متكاملة من الخدمات المصممة لسكان {area.name}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] || Truck;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                  <article className="bg-white border border-green-100/60 rounded-2xl p-5 hover:border-green-300 hover:shadow-lg transition-all h-full">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-700 transition-colors">
                      <Icon
                        className="w-6 h-6 text-green-700 group-hover:text-white transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-bold text-green-950 mb-2 group-hover:text-green-700 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {s.shortDescription}
                    </p>
                    <span className="text-green-700 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      اطلب الخدمة
                      <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPOUNDS ═══════════════ */}
      {area.compounds && area.compounds.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby="compounds-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-green-100 text-green-700 border-green-200 mb-4 px-4 py-1.5">
                <Crown className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                خدمة الكمبوندات
              </Badge>
              <h2
                id="compounds-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                نخدم أشهر كمبوندات {area.name}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                نُنسّق مع إدارات الكمبوندات لتسهيل جميع الإجراءات
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {area.compounds.map((c, i) => (
                <article
                  key={i}
                  className="group relative bg-green-50/40 border border-green-100/60 hover:border-green-300 rounded-2xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-white"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white group-hover:bg-green-700 rounded-xl flex items-center justify-center mb-3 border border-green-100 group-hover:border-green-700 transition-all">
                    <Building2
                      className="w-5 h-5 md:w-6 md:h-6 text-green-700 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-black text-sm md:text-base text-green-950 mb-2 leading-tight">
                    {c}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-green-700 font-semibold">
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    <span>خدمة متاحة</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ NEIGHBORHOODS ═══════════════ */}
      {area.neighborhoods && area.neighborhoods.length > 0 && (
        <section className="section-padding bg-green-50/40" aria-labelledby="neighborhoods-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                الأحياء والمناطق الفرعية
              </p>
              <h2
                id="neighborhoods-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                نغطي جميع أحياء {area.name}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                خدمة سريعة في كل شارع وحي بدون استثناء
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
              {area.neighborhoods.map((n, i) => (
                <div
                  key={i}
                  className="group inline-flex items-center gap-2 bg-white border border-green-100 hover:border-green-700 hover:bg-green-700 text-green-950 hover:text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold transition-all cursor-default"
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-green-600 group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WHY US IN THIS AREA ═══════════════ */}
      {(area.highlights || area.whyChooseUs) && (
        <section
          className="section-padding bg-gradient-to-br from-green-900 via-green-950 to-green-900 relative overflow-hidden"
          aria-labelledby="why-area-heading"
        >
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
          </div>

          <div className="relative container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-4 px-4 py-1.5">
                <Award className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                لماذا نتميّز
              </Badge>
              <h2
                id="why-area-heading"
                className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
              >
                خبرة تصنع الفارق في {area.name}
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                معرفة محلية عميقة تجعلنا الخيار الأول لسكان المنطقة
              </p>
            </div>

            {area.whyChooseUs && area.whyChooseUs.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {area.whyChooseUs.map((item, i) => (
                  <article
                    key={i}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-400/40 hover:bg-white/10 transition-all"
                  >
                    <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                      <Award className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-black text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                  </article>
                ))}
              </div>
            ) : area.highlights && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {area.highlights.map((h, i) => (
                  <article
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-400/40 transition-all"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="text-white/90 leading-relaxed font-semibold">{h}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ FAQ ═══════════════ */}
      {area.faqs && area.faqs.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby="faq-heading">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                  الأسئلة الشائعة
                </p>
                <h2
                  id="faq-heading"
                  className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
                >
                  إجابات لأسئلتك عن {area.name}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  كل ما تريد معرفته عن خدماتنا في هذه المنطقة
                </p>
              </div>

              <div className="space-y-3">
                {area.faqs.map((faq, i) => (
                  <article
                    key={i}
                    className="bg-green-50/40 border border-green-100/60 rounded-2xl p-5 md:p-6 hover:border-green-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-base md:text-lg text-green-950 mb-3 flex items-start gap-3">
                      <span className="w-7 h-7 bg-green-700 text-white rounded-lg flex items-center justify-center shrink-0 text-xs font-black tabular-nums">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{faq.question}</span>
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed pr-10">
                      {faq.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ RELATED AREAS ═══════════════ */}
      {related.length > 0 && (
        <section className="section-padding bg-green-50/40" aria-labelledby="related-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                مناطق قريبة
              </p>
              <h2
                id="related-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                نخدم أيضاً هذه المناطق
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                اكتشف تغطيتنا الشاملة للمناطق المجاورة
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/areas/${r.slug}`} className="group">
                  <article className="bg-white border border-green-100/60 hover:border-green-300 hover:shadow-lg transition-all h-full relative overflow-hidden rounded-2xl p-5 text-center">
                    {r.isVip && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-green-700 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                          <Crown className="w-2 h-2" aria-hidden="true" />
                          VIP
                        </div>
                      </div>
                    )}
                    <div className="w-12 h-12 bg-green-50 group-hover:bg-green-700 text-green-700 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-sm text-green-950 group-hover:text-green-700 transition-colors">
                      {r.name}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        className="section-padding bg-white"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-6 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              معاينة مجانية في {area.name}
            </Badge>

            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              جاهزون لخدمتك في
              <span className="block text-green-700 mt-2">{area.name}</span>
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              اتصل بنا الآن للحصول على عرض سعر مجاني ومعاينة في الموقع بدون أي التزام.
              فرقنا جاهزة للانطلاق في أقل من ساعة.
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
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
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