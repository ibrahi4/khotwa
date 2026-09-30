declare global {
  interface Window {
    dataLayer: any[];
  }
}

// دالة تسجيل المكالمات
export const trackPhoneCall = (location: string) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "phone_call_click",
    click_location: location,
    conversion_type: "Lead - Phone",
  });
  
  console.log(`[Tracking] Phone Call Triggered from: ${location}`);
};

// دالة تسجيل الواتساب
export const trackWhatsApp = (location: string) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    click_location: location,
    conversion_type: "Lead - WhatsApp",
  });

  console.log(`[Tracking] WhatsApp Triggered from: ${location}`);
};

// دالة تسجيل الفورم (إذا كان لديك فورم مستقبلاً)
export const trackFormSubmission = (formName: string) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submit_success",
    form_name: formName,
    conversion_type: "Lead - Form",
  });
  
  console.log(`[Tracking] Form Submitted: ${formName}`);
};
