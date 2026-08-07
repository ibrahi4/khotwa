import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "تم استلام طلبك بنجاح",
  description: "شكراً لتواصلك مع خطوة لنقل الأثاث. سنتواصل معك قريباً.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-[#FAF5EE] py-16">
      <div className="container-custom max-w-2xl text-center">
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-12 border border-[#E5E7EB]">

          <div className="flex justify-center mb-6">
            <Logo size="lg" href={null} />
          </div>

          <div className="w-24 h-24 bg-[#E85D04] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-4 tracking-tight">
            تم استلام طلبك <span className="text-[#E85D04]">بنجاح</span>
          </h1>

          <p className="text-base md:text-lg text-[#64748B] leading-relaxed mb-8">
            شكراً لاختيارك <strong className="text-[#1C1C1C]">{siteConfig.name}</strong>
            <br />
            سيتواصل معك أحد ممثلي خدمة العملاء خلال دقائق على الواتساب
          </p>

          <div className="bg-[#FAF5EE] rounded-2xl p-6 mb-8 text-right border border-[#E5E7EB]">
            <h3 className="font-bold text-[#1C1C1C] mb-4 text-center">ماذا يحدث الآن؟</h3>
            <div className="space-y-3">
              {[
                "سيتم مراجعة طلبك خلال دقائق",
                "سنتواصل معك على الواتساب لتأكيد التفاصيل",
                "نرسل لك عرض سعر مفصل ومناسب",
                "نحدد موعد المعاينة أو النقل حسب رغبتك",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#1C1C1C] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm md:text-base text-[#1C1C1C]/80">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] pt-6">
            <p className="text-sm text-[#64748B] mb-4">للتواصل العاجل أو الاستفسار:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild className="bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-12">
                <a href={`tel:${siteConfig.phone}`} dir="ltr">
                  <Phone className="w-4 h-4 ml-2" />
                  {siteConfig.phone}
                </a>
              </Button>
              <Button asChild className="bg-[#1F5F3F] hover:bg-[#164A30] text-white font-bold h-12">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  واتساب
                </a>
              </Button>
            </div>

            <Button asChild variant="ghost" className="mt-4 text-[#64748B] hover:text-[#1C1C1C]">
              <Link href="/">
                <Home className="w-4 h-4 ml-2" />
                العودة للصفحة الرئيسية
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}