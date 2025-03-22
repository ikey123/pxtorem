export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] 开始处理路径: ${pathname}`);

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    console.log(`[Middleware] 跳过静态资源: ${pathname}`);
    return NextResponse.next();
  }

  if (pathname.startsWith('/en/') || pathname === '/en') {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    console.log(`[Middleware] 重定向 /en 路径: ${pathname} -> ${newPath}`);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    console.log(`[Middleware] 根路径 /，直接通过`);
    return NextResponse.next();
  }

  const firstSegment = segments[0];
  if (isLocale(firstSegment) && firstSegment !== 'en') {
    console.log(`[Middleware] 已有语言前缀 ${firstSegment}，交给 next-intl 处理: ${pathname}`);
    return intlMiddleware(request);
  }

  console.log(`[Middleware] 无前缀路径，直接通过: ${pathname}`);
  const response = NextResponse.next();
  console.log(`[Middleware] 处理结果: ${response.status}`); // 添加状态日志
  return response;
}