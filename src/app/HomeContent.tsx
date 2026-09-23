"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Phone, MessageCircle, Shield, Clock, Users, ArrowLeft, ChevronDown,
  MapPin, Truck, ThumbsUp, Wrench, Wind, Box, ArrowUpToLine, Gem,
  ClipboardCheck, PackageCheck, Home as HomeIcon, CircleCheckBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { CompoundsTrust } from "@/components/shared/CompoundsTrust";
import { InlineQuoteForm } from "@/components/shared/InlineQuoteForm";
import { GallerySection } from "@/components/features/GallerySection";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

/* ───────────────────────── Settings ─────────────────────────
   الأرقام دي لازم تكون حقيقية ومطابقة لبياناتك على Google Business.
   لو رقم مش متأكد منه، احذفه من هنا وهيختفي من الصفحة كلها. */
const TRUST = {
  clients: "+500",
  years: "+10",
};

/* اتركها false إلا لو الطلبات اللي بتظهر في LiveOrdersFeed حقيقية.
   سياسة جوجل بتمنع الادعاءات المضللة. */
const SHOW_LIVE_ORDERS = false;

const LiveOrdersFeed = dynamic(
  () => import("@/components/shared/LiveOrdersFeed").then((m) => ({ default: m.LiveOrdersFeed })),
  { ssr: false, loading: () => <div className="h-64 bg-slate-50" aria-hidden="true" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/features/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="h-96 bg-white" aria-hidden="true" /> }
);

/* ───────────────────────── Helpers ───────────────────────── */

const DEFAULT_WA_TEXT = "السلام عليكم، عايز أعرف سعر نقل عفش/أثاث";

function waLink(text: string = DEFAULT_WA_TEXT) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

/* بيحفظ gclid / gbraid / wbraid / UTM في localStorage وكوكي ad_params لمدة 90 يوم.
   اقرأها من InlineQuoteForm وابعتها مع الطلب عشان ترفع Offline conversions لجوجل.
   الأفضل تنقلها للـ layout عشان تشتغل على كل الصفحات. */
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

/* ───────────────────────── Quick estimate (WhatsApp) ─────────────────────────
   بيجمع تفاصيل النقلة ويبني رسالة واتساب جاهزة. مفيش أسعار متألفة.
   الحقول الأساسية (من / إلى / النوع / الأسانسير) ظاهرة، والباقي داخل "تفاصيل إضافية". */

const PROPERTY_TYPES = ["شقة غرفة أو غرفتين", "شقة 3 غرف", "شقة 4 غرف أو أكتر", "فيلا / دوبلكس", "مكتب / شركة"];
const FLOORS = ["أرضي", "من 1 لـ 3", "من 4 لـ 6", "7 فأعلى"];
const EXTRAS = ["فك وتركيب", "تغليف", "ونش رفع", "فك وتركيب تكييفات"];
const TIMINGS = ["خلال أسبوع", "خلال شهر", "لسه بسأل عن السعر"];

const fieldCls =
  "w-full h-12 rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500";
