"use client";

import { useEffect } from "react";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

const WA_RE = /^(https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\b|whatsapp:)/i;

// بيغطي كل روابط tel: وواتساب اللي ملهاش onClick يدوي.
// شغال في مرحلة الـ bubble عشان onClick اليدوي (وlabel بتاعه) يشتغل الأول،
// وdedup في events.ts يمنع التكرار.
export function ClickTracker() {
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href") ?? "";
      const source = a.dataset.trackLocation ?? `auto:${window.location.pathname}`;

      if (href.startsWith("tel:")) trackPhoneCall(source);
      else if (WA_RE.test(href)) trackWhatsApp(source);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}