import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, BookOpen, Sparkles, Phone, MessageCircle } from "lucide-react";
import { blogPosts, blogCategories } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "المدونة | نصائح وأدلة نقل الأثاث",
  description:
    "اكتشف أحدث المقالات والنصائح حول نقل الأثاث، التغليف الاحترافي، فك وتركيب التكييفات، وخدمات النقل في المدن الجديدة.",
  path: "/blog",
});

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const restPosts = blogPosts.slice(1);

  return (
    <main className="bg-[#FAF8F5] min-h-screen">

      {/* ════ HERO ════ */}
      <section className="bg-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-800 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative container-custom py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-emerald-900/80 text-emerald-200 border border-emerald-400/30 mb-5 px-4 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              مدونة خطوة
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              نصائح وأدلة من
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300">
                خبراء النقل
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-emerald-100/80 leading-relaxed max-w-2xl mx-auto">
              مقالات عملية وإجابات مباشرة من خبرة سنوات في نقل الأثاث بالمدن الجديدة والكمبوندات
            </p>
          </div>
        </div>
      </section>

      {/* ════ FEATURED POST ════ */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-8 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">المقال المميز</span>
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <article className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-stone-200/70 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-500">
              {/* Image */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-stone-100">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  quality={75}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/95 backdrop-blur-sm text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                    {blogCategories.find((c) => c.slug === featuredPost.category)?.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {new Date(featuredPost.publishedAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    {featuredPost.readTime} دقائق قراءة
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-emerald-800 transition-colors tracking-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm group-hover:gap-3 transition-all">
                  اقرأ المقال كاملاً
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* ════ CATEGORIES ════ */}
      <section className="pb-4">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {blogCategories.map((cat) => (
              <span
                key={cat.slug}
                className="bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-default"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════ ALL POSTS GRID ════ */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
              جميع المقالات
            </h2>
            <p className="text-sm text-slate-500">{blogPosts.length} مقال احترافي في خدمتك</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {restPosts.map((post) => {
              const category = blogCategories.find((c) => c.slug === post.category);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200/70 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        quality={65}
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/95 backdrop-blur-sm text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                          {category?.name}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-400 mb-3 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("ar-EG", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime} د
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                        اقرأ المزيد
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="bg-emerald-950 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                هل لديك سؤال عن نقل أثاثك؟
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/75 mb-8 max-w-lg mx-auto leading-relaxed">
                تواصل معنا للحصول على استشارة مجانية وعرض سعر شفاف يناسب احتياجاتك
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm sm:text-base transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Phone className="w-4 h-4" />
                  اتصل الآن
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
