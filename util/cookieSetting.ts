import { setCookie, destroyCookie } from "nookies";

//accessToken을 쿠키로 저장하는 함수
export function setAccessTokenCookie(accessTokenValue: string) {
  setCookie(null, "accessToken", accessTokenValue, {
    maxAge: 30 * 60, // 수명: 30분
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: true, //스크립트로 불러 올 수 없는 옵션 - xss공격 방지
  });
}

//refreshToken을 쿠키로 저장하는 함수
export function setRefreshTokenCookie(refreshTokenValue: string) {
  setCookie(null, "refreshToken", refreshTokenValue, {
    maxAge: 24 * 14 * 60 * 60, // 수명: 2주일
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: true, //스크립트로 불러 올 수 없는 옵션 - xss공격 방지
  });
}

//생성한 모든 쿠키 삭제하는 코드(accessToken, refreshToken)
export function removeAllTokenCookies() {
  destroyCookie(null, "accessToken", { path: "/" });
  destroyCookie(null, "refreshToken", { path: "/" });
}
