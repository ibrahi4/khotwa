"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shield, Star, Clock, Award, PackageCheck, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * رسالة التقييم بتظهر بس لما عدد التقييمات الحقيقية على Google Business Profile
 * (اللي بيتحدّث يدوي في siteConfig.ratings) يوصل لعدد يستاهل يتقال. لحد ما
 * توصل للرقم ده، الرسالة مش بتظهر خالص بدل ما تعرض "4.5 من 8 تقييمات"
 * وتضعف الثقة بدل ما تبنيها، أو ترجع لرقم مصطنع تاني.
 * (الرقم 25 قرار مبدئي مني، عدّله زي ما تشوف.)
 */
const MIN_REVIEWS_TO_SHOW_RATING = 25;

type Message = { icon: React.ElementType; text: string };

function buildMessages(): Message[] {
  const messages: Message[] = [
    {
      icon: Shield,
      text: "ضمان شامل على جميع مقتنياتك أثناء النقل",
    },
    {
      icon: Clock,
      text: "خدمة متاحة على مدار الساعة - 24 ساعة / 7 أيام",
    },
    {
      icon: PackageCheck,
      text: "تغليف احترافي بمواد عالمية لحماية كاملة",
    },
    {
      icon: Award,
      // كان "أكثر من 10 سنوات" ثابتة. دلوقتي بتتحسب من سنة التأسيس في site.ts.
      text: `خبرة أكثر من ${siteConfig.yearsOfExperience} سنة في نقل الأثاث`,
    },
    {
      icon: Sparkles,
      text: "معاينة مجانية وعرض سعر شفاف بدون أي التزام",
    },
  ];

  if (siteConfig.ratings.count >= MIN_REVIEWS_TO_SHOW_RATING) {
    messages.splice(1, 0, {
      icon: Star,
      text: `تقييم ${siteConfig.ratings.value} من 5 على Google - ${siteConfig.ratings.count} تقييم`,
    });
  }

  return messages;
}

const messages = buildMessages();
const ROTATION_MS = 4500;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  // شلت الـ mounted gate: أول رسالة والرقم بيتحطوا في HTML من السيرفر
  // بدل ما يظهر شريط فاضي لحد ما الجافاسكريبت يشتغل. التدوير نفسه
  // (setInterval) لسه بيبدأ بعد التحميل زي الأول.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, ROTATION_MS);
    return () => clearInterval(timer);
  }, []);

  const current = messages[index];
  const Icon = current.icon;

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-l from-green-950 via-green-900 to-green-950 border-b border-green-800/40"
      role="banner"
      aria-label="شريط الإعلانات"
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 h-10">
          {/* Rotating Messages */}
          <div className="flex-1 min-w-0 overflow-hidden">
            {/* initial={false}: أول رسالة تتعرض فوراً من غير أنيميشن دخول،
                عشان تفضل ظاهرة في الـ HTML اللي جاي من السيرفر. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2.5"
              >
                <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-green-400" aria-hidden="true" />
                </div>
                <p className="text-xs md:text-sm text-white/90 font-medium truncate">
                  {current.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone Number (always visible) */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="shrink-0 flex items-center gap-2 text-white hover:text-green-300 transition-colors group"
            dir="ltr"
            aria-label={`اتصل بنا على ${siteConfig.phone}`}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping opacity-60" aria-hidden="true" />
              <div className="relative w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" aria-hidden="true" />
              </div>
            </div>
            <span className="hidden sm:inline text-xs md:text-sm font-bold tabular-nums">
              {siteConfig.phone}
            </span>
          </a>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-green-800/30" aria-hidden="true">
        <motion.div
          key={index}
          className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: ROTATION_MS / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}