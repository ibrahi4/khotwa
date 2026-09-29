export const siteConfig = {
  name: "خطوة لنقل الأثاث",
  shortName: "خطوة",
  description:
    "خطوة لنقل الأثاث - أفضل شركة نقل أثاث في مصر متخصصة في التجمع الخامس، مدينتي، الشيخ زايد، 6 أكتوبر، والقاهرة الجديدة. خدمة احترافية 24/7 مع فرق مدربة، تغليف احترافي، ونش رفع، وضمان كامل على المقتنيات. اتصل الآن للحصول على عرض سعر مجاني.",
  url: "https://khatwamoving.com",
  phone: "01205800817",
  phoneIntl: "+201205800817",
  whatsapp: "01205800817",
  email: "koutwaa722@gmail.com",
  // TODO: مصلحة عندك إيميل رسمي على دومين khatwamoving.com بدل جيميل؟
  // بيدي إشارة مصداقية أقوى (E-E-A-T) لجوجل وللزوار.
  address: "التجمع الخامس - القاهرة الجديدة - مصر",
  addressEn: "Fifth Settlement, New Cairo, Egypt",
  // TODO: تأكد إن العنوان ده مطابق حرفياً للعنوان المسجل في
  // Google Business Profile. أي اختلاف بسيط (حتى ترتيب الكلمات)
  // بيضعف تناسق NAP اللي بيأثر على ظهورك في خرائط جوجل.
  city: "القاهرة الجديدة",
  region: "القاهرة",
  postalCode: "11835",
  country: "مصر",
  countryCode: "EG",
  serviceArea: "جميع محافظات مصر",
  foundingYear: 2014,
  /**
   * سنوات الخبرة بتتحسب من سنة التأسيس بدل رقم ثابت، عشان الرقم يفضل
   * صحيح تلقائياً كل سنة من غير ما حد يفتكر يحدّثه يدوي. لو النقل
   * الفعلي بدأ في سنة مختلفة عن التأسيس القانوني للشركة، عدّل
   * foundingYear للسنة الصحيحة بدل ما تضيف حقل يدوي تاني.
   */
  get yearsOfExperience() {
    return new Date().getFullYear() - this.foundingYear;
  },
  coordinates: {
    latitude: 30.0131,
    longitude: 31.4961,
  },
  /**
   * الأرقام دي كانت 4.9 / 500 بشكل ثابت — لا يطابقان الواقع.
   * Google Business Profile الحقيقي بيقول 4.5★ من 8 تقييمات (تحقّق
   * منه بنفسك في 2026-09). دي القيم اللي بتظهر مباشرة في هيرو كل
   * صفحة منطقة (AreaPage) وفي إحصائيات الصفحة الرئيسية، فتصحيحها هنا
   * بيصلحهم في كل الصفحات مرة واحدة.
   *
   * TODO: حدّث الرقمين دول يدوياً كل ما تزيد تقييماتك الحقيقية على
   * Google Business Profile، أو اربطهم ببيانات حية من الـ API لو حبيت
   * لاحقاً بدل التحديث اليدوي.
   */
  ratings: {
    value: 4.5,
    count: 8,
    best: 5,
  },
  socialMedia: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  },
  businessHours: {
    open: "00:00",
    close: "23:59",
    days: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  },
} as const;