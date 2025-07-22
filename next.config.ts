console.log("🟢 Using next.config.ts");

import path from "path";
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  webpack: (cfg) => {
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      "@": path.resolve(__dirname),
    };
    return cfg;
  },
};

export default config;
