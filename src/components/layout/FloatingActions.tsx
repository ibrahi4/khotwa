"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget";
import { trackWhatsApp } from "@/lib/analytics/events";

export function FloatingActions() {
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <>
      <WhatsAppWidget
        open={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
        position="desktop-left"
      />

      <div className="hidden lg:block fixed bottom-6 left-6 z-50">
        <div className="relative">
          <button
            onClick={() => {
              setWhatsappOpen(!whatsappOpen);
              if (!whatsappOpen) trackWhatsApp("floating_open");
            }}
            className="relative w-14 h-14 bg-[#1F5F3F] hover:bg-[#164A30] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="تواصل عبر واتساب"
          >
            {whatsappOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-24 lg:bottom-6 right-6 z-40 w-11 h-11 bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="العودة للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}