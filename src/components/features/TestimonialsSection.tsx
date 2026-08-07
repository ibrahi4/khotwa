"use client";

import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Star, ThumbsUp, MessageSquare, Shield, Filter,
  MapPin, Building2, CheckCircle2, User,
  Send, Loader2, Award, TrendingUp, Sparkles, Clock,
} from "lucide-react";
import { reviews, getRatingStats, filterReviews, type Review } from "@/config/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog";

type FilterType = "all" | "5" | "4" | "3" | "with-reply";
type SortType = "newest" | "oldest" | "highest" | "helpful";

const avatarColors = [
  "bg-[#E85D04]", "bg-[#1C1C1C]", "bg-[#059669]",
  "bg-[#7C3AED]", "bg-[#DC2626]", "bg-[#2563EB]",
];

function getAvatarColor(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "الآن";
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffDays === 0) return "اليوم";
  if (diffDays === 1) return "أمس";
  if (diffDays < 7) return `منذ ${diffDays} أيام`;
  if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
  if (diffDays < 365) return `منذ ${Math.floor(diffDays / 30)} أشهر`;
  return `منذ ${Math.floor(diffDays / 365)} سنة`;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= rating ? "fill-[#FFA500] text-[#FFA500]" : "fill-[#E5E7EB] text-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

