import { cookies } from "next/headers";

//accessToken을 쿠키로 저장하는 함수
export function setAccessTokenCookie(accessTokenValue: string) {
  const cookieStore = cookies();
  cookieStore.set("accessToken", accessTokenValue, {
    maxAge: 30 * 60, // 수명: 30분
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: true, //스크립트로 불러 올 수 없는 옵션 - xss공격 방지})
  });
}

//refreshToken을 쿠키로 저장하는 함수
export function setRefreshTokenCookie(refreshTokenValue: string) {
  const cookieStore = cookies();
  cookieStore.set("refreshToken", refreshTokenValue, {
    maxAge: 24 * 14 * 60 * 60, // 수명: 2주일
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: true, //스크립트로 불러 올 수 없는 옵션 - xss공격 방지
  });
}

//생성한 모든 쿠키 삭제하는 코드(accessToken, refreshToken)
export function removeAllTokenCookies() {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
