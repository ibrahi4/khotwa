import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Calendar, Clock, ArrowLeft, Phone, MessageCircle,
  User, Tag, Share2, BookOpen, ChevronLeft,
} from "lucide-react";
import { blogPosts, blogCategories } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  generateBlogPostSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    author: post.author,
  });
}

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

  // Convert markdown-like content to sections
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-[#FAF5EE] border-b border-[#E5E7EB]">
        <div className="container-custom py-3">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-[#64748B] flex-wrap">
            <Link href="/" className="hover:text-[#E85D04] transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link href="/blog" className="hover:text-[#E85D04] transition-colors">المدونة</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#1C1C1C] font-semibold line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-[#1C1C1C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            quality={75}
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/80 to-[#1C1C1C]/50" />
        </div>

        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {category && (
              <Badge className="bg-[#E85D04] text-white border-0 mb-5 px-4 py-1.5">
                <Tag className="w-3 h-3 ml-1.5" />
                {category.name}
              </Badge>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#E85D04]" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#E85D04]" />
                <span>{new Date(post.publishedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E85D04]" />
                <span>{post.readTime} دقائق قراءة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {sections.map((section, i) => {
                if (section.type === "intro") {
                  return (
                    <div key={i} className="mb-8">
                      {section.content.split("\n\n").map((paragraph, j) => (
                        <p key={j} className="text-base md:text-lg text-[#1C1C1C]/80 leading-loose mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={i} className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-5 pb-3 border-b-2 border-[#E85D04]/20">
                      {section.title}
                    </h2>
                    <div>
                      {section.content.split("\n\n").map((block, j) => {
                        if (block.startsWith("### ")) {
                          return (
                            <h3 key={j} className="text-xl md:text-2xl font-bold text-[#1C1C1C] mt-6 mb-3">
                              {block.replace("### ", "")}
                            </h3>
                          );
                        }
                        if (block.startsWith("- ")) {
                          const items = block.split("\n").filter((l) => l.startsWith("- "));
                          return (
                            <ul key={j} className="space-y-2 my-4 pr-6">
                              {items.map((item, k) => (
                                <li key={k} className="text-base text-[#1C1C1C]/80 leading-relaxed relative before:absolute before:right-[-1rem] before:top-3 before:w-1.5 before:h-1.5 before:bg-[#E85D04] before:rounded-full">
                                  {item.replace("- ", "")}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={j} className="text-base md:text-lg text-[#1C1C1C]/80 leading-loose mb-4">
                            {block}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {post.keywords && post.keywords.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-[#E85D04]" />
                  <span className="text-sm font-bold text-[#1C1C1C]">الكلمات المفتاحية:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="border-[#E5E7EB] text-[#64748B]">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Card className="mt-12 bg-[#1C1C1C] border-0 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D04]/10 rounded-full blur-3xl" />
              <CardContent className="p-8 md:p-10 relative text-center">
                <h3 className="text-2xl md:text-3xl font-black mb-3">
                  هل تحتاج إلى خدماتنا؟
                </h3>
                <p className="text-white/60 mb-6 max-w-xl mx-auto">
                  تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر يناسب احتياجاتك
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold h-12 px-6 rounded-md text-sm">
                    <Phone className="w-4 h-4" />
                    اتصل الآن
                  </a>
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-12 px-6 rounded-md text-sm">
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </a>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section-padding bg-[#FAF5EE]">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
                  <BookOpen className="w-3 h-3 ml-1" />
                  مقالات مشابهة
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] tracking-tight">
                  اقرأ أيضاً
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                    <Card className="h-full overflow-hidden hover:shadow-lg hover:border-[#E85D04] transition-all border-[#E5E7EB] bg-white">
                      <div className="relative aspect-video overflow-hidden bg-[#FAF5EE]">
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(rp.publishedAt).toLocaleDateString("ar-EG", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rp.readTime} د
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1C1C1C] mb-2 group-hover:text-[#E85D04] transition-colors line-clamp-2">
                          {rp.title}
                        </h3>
                        <p className="text-xs text-[#64748B] line-clamp-2 mb-3">
                          {rp.excerpt}
                        </p>
                        <span className="text-[#E85D04] text-xs font-bold flex items-center gap-1">
                          اقرأ المقال
                          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button asChild variant="outline" className="border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white h-12 px-6">
                  <Link href="/blog">
                    <BookOpen className="w-4 h-4 ml-2" />
                    كل المقالات
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
