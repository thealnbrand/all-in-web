import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@react-three/fiber", "@react-three/drei", "three", "zustand"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "public-files.gumroad.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/TactileGoods.jfif',
        destination: '/TactileGoods.webp',
        permanent: true,
      },
      {
        source: '/DigitalProducts.jfif',
        destination: '/DigitalProducts.webp',
        permanent: true,
      },
      {
        source: '/Engineering.jfif',
        destination: '/Engineering.webp',
        permanent: true,
      },
      {
        source: '/Option%20B.jfif',
        destination: '/Option%20B.webp',
        permanent: true,
      },
      {
        source: '/Track%2001.jfif',
        destination: '/Track%2001.webp',
        permanent: true,
      },
      {
        source: '/Track%2002.jfif',
        destination: '/Track%2002.webp',
        permanent: true,
      },
      {
        source: '/Track%2003.jfif',
        destination: '/Track%2003.webp',
        permanent: true,
      },
      {
        source: '/Track%2004.jfif',
        destination: '/Track%2004.webp',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
