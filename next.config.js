/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "vercel.app"],
    formats: ["image/avif", "image/webp"],
  },
  // Experimental options like serverExternalPackages were removed
  // as they're not supported in Next.js 15.2.4

  // Workaround for PostCSS issues in Vercel deployment
  webpack: (config) => {
    // Find the PostCSS loader configuration
    const postCssLoaderRule = config.module.rules.find((rule) =>
      rule.oneOf?.find((r) =>
        r.use?.find((u) => u.loader?.includes("postcss-loader"))
      )
    );

    if (postCssLoaderRule) {
      const postCssLoader = postCssLoaderRule.oneOf.find((r) =>
        r.use?.find((u) => u.loader?.includes("postcss-loader"))
      );

      if (postCssLoader?.use) {
        const loader = postCssLoader.use.find((u) =>
          u.loader?.includes("postcss-loader")
        );
        if (loader) {
          // Explicitly set the PostCSS plugins
          loader.options = loader.options || {};
          loader.options.postcssOptions = {
            plugins: ["tailwindcss", "autoprefixer"],
          };
        }
      }
    }

    return config;
  },
};

module.exports = nextConfig;
