// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, validCategories } from './i18n/request';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 排除静态资源和API路由
  const isStaticOrApi = pathname.startsWith('/_next') || 
                        pathname.startsWith('/api') || 
                        pathname.includes('.');
  
  if (isStaticOrApi) {
    return NextResponse.next();
  }
  
  // 分析路径
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || '';
  
  // 如果第一段是有效的语言，跳过处理
  if (locales.includes(firstSegment)) {
    return NextResponse.next();
  }
  
  // 构建重定向URL
  const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  console.log(`Middleware - 重定向: ${pathname} -> ${redirectUrl.pathname}`);
  
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // 匹配所有路径，除了静态资源
  matcher: ['/((?!_next|api|images|favicon.ico|.*\\..*).*)'],
};