import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/request';

// 在文件顶部添加一行清晰的日志，确认中间件被加载
console.log('中间件文件被加载 - Middleware.ts is loaded');

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 添加明确的日志标记
  console.log(`[Middleware] 处理路径: ${pathname}`);
  
  // 跳过静态资源和API请求
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    console.log(`[Middleware] 跳过静态资源: ${pathname}`);
    return NextResponse.next();
  }

  // 单独处理 /en 路径重定向逻辑，并使其优先级最高
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    console.log(`[Middleware] 重定向 /en 路径: ${pathname} -> ${newPath}`);
    return NextResponse.redirect(redirectUrl, 308); // 使用永久重定向
  }

  // 其他逻辑保持不变...
  console.log(`[Middleware] 无特殊处理，直接通过: ${pathname}`);
  return NextResponse.next();
}

// 修改 matcher 配置，确保能匹配所有相关路径
export const config = {
  matcher: ['/', '/:path*'],
};