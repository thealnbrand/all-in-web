import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@react-three/fiber", "@react-three/drei", "three", "zustand"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "public-files.gumroad.com",
      },
    ],
  },
};

export default nextConfig;
