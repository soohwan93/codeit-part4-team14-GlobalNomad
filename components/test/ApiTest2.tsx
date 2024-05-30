"use client";
import { postActivity } from "@/util/api";
import { PostActivityBody } from "@/util/apiType";
import React from "react";

const ApiTest2 = ({ children }: { children: React.ReactNode }) => {
  const apiPOSTFunctionTest = async () => {
    const body: PostActivityBody = {
      title: "테스트용123",
      category: "투어",
      description: "둠칫 둠칫 두둠칫",
      address: "서울특별시 강남구 테헤란로 427",
      price: 10000,
      schedules: [
        {
          date: "2024-12-01",
          startTime: "12:00",
          endTime: "13:00",
        },
        {
          date: "2024-12-05",
          startTime: "12:00",
          endTime: "13:00",
        },
        {
          date: "2024-12-05",
          startTime: "13:00",
          endTime: "14:00",
        },
        {
          date: "2024-12-05",
          startTime: "14:00",
          endTime: "15:00",
        },
      ],
      bannerImageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png",
      subImageUrls: [
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png",
      ],
    };
    const res = await postActivity(body);
    console.log(res);
  };
  return <div onClick={apiPOSTFunctionTest}>{children}</div>;
};

export default ApiTest2;
