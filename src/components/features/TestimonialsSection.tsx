"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Quote } from "lucide-react";
import { testimonials } from "@/config/testimonials";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
            آراء العملاء
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
          >
            ثقة تُبنى بالتجربة
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            أكثر من 500 عميل اختاروا خطوة لنقل أثاثهم بأمان واحترافية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-green-200 hover:shadow-md transition-all duration-300"
              itemScope
              itemType="https://schema.org/Review"
            >
              <Quote className="absolute top-5 left-5 w-8 h-8 text-green-100 group-hover:text-green-200 transition-colors" aria-hidden="true" />

              <div className="flex items-center gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={String(t.rating)} />
                <meta itemProp="bestRating" content="5" />
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p
                className="text-slate-700 text-sm leading-relaxed mb-6 min-h-[110px]"
                itemProp="reviewBody"
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${t.colorClass}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="font-bold text-green-950 text-sm truncate" itemProp="name">
                    {t.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    <span className="truncate">{t.area}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{t.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700">
                {t.service}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}