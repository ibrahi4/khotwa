"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame, Zap, Crown, Sparkles, Phone, ArrowLeft,
  Gift, Rocket, PartyPopper, Star, TrendingUp,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type Message = {
  icon: React.ElementType;
  emoji?: string;
  text: string;
  highlight: string;
  cta?: { label: string; href: string; external?: boolean };
  gradient: string;
  urgent?: boolean;
};

const messages: Message[] = [
  {
    icon: Flame,
    text: "عرض حصري لفترة محدودة",
    highlight: "خصم 20%",
    cta: { label: "احجز الآن", href: `tel:${siteConfig.phone}` },
    gradient: "from-[#E85D04] via-[#DC2626] to-[#E85D04]",
    urgent: true,
  },
  {
    icon: Rocket,
    text: "خدمة سريعة تصل في",
    highlight: "أقل من ساعة",
    cta: { label: "اطلب الآن", href: `https://wa.me/${siteConfig.whatsapp}`, external: true },
    gradient: "from-[#059669] via-[#10B981] to-[#059669]",
  },
  {
    icon: Crown,
    text: "خدمة VIP حصرية",
    highlight: "لسكان الكمبوندات",
    cta: { label: "تفاصيل أكتر", href: "/areas" },
    gradient: "from-[#7C3AED] via-[#A855F7] to-[#7C3AED]",
  },
  {
    icon: Gift,
    text: "معاينة مجانية",
    highlight: "بدون أي التزام",
    cta: { label: "احجز معاينتك", href: `tel:${siteConfig.phone}` },
    gradient: "from-[#0891B2] via-[#06B6D4] to-[#0891B2]",
  },
  {
    icon: Star,
    text: "تقييم عملائنا",
    highlight: "4.9 من 5 نجوم",
    cta: { label: "شوف التقييمات", href: "/#reviews" },
    gradient: "from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]",
  },
  {
    icon: PartyPopper,
    text: "أكتر من",
    highlight: "500 عميل سعيد",
    cta: { label: "انضم لعائلتنا", href: `https://wa.me/${siteConfig.whatsapp}`, external: true },
    gradient: "from-[#DB2777] via-[#EC4899] to-[#DB2777]",
  },
];

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-[#E85D04] via-[#DC2626] to-[#E85D04] text-white h-11 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>خطوة لنقل الأثاث - خدمة تليق بمنزلك</span>
        </div>
      </div>
    );
  }

  const current = messages[currentIndex];
  const Icon = current.icon;

  return (
    <div
      className={`relative bg-gradient-to-r ${current.gradient} text-white overflow-hidden transition-all duration-1000 bg-[length:200%_200%] animate-gradient-shift`}
    >
      {/* Animated shine effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
      </div>

      {/* Sparkles decoration */}
      <div className="absolute top-1 left-4 hidden md:block pointer-events-none">
        <Sparkles className="w-3 h-3 text-white/40 animate-pulse" />
      </div>
      <div className="absolute bottom-1 right-1/3 hidden md:block pointer-events-none">
        <Sparkles className="w-2.5 h-2.5 text-white/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative container-custom">
        <div className="flex items-center justify-center md:justify-between h-11 gap-3">

          {/* Live Indicator - Desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#4ADE80] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
            </div>
            <span className="text-[10px] font-black text-white/90 tracking-widest uppercase">
              LIVE
            </span>
          </div>

          {/* Message - Centered with animation */}
          <div
            key={currentIndex}
            className="flex-1 flex items-center justify-center gap-2 md:gap-3 animate-slide-in"
          >
            {/* Icon Badge */}
            <div className="relative shrink-0">
              {current.urgent && (
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
              )}
              <div className="relative w-7 h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg">
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Text */}
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center">
              <span className="text-xs md:text-sm font-semibold text-white/90">
                {current.text}
              </span>
              <span className="text-sm md:text-base font-black text-white bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-md tracking-tight border border-white/20 shadow-inner">
                {current.highlight}
              </span>
            </div>

            {/* CTA Button */}
            {current.cta && (
              <>
                {current.cta.external ? (
                  <a
                    href={current.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 bg-white text-[#1C1C1C] font-black text-xs px-3 py-1 rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-lg group"
                  >
                    {current.cta.label}
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={current.cta.href}
                    className="hidden sm:inline-flex items-center gap-1 bg-white text-[#1C1C1C] font-black text-xs px-3 py-1 rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-lg group"
                  >
                    {current.cta.label}
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Phone - Desktop */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden md:flex items-center gap-1.5 shrink-0 group/phone hover:scale-105 transition-transform"
            dir="ltr"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Phone className="w-3 h-3 text-[#1C1C1C]" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black text-white tracking-wider">
              {siteConfig.phone}
            </span>
          </a>
        </div>

        {/* Progress bar - shows time until next message */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-white/40 rounded-full transition-all duration-[4000ms] ease-linear"
          style={{
            width: "100%",
            animation: "progress 4s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        @keyframes progress {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}