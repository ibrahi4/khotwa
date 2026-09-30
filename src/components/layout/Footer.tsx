"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone, MessageCircle, MapPin, Clock, Mail, ChevronLeft,
  Share2, Send, ShieldCheck
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
        {title}
      </h3>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center gap-2 text-[14px] sm:text-[15px] text-slate-400 hover:text-emerald-400 transition-colors group"
            >
              <ChevronLeft className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const validAreas = (featuredAreas || []).filter((a) => a && a.slug && a.name);

  const servicesLinks = services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
  }));

  const areasLinks = validAreas.slice(0, 6).map((a) => ({
    label: `نقل أثاث ${a.name}`,
    href: `/areas/${a.slug}`,
  }));

  const quickLinks = [
    { label: "من نحن", href: "/about" },
    { label: "مقالات ونصائح", href: "/blog" },
    { label: "الأسئلة الشائعة", href: "/faq" },
    { label: "تواصل معنا", href: "/contact" },
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "الشروط والأحكام", href: "/terms" },
  ];

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      void navigator.share({ title: siteConfig.name, url: siteConfig.url });
    }
  };

  return (
    <footer className="bg-emerald-950 text-slate-300 no-print border-t border-emerald-900/50">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* ════════ BRAND COLUMN ════════ */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6 lg:pr-6">
            <Link
              href="/"
              className="group flex items-center gap-3 w-fit"
              aria-label={siteConfig.name}
            >
              <div className="relative w-14 h-14 bg-white rounded-xl overflow-hidden shadow-lg p-1">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name}
                  fill
                  className="object-contain p-1"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white tracking-tight">
                  {siteConfig.shortName}
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  لخدمات النقل الشامل
                </span>
              </div>
            </Link>

            <p className="text-sm md:text-[15px] text-slate-400 leading-relaxed max-w-sm">
              نقدم تجربة نقل أثاث فاخرة وخالية من المتاعب لسكان الكمبوندات والمدن الجديدة، بمعايير تغليف ونقل عالمية تضمن سلامة ممتلكاتك بنسبة 100%.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={() => trackPhoneCall("footer")}
                className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors group w-fit"
              >
                <div className="w-10 h-10 rounded-full border border-slate-700/50 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span dir="ltr" className="text-base font-medium tracking-wide">{siteConfig.phone}</span>
              </a>
              
              <div className="flex items-start gap-3 text-slate-400 max-w-xs">
                <div className="w-10 h-10 rounded-full border border-slate-700/50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm leading-relaxed mt-2">{siteConfig.address}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 rounded-full border border-slate-700/50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-sm">خدمة العملاء: 24 ساعة / 7 أيام</span>
              </div>
            </div>
          </div>

          {/* ════════ LINKS COLUMNS ════════ */}
          <div className="lg:col-span-3">
            <FooterLinkGroup title="خدماتنا" links={servicesLinks} />
          </div>
          
          <div className="lg:col-span-3">
            <FooterLinkGroup title="أهم المناطق" links={areasLinks} />
          </div>
          
          <div className="lg:col-span-2">
            <FooterLinkGroup title="روابط هامة" links={quickLinks} />
          </div>

        </div>

        {/* ════════ BOTTOM BAR & SOCIAL ════════ */}
        <div className="mt-16 pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 bg-emerald-900/30 border border-emerald-800/50 px-4 py-2 rounded-full">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-100">شركة موثوقة ومسجلة رسمياً</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp("footer")}
              className="w-10 h-10 rounded-full border border-slate-700/50 hover:border-emerald-400 hover:bg-emerald-400 hover:text-emerald-950 flex items-center justify-center transition-all"
              aria-label="واتساب"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            {siteConfig.email && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-10 h-10 rounded-full border border-slate-700/50 hover:border-emerald-400 hover:bg-emerald-400 hover:text-emerald-950 flex items-center justify-center transition-all"
                aria-label="راسلنا"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={handleShare}
              className="w-10 h-10 rounded-full border border-slate-700/50 hover:border-emerald-400 hover:bg-emerald-400 hover:text-emerald-950 flex items-center justify-center transition-all"
              aria-label="شارك الموقع"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ════════ COPYRIGHT ════════ */}
      <div className="bg-[#06241B] py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear}{" "}
            <span className="text-slate-300 font-semibold">{siteConfig.name}</span>.
            جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
