// next.config.js
import withNextIntl from 'next-intl/plugin';

// 配置 next-intl
const nextIntlConfig = withNextIntl('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 添加重定向规则作为中间件的备份
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      }
    ];
  },
  
  // 图像优化配置
  images: {
    domains: ['pxtorem.org'],
  },
};

export default nextIntlConfig(nextConfig);