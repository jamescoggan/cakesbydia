const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: 'export', // Enable static export for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Set this if your repo name is not the root (e.g., '/cakesbydia')
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '', // Set this if using custom domain
  trailingSlash: true, // GitHub Pages works better with trailing slashes
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
