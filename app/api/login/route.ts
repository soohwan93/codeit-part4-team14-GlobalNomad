import { BASE_URL } from "@/util/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/util/cookieSetting";

async function handleRequest(request: NextRequest) {
  // 클라이언트가 보낸 JSON 데이터를 파싱
  const { endpoint, body, method } = await request.json();

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    // 원격 서버로 요청을 전송
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(
        { message: errorResponse.message },
        { status: response.status },
      );
    }

    // 응답 데이터를 JSON 형식으로 반환
    const data = await response.json();

    //accessToken과 refreshToken 쿠키 설정
    setAccessTokenCookie(data.accessToken);
    setRefreshTokenCookie(data.refreshToken);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "내부 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
