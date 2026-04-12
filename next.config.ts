import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Required for Next.js 15 + Cloudflare local development
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', 
};

export default nextConfig;
