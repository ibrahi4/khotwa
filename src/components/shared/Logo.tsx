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
    image: "w-14 h-14",
    imagePx: 86,
    title: "text-sm",
    subtitle: "text-[10px]",
    gap: "gap-0",
  },
  md: {
    image: "w-14 h-14",
    imagePx: 84,
    title: "text-base",
    subtitle: "text-xs",
    gap: "gap-2.5",
  },
  lg: {
    image: "w-14 h-14",
    imagePx: 86,
    title: "text-lg",
    subtitle: "text-xs",
    gap: "gap-3",
  },
  xl: {
    image: "w-20 h-20",
    imagePx: 80,
    title: "text-2xl",
    subtitle: "text-sm",
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
        "relative rounded-xl overflow-hidden shrink-0 ring-1 transition-all duration-300",
        s.image,
        isWhite
          ? "ring-white/20 group-hover:ring-[#E8E3D9]"
          : "ring-[#E5E1DA] group-hover:ring-[#3F4F44]"
      )}
    >
      <Image
        src="/logo.webp"
        alt={siteConfig.name}
        fill
        className="object-cover"
        priority={priority}
        sizes={`${s.imagePx}px`}
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
          isWhite ? "text-white" : "text-slate-900"
        )}
      >
        خطوة
      </span>
      <span
        className={cn(
          "font-medium",
          s.subtitle,
          isWhite ? "text-white/60" : "text-[#6B6B6B]"
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
    <Link href={href} className="inline-flex shrink-0">
      {content}
    </Link>
  );
}