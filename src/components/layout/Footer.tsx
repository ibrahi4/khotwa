"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Clock, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { featuredAreas } from "@/config/areas";
import { Separator } from "@/components/ui/separator";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

export function Footer() {
  const validAreas = (featuredAreas || []).filter((a) => a && a.slug && a.name);

  return (
    <footer className="bg-[#1C1C1C] text-white mt-16 lg:mt-24">
      <div className="container-custom">

        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 shrink-0">
                  <Image
                    src="/logo.jpeg"
                    alt={siteConfig.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <div className="font-black text-xl tracking-tight">خطوة</div>
                  <div className="text-xs text-white/60">لنقل الأثاث</div>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                خدمات نقل أثاث احترافية تليق بسكان التجمع ومدينتي والشيخ زايد.
                فرق مدربة ومعدات حديثة لضمان أعلى مستوى من الجودة.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-2 h-2 bg-[#E85D04] rounded-full" />
                <span className="text-xs text-white/50">خبرة {siteConfig.yearsOfExperience} سنوات في خدمتكم</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">
                خدماتنا
              </h4>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowLeft className="w-3 h-3 text-[#E85D04] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">
                مناطق الخدمة
              </h4>
              <ul className="space-y-2.5">
                {validAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/areas/${area.slug}`}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowLeft className="w-3 h-3 text-[#E85D04] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      نقل أثاث {area.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/areas"
                    className="text-sm text-[#E85D04] hover:text-white transition-colors font-semibold flex items-center gap-1.5 pt-2"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    كل المناطق
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">
                تواصل معنا
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/60 leading-relaxed">
                    {siteConfig.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    dir="ltr"
                    onClick={() => trackPhoneCall("footer")}
                    className="text-sm text-white/60 hover:text-white transition-colors font-semibold"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsApp("footer")}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    تواصل عبر واتساب
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#E85D04] shrink-0" />
                  <span className="text-sm text-white/60">متاحون 24 ساعة / 7 أيام</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">{siteConfig.name}</span> - جميع الحقوق محفوظة
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              شروط الاستخدام
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/faq" className="hover:text-white transition-colors">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}