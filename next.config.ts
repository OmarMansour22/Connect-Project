import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output: "export" — allows SSR & dynamic routes
  reactStrictMode: true,
};

export default nextConfig;
