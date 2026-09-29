import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 60, 65, 70, 75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },

  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "sonner",
      "@radix-ui/react-accordion",
      "@radix-ui/react-slot",
    ],
  },
};

export default nextConfig;
