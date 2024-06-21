import { patchMyActivity, postActivity } from "@/util/api";
import { revalidatePath } from "next/cache";
import { MyActivityBody, PostActivityBody } from "@/util/apiType";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { activityId: number } },
) {
  const activityId = params.activityId;
  const body = await request.json();

  // 체험 수정 요청 처리
  const res = await patchMyActivity(activityId, body as MyActivityBody);

  revalidatePath("/activity-management");
  if (!res.message) {
    return NextResponse.json({ success: "ok" }, { status: 200 });
  } else {
    return NextResponse.json({ message: res.message }, { status: 200 });
  }
}
