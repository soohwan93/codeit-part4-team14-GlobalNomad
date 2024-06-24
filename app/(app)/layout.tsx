import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GNB from "@/components/common/GNB";
import Footer from "@/components/common/Footer";
import { SessionProviderWrapper } from "@/contexts/SessionProviderWrapper";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { NotificationProvider } from "@/contexts/NotificationContext";

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
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <NextUIProvider>
          <SessionProvider>
            <SessionProviderWrapper>
              <NotificationProvider>
                <GNB />
                {children}
                <Footer />
                <div id="portal"></div>
              </NotificationProvider>
            </SessionProviderWrapper>
          </SessionProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
