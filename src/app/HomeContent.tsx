"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import {
  Phone, MessageCircle, Star, Shield, Clock, ShieldCheck, ArrowLeft,
  MapPin, Truck, Send, PackageCheck, HelpCircle,
  Wrench, Wind, Box, ArrowUpToLine, Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { CompoundsTrust } from "@/components/shared/CompoundsTrust";
import { InlineQuoteForm } from "@/components/shared/InlineQuoteForm";
import { GallerySection } from "@/components/features/GallerySection";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

/* ─────────────────────────────────────────────────────────
   TestimonialsSection بقت SSR-safe (شلنا الـ mounted gate منها
   قبل كده)، فبتتحمّل مباشرة هنا مش عن طريق dynamic({ssr:false}).
   استيرادها كـ ssr:false تاني هيرجّع نفس مشكلة CLS=0.85 اللي
   كانت السبب في إخفاء القسم ده بالكامل من أول رسم للصفحة.

   LiveOrdersFeed لسه عن قصد ssr:false (محتوى حي فعلاً مش SEO-critical)،
   لكن بـ placeholder بارتفاع ثابت بدل "مفيش حاجة" عشان يقلل قفزة
   التخطيط لما يتحمّل.
   ───────────────────────────────────────────────────────── */
const LiveOrdersFeed = dynamic(
  () => import("@/components/shared/LiveOrdersFeed").then((m) => ({ default: m.LiveOrdersFeed })),
  { ssr: false, loading: () => <div className="h-24 bg-white" aria-hidden="true" /> }
);

/* ───────────────────────── Helpers ───────────────────────── */

const DEFAULT_WA_TEXT = "السلام عليكم، عايز أعرف سعر نقل عفش/أثاث";

function waLink(text: string = DEFAULT_WA_TEXT) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * كانت بتحفظ في localStorage بس، وده بيمنع السيرفر (وأي كود بيتنفذ
 * على الـ backend وقت استلام الفورم) من قراءة الـ gclid. رجّعتها
 * تحفظ في كوكي كمان زي النسخة الأصلية اللي بنيناها.
 */
function captureAdParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const keys = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const found: Record<string, string> = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length === 0) return;
    const payload = JSON.stringify({ ...found, landing: window.location.pathname, ts: Date.now() });
    try { localStorage.setItem("ad_params", payload); } catch { /* ignore */ }
    document.cookie = `ad_params=${encodeURIComponent(payload)}; path=/; max-age=${60 * 60 * 24 * 90}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

const serviceIcons: Record<string, React.ElementType> = {
  "naql-athath": Truck,
  "fak-tarkeeb-athath": Wrench,
  "fak-tarkeeb-takyifat": Wind,
  "taghleef-athath": Box,
  "wensh-raf3-athath": ArrowUpToLine,
  "naql-moqtaniat-hassasa": Gem,
};

/**
 * نفس قاعدة "متعرضش رقم تقييم غير حقيقي" المطبّقة في AnnouncementBar.
 * لو عدد التقييمات الحقيقية لسه تحت الحد ده، بنعرض ثقة عامة (خبرة،
 * ضمان) بدل رقم تقييم صغير بيضعف الثقة أكتر مما يبنيها.
 */
const MIN_REVIEWS_TO_SHOW_RATING = 25;
const showRating = siteConfig.ratings.count >= MIN_REVIEWS_TO_SHOW_RATING;

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (1200 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-white tabular-nums">
      {count.toLocaleString("en-US")}{suffix}
    </div>
  );
}

/* ───────────────────────── Quick estimate (WhatsApp lead tool) ─────────────────────────
   الأداة اللي فعلياً بتحوّل زائر لليد. غيابها من أي "نسخة فاخرة" هو
   تراجع في التحويل، مش تحسين شكلي. */

const PROPERTY_TYPES = ["شقة غرفة أو غرفتين", "شقة 3 غرف", "شقة 4 غرف أو أكتر", "فيلا / دوبلكس", "مكتب / شركة"];
const FLOORS = ["أرضي", "من 1 لـ 3", "من 4 لـ 6", "7 فأعلى"];
const EXTRAS = ["فك وتركيب", "تغليف", "ونش رفع", "فك وتركيب تكييفات"];
const TIMINGS = ["خلال أسبوع", "خلال شهر", "لسه بسأل عن السعر"];

const fieldCls =
  "w-full h-11 rounded-lg border border-stone-200 bg-white px-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600";

function QuickEstimateCard({ source }: { source: string }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [property, setProperty] = useState("");
  const [floor, setFloor] = useState("");
  const [elevator, setElevator] = useState<"" | "yes" | "no">("");
  const [extras, setExtras] = useState<string[]>([]);
  const [timing, setTiming] = useState("");

  const href = useMemo(() => {
    const lines = ["السلام عليكم، عايز عرض سعر نقل عفش:"];
    if (from.trim()) lines.push(`- من: ${from.trim()}`);
    if (to.trim()) lines.push(`- إلى: ${to.trim()}`);
    if (property) lines.push(`- النوع: ${property}`);
    if (floor) lines.push(`- الدور: ${floor}`);
    if (elevator) lines.push(`- أسانسير: ${elevator === "yes" ? "فيه" : "مفيش"}`);
    if (extras.length) lines.push(`- خدمات مطلوبة: ${extras.join("، ")}`);
    if (timing) lines.push(`- الموعد: ${timing}`);
    return waLink(lines.length > 1 ? lines.join("\n") : DEFAULT_WA_TEXT);
  }, [from, to, property, floor, elevator, extras, timing]);

  const toggleExtra = (x: string) =>
    setExtras((prev) => (prev.includes(x) ? prev.filter((i) => i !== x) : [...prev, x]));

  const id = (name: string) => `${source}-${name}`;

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-2xl md:p-6 text-right">
      <h2 className="text-xl font-black text-emerald-950">احسب عرض سعرك في دقيقة</h2>
      <p className="mt-1 text-sm text-slate-600">
        املا التفاصيل وابعتها على واتساب، وهنرد عليك بعرض سعر واضح.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id("from")} className="mb-1 block text-sm font-semibold text-slate-700">من منطقة</label>
          <input id={id("from")} className={fieldCls} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="مثال: التجمع" autoComplete="off" />
        </div>
        <div>
          <label htmlFor={id("to")} className="mb-1 block text-sm font-semibold text-slate-700">إلى منطقة</label>
          <input id={id("to")} className={fieldCls} value={to} onChange={(e) => setTo(e.target.value)} placeholder="مثال: الشيخ زايد" autoComplete="off" />
        </div>
        <div>
          <label htmlFor={id("property")} className="mb-1 block text-sm font-semibold text-slate-700">نوع النقلة</label>
          <select id={id("property")} className={fieldCls} value={property} onChange={(e) => setProperty(e.target.value)}>
            <option value="">اختار</option>
            {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={id("floor")} className="mb-1 block text-sm font-semibold text-slate-700">الدور</label>
          <select id={id("floor")} className={fieldCls} value={floor} onChange={(e) => setFloor(e.target.value)}>
            <option value="">اختار</option>
            {FLOORS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <span className="mb-1 block text-sm font-semibold text-slate-700">أسانسير</span>
        <div className="grid grid-cols-2 gap-2">
          {([["yes", "فيه أسانسير"], ["no", "مفيش أسانسير"]] as const).map(([val, label]) => (
            <button
              key={val}
              type="button"
              aria-pressed={elevator === val}
              onClick={() => setElevator(elevator === val ? "" : val)}
              className={`h-11 rounded-lg border text-sm font-semibold transition-colors ${
                elevator === val ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <span className="mb-1 block text-sm font-semibold text-slate-700">محتاج إيه كمان؟</span>
        <div className="flex flex-wrap gap-2">
          {EXTRAS.map((x) => (
            <button
              key={x}
              type="button"
              aria-pressed={extras.includes(x)}
              onClick={() => toggleExtra(x)}
              className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                extras.includes(x) ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-slate-700 hover:border-emerald-300"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={id("timing")} className="mb-1 block text-sm font-semibold text-slate-700">الموعد</label>
        <select id={id("timing")} className={fieldCls} value={timing} onChange={(e) => setTiming(e.target.value)}>
          <option value="">اختار</option>
          {TIMINGS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp(source)}
        className="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        ابعت التفاصيل على واتساب
      </a>
      <p className="mt-2 text-center text-xs text-slate-500">المعاينة مجانية، والسعر النهائي بيتحدد بعد المعاينة.</p>
    </div>
  );
}

/* ───────────────────────── Static content ───────────────────────── */

const steps = [
  { title: "معاينة مجانية", desc: "بنعاين الأثاث بزيارة أو فيديو كول ونحدد اللي هيتفك واللي هيتغلف" },
  { title: "تغليف احترافي", desc: "مواد تغليف بتحمي كل قطعة من الخدش والكسر قبل التحميل" },
  { title: "نقل وونش عند الحاجة", desc: "عربيات مجهزة، وونش رفع لو الدور أو مقاس القطعة يحتاجه" },
  { title: "تركيب وتسليم", desc: "بنرتب كل حاجة في مكانها ونركّب اللي اتفك، وتسلّمها جاهزة" },
];

const trustPillars = [
  { icon: Shield, title: "ضمان على الشغل", desc: "أي ضرر بسبب إهمال الفريق مسؤوليتنا، مش هتتفاجئ بعد النقل." },
  { icon: PackageCheck, title: "تغليف بمواد حقيقية", desc: "فقاعات هواء وكرتون مقوى حسب نوع كل قطعة، مش تغطية شكلية." },
  { icon: Clock, title: "معاد واضح", desc: "بنلتزم بميعاد المعاينة والنقل، ونقولك مقدماً لو أي تأخير محتمل." },
  { icon: ShieldCheck, title: "سعر مكتوب قبل البدء", desc: "عرض السعر بعد المعاينة بيتبعت مكتوب، من غير رسوم تتضاف يوم النقل." },
];

const sectionFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ───────────────────────── Page ───────────────────────── */

export default function HomeContent() {
  useEffect(() => { captureAdParams(); }, []);

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt="فريق خطوة أثناء نقل أثاث فاخر"
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-emerald-950/95 via-emerald-950/85 to-emerald-950/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-7 lg:col-span-7">
              <Badge className="gap-2 border-emerald-400/30 bg-emerald-900/70 px-4 py-2 text-sm text-emerald-100 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-amber-400" aria-hidden="true" />
                نقل مخصص لسكان الكمبوندات والمدن الجديدة
              </Badge>

              <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                نقل عفشك بأمان،
                <span className="mt-1 block bg-gradient-to-l from-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  من غير ما تلمس قطعة
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                فك وتغليف ونقل وونش وتركيب في خدمة واحدة متكاملة. معاينة مجانية، وسعر مكتوب واضح قبل ما نبدأ.
              </p>

              {showRating ? (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 rounded-lg border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-sm">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                    <span className="mr-1.5 text-sm font-bold text-amber-300">{siteConfig.ratings.value}/5</span>
                  </div>
                  <span className="text-sm font-medium text-white/70">
                    {siteConfig.ratings.count}+ تقييم حقيقي على Google
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/75">
                    <Shield className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span>خدمة 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/75">
                    <PackageCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span>تغليف احترافي</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/75">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span>سعر مكتوب قبل البدء</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="h-13 gap-2 rounded-xl bg-emerald-500 px-7 text-base font-bold text-emerald-950 shadow-xl shadow-emerald-500/25 hover:bg-emerald-400" asChild>
                  <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("hero_main")}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    اطلب معاينة مجانية
                  </a>
                </Button>
                <Button size="lg" className="h-13 gap-2 rounded-xl border border-white/25 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20" asChild>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero_main")}>
                    <MessageCircle className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                    واتساب مباشر
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <QuickEstimateCard source="hero_estimate" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: نفس أداة التقدير تحت الـ hero */}
      <section id="quote-form" className="bg-[#FAF8F5] px-4 pb-10 pt-6 lg:hidden">
        <div className="mx-auto max-w-lg rounded-2xl border border-stone-200 shadow-xl">
          <QuickEstimateCard source="mobile_estimate" />
        </div>
      </section>

      {/* ═══════════════ COMPOUNDS TRUST ═══════════════ */}
      <div className="bg-[#FAF8F5]">
        <CompoundsTrust />
      </div>

      {/* ═══════════════ PROOF BAND ═══════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionFade}
        className="bg-emerald-950 py-14 md:py-16"
      >
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="border-l border-white/10 pl-6 last:border-none sm:pl-0 sm:pr-6 sm:border-l-0 sm:border-r rtl:sm:border-r-0 rtl:sm:border-l first:pl-0 first:pr-0">
              <AnimatedCounter target={siteConfig.yearsOfExperience} suffix="+" />
              <div className="mt-1 text-sm text-white/60">سنة خبرة في نقل الأثاث</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white md:text-5xl">24/7</div>
              <div className="mt-1 text-sm text-white/60">خدمة متاحة طول الأسبوع</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white md:text-5xl">{services.length}</div>
              <div className="mt-1 text-sm text-white/60">خدمات متكاملة تحت سقف واحد</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <h2 id="services-heading" className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              أكتر من مجرد نقل عفش
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              كل خدمة تقدر تطلبها لوحدها، أو كباقة متكاملة توفر عليك التنسيق مع أكتر من جهة.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 transition-all hover:border-emerald-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 transition-colors group-hover:bg-emerald-800 group-hover:text-white">
                    <SIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-emerald-900">
                    {service.name}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800">
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionFade}
        className="bg-[#FAF8F5] py-16 md:py-24"
      >
        <div className="container-custom">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              4 خطوات لنقلة من غير وجع دماغ
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">من المعاينة لحد التسليم النهائي</p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative border-t-2 border-emerald-700 pt-4">
                <span className="text-sm font-black text-emerald-700">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <h2 id="why-heading" className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              4 وعود بنلتزم بيها فعلياً
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-stone-100 p-6">
                  <ItemIcon className="mb-3 h-6 w-6 text-emerald-700" aria-hidden="true" />
                  <h3 className="mb-1 font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS — SSR افتراضي، من غير ssr:false ═══════════════ */}
      <TestimonialsSection />

      {/* ═══════════════ GALLERY ═══════════════ */}
      <GallerySection />

      {/* ═══════════════ LIVE ORDERS ═══════════════
          لو الطلبات دي مش حقيقية، امسح السطر ده — سياسة جوجل بتمنع الادعاءات المضللة. */}
      <LiveOrdersFeed />

      {/* ═══════════════ AREAS ═══════════════ */}
      <section className="bg-[#FAF8F5] py-16 md:py-24" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="areas-heading" className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
                بنوصلك أينما كنت
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                تغطية مستمرة للتجمع والشيخ زايد ومدينتي وباقي المدن الجديدة والقاهرة الكبرى
              </p>
            </div>
            <Link href="/areas" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900">
              كل المناطق
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-6">
            {featuredAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group flex items-center gap-2.5 bg-[#FAF8F4] p-4 transition-colors hover:bg-white"
              >
                <MapPin className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                <span className="truncate text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
                  {area.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ TEASER ═══════════════ */}
      <section className="bg-white py-10">
        <div className="container-custom">
          <Link
            href="/faq"
            className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 transition-colors hover:border-emerald-300"
          >
            <div className="flex items-center gap-4">
              <HelpCircle className="h-8 w-8 shrink-0 text-emerald-700" aria-hidden="true" />
              <div>
                <div className="font-bold text-slate-900">عندك سؤال قبل ما تحجز؟</div>
                <div className="text-sm text-slate-600">الأسعار، الضمان، مواعيد العمل — كل الإجابات في صفحة الأسئلة الشائعة</div>
              </div>
            </div>
            <ArrowLeft className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ═══════════════ QUOTE FORM ═══════════════ */}
      <InlineQuoteForm />

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative overflow-hidden bg-emerald-950 py-16 md:py-24" aria-labelledby="cta-heading">
        <div className="container-custom relative">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 id="cta-heading" className="text-4xl font-black leading-[1.2] tracking-tight text-white md:text-5xl">
              جاهز تنقل بيتك
              <span className="mt-2 block text-emerald-400">من غير قلق على أثاثك؟</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-white/70">
              كلمنا دلوقتي للمعاينة المجانية، وهترجع بسعر مكتوب واضح قبل ما تقرر.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Button size="lg" className="h-14 gap-2 rounded-xl bg-white px-8 text-base font-bold text-slate-900 shadow-xl hover:bg-stone-100" asChild>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("final_cta")}>
                  <Phone className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  اتصل دلوقتي
                </a>
              </Button>
              <Button size="lg" className="h-14 gap-2 rounded-xl border border-white/10 bg-emerald-600 px-8 text-base font-bold text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-500" asChild>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("final_cta")}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  تواصل واتساب
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* مساحة عشان الشريط الثابت ميغطيش آخر الصفحة على الموبايل */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      {/* ═══════════════ STICKY MOBILE CTA ═══════════════ */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-stone-200 bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden"
        role="region"
        aria-label="تواصل سريع"
      >
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => trackPhoneCall("sticky_bar")}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 text-base font-bold text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          اتصل
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp("sticky_bar")}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 bg-white text-base font-bold text-emerald-800"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          واتساب
        </a>
      </div>
    </>
  );
}