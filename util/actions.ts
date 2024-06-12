"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginBody } from "./apiType";

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
