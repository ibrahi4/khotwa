import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, CheckCircle2, Shield,
  Award, Sparkles, Target, Zap, HeartHandshake, Star,
  Clock, Users, Truck, Wrench, Wind, Box, ArrowUpToLine, Gem,
  DollarSign, ListChecks, PackageCheck,
} from "lucide-react";
import { services, getServiceBySlug, getRelatedServices } from "@/config/services";
import { siteConfig } from "@/config/site";
import { serviceBackgrounds } from "@/config/media";
import { buildServiceMetadata } from "@/lib/seo/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";
import { Card, CardContent } from "@/components/ui/card";
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

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildServiceMetadata(service);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug, 3);
  const Icon = serviceIcons[service.slug] || Truck;
  const bg = serviceBackgrounds[service.slug];
  const serviceUrl = `${siteConfig.url}/services/${service.slug}`;

  const serviceSchema = generateServiceSchema(
    service.name,
    service.longDescription || service.shortDescription,
    serviceUrl,
    bg?.src ? `${siteConfig.url}${bg.src}` : undefined
  );

  const faqSchema = service.faqs && service.faqs.length > 0
    ? generateFAQSchema(service.faqs)
    : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: siteConfig.url },
    { name: "خدماتنا", url: `${siteConfig.url}/services` },
    { name: service.name, url: serviceUrl },
  ]);

  const waMessage = encodeURIComponent(`استفسار عن خدمة ${service.name}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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

      {/* ═══════════════ HERO - Split Layout ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label={`خدمة ${service.name}`}
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
          {/* Breadcrumb */}
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
                <Link href="/services" className="hover:text-green-300 transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li aria-hidden="true">
                <ArrowLeft className="w-3 h-3" />
              </li>
              <li className="text-white font-semibold" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Text Side */}
            <div className="lg:col-span-7 space-y-6">
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 text-sm px-4 py-2 gap-2">
                <Icon className="w-4 h-4 text-green-400" aria-hidden="true" />
                خدمة احترافية
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                {service.name}
                <span className="block text-green-400 mt-2 text-2xl md:text-3xl font-bold">
                  خدمة تليق بمنزلك
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { icon: Shield, text: "ضمان كامل" },
                  { icon: Clock, text: "24/7" },
                  { icon: Award, text: `+${siteConfig.yearsOfExperience} سنوات` },
                  { icon: Star, text: `${siteConfig.ratings.value}/5` },
                ].map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5"
                    >
                      <BIcon className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                      <span className="text-xs font-semibold text-white">{b.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white gap-2 text-base h-13 px-7 rounded-2xl shadow-xl shadow-green-500/25"
                >
                  <a href={`tel:${siteConfig.phone}`} aria-label={`اتصل بنا على ${siteConfig.phone}`}>
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    احجز الخدمة الآن
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
                    aria-label="تواصل معنا عبر واتساب"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    واتساب مباشر
                  </a>
                </Button>
              </div>

              {/* Price */}
              {service.priceRange && (
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-2xl px-5 py-3">
                  <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">السعر يبدأ من</div>
                    <div className="text-base font-bold text-white">{service.priceRange}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Side */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-green-800/50">
                  {bg && (
                    <Image
                      src={bg.src}
                      alt={bg.alt || `خدمة ${service.name}`}
                      fill
                      priority
                      quality={85}
                      className="object-cover"
                      sizes="(max-width: 1024px) 0vw, 40vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                </div>

                {/* Floating icon badge */}
                <div className="absolute -top-4 -left-4 bg-green-500 rounded-2xl p-4 shadow-xl">
                  <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                {/* Rating floating card */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-sm font-black text-green-950">{siteConfig.ratings.value}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">تقييم {siteConfig.ratings.count}+ عميل</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 inset-x-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════ TRUST BAR ═══════════════ */}
      <section className="bg-white border-b border-slate-100" aria-label="مميزات الخدمة">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "ضمان كامل", desc: "على جميع الخدمات" },
              { icon: Clock, title: "خدمة 24/7", desc: "متاحون طوال الأسبوع" },
              { icon: Users, title: "فرق مدربة", desc: "متخصصون محترفون" },
              { icon: HeartHandshake, title: "أسعار شفافة", desc: "بدون رسوم خفية" },
            ].map((f, i) => {
              const FIcon = f.icon;
              return (
                <article
                  key={i}
                  className="group flex items-center gap-3 bg-green-50/40 border border-green-100/60 p-4 md:p-5 rounded-2xl hover:border-green-300 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-white group-hover:bg-green-700 rounded-xl flex items-center justify-center shrink-0 transition-colors border border-green-100">
                    <FIcon className="w-5 h-5 md:w-6 md:h-6 text-green-700 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-green-950 text-sm md:text-base">{f.title}</h3>
                    <p className="text-xs md:text-sm text-slate-500">{f.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT THE SERVICE ═══════════════ */}
      {service.longDescription && (
        <section className="section-padding bg-white" aria-labelledby="about-service-heading">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                  عن الخدمة
                </p>
                <h2
                  id="about-service-heading"
                  className="text-3xl md:text-4xl font-black text-green-950 mb-6 leading-tight"
                >
                  كل ما تحتاج معرفته
                  <span className="block text-green-700 mt-1">عن {service.name}</span>
                </h2>
                <div className="text-base md:text-lg text-slate-600 leading-loose whitespace-pre-line">
                  {service.longDescription}
                </div>
              </div>

              {/* Sticky Booking Card */}
              <aside className="lg:sticky lg:top-28">
                <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" aria-hidden="true">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-black text-xl mb-3">احجز خدمتك الآن</h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      معاينة مجانية وعرض سعر شفاف بدون أي التزام
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
                      <span className="text-xs text-white/60">({siteConfig.ratings.count}+ عميل)</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ FEATURES ═══════════════ */}
      {service.features && service.features.length > 0 && (
        <section className="section-padding bg-green-50/40" aria-labelledby="features-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                المميزات
              </p>
              <h2
                id="features-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                ما يميّز خدمتنا
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                نقدم لك أفضل الخدمات بأعلى معايير الجودة والاحترافية
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {service.features.map((feature, i) => (
                <article
                  key={i}
                  className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-green-100/60 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-700" aria-hidden="true" />
                  </div>
                  <p className="text-green-950 font-semibold text-sm md:text-base pt-1.5 leading-relaxed">
                    {feature}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ BENEFITS ═══════════════ */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby="benefits-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                الفوائد
              </p>
              <h2
                id="benefits-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                لماذا تختار خدمتنا؟
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                فوائد حقيقية تحصل عليها مع كل خدمة نقدمها
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.benefits.map((benefit, i) => (
                <article
                  key={i}
                  className="group bg-green-50/40 border border-green-100/60 rounded-2xl p-6 hover:border-green-300 hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-white border border-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:border-green-700 transition-colors">
                    <Award className="w-7 h-7 text-green-700 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="font-black text-lg text-green-950 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ PROCESS ═══════════════ */}
      {service.process && service.process.length > 0 && (
        <section
          className="section-padding bg-gradient-to-br from-green-900 via-green-950 to-green-900 relative overflow-hidden"
          aria-labelledby="process-heading"
        >
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
          </div>

          <div className="relative container-custom">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-4 px-4 py-1.5">
                <Target className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                خطوات العمل
              </Badge>
              <h2
                id="process-heading"
                className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
              >
                كيف نعمل معك؟
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                عملية احترافية مدروسة من أول اتصال حتى تسليم الخدمة
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {service.process.map((step, i) => (
                <article
                  key={i}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-400/40 hover:bg-white/10 transition-all relative"
                >
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-green-500/30">
                    {step.step}
                  </div>
                  <h3 className="font-black text-lg text-white mb-3 mt-4">{step.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ SUITABLE FOR ═══════════════ */}
      {service.suitableFor && service.suitableFor.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby="suitable-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                مناسب لـ
              </p>
              <h2
                id="suitable-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                خدمة تناسب الجميع
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                نقدم خدماتنا لجميع أنواع العملاء والاحتياجات
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
              {service.suitableFor.map((item, i) => (
                <div
                  key={i}
                  className="group inline-flex items-center gap-2 bg-green-50/60 border border-green-100 hover:border-green-700 hover:bg-green-700 text-green-950 hover:text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold transition-all cursor-default"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 group-hover:text-white transition-colors" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ FAQ ═══════════════ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section-padding bg-green-50/40" aria-labelledby="faq-heading">
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
                  إجابات لأسئلتك
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  كل ما تريد معرفته عن {service.name}
                </p>
              </div>

              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <article
                    key={i}
                    className="bg-white border border-green-100/60 rounded-2xl p-5 md:p-6 hover:border-green-300 hover:shadow-md transition-all"
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

      {/* ═══════════════ RELATED SERVICES ═══════════════ */}
      {related.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby="related-heading">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                خدمات ذات صلة
              </p>
              <h2
                id="related-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
              >
                خدمات أخرى قد تهمك
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                اكتشف باقة خدماتنا المتكاملة لنقل الأثاث
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => {
                const RIcon = serviceIcons[r.slug] || Truck;
                return (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="group">
                    <article className="h-full bg-white border border-green-100/60 rounded-2xl p-6 hover:border-green-300 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-700 transition-colors">
                        <RIcon className="w-7 h-7 text-green-700 group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>
                      <h3 className="font-black text-lg text-green-950 mb-2 group-hover:text-green-700 transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {r.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-green-700 text-sm font-bold group-hover:gap-3 transition-all">
                        اعرف المزيد
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-20"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/15 backdrop-blur-md text-white border-white/25 mb-6 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              معاينة مجانية
            </Badge>

            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight"
            >
              جاهزون لتقديم
              <span className="block text-green-300 mt-2">{service.name}</span>
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              اتصل بنا الآن للحصول على عرض سعر مجاني ومعاينة في الموقع بدون أي التزام
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 h-13 px-8 rounded-2xl font-bold text-base gap-2 shadow-xl"
              >
                <a
                  href={`tel:${siteConfig.phone}`}
                  aria-label={`اتصل بنا على ${siteConfig.phone}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  اتصل: {siteConfig.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white h-13 px-8 rounded-2xl font-bold text-base gap-2 shadow-xl shadow-green-500/30"
              >
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تواصل معنا عبر واتساب"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  تواصل واتساب
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}