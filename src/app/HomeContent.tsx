"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import {
  Phone, MessageCircle, ArrowLeft, CheckCircle2, Shield,
  Clock, Users, Truck, MapPin, Star, Award, Sparkles,
  Wrench, Wind, Box, ArrowUpToLine, Gem, Crown,
} from "lucide-react";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { serviceBackgrounds } from "@/config/media";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GallerySection = dynamic(
  () => import("@/components/features/GallerySection").then(m => ({ default: m.GallerySection })),
  { loading: () => <div className="h-96 bg-[#FAF5EE] animate-pulse" /> }
);

const VideosSection = dynamic(
  () => import("@/components/features/VideosSection").then(m => ({ default: m.VideosSection })),
  { loading: () => <div className="h-96 bg-white animate-pulse" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/features/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="h-96 bg-[#FAF5EE] animate-pulse" /> }
);

const serviceIcons: Record<string, React.ElementType> = {
  "naql-athath": Truck,
  "fak-tarkeeb-athath": Wrench,
  "fak-tarkeeb-takyifat": Wind,
  "taghleef-athath": Box,
  "wensh-raf3-athath": ArrowUpToLine,
  "naql-moqtaniat-hassasa": Gem,
};

export default function HomeContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#1C1C1C] text-white overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt="خطوة لنقل الأثاث"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1C1C1C]/95 via-[#1C1C1C]/70 to-[#1C1C1C]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />
        </div>

        <div className="relative container-custom py-16 md:py-20 lg:py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                {mounted && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E85D04] opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E85D04]" />
              </span>
              <span className="text-xs font-semibold text-white/90 tracking-wide">
                خدمة متاحة الآن في التجمع ومدينتي
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight text-white">
              انتقل لبيتك الجديد
              <br />
              <span className="text-[#E85D04]">بخطوة واحدة</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              خدمة نقل أثاث احترافية تليق بمنزلك، بفريق مدرب ومعدات حديثة.
              نتعامل مع كل قطعة كأنها لنا.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-14 px-8 text-base shadow-lg transition-all duration-200 hover:scale-[1.02] border-0"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-4 h-4 ml-2" />
                  احجز موعدك الآن
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 hover:bg-white/10 border-white/20 text-white hover:text-white h-14 px-8 text-base backdrop-blur-md"
              >
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  تواصل عبر واتساب
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
              {[
                { value: "+10", label: "سنوات خبرة" },
                { value: "500+", label: "عميل راضٍ" },
                { value: "24/7", label: "خدمة مستمرة" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="bg-[#FAF5EE] border-b border-[#E5E7EB]">
        <div className="container-custom py-10 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { icon: Shield, title: "ضمان كامل", desc: "على جميع المقتنيات" },
              { icon: Clock, title: "خدمة 24/7", desc: "متاحون طوال الأسبوع" },
              { icon: Users, title: "فرق مدربة", desc: "متخصصون محترفون" },
              { icon: Crown, title: "خدمة VIP", desc: "للكمبوندات والفلل" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#1C1C1C] hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 bg-[#F5F5F5] group-hover:bg-[#1C1C1C] text-[#1C1C1C] group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all duration-300">
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

      {/* SERVICES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4 px-3 py-1">
              خدماتنا
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
              حلول متكاملة لنقل الأثاث
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              باقة شاملة من الخدمات الاحترافية تغطي جميع احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug] || Truck;
              const bg = serviceBackgrounds[s.slug];

              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block group">
                  <div className="relative h-[440px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 bg-[#1C1C1C]">
                    {bg && (
                      <Image
                        src={bg.src}
                        alt={bg.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={i < 3 ? "eager" : "lazy"}
                        quality={80}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-[#1C1C1C]/20 group-hover:from-[#1C1C1C] group-hover:via-[#1C1C1C]/50 transition-all duration-500" />

                    <div className="absolute top-5 left-5 z-10">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-base">0{i + 1}</span>
                      </div>
                    </div>

                    <div className="absolute top-5 right-5 z-10">
                      <div className="w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-[#1C1C1C]" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 right-0 left-0 p-6 md:p-7 z-10">
                      <div className="w-12 h-0.5 bg-[#E85D04] mb-4 group-hover:w-24 transition-all duration-500" />

                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight tracking-tight">
                        {s.name}
                      </h3>

                      <p className="text-white/80 text-sm leading-relaxed mb-5 line-clamp-2">
                        {s.shortDescription}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <span className="text-[#E85D04] font-bold text-sm flex items-center gap-2">
                          اكتشف الخدمة
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <GallerySection />

      {/* WHY US */}
      <section className="section-padding bg-[#FAF5EE]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                لماذا خطوة
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-5 leading-tight tracking-tight">
                خبرة تصنع الفارق
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-8">
                نؤمن أن كل قطعة أثاث تحمل ذكريات وقيمة، لذلك نتعامل مع مقتنياتكم بالعناية التي تستحقها.
              </p>

              <div className="space-y-3">
                {[
                  { title: "فرق مدربة على أعلى مستوى", desc: "خبراء في فك وتركيب جميع أنواع الأثاث" },
                  { title: "تغليف احترافي بمواد عالية الجودة", desc: "حماية كاملة للأثاث والمقتنيات" },
                  { title: "أسطول حديث من السيارات المجهزة", desc: "نقل آمن وسريع" },
                  { title: "أسعار شفافة ومنافسة", desc: "بدون رسوم خفية أو مفاجآت" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 bg-white p-4 md:p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#1C1C1C] transition-all">
                    <div className="w-10 h-10 bg-[#F5F5F5] text-[#1C1C1C] rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#1C1C1C] text-sm md:text-base mb-1">{item.title}</h4>
                      <p className="text-xs md:text-sm text-[#64748B]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <Card className="bg-[#1C1C1C] border-0 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-3xl" />

                <CardContent className="p-8 md:p-10 relative">
                  <div className="w-14 h-14 bg-[#E85D04] rounded-2xl flex items-center justify-center mb-6">
                    <Award className="w-7 h-7 text-white" />
                  </div>

                  <div className="text-6xl md:text-8xl font-black text-white mb-3 tracking-tight">
                    +10
                  </div>
                  <div className="text-xl md:text-2xl font-bold mb-2">سنوات من التميز</div>
                  <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
                    رحلة طويلة من الالتزام والاحترافية في خدمة آلاف العملاء
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="text-2xl md:text-3xl font-black text-white mb-1">500+</div>
                      <div className="text-xs md:text-sm text-white/60">عميل راضٍ</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="text-2xl md:text-3xl font-black text-white mb-1">98%</div>
                      <div className="text-xs md:text-sm text-white/60">معدل الرضا</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                    ))}
                    <span className="text-sm text-white/60 mr-2">تقييم 4.9 من 5</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <VideosSection />

      {/* AREAS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
              مناطق الخدمة
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
              متخصصون في الكمبوندات الراقية
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              فرقنا المتخصصة تخدم الكمبوندات والفلل في التجمع ومدينتي والشيخ زايد
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredAreas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`}>
                <Card className="hover:border-[#1C1C1C] hover:shadow-md transition-all duration-300 group cursor-pointer border-[#E5E7EB] relative overflow-hidden bg-[#FAF5EE] hover:bg-white">
                  <Badge className="absolute top-2 left-2 bg-[#1C1C1C] text-white border-0 text-[10px] z-10">
                    <Crown className="w-2.5 h-2.5 ml-0.5" />
                    VIP
                  </Badge>
                  <CardContent className="p-5 md:p-6 text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white group-hover:bg-[#1C1C1C] text-[#1C1C1C] group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 border border-[#E5E7EB] group-hover:border-[#1C1C1C]">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="font-bold text-sm md:text-base text-[#1C1C1C]">
                      {area.name}
                    </div>
                    <div className="text-[10px] md:text-xs text-[#64748B] mt-1">خدمة VIP</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Button
              asChild
              className="bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white h-12 px-8"
            >
              <Link href="/areas">
                عرض جميع المناطق
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-[#1C1C1C] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E85D04] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 text-white border border-white/20 mb-6 px-4 py-1.5">
              ابدأ معنا اليوم
            </Badge>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              جاهزون لخدمتك
              <br />
              <span className="text-[#E85D04]">في أي وقت</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا الآن للحصول على معاينة مجانية وعرض سعر شفاف
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-14 px-8 shadow-lg text-base border-0"
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
                className="bg-white/5 hover:bg-white/10 border-white/20 text-white hover:text-white h-14 px-8 backdrop-blur text-base"
              >
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 ml-2" />
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