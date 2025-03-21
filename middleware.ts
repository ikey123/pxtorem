// src/middleware.ts
console.log('中间件文件被加载');
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, validCategories } from './src/i18n/request';
import createMiddleware from 'next-intl/middleware';
// 预编译正则表达式
const SLUG_PATTERNS = {
  pxToRem: /^\d+-px-to-rem$/,
  remToPx: /^\d+(?:-\d+)?-rem-to-px$/,
} as const;

// 定义类型
type Locale = typeof locales[number];
type ValidCategory = typeof validCategories[number];

// 类型守卫函数
function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function isValidCategory(value: string): value is ValidCategory {
  return (validCategories as readonly string[]).includes(value);
}

export default createMiddleware({
  locales: [
    'en',
    // 'es', // 暂时注释掉西班牙语，需要时取消注释即可
  ],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 详细日志，帮助调试
  console.log(`[Middleware] 开始处理路径: ${pathname}`);

  // 跳过静态资源和API请求
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    console.log(`[Middleware] 跳过静态资源: ${pathname}`);
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  
  // 处理根路径
  if (segments.length === 0) {
    const redirectUrl = new URL(`/${defaultLocale}`, request.url);
    console.log(`[Middleware] 重定向根路径: / -> ${redirectUrl.pathname}`);
    return NextResponse.redirect(redirectUrl, 307);
  }
  
  const firstSegment = segments[0];
  
  // 如果已有语言前缀，放行
  if (isLocale(firstSegment)) {
    console.log(`[Middleware] 已有语言前缀 ${firstSegment}，直接通过: ${pathname}`);
    return NextResponse.next();
  }
  
  // 处理类别+slug组合
  if (isValidCategory(firstSegment) && segments.length > 1) {
    const secondSegment = segments[1];
    const isValidSlug = SLUG_PATTERNS.pxToRem.test(secondSegment) || 
                        SLUG_PATTERNS.remToPx.test(secondSegment);
    
    if (isValidSlug) {
      const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
      console.log(`[Middleware] 重定向类别/slug: ${pathname} -> ${redirectUrl.pathname}`);
      return NextResponse.redirect(redirectUrl, 307);
    }
  }
  
  // 默认添加语言前缀
  const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  console.log(`[Middleware] 添加默认语言前缀: ${pathname} -> ${redirectUrl.pathname}`);
  return NextResponse.redirect(redirectUrl, 307);
}

// 更新匹配器配置
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};