import type { NextConfig } from 'next';
import path from 'path';
import fs from 'fs';

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': process.cwd(),
    };
    return config;
  },
};


export default nextConfig;