"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Video } from "lucide-react";

const videos = [
  {
    id: "main",
    src: "/videos/IMG_6017.MP4",
    title: "نقلة كاملة من الألف للياء",
    desc: "شاهد كيف ننفذ عملية النقل باحترافية من التغليف حتى التسليم",
    featured: true,
  },
  {
    id: "packing",
    src: "/videos/taghleef-e7terafi.mp4",
    title: "تغليف احترافي يحمي أثاثك",
    desc: "مواد تغليف عالية الجودة وطريقة عمل دقيقة ضد الخدوش والكسر",
    featured: false,
  },
  {
    id: "team",
    src: "/videos/IMG_5892.MP4",
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
      el.play();
      setPlaying(true);
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
      className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-stone-200/20 shadow-lg ${
        large ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[9/16] sm:aspect-[4/5]"
      }`}
    >
      <video
        ref={ref}
        src={video.src}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={muted}
        loop
        preload="metadata"
        onClick={togglePlay}
        onEnded={() => setPlaying(false)}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent pointer-events-none" />

      {/* Play button center */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10"
          aria-label={`تشغيل: ${video.title}`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-800 fill-emerald-800 mr-[-2px]" />
          </div>
        </button>
      )}

      {/* Bottom controls + title */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold text-white leading-snug ${large ? "text-base sm:text-xl" : "text-sm sm:text-base"}`}>
              {video.title}
            </h3>
            <p className={`text-emerald-100/80 mt-1 line-clamp-2 ${large ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"}`}>
              {video.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {playing && (
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                aria-label="إيقاف"
              >
                <Pause className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
              aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
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
            <span className="text-xs font-bold text-emerald-800 tracking-wide">فيديوهات من أرض الواقع</span>
          </div>
          <h2 id="videos-heading" className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
            شوف الجودة بنفسك
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            لقطات حقيقية من عمليات النقل والتغليف التي نفذها فريق خطوة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Main featured video */}
          <div className="lg:col-span-7">
            <VideoCard video={main} large />
          </div>

          {/* Side videos */}
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
