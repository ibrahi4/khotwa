"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Clock3,
  Gem,
  MapPin,
  Truck,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type FeedItem = {
  id: number;
  area: string;
  service: string;
  time: string;
  icon: LucideIcon;
  color: string;
};

const feedData: FeedItem[] = [
  { id: 1, area: "التجمع الخامس", service: "نقل أثاث — شقة 3 غرف", time: "منذ 4 دقائق", icon: Truck, color: "bg-emerald-100 text-emerald-700" },
  { id: 2, area: "مدينتي", service: "تغليف احترافي — فيلا كاملة", time: "منذ 7 دقائق", icon: Box, color: "bg-violet-100 text-violet-700" },
  { id: 3, area: "الرحاب", service: "فك وتركيب — غرفة نوم + مطبخ", time: "منذ 11 دقيقة", icon: Wrench, color: "bg-blue-100 text-blue-700" },
  { id: 4, area: "الشروق", service: "تكييفات — 3 وحدات", time: "منذ 14 دقيقة", icon: Wind, color: "bg-cyan-100 text-cyan-700" },
  { id: 5, area: "العاصمة الإدارية", service: "نقل مقتنيات حساسة", time: "منذ 18 دقيقة", icon: Gem, color: "bg-amber-100 text-amber-700" },
  { id: 6, area: "الشيخ زايد", service: "نقل أثاث — فيلا دوبلكس", time: "منذ 22 دقيقة", icon: Truck, color: "bg-emerald-100 text-emerald-700" },
  { id: 7, area: "المهندسين", service: "فك وتركيب — مكتب إداري", time: "منذ 26 دقيقة", icon: Wrench, color: "bg-blue-100 text-blue-700" },
  { id: 8, area: "مدينة نصر", service: "تغليف زجاج وتحف", time: "منذ 31 دقيقة", icon: Box, color: "bg-violet-100 text-violet-700" },
];

export function LiveOrdersFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((p) => (p + 1) % feedData.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const visible = useMemo(
    () => Array.from({ length: 3 }, (_, i) => feedData[(index + i) % feedData.length]),
    [index]
  );

  return (
    <section className="py-12 md:py-16 bg-slate-50/60" aria-label="نشاط الخدمة">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <h2 className="text-base font-bold text-slate-800">
            نشاط الخدمة الآن
          </h2>
        </div>

        {/* Feed */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {item.service}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.area}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3 w-3" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}