"use client";

import React from "react";
import { Star } from "lucide-react";
import { GOOGLE_BUSINESS_INFO } from "@/config/google-reviews";
import TestimonialsCarousel from "./TestimonialsCarousel";

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 mb-3">
              <Star className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
              <span className="text-xs font-bold text-emerald-900 tracking-wide">
                تقييمات خرائط جوجل الحقيقية
              </span>
            </div>
            <h2 id="testimonials-heading" className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
              ثقة نعتز بها من سكان <br />
              <span className="text-emerald-800">الكمبوندات والمدن الجديدة</span>
            </h2>
          </div>

          <a
            href={GOOGLE_BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white p-3.5 px-5 rounded-2xl border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-all shrink-0 self-start md:self-auto group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 group-hover:bg-emerald-50 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-lg font-black text-slate-900 tabular-nums">
                  {GOOGLE_BUSINESS_INFO.rating}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] font-bold text-slate-500 group-hover:text-emerald-700 transition-colors">
                عرض تقييمات Google Maps المباشرة ↗
              </p>
            </div>
          </a>
        </div>

        <TestimonialsCarousel />
      </div>
    </section>
  );
}

export default TestimonialsSection;
