"use client";

// ============================================
// Google Analytics + Google Ads Event Tracking
// ============================================
//
// القواعد:
//  - كل الأحداث بتروح GA4 عن طريق gtag (وبتعدي على GTM).
//  - تحويلات Google Ads المباشرة (send_to) للفورم وطلب السعر بس، ومعاها transaction_id.
//  - ضغطات الاتصال والواتساب: حدث GA4 بس. الـ tags اللي في GTM (TechSol) هي اللي بتغطيها.
//    لو عاوز الكود هو اللي يبعتها لـ Ads، فعّل NEXT_PUBLIC_GADS_CLICK_CONVERSIONS=true
//    واحذف الـ tags دي من GTM عشان متتعدش مرتين.

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "";
const SEND_CLICK_CONVERSIONS = process.env.NEXT_PUBLIC_GADS_CLICK_CONVERSIONS === "true";

const PHONE_LABEL = process.env.NEXT_PUBLIC_GADS_PHONE_LABEL || "";
const WHATSAPP_LABEL = process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL || "";
const FORM_LABEL = process.env.NEXT_PUBLIC_GADS_FORM_LABEL || "";
const QUOTE_LABEL = process.env.NEXT_PUBLIC_GADS_QUOTE_LABEL || "";

// اسم حدث الليد في GA4.
// generate_lead هو الاسم الموصى بيه من GA4. مينفعش نستخدم form_submit لأن Enhanced Measurement
// بيبعت حدث بنفس الاسم تلقائياً مع أي submit (حتى لو الفورم فشل).
const LEAD_EVENT = "generate_lead";

// أنواع المصادر للتتبع
export type TrackingSource =
  | "header_desktop"
  | "header_mobile"
  | "footer"
  | "floating_widget"
  | "floating_quick_msg"
  | "floating_main"
  | "floating_mobile"
  | "floating_open"
  | "contact_page"
  | "hero_section"
  | "area_page"
  | "service_page"
  | "mobile_sticky"
  | "quote_dialog"
  | "unknown";

// ========== Helper Functions ==========

type GtagFn = (...args: unknown[]) => void;
type GtagWindow = Window & { gtag?: GtagFn; dataLayer?: unknown[] };

// بيضمن وجود dataLayer وgtag. لو الـ Google tag لسه ماتحملش (ضغطة سريعة)،
// الأوامر بتتحط في الطابور وبتتنفذ أول ما يتحمل، بدل ما تضيع.
const ensureGtag = (): GtagFn | null => {
  if (typeof window === "undefined") return null;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function () {
      // gtag لازم يبعت كائن arguments نفسه للـ dataLayer
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
  }
  return w.gtag as GtagFn;
};

const sendGtagEvent = (eventName: string, params: Record<string, unknown>) => {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", eventName, params);
};

// بيمنع الضغطة المزدوجة (Double tap) من إنها تتسجل مرتين.
const lastFired: Record<string, number> = {};
const isDuplicate = (key: string, windowMs = 3000): boolean => {
  const now = Date.now();
  if (lastFired[key] && now - lastFired[key] < windowMs) return true;
  lastFired[key] = now;
  return false;
};

const makeTransactionId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// بيرجّع بيانات الإعلان (gclid / gbraid / wbraid / UTM) اللي اتحفظت أول ما الزائر دخل.
// استخدمها في InlineQuoteForm وابعتها مع الطلب عشان ترفع النقلات المقفولة لجوجل لاحقاً.
export const getAdParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem("ad_params");
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  try {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("ad_params="));
    if (cookie) return JSON.parse(decodeURIComponent(cookie.split("=").slice(1).join("=")));
  } catch {
    /* ignore */
  }
  return {};
};

// ========== Google Ads Conversion ==========

type ConversionOptions = { value?: number; transactionId?: string };

// متوافقة مع الاستدعاء القديم trackGoogleAdsConversion(label, value)
export const trackGoogleAdsConversion = (
  conversionLabel: string,
  valueOrOptions?: number | ConversionOptions
) => {
  if (!GADS_ID || !conversionLabel) return;

  const options: ConversionOptions =
    typeof valueOrOptions === "number" ? { value: valueOrOptions } : valueOrOptions || {};

  const params: Record<string, unknown> = {
    send_to: `${GADS_ID}/${conversionLabel}`,
  };
  // القيمة بتتبعت بس لو حقيقية. مفيش قيم مخترعة.
  if (typeof options.value === "number" && options.value > 0) {
    params.value = options.value;
    params.currency = "EGP";
  }
  if (options.transactionId) params.transaction_id = options.transactionId;

  sendGtagEvent("conversion", params);
};

// ========== Event Trackers ==========

export const trackPhoneCall = (source: TrackingSource | string = "unknown") => {
  if (isDuplicate(`phone:${source}`)) return;

  sendGtagEvent("phone_call", {
    event_category: "engagement",
    event_label: source,
    transport_type: "beacon",
  });

  if (SEND_CLICK_CONVERSIONS && PHONE_LABEL) {
    trackGoogleAdsConversion(PHONE_LABEL);
  }
};

export const trackWhatsApp = (source: TrackingSource | string = "unknown") => {
  if (isDuplicate(`whatsapp:${source}`)) return;

  sendGtagEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: source,
    transport_type: "beacon",
  });

  if (SEND_CLICK_CONVERSIONS && WHATSAPP_LABEL) {
    trackGoogleAdsConversion(WHATSAPP_LABEL);
  }
};

/**
 * استدعيها بعد ما الفورم يتبعت بنجاح (رد ناجح من الـ API)، مش عند الضغط على الزرار.
 */
export const trackFormSubmit = (
  formName: string,
  formData?: { service?: string; area?: string }
) => {
  if (isDuplicate(`form:${formName}`, 10000)) return;

  sendGtagEvent(LEAD_EVENT, {
    event_category: "conversion",
    event_label: formName,
    form_name: formName,
    service: formData?.service || "",
    area: formData?.area || "",
  });

  if (FORM_LABEL) {
    // transaction_id بيخلي Google Ads يتجاهل التكرار لنفس الليد
    trackGoogleAdsConversion(FORM_LABEL, { transactionId: makeTransactionId() });
  }
};

/**
 * لو الدالة دي بتتنده عند فتح نافذة السعر (نية مش ليد فعلي)، متخليهاش تحويل في Ads.
 * استخدمها بعد الإرسال الناجح بس.
 */
export const trackQuoteRequest = (source: TrackingSource | string = "unknown") => {
  if (isDuplicate(`quote:${source}`, 10000)) return;

  sendGtagEvent("quote_request", {
    event_category: "conversion",
    event_label: source,
  });

  if (QUOTE_LABEL) {
    trackGoogleAdsConversion(QUOTE_LABEL, { transactionId: makeTransactionId() });
  }
};

export const trackAreaView = (areaName: string, areaSlug: string) => {
  sendGtagEvent("area_page_view", {
    event_category: "page_engagement",
    event_label: areaName,
    area_slug: areaSlug,
  });
};

export const trackServiceView = (serviceName: string, serviceSlug: string) => {
  sendGtagEvent("service_page_view", {
    event_category: "page_engagement",
    event_label: serviceName,
    service_slug: serviceSlug,
  });
};