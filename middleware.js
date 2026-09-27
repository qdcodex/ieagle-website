import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Gate the admin area and the member dashboard. API routes also check roles themselves.
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value).catch(() => null);

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return session?.role === "admin" ? NextResponse.redirect(new URL("/admin", req.url)) : NextResponse.next();
    }
    if (session?.role !== "admin") {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/members") && session?.role !== "member") {
    return NextResponse.redirect(new URL("/member-login", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/members/:path*"] };
