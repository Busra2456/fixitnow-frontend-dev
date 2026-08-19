import { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/technicians",
  "/about",
  "/contact",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken =
    request.cookies.get("accessToken")?.value;

  let userRole: string | null = null;

  // Verify access token
  if (accessToken) {
    const decodedAccessToken = jwtUtils.verifyToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (
      decodedAccessToken.success &&
      decodedAccessToken.data
    ) {
      userRole = (
        decodedAccessToken.data as JwtPayload
      ).role as string;
    }
  }

  // Logged-in user trying to access login/register
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/customer-dashboard", request.url)
      );
    }

    if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/technician-dashboard/technician", request.url)
      );
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-dashboard/admin", request.url)
      );
    }
  }

  // Check public routes
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
  );

  // Check auth routes
  const isAuthRoute = AUTH_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
  );

  // Not logged in + trying to access protected page
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Customer route protection
  if (pathname.startsWith("/customer-dashboard")) {
    if (userRole !== "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/not-found", request.url)
      );
    }
  }

  // Technician route protection
  if (pathname.startsWith("/technician-dashboard/technician")) {
    if (userRole !== "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/not-found", request.url)
      );
    }
  }

  // Admin route protection
  if (pathname.startsWith("/admin-dashboard/admin")) {
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/not-found", request.url)
      );
    }
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};