import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The copy document specifies every URL with a trailing slash.
  trailingSlash: true,
  // This app sits inside the folder of the original Vite site, which has its own lockfile.
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
