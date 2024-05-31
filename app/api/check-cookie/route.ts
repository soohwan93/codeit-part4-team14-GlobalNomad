import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieName = "accessToken";

  // 쿠키를 가져옴
  const cookieValue = req.cookies.get(cookieName);

  // 쿠키의 존재 여부를 확인
  const cookieExists = cookieValue !== undefined;

  // JSON 응답으로 쿠키 존재 여부를 반환
  return NextResponse.json({ cookieExists });
}
