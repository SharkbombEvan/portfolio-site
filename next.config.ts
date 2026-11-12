import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Products moved under the Sharkbomb Audio section; keep old links working.
      { source: "/products", destination: "/audio/products", permanent: true },
    ];
  },
};

export default nextConfig;
