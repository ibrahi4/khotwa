"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, MapPin, CheckCircle2, Clock } from "lucide-react";

interface Order {
  id: number;
  name: string;
  area: string;
  service: string;
  time: string;
  status: "in-progress" | "completed";
}

const namesPool = [
  "أحمد م.", "منى ع.", "خالد ح.", "سارة ش.", "محمد ع.",
  "نور ح.", "دينا ف.", "عمر ك.", "ياسمين ط.", "طارق ص.",
  "مريم ع.", "حسام ن.", "رانيا م.", "أشرف ب.",
];

const areasPool = [
  "التجمع الخامس", "مدينتي", "الشيخ زايد", "6 أكتوبر",
  "القاهرة الجديدة", "الرحاب", "بالم هيلز", "ميفيدا",
  "هايد بارك", "ماونتن فيو",
];

const servicesPool = [
  "نقل شقة كاملة", "فك وتركيب غرفة نوم", "تغليف احترافي",
  "نقل فيلا", "ونش رفع أثاث", "فك وتركيب مطبخ",
  "نقل مقتنيات ثمينة", "نقل مكتب",
];

const timesPool = [
  "منذ دقيقتين", "منذ 5 دقائق", "منذ 8 دقائق",
  "منذ 12 دقيقة", "منذ 15 دقيقة", "منذ 20 دقيقة",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrder(id: number): Order {
  return {
    id,
    name: randomFrom(namesPool),
    area: randomFrom(areasPool),
    service: randomFrom(servicesPool),
    time: randomFrom(timesPool),
    status: Math.random() > 0.5 ? "in-progress" : "completed",
  };
}

export function LiveOrdersFeed() {
  const [mounted, setMounted] = useState(false);
  const [activeCount, setActiveCount] = useState(6);
  const [orders, setOrders] = useState<Order[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setMounted(true);
    setOrders([
      generateOrder(1),
      generateOrder(2),
      generateOrder(3),
    ]);
    setCounter(3);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const orderInterval = setInterval(() => {
      setCounter((c) => c + 1);
      setOrders((prev) => {
        const next = generateOrder(counter + 4);
        return [next, ...prev.slice(0, 2)];
      });
    }, 8000);

    const countInterval = setInterval(() => {
      setActiveCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        if (next < 4) return 4;
        if (next > 9) return 9;
        return next;
      });
    }, 20000);

    return () => {
      clearInterval(orderInterval);
      clearInterval(countInterval);
    };
  }, [mounted, counter]);

  if (!mounted) {
    return <div className="h-72 bg-slate-50" aria-hidden="true" />;
  }

  return (
    <section
      className="py-16 md:py-20 bg-slate-50/60"
      aria-labelledby="live-orders-heading"
    >
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Description + Counter */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-green-200 px-4 py-1.5 mb-5 shadow-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
                </span>
                <span className="text-xs font-bold text-green-800 tracking-wide">
                  مباشر الآن
                </span>
              </div>

              <h2
                id="live-orders-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight"
              >
                عمليات جارية
                <span className="block text-green-700 mt-1">في اللحظة الحالية</span>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                فرقنا الميدانية تعمل الآن في مختلف مناطق القاهرة والجيزة. شاهد نبض الشركة بشكل مباشر
                واختبر مستوى الثقة التي يوليها لنا عملاؤنا يومياً.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-green-700" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      جارية
                    </span>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-slate-900 tabular-nums">
                    {activeCount}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">عملية نقل</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-700" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      اليوم
                    </span>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-slate-900 tabular-nums">
                    {12 + activeCount}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">عملية مكتملة</div>
                </div>
              </div>
            </div>

            {/* Right: Live Feed */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
              <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" aria-hidden="true" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" aria-hidden="true" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold mr-2">لوحة العمليات المباشرة</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                  <span>LIVE</span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {orders.map((order) => (
                    <motion.article
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: -20, backgroundColor: "#F0FDF4" }}
                      animate={{ opacity: 1, y: 0, backgroundColor: "#FFFFFF" }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="p-4 md:p-5 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            order.status === "completed"
                              ? "bg-green-100"
                              : "bg-amber-100"
                          }`}
                        >
                          {order.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-700" aria-hidden="true" />
                          ) : (
                            <Clock className="w-5 h-5 text-amber-700" aria-hidden="true" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 text-sm truncate">
                              {order.name}
                            </h3>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {order.status === "completed" ? "مكتمل" : "جاري"}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 mb-2 truncate">
                            {order.service}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1 min-w-0">
                              <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                              <span className="truncate">{order.area}</span>
                            </span>
                            <span className="text-slate-300" aria-hidden="true">·</span>
                            <span className="whitespace-nowrap">{order.time}</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              <div className="px-5 py-3 bg-slate-50 text-center border-t border-slate-100">
                <p className="text-[10px] text-slate-500">
                  يتم تحديث القائمة تلقائياً كل بضع ثواني
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}