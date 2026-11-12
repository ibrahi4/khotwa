export interface GoogleReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  timeAgo: string;
  location?: string;
}

export const GOOGLE_BUSINESS_INFO = {
  rating: 4.9,
  reviewCount: 18,
  // رابط مباشر لصفحة كتابة التقييم عبر بحث جوجل (أكثر استقراراً)
  reviewUrl: "https://www.google.com/search?q=%D8%AE%D8%B7%D9%88%D8%A9+%D9%84%D9%86%D9%82%D9%84+%D8%A7%D9%84%D8%A3%D8%AB%D8%A7%D8%AB#lrd=0x14585748e748f7ff:0xdcfa367bbaa493d0,3",
  // رابط البحث المباشر عن الشركة لضمان ظهور الـ Knowledge Panel
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=%D8%AE%D8%B7%D9%88%D8%A9+%D9%84%D9%86%D9%82%D9%84+%D8%A7%D9%84%D8%A3%D8%AB%D8%A7%D8%AB",
};

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "1",
    name: "Ahmed Ramadan",
    rating: 5,
    text: "تجربة ممتازة، التزام تام بالمواعيد واحترافية عالية في فك وتركيب الأثاث. فريق العمل متعاون جداً والأسعار مناسبة جداً مقارنة بالجودة.",
    timeAgo: "قبل شهرين",
    location: "القاهرة الجديدة"
  },
  {
    id: "2",
    name: "Mohamed El-Sayed",
    rating: 5,
    text: "من أفضل شركات نقل العفش التي تعاملت معها. تغليف احترافي وسرعة في التنفيذ. حافظوا على كل قطعة أثاث كأنها جديدة.",
    timeAgo: "قبل 3 أشهر",
    location: "الشيخ زايد"
  },
  {
    id: "3",
    name: "Samer Ibrahim",
    rating: 5,
    text: "خدمة راقية جداً، العمال مدربون ومؤدبون جداً. الونش حديث وسريع ولم يحدث أي خدش واحد. أنصح بهم بشدة لكل سكان التجمع.",
    timeAgo: "قبل 5 أشهر",
    location: "مدينتي"
  },
  {
    id: "4",
    name: "Hassan Ali",
    rating: 5,
    text: "دقة في المواعيد وأمانة في التعامل. نقلت عفش بيتي بالكامل معهم وكانت تجربة خالية من التوتر تماماً.",
    timeAgo: "قبل 6 أشهر",
    location: "أكتوبر"
  }
];
