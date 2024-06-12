"use client";

import { createContext, useContext, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

interface SessionType {
  children: React.ReactNode;
}
const SessionContext = createContext<Session | null>(null);

export const SessionProviderWrapper = ({ children }: SessionType) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isOnMainPage = pathname === "/";
  const isOnDetailPage = pathname.startsWith("/activity-detail");

  useEffect(() => {
    if (session?.error === "RefreshTokenExpired") {
      if (isOnMainPage || isOnDetailPage) {
        signOut({ callbackUrl: "/" });
      } else {
        signOut({ callbackUrl: "/signin" });
      }
    }
  }, [session, isOnMainPage, isOnDetailPage]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("SessionProvider 내부에서 사용해야합니다.");
  }
  return context;
};
