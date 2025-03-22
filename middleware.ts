import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] 处理路径: ${pathname}`);
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    console.log(`[Middleware] 重定向: ${pathname} -> ${newPath}`);
    return NextResponse.redirect(redirectUrl, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};