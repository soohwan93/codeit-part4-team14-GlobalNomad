import { removeAllTokenCookies } from "@/util/cookieSetting";
import { NextRequest, NextResponse } from "next/server";

async function handleRequest(
  request: NextRequest,
): Promise<NextResponse<{ message: string }>> {
  removeAllTokenCookies();
  return NextResponse.json({ message: "로그아웃되었습니다." }, { status: 200 });
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
