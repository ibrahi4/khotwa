/**
 * SEO Keywords Configuration
 * كلمات مفتاحية مركّزة حسب دراسة السوق المصري 2025
 */

export const primaryKeywords = [
  "شركة نقل أثاث",
  "نقل عفش",
  "نقل أثاث",
  "شركات نقل الأثاث",
  "أفضل شركة نقل عفش",
  "شركة نقل عفش مصر",
  "خطوة لنقل الأثاث",
  "خطوة موفينج",
] as const;

export const locationKeywords = [
  "نقل عفش التجمع الخامس",
  "نقل أثاث التجمع الخامس",
  "شركة نقل عفش التجمع",
  "نقل عفش مدينتي",
  "نقل أثاث مدينتي",
  "نقل عفش الشيخ زايد",
  "نقل أثاث الشيخ زايد",
  "نقل عفش 6 أكتوبر",
  "نقل أثاث 6 أكتوبر",
  "نقل أثاث القاهرة الجديدة",
  "نقل عفش القاهرة الجديدة",
  "نقل أثاث العاصمة الإدارية",
  "نقل عفش الرحاب",
  "نقل أثاث الرحاب",
  "نقل عفش المعادي",
  "نقل أثاث مصر الجديدة",
  "نقل عفش المهندسين",
  "نقل عفش الزمالك",
  "نقل عفش القطامية",
  "نقل عفش مدينة نصر",
] as const;

export const serviceKeywords = [
  "فك وتركيب أثاث",
  "فك وتركيب تكييفات",
  "تغليف أثاث احترافي",
  "ونش رفع أثاث",
  "نقل مقتنيات حساسة",
  "نقل زجاج ونجف",
  "نقل تحف وأنتيكات",
  "شحن أثاث",
  "تخزين أثاث",
] as const;

export const commercialKeywords = [
  "ارخص شركة نقل عفش",
  "أسعار نقل الأثاث 2025",
  "شركة نقل عفش رخيصة",
  "عرض سعر نقل اثاث",
  "شركة نقل عفش مضمونة",
  "أفضل أسعار نقل الأثاث",
  "شركة نقل أثاث موثوقة",
] as const;

export const audienceKeywords = [
  "شركة نقل أثاث كمبوندات",
  "نقل أثاث فلل",
  "نقل أثاث VIP",
  "شركة نقل أثاث فاخر",
  "نقل أثاث كمبوند ميفيدا",
  "نقل أثاث كمبوند هايد بارك",
  "نقل أثاث كمبوند ماونتن فيو",
  "نقل أثاث كمبوند بالم هيلز",
] as const;

export const longTailKeywords = [
  "أفضل شركة نقل أثاث في التجمع الخامس",
  "شركة نقل عفش مع الفك والتركيب",
  "نقل أثاث من القاهرة إلى الساحل الشمالي",
  "شركة نقل أثاث بالونش",
  "نقل عفش 24 ساعة",
  "شركة نقل أثاث بتأمين شامل",
  "معاينة مجانية نقل أثاث",
  "نقل أثاث في نفس اليوم",
] as const;

/**
 * دمج الكلمات المفتاحية لصفحة معينة
 */
export const getAllKeywords = (): string[] => [
  ...primaryKeywords,
  ...locationKeywords,
  ...serviceKeywords,
  ...commercialKeywords,
  ...audienceKeywords,
  ...longTailKeywords,
];

/**
 * كلمات مفتاحية لصفحة الرئيسية (أقوى الكلمات)
 */
export const homeKeywords: string[] = [
  ...primaryKeywords,
  ...locationKeywords.slice(0, 10),
  ...serviceKeywords.slice(0, 5),
  ...audienceKeywords.slice(0, 4),
];

/**
 * كلمات مفتاحية حسب المنطقة
 */
export const getAreaKeywords = (areaName: string): string[] => [
  `نقل عفش ${areaName}`,
  `نقل أثاث ${areaName}`,
  `شركة نقل عفش ${areaName}`,
  `شركة نقل أثاث ${areaName}`,
  `أفضل شركة نقل عفش ${areaName}`,
  `أرخص شركة نقل أثاث ${areaName}`,
  `نقل عفش ${areaName} مع الفك والتركيب`,
  `فك وتركيب أثاث ${areaName}`,
  `تغليف أثاث ${areaName}`,
  `ونش رفع أثاث ${areaName}`,
  `شركة نقل أثاث كمبوندات ${areaName}`,
];

/**
 * كلمات مفتاحية حسب الخدمة
 */
export const getServiceKeywords = (serviceName: string): string[] => [
  serviceName,
  `${serviceName} في مصر`,
  `${serviceName} في القاهرة`,
  `${serviceName} في التجمع الخامس`,
  `${serviceName} في الشيخ زايد`,
  `${serviceName} في مدينتي`,
  `${serviceName} في 6 أكتوبر`,
  `أفضل ${serviceName}`,
  `شركة ${serviceName}`,
  `أسعار ${serviceName}`,
];