/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "vercel.app"],
    formats: ["image/avif", "image/webp"],
  },
  // Experimental options like serverExternalPackages were removed
  // as they're not supported in Next.js 15.2.4
};

module.exports = nextConfig;
