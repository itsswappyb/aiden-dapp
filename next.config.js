/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tremor/react'],
  images: {
    domains: ['github.com'], // Add any other domains you need for images
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://144.126.243.137:8080/v1/graphql',
      },
    ];
  },
};

module.exports = nextConfig;
