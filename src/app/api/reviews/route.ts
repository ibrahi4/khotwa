import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

export async function GET() {
  try {
    const data = await getGoogleReviews();
    return NextResponse.json(data || { rating: 4.5, userRatingCount: 8, reviews: [] });
  } catch {
    return NextResponse.json({ rating: 4.5, userRatingCount: 8, reviews: [] });
  }
}
