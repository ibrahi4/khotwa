import Image from "next/image";
import Link from "next/link";
import {
  Award, Users, Shield, Clock, CheckCircle2, Target,
  Heart, Phone, MessageCircle, MapPin, TrendingUp,
  Star, Crown, ArrowLeft, Truck, PackageCheck,
  ThumbsUp, Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "من نحن | خطوة لنقل الأثاث - قصتنا وخبرتنا في نقل الأثاث",
  description:
    "تعرف على خطوة لنقل الأثاث - شركة رائدة بخبرة أكثر من 10 سنوات في نقل الأثاث والعفش بأمان تام. نخدم التجمع الخامس ومدينتي والشيخ زايد و6 أكتوبر بفرق مدربة وسيارات مجهزة. أكثر من 500 عميل يثقون بنا.",
  path: "/about",
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "من نحن - خطوة لنقل الأثاث",
  url: `${siteConfig.url}/about`,
  mainEntity: {
    "@type": "MovingCompany",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneIntl,
    foundingDate: String(siteConfig.foundingYear),
    numberOfEmployees: "35+",
    slogan: "خبرة تصنع الفارق",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.ratings.value,
      reviewCount: siteConfig.ratings.count,
      bestRating: siteConfig.ratings.best,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-bl from-green-950 via-green-900 to-green-800"
        aria-label="من نحن"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          aria-hidden="true"
        />

        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-2 text-sm gap-2">
              <Sparkles className="w-4 h-4 text-green-400" aria-hidden="true" />
              قصتنا منذ {siteConfig.foundingYear}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.15] tracking-tight">
              خبرة تصنع
              <span className="block text-green-400 mt-2">الفارق الحقيقي</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              أكثر من {siteConfig.yearsOfExperience} سنوات في خدمة العائلات المصرية،
              ننقل أثاثك بأمان تام واحترافية عالية. من التجمع الخامس إلى مدينتي والشيخ زايد،
              نصل إليك أينما كنت.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
                  +{siteConfig.yearsOfExperience}
                </div>
                <div className="text-xs text-white/60 mt-1">سنوات خبرة</div>
              </div>
              <div className="w-px h-10 bg-white/20" aria-hidden="true" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
                  {siteConfig.ratings.count}+
                </div>
                <div className="text-xs text-white/60 mt-1">عميل راضٍ</div>
              </div>
              <div className="w-px h-10 bg-white/20" aria-hidden="true" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
                  {siteConfig.ratings.value}/5
                </div>
                <div className="text-xs text-white/60 mt-1">تقييم العملاء</div>
              </div>
            </div>
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

      {/* ═══════════════ OUR STORY ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="story-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
                قصتنا
              </p>
              <h2
                id="story-heading"
                className="text-3xl md:text-4xl font-black text-green-950 mb-6 leading-tight"
              >
                رحلتنا من {siteConfig.foundingYear} حتى اليوم
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  بدأت <strong className="text-green-950">خطوة لنقل الأثاث</strong> رحلتها
                  عام {siteConfig.foundingYear} من فكرة بسيطة وحلم كبير: أن نقدم خدمة نقل أثاث
                  تليق بالعائلة المصرية الباحثة عن الجودة والأمان. آمنّا منذ اليوم الأول أن نقل
                  الأثاث ليس مجرد نقل قطع خشبية، بل هو نقل ذكريات وأمانات يجب التعامل معها
                  بأقصى درجات العناية.
                </p>

                <p>
                  على مدار <strong className="text-green-950">أكثر من عشر سنوات</strong> من العمل
                  المتواصل، تطورت خطوة لتصبح واحدة من أبرز شركات نقل الأثاث المتخصصة في خدمة
                  الكمبوندات الراقية والمدن الجديدة. نخدم اليوم آلاف العائلات في التجمع الخامس،
                  القاهرة الجديدة، مدينتي، الشيخ زايد، 6 أكتوبر، والعاصمة الإدارية الجديدة.
                </p>

                <p>
                  نتخصص في تقديم <strong className="text-green-950">خدمة White Glove</strong> التي
                  تليق بمقتنياتكم الثمينة. فرقنا مدربة على التعامل مع الأثاث الفاخر، الأنتيكات،
                  اللوحات الفنية، والقطع الحساسة بأعلى معايير الحرفية العالمية. كل قطعة تُغلف
                  يدوياً بمواد احترافية، وتنقل بسيارات مجهزة، وتُركب في مكانها الجديد بعناية فائقة.
                </p>

                <p>
                  اليوم، فخورون بثقة أكثر من <strong className="text-green-950">{siteConfig.ratings.count} عميل</strong>
                  اختاروا خطوة لتكون شريكهم في أهم نقلة في حياتهم، وحصلنا على تقييم
                  <strong className="text-green-950"> {siteConfig.ratings.value} من 5</strong> نجوم
                  من عملائنا الكرام.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-100">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-green-700 mb-1 tabular-nums">
                    +{siteConfig.yearsOfExperience}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">سنوات خبرة</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-green-700 mb-1 tabular-nums">
                    {siteConfig.ratings.count}+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">عميل راضٍ</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-green-700 mb-1 tabular-nums">
                    20+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">منطقة مخدومة</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <Image
                  src="/images/gallery/fareq-3amal.webp"
                  alt="فريق خطوة أثناء تنفيذ عملية نقل أثاث احترافية"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 right-6 left-6">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-green-950 text-sm">مقرنا الرئيسي</div>
                        <div className="text-xs text-slate-600 truncate">{siteConfig.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -left-5 bg-green-700 text-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-black tabular-nums">+{siteConfig.yearsOfExperience}</div>
                  <div className="text-[10px] font-bold text-green-200">سنوات خبرة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MISSION VISION VALUES ═══════════════ */}
      <section className="section-padding bg-green-50/40" aria-labelledby="values-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              قيمنا الأساسية
            </p>
            <h2
              id="values-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              ما نؤمن به في خطوة
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              قيمنا هي البوصلة التي تحدد كل قرار وكل تفصيلة في خدماتنا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Target,
                title: "رسالتنا",
                desc: "تقديم خدمة نقل أثاث احترافية بأعلى معايير الجودة والأمان، مع الالتزام الكامل بالمواعيد وشفافية تامة في التعامل. نسعى لأن نكون الاختيار الأول عندما يفكر أي شخص في نقل أثاثه.",
              },
              {
                icon: Crown,
                title: "رؤيتنا",
                desc: "أن نصبح الاسم الأول والأكثر ثقة في مجال نقل الأثاث الفاخر في مصر، وأن نكون الشريك المفضل لسكان الكمبوندات الراقية والفلل الفاخرة في القاهرة والمدن الجديدة.",
              },
              {
                icon: Heart,
                title: "قيمنا",
                desc: "الأمانة في التعامل، الاحترافية في التنفيذ، الالتزام بالمواعيد، احترام كل قطعة أثاث كأنها ملكنا الشخصي، والشفافية الكاملة في الأسعار والخدمات المقدمة.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={i}
                  className="group bg-white border border-green-100/60 rounded-2xl p-7 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-700 transition-colors duration-300">
                    <Icon
                      className="w-7 h-7 text-green-700 group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-black text-green-950 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="section-padding bg-white" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              مميزاتنا
            </p>
            <h2
              id="why-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              لماذا يختارنا سكان الكمبوندات؟
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              8 أسباب رئيسية تجعل خطوة الخيار الأول عند نقل الأثاث
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award, title: `خبرة +${siteConfig.yearsOfExperience} سنوات`, desc: "في نقل جميع أنواع الأثاث" },
              { icon: Users, title: "فرق متخصصة", desc: "مدربة على أعلى مستوى احترافي" },
              { icon: Shield, title: "ضمان كامل", desc: "تأمين شامل على كل قطعة" },
              { icon: Clock, title: "خدمة 24/7", desc: "متاحون طوال أيام الأسبوع" },
              { icon: Truck, title: "أسطول حديث", desc: "سيارات مجهزة بالكامل" },
              { icon: CheckCircle2, title: "أسعار شفافة", desc: "بدون أي رسوم خفية" },
              { icon: Crown, title: "خدمة VIP", desc: "للكمبوندات والفلل الفاخرة" },
              { icon: MapPin, title: "تغطية شاملة", desc: "جميع محافظات مصر" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={i}
                  className="group bg-green-50/40 border border-green-100/60 rounded-2xl p-5 hover:border-green-300 hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-white border border-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-700 group-hover:border-green-700 transition-colors duration-300">
                    <Icon
                      className="w-6 h-6 text-green-700 group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-green-950 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW WE WORK ═══════════════ */}
      <section className="section-padding bg-green-50/40" aria-labelledby="how-heading">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              خطوات العمل
            </p>
            <h2
              id="how-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              كيف نعمل معك؟
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              عملية احترافية مدروسة من أول اتصال حتى تسليم أثاثك في مكانه الجديد
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                icon: Phone,
                title: "التواصل والاستفسار",
                desc: "اتصل بنا أو راسلنا على واتساب وأخبرنا باحتياجاتك بالتفصيل",
              },
              {
                step: "02",
                icon: CheckCircle2,
                title: "المعاينة المجانية",
                desc: "فريقنا يحضر للمعاينة وتقديم عرض سعر مكتوب وشفاف",
              },
              {
                step: "03",
                icon: PackageCheck,
                title: "التغليف والنقل",
                desc: "تغليف احترافي بمواد عالمية ونقل آمن بأحدث السيارات",
              },
              {
                step: "04",
                icon: ThumbsUp,
                title: "التركيب والتسليم",
                desc: "تركيب الأثاث في مكانه الجديد وتسليم المنزل جاهزاً",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={i}
                  className="group bg-white border border-green-100/60 rounded-2xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-4 left-4 text-6xl font-black text-green-100/60 group-hover:text-green-200 transition-colors leading-none">
                    {item.step}
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-700/20">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-green-950 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ RATING SPOTLIGHT ═══════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-8 md:p-12">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white/15 text-white border-white/25 mb-5 px-4 py-1.5">
                  <Star className="w-3 h-3 ml-1.5 fill-amber-300 text-amber-300" aria-hidden="true" />
                  تقييم عملائنا
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  ثقة عملائنا
                  <span className="block text-green-200 mt-1">هي شهادتنا الحقيقية</span>
                </h2>
                <p className="text-green-100/80 mb-6 leading-relaxed">
                  أرقامنا تتحدث عن جودة خدماتنا واحترافية فرقنا وثقة عملائنا الكرام بنا
                  على مدار أكثر من عشر سنوات من العمل المتواصل.
                </p>

                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-amber-300 text-amber-300"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-3xl font-black text-white mr-2 tabular-nums">
                    {siteConfig.ratings.value}
                  </span>
                  <span className="text-sm text-white/70">/ 5</span>
                </div>
                <p className="text-sm text-white/60">
                  متوسط تقييم أكثر من {siteConfig.ratings.count} عميل
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: `${siteConfig.ratings.count}+`, label: "عميل راضٍ" },
                  { value: "98%", label: "معدل الرضا" },
                  { value: `+${siteConfig.yearsOfExperience}`, label: "سنوات خبرة" },
                  { value: "24/7", label: "خدمة مستمرة" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES CTA ═══════════════ */}
      <section className="section-padding bg-green-50/40" aria-labelledby="services-cta-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-sm font-bold text-green-700 mb-3 tracking-wider uppercase">
              خدماتنا المتكاملة
            </p>
            <h2
              id="services-cta-heading"
              className="text-3xl md:text-4xl font-black text-green-950 mb-4 leading-tight"
            >
              اكتشف باقة خدماتنا الشاملة
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              نقدم 6 خدمات متكاملة تغطي كل احتياجاتك في نقل الأثاث
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              className="bg-green-700 hover:bg-green-800 text-white h-12 px-8 rounded-xl gap-2"
            >
              <Link href="/services">
                عرض جميع الخدمات
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-green-950 py-16 md:py-20"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom text-center">
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight"
          >
            جاهزون لخدمتك
            <span className="block text-green-300 mt-2">في أي وقت</span>
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            انضم لأكثر من {siteConfig.ratings.count} عميل وثقوا بخطوة في نقل أثاثهم
            بأمان واحترافية
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-900 hover:bg-green-50 h-13 px-8 rounded-2xl font-bold text-base gap-2 shadow-xl"
            >
              <a
                href={`tel:${siteConfig.phone}`}
                aria-label={`اتصل بنا على ${siteConfig.phone}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                اتصل الآن
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white h-13 px-8 rounded-2xl font-bold text-base gap-2 shadow-xl shadow-green-500/30"
            >
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل معنا عبر واتساب"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}