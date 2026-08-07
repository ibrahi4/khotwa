"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget";

export function FloatingActions() {
  const [mounted, setMounted] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Show buttons ONLY after user scrolls past 600px (past hero section)
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Stop pulse after 10 seconds
    const timer = setTimeout(() => setShowPulse(false), 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <WhatsAppWidget open={showWidget} onClose={() => setShowWidget(false)} />

      <div
        className={`fixed bottom-4 md:bottom-6 left-0 right-0 z-40 pointer-events-none transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="container-custom flex items-end justify-between">

          {/* LEFT - Call Button */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="pointer-events-auto group relative"
            aria-label="اتصل بنا"
          >
            {showPulse && isVisible && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#E85D04] opacity-40 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-[#E85D04] opacity-20 animate-ping" style={{ animationDelay: "0.5s" }} />
              </>
            )}
            <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#E85D04] to-[#D14D00] rounded-full flex items-center justify-center shadow-2xl shadow-[#E85D04]/50 group-hover:scale-110 group-active:scale-95 transition-all duration-300 border-2 border-white/20">
              <Phone className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
            </div>
          </a>

          {/* RIGHT - WhatsApp Button */}
          <button
            onClick={() => setShowWidget(true)}
            className="pointer-events-auto group relative"
            aria-label="واتساب"
            type="button"
          >
            {showPulse && !showWidget && isVisible && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping" style={{ animationDelay: "0.5s" }} />
              </>
            )}
            {showPulse && !showWidget && isVisible && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E85D04] rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-lg z-10 animate-bounce">
                1
              </div>
            )}
            <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#25D366] to-[#20BD5A] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/50 group-hover:scale-110 group-active:scale-95 transition-all duration-300 border-2 border-white/20">
              {showWidget ? (
                <X className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              ) : (
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" strokeWidth={2} />
              )}
            </div>
          </button>

        </div>
      </div>
    </>
  );
}