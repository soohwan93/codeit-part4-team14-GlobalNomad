import { NextResponse } from "next/server";
import { deleteMyActivity } from "@/util/api";
import { revalidatePath } from "next/cache";

export async function DELETE(
  request: Request,
  { params }: { params: { activityId: number } },
) {
  const activityId = params.activityId;
  // 체험 삭제 요청 처리
  const res = await deleteMyActivity(activityId);

  revalidatePath("/activity-management");
  if (res) {
    return NextResponse.json({ message: res }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "삭제가 완료 되었습니다!" },
      { status: 200 },
    );
  }
}
