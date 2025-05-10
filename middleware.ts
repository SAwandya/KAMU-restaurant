// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rolePermissions: Record<string, string[]> = {
  "/rider": ["rider"],
  "/customer": ["customer"],
};

const publicRoutes = ["/signin", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const base64Payload = accessToken.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());
    const userRole = payload.role;

    for (const route in rolePermissions) {
      if (pathname.startsWith(route)) {
        if (!rolePermissions[route].includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/:path*",
    "/dashbaord/:path*",
    // Add other protected routes here
  ],
};
