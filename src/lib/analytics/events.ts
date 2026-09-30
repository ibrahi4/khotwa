declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const trackPhoneCall = (location: string) => {
  if (typeof window === "undefined") return;

  // 1. DataLayer for GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "phone_call",
    click_location: location,
    event_category: "Conversion",
    event_label: `Phone Call - ${location}`,
  });

  // 2. GA4 Direct Event
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "Contact",
      event_label: location,
      method: "phone",
    });
  }
};

export const trackWhatsApp = (location: string) => {
  if (typeof window === "undefined") return;

  // 1. DataLayer for GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    click_location: location,
    event_category: "Conversion",
    event_label: `WhatsApp - ${location}`,
  });

  // 2. GA4 Direct Event
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "Contact",
      event_label: location,
      method: "whatsapp",
    });
  }
};

export const trackFormSubmission = (formName: string) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submission",
    form_name: formName,
    event_category: "Conversion",
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "lead", {
      event_category: "Form",
      event_label: formName,
    });
  }
};
