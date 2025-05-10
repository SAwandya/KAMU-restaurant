// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated, redirectToLogin } from "./lib/authMiddleware";

// Define the routes that don't require authentication
const publicRoutes = ["/signin", "/signup", "/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and public assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if this is a public route
  if (publicRoutes.some((route) => pathname === route)) {
    return NextResponse.next();
  }

  // Check authentication only (no role checking)
  if (!isAuthenticated(request)) {
    // If not authenticated and not a public route, redirect to signin
    if (!publicRoutes.some((route) => pathname.startsWith(route))) {
      return redirectToLogin(request);
    }
  }

  // If authenticated, allow access to all routes
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. All files in the public directory
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
