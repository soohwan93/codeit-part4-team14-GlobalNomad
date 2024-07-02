import type { Metadata } from "next";
import "../(app)/globals.css";
import localFont from "next/font/local";
import { NotificationProvider } from "@/contexts/NotificationContext";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "GlobalNomad | 여행을 더 편하게",
  description: "체험을 빠르게 신청하고 즐기세요!",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
