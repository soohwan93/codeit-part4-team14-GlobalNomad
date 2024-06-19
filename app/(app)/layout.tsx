import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GNB from "@/components/common/GNB";
import Footer from "@/components/common/Footer";
import { SessionProviderWrapper } from "@/contexts/SessionProviderWrapper";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "여행",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <SessionProviderWrapper>
              <GNB />
              {children}
              <Footer />
              <div id="portal"></div>
            </SessionProviderWrapper>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
