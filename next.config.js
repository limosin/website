const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const isProduction = process.env.NODE_ENV === "production"
const scriptSources = ["'self'", "'unsafe-inline'", "https://giscus.app"]
if (!isProduction) scriptSources.push("'unsafe-eval'")

const ContentSecurityPolicy = `
  default-src 'self';
  script-src ${scriptSources.join(" ")};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://www.notion.so https://prod-files-secure.s3.us-west-2.amazonaws.com https://s3.us-west-2.amazonaws.com;
  media-src 'self' blob: data: https://res.cloudinary.com;
  connect-src 'self' https://giscus.app;
  font-src 'self';
  frame-src https://giscus.app https://www.youtube.com https://youtube.com https://player.vimeo.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isProduction ? "upgrade-insecure-requests;" : ""}
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

module.exports = withBundleAnalyzer({
  compiler: {
    // Remove unused imports
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@notionhq/client", "prismjs"],
  },
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
    ],
  },
  // Enable compression
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Add caching headers for static assets
      {
        source: "/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
})
