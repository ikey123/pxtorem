import createNextIntlPlugin from 'next-intl/plugin';

// 指定配置文件路径
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //swcMinify: true,
  
  // 重定向
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en', // 指定重定向的目标路径
        permanent: true,
      },
    ];
  },
  
  // 图像优化
  images: {
    domains: ['pxtorem.org'],
  },
}

// 使用 export default 而不是 module.exports
export default withNextIntl(nextConfig); 