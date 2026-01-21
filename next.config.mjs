/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  // Skip static generation for error pages
  experimental: {
    skipTrailingSlashRedirect: true,
  },
  // Disable static optimization for pages with auth
  staticPageGenerationTimeout: 120,
  
  // Exclude test and demo pages from production builds
  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/test-:path*',
          destination: '/',
          permanent: false,
        },
        {
          source: '/demo/:path*',
          destination: '/',
          permanent: false,
        },
      ];
    }
    return [];
  },
  
  // Disable static export for dynamic app functionality
  // output: 'export',
  // trailingSlash: true,
  // Configure asset prefix for proper loading in Capacitor
  // assetPrefix: '',
  // Disable server-side features for static export
  // distDir: 'out'
};

export default nextConfig;
