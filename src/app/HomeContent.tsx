"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import {
  Phone, MessageCircle, Shield, Clock, Users, ArrowLeft,
  MapPin, Truck, Send, ThumbsUp,
  Wrench, Wind, Box, ArrowUpToLine, Gem,
  PackageCheck, CircleCheckBig,
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

/* ───────────────────────── Dynamic imports ───────────────────────── */
const LiveOrdersFeed = dynamic(
  () => import("@/components/shared/LiveOrdersFeed").then((m) => ({ default: m.LiveOrdersFeed })),
  { ssr: false, loading: () => <div className="h-64 bg-[#FAF8F4]" aria-hidden="true" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/features/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="h-96 bg-white" aria-hidden="true" /> }
);

/* ───────────────────────── Helpers (بدون تغيير وظيفي) ───────────────────────── */

const DEFAULT_WA_TEXT = "السلام عليكم، عايز أعرف سعر نقل عفش/أثاث";

function waLink(text: string = DEFAULT_WA_TEXT) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

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
    <div ref={ref} className="text-4xl md:text-5xl font-black text-white tabular-nums">
      {count.toLocaleString("en-US")}{suffix}
    </div>
  );
}

/* ───────────────────────── Quick estimate (WhatsApp) — نفس المنطق، تنسيق بس اتحدث ───────────────────────── */

const PROPERTY_TYPES = ["شقة غرفة أو غرفتين", "شقة 3 غرف", "شقة 4 غرف أو أكتر", "فيلا / دوبلكس", "مكتب / شركة"];
const FLOORS = ["أرضي", "من 1 لـ 3", "من 4 لـ 6", "7 فأعلى"];
const EXTRAS = ["فك وتركيب", "تغليف", "ونش رفع", "فك وتركيب تكييفات"];
const TIMINGS = ["خلال أسبوع", "خلال شهر", "لسه بسأل عن السعر"];

const fieldCls =
  "w-full h-11 rounded-lg border border-stone-200 bg-white px-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600";

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
      <h2 className="text-xl font-black text-green-950">احسب عرض سعرك في دقيقة</h2>
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
                elevator === val ? "border-green-600 bg-green-50 text-green-800" : "border-stone-200 bg-white text-slate-700 hover:border-green-300"
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
                extras.includes(x) ? "border-green-600 bg-green-50 text-green-800" : "border-stone-200 bg-white text-slate-700 hover:border-green-300"
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
        className="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 text-base font-bold text-white shadow-lg shadow-green-700/20 transition-colors hover:bg-green-800"
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
  { title: "معاينة مجانية", desc: "بنعاين الأثاث ونحدد اللي هيتفك واللي هيتغلف" },
  { title: "تغليف احترافي", desc: "مواد تغليف بتحمي كل قطعة من الخدش والكسر" },
  { title: "نقل آمن", desc: "عربيات مجهزة وتثبيت محكم للحمولة" },
  { title: "تركيب وتسليم", desc: "بنرتب كل حاجة في مكانها ونركّب اللي اتفك" },
];

const whyUsItems = [
  { icon: Shield, title: "تأمين شامل", desc: "غطاء تأميني على كل قطعة" },
  { icon: Users, title: "فريق معتمد", desc: "فنيين مدربين بخبرة عالية" },
  { icon: Clock, title: "التزام بالمواعيد", desc: "بنوصل في الميعاد المتفق عليه" },
  { icon: ThumbsUp, title: "أسعار واضحة", desc: "سعر معروف قبل ما نبدأ، من غير رسوم مخفية" },
];

/* الأرقام دي لازم تكون حقيقية ومطابقة لتقييمك على Google Business. */
const statsData = [
  { value: 500, suffix: "+", label: "عميل راضٍ" },
  { value: 10, suffix: "+", label: "سنوات خبرة" },
  { value: 98, suffix: "%", label: "معدل الرضا" },
  { value: 24, suffix: "/7", label: "خدمة مستمرة" },
];

/* حركة واحدة بس للقسم كله، مش لكل عنصر جواه لوحده */
const sectionFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ───────────────────────── Page ───────────────────────── */

