"use client";

import { useState, useEffect } from "react";
import {
  Phone, ShieldCheck, Award, Gem, Crown, Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type Proposition = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  gradient: string;
};

const propositions: Proposition[] = [
  {
    icon: ShieldCheck,
    title: "تأمين شامل على مقتنياتك",
    subtitle: "بضمان مكتوب يغطي القيمة الفعلية",
    gradient: "from-[#E85D04] via-[#B8460A] to-[#8B2E00]",
  },
  {
    icon: Crown,
    title: "خدمة كونسيرج متكاملة",
    subtitle: "لسكان الكمبوندات الفاخرة والفلل",
    gradient: "from-[#8B4513] via-[#A0522D] to-[#E85D04]",
  },
  {
    icon: Gem,
    title: "تعامل بحرص المُقتني",
    subtitle: "خبراء في نقل التحف والأنتيك والمقتنيات النادرة",
    gradient: "from-[#D14D00] via-[#E85D04] to-[#FF7A1F]",
  },
  {
    icon: Award,
    title: "معايير النقل الدولية",
    subtitle: "بمواد تغليف مستوردة وتقنيات احترافية",
    gradient: "from-[#5D2E0C] via-[#8B4513] to-[#E85D04]",
  },
  {
    icon: Sparkles,
    title: "من المعاينة إلى التسليم",
    subtitle: "تجربة نقل استثنائية بأدق التفاصيل",
    gradient: "from-[#E85D04] via-[#FF7A1F] to-[#D14D00]",
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
      setCurrentIndex((prev) => (prev + 1) % propositions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-[#E85D04] via-[#D14D00] to-[#8B4513] text-white h-11 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2 text-xs">
          <Crown className="w-3.5 h-3.5" />
          <span className="font-bold tracking-wide">خطوة - خدمة نقل استثنائية</span>
        </div>
      </div>
    );
  }

  const prop = propositions[currentIndex];
  const Icon = prop.icon;

  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient background - changes with message */}
      <div
        key={`bg-${currentIndex}`}
        className={`absolute inset-0 bg-gradient-to-r ${prop.gradient} bg-[length:200%_200%] animate-gradient-flow transition-all duration-1000`}
      />

      {/* Warm overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      {/* Diagonal luxury pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(245,230,211,0.15) 12px, rgba(245,230,211,0.15) 13px)`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFF3E0] to-transparent" />

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      {/* Floating particles */}
      <div className="absolute top-2 left-[15%] pointer-events-none hidden md:block">
        <Sparkles className="w-3 h-3 text-white/50 animate-pulse" />
      </div>
      <div className="absolute bottom-2 right-[25%] pointer-events-none hidden md:block">
        <Sparkles className="w-2.5 h-2.5 text-white/40 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="absolute top-2 right-[45%] pointer-events-none hidden lg:block">
        <Sparkles className="w-2 h-2 text-white/30 animate-pulse" style={{ animationDelay: "2.5s" }} />
      </div>

      <div className="relative container-custom">
        <div className="flex items-center justify-between h-11 md:h-12 gap-4 md:gap-6">

          {/* ============ LEFT: Premium Brand Mark ============ */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin-slow" />
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Crown className="w-3 h-3 text-white drop-shadow-md" strokeWidth={2.5} />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[9px] font-black text-white tracking-[0.3em] uppercase drop-shadow-md">
                Premium
              </span>
              <span className="text-[8px] text-white/80 tracking-widest uppercase mt-0.5">
                Moving Service
              </span>
            </div>
          </div>

          {/* Elegant divider */}
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <span className="w-8 h-px bg-gradient-to-r from-white/50 to-transparent" />
          </div>

          {/* ============ CENTER: Value Proposition ============ */}
          <div className="flex-1 flex items-center justify-center min-w-0 overflow-hidden">
            <div
              key={currentIndex}
              className="flex items-center gap-3 animate-luxury-fade"
            >
              {/* Icon with luxury frame */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-pulse" />
                <div className="relative w-7 h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white drop-shadow-md" strokeWidth={2.5} />
                </div>
              </div>

              {/* Text */}
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-xs md:text-sm font-black text-white tracking-wide truncate drop-shadow-md">
                  {prop.title}
                </span>
                <span className="hidden md:inline-flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                  <span className="text-xs text-white/90 font-medium italic tracking-wide truncate">
                    {prop.subtitle}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Elegant divider */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            <span className="w-8 h-px bg-gradient-to-l from-white/50 to-transparent" />
            <span className="w-1 h-1 rounded-full bg-white/60" />
          </div>

          {/* ============ RIGHT: Luxury Direct Line ============ */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden md:flex items-center gap-3 shrink-0 group"
            dir="ltr"
            aria-label="خط الحجز المباشر"
          >
            <div className="flex flex-col items-end leading-none">
              <span className="text-[8px] font-black text-white tracking-[0.25em] uppercase drop-shadow-md">
                Direct Line
              </span>
              <span className="text-xs font-black text-white group-hover:text-[#FFF3E0] transition-colors tracking-wider mt-0.5 drop-shadow-md">
                {siteConfig.phone}
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="w-3 h-3 text-[#E85D04]" strokeWidth={2.5} />
              </div>
            </div>
          </a>

          {/* ============ MOBILE: Compact CTA ============ */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="md:hidden flex items-center gap-2 shrink-0"
            aria-label="اتصل بنا"
          >
            <span className="text-[9px] font-black text-white tracking-widest uppercase drop-shadow-md">
              Call
            </span>
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50" />
              <div className="relative w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Phone className="w-3.5 h-3.5 text-[#E85D04]" strokeWidth={2.5} />
              </div>
            </div>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-flow {
          animation: gradient-flow 6s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes luxury-fade {
          0% {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .animate-luxury-fade {
          animation: luxury-fade 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}