"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, Shield, ArrowLeft, MapPin, Truck, Star,
  Wrench, Wind, Box, ArrowUpToLine, Gem, ChevronLeft, Award, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { CompoundsTrust } from "@/components/shared/CompoundsTrust";
import { InlineQuoteForm } from "@/components/shared/InlineQuoteForm";
import { GallerySection } from "@/components/features/GallerySection";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

/* ───────────────────────── Dynamic Imports ───────────────────────── */
const LiveOrdersFeed = dynamic(
  () => import("@/components/shared/LiveOrdersFeed").then((m) => ({ default: m.LiveOrdersFeed })),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () => import("@/components/features/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: false }
);

/* ───────────────────────── Helpers ───────────────────────── */
const DEFAULT_WA_TEXT = "السلام عليكم، مهتم بمعرفة تفاصيل وأسعار خدمة نقل الأثاث.";
function waLink(text: string = DEFAULT_WA_TEXT) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

function captureAdParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const keys = ["gclid", "utm_source", "utm_medium", "utm_campaign"];
    const found: Record<string, string> = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length === 0) return;
    localStorage.setItem("ad_params", JSON.stringify({ ...found, landing: window.location.pathname, ts: Date.now() }));
  } catch { /* ignore */ }
}

const serviceIcons: Record<string, React.ElementType> = {
  "naql-athath": Truck,
  "fak-tarkeeb-athath": Wrench,
  "fak-tarkeeb-takyifat": Wind,
  "taghleef-athath": Box,
  "wensh-raf3-athath": ArrowUpToLine,
  "naql-moqtaniat-hassasa": Gem,
};

const serviceImages: Record<string, string> = {
  "naql-athath": "/images/services/bg-naql-athath.webp",
  "fak-tarkeeb-athath": "/images/services/bg-fak-tarkeeb.webp",
  "fak-tarkeeb-takyifat": "/images/services/bg-takyifat.webp",
  "taghleef-athath": "/images/services/bg-taghleef.webp",
  "wensh-raf3-athath": "/images/services/bg-wensh-raf3.webp",
  "naql-moqtaniat-hassasa": "/images/services/bg-moqtaniat.webp",
};

