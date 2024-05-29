import { removeAllTokenCookies } from "@/util/cookieSetting";
import { NextResponse } from "next/server";

export async function handleRequest() {
  removeAllTokenCookies();
  return NextResponse.json({ message: "로그아웃되었습니다." }, { status: 200 });
}

export async function POST() {
  return handleRequest();
}
