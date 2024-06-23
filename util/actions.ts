"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { FetchMethod, LoginBody } from "./apiType";
import { BASE_URL } from "./api";
import { ERROR_MESSAGE } from "./constraints";

// 로그인 함수
export async function authenticate(
  prevState: string | undefined,
  formData: LoginBody,
): Promise<string> {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    return "";
  } catch (error: any) {
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case "CredentialsSignin":
          return "유효하지 않은 자격증명입니다.";
        default:
          return "존재하지 않는 유저입니다.";
      }
    }
    return "Unknown error occurred";
  }
}

//공통 fetcher함수(use server로 인해 해당 구역으로 이동)
export async function fetcher(
  endpoint: string,
  method: FetchMethod,
  body?: Object | null,
  token?: string,
) {
  // 서버 측에서 next-auth에서 설정한 session값 확인
  const session = await auth();
  const accessToken = token ? token : session?.accessToken;

  // 요청에 필요한 헤더 설정
  const headers = new Headers();
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  if (body && method !== "DELETE") {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      headers.append("Content-Type", "application/json");
      options.body = JSON.stringify(body);
    }
  }

  // 원격 서버로 요청을 전송
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  // 응답이 JSON 형식인지 확인
  const contentType = response.headers.get("content-type");
  let jsonResponse;
  if (contentType && contentType.includes("application/json")) {
    jsonResponse = await response.json();
  } else {
    jsonResponse = null;
  }

  if (!response.ok) {
    const errorResponse = jsonResponse || {
      message: ERROR_MESSAGE.UNKNOWN,
    };
    console.error(errorResponse.message);
    return errorResponse.message;
  }

  return jsonResponse;
}

// 로그아웃 함수
export async function logout() {
  await signOut();
}
