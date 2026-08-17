"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Phone, Send, Loader2, User, Sparkles, CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { areas } from "@/config/areas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  trackFormSubmit, trackQuoteRequest, trackWhatsApp,
} from "@/lib/analytics/events";

interface QuoteDialogProps {
  trigger?: React.ReactNode;
  defaultService?: string;
  defaultArea?: string;
  source?: string;
}

export function QuoteDialog({
  trigger,
  defaultService = "",
  defaultArea = "",
  source = "quote_dialog",
}: QuoteDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: defaultService,
    area: defaultArea,
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.service || !formData.area) {
      toast.error("من فضلك املأ جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);

    trackFormSubmit("quote_dialog", {
      service: formData.service,
      area: formData.area,
    });
    trackQuoteRequest(source as any);
    trackWhatsApp(source as any);

    const whatsappMessage = `
*طلب عرض سعر من موقع خطوة*

*الاسم:* ${formData.name}
*الهاتف:* ${formData.phone}
*الخدمة المطلوبة:* ${formData.service}
*المنطقة:* ${formData.area}
${formData.message ? `*تفاصيل إضافية:* ${formData.message}` : ""}

في انتظار تواصلكم لتحديد الموعد والسعر.
    `.trim();

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      toast.success("تم إرسال طلبك، هنتواصل معاك على الواتساب فوراً");
      setLoading(false);
      setOpen(false);
      setFormData({
        name: "",
        phone: "",
        service: defaultService,
        area: defaultArea,
        message: "",
      });
    }, 500);
  };

  // Default trigger as span with button-like styling
  const defaultTriggerSpan = (
    <span
      role="button"
      tabIndex={0}
      className="inline-flex items-center justify-center gap-2 bg-[#3F4F44] hover:bg-[#2E3B32] text-white font-bold h-12 px-8 rounded-lg shadow-lg transition-colors cursor-pointer select-none"
    >
      <Sparkles className="w-4 h-4" />
      احصل على عرض سعر
    </span>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger || defaultTriggerSpan}
      </DialogTrigger>

      <DialogContent className="max-w-lg p-0 overflow-hidden bg-white border border-[#E5E1DA] max-h-[92vh] overflow-y-auto">
        <DialogTitle className="sr-only">احصل على عرض سعر</DialogTitle>

        {/* Header */}
        <div className="relative bg-white text-white p-6 md:p-7">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#3F4F44] rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <Badge className="bg-white/10 text-[#E8E3D9] border border-white/20 mb-3 px-3 py-1">
              <Sparkles className="w-3 h-3 ml-1.5" />
              عرض سعر مجاني
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
              احجز خدمتك في <span className="text-[#E8E3D9]">دقيقة</span>
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              املأ البيانات وسنرسل لك عرض سعر مفصل عبر الواتساب فوراً
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-7 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dialog-name" className="text-slate-900 font-semibold text-sm">
              الاسم <span className="text-[#DC2626]">*</span>
            </Label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <Input
                id="dialog-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="اسمك الكامل"
                className="pr-10 h-11 border-[#E5E1DA] focus-visible:ring-[#3F4F44]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-phone" className="text-slate-900 font-semibold text-sm">
              رقم الهاتف <span className="text-[#DC2626]">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <Input
                id="dialog-phone"
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01xxxxxxxxx"
                className="pr-10 h-11 border-[#E5E1DA] focus-visible:ring-[#3F4F44]"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-slate-900 font-semibold text-sm">
                الخدمة <span className="text-[#DC2626]">*</span>
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value ?? "" })
                }
              >
                <SelectTrigger className="h-11 border-[#E5E1DA]">
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.slug} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-900 font-semibold text-sm">
                المنطقة <span className="text-[#DC2626]">*</span>
              </Label>
              <Select
                value={formData.area}
                onValueChange={(value) =>
                  setFormData({ ...formData, area: value ?? "" })
                }
              >
                <SelectTrigger className="h-11 border-[#E5E1DA]">
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  {mounted &&
                    areas.map((a) => (
                      <SelectItem key={a.slug} value={a.name}>
                        {a.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dialog-message" className="text-slate-900 font-semibold text-sm">
              تفاصيل إضافية <span className="text-[#6B6B6B] font-normal">(اختياري)</span>
            </Label>
            <Textarea
              id="dialog-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="عدد الغرف، الدور، تفاصيل خاصة..."
              rows={3}
              className="resize-none border-[#E5E1DA] focus-visible:ring-[#3F4F44]"
            />
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 py-2">
            {[
              "معاينة مجانية",
              "بدون التزام",
              "رد فوري",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-1 bg-[#F5F2EC] border border-[#E5E1DA] rounded-lg py-2 px-2"
              >
                <CheckCircle2 className="w-3 h-3 text-[#3F4F44] shrink-0" />
                <span className="text-[10px] font-semibold text-slate-900">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-[#3F4F44] hover:bg-[#2E3B32] text-white font-bold h-12 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 ml-2" />
                إرسال عبر واتساب
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-xs text-[#6B6B6B] justify-center pt-1">
            <span>أو اتصل مباشرة:</span>
            <a
              href={`tel:${siteConfig.phone}`}
              dir="ltr"
              className="font-bold text-[#3F4F44] hover:text-[#2E3B32] transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}