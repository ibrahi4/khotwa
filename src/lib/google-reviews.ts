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
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyCy6kgqi_ZLHity_ZjfU14dluJzoz9mHdE";
  const placeId = process.env.GOOGLE_PLACE_ID || "ChIJR2d2u3hrMRQR0JMFunpO_GA";

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=ar`;
    
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount",
      },
    });

    const data = await res.json();

    if (data.error) {
       console.error("Google API Error:", data.error.message);
       return null;
    }
    
    const googleReviews: TestimonialItem[] = (data.reviews || []).map((r: any, idx: number) => ({
      id: `google-${idx}`,
      name: r.authorAttribution?.displayName || "عميل خطوة",
      text: r.text?.text || "خدمة ممتازة ونقل احترافي بدقة ومواعيد مظبوطة.",
      rating: r.rating || 5,
      image: r.authorAttribution?.photoUri || "/logo.webp",
      area: r.relativePublishTimeDescription || "تقييم على جوجل",
      isGoogle: true,
    }));

    return {
      rating: data.rating || 4.5,
      userRatingCount: data.userRatingCount || 8,
      reviews: googleReviews,
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}