import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Standard for Cloudflare/Container deployments
};

export default nextConfig;
