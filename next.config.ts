import type { NextConfig } from 'next';
import path from 'path';
import fs from 'fs';

const srcPath = path.join(__dirname, 'src');

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack(config, { isServer }) {
    if (fs.existsSync(srcPath)) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': srcPath,
      };
    }
    return config;
  },
};

export default nextConfig;