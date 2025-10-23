import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  images: { unoptimized: true },
  basePath: "/xyzstore", 
  assetPrefix: "/xyzstore/",
};

export default nextConfig;