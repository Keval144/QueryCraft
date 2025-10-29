import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  experimental: {
    turbopackFileSystemCacheForDev: true, 
    authInterrupts: true, 
  },
  
} satisfies NextConfig;

export default nextConfig;
