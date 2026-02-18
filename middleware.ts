import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";
const EXECUTIVO_PATH = "/executivo";

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get(AUTH_COOKIE_NAME);
  const isAuthenticated = Boolean(token?.value);
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const redirectUrl = isAuthenticated ? EXECUTIVO_PATH : LOGIN_PATH;
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (pathname === DASHBOARD_PATH) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    return NextResponse.redirect(new URL(EXECUTIVO_PATH, request.url));
  }

  const protectedPaths = [EXECUTIVO_PATH, "/ponto", "/ferias"];
  if (protectedPaths.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (pathname === LOGIN_PATH && isAuthenticated) {
    return NextResponse.redirect(new URL(EXECUTIVO_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard", "/executivo", "/ponto", "/ferias"],
};
