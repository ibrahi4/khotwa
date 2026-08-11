import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import {
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "@/lib/seo/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { GoogleAnalytics, GoogleTagManager } from "@/components/analytics/GoogleAnalytics";

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  preload: true,
  weight: ["400", "700", "900"],
  variable: "--font-cairo",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | أفضل شركة نقل أثاث في التجمع الخامس ومدينتي والشيخ زايد`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "شركة نقل أثاث", "نقل عفش", "شركة نقل عفش", "خطوة لنقل الأثاث",
    "خطوة موفينج", "khatwa moving", "khotwa", "شركة خطوة",
    "نقل أثاث القاهرة", "نقل أثاث الجيزة", "نقل أثاث التجمع الخامس",
    "نقل أثاث مدينتي", "نقل أثاث الشيخ زايد", "نقل أثاث 6 أكتوبر",
    "نقل أثاث القاهرة الجديدة", "نقل أثاث العاصمة الإدارية",
    "نقل أثاث الرحاب", "فك وتركيب أثاث", "فك وتركيب تكييفات",
    "تغليف أثاث", "ونش رفع أثاث", "نقل مقتنيات حساسة",
    "افضل شركة نقل اثاث في مصر", "شركة نقل اثاث كمبوندات",
    "نقل اثاث فلل", "شركة نقل اثاث موثوقة",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "Business",
  classification: "Moving Services",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: siteConfig.url,
    languages: { "ar-EG": siteConfig.url },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | خدمة نقل أثاث احترافية في مصر`,
    description: siteConfig.description,
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: "image/webp",
      },
    ],
    countryName: "Egypt",
    emails: [siteConfig.email],
    phoneNumbers: [siteConfig.phoneIntl],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon1.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },
  other: {
    "geo.region": "EG-C",
    "geo.placename": "Cairo",
    "geo.position": `${siteConfig.coordinates.latitude};${siteConfig.coordinates.longitude}`,
    ICBM: `${siteConfig.coordinates.latitude}, ${siteConfig.coordinates.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF5EE" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1C1C" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <link
          rel="preload"
          as="image"
          href="/herosection.webp"
          type="image/webp"
          fetchPriority="high"
        />

        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="خطوة" />

        <meta name="geo.region" content="EG-C" />
        <meta name="geo.placename" content="Cairo, Egypt" />
        <meta
          name="geo.position"
          content={`${siteConfig.coordinates.latitude};${siteConfig.coordinates.longitude}`}
        />

        <GoogleTagManager />
      </head>
      <body className={cairo.className} suppressHydrationWarning>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
