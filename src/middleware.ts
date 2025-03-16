import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

// 使用配置文件中的值
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // 匹配所有路径
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 匹配所有语言前缀路径
    '/(en|es)/:path*'
  ]
}; 