"use client";

import { useState, useEffect } from "react";
import {
  Sparkles, Truck, Shield, Crown, Award, Zap, Phone,
  Star, TrendingUp, BadgeCheck, Timer, Flame,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const items = [
  { icon: Flame, text: "عرض حصري", highlight: "خصم 20% على أول طلب", accent: "hot" },
  { icon: Truck, text: "شحن مجاني", highlight: "داخل التجمع ومدينتي والشيخ زايد", accent: "normal" },
  { icon: Shield, text: "ضمان كامل", highlight: "على جميع مقتنياتك", accent: "normal" },
  { icon: Crown, text: "خدمة VIP", highlight: "لسكان الكمبوندات الراقية", accent: "normal" },
  { icon: Timer, text: "متاحون 24/7", highlight: "طوال أيام الأسبوع", accent: "normal" },
  { icon: BadgeCheck, text: "معاينة مجانية", highlight: "بدون أي التزام", accent: "normal" },
  { icon: TrendingUp, text: "خبرة", highlight: "أكثر من 10 سنوات", accent: "normal" },
  { icon: Star, text: "تقييم", highlight: "4.9 من 5", accent: "normal" },
  { icon: Award, text: "فرق مدربة", highlight: "على أعلى مستوى", accent: "normal" },
  { icon: Zap, text: "استجابة سريعة", highlight: "خلال دقائق", accent: "hot" },
];

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#1C1C1C] text-white h-10 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
          <span>خطوة لنقل الأثاث - خدمة تليق بمنزلك</span>
        </div>
      </div>
    );
  }

  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="relative bg-[#1C1C1C] text-white overflow-hidden group border-b border-white/5">

      <div className="relative flex items-center h-10">

        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#1C1C1C] to-transparent z-10 pointer-events-none" />

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#1C1C1C] to-transparent z-10 pointer-events-none" />

        {/* Phone - Desktop pinned right */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center gap-2 bg-[#1C1C1C] pl-6 pr-2 py-1 group/phone transition-all duration-300"
          dir="ltr"
        >
          <div className="flex items-center gap-2 text-xs">
            <Phone className="w-3.5 h-3.5 text-[#E85D04]" strokeWidth={2.5} />
            <span className="font-bold text-white group-hover/phone:text-[#E85D04] transition-colors tracking-wider">
              {siteConfig.phone}
            </span>
          </div>
        </a>

        {/* Marquee track */}
        <div className="flex animate-marquee-rtl whitespace-nowrap group-hover:[animation-play-state:paused]">
          {scrollItems.map((item, i) => {
            const Icon = item.icon;
            const isHot = item.accent === "hot";

            return (
              <div
                key={i}
                className="flex items-center gap-2 mx-6 md:mx-10 shrink-0"
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isHot ? "text-[#E85D04]" : "text-white/60"
                  }`}
                  strokeWidth={2}
                />

                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                  <span className="text-white/70 font-medium">{item.text}</span>
                  <span
                    className={`font-bold ${
                      isHot ? "text-[#E85D04]" : "text-white"
                    }`}
                  >
                    {item.highlight}
                  </span>
                </div>

                <span className="text-white/20 text-xs mr-4 md:mr-6">|</span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(33.333%); }
        }

        .animate-marquee-rtl {
          animation: marquee-rtl 70s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee-rtl {
            animation-duration: 50s;
          }
        }
      `}</style>
    </div>
  );
}