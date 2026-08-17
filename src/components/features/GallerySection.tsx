"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, ArrowLeft, X, ChevronRight, ChevronLeft,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  { src: "/images/gallery/photo_1_2026-08-16_14-31-37.jpg", alt: "عملية نقل أثاث احترافية من فريق خطوة" },
  { src: "/images/gallery/photo_2_2026-08-16_14-31-37.jpg", alt: "تغليف أثاث بمواد عالية الجودة" },
  { src: "/images/gallery/photo_3_2026-08-16_14-31-37.jpg", alt: "نقل أثاث بسيارات مجهزة" },
  { src: "/images/gallery/photo_4_2026-08-16_14-31-37.jpg", alt: "فك وتركيب الأثاث بدقة" },
  { src: "/images/gallery/photo_5_2026-08-16_14-31-37.jpg", alt: "فريق خطوة أثناء العمل" },
  { src: "/images/gallery/photo_6_2026-08-16_14-31-37.jpg", alt: "خدمة نقل احترافية في القاهرة" },
];

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") navigate(-1);
      if (e.key === "ArrowLeft") navigate(1);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const navigate = (dir: number) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <>
      <section
        className="section-padding bg-white"
        aria-labelledby="gallery-heading"
      >
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-4 py-1.5 mb-4">
              <Camera className="w-4 h-4 text-green-700" aria-hidden="true" />
              <span className="text-xs font-bold text-green-800 tracking-wide">
                من أعمالنا الحقيقية
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-3 leading-tight"
            >
              شوف شغلنا على أرض الواقع
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              صور حقيقية من عمليات نقل نفذها فريقنا خلال الأسابيع الماضية
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={`عرض الصورة ${i + 1}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <ZoomIn className="w-5 h-5 text-slate-900" aria-hidden="true" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 h-11 px-6 rounded-xl gap-2"
            >
              <Link href="/gallery">
                استكشف المعرض الكامل
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="عارض الصور"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-10 transition-colors"
              aria-label="إغلاق العرض"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white text-sm font-semibold tabular-nums">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors z-10"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                quality={95}
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 inset-x-4 md:inset-x-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl text-center">
              <p className="text-white/90 text-sm bg-white/10 backdrop-blur-md rounded-full px-4 py-2 inline-block">
                {galleryImages[lightboxIndex].alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}