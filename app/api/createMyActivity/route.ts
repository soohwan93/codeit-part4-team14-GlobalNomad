import { postActivity } from "@/util/api";
import { revalidatePath } from "next/cache";
import { PostActivityBody } from "@/util/apiType";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // 체험 생성 요청 처리
  const res = await postActivity(body as PostActivityBody);

  revalidatePath("/activity-management");
  if (!res.message) {
    return NextResponse.json({ success: "ok" }, { status: 200 });
  } else {
    return NextResponse.json({ message: res.message }, { status: 200 });
  }
}
