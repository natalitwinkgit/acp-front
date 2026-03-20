import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    // Specify the turbopack root to avoid issues with Cyrillic paths
    root: process.cwd(),
  },
};

export default nextConfig;
