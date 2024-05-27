import { setCookie, destroyCookie } from "nookies";

//쿠키를 가져오는 함수
export function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

//accessToken을 쿠키로 저장하는 함수
export function setAccessTokenCookie(accessTokenValue: string) {
  setCookie(null, "accessToken", accessTokenValue, {
    maxAge: 60 * 60, // 수명: 1시간
    path: "/",
    secure: true,
    sameSite: "strict",
  });
}

//accessToken을 쿠키로 저장하는 함수
export function setRefreshTokenCookie(refreshTokenValue: string) {
  setCookie(null, "refreshToken", refreshTokenValue, {
    maxAge: 24 * 7 * 60 * 60, // 수명: 1주일
    path: "/",
    secure: true,
    sameSite: "strict",
  });
}

//생성한 모든 쿠키 삭제하는 코드(accessToken, refreshToken)
export function removeAllTokenCookies() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}

//쿠키 삭제 함수
export function deleteCookie(name: string) {
  destroyCookie(null, name, { path: "/" });
}
