import type { NextAuthConfig } from "next-auth";
import { refreshAccessToken } from "./auth.util";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...user,
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          refreshTokenExpires: user.refreshTokenExpires,
        };
      }
      if (trigger === "update" && session.user.nickname) {
        token.nickname = session.user.nickname;
        token.profileImageUrl = session.user.profileImageUrl;
      }
      if (
        token?.refreshTokenExpires &&
        Date.now() < token.refreshTokenExpires
      ) {
        if (
          token?.accessTokenExpires &&
          Date.now() < token?.accessTokenExpires
        ) {
          return token;
        }
        return refreshAccessToken(token);
      }

      return { ...token, error: "RefreshTokenExpired" };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          emailVerified: null,
          profileImageUrl: token.profileImageUrl as string | null,
          nickname: token.nickname as string,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expires = token.refreshTokenExpires as any;
        session.error = token.error;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
