import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/place-photo",
      },
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
