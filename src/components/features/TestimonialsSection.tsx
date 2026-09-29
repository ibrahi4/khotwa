"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, MapPin, Quote, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/config/testimonials";
import { TestimonialsJsonLd } from "@/components/features/Testimonialsjsonld";

export function TestimonialsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: "rtl",
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section
      className="py-16 md:py-24 bg-white overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <TestimonialsJsonLd />

      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-bold text-emerald-800 tracking-wider uppercase bg-emerald-100/60 px-3.5 py-1.5 rounded-full border border-emerald-200/50 inline-block mb-3">
            آراء العملاء
          </p>
          <h2
            id="testimonials-heading"
            className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight"
          >
            ثقة تُبنى بالتجربة
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            عملاء اختاروا خطوة لنقل أثاثهم بأمان واحترافية
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden -mx-2" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 px-2"
                >
                  <article className="h-full bg-[#FAF8F5] border border-stone-200/80 rounded-3xl p-6 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${t.colorClass}`}
                            aria-hidden="true"
                          >
                            {t.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-slate-900 text-sm truncate">
                                {t.name}
                              </h3>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{t.area}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-amber-900">{t.rating}.0</span>
                        </div>
                      </div>

                      <Quote className="w-6 h-6 text-emerald-200 mb-2" aria-hidden="true" />
                      <p className="text-slate-700 text-sm leading-relaxed line-clamp-5">
                        &ldquo;{t.text}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-slate-400">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                        {t.service}
                      </span>
                      <time>{t.date}</time>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50 shadow-lg items-center justify-center text-slate-700 hover:text-emerald-700 transition-all z-10"
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50 shadow-lg items-center justify-center text-slate-700 hover:text-emerald-700 transition-all z-10"
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex justify-center items-center gap-1.5 mt-6" role="tablist">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  selectedIndex === i ? "w-7 bg-emerald-700" : "w-1.5 bg-stone-300 hover:bg-stone-400"
                }`}
                role="tab"
                aria-selected={selectedIndex === i}
                aria-label={`تقييم ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
