"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { AnnouncementBar } from "./AnnouncementBar";
import { QuoteDialog } from "@/components/shared/QuoteDialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { trackPhoneCall, trackWhatsApp, trackQuoteRequest } from "@/lib/analytics/events";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const BrandLogo = ({ isMobile = false }: { isMobile?: boolean }) => (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0 group"
      aria-label={siteConfig.name}
    >
      <div
        className={cn(
          "relative rounded-full overflow-hidden shrink-0 ring-2 ring-[#E5E7EB] group-hover:ring-[#E85D04] transition-all duration-300",
          isMobile ? "w-10 h-10" : "w-12 h-12"
        )}
      >
        <Image
          src="/logo.jpeg"
          alt={siteConfig.name}
          fill
          className="object-cover"
          priority
          sizes={isMobile ? "40px" : "48px"}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-black tracking-tight text-[#1C1C1C]",
            isMobile ? "text-base" : "text-lg"
          )}
        >
          خطوة
        </span>
        <span
          className={cn(
            "font-medium text-[#64748B] mt-0.5",
            isMobile ? "text-[10px]" : "text-[11px]"
          )}
        >
          لنقل الأثاث
        </span>
      </div>
    </Link>
  );

  return (
    <>
      <AnnouncementBar />

      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-all duration-300",
          mounted && scrolled
            ? "shadow-sm border-b border-[#E5E7EB]"
            : "border-b border-[#E5E7EB]"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            <div className="hidden lg:block">
              <BrandLogo />
            </div>
            <div className="lg:hidden">
              <BrandLogo isMobile />
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                      active
                        ? "text-[#1C1C1C]"
                        : "text-[#64748B] hover:text-[#1C1C1C]"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#E85D04] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                className="border-[#E5E7EB] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white hover:border-[#1C1C1C] bg-white h-10 px-4 text-sm font-semibold transition-all duration-200"
              >
                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={() => trackPhoneCall("header_desktop")}
                >
                  <Phone className="w-3.5 h-3.5 ml-1.5" />
                  اتصل الآن
                </a>
              </Button>

              <QuoteDialog
                source="header_desktop"
                trigger={
                  <span
                    role="button"
                    tabIndex={0}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#E85D04] hover:bg-[#D14D00] text-white h-10 px-5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer select-none shadow-sm"
                  >
                    طلب عرض سعر
                  </span>
                }
              />
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <Button
                asChild
                size="icon"
                className="bg-[#E85D04] hover:bg-[#D14D00] text-white h-9 w-9 rounded-lg"
              >
                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={() => trackPhoneCall("header_mobile")}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </Button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-[#1C1C1C] hover:bg-[#F5F5F5] transition-colors">
                  <Menu className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] sm:w-[320px] p-0 border-l border-[#E5E7EB] flex flex-col"
                >
                  <SheetTitle className="sr-only">القائمة الرئيسية</SheetTitle>

                  <div className="bg-[#1C1C1C] text-white p-5 shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20 shrink-0">
                        <Image
                          src="/logo.jpeg"
                          alt={siteConfig.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div className="leading-none">
                        <div className="font-black text-base tracking-tight">خطوة</div>
                        <div className="text-[11px] text-white/60 mt-0.5">لنقل الأثاث</div>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      خدمة نقل أثاث احترافية في التجمع ومدينتي والشيخ زايد
                    </p>
                  </div>

                  <nav className="p-3 flex flex-col gap-0.5 bg-white flex-1 overflow-y-auto">
                    {mainNav.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200",
                            active
                              ? "bg-[#FAF5EE] text-[#1C1C1C] border-r-2 border-[#E85D04]"
                              : "text-[#64748B] hover:bg-[#F5F5F5] hover:text-[#1C1C1C]"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="p-3 border-t border-[#E5E7EB] bg-white space-y-2 shrink-0">
                    <Button
                      asChild
                      className="w-full bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white h-11 text-sm"
                    >
                      <a
                        href={`tel:${siteConfig.phone}`}
                        onClick={() => trackPhoneCall("header_mobile")}
                      >
                        <Phone className="w-4 h-4 ml-2" />
                        اتصل الآن
                      </a>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-[#E85D04] hover:bg-[#D14D00] text-white h-11 text-sm"
                    >
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsApp("header_mobile")}
                      >
                        <MessageCircle className="w-4 h-4 ml-2" />
                        واتساب
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}