// middleware.ts（项目根目录）
console.log('中间件文件被加载');
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/request';
import createMiddleware from 'next-intl/middleware';

// 定义类型
type Locale = typeof locales[number];

// 类型守卫函数
function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// 创建 next-intl 中间件
const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // 处理以 /en 开头的路径，重定向到去掉 /en 的路径
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    console.log(`[Middleware] 重定向 /en 路径: ${pathname} -> ${newPath}`);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const segments = pathname.split('/').filter(Boolean);

  // 处理根路径
  if (segments.length === 0) {
    console.log(`[Middleware] 根路径 /，直接通过`);
    return NextResponse.next();
  }

  const firstSegment = segments[0];

  // 如果已有其他语言前缀（如 /es），交给 next-intl 处理
  if (isLocale(firstSegment) && firstSegment !== 'en') {
    console.log(`[Middleware] 已有语言前缀 ${firstSegment}，交给 next-intl 处理: ${pathname}`);
    return intlMiddleware(request);
  }

  // 对于所有其他路径（包括无语言前缀的路径），直接通过
  console.log(`[Middleware] 无前缀路径，直接通过: ${pathname}`);
  return NextResponse.next();
}

// 更新匹配器配置
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};