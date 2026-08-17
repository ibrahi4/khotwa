import Link from "next/link";
import {
  FileText, Scale, AlertCircle, CheckCircle2,
  Phone, MessageCircle, ChevronLeft, Gavel, Shield,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "شروط الاستخدام | خطوة لنقل الأثاث",
  description:
    "شروط استخدام موقع وخدمات خطوة لنقل الأثاث. تعرف على حقوقك والتزاماتك عند التعامل معنا.",
  path: "/terms",
});

const sections = [
  {
    icon: CheckCircle2,
    title: "1. قبول الشروط",
    content: [
      "باستخدامك لموقع خطوة لنقل الأثاث أو طلب خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام.",
      "إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.",
      "نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إشعارك بأي تغييرات جوهرية.",
    ],
  },
  {
    icon: FileText,
    title: "2. وصف الخدمات",
    content: [
      "نقدم خدمات نقل الأثاث الاحترافية التي تشمل:",
      "• نقل الأثاث والعفش داخل وبين محافظات مصر",
      "• فك وتركيب جميع أنواع الأثاث",
      "• فك وتركيب التكييفات بأنواعها",
      "• التغليف الاحترافي للأثاث والمقتنيات",
      "• ونش رفع الأثاث للأدوار العالية",
      "• نقل المقتنيات الحساسة والقابلة للكسر",
      "نحتفظ بالحق في رفض تقديم الخدمة في حالات معينة دون إبداء الأسباب.",
    ],
  },
  {
    icon: Scale,
    title: "3. الأسعار والدفع",
    content: [
      "• جميع الأسعار تخضع للمعاينة الميدانية والتأكيد قبل تنفيذ الخدمة",
      "• السعر النهائي يعتمد على حجم المنقولات، المسافة، والخدمات الإضافية",
      "• نلتزم بالشفافية الكاملة في الأسعار بدون رسوم خفية",
      "• الدفع يكون نقداً أو بالتحويل البنكي أو فودافون كاش",
      "• يمكن دفع مقدم وباقي المبلغ عند إتمام الخدمة",
      "• في حالة إلغاء الخدمة، قد يتم استرداد المقدم وفقاً لسياسة الإلغاء",
    ],
  },
  {
    icon: CheckCircle2,
    title: "4. التزاماتنا",
    content: [
      "نلتزم بـ:",
      "• تقديم الخدمة بأعلى معايير الجودة والاحترافية",
      "• الالتزام بالمواعيد المتفق عليها",
      "• استخدام معدات وأدوات حديثة وآمنة",
      "• توفير فرق مدربة ومتخصصة",
      "• الحفاظ على سلامة المقتنيات أثناء النقل",
      "• توفير ضمان كامل على الخدمات المقدمة",
      "• الالتزام بالخصوصية وسرية معلومات العملاء",
    ],
  },
  {
    icon: AlertCircle,
    title: "5. التزامات العميل",
    content: [
      "يلتزم العميل بـ:",
      "• توفير معلومات دقيقة وكاملة عن المنقولات",
      "• الإفصاح عن أي قطع حساسة أو ثمينة قبل بدء العمل",
      "• ضمان وجود تصاريح دخول للأماكن التي تتطلب ذلك",
      "• توفير مكان مناسب لإيقاف سيارة النقل",
      "• إبلاغنا بأي ظروف خاصة قد تؤثر على عملية النقل",
      "• سداد المبالغ المتفق عليها في المواعيد المحددة",
      "• معاملة فرقنا باحترام",
    ],
  },
  {
    icon: Shield,
    title: "6. الضمان والمسؤولية",
    content: [
      "نوفر ضماناً على جميع المقتنيات أثناء عملية النقل وفقاً للشروط التالية:",
      "• الضمان يغطي الأضرار الناتجة عن إهمال فرقنا فقط",
      "• لا نتحمل مسؤولية الأضرار الناتجة عن أسباب خارجة عن إرادتنا",
      "• الأضرار البسيطة قد لا يشملها الضمان",
      "• يجب الإبلاغ عن أي ضرر فوراً عند الاستلام",
      "• التعويض يكون بقيمة الإصلاح أو القيمة السوقية للقطعة",
      "• لا نتحمل مسؤولية المقتنيات غير المُفصح عنها مسبقاً",
    ],
  },
  {
    icon: AlertCircle,
    title: "7. الإلغاء والتأجيل",
    content: [
      "• يمكن إلغاء أو تأجيل الخدمة قبل الموعد بـ 24 ساعة على الأقل",
      "• الإلغاء قبل الموعد بأقل من 24 ساعة قد يخضع لرسوم",
      "• في حالة الإلغاء بعد وصول الفريق، قد يتم تحصيل رسوم الانتقال",
      "• نحتفظ بالحق في إلغاء الخدمة في حالة عدم توفر الشروط المناسبة",
    ],
  },
  {
    icon: FileText,
    title: "8. الملكية الفكرية",
    content: [
      "• جميع محتويات موقعنا محمية بحقوق الملكية الفكرية",
      "• لا يجوز نسخ أو إعادة استخدام أي محتوى دون إذن كتابي مسبق",
      "• اسم وعلامة خطوة لنقل الأثاث علامة تجارية.",
    ],
  },
  {
    icon: Gavel,
    title: "9. القانون المعمول به",
    content: [
      "• تخضع هذه الشروط لقوانين جمهورية مصر العربية",
      "• أي نزاع ينشأ يتم حله ودياً قدر الإمكان",
      "• في حالة عدم التوصل لاتفاق، تختص المحاكم المصرية بالفصل في النزاع",
      "• هذه الشروط تعكس الاتفاق الكامل بين الطرفين",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#F5F2EC] border-b border-[#E5E1DA]">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B]">
            <Link href="/" className="hover:text-[#3F4F44] transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-slate-900 font-semibold">شروط الاستخدام</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F4F44] rounded-full blur-3xl" />
        </div>
        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-20 h-20 bg-[#3F4F44] text-white rounded-2xl items-center justify-center mb-5 shadow-xl">
              <Scale className="w-10 h-10" />
            </div>
            <Badge className="bg-white/5 text-[#E8E3D9] border border-white/10 mb-5 px-4 py-1.5">
              <FileText className="w-3 h-3 ml-1.5" />
              شروط الاستخدام
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">
              شروط <span className="text-[#E8E3D9]">الاستخدام</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              الشروط والأحكام التي تحكم استخدام خدماتنا وموقعنا الإلكتروني
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <Card className="border-2 border-[#3F4F44] bg-[#F5F2EC] mb-10">
            <CardContent className="p-6 md:p-8">
              <p className="text-slate-900/80 leading-relaxed">
                مرحباً بك في خطوة لنقل الأثاث. تحدد هذه الوثيقة الشروط والأحكام
                التي تحكم استخدامك لخدماتنا وموقعنا الإلكتروني. يرجى قراءتها بعناية قبل التعامل معنا.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-5">
            {sections.map((section, i) => (
              <Card
                key={i}
                className="border-[#E5E1DA] hover:border-[#3F4F44] transition-colors bg-white"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-[#3F4F44]/10 text-[#3F4F44] rounded-xl flex items-center justify-center shrink-0">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3 text-slate-900/70 leading-relaxed">
                    {section.content.map((line, j) => (
                      <p key={j} className={line.startsWith("•") ? "mr-6" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-10 bg-white border-0 text-white overflow-hidden">
            <CardContent className="p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                هل لديك استفسار قانوني؟
              </h2>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                فريقنا جاهز للإجابة على جميع استفساراتك حول شروط استخدام خدماتنا
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
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}