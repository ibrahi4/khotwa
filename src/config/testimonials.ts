export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  colorClass: string;
  area: string;
  service: string;
  date: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "أحمد الشناوي",
    initials: "أش",
    colorClass: "bg-green-100 text-green-700",
    area: "التجمع الخامس",
    service: "نقل شقة كاملة",
    date: "منذ أسبوعين",
    rating: 5,
    text: "خدمة ممتازة والفريق منظم جداً. نقلوا شقة 3 غرف من التجمع لمدينتي في يوم واحد بدون أي مشاكل. الأسعار معقولة والتغليف احترافي.",
  },
  {
    id: "t2",
    name: "منى عبدالرحمن",
    initials: "مع",
    colorClass: "bg-amber-100 text-amber-700",
    area: "6 أكتوبر",
    service: "فك وتركيب أثاث",
    date: "منذ شهر",
    rating: 5,
    text: "استعنت بيهم في نقل غرفة نوم إيطالية. فكوها وركبوها زي ما هي بدون أي خدش. فريق محترم ودقيق في المواعيد.",
  },
  {
    id: "t3",
    name: "خالد محمود",
    initials: "خم",
    colorClass: "bg-blue-100 text-blue-700",
    area: "مدينتي",
    service: "نقل فيلا",
    date: "منذ 3 أسابيع",
    rating: 5,
    text: "أفضل شركة نقل تعاملت معاها. نقلوا فيلا كاملة من الشيخ زايد لمدينتي. كل قطعة اتغلفت بعناية والتسليم في الوقت المحدد.",
  },
  {
    id: "t4",
    name: "سارة الشريف",
    initials: "شش",
    colorClass: "bg-rose-100 text-rose-700",
    area: "الشيخ زايد",
    service: "تغليف احترافي",
    date: "منذ شهرين",
    rating: 5,
    text: "التغليف كان مذهل، حتى الأطباق الصينية الحساسة وصلت سليمة تمامًا. فريق مدرب ومحترف. أنصح بيهم بشدة.",
  },
  {
    id: "t5",
    name: "محمد عبدالله",
    initials: "مع",
    colorClass: "bg-violet-100 text-violet-700",
    area: "القاهرة الجديدة",
    service: "ونش رفع أثاث",
    date: "منذ 5 أيام",
    rating: 5,
    text: "احتجت ونش لأن الأثاث ما ينفعش من السلم. جم في المعاد وشغلوا الونش باحترافية شديدة. الأمان أولوية عندهم.",
  },
  {
    id: "t6",
    name: "نور حسن",
    initials: "نح",
    colorClass: "bg-teal-100 text-teal-700",
    area: "العاصمة الإدارية",
    service: "نقل مقتنيات ثمينة",
    date: "منذ أسبوع",
    rating: 5,
    text: "كان عندي تحف وأنتيكات قيمتها كبيرة. تعاملوا معاها كأنها ذهب. تغليف مخصوص ونقل بمنتهى العناية. شكرًا خطوة.",
  },
];