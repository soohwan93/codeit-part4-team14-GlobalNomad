import { getMyNotifications } from "@/util/api";
import { MyNotificationsQuery } from "@/util/apiType";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const result = await request.json();
  // 알림 get 요청
  const query: MyNotificationsQuery = {
    size: 5,
  };

  const res = await getMyNotifications(query, result.accessToken);

  if (!res.message) {
    return NextResponse.json({ success: "ok", data: res }, { status: 200 });
  } else {
    return NextResponse.json({ message: res.message }, { status: 200 });
  }
}
