import { testimonials as staticTestimonials } from "@/config/testimonials";

export interface TestimonialItem {
  id: string | number;
  name: string;
  role?: string;
  text: string;
  rating: number;
  image?: string;
  area?: string;
  isGoogle?: boolean;
}

export async function getGoogleReviews(): Promise<{
  rating: number;
  userRatingCount: number;
  reviews: TestimonialItem[];
} | null> {
  // إرجاع التقييمات الثابتة مباشرة بدون أي API خارجي أو مدفوع
  return {
    rating: 4.9,
    userRatingCount: staticTestimonials.length || 15,
    reviews: staticTestimonials,
  };
}