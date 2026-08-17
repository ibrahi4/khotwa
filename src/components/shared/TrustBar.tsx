import { Building2 } from "lucide-react";
import { compounds } from "@/config/compounds";

export function TrustBar() {
  return (
    <section
      className="border-y border-slate-100 bg-white py-8"
      aria-label="الكمبوندات التي نخدمها"
    >
      <div className="container-custom">
        <p className="text-center text-xs font-semibold text-slate-500 mb-5 tracking-wider uppercase">
          نخدم أفضل الكمبوندات في القاهرة الجديدة والتجمع الخامس
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {compounds.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 text-slate-500 hover:text-green-700 transition-colors"
            >
              <Building2 className="w-4 h-4 opacity-70" aria-hidden="true" />
              <span className="text-sm font-bold" dir="ltr">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}