import type { NextConfig } from 'next';
import path from 'path';

const nextConfig = {
  output: 'standalone',
  // optional: ensure tsconfig paths work
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
};
module.exports = nextConfig;

export default nextConfig;