// ============ Pending Review Card (Temporary) ============
function PendingReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-[#059669] bg-gradient-to-br from-[#F0FDF4] to-white shadow-lg animate-slide-in relative overflow-hidden">
      {/* Success Badge Corner */}
      <div className="absolute top-0 left-0 bg-[#059669] text-white text-[10px] font-black px-3 py-1 rounded-br-2xl">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          تم النشر
        </span>
      </div>

      <CardContent className="p-5 md:p-6 pt-8">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 md:w-12 md:h-12 ${getAvatarColor(review.name)} rounded-full flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md`}>
            {review.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[#1C1C1C] text-base">{review.name}</h4>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B]">
              <MapPin className="w-3 h-3" />
              <span>{review.location}</span>
            </div>
          </div>
          <div className="text-[10px] text-[#059669] font-bold whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            الآن
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <StarRating rating={review.rating} size="md" />
          <span className="text-sm font-bold text-[#1C1C1C]">{review.rating}.0</span>
          <span className="text-[#E5E7EB]">|</span>
          <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] text-[11px] font-medium">
            {review.serviceType}
          </Badge>
        </div>

        <p className="text-sm md:text-base text-[#1C1C1C] leading-relaxed mb-4">
          {review.content}
        </p>

        <div className="bg-[#F0FDF4] border border-[#059669]/30 rounded-lg p-3 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
          <p className="text-xs text-[#64748B] leading-relaxed">
            <strong className="text-[#059669]">شكراً لك على مشاركة تجربتك!</strong> تقييمك يساعد عملاءنا الجدد على اتخاذ القرار الصحيح.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ Regular Review Card ============
function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const handleHelpful = () => {
    if (!voted) {
      setHelpful(helpful + 1);
      setVoted(true);
      toast.success("شكراً لتقييمك", { duration: 2000 });
    }
  };

  return (
    <Card className="border-[#E5E7EB] hover:border-[#E85D04]/30 hover:shadow-md transition-all bg-white">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 md:w-12 md:h-12 ${getAvatarColor(review.name)} rounded-full flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md`}>
            {review.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-[#1C1C1C] text-base">{review.name}</h4>
                  {review.verified && (
                    <Badge className="bg-[#059669]/10 text-[#059669] border border-[#059669]/20 text-[10px] px-2 py-0 h-5 gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      عميل موثق
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B]">
                  <MapPin className="w-3 h-3" />
                  <span>{review.location}</span>
                  {review.compound && (
                    <>
                      <span>•</span>
                      <Building2 className="w-3 h-3" />
                      <span>{review.compound}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-[10px] text-[#64748B] whitespace-nowrap">
                {formatDate(review.date)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <StarRating rating={review.rating} size="md" />
          <span className="text-sm font-bold text-[#1C1C1C]">{review.rating}.0</span>
          <span className="text-[#E5E7EB]">|</span>
          <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] text-[11px] font-medium">
            {review.serviceType}
          </Badge>
        </div>

        <p className="text-sm md:text-base text-[#1C1C1C] leading-relaxed mb-4">
          {review.content}
        </p>

        {review.companyReply && (
          <div className="bg-[#FAF5EE] border-r-4 border-[#E85D04] rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[#E85D04] rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-[#E85D04]">رد خطوة</span>
              <span className="text-[10px] text-[#64748B]">•</span>
              <span className="text-[10px] text-[#64748B]">{formatDate(review.companyReply.date)}</span>
            </div>
            <p className="text-sm text-[#1C1C1C] leading-relaxed">
              {review.companyReply.content}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-[#E5E7EB]">
          <button
            onClick={handleHelpful}
            disabled={voted}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              voted ? "text-[#E85D04]" : "text-[#64748B] hover:text-[#E85D04]"
            } disabled:cursor-not-allowed`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${voted ? "fill-[#E85D04]" : ""}`} />
            <span>مفيد ({helpful})</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ Review Form (Fake but Convincing) ============
function ReviewForm({
  onClose,
  onSubmitted,
}: {
  onClose: () => void;
  onSubmitted: (review: Review) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    service: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("من فضلك اختر تقييم بالنجوم");
      return;
    }

    if (formData.content.length < 20) {
      toast.error("التقييم يجب أن يكون 20 حرف على الأقل");
      return;
    }

    setIsSubmitting(true);
    setProgress(0);

    // Fake progress animation
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return p + 10;
      });
    }, 150);

    // Simulate processing
    await new Promise((r) => setTimeout(r, 2000));
    clearInterval(progressInterval);
    setProgress(100);

    // Create fake review object
    const newReview: Review = {
      id: `pending-${Date.now()}`,
      name: formData.name,
      initial: formData.name.charAt(0),
      location: formData.location,
      serviceType: formData.service,
      rating,
      date: new Date().toISOString(),
      content: formData.content,
      verified: false,
      helpful: 0,
    };

    // Success toast with company logo feel
    toast.success(
      (t) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-[#059669]" />
          </div>
          <div>
            <p className="font-black text-white text-sm">تم نشر تقييمك بنجاح!</p>
            <p className="text-xs text-white/90 mt-0.5">
              شكراً لثقتك في خطوة
            </p>
          </div>
        </div>
      ),
      {
        duration: 5000,
        style: {
          background: "linear-gradient(135deg, #059669, #10B981)",
          color: "#fff",
          padding: "16px",
          borderRadius: "16px",
          minWidth: "300px",
        },
      }
    );

    // Add to pending list
    onSubmitted(newReview);

    // Reset
    setIsSubmitting(false);
    setProgress(0);
    setRating(0);
    setFormData({ name: "", location: "", service: "", content: "" });

    setTimeout(onClose, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Progress overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="max-w-sm w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
              </div>
              <h3 className="font-black text-[#1C1C1C] text-lg mb-2">
                جاري نشر تقييمك...
              </h3>
              <p className="text-sm text-[#64748B] mb-4">
                لحظات ونعرض تقييمك للجميع
              </p>
              <div className="w-full h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E85D04] to-[#FFA500] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-[#64748B] mt-2">{progress}%</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stars */}
      <div>
        <Label className="text-[#1C1C1C] font-bold mb-3 block">
          كيف تقيّم تجربتك معنا؟ *
        </Label>
        <div className="flex items-center gap-2 justify-center bg-gradient-to-br from-[#FAF5EE] to-white p-4 rounded-2xl border border-[#E5E7EB]">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-125 active:scale-110"
            >
              <Star
                className={`w-10 h-10 md:w-12 md:h-12 transition-all ${
                  star <= (hoverRating || rating)
                    ? "fill-[#FFA500] text-[#FFA500] drop-shadow-md"
                    : "fill-[#E5E7EB] text-[#E5E7EB]"
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-center text-sm text-[#E85D04] mt-3 font-black animate-fade-in">
            {rating === 5 && "🎉 ممتاز! سعداء بإعجابك"}
            {rating === 4 && "😊 جيد جداً، شكراً لك"}
            {rating === 3 && "🙂 جيد، رأيك يهمنا"}
            {rating === 2 && "😐 نتقبل رأيك بصدر رحب"}
            {rating === 1 && "😔 آسفين، سنعمل على التحسين"}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-[#1C1C1C] font-semibold mb-2 block">
            الاسم *
          </Label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              id="name"
              type="text"
              required
              minLength={3}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="اسمك الكريم"
              className="pr-10 h-11"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="text-[#1C1C1C] font-semibold mb-2 block">
            المنطقة *
          </Label>
          <Select
            value={formData.location}
            onValueChange={(v) => setFormData({ ...formData, location: v })}
            required
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="اختر منطقتك" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="التجمع الخامس">التجمع الخامس</SelectItem>
              <SelectItem value="مدينتي">مدينتي</SelectItem>
              <SelectItem value="الشيخ زايد">الشيخ زايد</SelectItem>
              <SelectItem value="6 أكتوبر">6 أكتوبر</SelectItem>
              <SelectItem value="القاهرة الجديدة">القاهرة الجديدة</SelectItem>
              <SelectItem value="العاصمة الإدارية">العاصمة الإدارية</SelectItem>
              <SelectItem value="الرحاب">الرحاب</SelectItem>
              <SelectItem value="أخرى">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="service" className="text-[#1C1C1C] font-semibold mb-2 block">
          نوع الخدمة *
        </Label>
        <Select
          value={formData.service}
          onValueChange={(v) => setFormData({ ...formData, service: v })}
          required
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="اختر نوع الخدمة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="نقل شقة">نقل شقة</SelectItem>
            <SelectItem value="نقل فيلا">نقل فيلا</SelectItem>
            <SelectItem value="نقل مكتب">نقل مكتب</SelectItem>
            <SelectItem value="فك وتركيب أثاث">فك وتركيب أثاث</SelectItem>
            <SelectItem value="فك وتركيب تكييفات">فك وتركيب تكييفات</SelectItem>
            <SelectItem value="تغليف احترافي">تغليف احترافي</SelectItem>
            <SelectItem value="ونش رفع">ونش رفع</SelectItem>
            <SelectItem value="خدمة شاملة">خدمة شاملة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="content" className="text-[#1C1C1C] font-semibold mb-2 block">
          تقييمك التفصيلي *
        </Label>
        <Textarea
          id="content"
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="شاركنا تجربتك بالتفصيل..."
          className="min-h-32 resize-none"
          minLength={20}
          maxLength={500}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-[#64748B]">
            كلما كان تقييمك أكثر تفصيلاً، ساعدت العملاء الآخرين.
          </p>
          <p className={`text-xs font-bold ${
            formData.content.length < 20 ? "text-[#DC2626]" : "text-[#059669]"
          }`}>
            {formData.content.length}/500
          </p>
        </div>
      </div>

      <div className="bg-[#F0FDF4] border border-[#059669]/30 rounded-xl p-3 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
        <p className="text-xs text-[#64748B] leading-relaxed">
          <strong className="text-[#059669]">نشر فوري:</strong> سيظهر تقييمك مباشرة بعد الإرسال ليستفيد منه العملاء الآخرون.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || formData.content.length < 20}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] disabled:bg-[#64748B] disabled:opacity-50 text-white font-bold h-12 px-4 rounded-md text-sm transition-all disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              نشر التقييم
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 border border-[#E5E7EB] hover:bg-[#F5F5F5] text-[#1C1C1C] h-12 px-6 rounded-md text-sm font-semibold transition-all disabled:opacity-50"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}

// ============ Main Section ============
export function TestimonialsSection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [fakeCount, setFakeCount] = useState(0);

  const stats = getRatingStats();
  const filtered = useMemo(() => filterReviews(filter, sort), [filter, sort]);
  const visibleReviews = filtered.slice(0, visibleCount);

  // Fake stats (add pending)
  const displayedTotal = stats.total + fakeCount;

  const handleReviewSubmitted = (review: Review) => {
    setPendingReviews((prev) => [review, ...prev]);
    setFakeCount((c) => c + 1);

    // Remove after 30 seconds (feels like it moved to review queue)
    setTimeout(() => {
      setPendingReviews((prev) => prev.filter((r) => r.id !== review.id));
    }, 30000);
  };

  return (
    <section className="section-padding bg-[#FAF5EE]" id="reviews">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="border-[#E5E7EB] text-[#64748B] mb-4">
            <MessageSquare className="w-3 h-3 ml-1" />
            آراء عملائنا
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">
            ما يقوله عملاؤنا
          </h2>
          <p className="text-base text-[#64748B]">
            تقييمات حقيقية من عملاء استمتعوا بخدمتنا
          </p>
        </div>

        {/* Stats Summary */}
        <Card className="border-[#E5E7EB] bg-white mb-8 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center md:border-l md:border-[#E5E7EB] md:pl-6">
                <div className="text-6xl md:text-7xl font-black text-[#1C1C1C] mb-2">
                  {stats.average}
                </div>
                <StarRating rating={Math.round(stats.average)} size="lg" />
                <p className="text-sm text-[#64748B] mt-2">
                  بناءً على <strong className="text-[#1C1C1C]">{displayedTotal}</strong> تقييم
                </p>
                <Badge className="bg-[#059669]/10 text-[#059669] border border-[#059669]/20 mt-3">
                  <CheckCircle2 className="w-3 h-3 ml-1" />
                  ممتاز
                </Badge>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-bold text-[#1C1C1C] mb-3">توزيع التقييمات</p>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = stats.distribution[star] || 0;
                    const percentage = stats.percentages[star] || 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <button
                          onClick={() => setFilter(star.toString() as FilterType)}
                          className="flex items-center gap-1 text-xs font-semibold text-[#1C1C1C] hover:text-[#E85D04] transition-colors w-8"
                        >
                          <span>{star}</span>
                          <Star className="w-3 h-3 fill-[#FFA500] text-[#FFA500]" />
                        </button>
                        <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#64748B] w-12 text-left">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <TrendingUp className="w-4 h-4 text-[#059669]" />
                <span>
                  <strong className="text-[#1C1C1C]">
                    {Math.round(((stats.distribution[5] + stats.distribution[4]) / stats.total) * 100)}%
                  </strong>{" "}
                  من العملاء أوصوا بخدمتنا
                </span>
              </div>

              <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogTrigger className="inline-flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D14D00] text-white font-bold border-0 h-10 px-4 rounded-md text-sm transition-colors cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  شارك تجربتك
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-[#1C1C1C]">
                      أضف تقييمك
                    </DialogTitle>
                    <DialogDescription>
                      شاركنا تجربتك مع خطوة لنقل الأثاث. رأيك يهمنا ويساعد الآخرين.
                    </DialogDescription>
                  </DialogHeader>
                  <ReviewForm
                    onClose={() => setFormOpen(false)}
                    onSubmitted={handleReviewSubmitted}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#64748B] flex items-center gap-1">
              <Filter className="w-3 h-3" />
              تصفية:
            </span>
            {[
              { value: "all", label: "الكل" },
              { value: "5", label: "5 نجوم" },
              { value: "4", label: "4 نجوم" },
              { value: "3", label: "3 نجوم" },
              { value: "with-reply", label: "برد الشركة" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value as FilterType);
                  setVisibleCount(6);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === f.value
                    ? "bg-[#E85D04] text-white"
                    : "bg-white text-[#64748B] hover:text-[#1C1C1C] border border-[#E5E7EB]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Select value={sort} onValueChange={(v: SortType) => setSort(v)}>
            <SelectTrigger className="w-40 h-9 text-xs bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="oldest">الأقدم</SelectItem>
              <SelectItem value="highest">الأعلى تقييماً</SelectItem>
              <SelectItem value="helpful">الأكثر إفادة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews Grid - Pending First */}
        <div className="grid md:grid-cols-2 gap-5">
          {pendingReviews.map((review) => (
            <PendingReviewCard key={review.id} review={review} />
          ))}
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              className="inline-flex items-center justify-center gap-2 border border-[#E5E7EB] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white hover:border-[#1C1C1C] h-12 px-8 rounded-md text-sm font-semibold transition-all"
            >
              عرض المزيد من التقييمات ({filtered.length - visibleCount} متبقي)
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}