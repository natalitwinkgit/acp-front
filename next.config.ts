import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Specify the turbopack root to avoid issues with Cyrillic paths
    root: process.cwd(),
  },
};

export default nextConfig;
