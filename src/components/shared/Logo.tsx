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
  sm: { pixels: 44, title: "text-base", subtitle: "text-[10px]", gap: "gap-2" },
  md: { pixels: 56, title: "text-xl", subtitle: "text-xs", gap: "gap-3" },
  lg: { pixels: 64, title: "text-2xl", subtitle: "text-sm", gap: "gap-3" },
  xl: { pixels: 80, title: "text-3xl", subtitle: "text-base", gap: "gap-4" },
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
        isWhite
          ? "ring-white/25 bg-white/5 shadow-black/20 group-hover:ring-white/40"
          : "ring-green-100 bg-white shadow-green-700/10 group-hover:ring-green-300 group-hover:shadow-green-700/20"
      )}
      style={{ width: s.pixels, height: s.pixels }}
    >
      <Image
        src="/logo.webp"
        alt={siteConfig.name}
        width={s.pixels}
        height={s.pixels}
        priority={priority}
        loading={priority ? "eager" : "eager"}
        quality={90}
        className="w-full h-full object-cover"
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