"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone, MessageCircle, MapPin, Clock, Mail, ChevronLeft,
  Share2, Send, Shield,
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
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-green-500 rounded-full" />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center gap-1.5 text-sm text-green-200/70 hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 -mr-2 group-hover:mr-0 transition-all" />
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

  const areasLinks = validAreas.map((a) => ({
    label: `نقل أثاث ${a.name}`,
    href: `/areas/${a.slug}`,
  }));

  const quickLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "المدونة", href: "/blog" },
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
    <footer className="bg-green-950 text-green-100 no-print relative overflow-hidden ">
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link
              href="/"
              className="group flex items-center gap-2.5"
              aria-label={siteConfig.name}
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-white/20 shadow-md">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-xl text-white">
                  {siteConfig.shortName}
                </span>
                <span className="text-[10px] font-semibold tracking-wide text-green-300">
                  لنقل الأثاث
                </span>
              </div>
            </Link>

            <p className="text-sm text-green-200/70 leading-relaxed max-w-xs">
              خدمات نقل أثاث احترافية تليق بسكان التجمع ومدينتي والشيخ زايد وكل المدن الجديدة.
            </p>

            <div className="space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={() => trackPhoneCall("footer")}
                className="flex items-center gap-2.5 text-green-200/80 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("footer")}
                className="flex items-center gap-2.5 text-green-200/80 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>واتساب</span>
              </a>
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-green-200/80 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span dir="ltr">{siteConfig.email}</span>
                </a>
              )}
              <div className="flex items-center gap-2.5 text-green-200/80">
                <div className="w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-green-200/80">
                <div className="w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span>24 ساعة / 7 أيام</span>
              </div>
            </div>
          </div>

          <FooterLinkGroup title="خدماتنا" links={servicesLinks} />
          <FooterLinkGroup title="مناطق الخدمة" links={areasLinks} />
          <FooterLinkGroup title="روابط سريعة" links={quickLinks} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-green-800/40">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-green-300">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">شركة موثوقة ومرخصة</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("footer")}
                className="w-9 h-9 bg-green-800/40 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="واتساب"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={() => trackPhoneCall("footer")}
                className="w-9 h-9 bg-green-800/40 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="اتصل بنا"
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-9 h-9 bg-green-800/40 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="راسلنا"
                >
                  <Send className="w-4 h-4 text-white" />
                </a>
              )}
              <button
                type="button"
                onClick={handleShare}
                className="w-9 h-9 bg-green-800/40 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="شارك"
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-green-800/40 relative">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-300/50">
          <p>
            &copy; {currentYear}{" "}
            <span className="text-white font-semibold">{siteConfig.name}</span>.
            جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}