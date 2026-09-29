"use client";

import Image from "next/image";

const compounds = [
  { name: "مدينتي", logo: "/images/compounds/madinty.webp" },
  { name: "ماونتن فيو", logo: "/images/compounds/mountun.webp" },
  { name: "بالم هيلز", logo: "/images/compounds/palm.webp" },
  { name: "ميفيدا", logo: "/images/compounds/mividia.webp" },
  { name: "هايد بارك", logo: "/images/compounds/hyd-park.webp" },
  { name: "تاون سيتي", logo: "/images/compounds/t-city.webp" },
];

export function CompoundsTrust() {
  return (
    <div className="container-custom">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-85 grayscale hover:grayscale-0 transition-all duration-300">
        {compounds.map((c) => (
          <div key={c.name} className="relative h-8 w-24 sm:h-10 sm:w-28 shrink-0">
            <Image
              src={c.logo}
              alt={`نقل عفش في ${c.name}`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 96px, 112px"
              quality={70}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
