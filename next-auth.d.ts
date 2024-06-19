import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      emailVerified: null;
      profileImageUrl: string | null;
      nickname: string;
    };
    accessToken?: string | null;
    refreshToken?: string | null;
    accessTokenExpires?: number;
    refreshTokenExpires?: number;
    error?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    profileImageUrl?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    refreshTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    accessTokenExpires?: number;
    refreshTokenExpires?: number;
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      name?: string;
      image?: string;
    };
    error?: string;
  }
}
