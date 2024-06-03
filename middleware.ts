import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const url = request.nextUrl.clone();
  // 로그인 페이지에서 accessToken이 있는 경우 메인 페이지로 리다이렉트
  if (
    accessToken &&
    (url.pathname === "/signin" || url.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && refreshToken) {
    try {
      const refreshTokenResponse = await fetch(
        `https://sp-globalnomad-api.vercel.app/4-14/auth/tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken.value}`,
          },
        },
      );

      if (refreshTokenResponse.ok) {
        const refreshTokenData = await refreshTokenResponse.json();
        const newAccessToken = refreshTokenData.accessToken;

        // 새로운 accessToken을 쿠키에 설정
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          path: "/",
          maxAge: 30 * 60,
          secure: true,
          httpOnly: true,
          sameSite: "strict",
        });

        if (url.pathname === "/signin" || url.pathname === "/signup") {
          return NextResponse.redirect(new URL("/", request.url));
        }
        // 현재 페이지에 머무름
        return response;
      } else {
        // Refresh token이 유효하지 않으면 로그인 페이지로 리다이렉트
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    } catch (error) {
      console.error("refreshToken 재발급 실패: ", error);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // accessToken과 refreshToken이 모두 없는 경우 로그인 페이지로 리다이렉트
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!^$|^activity-detail/).*)"],
};
