"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, Mail, MapPin, Clock, Send,
  Loader2, CheckCircle2, Sparkles, Shield, Award, Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export default function ContactContent() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("الاسم ورقم التليفون مطلوبين");
      return;
    }

    setLoading(true);

    const message = [
      "*رسالة جديدة من موقع خطوة*",
      `الاسم: ${form.name}`,
      `التليفون: ${form.phone}`,
      form.email ? `الإيميل: ${form.email}` : "",
      form.service ? `الخدمة: ${form.service}` : "",
      form.message ? `التفاصيل: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    toast.success("تم فتح واتساب - أرسل الرسالة للتواصل معنا");
    setLoading(false);
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label="تواصل معنا"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px]" />
        </div>

        <div className="relative container-custom py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
              <Sparkles className="w-4 h-4 text-green-400" aria-hidden="true" />
              متاحون على مدار الساعة
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.15] tracking-tight">
              تواصل معنا
              <span className="block text-green-400 mt-2">نحن دائماً هنا لخدمتك</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              اختر الطريقة الأنسب للتواصل معنا. فريقنا جاهز للرد على استفساراتك،
              تقديم عرض سعر مجاني، أو ترتيب موعد معاينة في أي وقت يناسبك.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════ QUICK CONTACT CARDS ═══════════════ */}
      <section className="section-padding bg-white" aria-label="طرق التواصل السريع">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Phone,
                title: "اتصل الآن",
                value: siteConfig.phone,
                desc: "متاح 24/7 للرد الفوري",
                href: `tel:${siteConfig.phone}`,
                primary: true,
                ltr: true,
              },
              {
                icon: MessageCircle,
                title: "واتساب مباشر",
                value: "رسالة فورية",
                desc: "رد خلال دقائق",
                href: `https://wa.me/${siteConfig.whatsapp}`,
                accent: true,
              },
              {
                icon: Mail,
                title: "البريد الإلكتروني",
                value: siteConfig.email,
                desc: "للاستفسارات الرسمية",
                href: `mailto:${siteConfig.email}`,
                ltr: true,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group rounded-3xl p-6 text-center transition-all hover:-translate-y-1 ${
                    item.primary
                      ? "bg-green-700 hover:bg-green-800 text-white shadow-xl shadow-green-700/20"
                      : item.accent
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20"
                      : "bg-green-50/40 hover:bg-white text-green-950 border border-green-100/60 hover:border-green-300 hover:shadow-lg"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                      item.primary || item.accent
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-white border border-green-100"
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${item.primary || item.accent ? "text-white" : "text-green-700"}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-black text-lg mb-2">{item.title}</h3>
                  <div
                    className={`font-bold text-base mb-1 ${item.ltr ? "" : ""}`}
                    dir={item.ltr ? "ltr" : undefined}
                  >
                    {item.value}
                  </div>
                  <p
                    className={`text-xs ${
                      item.primary || item.accent ? "text-white/80" : "text-slate-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ FORM + INFO ═══════════════ */}
      <section className="section-padding bg-green-50/40" aria-labelledby="form-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-green-100/60 shadow-sm">
                <div className="mb-8">
                  <p className="text-sm font-bold text-green-700 mb-2 tracking-wider uppercase">
                    نموذج التواصل
                  </p>
                  <h2
                    id="form-heading"
                    className="text-2xl md:text-3xl font-black text-green-950 leading-tight"
                  >
                    أرسل لنا رسالتك
                  </h2>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    املأ النموذج وسنتواصل معك عبر واتساب خلال دقائق
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="c-name">
                        الاسم <span className="text-green-700">*</span>
                      </Label>
                      <Input
                        id="c-name"
                        placeholder="اسمك الكامل"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-phone">
                        رقم التليفون <span className="text-green-700">*</span>
                      </Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="h-12 rounded-xl text-left"
                        dir="ltr"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-email">البريد الإلكتروني</Label>
                    <Input
                      id="c-email"
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="h-12 rounded-xl text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-service">الخدمة المطلوبة</Label>
                    <Input
                      id="c-service"
                      placeholder="نقل أثاث، فك وتركيب، تغليف..."
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-message">تفاصيل إضافية</Label>
                    <Textarea
                      id="c-message"
                      placeholder="اكتب أي تفاصيل تساعدنا على خدمتك بشكل أفضل..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800 text-white h-13 rounded-xl font-bold gap-2 shadow-lg shadow-green-700/20"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="w-5 h-5" aria-hidden="true" />
                    )}
                    إرسال الرسالة عبر واتساب
                  </Button>

                  <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
                    بياناتك محمية ولن يتم مشاركتها مع أي طرف ثالث
                  </p>
                </form>
              </div>
            </div>

            {/* Info Sidebar */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" aria-hidden="true">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl" />
                </div>

                <div className="relative">
                  <h3 className="font-black text-xl mb-6">معلومات التواصل</h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/15 border border-white/25 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-bold text-sm mb-1">العنوان</div>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {siteConfig.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/15 border border-white/25 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-bold text-sm mb-1">ساعات العمل</div>
                        <p className="text-white/80 text-sm leading-relaxed">
                          24 ساعة / 7 أيام في الأسبوع
                        </p>
                        <p className="text-white/60 text-xs mt-1">
                          بما في ذلك العطلات الرسمية
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/15 border border-white/25 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-bold text-sm mb-1">الهاتف</div>
                        <a
                          href={`tel:${siteConfig.phone}`}
                          className="text-white/90 text-sm hover:text-green-300 transition-colors font-semibold tabular-nums"
                          dir="ltr"
                        >
                          {siteConfig.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-white rounded-3xl p-6 border border-green-100/60">
                <h3 className="font-black text-lg text-green-950 mb-4">لماذا نحن؟</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "تأمين شامل على المقتنيات" },
                    { icon: Award, text: `خبرة +${siteConfig.yearsOfExperience} سنوات` },
                    { icon: Users, text: `${siteConfig.ratings.count}+ عميل راضٍ` },
                    { icon: CheckCircle2, text: "أسعار شفافة بدون رسوم خفية" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-green-700" aria-hidden="true" />
                        </div>
                        <span className="text-sm text-slate-700 font-medium">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}