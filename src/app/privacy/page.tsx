import Link from "next/link";
import { Shield, Phone, MessageCircle, Lock, FileText, Eye, UserCheck, Cookie } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "سياسة الخصوصية | خطوة لنقل الأثاث",
  description:
    "سياسة الخصوصية الخاصة بخطوة لنقل الأثاث - نحرص على حماية بياناتك الشخصية وخصوصيتك.",
  path: "/privacy",
});

const sections = [
  {
    icon: FileText,
    title: "1. مقدمة",
    content:
      "نحن في خطوة لنقل الأثاث نولي أهمية كبيرة لخصوصية عملائنا ونلتزم بحماية بياناتهم الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تشاركها معنا عند استخدامك لموقعنا الإلكتروني أو خدماتنا.",
  },
  {
    icon: Eye,
    title: "2. المعلومات التي نجمعها",
    content: "قد نقوم بجمع المعلومات التالية عند تواصلك معنا أو طلبك للخدمة:",
    list: [
      "الاسم الكامل",
      "رقم الهاتف",
      "العنوان أو المنطقة الجغرافية",
      "نوع الخدمة المطلوبة",
      "تفاصيل إضافية تتعلق بطلب الخدمة",
    ],
  },
  {
    icon: UserCheck,
    title: "3. كيفية استخدام المعلومات",
    content: "نستخدم معلوماتك الشخصية للأغراض التالية:",
    list: [
      "تقديم الخدمة المطلوبة بأفضل جودة",
      "التواصل معك بشأن طلبك أو استفساراتك",
      "تقديم عروض أسعار دقيقة ومخصصة",
      "تحسين خدماتنا وتطويرها باستمرار",
      "إرسال إشعارات أو عروض ترويجية بموافقتك المسبقة",
    ],
  },
  {
    icon: Lock,
    title: "4. حماية البيانات",
    content:
      "نتخذ كافة الإجراءات الأمنية اللازمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. لا نقوم ببيع أو تأجير معلوماتك الشخصية لأي طرف ثالث تحت أي ظرف من الظروف.",
  },
  {
    icon: Shield,
    title: "5. مشاركة المعلومات مع أطراف ثالثة",
    content: "لا نشارك بياناتك إلا في الحالات التالية فقط:",
    list: [
      "بموافقتك الصريحة والمسبقة",
      "للامتثال لمتطلبات قانونية أو أوامر قضائية",
      "مع موظفينا المعتمدين لتنفيذ الخدمة المطلوبة",
      "لحماية حقوقنا القانونية أو ممتلكاتنا",
    ],
  },
  {
    icon: Cookie,
    title: "6. ملفات تعريف الارتباط",
    content:
      "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل أداء الموقع. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك. استخدامك المستمر للموقع يعني موافقتك على استخدام هذه الملفات.",
  },
  {
    icon: UserCheck,
    title: "7. حقوقك كعميل",
    content: "لك الحق في:",
    list: [
      "الوصول إلى بياناتك الشخصية المخزنة لدينا",
      "طلب تصحيح أي بيانات غير دقيقة",
      "طلب حذف بياناتك الشخصية",
      "الاعتراض على معالجة بياناتك في أي وقت",
      "سحب موافقتك على استخدام بياناتك",
    ],
  },
  {
    icon: FileText,
    title: "8. التحديثات على السياسة",
    content:
      "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تعديلات على هذه الصفحة مع تحديث تاريخ آخر تعديل. ننصح بمراجعة هذه الصفحة بشكل دوري للاطلاع على آخر التحديثات.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F4F44] rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-20 h-20 bg-[#3F4F44] text-white rounded-2xl items-center justify-center mb-5 shadow-xl">
              <Shield className="w-10 h-10" />
            </div>
            <Badge className="bg-white/5 text-[#E8E3D9] border border-white/10 mb-5 px-4 py-1.5">
              <Lock className="w-3 h-3 ml-1.5" />
              خصوصيتك تهمنا
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">
              سياسة <span className="text-[#E8E3D9]">الخصوصية</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية بأعلى معايير الأمان
            </p>
            <p className="text-sm text-white/50 mt-4">
              آخر تحديث:{" "}
              {new Date().toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-5">
            {sections.map((section, i) => (
              <Card
                key={i}
                className="border-[#E5E1DA] hover:border-[#3F4F44] hover:shadow-md transition-all bg-white"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#3F4F44]/10 text-[#3F4F44] rounded-xl flex items-center justify-center shrink-0">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 pt-1.5">
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
                        {section.title}
                      </h2>
                      <p className="text-slate-900/70 leading-relaxed text-sm md:text-base">
                        {section.content}
                      </p>
                      {section.list && (
                        <ul className="mt-4 space-y-2">
                          {section.list.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm md:text-base text-slate-900/70"
                            >
                              <span className="w-1.5 h-1.5 bg-[#3F4F44] rounded-full mt-2.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F2EC] py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          <Card className="bg-white border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3F4F44] rounded-full blur-3xl" />
            </div>
            <CardContent className="p-8 md:p-10 text-center relative">
              <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                هل لديك أسئلة عن <span className="text-[#E8E3D9]">خصوصيتك؟</span>
              </h2>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                فريقنا متاح للإجابة على جميع استفساراتك بخصوص سياسة الخصوصية
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E8E3D9] hover:bg-[#D4CCB8] text-slate-900 h-12 px-8"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="w-4 h-4 ml-2" />
                    اتصل بنا
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/5 hover:bg-white/10 border-white/20 text-white hover:text-white h-12 px-8 backdrop-blur"
                >
                  <Link href="/contact">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    صفحة التواصل
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}