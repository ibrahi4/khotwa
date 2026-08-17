import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { compounds } from "@/config/compounds";

export function CompoundsTrust() {
  return (
    <section
      className="py-16 md:py-20 bg-white border-y border-slate-100"
      aria-labelledby="compounds-trust-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-4 py-1.5 mb-4">
            <BadgeCheck className="w-4 h-4 text-green-700" aria-hidden="true" />
            <span className="text-xs font-bold text-green-800 tracking-wide">
              شركاء موثوقون
            </span>
          </div>
          <h2
            id="compounds-trust-heading"
            className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight"
          >
            معتمدون لدى أكبر الكمبوندات
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            نقدم خدماتنا رسمياً داخل أكثر الكمبوندات فخامة في مصر بتصاريح دخول جاهزة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {compounds.map((c) => (
            <article
              key={c.nameEn}
              className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-2 left-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <BadgeCheck className="w-3.5 h-3.5 text-green-700" aria-hidden="true" />
                </div>
              </div>

              <div className="relative aspect-square mb-3 flex items-center justify-center p-2">
                <Image
                  src={c.logo}
                  alt={`شعار ${c.name}`}
                  width={120}
                  height={120}
                  className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  quality={90}
                />
              </div>

              <div className="text-center">
                <h3 className="font-bold text-slate-900 text-sm mb-0.5 leading-tight">
                  {c.name}
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">{c.area}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-600" aria-hidden="true" />
            وأكثر من 15 كمبوند آخر في القاهرة والجيزة
          </p>
        </div>
      </div>
    </section>
  );
}