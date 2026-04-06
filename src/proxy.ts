import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set(["/login", "/register"]);
const PROTECTED_PREFIXES = ["/feed"];

function hasAuthCookie(req: NextRequest) {
  return Boolean(
    req.cookies.get("access_token")?.value ||
    req.cookies.get("accessToken")?.value ||
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value,
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isRoot = pathname === "/";
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  const isAuthenticated = hasAuthCookie(req);

  if ((isRoot || isProtectedRoute) && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/feed", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/feed/:path*", "/login", "/register"],
};
