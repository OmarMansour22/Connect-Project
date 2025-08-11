import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Connect-Project" : "",
  assetPrefix: isProd ? "/Connect-Project/" : "",
};

export default nextConfig;
