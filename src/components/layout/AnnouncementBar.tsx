"use client";

import { useState, useEffect } from "react";
import { Phone, Flame, Gift, ArrowLeft, Sparkles, PartyPopper } from "lucide-react";
import { siteConfig } from "@/config/site";

// ============ Countdown Hook ============
function useCountdown(targetDate: Date) {
  const calculate = () => {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      ended: false,
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);

  // Countdown ends in 7 days from now (adjust as needed)
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
      <div className="bg-gradient-to-r from-[#8B2E00] via-[#E85D04] to-[#8B2E00] text-white h-12 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2 text-xs">
          <Gift className="w-4 h-4" />
          <span className="font-black tracking-wide">احتفالاً بمرور 10 سنوات - خصم 20% لفترة محدودة</span>
        </div>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative overflow-hidden">
      {/* Multi-layer animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5D1F00] via-[#E85D04] to-[#5D1F00] bg-[length:200%_200%] animate-gradient-flow" />

      {/* Diagonal shine pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)`,
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-gradient-radial from-[#FFA500]/20 via-transparent to-transparent" />
      </div>

      {/* Shine sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine-sweep" />
      </div>

      {/* Top glow border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFF3E0] to-transparent" />

      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-b from-black/40 to-transparent" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1 left-[10%] w-3 h-3 text-white/60 animate-pulse" />
        <Sparkles className="absolute bottom-1 right-[15%] w-2.5 h-2.5 text-white/50 animate-pulse" style={{ animationDelay: "0.7s" }} />
        <Sparkles className="absolute top-2 right-[40%] w-2 h-2 text-white/40 animate-pulse" style={{ animationDelay: "1.4s" }} />
        <Sparkles className="absolute bottom-1 left-[35%] w-2.5 h-2.5 text-white/50 animate-pulse hidden md:block" style={{ animationDelay: "2.1s" }} />
      </div>

      <div className="relative container-custom">
        <div className="flex items-center justify-between h-12 md:h-14 gap-2 md:gap-4">

          {/* ============ LEFT: Anniversary Badge ============ */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-md opacity-60 animate-pulse" />
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-[#FFD700]">
                <PartyPopper className="w-4 h-4 md:w-5 md:h-5 text-[#E85D04]" strokeWidth={2.5} />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[9px] font-black text-[#FFF3E0]/90 tracking-[0.25em] uppercase">
                Anniversary
              </span>
              <span className="text-sm md:text-base font-black text-white tracking-tight mt-0.5 drop-shadow-md">
                10 سنوات
              </span>
            </div>
          </div>

          {/* Elegant divider */}
          <div className="hidden md:block w-px h-8 bg-white/30 shrink-0" />

          {/* ============ CENTER: Offer Message ============ */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Fire icon animated */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-lg opacity-50 animate-pulse" />
                <Flame className="relative w-4 h-4 md:w-5 md:h-5 text-[#FFD700] drop-shadow-lg animate-fire" strokeWidth={2.5} />
              </div>

              <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap justify-center">
                <span className="text-xs md:text-sm font-bold text-white/95 tracking-wide">
                  عرض حصري
                </span>

                {/* Discount Badge - Eye-catching */}
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700] rounded-md blur-md opacity-60 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-[#FFF3E0] via-white to-[#FFD700] px-2 md:px-3 py-0.5 md:py-1 rounded-md shadow-lg">
                    <span className="text-sm md:text-lg font-black text-[#8B2E00] tracking-tight" style={{ fontFeatureSettings: "'tnum'" }}>
                      خصم 20%
                    </span>
                  </div>
                </div>

                <span className="text-xs md:text-sm font-bold text-white/95 tracking-wide hidden sm:inline">
                  احتفالاً بمرورنا 10 سنوات
                </span>
              </div>
            </div>
          </div>

          {/* Elegant divider */}
          <div className="hidden lg:block w-px h-8 bg-white/30 shrink-0" />

          {/* ============ COUNTDOWN TIMER ============ */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-black text-white/90 uppercase tracking-wider">
              ينتهي خلال:
            </span>
            <div className="flex items-center gap-1" dir="ltr">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="bg-[#1C1C1C] px-2 py-1 rounded-md shadow-inner min-w-[32px] text-center border border-white/20">
                  <span className="text-sm font-black text-white tabular-nums leading-none">
                    {pad(countdown.days)}
                  </span>
                </div>
                <span className="text-[7px] text-white/70 font-bold uppercase mt-0.5">Days</span>
              </div>

              <span className="text-white/60 font-black text-sm pb-3">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="bg-[#1C1C1C] px-2 py-1 rounded-md shadow-inner min-w-[32px] text-center border border-white/20">
                  <span className="text-sm font-black text-white tabular-nums leading-none">
                    {pad(countdown.hours)}
                  </span>
                </div>
                <span className="text-[7px] text-white/70 font-bold uppercase mt-0.5">Hrs</span>
              </div>

              <span className="text-white/60 font-black text-sm pb-3">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="bg-[#1C1C1C] px-2 py-1 rounded-md shadow-inner min-w-[32px] text-center border border-white/20">
                  <span className="text-sm font-black text-white tabular-nums leading-none">
                    {pad(countdown.minutes)}
                  </span>
                </div>
                <span className="text-[7px] text-white/70 font-bold uppercase mt-0.5">Min</span>
              </div>

              <span className="text-white/60 font-black text-sm pb-3">:</span>

              {/* Seconds - animated */}
              <div className="flex flex-col items-center">
                <div className="bg-[#FFD700] px-2 py-1 rounded-md shadow-inner min-w-[32px] text-center border border-white animate-pulse">
                  <span className="text-sm font-black text-[#8B2E00] tabular-nums leading-none">
                    {pad(countdown.seconds)}
                  </span>
                </div>
                <span className="text-[7px] text-[#FFD700] font-bold uppercase mt-0.5">Sec</span>
              </div>
            </div>
          </div>

          {/* Elegant divider */}
          <div className="hidden md:block w-px h-8 bg-white/30 shrink-0" />

          {/* ============ RIGHT: CTA Button ============ */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden md:flex items-center gap-2 shrink-0 bg-white hover:bg-[#FFF3E0] text-[#8B2E00] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-md shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
            dir="ltr"
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="text-xs tracking-wider">احجز الآن</span>
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          </a>

          {/* ============ MOBILE: Countdown Compact + CTA ============ */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            {/* Mobile timer - compact */}
            <div className="flex items-center gap-0.5 bg-[#1C1C1C]/80 px-1.5 py-1 rounded border border-white/20" dir="ltr">
              <span className="text-[10px] font-black text-white tabular-nums leading-none">
                {pad(countdown.days)}
              </span>
              <span className="text-[8px] text-white/60">d</span>
              <span className="text-white/40 text-[8px] mx-0.5">:</span>
              <span className="text-[10px] font-black text-white tabular-nums leading-none">
                {pad(countdown.hours)}
              </span>
              <span className="text-[8px] text-white/60">h</span>
              <span className="text-white/40 text-[8px] mx-0.5">:</span>
              <span className="text-[10px] font-black text-[#FFD700] tabular-nums leading-none animate-pulse">
                {pad(countdown.minutes)}
              </span>
              <span className="text-[8px] text-[#FFD700]">m</span>
            </div>

            {/* Mobile call button */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg active:scale-90 transition-transform"
              aria-label="اتصل بنا"
            >
              <Phone className="w-4 h-4 text-[#E85D04]" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-flow {
          animation: gradient-flow 8s ease-in-out infinite;
        }

        @keyframes shine-sweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine-sweep {
          animation: shine-sweep 4s ease-in-out infinite;
        }

        @keyframes fire {
          0%, 100% { transform: scale(1) rotate(-2deg); }
          50% { transform: scale(1.15) rotate(2deg); }
        }
        .animate-fire {
          animation: fire 1.5s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}