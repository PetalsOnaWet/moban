import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false, // 禁用编译器以排除边缘环境兼容性问题
};

export default nextConfig;
