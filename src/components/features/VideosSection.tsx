"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { videos } from "@/config/media";
import { Play, Video, X, Film } from "lucide-react";

export function VideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="section-padding bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-[#1C1C1C] text-white relative overflow-hidden">
      {/* Decorative Orange & Gold glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E85D04] to-transparent" />

      <div className="relative container-custom">

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <Badge className="bg-[#E85D04]/10 text-[#E85D04] border border-[#E85D04]/30 mb-4 px-4 py-1.5 backdrop-blur">
            <Video className="w-3 h-3 ml-1.5" />
            شاهد بنفسك
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
            من داخل
            <br />
            <span className="text-[#E85D04] drop-shadow-[0_0_20px_rgba(232,93,4,0.4)]">
              مشاريعنا الحقيقية
            </span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed">
            شاهد كيف نتعامل مع مقتنياتك باحترافية من البداية للنهاية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {videos.map((video) => {
            const hasError = imageErrors[video.id];

            return (
              <div
                key={video.id}
                className="group relative aspect-video overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C] border border-white/10 hover:border-[#E85D04]/60 hover:shadow-2xl hover:shadow-[#E85D04]/30 transition-all duration-300"
                onClick={() => setSelectedVideo(video)}
              >
                {!hasError ? (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={() => handleImageError(video.id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E85D04]/20 to-[#1C1C1C]">
                    <Film className="w-20 h-20 text-white/10" />
                  </div>
                )}

                {/* Play Button with pulse ring */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-[#E85D04] animate-ping opacity-40" />
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#E85D04] to-[#C94A00] group-hover:from-[#F97316] group-hover:to-[#E85D04] rounded-full flex items-center justify-center shadow-2xl shadow-[#E85D04]/50 group-hover:scale-110 transition-all duration-300 border-2 border-white/20">
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white mr-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/70 to-transparent p-5 z-10">
                  <h3 className="font-bold text-white text-base mb-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-[#1C1C1C] border-0">
          <DialogTitle className="sr-only">{selectedVideo?.title}</DialogTitle>
          {selectedVideo && (
            <div className="relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/10 hover:bg-[#E85D04] text-white rounded-full flex items-center justify-center transition-colors backdrop-blur"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                className="w-full aspect-video"
              >
                متصفحك لا يدعم تشغيل الفيديو
              </video>
              <div className="bg-[#1C1C1C] p-5 md:p-6 border-t border-[#E85D04]/20">
                <h3 className="text-white font-bold text-lg mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-white/60 text-sm">{selectedVideo.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}