"use client";

import { useState, useEffect } from "react";
import { Phone, Gift, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

function useCountdown(targetDate: Date) {
  const calculate = () => {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, ended: true };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      ended: false,
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => setTime(calculate()), 60000); // Update every minute (not every second)
    return () => clearInterval(timer);
  }, []);

  return time;
}

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);

  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    date.setHours(23, 59, 59, 999);
    return date;
  });

  const countdown = useCountdown(targetDate);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-[#8B2E00] via-[#E85D04] to-[#8B2E00] text-white h-11 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs">
          <Gift className="w-4 h-4" />
          <span className="font-bold">خصم 20% احتفالاً بمرور 10 سنوات</span>
        </div>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative bg-gradient-to-r from-[#8B2E00] via-[#E85D04] to-[#8B2E00] overflow-hidden">
      <div className="relative container-custom">
        <div className="flex items-center justify-between h-11 md:h-12 gap-2 md:gap-4">

          {/* Left: Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <Gift className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#E85D04]" strokeWidth={2.5} />
            </div>
            <span className="hidden sm:inline text-xs md:text-sm font-black text-white">
              10 سنوات
            </span>
          </div>

          {/* Center: Message */}
          <div className="flex-1 flex items-center justify-center min-w-0 px-2">
            <div className="flex items-center gap-2 text-white text-xs md:text-sm">
              <span className="hidden sm:inline font-semibold">عرض:</span>
              <div className="bg-white text-[#8B2E00] px-2 py-0.5 rounded font-black text-xs md:text-sm">
                خصم 20%
              </div>
              <span className="hidden md:inline font-semibold">لفترة محدودة</span>
            </div>
          </div>

          {/* Right: Timer + CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Timer (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 text-white text-xs" dir="ltr">
              <span className="font-black">{pad(countdown.days)}d</span>
              <span className="opacity-60">:</span>
              <span className="font-black">{pad(countdown.hours)}h</span>
              <span className="opacity-60">:</span>
              <span className="font-black">{pad(countdown.minutes)}m</span>
            </div>

            {/* CTA (Desktop) */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden md:flex items-center gap-1.5 bg-white hover:bg-[#FFF3E0] text-[#8B2E00] font-black px-3 py-1 rounded-md shadow text-xs transition-colors"
              dir="ltr"
            >
              <Phone className="w-3 h-3" strokeWidth={2.5} />
              <span>احجز</span>
              <ArrowLeft className="w-3 h-3" />
            </a>

            {/* Mobile CTA */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="md:hidden flex items-center justify-center w-7 h-7 bg-white rounded-full shadow"
              aria-label="اتصل بنا"
            >
              <Phone className="w-3.5 h-3.5 text-[#E85D04]" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
