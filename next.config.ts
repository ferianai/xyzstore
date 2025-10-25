import type { NextConfig } from "next";

const env = process.env.DEPLOY_ENV;
const isGithubPages = env === "github-pages";

const nextConfig: NextConfig = {
  ...(isGithubPages && { output: "export" }),
  images: { unoptimized: true },
  basePath: isGithubPages ? "/xyzstore" : "",
  assetPrefix: isGithubPages ? "/xyzstore/" : "",
  trailingSlash: true,
};

export default nextConfig;
