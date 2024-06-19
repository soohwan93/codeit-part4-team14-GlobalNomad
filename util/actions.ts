"use server";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { FetchMethod, LoginBody } from "./apiType";
import { BASE_URL } from "./api";

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
      switch (error.type) {
        case "CredentialsSignin":
          return "유효하지 않은 자격증명입니다.";
        default:
          console.log("default 에러 발생: ", error.cause?.err?.message);
          return error.cause?.err?.message || "Unknown error occurred";
      }
    }
    return "Unknown error occurred";
  }
}

//공통 fetcher함수(use server로 인해 해당 구역으로 이동)
export async function fetcher(
  endpoint: string,
  method: FetchMethod,
  body?: Object,
  token?: string,
) {
  // 서버 측에서 next-auth에서 설정한 session값 확인
  const session = await auth();
  const accessToken = session?.accessToken;
  console.log(session);
  console.log(accessToken);
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

  if (body) {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      headers.append("Content-Type", "application/json");
      options.body = JSON.stringify(body);
    }
  }
  console.log(options);
  console.log(endpoint);
  // 원격 서버로 요청을 전송
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(errorResponse.message);
    throw new Error(errorResponse.message);
  }

  return response.json();
}
