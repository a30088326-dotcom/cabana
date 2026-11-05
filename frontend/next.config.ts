import type { NextConfig } from "next";
const api = process.env.API_URL || "http://127.0.0.1:4000";
const config: NextConfig = {
  transpilePackages: ["@elara/contracts"],
  devIndicators: false,
  async rewrites() {
    return [
      { source: "/api/v1/:path*", destination: api + "/api/v1/:path*" },
      { source: "/uploads/:path*", destination: api + "/uploads/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
export default config;
