import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable component caching to improve dev performance
  cacheComponents: true,

  experimental: {
    turbopackFileSystemCacheForDev: true, // speeds up rebuilds during dev
    authInterrupts: true, // enables experimental auth middleware support
  },
} satisfies NextConfig;

export default nextConfig;
