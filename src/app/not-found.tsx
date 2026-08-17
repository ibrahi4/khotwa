import Link from "next/link";
import { Home, Phone, MessageCircle, ArrowLeft, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "الصفحة غير موجودة | خطوة لنقل الأثاث",
  description: "الصفحة التي تبحث عنها غير موجودة. عد إلى الصفحة الرئيسية أو تواصل معنا.",
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center bg-white text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E] rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom py-12 md:py-20 w-full">
        <div className="max-w-3xl mx-auto text-center">

          <div className="flex justify-center mb-8">
            <Logo variant="white" size="xl" href={null} />
          </div>

          <div className="relative mb-10">
            <div className="text-[100px] md:text-[160px] font-black text-white/5 leading-none select-none tracking-tight">
              404
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
            الصفحة <span className="text-[#0F766E]">غير موجودة</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يمكنك العودة للصفحة الرئيسية أو التواصل معنا مباشرة.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto mb-10">
            <Button asChild size="lg" className="bg-[#0F766E] hover:bg-[#0D5F5A] text-white h-12 border-0">
              <Link href="/">
                <Home className="w-4 h-4 ml-2" />
                الصفحة الرئيسية
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/5 hover:bg-white/10 border-white/20 text-white hover:text-white h-12">
              <Link href="/contact">
                <MessageCircle className="w-4 h-4 ml-2" />
                تواصل معنا
              </Link>
            </Button>
          </div>

          <Card className="bg-white/5 border-white/10 text-white max-w-xl mx-auto mb-8">
            <CardContent className="p-5">
              <p className="text-xs text-white/50 mb-4 font-semibold uppercase tracking-wider">
                روابط مفيدة
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/services", label: "خدماتنا", icon: ArrowLeft },
                  { href: "/areas", label: "مناطق الخدمة", icon: MapPin },
                  { href: "/about", label: "من نحن", icon: ArrowLeft },
                  { href: "/faq", label: "الأسئلة الشائعة", icon: ArrowLeft },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 p-3 rounded-xl text-sm transition-all duration-200"
                  >
                    <link.icon className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-white/60 hover:text-[#0F766E] transition-colors">
              <Phone className="w-4 h-4" />
              <span dir="ltr">{siteConfig.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-[#0F766E] transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}