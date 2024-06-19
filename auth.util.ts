import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { BASE_URL } from "./util/api";

export async function refreshAccessToken(token: JWT) {
  try {
    const refreshTokenExpiry = getTokenExpiry(token.refreshToken as string);

    // 현재 시간이 refreshToken의 만료 시간보다 크면 만료된 것임
    if (Date.now() > +refreshTokenExpiry! * 1000) {
      return {
        ...token,
        error: "RefreshTokenExpired",
      };
    }

    const response = await fetch(`${BASE_URL}/auth/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const refreshedTokens = await response.json();
    const accessTokenExpiry = getTokenExpiry(refreshedTokens.accessToken);
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: +accessTokenExpiry! * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// Refresh token의 만료 시간을 디코딩하여 가져오는 함수
export function getTokenExpiry(token: string): number {
  const decodedToken = jwtDecode(token);
  return decodedToken?.exp!;
}
