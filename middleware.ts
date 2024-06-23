import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isOnMainPage = req.nextUrl.pathname === "/";
  const isOnDetailPage = req.nextUrl.pathname.startsWith("/activity-detail");

  const refreshTokenExpires = req.auth?.expires;
  const isRefreshTokenExpired = Date.now() > +(refreshTokenExpires || 0);

  if (isRefreshTokenExpired) {
    req.auth = null;
    let res;
    if (isOnMainPage || isOnDetailPage) {
      res = NextResponse.next();
    } else {
      res = NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    res.cookies.delete("authjs.session-token");
    res.cookies.delete("authjs.csrf-token");
    return res;
  }

  if (isLoggedIn) {
    return NextResponse.next();
  } else {
    if (isOnMainPage || isOnDetailPage) {
      return NextResponse.next();
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|signin|signup).*)"],
};
