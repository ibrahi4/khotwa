import {
  HelpCircle, Phone, MessageCircle, Sparkles,
  Truck, Wrench, Wind, Box, ArrowUpToLine, Gem, DollarSign,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateFAQSchema } from "@/lib/seo/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = buildMetadata({
  title: "الأسئلة الشائعة | خطوة لنقل الأثاث",
  description:
    "إجابات شاملة عن أكثر الأسئلة شيوعاً حول خدمات نقل الأثاث، الأسعار، التغليف، الفك والتركيب، وضمان المقتنيات في خطوة.",
  path: "/faq",
});

const faqCategories = [
  {
    icon: Truck,
    title: "خدمات النقل",
    faqs: [
      {
        question: "ما هي الخدمات التي تقدمونها؟",
        answer:
          "نقدم باقة متكاملة تشمل: نقل الأثاث، فك وتركيب الأثاث وغرف النوم، فك وتركيب التكييفات، التغليف الاحترافي، ونش رفع الأثاث، ونقل المقتنيات الحساسة.",
      },
      {
        question: "هل تخدمون جميع محافظات مصر؟",
        answer:
          "نعم، نقدم خدماتنا في جميع محافظات مصر، مع تخصص خاص في المدن الجديدة مثل التجمع الخامس، مدينتي، الشيخ زايد، 6 أكتوبر، والقاهرة الجديدة.",
      },
      {
        question: "هل تنقلون الأثاث بين المحافظات؟",
        answer:
          "نعم، نقدم خدمة النقل بين جميع المحافظات بأسطول حديث من السيارات المجهزة، مع تأمين كامل على المقتنيات.",
      },
      {
        question: "كم تستغرق عملية نقل الأثاث؟",
        answer:
          "تختلف المدة حسب حجم المنقولات والمسافة. عادة من 4-8 ساعات لشقة متوسطة داخل نفس المدينة.",
      },
    ],
  },
  {
    icon: DollarSign,
    title: "الأسعار والدفع",
    faqs: [
      {
        question: "كيف يتم تحديد سعر النقل؟",
        answer:
          "يتم تحديد السعر بناءً على: حجم المنقولات، المسافة، الدور، الحاجة لونش رفع، والخدمات الإضافية.",
      },
      {
        question: "هل المعاينة مجانية؟",
        answer:
          "نعم، المعاينة مجانية تماماً. نرسل أحد ممثلينا لمعاينة المنقولات وتقديم عرض سعر شفاف بدون التزام.",
      },
      {
        question: "ما هي طرق الدفع المتاحة؟",
        answer:
          "نقبل الدفع النقدي، التحويل البنكي، وفودافون كاش. يمكن دفع جزء كمقدم وباقي المبلغ بعد إتمام الخدمة.",
      },
      {
        question: "هل توجد رسوم خفية؟",
        answer:
          "أبداً، نلتزم بالشفافية الكاملة. السعر المتفق عليه في المعاينة هو السعر النهائي.",
      },
      {
        question: "هل تقدمون خصومات؟",
        answer:
          "نعم، نوفر خصومات للعملاء الدائمين، الطلبات الكبيرة، والحجوزات المبكرة.",
      },
    ],
  },
  {
    icon: Box,
    title: "التغليف والحماية",
    faqs: [
      {
        question: "هل تقدمون خدمة التغليف؟",
        answer:
          "نعم، نقدم خدمة تغليف احترافية بمواد عالية الجودة تشمل فقاعات الهواء، الكرتون المقوى، والأقمشة الواقية.",
      },
      {
        question: "كيف تتعاملون مع المقتنيات الحساسة؟",
        answer:
          "لدينا فرق متخصصة في التعامل مع المقتنيات الحساسة كالزجاج، المرايا، النجف، التحف، والأنتيكات.",
      },
      {
        question: "هل تغلفون الأجهزة الإلكترونية؟",
        answer:
          "نعم، نوفر تغليف خاص للأجهزة الإلكترونية كالتلفزيونات وأجهزة الكمبيوتر لحمايتها من الصدمات.",
      },
    ],
  },
  {
    icon: Wrench,
    title: "الفك والتركيب",
    faqs: [
      {
        question: "هل تركبون جميع أنواع الأثاث؟",
        answer:
          "نعم، فرقنا متخصصة في تركيب جميع أنواع الأثاث المحلي والمستورد، بما فيها غرف النوم والمطابخ ووحدات التخزين.",
      },
      {
        question: "كم تستغرق عملية فك وتركيب غرفة النوم؟",
        answer:
          "عادة 2-4 ساعات لغرفة النوم العادية، وقد تستغرق وقت أطول للغرف الكبيرة.",
      },
      {
        question: "هل يوجد ضمان على عمليات التركيب؟",
        answer:
          "نعم، نوفر ضمان كامل على جميع عمليات الفك والتركيب. في حالة أي مشكلة، نعود لإصلاحها بدون تكلفة.",
      },
    ],
  },
  {
    icon: Wind,
    title: "التكييفات",
    faqs: [
      {
        question: "هل تفكون وتركبون التكييفات؟",
        answer:
          "نعم، لدينا فنيون متخصصون في فك ونقل وإعادة تركيب جميع أنواع التكييفات.",
      },
      {
        question: "هل تشحنون فريون التكييف؟",
        answer: "نعم، نقدم خدمة شحن الفريون لجميع أنواع التكييفات لضمان كفاءة التشغيل.",
      },
      {
        question: "هل تختبرون التكييف بعد التركيب؟",
        answer: "بالتأكيد، نختبر التكييف بعد التركيب للتأكد من عمله بكفاءة.",
      },
    ],
  },
  {
    icon: ArrowUpToLine,
    title: "ونش الرفع",
    faqs: [
      {
        question: "متى أحتاج لونش رفع الأثاث؟",
        answer:
          "في الأدوار العالية، الشوارع الضيقة، السلالم الضيقة، أو الأثاث الكبير الذي لا يمر من السلم.",
      },
      {
        question: "ما الحد الأقصى لارتفاع الونش؟",
        answer:
          "ونشاتنا الحديثة تصل لارتفاعات عالية تكفي لمعظم الأبراج السكنية.",
      },
      {
        question: "هل الونش آمن على الأثاث؟",
        answer:
          "نعم، فنيونا مدربون على تشغيل الونش بأمان كامل، ونستخدم أحزمة وحاويات خاصة لحماية الأثاث.",
      },
    ],
  },
  {
    icon: Gem,
    title: "الضمان والتأمين",
    faqs: [
      {
        question: "هل هناك ضمان على المقتنيات؟",
        answer:
          "نعم، نوفر ضمان كامل على جميع المقتنيات أثناء النقل والفك والتركيب.",
      },
      {
        question: "ماذا لو حدث ضرر لأحد المقتنيات؟",
        answer:
          "نقوم بتعويض العميل بشكل كامل عن قيمة الضرر، سواء بالإصلاح أو التعويض المالي.",
      },
      {
        question: "هل لديكم تأمين على الفرق العاملة؟",
        answer: "نعم، جميع فرقنا مؤمن عليها بالكامل.",
      },
    ],
  },
  {
    icon: HelpCircle,
    title: "الحجز والمواعيد",
    faqs: [
      {
        question: "كيف يمكنني الحجز؟",
        answer:
          "يمكنك الحجز بثلاث طرق: الاتصال الهاتفي، رسالة واتساب، أو ملء نموذج الحجز على الموقع.",
      },
      {
        question: "هل تعملون في الإجازات والعطلات؟",
        answer:
          "نعم، نعمل 24 ساعة طوال أيام الأسبوع بما فيها الجمعة والإجازات الرسمية.",
      },
      {
        question: "كم يجب أن أحجز مقدماً؟",
        answer:
          "ننصح بالحجز قبل الموعد بـ 2-3 أيام. لكننا نقبل الحجز الفوري في حالات الطوارئ.",
      },
      {
        question: "هل يمكن تأجيل الموعد بعد الحجز؟",
        answer:
          "نعم، يمكن تأجيل الموعد بشرط إبلاغنا قبل 24 ساعة على الأقل.",
      },
    ],
  },
];

