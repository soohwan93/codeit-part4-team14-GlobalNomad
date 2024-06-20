import CreateOrUpdateMain from "@/components/activity-management/createOrupdate/CreateOrUpdateMain";
import CreateOrUpdateWrapper from "@/components/activity-management/createOrupdate/CreateOrUpdateWrapper";
import { getActivityById } from "@/util/api";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    activityId: number;
  };
}

export interface ActivityResponseById {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: [
    {
      id: number;
      imageUrl: string;
    },
  ];
  schedules: [
    {
      id: number;
      date: string;
      startTime: string;
      endTime: string;
    },
  ];
}

const page = async ({ params }: Props) => {
  const { activityId } = params;
  let responseApiData: ActivityResponseById | null = null;
  try {
    const res = await getActivityById(activityId);
    if (!res.message) {
      responseApiData = res;
    }
  } catch (error: any) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
        <span className="text-6xl">{error.message}</span>
        <Link href={"/"} className="text-nomad-black underline">
          메인 페이지로 이동
        </Link>
      </div>
    );
  }
  if (responseApiData) {
    return (
      <CreateOrUpdateWrapper>
        <CreateOrUpdateMain responseApiData={responseApiData} />
      </CreateOrUpdateWrapper>
    );
  }
};

export default page;