export default function HomeContent() {
  useEffect(() => { captureAdParams(); }, []);

  return (
    <>
      {/* ═══════════════ HERO — أخضر غامق، أول حاجة تشدّ العين ═══════════════ */}
      <section className="relative flex min-h-[88svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt="خطوة لنقل الأثاث"
            fill
            className="object-cover"
            sizes="100vw"
            quality={70}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-green-950/95 via-green-950/80 to-green-950/40" />
        </div>

        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <Badge className="gap-2 border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                <CircleCheckBig className="h-4 w-4 text-green-400" aria-hidden="true" />
                +500 عميل يثقون بنا في القاهرة الكبرى
              </Badge>

              <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                شركة نقل عفش وأثاث
                <span className="mt-1 block text-green-400">بالقاهرة والجيزة</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                نقل وفك وتركيب وتغليف وونش رفع. فريق بخبرة +10 سنوات، ومعاينة مجانية قبل ما تحجز.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="h-13 gap-2 rounded-xl bg-green-500 px-7 text-base text-white shadow-xl shadow-green-500/25 hover:bg-green-600" asChild>
                  <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("hero_main")}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    اتصل دلوقتي
                  </a>
                </Button>
                <Button size="lg" className="h-13 gap-2 rounded-xl bg-white px-7 text-base font-bold text-green-900 hover:bg-green-50" asChild>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero_main")}>
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    واتساب
                  </a>
                </Button>
                <a
                  href="#quote-form"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  عرض سعر مجاني
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
                {[
                  { icon: Shield, text: "ضمان شامل" },
                  { icon: Clock, text: "24/7" },
                  { icon: PackageCheck, text: "تغليف احترافي" },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-white/70">
                      <ItemIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <QuickEstimateCard source="hero_estimate" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: فورم التقدير مباشرة تحت الـ hero */}
      <section id="quote-form" className="bg-[#FAF8F4] px-4 pb-10 pt-6 lg:hidden">
        <div className="mx-auto max-w-lg rounded-2xl border border-stone-200 shadow-xl">
          <QuickEstimateCard source="mobile_estimate" />
        </div>
      </section>

      {/* ═══════════════ COMPOUNDS TRUST — خارجي، سايبه زي ما هو ═══════════════ */}
      <div className="bg-[#FAF8F4]">
        <CompoundsTrust />
      </div>

      {/* ═══════════════ SERVICES — بيج دافئ، قائمة برقم رفيع بدل كروت ═══════════════ */}
      <section className="bg-[#FAF8F4] py-16 md:py-24" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <h2 id="services-heading" className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              كل اللي تحتاجه لنقلة مريحة
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              6 خدمات تحت سقف واحد: نقل عفش، فك وتركيب، تغليف، وونش رفع
            </p>
          </div>

          <div className="mx-auto max-w-4xl divide-y divide-stone-200 border-y border-stone-200">
            {services.map((service) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group flex items-center gap-5 py-5 md:py-6">
                  <SIcon className="h-6 w-6 shrink-0 text-green-700" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-green-800 md:text-lg">
                      {service.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-sm text-slate-600">{service.shortDescription}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 shrink-0 text-stone-300 transition-transform group-hover:-translate-x-1 group-hover:text-green-700" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-green-800 hover:text-green-900">
              عرض جميع تفاصيل الخدمات
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROOF BAND — إحصائيات + رسالة ثقة سوا، أقوى نقطة في الصفحة ═══════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionFade}
        className="bg-green-950 py-16 md:py-20"
      >
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-black leading-snug text-white md:text-3xl">
                خبرة حقيقية، مش وعود
              </h2>
              <p className="mt-3 max-w-sm text-white/70">
                أرقامنا مبنية على نقلات فعلية في الكمبوندات والمدن الجديدة، مش تسويق.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-4">
              {statsData.map((stat) => (
                <div key={stat.label} className="border-r border-white/10 pr-6 first:border-none first:pr-0 rtl:border-r rtl:border-l-0">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <div className="mt-2 text-sm font-medium text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <TestimonialsSection />

      {/* ═══════════════ GALLERY ═══════════════ */}
      <GallerySection />

      {/* ═══════════════ HOW IT WORKS — بيج دافئ، ترقيم لأنه فعلاً تسلسل خطوات ═══════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionFade}
        className="bg-[#FAF8F4] py-16 md:py-24"
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
              <div key={step.title} className="relative border-t-2 border-green-700 pt-4">
                <span className="text-sm font-black text-green-700">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ WHY US — أبيض، عمودين بدل شبكة كروت ═══════════════ */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 id="why-heading" className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
                خبرة تفرق في يوم النقل
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
                بنتعامل مع كل قطعة كأنها أثاثنا، لأن كل قطعة ليها قيمة وذكرى عندك.
              </p>
            </div>

            <div className="space-y-6">
              {whyUsItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 border-b border-stone-100 pb-6 last:border-none last:pb-0">
                    <ItemIcon className="h-5 w-5 shrink-0 text-green-700" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LIVE ORDERS ═══════════════
          لو الطلبات دي مش حقيقية، امسح السطر ده. سياسة جوجل بتمنع الادعاءات المضللة. */}
      <LiveOrdersFeed />

      {/* ═══════════════ AREAS — بيج دافئ ═══════════════ */}
      <section className="bg-[#FAF8F4] py-16 md:py-24" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <h2 id="areas-heading" className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              بنوصلك أينما كنت
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              بنغطي المناطق الرئيسية والكمبوندات في القاهرة الكبرى
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-3">
            {featuredAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group flex items-center gap-3 bg-[#FAF8F4] p-5 transition-colors hover:bg-white"
              >
                <MapPin className="h-5 w-5 shrink-0 text-green-700" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-green-800">
                    {area.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {area.neighborhoods?.length || 0} أحياء
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/areas" className="inline-flex items-center gap-2 text-sm font-bold text-green-800 hover:text-green-900">
              عرض جميع المناطق
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ QUOTE FORM ═══════════════ */}
      <InlineQuoteForm />

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative overflow-hidden bg-green-950 py-16 md:py-24" aria-labelledby="cta-heading">
        <div className="container-custom relative">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 id="cta-heading" className="text-4xl font-black leading-[1.2] tracking-tight text-white md:text-5xl">
              انضم لأكتر من 500 عميل
              <span className="mt-2 block text-green-400">وثقوا فينا في نقل أثاثهم بأمان</span>
            </h2>

            <p className="mx-auto max-w-xl text-lg text-white/70">
              كلمنا دلوقتي للحصول على معاينة مجانية وعرض سعر واضح، وفريقنا بيرد بسرعة.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="h-14 gap-2 rounded-xl bg-white px-8 text-base font-bold text-slate-900 shadow-xl hover:bg-stone-100" asChild>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("final_cta")}>
                  <Phone className="h-5 w-5 text-green-700" aria-hidden="true" />
                  اتصل دلوقتي
                </a>
              </Button>
              <Button size="lg" className="h-14 gap-2 rounded-xl border border-white/10 bg-green-600 px-8 text-base font-bold text-white shadow-xl shadow-green-600/20 hover:bg-green-700" asChild>
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
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-green-700 text-base font-bold text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          اتصل
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp("sticky_bar")}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border-2 border-green-700 bg-white text-base font-bold text-green-800"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          واتساب
        </a>
      </div>
    </>
  );
}