const labelCls = "mb-1 block text-sm font-semibold text-slate-700";

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
    <div className="w-full rounded-2xl bg-white p-4 text-right shadow-xl sm:p-5">
      <h2 className="text-lg font-black text-green-950 sm:text-xl">احسب عرض سعرك في دقيقة</h2>
      <p className="mt-1 text-sm text-slate-600">املا التفاصيل وابعتها على واتساب، وهنرد عليك بعرض سعر واضح.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
        <div>
          <label htmlFor={id("from")} className={labelCls}>من منطقة</label>
          <input id={id("from")} className={fieldCls} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="مثال: التجمع" autoComplete="off" />
        </div>
        <div>
          <label htmlFor={id("to")} className={labelCls}>إلى منطقة</label>
          <input id={id("to")} className={fieldCls} value={to} onChange={(e) => setTo(e.target.value)} placeholder="مثال: الشيخ زايد" autoComplete="off" />
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={id("property")} className={labelCls}>نوع النقلة</label>
        <select id={id("property")} className={fieldCls} value={property} onChange={(e) => setProperty(e.target.value)}>
          <option value="">اختار</option>
          {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="mt-3">
        <span className={labelCls}>أسانسير</span>
        <div className="grid grid-cols-2 gap-2">
          {([["yes", "فيه أسانسير"], ["no", "مفيش أسانسير"]] as const).map(([val, label]) => (
            <button
              key={val}
              type="button"
              aria-pressed={elevator === val}
              onClick={() => setElevator(elevator === val ? "" : val)}
              className={`h-12 rounded-xl border text-sm font-semibold transition-colors ${
                elevator === val ? "border-green-600 bg-green-50 text-green-800" : "border-slate-200 bg-white text-slate-700 hover:border-green-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <details className="group mt-3 rounded-xl border border-slate-200">
        <summary className="flex h-12 cursor-pointer list-none items-center justify-between px-3 text-sm font-semibold text-slate-700 [&::-webkit-details-marker]:hidden">
          تفاصيل إضافية (اختياري)
          <ChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-3 border-t border-slate-100 p-3">
          <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            <div>
              <label htmlFor={id("floor")} className={labelCls}>الدور</label>
              <select id={id("floor")} className={fieldCls} value={floor} onChange={(e) => setFloor(e.target.value)}>
                <option value="">اختار</option>
                {FLOORS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={id("timing")} className={labelCls}>الموعد</label>
              <select id={id("timing")} className={fieldCls} value={timing} onChange={(e) => setTiming(e.target.value)}>
                <option value="">اختار</option>
                {TIMINGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <span className={labelCls}>محتاج إيه كمان؟</span>
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((x) => (
                <button
                  key={x}
                  type="button"
                  aria-pressed={extras.includes(x)}
                  onClick={() => toggleExtra(x)}
                  className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    extras.includes(x) ? "border-green-600 bg-green-50 text-green-800" : "border-slate-200 bg-white text-slate-700 hover:border-green-300"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
        </div>
      </details>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp(source)}
        className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-base font-bold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-700"
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
  { icon: ClipboardCheck, title: "معاينة مجانية", desc: "بنعاين الأثاث ونحدد اللي هيتفك واللي هيتغلف" },
  { icon: PackageCheck, title: "تغليف احترافي", desc: "مواد تغليف بتحمي كل قطعة من الخدش والكسر" },
  { icon: Truck, title: "نقل آمن", desc: "عربيات مجهزة وتثبيت محكم للحمولة" },
  { icon: HomeIcon, title: "تركيب وتسليم", desc: "بنرتب كل حاجة في مكانها ونركّب اللي اتفك" },
];

const whyUsItems = [
  { icon: Shield, title: "تأمين شامل", desc: "غطاء تأميني على كل قطعة" },
  { icon: Users, title: "فريق معتمد", desc: "فنيين مدربين بخبرة عالية" },
  { icon: Clock, title: "التزام بالمواعيد", desc: "بنوصل في الميعاد المتفق عليه" },
  { icon: ThumbsUp, title: "أسعار واضحة", desc: "سعر معروف قبل ما نبدأ، من غير رسوم مخفية" },
];

/* الأسئلة دي مبنية على اللي مكتوب أصلًا في صفحتك (معاينة مجانية، خدماتك، مناطقك).
   لو حابب تضيف إجابات عن أسعار أو مواعيد محددة، أضفها بنفسك بأرقامك الحقيقية. */
const faqs = [
  {
    q: "هل المعاينة مجانية؟",
    a: "أيوه، المعاينة مجانية قبل ما تحجز. بنشوف الأثاث ونحدد اللي هيتفك واللي هيتغلف، وبعدها بنعطيك سعرًا واضحًا.",
  },
  {
    q: "إزاي بيتحدد سعر نقل العفش؟",
    a: "السعر النهائي بيتحدد بعد المعاينة، وبيتأثر بحجم الأثاث والمسافة والدور ووجود أسانسير والخدمات الإضافية زي الفك والتركيب والتغليف. السعر بيكون معروف قبل ما نبدأ ومن غير رسوم مخفية.",
  },
  {
    q: "هل بتفكوا وتركبوا الأثاث والتكييفات؟",
    a: "أيوه، بنفك ونركّب الأثاث والتكييفات، وبنقدم كمان تغليف احترافي وونش رفع للأدوار العالية أو القطع اللي يصعب نزولها من السلم.",
  },
  {
    q: "بتخدموا أنهي مناطق؟",
    a: "بنخدم القاهرة والجيزة، وبنغطي المناطق الرئيسية والكمبوندات. شوف صفحة مناطق الخدمة أو كلمنا وهنأكدلك لو منطقتك مغطاة.",
  },
  {
    q: "إزاي أحجز؟",
    a: "اتصل بينا أو ابعت تفاصيل النقلة على واتساب من الفورم في أعلى الصفحة، وهنرد عليك ونحدد موعد المعاينة.",
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function HomeContent() {
  useEffect(() => { captureAdParams(); }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0">
          <Image
            src="/herosection.webp"
            alt="شركة خطوة لنقل العفش والأثاث بالقاهرة والجيزة"
            fill
            className="object-cover"
            sizes="100vw"
            quality={70}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-green-950/95 via-green-950/85 to-green-950/60" />
        </div>

        <div className="container-custom relative z-10 py-10 md:py-14 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-md sm:text-sm">
                <CircleCheckBig className="h-4 w-4 text-green-400" aria-hidden="true" />
                {TRUST.clients} عميل يثقون بنا في القاهرة الكبرى
              </p>

              {/* H1 والفقرة من غير أنيميشن عشان الـ LCP يظهر فورًا */}
              <h1 id="hero-heading" className="mt-4 text-3xl font-black leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl">
                شركة نقل عفش وأثاث
                <span className="block text-green-400">بالقاهرة والجيزة</span>
              </h1>

              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                نقل وفك وتركيب وتغليف وونش رفع. فريق بخبرة {TRUST.years} سنوات، ومعاينة مجانية قبل ما تحجز.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <Button size="lg" className="h-14 gap-2 rounded-xl bg-green-500 px-4 text-base font-bold text-white shadow-xl shadow-green-500/25 hover:bg-green-600 sm:px-8" asChild>
                  <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("hero_main")}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    اتصل دلوقتي
                  </a>
                </Button>
                <Button size="lg" className="h-14 gap-2 rounded-xl bg-white px-4 text-base font-bold text-green-900 hover:bg-green-50 sm:px-8" asChild>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("hero_main")}>
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    واتساب
                  </a>
                </Button>
              </div>

              <a
                href="#estimate"
                className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4 lg:hidden"
              >
                أو احسب عرض سعرك في دقيقة
              </a>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
                {[
                  { icon: CircleCheckBig, text: "معاينة مجانية" },
                  { icon: Clock, text: "خدمة 24/7" },
                  { icon: PackageCheck, text: "تغليف احترافي" },
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.text} className="flex items-center gap-1.5">
                      <ItemIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
                      {item.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop: فورم التقدير داخل الـ hero */}
            <div id="estimate-desktop" className="hidden lg:col-span-5 lg:block">
              <QuickEstimateCard source="hero_estimate" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile / Tablet: فورم التقدير تحت الـ hero مباشرة */}
      <section id="estimate" className="scroll-mt-4 bg-slate-50 px-4 py-6 lg:hidden" aria-label="احسب عرض سعرك">
        <div className="mx-auto max-w-lg">
          <QuickEstimateCard source="mobile_estimate" />
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="bg-white py-10 md:py-14" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 id="services-heading" className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              خدمات نقل العفش والأثاث
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              {services.length} خدمات تحت سقف واحد: نقل عفش، فك وتركيب، تغليف، وونش رفع
            </p>
          </div>

          <ul className="mx-auto max-w-4xl divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {services.map((service) => {
              const SIcon = serviceIcons[service.slug] || Truck;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 p-4 transition-colors hover:bg-green-50/40 md:gap-5 md:p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-700 md:h-12 md:w-12">
                      <SIcon className="h-5 w-5 text-green-700 transition-colors group-hover:text-white md:h-6 md:w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold leading-tight text-slate-900 group-hover:text-green-800 md:text-lg">
                        {service.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowLeft className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-green-700" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="h-11 gap-2 rounded-xl border-slate-200 px-6 text-slate-800 hover:border-green-300 hover:bg-green-50">
              <Link href="/services">
                عرض جميع تفاصيل الخدمات
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPOUNDS TRUST ═══════════════ */}
      <CompoundsTrust />

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="bg-white py-10 md:py-14" aria-labelledby="how-heading">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 id="how-heading" className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              إزاي بنشتغل: 4 خطوات لنقلة من غير وجع دماغ
            </h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">من المعاينة لحد التسليم النهائي</p>
          </div>

          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <li key={step.title} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 lg:block">
                  <div className="flex shrink-0 items-center gap-2 lg:mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-sm font-bold text-white tabular-nums">
                      {i + 1}
                    </span>
                    <StepIcon className="hidden h-5 w-5 text-green-600 lg:block" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="bg-slate-50 py-10 md:py-14" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 id="why-heading" className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              ليه تختار خطوة لنقل عفشك؟
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              بنتعامل مع كل قطعة كأنها أثاثنا، لأن كل قطعة ليها قيمة وذكرى عندك.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyUsItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                      <ItemIcon className="h-5 w-5 text-green-700" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-6 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 rounded-2xl border border-slate-200 bg-white py-4 text-center">
              <div>
                <dd className="text-2xl font-black tabular-nums text-slate-900 md:text-3xl">{TRUST.clients}</dd>
                <dt className="mt-1 text-xs font-medium text-slate-500 md:text-sm">عميل</dt>
              </div>
              <div>
                <dd className="text-2xl font-black tabular-nums text-slate-900 md:text-3xl">{TRUST.years}</dd>
                <dt className="mt-1 text-xs font-medium text-slate-500 md:text-sm">سنوات خبرة</dt>
              </div>
              <div>
                <dd className="text-2xl font-black tabular-nums text-slate-900 md:text-3xl">24/7</dd>
                <dt className="mt-1 text-xs font-medium text-slate-500 md:text-sm">خدمة مستمرة</dt>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ═══════════════ LIVE ORDERS (مقفول افتراضيًا) ═══════════════ */}
      {SHOW_LIVE_ORDERS && <LiveOrdersFeed />}

      {/* ═══════════════ AREAS ═══════════════ */}
      <section className="bg-white py-10 md:py-14" aria-labelledby="areas-heading">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 id="areas-heading" className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              مناطق خدمة نقل الأثاث في القاهرة والجيزة
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              بنغطي المناطق الرئيسية والكمبوندات في القاهرة الكبرى
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {featuredAreas.map((area) => {
              const count = area.neighborhoods?.length || 0;
              return (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="group flex h-full items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:border-green-300 hover:bg-white sm:p-4"
                  >
                    <MapPin className="h-5 w-5 shrink-0 text-green-700" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold leading-snug text-slate-900 group-hover:text-green-800">
                        {area.name}
                      </div>
                      {count > 0 && <div className="text-xs text-slate-500">{count} أحياء</div>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="h-11 gap-2 rounded-xl border-slate-200 px-6 text-slate-800 hover:border-green-300 hover:bg-green-50">
              <Link href="/areas">
                عرض جميع المناطق
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <TestimonialsSection />
      <GallerySection />

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="bg-slate-50 py-10 md:py-14" aria-labelledby="faq-heading">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-heading" className="mb-6 text-center text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              أسئلة شائعة عن نقل العفش
            </h2>
            <div className="space-y-2.5">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-slate-200 bg-white">
                  <summary className="flex min-h-[3.25rem] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ QUOTE FORM ═══════════════ */}
      <div id="quote-form" className="scroll-mt-4">
        <InlineQuoteForm />
      </div>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="border-t border-emerald-950 bg-slate-950 py-10 md:py-14" aria-labelledby="cta-heading">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="cta-heading" className="text-2xl font-black leading-snug text-white md:text-4xl">
              جاهز تنقل عفشك؟
              <span className="block text-green-400">كلمنا واحجز معاينة مجانية</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
              فريقنا بيرد بسرعة، وبتاخد عرض سعر واضح قبل ما نبدأ.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mx-auto sm:max-w-md">
              <Button size="lg" className="h-14 gap-2 rounded-xl bg-white px-6 text-base font-bold text-slate-900 hover:bg-slate-100" asChild>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("final_cta")}>
                  <Phone className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  اتصل دلوقتي
                </a>
              </Button>
              <Button size="lg" className="h-14 gap-2 rounded-xl bg-green-600 px-6 text-base font-bold text-white hover:bg-green-700" asChild>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("final_cta")}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  واتساب
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
        className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-slate-200 bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden"
        role="region"
        aria-label="تواصل سريع"
      >
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => trackPhoneCall("sticky_bar")}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 text-base font-bold text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          اتصل
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp("sticky_bar")}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-white text-base font-bold text-green-700"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          واتساب
        </a>
      </div>
    </>
  );
}