"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import {
  Phone, MessageCircle, Star, Shield, Clock, Users, ArrowLeft,
  MapPin, Truck, Award, Send, ThumbsUp, Zap, CheckCircle2,
  Package, Wrench, Wind, Box, ArrowUpToLine, Gem,
  ClipboardCheck, PackageCheck, Home as HomeIcon, CircleCheckBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { testimonials } from "@/config/testimonials";
import { LiveCounter } from "@/components/shared/LiveCounter";
import { TrustBar } from "@/components/shared/TrustBar";
import { InlineQuoteForm } from "@/components/shared/InlineQuoteForm";

const GallerySection = dynamic(
  () => import("@/components/features/GallerySection").then((m) => ({ default: m.GallerySection })),
  { loading: () => <div className="h-96 bg-[#FAFDF7]" aria-hidden="true" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/features/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="h-96 bg-white" aria-hidden="true" /> }
);

const serviceIcons: Record<string, React.ElementType> = {
  "naql-athath": Truck,
  "fak-tarkeeb-athath": Wrench,
  "fak-tarkeeb-takyifat": Wind,
  "taghleef-athath": Box,
  "wensh-raf3-athath": ArrowUpToLine,
  "naql-moqtaniat-hassasa": Gem,
};

/* ═══════ Animated Counter ═══════ */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-green-700 tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

/* ═══════ Data ═══════ */
const steps = [
  { icon: ClipboardCheck, title: "معاينة مجانية", desc: "بنيجي نشوف الأثاث ونقدر حجم الشغل ونديك سعر نهائي.", num: "01" },
  { icon: PackageCheck, title: "تغليف وفك", desc: "كل قطعة بتتغلف بالمادة المناسبة والأثاث بيتفك بترقيم.", num: "02" },
  { icon: Truck, title: "نقل آمن", desc: "سيارات مغلقة مجهزة بأنظمة تثبيت بتحمي أثاثك أثناء الطريق.", num: "03" },
  { icon: HomeIcon, title: "تركيب وتسليم", desc: "بنركب كل حاجة في مكانها الجديد ونسلمك النقلة كاملة.", num: "04" },
];

const whyUsItems = [
  { icon: Shield, title: "تأمين شامل", desc: "كل قطعة مؤمن عليها طول فترة النقل" },
  { icon: Users, title: "فريق متخصص", desc: "فنيين مدربين على كل أنواع الأثاث" },
  { icon: Clock, title: "مواعيد دقيقة", desc: "بنلتزم بالموعد المتفق عليه بدون تأخير" },
  { icon: ThumbsUp, title: "سعر نهائي", desc: "مفيش رسوم خفية. السعر المتفق عليه هو النهائي" },
  { icon: Zap, title: "خبرة بالكمبوندات", desc: "بنعرف إجراءات كل كمبوند وبنتعامل بسلاسة" },
  { icon: Award, title: "ضمان الجودة", desc: "لو مش راضي عن أي حاجة بنرجع نظبطها" },
];

