import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/login', '/register'];
const DEFAULT_ROUTE = '/login';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('[Middleware] Pathname:', pathname);

  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    console.log('[Middleware] Public route, allow access');
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  console.log('[Middleware] Token from cookie:', token);

  if (!token) {
    console.log('[Middleware] No token found, redirecting to', DEFAULT_ROUTE);
    return NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    console.log('[Middleware] Token valid, proceeding');
    return NextResponse.next();
  } catch (error) {
    console.log('[Middleware] Token invalid:', error);
    return NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
