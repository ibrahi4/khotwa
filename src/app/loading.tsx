import { Loader2 } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <Logo size="lg" href={null} />
        <div className="flex items-center gap-2 text-[#0F766E]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-semibold">جاري التحميل</span>
        </div>
      </div>
    </div>
  );
}