export default function FAQPage() {
  const allFAQs = faqCategories.flatMap((cat) => cat.faqs);
  const faqSchema = generateFAQSchema(allFAQs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F4F44] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8E3D9] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/5 text-[#E8E3D9] border border-white/10 mb-5 px-4 py-1.5">
              <HelpCircle className="w-3 h-3 ml-1.5" />
              الأسئلة الشائعة
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight">
              كل ما تريد
              <br />
              <span className="text-[#E8E3D9]">معرفته</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              إجابات شاملة عن أكثر الأسئلة شيوعاً حول خدماتنا
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#F5F2EC] border-b border-[#E5E1DA]">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-[#3F4F44]">30+</div>
              <div className="text-xs text-[#6B6B6B]">سؤال شائع</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#3F4F44]">8</div>
              <div className="text-xs text-[#6B6B6B]">أقسام رئيسية</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#3F4F44]">24/7</div>
              <div className="text-xs text-[#6B6B6B]">دعم فوري</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#3F4F44]">100%</div>
              <div className="text-xs text-[#6B6B6B]">شفافية تامة</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-12">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white text-[#E8E3D9] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-sm text-[#6B6B6B] mt-1">
                      {category.faqs.length} أسئلة في هذا القسم
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`cat-${catIndex}-item-${i}`}
                      className="bg-[#F5F2EC] rounded-2xl border border-[#E5E1DA] px-5 hover:border-[#3F4F44] transition-colors"
                    >
                      <AccordionTrigger className="text-right font-bold text-slate-900 hover:text-[#3F4F44] py-5 text-sm md:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#6B6B6B] leading-relaxed pb-5 text-sm md:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3F4F44] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/5 text-[#E8E3D9] border border-white/10 mb-5 px-4 py-1.5">
              <Sparkles className="w-3 h-3 ml-1.5" />
              لم تجد إجابتك؟
            </Badge>

            <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight leading-tight">
              فريق دعم <span className="text-[#E8E3D9]">جاهز لمساعدتك</span>
            </h2>

            <p className="text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا بأي طريقة تناسبك وسنرد على استفساراتك خلال دقائق
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-[#E8E3D9] hover:bg-[#D4CCB8] text-slate-900 p-6 rounded-2xl transition-all hover:shadow-xl group"
              >
                <Phone className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-lg mb-1">اتصل بنا</div>
                <div className="text-sm opacity-70" dir="ltr">
                  {siteConfig.phone}
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/20 text-white p-6 rounded-2xl transition-all hover:shadow-xl group backdrop-blur"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-lg mb-1">واتساب</div>
                <div className="text-sm text-white/60">رد فوري على رسائلك</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}