const statsData = [
  { value: 500, suffix: "+", label: "عميل راضٍ", icon: Users },
  { value: 10, suffix: "+", label: "سنوات خبرة", icon: Award },
  { value: 24, suffix: "/7", label: "خدمة مستمرة", icon: Clock },
  { value: 98, suffix: "%", label: "معدل الرضا", icon: Star },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

/* ═══════ Schema.org JSON-LD ═══════ */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phoneIntl,
  email: siteConfig.email,
  priceRange: "$$",
  image: `${siteConfig.url}/herosection.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.region,
    postalCode: siteConfig.postalCode,
    addressCountry: siteConfig.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.latitude,
    longitude: siteConfig.coordinates.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.ratings.value,
    reviewCount: siteConfig.ratings.count,
    bestRating: siteConfig.ratings.best,
  },
  areaServed: featuredAreas.map((a) => ({
    "@type": "City",
    name: a.name,
  })),
};

export default function HomeContent() {
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt="خطوة لنقل الأثاث"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-green-950/95 via-green-950/80 to-green-950/40" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Text - takes 7 cols */}
            <div className="lg:col-span-7 space-y-7">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 text-sm px-4 py-2 gap-2">
                  <CircleCheckBig className="w-4 h-4 text-green-400" />
                  +500 عميل يثقون بنا في القاهرة الكبرى
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black text-white leading-[1.1] tracking-tight"
              >
                نقلتك
                <span className="block text-green-400 mt-1">بخطوة واحدة</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
              >
                فريق محترف بخبرة +10 سنوات. تغليف عالمي، سيارات مجهزة، وضمان كامل. من الباب للباب.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-wrap gap-3"
              >
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white gap-2 text-base h-13 px-7 shadow-xl shadow-green-500/25 rounded-2xl" asChild>
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="w-5 h-5" />
                    اتصل دلوقتي
                  </a>
                </Button>
                <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 gap-2 text-base h-13 px-7 rounded-2xl font-bold" asChild>
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    واتساب
                  </a>
                </Button>
                <a
                  href="#quote-form"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border-2 border-white/30 bg-white/5 backdrop-blur-sm px-7 text-base font-medium text-white transition-all hover:bg-white/15"
                >
                  <Send className="w-5 h-5" />
                  عرض سعر مجاني
                </a>
              </motion.div>

              {/* Trust Ticker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 pt-4"
              >
                {[
                  { icon: Shield, text: "ضمان شامل" },
                  { icon: Clock, text: "24/7" },
                  { icon: PackageCheck, text: "تغليف عالمي" },
                ].map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                      <ItemIcon className="w-4 h-4 text-green-400/70" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Floating Cards - takes 5 cols */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center gap-5 relative">
              {/* Rating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-5 w-64 self-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-950">4.9</div>
                    <div className="text-xs text-slate-500">تقييم العملاء</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>

              {/* Moves Counter Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-5 w-64 self-end"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-950">500+</div>
                    <div className="text-xs text-slate-500">عميل راضٍ</div>
                  </div>
                </div>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="bg-green-600 text-white rounded-3xl shadow-2xl p-5 w-64 self-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black">+10</div>
                    <div className="text-xs text-green-200">سنوات خبرة</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#FAFDF7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════ STATS ═══════════════════════ */}
      <section className="py-16 bg-[#FAFDF7]" aria-label="إحصائيات">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <StatIcon className="w-7 h-7 text-green-700" aria-hidden="true" />
                  </div>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <GallerySection />

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="section-padding bg-white" aria-labelledby="how-heading">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Badge className="bg-green-50 text-green-700 border-green-200 mb-4 px-4 py-1.5 text-sm">
              <Wrench className="w-4 h-4 mr-1.5" aria-hidden="true" />
              طريقة شغلنا
            </Badge>
            <h2
              id="how-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-3"
            >
              4 خطوات وبس
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-lg">
              من المعاينة للتسليم - كل حاجة منظمة ومحسوبة
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-px bg-green-200 translate-x-1/2" aria-hidden="true" />

            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-16">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={step.num}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`relative ${isEven ? "md:text-left" : "md:col-start-2 md:text-right"}`}
                  >
                    <div className={`hidden md:flex absolute top-2 ${isEven ? "-left-[62px]" : "-right-[62px]"} w-10 h-10 bg-green-700 text-white rounded-full items-center justify-center text-sm font-black z-10 shadow-lg shadow-green-700/30`}>
                      {step.num}
                    </div>

                    <Card className="border-green-100/60 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                      <CardContent className="p-6">
                        <div className={`flex items-start gap-4 ${isEven ? "" : "md:flex-row-reverse"}`}>
                          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors duration-300">
                            <StepIcon className="w-7 h-7 text-green-700 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                          </div>
                          <div>
                            <span className="md:hidden text-xs font-bold text-green-600 mb-1 block">خطوة {step.num}</span>
                            <h3 className="text-lg font-bold text-green-950 mb-1">{step.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SERVICES ═══════════════════════ */}
      <section
        className="section-padding bg-green-950 text-white relative overflow-hidden"
        aria-labelledby="services-heading"
      >
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-400 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-14">
            <Badge className="bg-green-500/15 text-green-300 border-green-500/30 mb-4 px-4 py-1.5 text-sm">
              <Package className="w-4 h-4 mr-1.5" aria-hidden="true" />
              خدماتنا
            </Badge>
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl font-black text-white mb-3"
            >
              كل اللي أثاثك محتاجه
            </h2>
            <p className="text-green-200/70 max-w-lg mx-auto text-lg">
              6 خدمات متكاملة تغطي كل احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              return (
                <motion.div
                  key={service.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link href={`/services/${service.slug}`} aria-label={`اعرف المزيد عن خدمة ${service.name}`}>
                    <article className="group h-full border border-green-800/50 bg-green-900/50 backdrop-blur-sm hover:bg-green-800/60 transition-all duration-300 cursor-pointer rounded-2xl p-6">
                      <div className="w-14 h-14 bg-green-500/15 border border-green-500/25 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-300">
                        <SIcon className="w-7 h-7 text-green-400 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-green-300 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-green-200/60 line-clamp-2 leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium group-hover:gap-3 transition-all">
                        <span>تفاصيل الخدمة</span>
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY US ═══════════════════════ */}
      <section className="section-padding bg-white" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-50 text-green-700 border-green-200 mb-4 px-4 py-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-1.5" aria-hidden="true" />
                ليه خطوة؟
              </Badge>
              <h2
                id="why-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-4"
              >
                مش مجرد شركة نقل
                <span className="block text-green-600 mt-1">احنا شريكك في كل تفصيلة</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                كل نقلة عندنا بتتعامل معاها كأنها الوحيدة. فريق مدرب، معدات حديثة، والتزام كامل بالوعود.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {whyUsItems.map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-50/60 border border-green-100/60 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                          <ItemIcon className="w-5 h-5 text-green-700" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-bold text-green-950 text-sm">{item.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <Image
                  src="/herosection.webp"
                  alt="فريق خطوة أثناء نقل الأثاث"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  loading="lazy"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
              </div>

              <div className="absolute -bottom-5 -left-5 bg-green-700 text-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-green-300" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-lg">تأمين شامل</div>
                    <div className="text-xs text-green-300">على كل المنقولات</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ AREAS ═══════════════════════ */}
      <section className="section-padding bg-green-50/40" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-4 px-4 py-1.5 text-sm">
              <MapPin className="w-4 h-4 mr-1.5" aria-hidden="true" />
              مناطق الخدمة
            </Badge>
            <h2
              id="areas-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-3"
            >
              موجودين في منطقتك
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-lg">
              نغطي أهم المناطق والكمبوندات في القاهرة والجيزة
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {featuredAreas.map((area, i) => (
              <motion.div
                key={area.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  href={`/areas/${area.slug}`}
                  aria-label={`خدمة نقل أثاث في ${area.name}`}
                >
                  <article className="group h-full flex items-center gap-4 bg-white rounded-2xl p-5 border border-green-100/60 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                      <MapPin className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-green-950 text-base group-hover:text-green-700 transition-colors truncate">
                        {area.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {area.neighborhoods.length} أحياء · خدمة VIP
                      </p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-green-600 transition-colors shrink-0" aria-hidden="true" />
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 gap-2 rounded-xl h-12 px-6"
              asChild
            >
              <Link href="/areas">
                عرض كل المناطق
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* ═══════════════════════ TESTIMONIAL SPOTLIGHT ═══════════════════════ */}
      <section
        className="section-padding bg-[#FAFDF7] overflow-hidden"
        aria-labelledby="spotlight-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-4 px-4 py-1.5 text-sm">
              <Star className="w-4 h-4 mr-1.5 fill-amber-400" aria-hidden="true" />
              رأي مميز
            </Badge>
            <h2
              id="spotlight-heading"
              className="text-3xl md:text-4xl font-black text-green-950"
            >
              عملاؤنا بيتكلموا
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-100/60 shadow-lg bg-white overflow-hidden">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="flex justify-center gap-0.5 mb-5">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6 font-medium">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm ${currentTestimonial.colorClass}`}>
                      {currentTestimonial.initials}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-950 text-lg">{currentTestimonial.name}</div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{currentTestimonial.area}</span>
                        <span className="mx-1">-</span>
                        <span className="text-green-600 font-medium">{currentTestimonial.service}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center gap-2 mt-6" role="tablist">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === activeTestimonial ? "w-8 bg-green-600" : "w-2.5 bg-green-200 hover:bg-green-300"
                  }`}
                  role="tab"
                  aria-selected={i === activeTestimonial}
                  aria-label={`عرض التقييم ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <InlineQuoteForm />

      {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
      <section
        className="section-padding bg-gradient-to-br from-green-700 via-green-800 to-green-900 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center space-y-6 relative z-10">
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl font-black text-white"
          >
            جاهز تنقل؟
          </h2>
          <p className="text-green-100 max-w-md mx-auto text-lg">
            كلمنا دلوقتي والمعاينة مجانية وعرض السعر فوري.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-white text-green-900 hover:bg-green-50 gap-2 text-base h-13 px-8 rounded-2xl font-bold shadow-xl"
              asChild
            >
              <a href={`tel:${siteConfig.phone}`} aria-label={`اتصل بنا على ${siteConfig.phone}`}>
                <Phone className="w-5 h-5" aria-hidden="true" />
                اتصل دلوقتي
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white gap-2 text-base h-13 px-8 rounded-2xl shadow-xl shadow-green-500/25"
              asChild
            >
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل معنا عبر واتساب"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}