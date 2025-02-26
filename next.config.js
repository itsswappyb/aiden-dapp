/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tremor/react'],
  images: {
    domains: ['github.com'], // Add any other domains you need for images
  },
};

module.exports = nextConfig;
