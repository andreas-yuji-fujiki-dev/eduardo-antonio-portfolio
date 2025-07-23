import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register']
const DEFAULT_ROUTE = '/login';

export async function middleware(request: NextRequest) {
  // current route path
  const { pathname } = request.nextUrl;

  // if it's a public route and there is no token
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  };

  // getting token from browser cookies
  const token = request.cookies.get('token')?.value;

  // if there is no token present on browser cookies
  if (!token) {
    return NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url));
  };

  try {
    return NextResponse.next();

  } catch (error) {

    return NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url));
  };
};

// applying middleware to the routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
};