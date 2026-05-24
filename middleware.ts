import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the login page and the auth API through
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin-auth")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (token !== process.env.ADMIN_TOKEN) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin-auth/:path*"],
};
