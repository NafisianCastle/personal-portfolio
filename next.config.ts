import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Notion-hosted images
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: "https",
        hostname: "notion.so",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
    ],
  },

  // react-notion-x uses some packages that need to be transpiled
  transpilePackages: ["react-notion-x"],
};

export default nextConfig;
