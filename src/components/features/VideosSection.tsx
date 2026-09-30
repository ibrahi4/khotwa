"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Video } from "lucide-react";

const videos = [
  {
    id: "main",
    src: "/videos/IMG_6017.MP4",
    poster: "/images/services/bg-naql-athath.webp",
    title: "نقلة كاملة من الألف للياء",
    desc: "شاهد كيف ننفذ عملية النقل باحترافية من التغليف حتى التسليم",
    featured: true,
  },
  {
    id: "packing",
    src: "/videos/taghleef-e7terafi.mp4",
    poster: "/images/services/bg-taghleef.webp",
    title: "تغليف احترافي يحمي أثاثك",
    desc: "مواد تغليف عالية الجودة وطريقة عمل دقيقة ضد الخدوش والكسر",
    featured: false,
  },
  {
    id: "team",
    src: "/videos/IMG_5892.MP4",
    poster: "/images/gallery/fareq-3amal.webp",
    title: "فريق عمل منظم في الموقع",
    desc: "تنسيق عالي وسرعة في التنفيذ مع الحفاظ على سلامة المنقولات",
    featured: false,
  },
];

function VideoCard({
  video,
  large = false,
}: {
  video: (typeof videos)[number];
  large?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div
      onClick={togglePlay}
      className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-stone-200/20 shadow-md cursor-pointer ${
        large ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[9/14] sm:aspect-[4/5]"
      }`}
    >
      {/* Video Element */}
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={muted}
        loop
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Poster Image Overlay (Appears when not playing for 100% reliability on Mobile) */}
      {!playing && (
        <div className="absolute inset-0 z-0">
          <Image
            src={video.poster}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
          />
          {/* Subtle Dark Gradient for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20" />
        </div>
      )}

      {/* Play Button Center */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Glowing Ring Effect */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/30 animate-ping" />
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 mr-[-2px]" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Text Controls */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold text-white leading-snug ${large ? "text-base sm:text-xl" : "text-sm sm:text-base"}`}>
              {video.title}
            </h3>
            <p className={`text-emerald-100/80 mt-1 line-clamp-2 ${large ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"}`}>
              {video.desc}
            </p>
          </div>

          {playing && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="إيقاف"
              >
                <Pause className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VideosSection() {
  const main = videos.find((v) => v.featured)!;
  const rest = videos.filter((v) => !v.featured);

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]" aria-labelledby="videos-heading">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/60 border border-emerald-200/50 px-3.5 py-1.5 mb-3">
            <Video className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span className="text-xs font-bold text-emerald-800 tracking-wide">معرض الفيديوهات</span>
          </div>
          <h2 id="videos-heading" className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
            شاهد جودة عملنا الميداني
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            لقطات حقيقية تُظهر احترافية فريق خطوة أثناء عمليات النقل والتغليف
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Main Featured Video */}
          <div className="lg:col-span-7">
            <VideoCard video={main} large />
          </div>

          {/* Side Videos */}
          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5">
            {rest.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
