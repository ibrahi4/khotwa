"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trackPhoneCall, trackWhatsApp } from "@/lib/analytics/events";

const formSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  service: z.string().min(2, "يرجى تحديد الخدمة المطلوبة"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactContent() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", service: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const waMessage = `طلب تواصل جديد:%0Aالاسم: ${data.name}%0Aرقم الهاتف: ${data.phone}%0Aالخدمة: ${data.service}%0Aالتفاصيل: ${data.message || 'لا يوجد'}`;
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`, '_blank');
      toast.success("تم تحويلك لواتساب لإرسال رسالتك بنجاح!");
      form.reset();
    } catch (error) {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* ═══════════════ HEADER SECTION ═══════════════ */}
      <section className="bg-green-50/50 pt-16 pb-12 border-b border-green-100">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-green-950 mb-4 tracking-tight">
            تواصل معنا
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            نحن هنا للإجابة على استفساراتك. فريق خطوة جاهز لتقديم عرض سعر مجاني وترتيب موعد معاينة في الوقت الذي يناسبك.
          </p>
        </div>
      </section>

      <div className="container-custom pt-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
          
          {/* ═══════════════ FORM SECTION (Right Side) ═══════════════ */}
          <div className="lg:col-span-7">
            <Card className="border border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden bg-white">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Send className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-green-950">أرسل طلبك الآن</h2>
                    <p className="text-sm text-slate-500 mt-1">سيتم تحويل طلبك مباشرة لخدمة العملاء عبر واتساب</p>
                  </div>
                </div>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-bold">الاسم بالكامل</Label>
                      <Input id="name" {...form.register("name")} className="bg-slate-50/50 border-slate-200 h-12 focus-visible:ring-green-500 rounded-xl" placeholder="أدخل اسمك" />
                      {form.formState.errors.name && <p className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-bold">رقم الهاتف</Label>
                      <Input id="phone" type="tel" dir="ltr" {...form.register("phone")} className="bg-slate-50/50 border-slate-200 h-12 focus-visible:ring-green-500 rounded-xl text-right" placeholder="01X XXXX XXXX" />
                      {form.formState.errors.phone && <p className="text-xs text-red-500 font-medium">{form.formState.errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-slate-700 font-bold">الخدمة المطلوبة</Label>
                    <Input id="service" {...form.register("service")} className="bg-slate-50/50 border-slate-200 h-12 focus-visible:ring-green-500 rounded-xl" placeholder="مثال: نقل عفش، ونش رفع، تغليف..." />
                    {form.formState.errors.service && <p className="text-xs text-red-500 font-medium">{form.formState.errors.service.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-bold">تفاصيل إضافية (اختياري)</Label>
                    <Textarea id="message" {...form.register("message")} className="bg-slate-50/50 border-slate-200 min-h-[120px] resize-y focus-visible:ring-green-500 rounded-xl" placeholder="أي تفاصيل عن الأدوار، الونش، أو العفش..." />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-green-700 hover:bg-green-800 text-white font-bold text-lg rounded-xl transition-all shadow-md">
                    {isSubmitting ? "جاري التجهيز..." : "إرسال الطلب"}
                  </Button>
                  
                  <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> بياناتك آمنة ومحمية بالكامل
                  </p>
                </form>
              </div>
            </Card>
          </div>

          {/* ═══════════════ CONTACT INFO SECTION (Left Side) ═══════════════ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneCall("contact_page_info")} className="group block">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:border-green-200 hover:shadow-md transition-all text-center h-full">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-700 transition-colors">
                    <Phone className="w-5 h-5 text-green-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">اتصل بنا</h3>
                  <p className="text-xs text-slate-500" dir="ltr">{siteConfig.phone}</p>
                </div>
              </a>

              <a href={`https://wa.me/${siteConfig.whatsapp}`} onClick={() => trackWhatsApp("contact_page_info")} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:border-green-200 hover:shadow-md transition-all text-center h-full">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500 transition-colors">
                    <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">واتساب</h3>
                  <p className="text-xs text-slate-500">رسالة فورية</p>
                </div>
              </a>
            </div>

            {/* Address & Hours */}
            <Card className="border border-slate-100 shadow-sm rounded-3xl bg-slate-50/50">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">مقر الشركة</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/60" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">مواعيد العمل</h4>
                    <p className="text-sm text-slate-600">24 ساعة / 7 أيام في الأسبوع</p>
                    <p className="text-xs text-slate-500 mt-1">متاحون في أيام العطلات والإجازات الرسمية</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-slate-200/60" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">البريد الإلكتروني</h4>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* ═══════════════ GOOGLE MAPS SECTION ═══════════════ */}
        <section className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-green-950">موقعنا على الخريطة</h2>
            <p className="text-base text-slate-500 mt-2">شرفنا بزيارتك أو تتبع مقرنا الرئيسي</p>
          </div>
          
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 p-2">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=30.0131,31.4961&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="مقر خطوة لنقل الأثاث"
              ></iframe>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}