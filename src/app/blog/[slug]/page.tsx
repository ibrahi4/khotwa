import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Calendar, Clock, ArrowLeft, Phone, MessageCircle,
  User, Tag, ChevronLeft, Sparkles
} from "lucide-react";
import { blogPosts, blogCategories } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  generateBlogPostSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    author: post.author,
  });
}

/* دالة ذكية لتحويل علامات الماركدوان البسيطة لتنسيق HTML فخم */
const formatText = (text: string) => {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-emerald-950">$1</strong>');
  formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-emerald-600 font-bold hover:text-emerald-800 underline underline-offset-4 decoration-emerald-200 transition-colors">$1</a>');
  return formatted;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const category = blogCategories.find((c) => c.slug === post.category);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const articleSchema = generateBlogPostSchema({
    title: post.title,
    description: post.metaDescription,
    image: post.image,
    publishedAt: post.publishedAt,
    modifiedAt: post.updatedAt || post.publishedAt,
    author: post.author,
    slug: post.slug,
    readTime: post.readTime,
    keywords: post.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: siteConfig.url },
    { name: "المدونة", url: `${siteConfig.url}/blog` },
    { name: post.title, url: postUrl },
  ]);

  const sections = post.content
    .trim()
    .split(/\n## /)
    .map((section, i) => {
      if (i === 0) return { type: "intro" as const, content: section.trim() };
      const [title, ...rest] = section.split("\n");
      return {
        type: "section" as const,
        title: title.trim(),
        content: rest.join("\n").trim(),
      };
    });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-[#FAF8F5] min-h-screen pb-20">
        {/* BREADCRUMBS */}
        <div className="border-b border-stone-200/60 bg-white">
          <div className="container-custom py-4">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-emerald-700 font-medium transition-colors">الرئيسية</Link>
              <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
              <Link href="/blog" className="hover:text-emerald-700 font-medium transition-colors">المدونة</Link>
              <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="text-emerald-950 font-bold truncate max-w-[200px] sm:max-w-md">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* HERO */}
        <article>
          <header className="container-custom pt-12 md:pt-20 pb-10 max-w-4xl mx-auto text-center">
            {category && (
              <Badge className="bg-emerald-100/70 text-emerald-800 border border-emerald-200/50 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {category.name}
              </Badge>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black text-emerald-950 leading-[1.3] tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-slate-500 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-slate-700 font-bold">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>{new Date(post.updatedAt || post.publishedAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{post.readTime} دقائق قراءة</span>
              </div>
            </div>

            <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border border-stone-200/50">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                fetchPriority="high"
                quality={80}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </header>

          {/* CONTENT */}
          <div className="container-custom max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm border border-stone-100">
              {sections.map((section, i) => {
                if (section.type === "intro") {
                  return (
                    <div key={i} className="mb-10">
                      {section.content.split("\n\n").map((paragraph, j) => (
                        <p key={j} className="text-base sm:text-lg text-slate-700 leading-loose mb-5"
                           dangerouslySetInnerHTML={{ __html: formatText(paragraph) }} />
                      ))}
                    </div>
                  );
                }

                return (
                  <section key={i} className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl md:text-3xl font-black text-emerald-950 mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-emerald-500 rounded-full block shrink-0" />
                      {section.title}
                    </h2>
                    
                    <div className="space-y-5">
                      {section.content.split("\n\n").map((block, j) => {
                        if (block.startsWith("### ")) {
                          return (
                            <h3 key={j} className="text-xl font-bold text-slate-900 mt-8 mb-4">
                              {block.replace("### ", "")}
                            </h3>
                          );
                        }
                        
                        if (block.startsWith("- ") || block.startsWith("* ")) {
                          const items = block.split("\n").filter((l) => l.startsWith("- ") || l.startsWith("* "));
                          return (
                            <ul key={j} className="space-y-3 my-6 pr-2 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                              {items.map((item, k) => (
                                <li key={k} className="flex items-start gap-3 text-base sm:text-lg text-slate-700 leading-relaxed">
                                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2.5" />
                                  <span dangerouslySetInnerHTML={{ __html: formatText(item.replace(/^[-*]\s/, "")) }} />
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        
                        return (
                          <p key={j} className="text-base sm:text-lg text-slate-700 leading-loose"
                             dangerouslySetInnerHTML={{ __html: formatText(block) }} />
                        );
                      })}
                    </div>
                  </section>
                );
              })}

              {post.keywords && post.keywords.length > 0 && (
                <div className="mt-12 pt-8 border-t border-stone-200/60">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-900">مواضيع ذات صلة:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-stone-100 text-slate-600 text-xs sm:text-sm font-medium rounded-lg border border-stone-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-emerald-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10">
                <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">هل تبحث عن خدمة نقل موثوقة؟</h3>
                <p className="text-emerald-100/80 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                  نطبق كافة المعايير المذكورة في هذا المقال لضمان سلامة أثاثك. تواصل معنا لمعاينة مجانية وعرض سعر شفاف.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black h-12 px-8 rounded-xl transition-colors">
                    <Phone className="w-4 h-4" />
                    اتصل الآن
                  </a>
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold h-12 px-8 rounded-xl backdrop-blur-md transition-colors">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 border-t border-stone-200/60 pt-16">
            <div className="container-custom max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">اقرأ أيضاً</h2>
                  <p className="text-slate-500 mt-2 text-sm sm:text-base">مقالات مختارة لتسهيل عملية نقل الأثاث عليك.</p>
                </div>
                <Link href="/blog" className="hidden sm:flex items-center text-emerald-700 font-bold hover:text-emerald-900 transition-colors">
                  كل المقالات <ArrowLeft className="w-4 h-4 mr-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200/60 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wide">
                        <span className="text-emerald-600">{blogCategories.find(c => c.slug === rp.category)?.name}</span>
                        <span>•</span>
                        <span>{rp.readTime} دقائق</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-5 flex-1 leading-relaxed">
                        {rp.excerpt}
                      </p>
                      <div className="pt-4 border-t border-stone-100 flex items-center text-sm font-bold text-emerald-700">
                        متابعة القراءة <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
