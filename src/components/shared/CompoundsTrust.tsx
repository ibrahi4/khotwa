"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { BadgeCheck } from "lucide-react";
import { compounds } from "@/config/compounds";

export function CompoundsTrust() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof AutoScroll> | null>(null);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  autoScrollRef.current = AutoScroll({
    speed: prefersReducedMotion ? 0.3 : 0.8,
    startDelay: 0,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
    playOnInit: true,
  });

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: "rtl",
      dragFree: true,
      containScroll: false,
      watchDrag: true,
    },
    mounted ? [autoScrollRef.current] : []
  );

  return (
    <section
      className="py-14 md:py-16 bg-white border-y border-slate-100"
      aria-labelledby="compounds-trust-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-4 py-1.5 mb-4">
            <BadgeCheck className="w-4 h-4 text-green-700" aria-hidden="true" />
            <span className="text-xs font-bold text-green-800 tracking-wide">
              شركاء موثوقون
            </span>
          </div>
          <h2
            id="compounds-trust-heading"
            className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight"
          >
            معتمدون لدى أكبر الكمبوندات
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            نقدم خدماتنا رسمياً داخل أكثر الكمبوندات فخامة في مصر
          </p>
        </div>
      </div>

      {/* Mobile: Auto-scroll carousel */}
      <div className="md:hidden">
        <div
          className="overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="شركاؤنا من الكمبوندات المعتمدة"
        >
          <ul className="flex gap-3 px-4">
            {compounds.map((c, i) => (
              <li
                key={c.nameEn}
                className="shrink-0 w-[140px]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} من ${compounds.length}`}
              >
                <article className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center h-full">
                  <div className="relative w-full aspect-square mb-2 flex items-center justify-center">
                    <Image
                      src={c.logo}
                      alt={`شعار كمبوند ${c.name}`}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full opacity-90"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                  <div className="text-center w-full">
                    <h3 className="font-bold text-slate-900 text-xs leading-tight truncate">
                      {c.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <BadgeCheck
                        className="w-3 h-3 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-[9px] text-slate-500 font-medium">
                        معتمد
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:block container-custom">
        <ul className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {compounds.map((c) => (
            <li key={c.nameEn}>
              <article className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="absolute top-2 left-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <BadgeCheck
                      className="w-3.5 h-3.5 text-green-700"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="relative aspect-square mb-3 flex items-center justify-center p-2">
                  <Image
                    src={c.logo}
                    alt={`شعار كمبوند ${c.name}`}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                    quality={90}
                  />
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5 leading-tight">
                    {c.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {c.area}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-custom">
        <div className="text-center mt-8">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-600" aria-hidden="true" />
            وأكثر من 15 كمبوند آخر في القاهرة والجيزة
          </p>
        </div>
      </div>
    </section>
  );
}