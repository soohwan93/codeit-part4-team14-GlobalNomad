import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ClientProviders from "@/components/common/NotificationModal/ClientProvider";

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
      <body className={pretendard.variable}>
        <Header />
        <ClientProviders>
          {children}
        </ClientProviders>
        <Footer />
        <div id="portal"></div>
      </body>
    </html>
  );
}
