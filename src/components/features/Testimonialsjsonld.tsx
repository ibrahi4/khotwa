import { testimonials } from "@/config/testimonials";

/**
 * ليه itemReviewed بيوصف "Service" مش الشركة (MovingCompany/LocalBusiness):
 *
 * جوجل من 2019 بتمنع ظهور النجوم في نتائج البحث لأي تقييم "self-serving" —
 * يعني تقييم عن شركة A متحط على موقع الشركة A نفسها. الحل مش إضافة
 * itemReviewed وخلاص، لأن حتى لو الحقل موجود، لو كان itemReviewed = الشركة
 * نفسها (LocalBusiness/Organization) جوجل مش هيوري نجوم أصلاً.
 *
 * بخليه يوصف الخدمة (Service) بدل الشركة: كده:
 *  - الخطأ الحالي ("itemReviewed غير مضمَّن") بيتحل.
 *  - الـ Schema صحيحة وصادقة 100% (كل بيانات حقيقية من ملف testimonials).
 *  - مفيش محاولة نلف على قاعدة الـ self-serving، لأن "Service" أصلاً مش من
 *    الأنواع اللي جوجل بتفعّل لها ميزة النجوم، فمفيش ادّعاء بنعمله هنا.
 *
 * لو عايز نجوم فعلية تظهر في نتائج البحث لاحقاً، الطريق الوحيد هو Google
 * Business Profile حقيقي بتقييمات حقيقية، مش تعديل في الكود ده.
 */
export function buildTestimonialsJsonLd() {
  return testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      name: t.service,
      areaServed: t.area,
      provider: {
        "@type": "MovingCompany",
        name: "خطوة لنقل الأثاث",
      },
    },
    author: {
      "@type": "Person",
      name: t.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    reviewBody: t.text,
  }));
}

/**
 * حط المكوّن ده مرة واحدة جوه TestimonialsSection (أو في أي مكان بيترندر
 * على السيرفر). استخدم <script> عادي، مش next/script — عشان محتوى JSON-LD
 * لازم يكون موجود في الـ HTML الأول من غير تأجيل، مش سكريبت بيتحمل بعدين.
 */
export function TestimonialsJsonLd() {
  const jsonLd = buildTestimonialsJsonLd();

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}