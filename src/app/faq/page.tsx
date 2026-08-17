import {
  HelpCircle, Phone, MessageCircle, Sparkles,
  Truck, Wrench, Wind, Box, ArrowUpToLine, Gem, DollarSign,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { generateFAQSchema } from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = buildMetadata({
  title: "الأسئلة الشائعة | خطوة لنقل الأثاث",
  description:
    "إجابات مفصلة عن جميع أسئلتك حول نقل الأثاث، الأسعار، التغليف، الفك والتركيب، الضمان، ومواعيد العمل. كل ما تحتاج معرفته قبل حجز خدمتك من خطوة.",
  path: "/faq",
});

const faqCategories = [
  {
    icon: Truck,
    title: "خدمات النقل",
    intro: "كل ما يتعلق بعمليات نقل الأثاث، التغطية الجغرافية، والمدة الزمنية",
    faqs: [
      {
        question: "ما هي الخدمات التي تقدمها خطوة لنقل الأثاث؟",
        answer:
          "نقدم باقة متكاملة من الخدمات تشمل: نقل الأثاث المنزلي والمكتبي بأسطول حديث من السيارات، فك وتركيب جميع أنواع الأثاث المحلي والمستورد، فك ونقل وتركيب التكييفات مع شحن الفريون، التغليف الاحترافي بمواد عالية الجودة، ونش رفع الأثاث للأدوار العالية، ونقل المقتنيات الحساسة كالتحف والنجف والزجاج.",
      },
      {
        question: "هل تخدمون جميع محافظات مصر؟",
        answer:
          "نعم، نقدم خدماتنا في جميع محافظات مصر مع تركيز خاص على المدن الجديدة والكمبوندات الفاخرة. نمتلك فرقاً محلية في التجمع الخامس، القاهرة الجديدة، مدينتي، الشيخ زايد، 6 أكتوبر، الرحاب، الشروق، العاصمة الإدارية، ومدينة المستقبل. كما نقدم خدمات النقل بين المحافظات بسيارات مؤمّنة.",
      },
      {
        question: "كم تستغرق عملية نقل الأثاث عادةً؟",
        answer:
          "تختلف المدة حسب حجم المنقولات والمسافة وطبيعة العقار. الشقة المتوسطة (3 غرف) داخل نفس المدينة تستغرق عادة 4-6 ساعات، بينما الفيلا الكبيرة قد تحتاج يوماً كاملاً أو يومين. النقل بين المحافظات يستغرق يوماً كاملاً في معظم الحالات. نحدد المدة بدقة خلال المعاينة المجانية.",
      },
      {
        question: "هل يمكنكم النقل في نفس اليوم؟",
        answer:
          "في معظم الحالات نعم، خاصة داخل القاهرة الكبرى. نستطيع الاستجابة خلال ساعات من الاتصال عند توفر الفرق. للنقلات الكبيرة أو بين المحافظات، ننصح بالحجز قبل 24-48 ساعة لضمان جاهزية الفريق المناسب.",
      },
      {
        question: "هل تنقلون المكاتب والشركات؟",
        answer:
          "بالتأكيد، لدينا خبرة واسعة في نقل المكاتب والشركات بكافة أحجامها. نتعامل مع الأثاث المكتبي، أجهزة الكمبيوتر، الملفات، والمعدات المكتبية بطريقة منظمة تضمن استئناف العمل بأسرع وقت. نوفر خدمة النقل في المساء أو عطلات نهاية الأسبوع لتجنب تعطيل العمل.",
      },
    ],
  },
  {
    icon: DollarSign,
    title: "الأسعار والدفع",
    intro: "معلومات شفافة عن التسعير، طرق الدفع، والعروض المتاحة",
    faqs: [
      {
        question: "كيف يتم تحديد سعر نقل الأثاث؟",
        answer:
          "نحدد السعر بناءً على عدة عوامل: حجم المنقولات وعدد الغرف، المسافة بين موقع النقل والوجهة، الدور ووجود مصعد من عدمه، الحاجة لونش رفع الأثاث، الخدمات الإضافية المطلوبة كالتغليف والفك والتركيب، ومستوى الخدمة (عادية أو VIP). المعاينة المجانية تسمح بتقييم دقيق وتقديم عرض سعر نهائي.",
      },
      {
        question: "هل المعاينة مجانية فعلاً بدون التزام؟",
        answer:
          "نعم، المعاينة مجانية 100% وبدون أي التزام. نُرسل أحد ممثلينا المتخصصين لموقعك في الموعد المناسب لك، يقوم بتقييم المنقولات وتقديم عرض سعر مكتوب ومفصل. أنت حر تماماً في قبول العرض أو رفضه، ولن نطلب منك دفع أي رسوم مقابل المعاينة.",
      },
      {
        question: "ما هي طرق الدفع المتاحة؟",
        answer:
          "نوفر مرونة كاملة في طرق الدفع لراحة عملائنا: الدفع النقدي عند إتمام الخدمة، التحويل البنكي على حسابنا، فودافون كاش، ومحافظ الدفع الإلكتروني. يمكن دفع مقدم بسيط عند تأكيد الحجز وباقي المبلغ بعد اكتمال العملية بشكل مُرضٍ.",
      },
      {
        question: "هل توجد رسوم خفية أو مفاجآت في الفاتورة النهائية؟",
        answer:
          "أبداً، الشفافية الكاملة من أهم قيمنا. السعر الذي نتفق عليه في عرض السعر المكتوب هو السعر النهائي بالضبط. جميع التكاليف مشمولة: النقل، الفك، التركيب، التغليف، الونش إن وُجد، والعمالة. لا نضيف أي رسوم إضافية إلا في حالة طلبك لخدمات إضافية غير متفق عليها مسبقاً.",
      },
      {
        question: "هل تقدمون خصومات أو عروضاً خاصة؟",
        answer:
          "نعم، نقدم عدة أنواع من الخصومات: خصومات للعملاء الدائمين، عروض خاصة للحجوزات المبكرة، أسعار تفضيلية للطلبات الكبيرة والفلل، وعروض موسمية في أوقات مختلفة من السنة. تواصل معنا للاستفسار عن العروض الحالية المتاحة.",
      },
    ],
  },
  {
    icon: Box,
    title: "التغليف والحماية",
    intro: "معايير الجودة العالية في تغليف وحماية أثاثك ومقتنياتك",
    faqs: [
      {
        question: "ما نوع مواد التغليف التي تستخدمونها؟",
        answer:
          "نستخدم مواد تغليف عالية الجودة مستوردة من أفضل الماركات العالمية: فقاعات هوائية متعددة الطبقات للأجهزة الحساسة، كرتون مقوى ثلاثي الطبقات للأثاث الكبير، أقمشة واقية ناعمة للأسطح المصقولة، بطاطين خاصة للأثاث الفاخر، شرائط لاصقة قوية، وأكياس بلاستيكية مخصصة لكل نوع من المقتنيات.",
      },
      {
        question: "كيف تتعاملون مع المقتنيات الثمينة والأنتيكات؟",
        answer:
          "لدينا فريق متخصص للتعامل مع المقتنيات الحساسة والثمينة. نستخدم صناديق مخصصة لكل قطعة، تغليف متعدد الطبقات بمواد خاصة، سيارات نقل مجهزة بأنظمة تخفيف الاهتزاز، وتوثيق كامل بالصور قبل النقل. كل قطعة ثمينة تحصل على تأمين إضافي يغطي قيمتها الفعلية.",
      },
      {
        question: "هل تغلفون الأجهزة الإلكترونية والكهربائية؟",
        answer:
          "نعم، الأجهزة الإلكترونية تحتاج عناية خاصة. نقوم بفصل جميع الكابلات وتصنيفها بشكل منظم، تغليف كل جهاز بفقاعات هوائية سميكة ثم صناديق مقواة، تثبيت الشاشات والتلفزيونات بمواد خاصة، والتأكد من نقل الثلاجات والغسالات بوضعية صحيحة تحمي المحرك.",
      },
    ],
  },
  {
    icon: Wrench,
    title: "الفك والتركيب",
    intro: "خبرة متخصصة في جميع أنواع الأثاث المحلي والمستورد",
    faqs: [
      {
        question: "هل تركبون جميع أنواع الأثاث؟",
        answer:
          "نعم، فرقنا مدربة على تركيب جميع أنواع الأثاث المحلي والمستورد. لدينا خبرة في الأثاث الإيطالي والألماني والتركي، غرف النوم بجميع أنواعها، المطابخ الأمريكية والإيطالية، وحدات التخزين المدمجة، الدواليب الجرار والمفصلية، وحدات التلفزيون، أثاث الأطفال، والأثاث المكتبي.",
      },
      {
        question: "كم يستغرق فك وتركيب غرفة النوم الكاملة؟",
        answer:
          "غرفة النوم العادية تحتاج 2-3 ساعات للفك و3-4 ساعات للتركيب، أي 5-7 ساعات إجمالاً. غرف النوم الفاخرة أو المستوردة قد تحتاج وقتاً أطول بسبب دقة تفاصيلها. المطابخ الأمريكية الكبيرة قد تحتاج يوماً كاملاً. نلتزم بالمواعيد المتفق عليها ونتجنب الاستعجال لضمان الجودة.",
      },
      {
        question: "هل يوجد ضمان على أعمال التركيب؟",
        answer:
          "نعم، نقدم ضماناً كاملاً على جميع أعمال الفك والتركيب. في حالة ظهور أي مشكلة نتيجة عملية التركيب، نعود لإصلاحها فوراً وبدون أي تكلفة إضافية. هذا الضمان يشمل ثبات القطع، دقة التركيب، وسلامة جميع الوصلات والمفصلات.",
      },
    ],
  },
  {
    icon: Wind,
    title: "خدمات التكييفات",
    intro: "فنيون معتمدون للتعامل مع جميع أنواع وماركات التكييفات",
    faqs: [
      {
        question: "هل تفكون وتركبون جميع أنواع التكييفات؟",
        answer:
          "نعم، لدينا فنيون متخصصون في التعامل مع جميع أنواع وماركات التكييفات: تكييفات الشباك، السبليت، الكاسيت، الدولاب، والتكييفات المركزية. نتعامل مع جميع الماركات المحلية والعالمية بنفس مستوى الاحترافية والدقة.",
      },
      {
        question: "هل تقدمون خدمة شحن الفريون؟",
        answer:
          "بالتأكيد، نقدم خدمة شحن الفريون بأنواعه المختلفة (R22, R410A, R32) وفقاً لنوع التكييف. نستخدم فريون أصلي من الموردين المعتمدين لضمان كفاءة التبريد وحماية الجهاز. الأسعار تنافسية وشفافة بدون رسوم إضافية.",
      },
      {
        question: "هل تختبرون التكييف بعد التركيب للتأكد من عمله؟",
        answer:
          "دائماً، الاختبار جزء أساسي من خدمتنا. بعد التركيب نُشغّل التكييف ونقيس درجة التبريد، نتحقق من عدم وجود تسريب في المواسير، نتأكد من صحة التوصيلات الكهربائية، ونضبط الجهاز على الوضع الأمثل. لا نُغادر الموقع إلا بعد التأكد من عمل التكييف بكفاءة كاملة.",
      },
    ],
  },
  {
    icon: ArrowUpToLine,
    title: "خدمة ونش الرفع",
    intro: "حلول احترافية للأدوار العالية والأماكن ذات الوصول الصعب",
    faqs: [
      {
        question: "متى أحتاج إلى استخدام ونش لرفع الأثاث؟",
        answer:
          "الونش ضروري في عدة حالات: الأدوار العالية (من الدور 4 فما فوق)، الشوارع الضيقة التي لا تسمح بمرور عربات النقل، السلالم الضيقة التي لا يمر منها الأثاث الكبير، الأثاث ذو الحجم الكبير مثل الأرائك والدواليب الكبيرة، والفلل ذات المداخل الصعبة. المعاينة تحدد الحاجة للونش من عدمها.",
      },
      {
        question: "ما هو الحد الأقصى للارتفاع الذي يصل إليه الونش؟",
        answer:
          "أوناشنا الحديثة تصل لارتفاعات تكفي معظم الأبراج السكنية في القاهرة، حتى الدور 15 تقريباً. للارتفاعات الأعلى، نستخدم حلولاً متخصصة يتم دراستها لكل حالة على حدة. لدينا أوناش بأحجام مختلفة تناسب جميع الظروف.",
      },
      {
        question: "هل استخدام الونش آمن تماماً على الأثاث؟",
        answer:
          "بالتأكيد، فنيونا مدربون على تشغيل الأوناش بأعلى معايير السلامة. نستخدم أحزمة تثبيت متعددة، حاويات خاصة للقطع الحساسة، وأنظمة رفع بطيئة ومحكمة. جميع الأوناش تخضع لصيانة دورية وفحص شامل قبل كل استخدام لضمان سلامتها.",
      },
    ],
  },
  {
    icon: Gem,
    title: "الضمان والتأمين",
    intro: "حماية شاملة لممتلكاتك مع تغطية تأمينية كاملة",
    faqs: [
      {
        question: "هل هناك ضمان على مقتنياتي أثناء النقل؟",
        answer:
          "نعم، جميع مقتنياتك مؤمّنة بالكامل من لحظة الاستلام حتى التسليم. التأمين يشمل النقل، الفك، التركيب، والتغليف. في حالة أي ضرر يحدث بسبب إهمال من فريقنا، نتحمل المسؤولية الكاملة سواء بالإصلاح الفوري أو التعويض المالي حسب طبيعة الضرر.",
      },
      {
        question: "ماذا لو حدث ضرر لأحد المقتنيات؟",
        answer:
          "في الحالات النادرة لحدوث أي ضرر، نتبع إجراءات واضحة: توثيق فوري للضرر بالصور، تقييم مستقل لقيمة القطعة، محاولة إصلاح القطعة إذا كان ممكناً، أو تعويض العميل بالكامل عن قيمة القطعة. الشفافية والمسؤولية هما أساس تعاملنا.",
      },
      {
        question: "هل يشمل الضمان القطع الثمينة والأنتيكات؟",
        answer:
          "نعم، القطع الثمينة تحصل على تأمين إضافي يغطي قيمتها الفعلية. نطلب تقييماً مسبقاً للقطع النادرة أو باهظة الثمن لتحديد قيمتها في وثيقة التأمين. هذا يمنحك راحة بال كاملة عند نقل ممتلكاتك الأكثر قيمة.",
      },
    ],
  },
  {
    icon: HelpCircle,
    title: "الحجز والمواعيد",
    intro: "مرونة كاملة في الحجز والتنسيق لتلبية جميع احتياجاتك",
    faqs: [
      {
        question: "ما هي أفضل طريقة للحجز؟",
        answer:
          `يمكنك الحجز بأربع طرق: الاتصال الهاتفي المباشر على ${siteConfig.phone} للرد الفوري، رسالة واتساب على نفس الرقم للاستفسارات، ملء نموذج الحجز على موقعنا الإلكتروني، أو زيارة أحد مكاتبنا. جميع الطرق تُوصلك بنفس فريق خدمة العملاء المُدرّب.`,
      },
      {
        question: "هل تعملون في الإجازات والعطلات الرسمية؟",
        answer:
          "نعم، نعمل 24 ساعة طوال أيام الأسبوع دون استثناء، بما في ذلك يوم الجمعة والعطلات الرسمية والأعياد. هذا يمنحك مرونة كاملة في اختيار الموعد المناسب لك دون رسوم إضافية على العمل في العطلات.",
      },
      {
        question: "كم قبل الموعد يجب أن أحجز؟",
        answer:
          "ننصح بالحجز قبل الموعد بـ 2-3 أيام لضمان توفر الفريق المناسب والوقت الكافي للتحضير. للنقلات الكبيرة أو الفلل، فترة الحجز المُثلى هي أسبوع مسبقاً. في حالات الطوارئ، نبذل قصارى جهدنا للاستجابة السريعة حتى في نفس اليوم.",
      },
      {
        question: "هل يمكن تأجيل أو تعديل موعد النقل بعد الحجز؟",
        answer:
          "نعم، نتفهم أن الظروف قد تتغير. يمكن تأجيل أو تعديل الموعد بشرط إبلاغنا قبل الموعد بـ 24 ساعة على الأقل، وبدون أي رسوم إضافية. في حالة التأجيلات المتكررة أو الإلغاء قبل الموعد بوقت قصير، قد نطبق سياسة رسوم بسيطة لتعويض تجهيز الفرق.",
      },
    ],
  },
];

export default function FAQPage() {
  const allFAQs = faqCategories.flatMap((cat) => cat.faqs);
  const faqSchema = generateFAQSchema(allFAQs);
  const totalQuestions = allFAQs.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label="الأسئلة الشائعة"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px]" />
        </div>

        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
              <HelpCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
              {totalQuestions}+ سؤال مُجاب
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.15] tracking-tight">
              كل ما تريد
              <span className="block text-green-400 mt-2">معرفته عن خدماتنا</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              جمعنا لك أكثر الأسئلة شيوعاً مع إجابات مفصلة وصادقة. إذا لم تجد إجابة سؤالك،
              فريقنا متاح على مدار الساعة للرد على استفساراتك.
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

      {/* ═══════════════ QUICK STATS ═══════════════ */}
      <section className="bg-white border-b border-green-100/60" aria-label="إحصائيات">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black text-green-700 tabular-nums">
                {totalQuestions}+
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">سؤال شائع</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-green-700 tabular-nums">
                {faqCategories.length}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">أقسام رئيسية</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-green-700">24/7</div>
              <div className="text-xs text-slate-500 font-medium mt-1">دعم فوري</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-green-700">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">شفافية تامة</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ CATEGORIES ═══════════════ */}
      <section className="section-padding bg-green-50/30">
        <div className="container-custom">
          <div className="space-y-12 max-w-4xl mx-auto">
            {faqCategories.map((category, catIndex) => {
              const CatIcon = category.icon;
              return (
                <section key={catIndex} aria-labelledby={`cat-${catIndex}-heading`}>
                  <header className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-700/20 shrink-0">
                      <CatIcon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div>
                      <h2
                        id={`cat-${catIndex}-heading`}
                        className="text-2xl md:text-3xl font-black text-green-950 tracking-tight leading-tight"
                      >
                        {category.title}
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {category.intro}
                      </p>
                    </div>
                  </header>

                  <Accordion type="single" collapsible className="space-y-3">
                    {category.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`cat-${catIndex}-item-${i}`}
                        className="bg-white rounded-2xl border border-green-100/60 px-5 hover:border-green-300 transition-colors"
                      >
                        <AccordionTrigger className="text-right font-bold text-green-950 hover:text-green-700 py-5 text-sm md:text-base">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm md:text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT CTA ═══════════════ */}
      <section
        className="section-padding bg-gradient-to-br from-green-800 via-green-900 to-green-950 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/15 backdrop-blur-md text-white border-white/25 mb-6 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              لم تجد إجابتك؟
            </Badge>

            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight"
            >
              فريق الدعم
              <span className="block text-green-300 mt-2">جاهز لخدمتك على مدار الساعة</span>
            </h2>

            <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              تواصل معنا بأي وقت وبأي طريقة تناسبك، وسنرد على استفساراتك خلال دقائق
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href={`tel:${siteConfig.phone}`}
                className="group bg-white hover:bg-green-50 text-green-900 p-6 rounded-2xl transition-all hover:shadow-2xl"
              >
                <Phone className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div className="font-bold text-lg mb-1">اتصل بنا</div>
                <div className="text-sm opacity-70 tabular-nums" dir="ltr">
                  {siteConfig.phone}
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl transition-all hover:shadow-2xl shadow-lg shadow-green-500/30"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div className="font-bold text-lg mb-1">واتساب مباشر</div>
                <div className="text-sm opacity-90">رد فوري خلال دقائق</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}