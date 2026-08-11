"use client";

import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.003 0C7.163 0 .003 7.16.003 16c0 2.813.734 5.573 2.13 8.005L0 32l8.223-2.148A15.977 15.977 0 0 0 16.003 32C24.843 32 32 24.84 32 16S24.843 0 16.003 0zm0 29.333a13.35 13.35 0 0 1-6.803-1.87l-.487-.29-5.056 1.32 1.35-4.933-.317-.507A13.31 13.31 0 0 1 2.67 16c0-7.36 5.976-13.333 13.333-13.333 7.357 0 13.333 5.973 13.333 13.333 0 7.36-5.976 13.333-13.333 13.333zm7.32-9.977c-.4-.2-2.367-1.167-2.733-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.687-.62-3.213-1.98-1.187-1.06-1.987-2.367-2.22-2.767-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.657-.673-.9-.687-.233-.013-.5-.013-.767-.013s-.7.1-1.067.5c-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.04.955.412 1.7.658 2.28.842.958.305 1.83.262 2.52.159.768-.115 2.367-.968 2.7-1.903.333-.935.333-1.735.233-1.903-.1-.167-.367-.267-.767-.467z" />
    </svg>
  );
}

export function FloatingActions() {
  const [mounted, setMounted] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <WhatsAppWidget open={showWidget} onClose={() => setShowWidget(false)} />

      {/* Call Button */}
      <a
        href={`tel:${siteConfig.phone}`}
        className={`fixed bottom-4 md:bottom-6 left-4 md:left-6 z-40 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
        aria-label="اتصل بنا"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#E85D04] to-[#D14D00] rounded-full flex items-center justify-center shadow-2xl shadow-[#E85D04]/50 hover:scale-110 active:scale-95 transition-transform duration-200 border-2 border-white/20">
          <Phone className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
        </div>
      </a>

      {/* WhatsApp Button */}
      <button
        onClick={() => setShowWidget(!showWidget)}
        className={`fixed bottom-4 md:bottom-6 right-4 md:right-6 z-40 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
        aria-label="واتساب"
        type="button"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#25D366] to-[#20BD5A] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-transform duration-200 border-2 border-white/20">
          {showWidget ? (
            <X className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
          ) : (
            <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
          )}
        </div>
      </button>
    </>
  );
}
