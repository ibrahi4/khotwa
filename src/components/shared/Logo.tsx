"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "white" | "icon" | "stacked";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  href?: string | null;
  className?: string;
  showText?: boolean;
  priority?: boolean;
}

const sizeMap = {
  sm: {
    image: "w-11 h-11",
    imagePx: 44,
    title: "text-base",
    subtitle: "text-[10px]",
    gap: "gap-2",
  },
  md: {
    image: "w-14 h-14",
    imagePx: 56,
    title: "text-xl",
    subtitle: "text-xs",
    gap: "gap-3",
  },
  lg: {
    image: "w-16 h-16",
    imagePx: 64,
    title: "text-2xl",
    subtitle: "text-sm",
    gap: "gap-3",
  },
  xl: {
    image: "w-20 h-20",
    imagePx: 80,
    title: "text-3xl",
    subtitle: "text-base",
    gap: "gap-4",
  },
};

export function Logo({
  variant = "default",
  size = "md",
  href = "/",
  className,
  showText = true,
  priority = false,
}: LogoProps) {
  const s = sizeMap[size];
  const isWhite = variant === "white";
  const isIcon = variant === "icon";
  const isStacked = variant === "stacked";

  const LogoImage = (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden shrink-0 ring-2 shadow-md transition-all duration-300",
        s.image,
        isWhite
          ? "ring-white/25 bg-white/5 shadow-black/20 group-hover:ring-white/40"
          : "ring-green-100 bg-white shadow-green-700/10 group-hover:ring-green-300 group-hover:shadow-green-700/20"
      )}
    >
      <Image
        src="/logo.webp"
        alt={siteConfig.name}
        width={s.imagePx}
        height={s.imagePx}
        style={{ width: "100%", height: "100%" }}
        className="w-full h-full object-cover"
        priority={priority}
        sizes={`${s.imagePx}px`}
        quality={95}
      />
    </div>
  );

  const LogoText = showText && !isIcon && (
    <div
      className={cn(
        "flex leading-tight",
        isStacked ? "flex-col items-start" : "flex-col"
      )}
    >
      <span
        className={cn(
          "font-black tracking-tight",
          s.title,
          isWhite ? "text-white" : "text-green-950"
        )}
      >
        خطوة
      </span>
      <span
        className={cn(
          "font-bold tracking-wide",
          s.subtitle,
          isWhite ? "text-green-300" : "text-green-700"
        )}
      >
        لنقل الأثاث
      </span>
    </div>
  );

  const content = (
    <div className={cn("flex items-center group", s.gap, className)}>
      {LogoImage}
      {LogoText}
    </div>
  );

  if (href === null) {
    return content;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0"
      aria-label={siteConfig.name}
    >
      {content}
    </Link>
  );
}