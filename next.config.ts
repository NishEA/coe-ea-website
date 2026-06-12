import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve WebP/AVIF automatically — smaller images, same visual quality.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Brotli/gzip compression for JS/CSS assets (reduces bundle transfer size ~70%).
  compress: true,
  // Long-lived immutable cache for static assets; CDN caching for pages.
  headers: async () => [
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(startup-program|governance|events|privacy|apply|book)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      ],
    },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          // Three.js requires unsafe-eval (shader compilation) and blob: workers.
          // Supabase auth uses wss: for realtime. Vercel Analytics uses va.vercel-scripts.com.
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: cdn.sanity.io",
            "font-src 'self' data:",
            "connect-src 'self' *.supabase.co wss://*.supabase.co cdn.sanity.io va.vercel-scripts.com",
            "worker-src 'self' blob:",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
