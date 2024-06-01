import { NextRequest, NextResponse } from "next/server";

async function handleRequest(request: NextRequest) {
  const cookieName = "accessToken"; // 확인하고자 하는 쿠키 이름
  console.log("쿠키 이름:", cookieName);

  // 쿠키를 가져옴
  const cookieValue = request.cookies.get(cookieName);
  console.log("쿠키 값:", cookieValue);

  // 쿠키의 존재 여부를 확인
  const cookieExists = cookieValue !== undefined;
  console.log("쿠키 존재 여부:", cookieExists);

  // JSON 응답으로 쿠키 존재 여부를 반환
  return NextResponse.json({ cookieExists }, { status: 200 });
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}
