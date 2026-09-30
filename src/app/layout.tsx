import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/seo/schema";
import {
  GoogleAnalytics,
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const defaultTitle = `${siteConfig.name} | أفضل شركة نقل أثاث في مصر`;
const defaultDescription = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: defaultDescription,
  keywords: [
    "خطوة لنقل الأثاث",
    "شركة نقل أثاث",
    "نقل عفش القاهرة",
    "نقل أثاث التجمع الخامس",
    "نقل أثاث مدينتي",
    "نقل أثاث الشيخ زايد",
    "فك وتركيب أثاث",
    "ونش رفع أثاث",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: siteConfig.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#FAF8F5" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/herosection.webp"
          fetchPriority="high"
          type="image/webp"
        />
        <GoogleTagManager />
      </head>
      <body className={cairo.className} suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen bg-[#FAF8F5]">{children}</main>
        <Footer />
        <FloatingActions />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#FFFFFF",
              color: "#1E293B",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              fontSize: "14px",
              direction: "rtl",
            },
          }}
        />
      </body>
    </html>
  );
}
