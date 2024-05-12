/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['app.localhost:4343']
    }
  }
};

export default nextConfig;
