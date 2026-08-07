"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { gallery } from "@/config/media";
import { Camera, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof gallery[0] | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: "rtl",
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <Badge variant="outline" className="border-[#E85D04] text-[#E85D04] bg-[#E85D04]/5 mb-4">
            <Camera className="w-3 h-3 ml-1.5" />
            معرض أعمالنا
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
            شغلنا الحقيقي
            <br />
            <span className="text-[#E85D04]">يتكلم عنا</span>
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            مشاهدات من مشاريع نقل الأثاث التي نفذناها بنجاح لعملائنا
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-2">
              {gallery.map((item, i) => {
                const hasError = imageErrors[item.id];

                return (
                  <div
                    key={item.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                  >
                    <div
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer bg-[#FAF5EE] border border-[#E5E1DA] hover:border-[#E85D04] hover:shadow-xl hover:shadow-[#E85D04]/20 transition-all duration-300"
                      onClick={() => !hasError && setSelectedImage(item)}
                    >
                      {!hasError ? (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={i < 3 ? "eager" : "lazy"}
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF5EE] to-[#E8E3D9] text-[#64748B]">
                          <ImageIcon className="w-16 h-16 mb-2 opacity-30" />
                          <span className="text-xs font-medium">{item.category}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/95 via-[#1C1C1C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 right-0 left-0 p-5">
                          <Badge className="bg-gradient-to-r from-[#E85D04] to-[#C94A00] text-white border-0 mb-2 text-[10px] font-bold shadow-lg shadow-[#E85D04]/40">
                            {item.category}
                          </Badge>
                          <p className="text-white text-sm font-bold leading-tight">
                            {item.alt}
                          </p>
                        </div>
                      </div>

                      <div className="absolute top-3 right-3 md:hidden">
                        <Badge className="bg-gradient-to-r from-[#E85D04] to-[#C94A00] text-white border-0 text-[10px] shadow-md shadow-[#E85D04]/30">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <button
              onClick={scrollPrev}
              className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 z-20 w-11 h-11 bg-white hover:bg-gradient-to-br hover:from-[#E85D04] hover:to-[#C94A00] text-[#1C1C1C] hover:text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[#E85D04]/40 flex items-center justify-center transition-all duration-200 border border-[#E5E1DA] hover:border-[#E85D04]"
              aria-label="السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 z-20 w-11 h-11 bg-white hover:bg-gradient-to-br hover:from-[#E85D04] hover:to-[#C94A00] text-[#1C1C1C] hover:text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[#E85D04]/40 flex items-center justify-center transition-all duration-200 border border-[#E5E1DA] hover:border-[#E85D04]"
              aria-label="التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={scrollPrev}
            className="w-11 h-11 bg-gradient-to-br from-[#E85D04] to-[#C94A00] hover:from-[#F97316] hover:to-[#E85D04] text-white rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[#E85D04]/30"
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-11 h-11 bg-gradient-to-br from-[#E85D04] to-[#C94A00] hover:from-[#F97316] hover:to-[#E85D04] text-white rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[#E85D04]/30"
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {mounted && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap max-w-md mx-auto">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === selectedIndex
                    ? "w-8 bg-gradient-to-r from-[#E85D04] to-[#C94A00] shadow-md shadow-[#E85D04]/40"
                    : "w-1.5 bg-[#E5E1DA] hover:bg-[#D4CCB8]"
                )}
                aria-label={`الانتقال للمجموعة ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-4 text-sm text-[#64748B]">
          <span className="font-bold text-[#E85D04]">{gallery.length}</span> صورة من مشاريعنا
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#1C1C1C] border-0">
          <DialogTitle className="sr-only">{selectedImage?.alt}</DialogTitle>
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/10 hover:bg-[#E85D04] text-white rounded-full flex items-center justify-center transition-colors backdrop-blur"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-[#1C1C1C] to-transparent p-6">
                <Badge className="bg-gradient-to-r from-[#E85D04] to-[#C94A00] text-white border-0 mb-2 shadow-lg shadow-[#E85D04]/40">
                  {selectedImage.category}
                </Badge>
                <p className="text-white font-bold">{selectedImage.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}