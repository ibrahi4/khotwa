"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, ArrowLeft, MapPin, Truck, Star,
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ───────────────────────── Page Component ───────────────────────── */
export default function HomeContent() {
  useEffect(() => { captureAdParams(); }, []);

  return (
    <div className="bg-[#FAF8F5] text-slate-900 overflow-hidden antialiased selection:bg-emerald-800 selection:text-white">
      
      {/* ═══════════════ 1. HERO SECTION ═══════════════ */}
      <section className="relative flex flex-col justify-center min-h-[82svh] sm:min-h-[85vh] md:min-h-[90vh] pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-28 md:pb-16 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/herosection.webp"
            alt="خطوة لنقل الأثاث الراقية"
            fill
            className="object-cover object-center opacity-50 scale-100"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/40 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-emerald-950/95" />
        </div>

        <div className="container-custom relative z-10 w-full my-auto text-right">
          <div className="max-w-3xl w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <Badge className="bg-emerald-900/80 text-emerald-100 border border-emerald-400/40 px-3.5 py-1.5 backdrop-blur-md rounded-full text-xs font-semibold mb-3.5 sm:mb-5 inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>خدمة فاخرة مخصصة لسكان الكمبوندات والمدن الجديدة</span>
              </Badge>
            </motion.div>

            <motion.h1 
              initial="hidden" animate="visible" variants={fadeUp}
              className="text-[1.95rem] leading-[1.25] sm:text-4xl md:text-6xl font-black text-white tracking-tight mb-3.5 sm:mb-5"
            >
              نقل أثاثك باحترافية، <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-amber-300">
                وبأعلى معايير الأمان.
              </span>
            </motion.h1>

            <motion.p 
              initial="hidden" animate="visible" variants={fadeUp}
              className="text-[13.5px] sm:text-base md:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6 max-w-2xl font-normal"
            >
              منظومة نقل متكاملة تشمل الفك، التغليف الفاخر، النقل بالونش الهيدروليكي، والتركيب باحترافية تضمن لك سلامة كافة ممتلكاتك مع ضمان شامل.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center gap-2.5 mb-5 sm:mb-7">
              <div className="flex items-center gap-1 bg-black/30 border border-white/20 px-2.5 py-1 rounded-lg backdrop-blur-sm shrink-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-amber-300 mr-1">4.9 / 5.0</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-emerald-50/90">
                تثق بنا أكثر من 500 عائلة في القاهرة والجيزة
              </span>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5" asChild>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("hero_main")}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  اطلب معاينة مجانية
                </a>
              </Button>
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-md transition-all hover:-translate-y-0.5" asChild>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero_main")}>
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-emerald-300" />
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

      {/* ═══════════════ 3. SERVICES SECTION (Senior Clean UI/UX) ═══════════════ */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              const bgImage = serviceImages[service.slug] || "/herosection.webp";

              return (
                <Link 
                  key={service.slug} 
                  href={`/services/${service.slug}`} 
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300"
                >
                  {/* Top: Image Section (Fixed Height for Performance & CLS) */}
                  <div className="relative h-48 sm:h-52 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={bgImage}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      quality={70}
                    />
                    {/* Very subtle gradient just to blend the image edges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Bottom: Clean White Content Section */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <SIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {service.shortDescription}
                    </p>
                    
                    <div className="pt-4 border-t border-stone-50 flex items-center text-sm font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                      عرض التفاصيل <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1.5" />
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
