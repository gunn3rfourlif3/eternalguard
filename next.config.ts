import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move this to the top level, NO "experimental" or "turbo" wrapper
  serverExternalPackages: ["@prisma/client", "pg"],
};

export default nextConfig;