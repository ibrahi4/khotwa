"use client";

import { useState, useEffect } from "react";
import {
  Sparkles, Shield, Crown, Award, Zap, Phone,
  Star, TrendingUp, BadgeCheck, Timer, Flame, Truck,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const items = [
  { icon: Flame, text: "عرض حصري", highlight: "خصم 20% على أول طلب", accent: "hot" },
  { icon: Shield, text: "ضمان كامل", highlight: "على جميع مقتنياتك", accent: "normal" },
  { icon: Crown, text: "خدمة VIP", highlight: "لسكان الكمبوندات الراقية", accent: "gold" },
  { icon: Timer, text: "متاحون 24/7", highlight: "طوال أيام الأسبوع", accent: "normal" },
  { icon: BadgeCheck, text: "معاينة مجانية", highlight: "بدون أي التزام", accent: "green" },
  { icon: TrendingUp, text: "خبرة", highlight: "أكثر من 10 سنوات", accent: "normal" },
  { icon: Star, text: "تقييم", highlight: "4.9 من 5", accent: "gold" },
  { icon: Award, text: "فرق مدربة", highlight: "على أعلى مستوى", accent: "normal" },
  { icon: Zap, text: "استجابة سريعة", highlight: "خلال دقائق", accent: "hot" },
  { icon: Truck, text: "أسطول حديث", highlight: "سيارات مجهزة بالكامل", accent: "normal" },
];

const accentStyles = {
  hot: {
    icon: "text-[#E85D04]",
    text: "text-[#E85D04]",
    glow: "drop-shadow-[0_0_8px_rgba(232,93,4,0.6)]",
  },
  gold: {
    icon: "text-[#FFB800]",
    text: "text-[#FFB800]",
    glow: "drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]",
  },
  green: {
    icon: "text-[#10B981]",
    text: "text-[#10B981]",
    glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  },
  normal: {
    icon: "text-white/70",
    text: "text-white",
    glow: "",
  },
};

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-[#0F0F0F] via-[#1C1C1C] to-[#0F0F0F] text-white h-11 flex items-center justify-center overflow-hidden border-b border-[#E85D04]/20">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
          <span className="font-semibold">خطوة لنقل الأثاث - خدمة تليق بمنزلك</span>
        </div>
      </div>
    );
  }

  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden group">
      {/* ============ Multi-layer Background ============ */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#1C1C1C] to-[#0F0F0F]" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E85D04]/8 to-transparent bg-[length:200%_100%] animate-shimmer-slow" />

      {/* Top accent line - glowing */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E85D04] to-transparent opacity-80" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E85D04]/50 to-transparent" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: `20px 20px`,
        }}
      />

      <div className="relative flex items-center h-11">

        {/* ============ Left Fade ============ */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent z-10 pointer-events-none" />

        {/* ============ Right Fade ============ */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-52 bg-gradient-to-l from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent z-10 pointer-events-none" />

        {/* ============ Phone Badge - Desktop ============ */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center gap-2.5 bg-gradient-to-l from-[#E85D04] to-[#D14D00] hover:from-[#F97316] hover:to-[#E85D04] px-4 py-1.5 rounded-full shadow-lg shadow-[#E85D04]/40 hover:shadow-xl hover:shadow-[#E85D04]/60 hover:scale-105 active:scale-95 transition-all duration-300 group/phone"
          dir="ltr"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#E85D04] animate-ping opacity-30" />

          <div className="relative flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
              <Phone className="w-3 h-3 text-[#E85D04]" strokeWidth={3} />
            </div>
            <span className="font-black text-white text-xs tracking-wider">
              {siteConfig.phone}
            </span>
          </div>
        </a>

        {/* ============ Mobile Phone Icon ============ */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gradient-to-br from-[#E85D04] to-[#D14D00] rounded-full flex items-center justify-center shadow-lg shadow-[#E85D04]/40 active:scale-90 transition-transform"
          aria-label="اتصل الآن"
        >
          <span className="absolute inset-0 rounded-full bg-[#E85D04] animate-ping opacity-40" />
          <Phone className="relative w-4 h-4 text-white" strokeWidth={2.5} />
        </a>

        {/* ============ Marquee Track ============ */}
        <div className="flex animate-marquee-rtl whitespace-nowrap group-hover:[animation-play-state:paused] will-change-transform">
          {scrollItems.map((item, i) => {
            const Icon = item.icon;
            const style = accentStyles[item.accent as keyof typeof accentStyles];

            return (
              <div
                key={i}
                className="flex items-center gap-2.5 mx-5 md:mx-8 shrink-0"
              >
                {/* Icon with optional glow */}
                <div className={`shrink-0 ${style.glow}`}>
                  <Icon
                    className={`w-4 h-4 ${style.icon} transition-colors`}
                    strokeWidth={2.2}
                  />
                </div>

                {/* Text */}
                <div className="flex items-center gap-1.5 text-xs md:text-[13px]">
                  <span className="text-white/60 font-medium">
                    {item.text}
                  </span>
                  <span className={`font-black ${style.text} ${style.glow} transition-all`}>
                    {item.highlight}
                  </span>
                </div>

                {/* Separator - Diamond */}
                <div className="mr-4 md:mr-6 flex items-center">
                  <span className="w-1 h-1 bg-[#E85D04]/40 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(33.333%);
          }
        }

        @keyframes shimmer-slow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-marquee-rtl {
          animation: marquee-rtl 60s linear infinite;
        }

        .animate-shimmer-slow {
          animation: shimmer-slow 8s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee-rtl {
            animation-duration: 40s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-rtl,
          .animate-shimmer-slow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
