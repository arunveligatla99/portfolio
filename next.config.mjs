/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      { source: '/cv', destination: '/resume', permanent: true },
      {
        source: '/projects/verax-erp',
        destination: '/projects/agentix-erp',
        permanent: true,
      },
      {
        source: '/projects/loanpulse',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/projects/nemo-trizetto',
        destination: '/projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
