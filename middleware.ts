// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/request';
import createMiddleware from 'next-intl/middleware';

type Locale = typeof locales[number];

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] 处理路径: ${pathname}`);

  // 跳过静态资源
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    console.log(`[Middleware] 跳过静态资源: ${pathname}`);
    return NextResponse.next();
  }

  // 将 /en 开头的路径重定向到无前缀路径
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    console.log(`[Middleware] 重定向 /en 到根路径: ${pathname} -> ${newPath}`);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // 其他语言（如 /es）交给 next-intl 处理
  if (isLocale(firstSegment) && firstSegment !== 'en') {
    console.log(`[Middleware] 语言前缀 ${firstSegment}: ${pathname}`);
    return intlMiddleware(request);
  }

  // 无前缀路径直接通过（如 /rem-to-px）
  console.log(`[Middleware] 无前缀路径: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};