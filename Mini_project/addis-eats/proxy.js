import { NextResponse } from "next/server";

export function proxy(request) {
  // Let Server Actions reach their own authorization checks.
  if (
    request.method === "POST" &&
    request.headers.has("next-action")
  ) {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies.has("session");

  if (hasSessionCookie) {
    return NextResponse.next();
  }

  const next =
    request.nextUrl.pathname + request.nextUrl.search;

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", next);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
