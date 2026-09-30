import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/seo/schema";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleAnalytics";
import { ClickTracker } from "@/components/analytics/ClickTracker";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: true,
  // راجع استخدامك للأوزان؛ كل وزن زيادة = ملف خط زيادة على الموبايل
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | أفضل شركة نقل أثاث في مصر`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  // "./" يخلي كل صفحة canonical لنفسها بدل ما كلها تشاور على الرئيسية
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// يمنع كسر الـ script لو فيه "</script>" جوه أي قيمة
const jsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const businessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="ar" dir="rtl" className={cairo.variable} style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
        />
      </head>
      <body className={cairo.className} suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <ClickTracker />
        <Header />
        <main className="min-h-screen bg-[#FAF8F5]">{children}</main>
        <Footer />
        <FloatingActions />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}