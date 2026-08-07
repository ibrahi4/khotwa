"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

export function MobileStickyBar() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <WhatsAppWidget
        open={widgetOpen}
        onClose={() => setWidgetOpen(false)}
        position="mobile-bottom"
      />

      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        <div className="bg-[#1C1C1C] border-t border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 gap-0">

            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => trackPhoneCall("mobile_sticky")}
              className="relative flex items-center justify-center gap-2 py-4 text-white bg-[#E85D04] active:bg-[#D14D00] transition-all overflow-hidden group"
            >
              <div className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="relative flex flex-col items-start">
                <span className="text-[10px] text-white/80 font-medium leading-none">
                  اتصل بنا
                </span>
                <span className="text-sm font-black text-white leading-tight mt-0.5">
                  الآن مباشرة
                </span>
              </div>
            </a>

            <button
              type="button"
              onClick={() => {
                setWidgetOpen(true);
                trackWhatsApp("mobile_sticky");
              }}
              className="relative flex items-center justify-center gap-2 py-4 text-white bg-[#1F5F3F] active:bg-[#164A30] transition-all overflow-hidden group border-r border-white/10"
            >
              <div className="relative w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>

              <div className="relative flex flex-col items-start">
                <span className="text-[10px] text-white/70 font-medium leading-none">
                  واتساب
                </span>
                <span className="text-sm font-black text-white leading-tight mt-0.5">
                  رد فوري
                </span>
              </div>
            </button>

          </div>
        </div>

        <div className="bg-[#1C1C1C]" style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>
    </>
  );
}