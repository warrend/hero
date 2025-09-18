import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.superherodb.com',
        port: '',
        pathname: '/pictures2/portraits/**',
      },
    ],
  },
};

export default nextConfig;
