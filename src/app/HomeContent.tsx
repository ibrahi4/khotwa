"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
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
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

/* ── Below-fold: lazy load heavy sections ── */
const VideosSection = dynamic(
  () => import("@/components/features/VideosSection").then((m) => ({ default: m.VideosSection })),
  { ssr: false, loading: () => <div className="h-80 bg-[#FAF8F5]" aria-hidden="true" /> }
);

const GallerySection = dynamic(
  () => import("@/components/features/GallerySection").then((m) => ({ default: m.GallerySection })),
  { ssr: false, loading: () => <div className="h-80 bg-white" aria-hidden="true" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/features/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: false, loading: () => <div className="h-80 bg-white" aria-hidden="true" /> }
);

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

export default function HomeContent() {
  useEffect(() => { captureAdParams(); }, []);

  return (
    <div className="bg-[#FAF8F5] text-slate-900 overflow-hidden antialiased selection:bg-emerald-800 selection:text-white">

      {/* ════ 1. HERO ════ */}
      <section className="relative flex flex-col justify-center min-h-[82svh] sm:min-h-[85vh] md:min-h-[90vh] pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-28 md:pb-16 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/herosection.webp"
            alt="خطوة لنقل الأثاث الراقية"
            fill
            className="object-cover object-center opacity-50"
            priority
            fetchPriority="high"
            quality={55}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/40 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-emerald-950/95" />
        </div>

        <div className="container-custom relative z-10 w-full my-auto text-right">
          <div className="max-w-3xl w-full">
            <Badge className="bg-emerald-900/80 text-emerald-100 border border-emerald-400/40 px-3.5 py-1.5 backdrop-blur-md rounded-full text-xs font-semibold mb-3.5 sm:mb-5 inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>خدمة فاخرة مخصصة لسكان الكمبوندات والمدن الجديدة</span>
            </Badge>

            <h1 className="text-[1.95rem] leading-[1.25] sm:text-4xl md:text-6xl font-black text-white tracking-tight mb-3.5 sm:mb-5">
              نقل أثاثك باحترافية، <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-amber-300">
                وبأعلى معايير الأمان.
              </span>
            </h1>

            <p className="text-[13.5px] sm:text-base md:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6 max-w-2xl">
              منظومة نقل متكاملة تشمل الفك، التغليف الفاخر، النقل بالونش الهيدروليكي، والتركيب باحترافية تضمن لك سلامة كافة ممتلكاتك مع ضمان شامل.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 mb-5 sm:mb-7">
              <div className="flex items-center gap-1 bg-black/30 border border-white/20 px-2.5 py-1 rounded-lg backdrop-blur-sm shrink-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-amber-300 mr-1">4.9 / 5.0</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-emerald-50/90">
                تثق بنا أكثر من 500 عائلة في القاهرة والجيزة
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25" asChild>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("hero_main")}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  اطلب معاينة مجانية
                </a>
              </Button>
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-md" asChild>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero_main")}>
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-emerald-300" />
                  تواصل عبر واتساب
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ════ 2. TRUST LOGOS ════ */}
      <div className="bg-emerald-950/95 border-t border-emerald-800/40 py-5 relative z-10">
        <CompoundsTrust />
      </div>

      {/* ════ 3. VIDEOS (Social proof المبكر) ════ */}
      <VideosSection />

      {/* ════ 4. SERVICES ════ */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase bg-emerald-100/60 px-3.5 py-1.5 rounded-full border border-emerald-200/50">
              خدماتنا المتخصصة
            </span>
            <h2 id="services-heading" className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              أكثر من مجرد نقل عفش
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
              تجهيزات كاملة تضمن لك الانتقال لمنزلك الجديد دون أن تلمس قطعة واحدة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              const bgImage = serviceImages[service.slug] || "/herosection.webp";
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col bg-[#FAF8F5] rounded-3xl overflow-hidden border border-stone-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300"
                >
                  <div className="relative h-44 sm:h-48 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={bgImage}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      quality={55}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <SIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <div className="pt-3 border-t border-stone-100/80 flex items-center text-sm font-bold text-emerald-700">
                      عرض التفاصيل <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ 5. GALLERY ════ */}
      <GallerySection />

      {/* ════ 6. TESTIMONIALS ════ */}
      <TestimonialsSection />

      {/* ════ 7. AREAS ════ */}
      <section className="py-16 md:py-24 bg-[#FAF8F5]" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <h2 id="areas-heading" className="text-xl md:text-3xl font-black text-slate-900 mb-2">
                نغطي أرقى المناطق والمدن الجديدة
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                أسطولنا متواجد بصفة مستمرة لخدمة سكان التجمع، الشيخ زايد، مدينتي وجميع المناطق.
              </p>
            </div>
            <Link href="/areas" className="hidden md:inline-flex items-center text-emerald-800 font-bold hover:text-emerald-950 text-sm">
              جميع المناطق <ArrowLeft className="w-4 h-4 mr-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredAreas.slice(0, 8).map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-stone-200/70 bg-white hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 flex items-center justify-center shrink-0 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-800 text-xs sm:text-sm">{area.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 8. HOW IT WORKS (خفيف — طمأنة قبل التحويل) ════ */}
      <section className="py-12 md:py-16 bg-white border-y border-stone-200/60">
        <div className="container-custom">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              4 خطوات بسيطة لنقلة مضمونة
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { num: "1", title: "معاينة مجانية", desc: "نحدد الحجم والوسيلة المناسبة" },
              { num: "2", title: "فك وتغليف", desc: "حماية كاملة ضد الخدوش" },
              { num: "3", title: "نقل ورفع", desc: "سيارات مغلقة وأوناش حديثة" },
              { num: "4", title: "تركيب وتسليم", desc: "المنزل جاهز من أول يوم" },
            ].map((step) => (
              <div key={step.num} className="text-center p-4 rounded-2xl bg-[#FAF8F5] border border-stone-100">
                <div className="w-9 h-9 rounded-full bg-emerald-800 text-white text-sm font-black flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 9. QUOTE FORM ════ */}
      <InlineQuoteForm />

      {/* ════ 10. FINAL CTA ════ */}
      <section className="relative py-16 md:py-24 bg-emerald-950 text-center overflow-hidden">
        <div className="container-custom relative z-10 max-w-3xl mx-auto space-y-5">
          <Award className="w-10 h-10 text-emerald-400 mx-auto opacity-90" />
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
            مستعد لنقل منزلك <span className="text-emerald-400">بكل سهولة وأمان؟</span>
          </h2>
          <p className="text-sm md:text-base text-emerald-100/80 max-w-xl mx-auto">
            تواصل معنا اليوم للحصول على معاينة مجانية وعرض سعر شفاف بدون رسوم خفية.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Button size="lg" className="h-12 sm:h-13 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-xl" asChild>
              <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("final_cta")}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 ml-2" /> اتصل الآن
              </a>
            </Button>
            <Button size="lg" className="h-12 sm:h-13 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base backdrop-blur-md" asChild>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("final_cta")}>
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-emerald-400" /> تواصل عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
