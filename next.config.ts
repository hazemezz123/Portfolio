import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "vercel.app"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
