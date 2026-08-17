import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { blogPosts, blogCategories } from "@/config/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "المدونة | خطوة لنقل الأثاث",
  description:
    "اكتشف أحدث المقالات والنصائح حول نقل الأثاث، التغليف الاحترافي، فك وتركيب التكييفات، وخدمات النقل في المدن الجديدة.",
  path: "/blog",
});

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const restPosts = blogPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-white text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F4F44] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8E3D9] rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/5 text-[#E8E3D9] border border-white/10 mb-5 px-4 py-1.5">
              <BookOpen className="w-3 h-3 ml-1.5" />
              مدونة خطوة
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-tight">
              نصائح وأدلة من
              <br />
              <span className="text-[#E8E3D9]">خبراء النقل</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              مقالات احترافية ونصائح قيمة من خبرة سنوات في مجال نقل الأثاث
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-10">
            <Badge variant="outline" className="border-[#3F4F44] text-[#3F4F44] mb-3">
              <Sparkles className="w-3 h-3 ml-1.5" />
              المقال المميز
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              أحدث المقالات
            </h2>
          </div>

          <Link href={`/blog/${featuredPost.slug}`}>
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer border-[#E5E1DA]">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-[#F5F2EC]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-[#E8E3D9] border-0">
                      {blogCategories.find((c) => c.slug === featuredPost.category)?.name}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 md:p-10 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime} دقائق قراءة
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#3F4F44] transition-colors tracking-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#3F4F44] font-bold group-hover:gap-3 transition-all">
                    اقرأ المقال كاملاً
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#F5F2EC] py-8">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {blogCategories.map((cat) => (
              <div
                key={cat.slug}
                className="bg-white border border-[#E5E1DA] hover:border-[#3F4F44] text-slate-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-md transition-all cursor-pointer"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              جميع المقالات
            </h2>
            <p className="text-[#6B6B6B]">{blogPosts.length} مقال احترافي في خدمتك</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {restPosts.map((post) => {
              const category = blogCategories.find((c) => c.slug === post.category);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg hover:border-[#3F4F44] transition-all duration-300 group cursor-pointer border-[#E5E1DA]">
                    <div className="relative aspect-video overflow-hidden bg-[#F5F2EC]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white text-[#E8E3D9] border-0 text-xs">
                          {category?.name}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("ar-EG", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime} د
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-[#3F4F44] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[#3F4F44] font-bold text-sm pt-3 border-t border-[#E5E1DA]">
                        اقرأ المزيد
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F2EC] py-12 md:py-16">
        <div className="container-custom">
          <Card className="bg-white border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3F4F44] rounded-full blur-3xl" />
            </div>
            <CardContent className="p-8 md:p-12 text-center relative">
              <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">
                هل لديك سؤال؟
                <br />
                <span className="text-[#E8E3D9]">نحن هنا لمساعدتك</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                تواصل معنا للحصول على استشارة مجانية وعرض سعر يناسب احتياجاتك
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#E8E3D9] hover:bg-[#D4CCB8] text-slate-900 h-12 px-8"
              >
                <Link href="/contact">
                  تواصل معنا الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}