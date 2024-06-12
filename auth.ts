import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { postLoginTest } from "./util/api";
import { getTokenExpiry } from "./auth.util";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const loginBody = parsedCredentials.data;
          const res = await postLoginTest(loginBody);

          if (!res) return null;

          let accessTokenExpiry = 0;
          let refreshTokenExpiry = 0;
          if (res && res.accessToken && res.refreshToken) {
            accessTokenExpiry = getTokenExpiry(res.accessToken);
            refreshTokenExpiry = getTokenExpiry(res.refreshToken);
          }
          return {
            ...res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            accessTokenExpires: accessTokenExpiry * 1000,
            refreshTokenExpires: refreshTokenExpiry * 1000,
            emailVerified: null,
          };
        }
        return null;
      },
    }),
  ],
});
