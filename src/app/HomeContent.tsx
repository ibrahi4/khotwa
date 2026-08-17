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
import { Badge } from "@/components/ui/badge";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { CompoundsTrust } from "@/components/shared/CompoundsTrust";
import { LiveOrdersFeed } from "@/components/shared/LiveOrdersFeed";
import { InlineQuoteForm } from "@/components/shared/InlineQuoteForm";
import { GallerySection } from "@/components/features/GallerySection";

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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-slate-900 tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const steps = [
  { icon: ClipboardCheck, title: "معاينة مجانية", desc: "نُقيّم أثاثك ونحدد الحلول المناسبة" },
  { icon: PackageCheck, title: "تغليف احترافي", desc: "مواد عالمية لحماية كاملة لكل قطعة" },
  { icon: Truck, title: "نقل آمن", desc: "أسطول مجهز بأنظمة تثبيت متقدمة" },
  { icon: HomeIcon, title: "تركيب وتسليم", desc: "نُرتّب كل شيء في مكانه الجديد" },
];

const whyUsItems = [
  { icon: Shield, title: "تأمين شامل", desc: "غطاء تأميني كامل على كل قطعة" },
  { icon: Users, title: "فريق معتمد", desc: "فنيون مدربون بخبرة عالية" },
  { icon: Clock, title: "التزام بالمواعيد", desc: "دقة كاملة في المواعيد المتفق عليها" },
  { icon: ThumbsUp, title: "أسعار شفافة", desc: "بدون رسوم خفية أو مفاجآت" },
];

const statsData = [
  { value: 500, suffix: "+", label: "عميل راضٍ" },
  { value: 10, suffix: "+", label: "سنوات خبرة" },
  { value: 98, suffix: "%", label: "معدل الرضا" },
  { value: 24, suffix: "/7", label: "خدمة مستمرة" },
];

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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.ratings.value,
    reviewCount: siteConfig.ratings.count,
    bestRating: siteConfig.ratings.best,
  },
  areaServed: featuredAreas.map((a) => ({ "@type": "City", name: a.name })),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function HomeContent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ═══════════════ HERO (Green Dark) ═══════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
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

            <div className="hidden lg:flex lg:col-span-5 flex-col items-center gap-5 relative">
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

        <div className="absolute bottom-0 inset-x-0" aria-hidden="true">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ═══════════════ COMPOUNDS TRUST (White) ═══════════════ */}
      <CompoundsTrust />

      {/* ═══════════════ GALLERY (White) ═══════════════ */}
      <GallerySection />

      {/* ═══════════════ LIVE ORDERS (Off-white) ═══════════════ */}
      <LiveOrdersFeed />

      {/* ═══════════════ STATS (White) ═══════════════ */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-100" aria-label="إحصائيات">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-sm text-slate-500 mt-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES (Off-white) ═══════════════ */}
      <section className="section-padding bg-slate-50/60" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              خدماتنا
            </p>
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight"
            >
              حلول متكاملة لكل احتياجاتك
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              6 خدمات احترافية تحت سقف واحد بمعايير عالمية
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {services.map((service, i) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              return (
                <motion.div
                  key={service.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={fadeUp}
                >
                  <Link href={`/services/${service.slug}`} className="group block">
                    <article className={`flex items-center gap-4 md:gap-6 p-5 md:p-6 hover:bg-green-50/30 transition-all duration-300 ${
                      i !== services.length - 1 ? "border-b border-slate-100" : ""
                    }`}>
                      {/* Icon */}
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors duration-300">
                        <SIcon className="w-6 h-6 md:w-7 md:h-7 text-green-700 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-green-800 transition-colors leading-tight">
                            {service.name}
                          </h3>
                          <span className="hidden sm:inline text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            0{i + 1}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-2 md:line-clamp-1">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="shrink-0 flex items-center gap-2 text-green-700">
                        <span className="hidden md:inline text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          اعرف المزيد
                        </span>
                        <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-green-700 flex items-center justify-center transition-all duration-300">
                          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:-translate-x-0.5 transition-all" aria-hidden="true" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* View all services CTA */}
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 h-11 px-6 rounded-xl gap-2"
            >
              <Link href="/services">
                عرض جميع تفاصيل الخدمات
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS (White) ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="how-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              كيف نعمل
            </p>
            <h2
              id="how-heading"
              className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight"
            >
              4 خطوات نحو نقلة مثالية
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              عملية منظمة من المعاينة حتى التسليم النهائي
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  className="relative"
                >
                  <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-6 h-full hover:border-green-200 hover:bg-white transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold text-sm tabular-nums">
                        0{i + 1}
                      </div>
                      <StepIcon className="w-5 h-5 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>

                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:flex absolute top-1/2 -left-3 -translate-y-1/2 z-10"
                      aria-hidden="true"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US (Off-white) ═══════════════ */}
      <section className="section-padding bg-slate-50/60" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                لماذا نحن
              </p>
              <h2
                id="why-heading"
                className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-tight"
              >
                خبرة تصنع الفارق
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                نتعامل مع كل قطعة من أثاثك كأنها من أثاثنا. لأننا نُدرك أن كل قطعة تحمل ذكرى
                وقيمة تستحق العناية الكاملة.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {whyUsItems.map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex gap-3 bg-white border border-slate-100 rounded-2xl p-5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                        <ItemIcon className="w-5 h-5 text-green-700" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100">
                <Image
                  src="/herosection.webp"
                  alt="فريق خطوة أثناء العمل"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 max-w-[240px]">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  &ldquo;خدمة استثنائية وفريق محترف&rdquo;
                </p>
                <p className="text-xs text-slate-500 mt-2">— أحمد م.، التجمع الخامس</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS (White) ═══════════════ */}
      <TestimonialsSection />

      {/* ═══════════════ AREAS (White) ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              مناطق الخدمة
            </p>
            <h2
              id="areas-heading"
              className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight"
            >
              نصل إليك أينما كنت
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              نُغطي جميع المناطق الرئيسية والكمبوندات في القاهرة الكبرى
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
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
                  className="group flex items-center gap-3 bg-slate-50/60 border border-slate-100 rounded-xl p-4 hover:border-green-300 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-green-700 group-hover:border-green-700 transition-colors">
                    <MapPin className="w-5 h-5 text-green-700 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 text-sm truncate group-hover:text-green-800 transition-colors">
                      {area.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {area.neighborhoods?.length || 0} أحياء · خدمة VIP
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-green-600 transition-colors" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 h-11 px-6 rounded-xl"
            >
              <Link href="/areas">
                عرض جميع المناطق
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <InlineQuoteForm />

      {/* ═══════════════ FINAL CTA (Green Dark) ═══════════════ */}
      <section
        className="section-padding bg-green-950 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-15" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-black text-white leading-tight"
            >
              جاهزون لخدمتك في أي وقت
            </h2>
            <p className="text-white/80 max-w-md mx-auto text-lg">
              تواصل معنا الآن للحصول على معاينة مجانية وعرض سعر شفاف
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 gap-2 text-base h-13 px-8 rounded-2xl font-bold shadow-xl"
                asChild
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-5 h-5" />
                  اتصل دلوقتي
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white gap-2 text-base h-13 px-8 rounded-2xl shadow-xl shadow-green-500/25"
                asChild
              >
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
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