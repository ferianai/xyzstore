import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_ENV === "github-pages";

const nextConfig: NextConfig = {
  ...(isGithubPages && { output: "export" }),
  images: { unoptimized: true },
  basePath: isGithubPages ? "/xyzstore" : "",
  assetPrefix: isGithubPages ? "/xyzstore/" : "",
  trailingSlash: true,
};

export default nextConfig;
