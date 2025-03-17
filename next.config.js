// next.config.js
import withNextIntl from 'next-intl/plugin';

// 配置 next-intl
const nextIntlConfig = withNextIntl('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 移除 experimental.middleware
  
  // 禁用默认重定向，让中间件处理
  async redirects() {
    return [];
  },
  
  // 图像优化配置
  images: {
    domains: ['pxtorem.org'],
  },
};

export default nextIntlConfig(nextConfig);