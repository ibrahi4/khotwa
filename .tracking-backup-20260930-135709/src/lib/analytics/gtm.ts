export type DataLayerEvent = { event: string; [key: string]: unknown };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function pushEvent(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  (window.dataLayer = window.dataLayer || []).push(payload);
}

// للفورم وطلب عرض السعر: نادِها بعد نجاح الإرسال فقط
export function trackLead(source: "contact_form" | "quote_request") {
  pushEvent({
    event: "generate_lead",
    lead_source: source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}