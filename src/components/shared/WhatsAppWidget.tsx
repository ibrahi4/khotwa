"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X, Send, Phone, Truck, Wrench, Wind, Box,
  ArrowUpToLine, Sparkles, CheckCheck, Clock,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type WhatsAppWidgetProps = {
  open: boolean;
  onClose: () => void;
};

// Official WhatsApp Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.003 0C7.163 0 .003 7.16.003 16c0 2.813.734 5.573 2.13 8.005L0 32l8.223-2.148A15.977 15.977 0 0 0 16.003 32C24.843 32 32 24.84 32 16S24.843 0 16.003 0zm7.32 19.356c-.4-.2-2.367-1.167-2.733-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.687-.62-3.213-1.98-1.187-1.06-1.987-2.367-2.22-2.767-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.657-.673-.9-.687-.233-.013-.5-.013-.767-.013s-.7.1-1.067.5c-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.04.955.412 1.7.658 2.28.842.958.305 1.83.262 2.52.159.768-.115 2.367-.968 2.7-1.903.333-.935.333-1.735.233-1.903-.1-.167-.367-.267-.767-.467z" />
    </svg>
  );
}

const quickMessages = [
  {
    icon: Sparkles,
    label: "طلب عرض سعر مجاني",
    message: "مرحباً، أريد الحصول على عرض سعر مجاني لخدمات نقل الأثاث",
  },
  {
    icon: Truck,
    label: "استفسار عن نقل الأثاث",
    message: "مرحباً، أريد الاستفسار عن خدمة نقل الأثاث والأسعار",
  },
  {
    icon: Wrench,
    label: "فك وتركيب الأثاث",
    message: "مرحباً، أحتاج خدمة فك وتركيب الأثاث. ما هي التفاصيل؟",
  },
  {
    icon: Wind,
    label: "فك وتركيب التكييفات",
    message: "مرحباً، أريد فك وتركيب تكييفات في منزلي",
  },
  {
    icon: Box,
    label: "تغليف احترافي",
    message: "مرحباً، أحتاج خدمة تغليف احترافي للأثاث",
  },
  {
    icon: ArrowUpToLine,
    label: "ونش رفع الأثاث",
    message: "مرحباً، أحتاج ونش لرفع الأثاث للدور العالي",
  },
];

export function WhatsAppWidget({ open, onClose }: WhatsAppWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setIsTyping(true);
      const t = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Prevent body scroll when open on mobile
  useEffect(() => {
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sendMessage = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encoded}`, "_blank");
    onClose();
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMessage.trim()) {
      sendMessage(customMessage);
      setCustomMessage("");
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop - Mobile only */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Widget */}
      <div
        className={`fixed z-50 transition-all duration-300 bottom-24 md:bottom-28 right-4 md:right-24 left-4 md:left-auto md:w-[380px] ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 8rem)" }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5E7EB] flex flex-col" style={{ maxHeight: "calc(100vh - 8rem)" }}>

          {/* HEADER */}
          <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 md:p-5 text-white overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="widget-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#widget-dots)" />
              </svg>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 left-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
              aria-label="إغلاق"
              type="button"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="relative flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-14 h-14 bg-white rounded-full p-1 shadow-lg overflow-hidden">
                  <Image
                    src="/logo.jpeg"
                    alt="خطوة"
                    width={56}
                    height={56}
                    className="w-full h-full rounded-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#4FCE5D] border-2 border-white rounded-full" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-black text-white text-base md:text-lg leading-tight">
                  {siteConfig.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-[#4FCE5D] rounded-full animate-pulse" />
                  <p className="text-xs text-white/90 font-medium">
                    متصل الآن • رد فوري
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div
            className="flex-1 overflow-y-auto bg-[#ECE5DD] p-4 space-y-3"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.05'%3E%3Ccircle cx='11' cy='18' r='7' fill='%23000000'/%3E%3Ccircle cx='59' cy='43' r='7' fill='%23000000'/%3E%3Ccircle cx='16' cy='36' r='3' fill='%23000000'/%3E%3C/g%3E%3C/svg%3E")`,
              minHeight: "300px",
            }}
          >
            {/* Welcome */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white rounded-2xl rounded-tr-md shadow-sm p-3">
                <p className="text-sm text-[#1C1C1C] leading-relaxed">
                  <span className="font-bold text-[#25D366]">مرحباً بك في خطوة! 👋</span>
                </p>
                <p className="text-sm text-[#1C1C1C] mt-1 leading-relaxed">
                  فريقنا جاهز لخدمتك على مدار الساعة. اختر أحد الاستفسارات السريعة أو اكتب رسالتك.
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-[#64748B]">
                  <Clock className="w-3 h-3" />
                  <span>الآن</span>
                  <CheckCheck className="w-3 h-3 text-[#25D366] mr-1" />
                </div>
              </div>
            </div>

            {/* Typing */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tr-md shadow-sm p-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Messages */}
            {!isTyping && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-[#64748B] font-semibold px-1 mb-2">
                  استفسارات سريعة:
                </p>
                {quickMessages.map((qm, i) => {
                  const Icon = qm.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => sendMessage(qm.message)}
                      type="button"
                      className="w-full flex items-center gap-3 bg-white hover:bg-[#F0F2F5] active:bg-[#E5E7EB] rounded-2xl p-3 shadow-sm transition-all group text-right"
                    >
                      <div className="w-9 h-9 bg-[#E85D04]/10 group-hover:bg-[#E85D04] rounded-xl flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-4 h-4 text-[#E85D04] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-[#1C1C1C] flex-1">
                        {qm.label}
                      </span>
                      <Send className="w-4 h-4 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* INPUT */}
          <form onSubmit={handleCustomSend} className="bg-[#F0F2F5] p-3 border-t border-[#E5E7EB] shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-[#1C1C1C] placeholder-[#64748B] outline-none focus:ring-2 focus:ring-[#25D366]/20"
              />
              <button
                type="submit"
                disabled={!customMessage.trim()}
                className="w-10 h-10 bg-[#25D366] hover:bg-[#20BD5A] disabled:bg-[#64748B] disabled:opacity-50 rounded-full flex items-center justify-center transition-all shadow-md disabled:cursor-not-allowed"
                aria-label="إرسال"
              >
                <Send className="w-4 h-4 text-white -rotate-45" />
              </button>
            </div>

            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 mt-2 py-2 bg-[#E85D04]/10 hover:bg-[#E85D04]/20 text-[#E85D04] font-bold text-sm rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>أو اتصل مباشرة</span>
              <span dir="ltr" className="font-black">{siteConfig.phone}</span>
            </a>
          </form>
        </div>
      </div>
    </>
  );
}