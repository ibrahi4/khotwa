import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Phone, MessageCircle, ArrowLeft, MapPin, Building2,
  CheckCircle2, Crown, Sparkles, Shield, Award, Users, Clock,
  Star, Truck, Wrench, Wind, Box, ArrowUpToLine, Gem,
  Target, Zap, HeartHandshake,
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

      <section className="relative bg-white text-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt={`نقل عفش ${area.name}`}
            fill
            priority
            quality={75}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-teal-900/95 via-teal-900/80 to-teal-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent" />
        </div>

        <div className="relative container-custom py-16 md:py-20 w-full">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70 flex-wrap">
              <li><Link href="/" className="hover:text-[#0F766E] transition-colors">الرئيسية</Link></li>
              <li><ArrowLeft className="w-3 h-3" /></li>
              <li><Link href="/areas" className="hover:text-[#0F766E] transition-colors">مناطق الخدمة</Link></li>
              <li><ArrowLeft className="w-3 h-3" /></li>
              <li className="text-white font-semibold">{area.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {area.isVip ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F766E] to-[#0D5F5A] px-4 py-1.5 mb-6 shadow-lg shadow-[#0F766E]/30">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-black text-white tracking-wide">خدمة VIP - منطقة مميّزة</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 mb-6">
                <MapPin className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-semibold text-white/90 tracking-wide">خدمة متاحة الآن في {area.name}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              نقل عفش<br />
              <span className="text-[#0F766E]">{area.name}</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              {area.description || area.metaDescription}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              {[
                { icon: Shield, text: "ضمان كامل" },
                { icon: Clock, text: "24/7" },
                { icon: Award, text: "10+ سنوات" },
                { icon: Star, text: "4.9/5" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5">
                  <b.icon className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span className="text-xs font-semibold text-white">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0D5F5A] text-white font-bold h-14 px-8 rounded-md shadow-lg shadow-[#0F766E]/30 transition-all hover:scale-[1.02] text-base">
                <Phone className="w-4 h-4" />
                احجز موعدك الآن
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`استفسار عن نقل عفش ${area.name}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-14 px-8 rounded-md backdrop-blur text-base">
                <MessageCircle className="w-4 h-4" />
                تواصل واتساب
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">+10</div>
                <div className="text-xs text-white/50 font-medium">سنوات خبرة</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">500+</div>
                <div className="text-xs text-white/50 font-medium">عميل راضٍ</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">24/7</div>
                <div className="text-xs text-white/50 font-medium">خدمة مستمرة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF5EE] border-b border-[#E5E7EB]">
        <div className="container-custom py-10 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "ضمان كامل", desc: `على مقتنياتك في ${area.name}` },
              { icon: Clock, title: "خدمة 24/7", desc: "متاحون طوال الأسبوع" },
              { icon: Users, title: "فرق مدربة", desc: "متخصصون محترفون" },
              { icon: HeartHandshake, title: "أسعار شفافة", desc: "بدون رسوم خفية" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#0F766E] hover:shadow-md transition-all group">
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

      {area.longDescription && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                  <Target className="w-3 h-3 ml-1" />
                  عن خدمتنا في {area.name}
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                  لماذا خطوة هي الخيار الأمثل في <span className="text-[#0F766E]">{area.name}</span>؟
                </h2>
                <p className="text-base md:text-lg text-[#64748B] leading-loose">
                  {area.longDescription}
                </p>
              </div>

              <div className="lg:sticky lg:top-28">
                <Card className="bg-white border-0 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F766E]/10 rounded-full blur-3xl" />
                  <CardContent className="p-6 md:p-8 relative">
                    <div className="w-12 h-12 bg-[#0F766E] rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-black text-xl mb-3">احصل على عرض سعر مجاني</h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                      معاينة مجانية في {area.name} وعرض سعر شفاف بدون أي التزام
                    </p>
                    <div className="space-y-2">
                      <a href={`tel:${siteConfig.phone}`} className="flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0D5F5A] text-white font-bold h-11 px-4 rounded-md text-sm w-full">
                        <Phone className="w-4 h-4" />
                        اتصل الآن
                      </a>
                      <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`استفسار عن نقل عفش ${area.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-11 px-4 rounded-md text-sm w-full">
                        <MessageCircle className="w-4 h-4" />
                        واتساب
                      </a>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-[#0F766E] text-[#0F766E]" />
                      ))}
                      <span className="text-sm text-white/60 mr-2">4.9 من 5</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-[#FAF5EE]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
              <Truck className="w-3 h-3 ml-1" />
              خدماتنا
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              خدماتنا في {area.name}
            </h2>
            <p className="text-base text-[#64748B]">
              باقة متكاملة من الخدمات الاحترافية لسكان {area.name}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] || Truck;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                  <Card className="border-[#E5E7EB] hover:border-[#0F766E] hover:shadow-md transition-all bg-white h-full">
                    <CardContent className="p-5">
                      <div className="w-12 h-12 bg-[#FAF5EE] group-hover:bg-[#0F766E] text-[#0F766E] group-hover:text-white rounded-2xl flex items-center justify-center mb-4 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#0F766E] transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-xs text-[#64748B] line-clamp-2 mb-3">
                        {s.shortDescription}
                      </p>
                      <span className="text-[#0F766E] text-xs font-bold flex items-center gap-1">
                        اطلب الخدمة
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {area.compounds && area.compounds.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-white text-white border-0 mb-4 px-3 py-1">
                <Crown className="w-3 h-3 ml-1" />
                خدمة الكمبوندات
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                نخدم أشهر كمبوندات {area.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {area.compounds.map((c, i) => (
                <div key={i} className="group relative bg-gradient-to-br from-[#FAF5EE] to-white border border-[#E5E7EB] hover:border-[#0F766E] rounded-2xl p-4 md:p-5 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white group-hover:bg-[#0F766E] rounded-xl flex items-center justify-center mb-3 border border-[#E5E7EB] group-hover:border-[#0F766E] transition-all shadow-sm">
                    <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[#0F766E] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-black text-sm md:text-base text-slate-900 mb-1 leading-tight">
                    {c}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-[#64748B]">
                    <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                    <span>خدمة متاحة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {area.neighborhoods && area.neighborhoods.length > 0 && (
        <section className="section-padding bg-[#FAF5EE]">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                <MapPin className="w-3 h-3 ml-1" />
                الأحياء
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                نغطي جميع أحياء {area.name}
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
              {area.neighborhoods.map((n, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white text-slate-900 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold transition-all cursor-default group">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E] group-hover:text-white" />
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(area.highlights || area.whyChooseUs) && (
        <section className="section-padding bg-white text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F766E] rounded-full blur-3xl" />
          </div>

          <div className="relative container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-white/10 text-white border-white/20 mb-4">
                <Award className="w-3 h-3 ml-1" />
                لماذا نتميّز
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                خبرة تصنع الفارق في <span className="text-[#0F766E]">{area.name}</span>
              </h2>
            </div>

            {area.whyChooseUs && area.whyChooseUs.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {area.whyChooseUs.map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#0F766E]/50 hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-[#0F766E] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-black text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : area.highlights && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {area.highlights.map((h, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#0F766E]/50 transition-all">
                    <div className="w-12 h-12 bg-[#0F766E] rounded-2xl flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white/90 leading-relaxed font-semibold">{h}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {area.faqs && area.faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                  <HeartHandshake className="w-3 h-3 ml-1" />
                  الأسئلة الشائعة
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  إجابات لأسئلتك عن {area.name}
                </h2>
              </div>

              <div className="space-y-3">
                {area.faqs.map((faq, i) => (
                  <Card key={i} className="border-[#E5E7EB] hover:border-[#0F766E]/30 hover:shadow-md transition-all">
                    <CardContent className="p-5 md:p-6">
                      <h3 className="font-bold text-base md:text-lg text-slate-900 mb-3 flex items-start gap-3">
                        <span className="w-7 h-7 bg-[#0F766E] text-white rounded-lg flex items-center justify-center shrink-0 text-xs font-black">
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
                <MapPin className="w-3 h-3 ml-1" />
                مناطق قريبة
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                نخدم أيضاً هذه المناطق
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/areas/${r.slug}`} className="group">
                  <Card className="border-[#E5E7EB] hover:border-[#0F766E] hover:shadow-md transition-all bg-white h-full relative overflow-hidden">
                    {r.isVip && (
                      <Badge className="absolute top-2 left-2 bg-white text-white border-0 text-[10px] z-10">
                        <Crown className="w-2.5 h-2.5 ml-0.5" />
                        VIP
                      </Badge>
                    )}
                    <CardContent className="p-5 text-center">
                      <div className="w-12 h-12 bg-[#FAF5EE] group-hover:bg-[#0F766E] text-[#0F766E] group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0F766E] transition-colors">
                        {r.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0F766E] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-[#0F766E] text-white border-0 mb-6 px-4 py-1.5">
              <Sparkles className="w-3 h-3 ml-1" />
              معاينة مجانية في {area.name}
            </Badge>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              جاهزون لخدمتك في<br />
              <span className="text-[#0F766E]">{area.name}</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              اتصل بنا الآن للحصول على عرض سعر مجاني ومعاينة في الموقع بدون أي التزام
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0D5F5A] text-white font-bold h-14 px-8 rounded-md shadow-lg shadow-[#0F766E]/30 text-base">
                <Phone className="w-4 h-4" />
                اتصل: {siteConfig.phone}
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`استفسار عن نقل عفش ${area.name}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-14 px-8 rounded-md backdrop-blur text-base">
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
