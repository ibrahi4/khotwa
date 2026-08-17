"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

export function LiveCounter() {
  const [count, setCount] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        if (next < 3) return 3;
        if (next > 8) return 8;
        return next;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
      </span>
      <div className="flex items-center gap-1.5 text-xs">
        <Activity className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
        <span className="font-bold text-white">{count}</span>
        <span className="text-white/70">نقلات جارية الآن</span>
      </div>
    </div>
  );
}