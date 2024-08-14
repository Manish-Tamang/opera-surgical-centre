const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
  },
  async redirects() {
    return [
      {
        source: '/protected/:path*',
        has: [
          {
            type: 'cookie',
            key: 'userAuthToken',
          },
        ],
        destination: '/login',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/protected/:path*',
        destination: '/api/authenticate?path=:path*',
      },
    ]
  },
}

module.exports = nextConfig
