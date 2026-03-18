import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://ddragon.leagueoflegends.com/cdn/**')],
  },
};

export default nextConfig;
