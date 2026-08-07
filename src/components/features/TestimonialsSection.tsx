"use client";

import { Star, Quote, MapPin, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    location: "الشيخ زايد",
    role: "صاحب فيلا",
    rating: 5,
    comment:
      "خدمة استثنائية! نقلوا فيلتي بالكامل من الشيخ زايد للتجمع الخامس بكل احترافية. الفريق مدرب جداً والتغليف كان ممتاز. أنصح بهم بشدة لأصحاب الكمبوندات.",
    isVIP: true,
  },
  {
    id: 2,
    name: "د. سارة عبدالله",
    location: "التجمع الخامس",
    role: "طبيبة",
    rating: 5,
    comment:
      "تعاملت معهم في نقل أثاث عيادتي والمنزل. الالتزام بالمواعيد ممتاز والأسعار شفافة. الأهم أنهم اهتموا بالأجهزة الحساسة بشكل احترافي جداً.",
    isVIP: true,
  },
  {
    id: 3,
    name: "م. خالد إبراهيم",
    location: "مدينتي",
    role: "مهندس",
    rating: 5,
    comment:
      "أفضل شركة نقل تعاملت معها على الإطلاق. نقلوا أثاث منزلي في مدينتي بسرعة وأمان تام. الونش جاء في الموعد وخدمة فك وتركيب التكييفات كانت احترافية.",
    isVIP: true,
  },
  {
    id: 4,
    name: "نورا حسن",
    location: "6 أكتوبر",
    role: "ربة منزل",
    rating: 5,
    comment:
      "شركة محترمة ومتعاونة. غلفوا كل قطعة بعناية وكأنها قطعتهم. لا توجد أي خدوش أو أضرار. سعرهم مناسب جداً مقارنة بجودة الخدمة.",
    isVIP: false,
  },
  {
    id: 5,
    name: "أ. محمود سعيد",
    location: "القاهرة الجديدة",
    role: "أستاذ جامعي",
    rating: 5,
    comment:
      "خبرة سنين في الخدمة واضحة من أول لحظة. تعاملوا مع مكتبتي الضخمة ولوحاتي الفنية بمنتهى الحرص. شركة موثوقة تستحق التقدير.",
    isVIP: true,
  },
  {
    id: 6,
    name: "ياسمين أحمد",
    location: "الرحاب",
    role: "محاسبة",
    rating: 5,
    comment:
      "نقلت بيتي معاهم أكثر من مرة، وكل مرة بنفس الجودة والاحترافية. فريق محترم والمدير شخصياً بيتابع الشغل. أنصح بهم لكل من يبحث عن الجودة.",
    isVIP: false,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#FAF5EE]">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="border-[#E85D04] text-[#E85D04] bg-[#E85D04]/5 mb-4">
            <Quote className="w-3 h-3 ml-1.5" />
            آراء عملائنا
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
            ماذا يقول
            <br />
            <span className="text-[#E85D04]">عملاؤنا عنا؟</span>
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed mb-6">
            آلاف العملاء وثقوا بنا في نقل أثاثهم. اقرأ بعض تجاربهم الحقيقية
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-3 bg-white border-2 border-[#E85D04]/30 rounded-2xl px-6 py-4 shadow-lg shadow-[#E85D04]/10">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[#E85D04] text-[#E85D04]" />
              ))}
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#1C1C1C]">4.9 / 5</div>
              <div className="text-xs text-[#64748B]">من 500+ تقييم</div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="h-full hover:shadow-xl hover:shadow-[#E85D04]/15 hover:border-[#E85D04] transition-all duration-300 group border-[#E5E1DA] bg-white relative overflow-hidden"
            >
              {t.isVIP && (
                <div className="absolute top-0 left-0 bg-gradient-to-br from-[#E85D04] to-[#C94A00] text-white px-3 py-1.5 rounded-br-2xl flex items-center gap-1.5 text-xs font-bold z-10 shadow-lg shadow-[#E85D04]/30">
                  <Crown className="w-3 h-3" />
                  عميل VIP
                </div>
              )}

              <CardContent className="p-6 md:p-7 relative">
                <Quote className="absolute top-4 left-4 w-14 h-14 text-[#E85D04]/10 group-hover:text-[#E85D04]/25 transition-colors" />

                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E85D04] text-[#E85D04]" />
                    ))}
                  </div>

                  <p className="text-[#1C1C1C]/80 leading-relaxed mb-6 text-sm md:text-base line-clamp-5">
                    {t.comment}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#E5E1DA]">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#E85D04] to-[#C94A00] text-white rounded-full flex items-center justify-center font-black text-lg shrink-0 shadow-md shadow-[#E85D04]/30">
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#1C1C1C] text-sm md:text-base">{t.name}</div>
                      <div className="text-xs text-[#64748B] flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#E85D04]" />
                        {t.location} - {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "500+", label: "عميل سعيد" },
            { value: "4.9/5", label: "تقييم العملاء" },
            { value: "98%", label: "معدل الرضا" },
            { value: "95%", label: "عملاء متكررون" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-[#E5E1DA] hover:border-[#E85D04] hover:shadow-lg hover:shadow-[#E85D04]/15 rounded-2xl p-5 text-center transition-all group"
            >
              <div className="text-2xl md:text-3xl font-black text-[#E85D04] mb-1 group-hover:drop-shadow-[0_0_15px_rgba(232,93,4,0.4)] transition-all">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-[#64748B] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}