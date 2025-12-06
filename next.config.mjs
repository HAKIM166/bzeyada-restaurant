/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // مهم جداً لمشكلة Leaflet في localhost
  eslint: {
    ignoreDuringBuilds: true, // يمنع Vercel من إيقاف الـ build بسبب ESLint
  },
};

export default nextConfig;
