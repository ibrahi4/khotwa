"use client";

import Script from "next/script";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// تحقق بسيط من شكل الـ IDs قبل ما نحطها في سكريبت
const GA_OK = /^G-[A-Z0-9]+$/i.test(GA_TRACKING_ID);
const GADS_OK = /^AW-\d+$/i.test(GADS_ID);
const GTM_OK = /^GTM-[A-Z0-9]+$/i.test(GTM_ID);

/**
 * وضع gtag.js المباشر (من غير GTM).
 * لو GTM_ID موجود، الـ Google tag (G-XXXX) وConversion Linker بيتحملوا من جوه الـ container،
 * فمينفعش نحملهم هنا كمان (هيتعد page_view مرتين وإعدادات Ads مرتين).
 */
export function GoogleAnalytics() {
  if (GTM_OK) return null;
  if (!GA_OK) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(GA_TRACKING_ID)});
            ${GADS_OK ? `gtag('config', ${JSON.stringify(GADS_ID)});` : ""}
          `,
        }}
      />
    </>
  );
}

/**
 * GTM: بيحمّل الـ container ومعاه dataLayer ودالة gtag.
 * دالة gtag هنا مهمة: أي كود في الموقع بيستدعي window.gtag('event', ...)
 * (زي lib/analytics/events) هيدخل الـ dataLayer ويوصل للـ Google tag اللي جوه GTM.
 * من غيرها الاستدعاءات دي بتتجاهل بصمت.
 */
export function GoogleTagManager() {
  if (!GTM_OK) return null;

  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});
        `,
      }}
    />
  );
}

/**
 * اختياري: حطه أول حاجة جوه <body> في app/layout.tsx.
 * بيغطي الزوار اللي JavaScript مقفول عندهم.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_OK) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

// Re-export الدوال من الملف الجديد للتوافق مع الكود القديم
export { trackPhoneCall, trackWhatsApp, trackFormSubmit } from "@/lib/analytics/events";