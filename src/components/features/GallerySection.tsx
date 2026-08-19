"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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
  { src: "/images/gallery/tarkeeb.webp", alt: "فك وتركيب الأثاث بدقة" },
  { src: "/images/gallery/photo_5_2026-08-16_14-31-37.jpg", alt: "فريق خطوة أثناء العمل" },
  { src: "/images/gallery/photo_6_2026-08-16_14-31-37.jpg", alt: "خدمة نقل احترافية في القاهرة" },
  { src: "/images/gallery/photo_7_2026-08-16_14-31-37.jpg", alt: "نقل أثاث من الكمبوندات الراقية" },
  { src: "/images/gallery/photo_8_2026-08-16_14-31-38.jpg", alt: "خبرة في التعامل مع كل أنواع الأثاث" },
  { src: "/images/gallery/photo_9_2026-08-16_14-31-38.jpg", alt: "التزام كامل بالمواعيد والجودة" },
];

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: "rtl",
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Lightbox keyboard
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") navigateLightbox(-1);
      if (e.key === "ArrowLeft") navigateLightbox(1);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  const navigateLightbox = (dir: number) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  };

  if (!mounted) {
    return <div className="h-[500px] bg-white" aria-hidden="true" />;
  }

  return (
    <>
      <section
        className="section-padding bg-white overflow-hidden"
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

          {/* Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden -mx-2" ref={emblaRef}>
              <div className="flex">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      aria-label={`عرض الصورة ${i + 1}: ${img.alt}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading={i < 4 ? "eager" : "lazy"}
                        quality={80}
                      />

                      {/* Gradient overlay always visible for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                      {/* Zoom icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                          <ZoomIn className="w-5 h-5 text-slate-900" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Index badge */}
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-black text-slate-900 tabular-nums shadow-md">
                          0{i + 1} / 0{galleryImages.length}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev button */}
            <button
              type="button"
              onClick={scrollPrev}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 shadow-lg items-center justify-center text-slate-700 hover:text-green-700 transition-all z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={scrollNext}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 shadow-lg items-center justify-center text-slate-700 hover:text-green-700 transition-all z-10"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-6" role="tablist">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    selectedIndex === i
                      ? "w-8 bg-green-700"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  role="tab"
                  aria-selected={selectedIndex === i}
                  aria-label={`الانتقال إلى الصورة ${i + 1}`}
                />
              ))}
            </div>
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
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-10 transition-colors"
              aria-label="إغلاق العرض"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white text-sm font-semibold tabular-nums">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors z-10"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

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