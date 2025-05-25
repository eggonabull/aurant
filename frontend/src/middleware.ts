import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/about',
    '/health',
    '/login',
    '/register',
    '/auth',
    '/support',
    '/dashboard',
    '/blog',
    '/menu',
    '/features',
  ];
  
  // Get the session token from cookies
  const token = request.cookies.get('session_token')?.value;
  
  // If the path is public, allow access
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path)) || request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  
  // If no token and not on public path, redirect to login
  if (!token) {
    // return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
