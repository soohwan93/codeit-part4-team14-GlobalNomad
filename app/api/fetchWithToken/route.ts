import { BASE_URL } from "@/util/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

async function handleRequest(request: NextRequest) {
  // 클라이언트가 보낸 JSON 데이터를 파싱
  const { endpoint, body, method } = await request.json();

  // 서버 측에서 httpOnly 쿠키 읽기
  // const accessTokenCookie = request.cookies.get("accessToken");
  // const accessToken = request.cookies.get("accessToken")?.value;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log(cookieStore);
  console.log(cookieStore.get("accessToken"));
  // console.log(accessTokenCookie);
  console.log(accessToken);
  // 요청에 필요한 헤더 설정
  const headers = new Headers();
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  if (body) {
    headers.append("Content-Type", "application/json");
  }

  const options: RequestInit = {
    method,
    headers,
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

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "내부 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

export async function PUT(request: NextRequest) {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request);
}
