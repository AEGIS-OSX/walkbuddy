/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use SSR (no static export) so crawlers and QA agents see real HTML
  images: { unoptimized: true },
};

module.exports = nextConfig;
