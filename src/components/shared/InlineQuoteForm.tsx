"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, MessageCircle, Loader2, CheckCircle2, MapPin, User, FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

interface FormData {
  name: string;
  phone: string;
  from: string;
  to: string;
  details: string;
}

export function InlineQuoteForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", from: "", to: "", details: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && (!form.name.trim() || !form.phone.trim())) {
      toast.error("الاسم ورقم التليفون مطلوبين");
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setLoading(true);
    const message = [
      "*طلب عرض سعر - خطوة لنقل الأثاث*",
      `الاسم: ${form.name}`,
      `التليفون: ${form.phone}`,
      form.from ? `من: ${form.from}` : "",
      form.to ? `إلى: ${form.to}` : "",
      form.details ? `تفاصيل: ${form.details}` : "",
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    toast.success("تم فتح واتساب - أرسل الرسالة وهنرد عليك فوراً");
    setLoading(false);
    setStep(1);
    setForm({ name: "", phone: "", from: "", to: "", details: "" });
  };

  return (
    <section
      id="quote-form"
      className="section-padding bg-green-50/50"
      aria-labelledby="quote-form-heading"
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2
              id="quote-form-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-3"
            >
              احصل على عرض سعر فوري
            </h2>
            <p className="text-slate-600 text-lg">
              3 خطوات بسيطة وهنرد عليك في دقائق
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s
                      ? "bg-green-700 text-white shadow-lg shadow-green-700/30"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 rounded-full transition-colors ${step > s ? "bg-green-700" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          <Card className="border-slate-200 shadow-xl bg-white overflow-hidden rounded-3xl">
            <CardContent className="p-6 md:p-8">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                      <User className="w-5 h-5" aria-hidden="true" />
                      <span>بيانات التواصل</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iq-name">الاسم *</Label>
                      <Input
                        id="iq-name"
                        placeholder="اسمك الكريم"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iq-phone">رقم التليفون *</Label>
                      <Input
                        id="iq-phone"
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
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                      <span>تفاصيل النقل</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="iq-from">النقل من</Label>
                        <Input
                          id="iq-from"
                          placeholder="المنطقة"
                          value={form.from}
                          onChange={(e) => update("from", e.target.value)}
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="iq-to">النقل إلى</Label>
                        <Input
                          id="iq-to"
                          placeholder="المنطقة"
                          value={form.to}
                          onChange={(e) => update("to", e.target.value)}
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                      <FileText className="w-5 h-5" aria-hidden="true" />
                      <span>تفاصيل إضافية</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iq-details">وصف النقلة (اختياري)</Label>
                      <Textarea
                        id="iq-details"
                        placeholder="عدد الغرف، أثاث خاص، طابق، وجود مصعد..."
                        value={form.details}
                        onChange={(e) => update("details", e.target.value)}
                        rows={4}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="flex items-center justify-between mt-8 gap-3">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-slate-200 text-slate-700 rounded-xl"
                  >
                    رجوع
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-green-700 hover:bg-green-800 text-white rounded-xl gap-2 px-8"
                  >
                    التالي
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl gap-2 px-8 shadow-lg shadow-green-600/30"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <MessageCircle className="h-5 w-5" />
                    )}
                    إرسال عبر واتساب
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}