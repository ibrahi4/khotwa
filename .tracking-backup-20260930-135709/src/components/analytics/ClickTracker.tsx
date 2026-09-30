"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

const WA_RE = /^(https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\b|whatsapp:)/i;

export function ClickTracker() {
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const el = ev.target as Element | null;
      const a = el?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href") ?? "";
      let event: "click_call" | "click_whatsapp" | null = null;

      if (href.startsWith("tel:")) event = "click_call";
      else if (WA_RE.test(href)) event = "click_whatsapp";
      if (!event) return;

      // ملاحظة: لا نرسل رقم التليفون نفسه
      pushEvent({
        event,
        link_location: a.dataset.trackLocation ?? "unspecified",
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}