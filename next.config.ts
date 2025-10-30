import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    authInterrupts: true,
  },
} satisfies NextConfig;

export default nextConfig;
