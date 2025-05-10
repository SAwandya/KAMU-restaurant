// lib/authMiddleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
  iat: number;
}

export function getTokenData(request: NextRequest): DecodedToken | null {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    console.log("No access token found in cookies");
    return null;
  }

  try {
    // Decode JWT token
    const decoded = jwtDecode<DecodedToken>(token);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      console.log("Token expired", { exp: decoded.exp, now: currentTime });
      return null;
    }

    // Add a debug log to see which user and role is being authenticated
    console.log("Valid token found for user", {
      userId: decoded.userId,
      role: decoded.role,
    });

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function isAuthenticated(request: NextRequest): boolean {
  return getTokenData(request) !== null;
}

export function redirectToLogin(request: NextRequest): NextResponse {
  const url = new URL("/signin", request.url);
  url.searchParams.set("callbackUrl", encodeURI(request.nextUrl.pathname));
  return NextResponse.redirect(url);
}

// Keeping this for backward compatibility, but it won't be used in role-less authorization
export function redirectToUnauthorized(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}
