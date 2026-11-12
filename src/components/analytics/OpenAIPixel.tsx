"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

export function OpenAIPixel() {
  const pathname = usePathname();

  useEffect(() => {
    window.oaiq?.("measure", "page_viewed", {
      type: "contents",
      contents: [
        {
          id: pathname || "/",
          name: document.title || "Khatwa Moving Page",
          content_type: "page",
        },
      ],
    });
  }, [pathname]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        window.oaiq?.("measure", "lead_created", {
          type: "customer_action",
        });
        window.oaiq?.(
          "measure",
          "custom",
          { type: "custom" },
          { custom_event_name: "phone_call_clicked" }
        );
      }

      if (
        href.includes("wa.me") ||
        href.includes("api.whatsapp.com") ||
        href.includes("whatsapp://")
      ) {
        window.oaiq?.("measure", "lead_created", {
          type: "customer_action",
        });
        window.oaiq?.(
          "measure",
          "custom",
          { type: "custom" },
          { custom_event_name: "whatsapp_clicked" }
        );
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, []);

  return null;
}

export default OpenAIPixel;