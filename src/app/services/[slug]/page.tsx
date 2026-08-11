import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, CheckCircle2, Shield,
  Award, Sparkles, Target, Zap, HeartHandshake, Star,
  Clock, Users, Truck, Wrench, Wind, Box, ArrowUpToLine, Gem,
  DollarSign, ListChecks,
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

      <section className="relative bg-[#1C1C1C] text-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          {bg && (
            <Image
              src={bg.src}
              alt={bg.alt}
              fill
              priority
              quality={75}
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-[#1C1C1C]/95 via-[#1C1C1C]/80 to-[#1C1C1C]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />
        </div>

        <div className="relative container-custom py-16 md:py-20 w-full">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70 flex-wrap">
              <li><Link href="/" className="hover:text-[#E85D04] transition-colors">الرئيسية</Link></li>
              <li><ArrowLeft className="w-3 h-3" /></li>
              <li><Link href="/services" className="hover:text-[#E85D04] transition-colors">خدماتنا</Link></li>
              <li><ArrowLeft className="w-3 h-3" /></li>
              <li className="text-white font-semibold">{service.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 mb-6">
              <Icon className="w-4 h-4 text-[#E85D04]" />
              <span className="text-xs font-semibold text-white/90 tracking-wide">خدمة احترافية</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              <span className="text-[#E85D04]">{service.name}</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              {[
                { icon: Shield, text: "ضمان كامل" },
                { icon: Clock, text: "24/7" },
                { icon: Award, text: "10+ سنوات" },
                { icon: Star, text: "4.9/5" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5">
                  <b.icon className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span className="text-xs font-semibold text-white">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-14 px-8 rounded-md shadow-lg shadow-[#E85D04]/30 transition-all hover:scale-[1.02] text-base">
                <Phone className="w-4 h-4" />
                احجز الخدمة الآن
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`استفسار عن خدمة ${service.name}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-14 px-8 rounded-md backdrop-blur text-base">
                <MessageCircle className="w-4 h-4" />
                تواصل واتساب
              </a>
            </div>

            {service.priceRange && (
              <div className="mt-8 inline-flex items-center gap-3 bg-white/5 border border-[#E85D04]/30 rounded-2xl px-5 py-3">
                <DollarSign className="w-5 h-5 text-[#E85D04]" />
                <div>
                  <div className="text-xs text-white/60">السعر</div>
                  <div className="text-base font-bold text-white">{service.priceRange}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF5EE] border-b border-[#E5E7EB]">
        <div className="container-custom py-10 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "ضمان كامل", desc: "على جميع الخدمات" },
              { icon: Clock, title: "خدمة 24/7", desc: "متاحون طوال الأسبوع" },
              { icon: Users, title: "فرق مدربة", desc: "متخصصون محترفون" },
              { icon: HeartHandshake, title: "أسعار شفافة", desc: "بدون رسوم خفية" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#E85D04] hover:shadow-md transition-all group">
                <div className="w-11 h-11 md:w-12 md:h-12 bg-[#FAF5EE] group-hover:bg-[#E85D04] text-[#1C1C1C] group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all">
                  <f.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#1C1C1C] text-sm md:text-base">{f.title}</div>
                  <div className="text-xs md:text-sm text-[#64748B]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.longDescription && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                  <Target className="w-3 h-3 ml-1" />
                  عن الخدمة
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-6 leading-tight tracking-tight">
                  كل ما تحتاج معرفته عن <span className="text-[#E85D04]">{service.name}</span>
                </h2>
                <p className="text-base md:text-lg text-[#64748B] leading-loose">
                  {service.longDescription}
                </p>
              </div>

              <div className="lg:sticky lg:top-28">
                <Card className="bg-[#1C1C1C] border-0 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-3xl" />
                  <CardContent className="p-6 md:p-8 relative">
                    <div className="w-12 h-12 bg-[#E85D04] rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-black text-xl mb-3">احجز خدمتك الآن</h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                      معاينة مجانية وعرض سعر شفاف بدون أي التزام
                    </p>
                    <div className="space-y-2">
                      <a href={`tel:${siteConfig.phone}`} className="flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-11 px-4 rounded-md text-sm w-full">
                        <Phone className="w-4 h-4" />
                        اتصل الآن
                      </a>
                      <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`استفسار عن خدمة ${service.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-11 px-4 rounded-md text-sm w-full">
                        <MessageCircle className="w-4 h-4" />
                        واتساب
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {service.features && service.features.length > 0 && (
        <section className="section-padding bg-[#FAF5EE]">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                <ListChecks className="w-3 h-3 ml-1" />
                المميزات
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
                ما يميّز خدمتنا
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#E85D04] hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#E85D04]/10 text-[#E85D04] rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-[#1C1C1C] font-semibold text-sm md:text-base pt-1.5">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                <Award className="w-3 h-3 ml-1" />
                الفوائد
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
                لماذا تختار خدمتنا؟
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {service.benefits.map((benefit, i) => (
                <Card key={i} className="border-[#E5E7EB] hover:border-[#E85D04] hover:shadow-md transition-all bg-white h-full group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#FAF5EE] group-hover:bg-[#E85D04] text-[#E85D04] group-hover:text-white rounded-2xl flex items-center justify-center mb-4 transition-all">
                      <Award className="w-7 h-7" />
                    </div>
                    <h3 className="font-black text-lg text-[#1C1C1C] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.process && service.process.length > 0 && (
        <section className="section-padding bg-[#1C1C1C] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04] rounded-full blur-3xl" />
          </div>

          <div className="relative container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-white/10 text-white border-white/20 mb-4">
                <Target className="w-3 h-3 ml-1" />
                خطوات العمل
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                كيف <span className="text-[#E85D04]">نعمل</span>؟
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {service.process.map((step, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#E85D04]/50 hover:bg-white/10 transition-all group relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#E85D04] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="font-black text-lg text-white mb-3 mt-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.suitableFor && service.suitableFor.length > 0 && (
        <section className="section-padding bg-[#FAF5EE]">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                <Users className="w-3 h-3 ml-1" />
                مناسب لـ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-4 tracking-tight">
                خدمة تناسب الجميع
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
              {service.suitableFor.map((item, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] hover:border-[#E85D04] hover:bg-[#E85D04] hover:text-white text-[#1C1C1C] px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold transition-all cursor-default group">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E85D04] group-hover:text-white" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                  <HeartHandshake className="w-3 h-3 ml-1" />
                  الأسئلة الشائعة
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-4 tracking-tight">
                  إجابات لأسئلتك
                </h2>
              </div>

              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <Card key={i} className="border-[#E5E7EB] hover:border-[#E85D04]/30 hover:shadow-md transition-all">
                    <CardContent className="p-5 md:p-6">
                      <h3 className="font-bold text-base md:text-lg text-[#1C1C1C] mb-3 flex items-start gap-3">
                        <span className="w-7 h-7 bg-[#E85D04] text-white rounded-lg flex items-center justify-center shrink-0 text-xs font-black">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{faq.question}</span>
                      </h3>
                      <p className="text-sm md:text-base text-[#64748B] leading-relaxed pr-10">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-padding bg-[#FAF5EE]">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                <Sparkles className="w-3 h-3 ml-1" />
                خدمات ذات صلة
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-4 tracking-tight">
                خدمات أخرى قد تهمك
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => {
                const RIcon = serviceIcons[r.slug] || Truck;
                return (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="group">
                    <Card className="border-[#E5E7EB] hover:border-[#E85D04] hover:shadow-md transition-all bg-white h-full">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-[#FAF5EE] group-hover:bg-[#E85D04] text-[#E85D04] group-hover:text-white rounded-2xl flex items-center justify-center mb-4 transition-all">
                          <RIcon className="w-7 h-7" />
                        </div>
                        <h3 className="font-black text-lg text-[#1C1C1C] mb-2 group-hover:text-[#E85D04] transition-colors">
                          {r.name}
                        </h3>
                        <p className="text-sm text-[#64748B] line-clamp-2 mb-4">
                          {r.shortDescription}
                        </p>
                        <span className="text-[#E85D04] text-sm font-bold flex items-center gap-1">
                          اعرف المزيد
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="relative bg-[#1C1C1C] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E85D04] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-[#E85D04] text-white border-0 mb-6 px-4 py-1.5">
              <Sparkles className="w-3 h-3 ml-1" />
              معاينة مجانية
            </Badge>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              جاهزون لتقديم<br />
              <span className="text-[#E85D04]">{service.name}</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              اتصل بنا الآن للحصول على عرض سعر مجاني ومعاينة في الموقع بدون أي التزام
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-14 px-8 rounded-md shadow-lg shadow-[#E85D04]/30 text-base">
                <Phone className="w-4 h-4" />
                اتصل: {siteConfig.phone}
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`استفسار عن خدمة ${service.name}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-14 px-8 rounded-md backdrop-blur text-base">
                <MessageCircle className="w-4 h-4" />
                تواصل واتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
