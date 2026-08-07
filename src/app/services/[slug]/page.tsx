import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Truck, Wrench, Wind, Box, ArrowUpToLine, Gem,
  Phone, MessageCircle, CheckCircle2, ChevronLeft,
  Shield, Clock, Users, Award, Sparkles,
} from "lucide-react";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { serviceBackgrounds } from "@/config/media";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { Button } from "@/components/ui/button";
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

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const bg = serviceBackgrounds[slug];

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${slug}`,
    image: bg?.src || "/logo.jpeg",
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const Icon = serviceIcons[service.slug] || Truck;
  const bg = serviceBackgrounds[service.slug];
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);
  const serviceUrl = `${siteConfig.url}/services/${slug}`;

  const serviceSchema = generateServiceSchema(
    service.name,
    service.metaDescription,
    serviceUrl
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: siteConfig.url },
    { name: "خدماتنا", url: `${siteConfig.url}/services` },
    { name: service.name, url: serviceUrl },
  ]);

  const features = [
    { icon: Shield, title: "ضمان كامل", desc: "على جميع المقتنيات" },
    { icon: Users, title: "فرق متخصصة", desc: "مدربة على أعلى مستوى" },
    { icon: Clock, title: "التزام بالمواعيد", desc: "دقة في التنفيذ" },
    { icon: Award, title: "جودة عالية", desc: "معايير احترافية" },
  ];

  const benefits = [
    "معاينة مجانية قبل تحديد السعر",
    "أسعار شفافة بدون رسوم خفية",
    "فريق مدرب ومحترف",
    "معدات حديثة ومتطورة",
    "تغليف احترافي بمواد عالية الجودة",
    "ضمان كامل على المقتنيات",
    "خدمة سريعة والتزام بالمواعيد",
    "دعم فني قبل وبعد الخدمة",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* FULL HERO WITH IMAGE */}
      <section className="relative bg-[#1C1C1C] text-white overflow-hidden min-h-[85vh] flex items-center">
        {bg && (
          <div className="absolute inset-0">
            <Image
              src={bg.src}
              alt={bg.alt}
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#1C1C1C]/95 via-[#1C1C1C]/75 to-[#1C1C1C]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-[#1C1C1C]/30" />
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E85D04] to-transparent" />

        <div className="relative container-custom py-16 md:py-20 w-full">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link href="/" className="hover:text-[#E85D04] transition-colors">
                الرئيسية
              </Link>
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <Link href="/services" className="hover:text-[#E85D04] transition-colors">
                خدماتنا
              </Link>
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span className="text-[#E85D04] font-semibold" aria-current="page">
                {service.name}
              </span>
            </nav>

            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-[#E85D04]/30 rounded-2xl p-3 pl-5 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E85D04] to-[#C94A00] rounded-xl flex items-center justify-center shadow-lg shadow-[#E85D04]/40">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">
                  خدمة احترافية
                </div>
                <div className="text-sm font-bold text-white">
                  من خطوة لنقل الأثاث
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
              {service.name}
            </h1>

            <p className="text-base md:text-xl text-white/85 leading-relaxed max-w-2xl mb-8 drop-shadow-lg">
              {service.shortDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#E85D04] to-[#C94A00] hover:from-[#F97316] hover:to-[#E85D04] text-white font-bold h-14 px-8 shadow-2xl shadow-[#E85D04]/40 border-0 text-base"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-4 h-4 ml-2" />
                  احجز الخدمة الآن
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white/30 text-white hover:text-white h-14 px-8 backdrop-blur text-base"
              >
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  واتساب
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              {[
                { value: "+10", label: "سنوات خبرة" },
                { value: "500+", label: "عميل راضٍ" },
                { value: "24/7", label: "خدمة مستمرة" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-[#E85D04] mb-1 drop-shadow-[0_0_15px_rgba(232,93,4,0.4)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-[#FAF5EE] border-b border-[#E5E1DA]">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#E5E1DA] hover:border-[#E85D04] hover:shadow-md hover:shadow-[#E85D04]/15 transition-all"
              >
                <div className="w-11 h-11 bg-[#E85D04]/10 text-[#E85D04] rounded-xl flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#1C1C1C] text-sm">{f.title}</div>
                  <div className="text-xs text-[#64748B]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="border-[#E85D04] text-[#E85D04] bg-[#E85D04]/5 mb-4">
                <Sparkles className="w-3 h-3 ml-1.5" />
                لماذا خطوة
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-5 leading-tight tracking-tight">
                خدمة تليق <span className="text-[#E85D04]">بمنزلك</span>
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
                نقدم خدمة {service.name} بأعلى معايير الجودة والاحترافية،
                مع الالتزام الكامل بالمواعيد وضمان سلامة مقتنياتك.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#FAF5EE] p-4 rounded-2xl border border-[#E5E1DA] hover:border-[#E85D04] hover:shadow-md hover:shadow-[#E85D04]/10 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#E85D04] to-[#C94A00] text-white rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-[#E85D04]/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm md:text-base text-[#1C1C1C] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#FAF5EE]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-[#1C1C1C] border-0 text-white overflow-hidden relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E85D04] to-transparent" />

              <CardContent className="p-8 md:p-12 relative">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#E85D04] to-[#C94A00] rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-[#E85D04]/40">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                      احجز {service.name}
                      <br />
                      <span className="text-[#E85D04] drop-shadow-[0_0_20px_rgba(232,93,4,0.4)]">الآن</span>
                    </h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      تواصل معنا لحجز موعد المعاينة والحصول على عرض سعر شفاف
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#E85D04] to-[#C94A00] hover:from-[#F97316] hover:to-[#E85D04] text-white font-bold h-14 shadow-xl shadow-[#E85D04]/40 border-0"
                    >
                      <a href={`tel:${siteConfig.phone}`}>
                        <Phone className="w-4 h-4 ml-2" />
                        اتصل الآن
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-white hover:text-white h-14 backdrop-blur"
                    >
                      <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 ml-2" />
                        واتساب
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="border-[#E85D04] text-[#E85D04] bg-[#E85D04]/5 mb-4">
              خدمات أخرى
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
              اكتشف باقي خدماتنا
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((s) => {
              const SIcon = serviceIcons[s.slug] || Truck;
              const sBg = serviceBackgrounds[s.slug];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block group">
                  <Card className="h-full overflow-hidden hover:shadow-xl hover:shadow-[#E85D04]/20 hover:border-[#E85D04] transition-all duration-500 cursor-pointer border-[#E5E1DA]">
                    {sBg && (
                      <div className="relative aspect-video overflow-hidden bg-[#FAF5EE]">
                        <Image
                          src={sBg.src}
                          alt={sBg.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-[#1C1C1C]/30 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <div className="w-11 h-11 bg-gradient-to-br from-[#E85D04] to-[#C94A00] rounded-xl flex items-center justify-center shadow-lg shadow-[#E85D04]/40">
                            <SIcon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-[#1C1C1C] mb-2 group-hover:text-[#E85D04] transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
                        {s.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#1C1C1C] to-[#0F0F0F] hover:from-[#2A2A2A] hover:to-[#1C1C1C] text-white h-12 px-8"
            >
              <Link href="/services">عرض جميع الخدمات</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}