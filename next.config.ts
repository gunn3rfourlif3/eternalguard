import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move this to the top level, NO "experimental" or "turbo" wrapper
  serverExternalPackages: ["@prisma/client", "pg"],

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Set to false for development so it doesn't cache permanently
      },
    ];
  }
};

export default nextConfig;

