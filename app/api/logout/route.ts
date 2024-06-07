import { removeAllTokenCookies } from "@/util/cookieSetting";
import { NextResponse } from "next/server";

async function handleRequest(): Promise<NextResponse<{ message: string }>> {
  removeAllTokenCookies();
  return NextResponse.json({ message: "로그아웃되었습니다." }, { status: 200 });
}

export async function POST() {
  return handleRequest();
}
