// src/middleware.ts
console.log('中间件文件被加载');
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, validCategories } from './src/i18n/request';
// 预编译正则表达式
const SLUG_PATTERNS = {
  pxToRem: /^\d+-px-to-rem$/,
  remToPx: /^\d+(?:-\d+)?-rem-to-px$/,
} as const;

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
  if (locales.includes(firstSegment)) {
    console.log(`[Middleware] 已有语言前缀 ${firstSegment}，直接通过: ${pathname}`);
    return NextResponse.next();
  }
  
  // 处理类别+slug组合
  if (validCategories.includes(firstSegment) && segments.length > 1) {
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
  matcher: [
    '/',
    '/((?!_next|api|_vercel|_static|favicon.ico|robots.txt|.*\\..*).*)',
  ],
};