/* ───────────────────────── Animations ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ───────────────────────── Page Component ───────────────────────── */
export default function HomeContent() {
  useEffect(() => { captureAdParams(); }, []);

  return (
    <div className="bg-[#FAF8F5] text-slate-900 overflow-hidden antialiased selection:bg-emerald-800 selection:text-white">
      
      {/* ═══════════════ 1. HERO SECTION ═══════════════ */}
      <section className="relative flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28 bg-emerald-950 overflow-hidden min-h-[85svh] md:min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/herosection.webp"
            alt="خطوة لنقل الأثاث الراقية"
            fill
            className="object-cover object-center opacity-55 scale-100"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/40 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-emerald-950/95" />
        </div>

        <div className="container-custom relative z-10 w-full flex flex-col items-start text-right">
          <div className="max-w-3xl w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <Badge className="bg-emerald-900/70 text-emerald-100 border border-emerald-400/40 px-4 py-2 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold mb-6 md:mb-8 inline-flex items-center gap-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>خدمة فاخرة مخصصة لسكان الكمبوندات والمدن الجديدة</span>
              </Badge>
            </motion.div>

            <motion.h1 
              initial="hidden" animate="visible" variants={fadeUp}
              className="text-[2.25rem] leading-[1.3] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 md:mb-8"
            >
              نقل أثاثك باحترافية، <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-amber-300">
                وبأعلى معايير الأمان.
              </span>
            </motion.h1>

            <motion.p 
              initial="hidden" animate="visible" variants={fadeUp}
              className="text-[15px] leading-[1.8] sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl font-medium"
            >
              منظومة نقل متكاملة تشمل الفك، التغليف الفاخر، النقل بالونش الهيدروليكي، والتركيب باحترافية تضمن لك سلامة كافة ممتلكاتك مع ضمان شامل.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-10 md:mb-12">
              <div className="flex gap-1 bg-black/30 border border-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm shrink-0 shadow-inner">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs sm:text-sm font-bold text-amber-300 mr-1.5">4.9/5.0</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-emerald-50/90">
                تثق بنا أكثر من 500 عائلة في القاهرة والجيزة
              </span>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-emerald-400 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1" asChild>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("hero_main")}>
                  <Phone className="w-5 h-5 ml-2" />
                  اطلب معاينة مجانية
                </a>
              </Button>
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/30 backdrop-blur-md transition-all hover:-translate-y-1" asChild>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero_main")}>
                  <MessageCircle className="w-5 h-5 ml-2 text-emerald-300" />
                  تواصل عبر واتساب
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. COMPOUNDS TRUST BAR ═══════════════ */}
      <div className="bg-emerald-950/95 border-t border-emerald-800/40 py-5 relative z-10 shadow-sm">
        <CompoundsTrust />
      </div>

      {/* ═══════════════ 3. PREMIUM CINEMATIC SERVICES SECTION ═══════════════ */}
      <section className="py-20 md:py-28 bg-[#FAF8F5]" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase bg-emerald-100/60 px-4 py-1.5 rounded-full border border-emerald-200/50">
              خدماتنا المتخصصة
            </span>
            <h2 id="services-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              أكثر من مجرد نقل عفش
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              تجهيزات كاملة تضمن لك الانتقال لمنزلك الجديد دون أن تلمس قطعة واحدة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              const bgImage = serviceImages[service.slug] || "/herosection.webp";

              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group relative block h-[340px] md:h-[380px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-500">
                  
                  {/* Card Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={bgImage}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                    />
                    {/* Cinematic Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 text-emerald-300 shadow-inner group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300 group-hover:text-emerald-950 group-hover:border-emerald-400">
                      <SIcon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-emerald-50/80 text-sm leading-relaxed mb-5 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-emerald-400 group-hover:text-amber-300 transition-colors">
                      عرض التفاصيل <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-2" />
                    </div>
                  </div>

                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. HOW IT WORKS ═══════════════ */}
      <section className="py-20 md:py-28 bg-white border-y border-stone-200/60">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase bg-emerald-100/60 px-4 py-1.5 rounded-full border border-emerald-200/50">
              خطوات العمل
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              كيف نعمل لضمان أمان أثاثك؟
            </h2>
            <p className="text-slate-600 text-base">
              4 خطوات مدروسة بدقة لضمان أقصى درجات الراحة والتنظيم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { num: "01", title: "المعاينة والتخطيط", desc: "زيارة فنية مجانية لمعاينة المنقولات وتحديد السيارات والأوناش المناسبة." },
              { num: "02", title: "الفك والتغليف", desc: "تفكيك احترافي وتغليف بمواد حماية عالية الجودة ومقاومة للصدمات." },
              { num: "03", title: "النقل والرفع", desc: "سيارات مغلقة ومجهزة لنقل العفش بأمان مع استخدام الأوناش الحديثة." },
              { num: "04", title: "التركيب والتسليم", desc: "إعادة تركيب الأثاث والتكييفات في المنزل الجديد ليكون جاهزاً فوراً." }
            ].map((step) => (
              <div key={step.num} className="p-6 md:p-7 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-emerald-300 transition-colors">
                <span className="text-3xl font-black text-emerald-800/25 mb-3 block">{step.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. TESTIMONIALS & GALLERY ═══════════════ */}
      <TestimonialsSection />
      <GallerySection />
      <LiveOrdersFeed />

      {/* ═══════════════ 6. FEATURED AREAS ═══════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-stone-200/60" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-12">
            <div>
              <h2 id="areas-heading" className="text-2xl md:text-3xl font-black text-slate-900 mb-2 md:mb-3">
                نغطي أرقى المناطق والمدن الجديدة
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                أسطولنا متواجد بصفة مستمرة لخدمة سكان التجمع، الشيخ زايد، مدينتي وجميع المناطق.
              </p>
            </div>
            <Link href="/areas" className="hidden md:inline-flex items-center text-emerald-800 font-bold hover:text-emerald-950 text-sm md:text-base">
              جميع المناطق <ArrowLeft className="w-4 h-4 mr-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredAreas.slice(0, 8).map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className="flex items-center gap-3.5 p-4 rounded-2xl border border-stone-200/70 bg-[#FAF8F5] hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center shrink-0 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm">{area.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. QUOTE FORM ═══════════════ */}
      <InlineQuoteForm />

      {/* ═══════════════ 8. FINAL CTA ═══════════════ */}
      <section className="relative py-24 md:py-32 bg-emerald-950 text-center overflow-hidden">
        <div className="container-custom relative z-10 max-w-3xl mx-auto space-y-6">
          <Award className="w-12 h-12 text-emerald-400 mx-auto opacity-90" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            مستعد لنقل منزلك <span className="text-emerald-400">بكل سهولة وأمان؟</span>
          </h2>
          <p className="text-base md:text-lg text-emerald-100/80 max-w-xl mx-auto">
            تواصل معنا اليوم للحصول على معاينة مجانية وعرض سعر شفاف ومحدد بدون أي رسوم خفية.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl" asChild>
              <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("final_cta")}>
                <Phone className="w-5 h-5 ml-2" /> اتصل الآن
              </a>
            </Button>
            <Button size="lg" className="h-14 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-base backdrop-blur-md" asChild>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("final_cta")}>
                <MessageCircle className="w-5 h-5 ml-2 text-emerald-400" /> تواصل عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
