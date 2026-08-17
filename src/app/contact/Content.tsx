"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import {
  Phone, MessageCircle, MapPin, Clock, Send,
  CheckCircle2, Loader2, User,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { areas } from "@/config/areas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  trackPhoneCall, trackWhatsApp, trackFormSubmit, trackQuoteRequest,
} from "@/lib/analytics/events";

export default function ContactContent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    area: "",
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

    trackFormSubmit("contact_page_form", {
      service: formData.service,
      area: formData.area,
    });
    trackQuoteRequest("contact_page");

    const whatsappMessage = `
*طلب جديد من موقع خطوة*

*الاسم:* ${formData.name}
*الهاتف:* ${formData.phone}
*الخدمة:* ${formData.service}
*المنطقة:* ${formData.area}
*التفاصيل:* ${formData.message || "لا يوجد"}
    `.trim();

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      toast.success("تم إرسال طلبك بنجاح");
      setLoading(false);
      setFormData({ name: "", phone: "", service: "", area: "", message: "" });

      setTimeout(() => {
        router.push("/thank-you");
      }, 1500);
    }, 600);
  };

  return (
    <>
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          style: {
            background: "#1C1C1C",
            color: "#fff",
            border: "1px solid #0F766E",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontFamily: "Cairo, sans-serif",
          },
        }}
      />

      {/* Hero */}
      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 text-white border border-white/20 mb-5 px-4 py-1.5">
              <MessageCircle className="w-3 h-3 ml-1.5" />
              نحن في خدمتك
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight">
              تواصل <span className="text-[#0F766E]">معنا</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              نحن متاحون على مدار الساعة لخدمتك. اختر الطريقة الأنسب للتواصل
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => trackPhoneCall("contact_page")}
              className="block"
            >
              <Card className="h-full hover:border-teal-600 hover:shadow-md transition-all group cursor-pointer border-[#E5E7EB] bg-[#FAF5EE]">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">اتصل بنا</h3>
                  <p className="text-[#64748B] text-sm mb-3">للحجز السريع والاستفسارات</p>
                  <p className="text-[#0F766E] font-bold text-base" dir="ltr">
                    {siteConfig.phone}
                  </p>
                </CardContent>
              </Card>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp("contact_page")}
              className="block"
            >
              <Card className="h-full hover:border-[#1F5F3F] hover:shadow-md transition-all group cursor-pointer border-[#E5E7EB] bg-[#FAF5EE]">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1F5F3F] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">واتساب</h3>
                  <p className="text-[#64748B] text-sm mb-3">رد فوري على رسائلك</p>
                  <p className="text-[#1F5F3F] font-bold text-base">تواصل عبر واتساب</p>
                </CardContent>
              </Card>
            </a>

            <Card className="h-full hover:border-teal-600 hover:shadow-md transition-all border-[#E5E7EB] bg-[#FAF5EE]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white border border-[#E5E7EB] text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">مقرنا</h3>
                <p className="text-[#64748B] text-sm mb-3">مقرنا الرئيسي</p>
                <p className="text-slate-900 font-bold text-sm">{siteConfig.address}</p>
              </CardContent>
            </Card>
          </div>

          {/* Form + Sidebar */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <Card className="border-[#E5E7EB] shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6">
                    <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-3">
                      احصل على عرض سعر
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                      اطلب خدمتك الآن
                    </h2>
                    <p className="text-[#64748B] text-sm">
                      املأ النموذج وسنتواصل معك خلال دقائق
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-900 font-semibold">
                          الاسم <span className="text-[#0F766E]">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="اسمك الكامل"
                            className="pr-10 h-12 border-[#E5E7EB] focus-visible:ring-[#0F766E] focus-visible:border-[#0F766E]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-900 font-semibold">
                          رقم الهاتف <span className="text-[#0F766E]">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                          <Input
                            id="phone"
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="01xxxxxxxxx"
                            className="pr-10 h-12 border-[#E5E7EB] focus-visible:ring-[#0F766E] focus-visible:border-[#0F766E]"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-900 font-semibold">
                          الخدمة المطلوبة <span className="text-[#0F766E]">*</span>
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData({ ...formData, service: value ?? "" })
                          }
                        >
                          <SelectTrigger className="h-12 border-[#E5E7EB]">
                            <SelectValue placeholder="اختر الخدمة" />
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
                        <Label className="text-slate-900 font-semibold">
                          المنطقة <span className="text-[#0F766E]">*</span>
                        </Label>
                        <Select
                          value={formData.area}
                          onValueChange={(value) =>
                            setFormData({ ...formData, area: value ?? "" })
                          }
                        >
                          <SelectTrigger className="h-12 border-[#E5E7EB]">
                            <SelectValue placeholder="اختر منطقتك" />
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
                      <Label htmlFor="message" className="text-slate-900 font-semibold">
                        تفاصيل إضافية
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="اخبرنا عن تفاصيل المنقولات (عدد الغرف، الدور، أي تفاصيل مهمة...)"
                        rows={4}
                        className="resize-none border-[#E5E7EB] focus-visible:ring-[#0F766E] focus-visible:border-[#0F766E]"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full bg-[#0F766E] hover:bg-[#0D5F5A] text-white font-bold h-14 text-base shadow-md border-0"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 ml-2" />
                          إرسال الطلب عبر واتساب
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-[#64748B]">
                      بإرسال النموذج، أنت توافق على التواصل معك عبر واتساب أو الهاتف
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <Card className="bg-white border-0 text-white relative overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">ساعات العمل</h3>
                      <p className="text-xs text-white/60">متاحون لخدمتك</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                      <span className="text-white/70">السبت - الخميس</span>
                      <span className="font-bold text-[#0F766E]">24 ساعة</span>
                    </div>
                    <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                      <span className="text-white/70">الجمعة</span>
                      <span className="font-bold text-[#0F766E]">24 ساعة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E5E7EB] bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">لماذا خطوة؟</h3>
                  <div className="space-y-3">
                    {[
                      "خبرة 10+ سنوات",
                      "فرق مدربة ومتخصصة",
                      "تغليف احترافي",
                      "ضمان كامل على المقتنيات",
                      "أسعار شفافة بدون رسوم خفية",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F5F5F5] text-slate-900 rounded-lg flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-slate-900">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0F766E] border-0 text-white">
                <CardContent className="p-6 text-center">
                  <Phone className="w-10 h-10 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">للحجز السريع</h3>
                  <p className="text-white/90 text-sm mb-4">اتصل الآن</p>
                  <Button
                    asChild
                    className="w-full bg-white text-[#0F766E] hover:bg-[#FAF5EE] font-bold h-12"
                  >
                    <a
                      href={`tel:${siteConfig.phone}`}
                      dir="ltr"
                      onClick={() => trackPhoneCall("contact_page")}
                    >
                      {siteConfig.phone}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}