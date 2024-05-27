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

  // refreshToken을 사용하여 새로운 accessToken을 발급받는 API 호출
  // 공통 api 작업이 완료되면 BASE_URL은 상수 값으로 대체
  const refreshTokenResponse = await fetch(
    `https://sp-globalnomad-api.vercel.app/4-14/auth/tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
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
      maxAge: 60 * 60,
      secure: true,
      sameSite: "strict",
    });

    if (url.pathname === "/signin" || url.pathname === "/signup")
      return NextResponse.redirect(new URL("/folder", request.url));
    // 현재 페이지에 머무름
    return response;
  }

  // accessToken과 refreshToken이 모두 없는 경우 로그인 페이지로 리다이렉트

  if (url.pathname === "/folder") {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/folder/:path*", "/shared/:path*", "/signin", "/signup"],
};
