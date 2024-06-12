import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isOnMainPage = req.nextUrl.pathname === "/";
  const isOnDetailPage = req.nextUrl.pathname.startsWith("/activity-detail");

  const refreshTokenExpires = req.auth?.expires;
  const isRefreshTokenExpired = Date.now() > +(refreshTokenExpires || 0);
  //테스트를 위해 refreshToken이 만료되었다고 가정
  // const isRefreshTokenExpired = true;

  console.log("Auth:", req.auth);
  console.log("Refresh Token Expires:", refreshTokenExpires);
  console.log("Current Time:", Date.now());
  console.log("Is Refresh Token Expired:", isRefreshTokenExpired);

  if (isRefreshTokenExpired) {
    console.log("Refresh token 만료, signin 페이지로 이동");
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
