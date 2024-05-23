import type { Metadata } from "next";
import "../(app)/globals.css";
import { pretendard } from "../(app)/layout";
export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "여행",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>{children}</body>
    </html>
  );
}
