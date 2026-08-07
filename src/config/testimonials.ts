export type Review = {
  id: string;
  name: string;
  initial: string;
  location: string;
  compound?: string;
  serviceType: string;
  rating: number;
  date: string; // ISO
  content: string;
  verified: boolean;
  helpful: number;
  companyReply?: {
    content: string;
    date: string;
  };
  images?: string[];
};

export const reviews: Review[] = [
  {
    id: "r-001",
    name: "أحمد عبد الرحمن",
    initial: "أ",
    location: "التجمع الخامس",
    compound: "Mivida",
    serviceType: "نقل شقة كاملة",
    rating: 5,
    date: "2025-01-18",
    content:
      "الحمد لله ربنا يبارك فيهم، نقلولي شقتي من التجمع لمدينتي وكان عندي كنبة كبيرة اتخانقنا شوية إزاي هتنزل من الدور الثامن، بس عملوا ونش وحلوها الحمد لله. الأسعار مش رخيصة قوي بس الجودة تستاهل. أنصح بيهم لأي حد ساكن كمبوند.",
    verified: true,
    helpful: 47,
    companyReply: {
      content: "شكراً جزيلاً أ. أحمد على ثقتك في خطوة. سعداء بخدمتك ونتمنى لك حياة سعيدة في منزلك الجديد بمدينتي.",
      date: "2025-01-19",
    },
  },
  {
    id: "r-002",
    name: "سارة إبراهيم",
    initial: "س",
    location: "الشيخ زايد",
    compound: "Beverly Hills",
    serviceType: "نقل فيلا",
    rating: 5,
    date: "2025-01-12",
    content:
      "تجربة ممتازة من أول مكالمة، الراجل جالي معاينة نفس اليوم وقالي السعر بشفافية. يوم النقل الفريق جه في الميعاد بالظبط، 6 أفراد شغلوا 10 ساعات ونقلوا الفيلا كاملة. مفيش حاجة اتكسرت الحمد لله. تقييمي 5 من 5.",
    verified: true,
    helpful: 62,
  },
  {
    id: "r-003",
    name: "محمود حسن",
    initial: "م",
    location: "6 أكتوبر",
    compound: "Palm Hills",
    serviceType: "نقل + تركيب تكييفات",
    rating: 5,
    date: "2025-01-05",
    content:
      "استعنت بيهم لنقل أثاثي من مصر الجديدة لأكتوبر، والصراحة الشغل احترافي جداً. فك التكييفات وركبها في البيت الجديد بدون أي مشاكل. حتى الأسلاك رتبها بشكل نضيف. الفلوس اللي دفعتها تستاهل.",
    verified: true,
    helpful: 38,
    companyReply: {
      content: "أهلاً بك أ. محمود، سعداء بخدمتك ونشكرك على ثقتك. فريقنا دائماً حريص على أدق التفاصيل.",
      date: "2025-01-06",
    },
  },
  {
    id: "r-004",
    name: "دينا عبد الله",
    initial: "د",
    location: "مدينتي",
    compound: "Madinaty B8",
    serviceType: "نقل شقة",
    rating: 4,
    date: "2024-12-28",
    content:
      "شغلهم كويس والفريق محترم جداً، بس تأخروا نص ساعة على الميعاد وده الحاجة الوحيدة اللي عملت مشكلة. غير كده كل حاجة تمام، غلفوا الحاجات كويس ومكانش في أي خدوش. لو حسّنوا الالتزام بالمواعيد يبقوا مفيش زيهم.",
    verified: true,
    helpful: 29,
    companyReply: {
      content: "شكراً أ. دينا على ملاحظتك القيمة، والاعتذار على التأخير. تم اتخاذ إجراءات لضمان الالتزام بالمواعيد بدقة أكبر.",
      date: "2024-12-29",
    },
  },
  {
    id: "r-005",
    name: "خالد السيد",
    initial: "خ",
    location: "القاهرة الجديدة",
    compound: "Hyde Park",
    serviceType: "نقل + تغليف",
    rating: 5,
    date: "2024-12-20",
    content:
      "أول مرة أتعامل مع شركة نقل وأحس إنهم بيهتموا فعلاً. التغليف كان زي المصانع بالظبط، فقاعات وكرتون وشرايط، حتى الشاشة 65 بوصة اللي كنت خايف عليها وصلت سليمة تماماً. مشكورين.",
    verified: true,
    helpful: 54,
  },
  {
    id: "r-006",
    name: "منى فؤاد",
    initial: "م",
    location: "الرحاب",
    serviceType: "نقل شقة صغيرة",
    rating: 5,
    date: "2024-12-15",
    content:
      "أنا ست وكنت خايفة أتعامل مع شركة نقل لوحدي، بس صراحة الفريق كان محترم جداً ومتعاون. الأسعار واضحة من البداية ومفيش زيادات في الآخر. نصيحة لأي واحدة قدها.",
    verified: true,
    helpful: 41,
  },
  {
    id: "r-007",
    name: "عمرو نصر",
    initial: "ع",
    location: "التجمع الخامس",
    compound: "Villette",
    serviceType: "نقل فيلا + مكتب",
    rating: 5,
    date: "2024-12-08",
    content:
      "نقلت فيلا كاملة + مكتبي في نفس الوقت. الشركة الوحيدة اللي قدرت تنفذ الطلب في يومين متتاليين بدون تعب. الفريق منظم وعنده خبرة في التعامل مع الأثاث المستورد. مشكورين على الاحترافية.",
    verified: true,
    helpful: 71,
    companyReply: {
      content: "أ. عمرو، شرف كبير خدمة عملاء بحجمك. شكراً لك على ثقتك في خطوة.",
      date: "2024-12-09",
    },
  },
  {
    id: "r-008",
    name: "نورا سليم",
    initial: "ن",
    location: "الشيخ زايد",
    compound: "Allegria",
    serviceType: "نقل + فك تركيب",
    rating: 4,
    date: "2024-11-30",
    content:
      "الخدمة كويسة جداً، بس عاوزين يحسنوا موضوع التنظيف بعد التركيب. سبوا شوية كرتون وبقايا شرايط لازقة على الأرض. غير كده كل حاجة تمام والتعامل راقي.",
    verified: true,
    helpful: 26,
  },
  {
    id: "r-009",
    name: "أحمد الجندي",
    initial: "أ",
    location: "المعادي",
    serviceType: "نقل شقة",
    rating: 5,
    date: "2024-11-22",
    content:
      "من التجمع للمعادي والحاجات كلها وصلت زي ما هي. أنصح بيهم لأي حد. الجندي راجل بيفهم في شغله والفريق كله محترم.",
    verified: true,
    helpful: 33,
  },
  {
    id: "r-010",
    name: "ياسمين محمد",
    initial: "ي",
    location: "العاصمة الإدارية",
    compound: "IL Bosco",
    serviceType: "نقل من التجمع للعاصمة",
    rating: 5,
    date: "2024-11-15",
    content:
      "المسافة طويلة والطريق صعب بس الحمد لله كل حاجة تمام. الفريق كان معايا من 8 الصبح لـ 9 بالليل بدون شكوى. حتى الديك اللي عندي وصل من غير أي مشكلة!",
    verified: true,
    helpful: 58,
    companyReply: {
      content: "أ. ياسمين، سعداء بخدمتك في العاصمة الإدارية. نتمنى لك حياة موفقة في منزلك الجديد.",
      date: "2024-11-16",
    },
  },
  {
    id: "r-011",
    name: "شريف عبد الحميد",
    initial: "ش",
    location: "مدينتي",
    compound: "Madinaty G",
    serviceType: "نقل + ونش",
    rating: 5,
    date: "2024-11-08",
    content:
      "الدور 12 والونش شغل ساعتين ونص. الحمد لله كل حاجة نزلت سليمة. الفلوس اللي دفعتها في الونش أقل من اللي كنت متوقعه، شكراً للشفافية.",
    verified: true,
    helpful: 42,
  },
  {
    id: "r-012",
    name: "هبة الله كمال",
    initial: "ه",
    location: "التجمع الخامس",
    compound: "Eastown",
    serviceType: "نقل شقة عائلية",
    rating: 5,
    date: "2024-10-30",
    content:
      "بجد شغل تحفة! أنا عندي 3 عيال والبيت مليان لعب والحاجات كتير جداً، بس الفريق كان صابر ومنظم. غلفوا لعب العيال بحرص وكأنها بتاعتهم. ربنا يجازيهم كل خير.",
    verified: true,
    helpful: 87,
  },
  {
    id: "r-013",
    name: "طارق فتحي",
    initial: "ط",
    location: "الشيخ زايد",
    serviceType: "نقل + نقل مقتنيات ثمينة",
    rating: 5,
    date: "2024-10-22",
    content:
      "عندي مجموعة أنتيكات ولوحات نادرة، وكنت خايف جداً أنقلها. لكن فريق خطوة جه بصناديق مخصصة لكل قطعة وغلفوها بطريقة احترافية جداً. وصلت كلها سليمة الحمد لله.",
    verified: true,
    helpful: 65,
    companyReply: {
      content: "أ. طارق، خدمة المقتنيات الحساسة من تخصصنا. شرف لنا خدمة عميل بحرصك على مقتنياته.",
      date: "2024-10-23",
    },
  },
  {
    id: "r-014",
    name: "ريهام أحمد",
    initial: "ر",
    location: "6 أكتوبر",
    compound: "Mountain View",
    serviceType: "نقل عفش",
    rating: 3,
    date: "2024-10-15",
    content:
      "الشغل تم لكن كان في تأخير في الميعاد وحصل كسر في مرآة الأنتريه. الشركة تحملت المسؤولية وعوضتني الحمد لله، بس أتمنى يهتموا أكتر بموضوع الحرص على القطع الحساسة.",
    verified: true,
    helpful: 18,
    companyReply: {
      content: "نعتذر بشدة أ. ريهام عن التجربة، وشكراً على تفهمك. تم تدريب الفريق على تقنيات جديدة لضمان عدم تكرار هذا الأمر مع أي عميل.",
      date: "2024-10-16",
    },
  },
  {
    id: "r-015",
    name: "محمد صلاح",
    initial: "م",
    location: "القاهرة الجديدة",
    serviceType: "نقل شقة",
    rating: 5,
    date: "2024-10-08",
    content:
      "شركة محترمة والراجل اللي جالي معاينة صريح. قالي هيكلفني كذا وفعلاً دفعت نفس المبلغ بالظبط. الفريق شاطر ومحترم. تقييمي 5/5.",
    verified: true,
    helpful: 44,
  },
  {
    id: "r-016",
    name: "دعاء حسين",
    initial: "د",
    location: "مدينتي",
    serviceType: "نقل صغير",
    rating: 5,
    date: "2024-09-28",
    content:
      "احتجت أنقل غرفة نوم بس والحمد لله لقيتهم بيقبلوا الطلبات الصغيرة كمان. جوا في الميعاد، فكوا وركبوا وسبوا المكان نضيف. تعامل راقي.",
    verified: true,
    helpful: 27,
  },
  {
    id: "r-017",
    name: "أشرف الشريف",
    initial: "أ",
    location: "الرحاب",
    serviceType: "نقل مكتب",
    rating: 4,
    date: "2024-09-20",
    content:
      "نقلت مكتبي وكان في ملفات كتيرة وحاجات إلكترونية. الفريق نظم كل حاجة كويس، لكن ودّوا كام كرتونة للمكان الغلط في المكتب الجديد وخدت مني شوية أرتّبها. غير كده الشغل تمام.",
    verified: true,
    helpful: 22,
  },
  {
    id: "r-018",
    name: "سلمى إبراهيم",
    initial: "س",
    location: "التجمع الخامس",
    compound: "Stone Residence",
    serviceType: "نقل + تخزين مؤقت",
    rating: 5,
    date: "2024-09-12",
    content:
      "احتجت أخزن العفش عندهم أسبوعين لحد ما شقتي الجديدة تجهز، وكانت الخدمة ممتازة. المستودع نضيف ومكيّف. لما جيت أخد الحاجات كلها كانت زي ما هي بالظبط.",
    verified: true,
    helpful: 51,
  },
  {
    id: "r-019",
    name: "كريم فوزي",
    initial: "ك",
    location: "6 أكتوبر",
    compound: "O West",
    serviceType: "نقل + تركيب مطبخ",
    rating: 5,
    date: "2024-09-05",
    content:
      "الفريق شاطر جداً في فك وتركيب المطابخ. مطبخي إيطالي معقد شوية والفني قعد يعمل فيه ساعتين لحد ما ركبه صح. مفيش زيه الصراحة.",
    verified: true,
    helpful: 39,
  },
  {
    id: "r-020",
    name: "مروة سامي",
    initial: "م",
    location: "الشيخ زايد",
    compound: "The Estates",
    serviceType: "نقل فيلا",
    rating: 5,
    date: "2024-08-28",
    content:
      "من أحسن شركات النقل اللي تعاملت معاها. سعرهم مش الأرخص بس الجودة تفرق. جربت قبل كده شركة رخيصة وندمت، مع خطوة فرق السعر بيتعوض من راحة البال.",
    verified: true,
    helpful: 76,
    companyReply: {
      content: "أ. مروة، كلامك أوسمة على صدورنا. الجودة والاحترافية دائماً تستحق كل جنيه. شكراً لك.",
      date: "2024-08-29",
    },
  },
];

/**
 * Rating Statistics
 */
export const getRatingStats = () => {
  const total = reviews.length;
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const average = totalRating / total;

  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });

  return {
    total,
    average: Math.round(average * 10) / 10,
    distribution,
    percentages: Object.entries(distribution).reduce(
      (acc, [star, count]) => ({
        ...acc,
        [star]: Math.round((count / total) * 100),
      }),
      {} as Record<string, number>
    ),
  };
};

/**
 * Filter reviews
 */
export const filterReviews = (
  filter: "all" | "5" | "4" | "3" | "with-reply" | "with-images",
  sort: "newest" | "oldest" | "highest" | "helpful" = "newest"
): Review[] => {
  let filtered = [...reviews];

  if (filter === "5" || filter === "4" || filter === "3") {
    filtered = filtered.filter((r) => r.rating === parseInt(filter));
  } else if (filter === "with-reply") {
    filtered = filtered.filter((r) => r.companyReply);
  } else if (filter === "with-images") {
    filtered = filtered.filter((r) => r.images && r.images.length > 0);
  }

  switch (sort) {
    case "newest":
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case "highest":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "helpful":
      filtered.sort((a, b) => b.helpful - a.helpful);
      break;
  }

  return filtered;
};