import ReservationStatus from "@/components/reservation-status/ReservationStatus";
import { getMyActivities } from "@/util/api";
import React from "react";

interface ActivityData {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  updatedAt: string;
  userId: number;
}
interface myActivityListTypes {
  activities: ActivityData[];
  cursorId: number | null;
  totalCount: number;
}

const page = async () => {
  const myActivityList: myActivityListTypes = await getMyActivities();

  return (
    <div className="h-screen w-screen bg-gray-10 px-8 pt-16">
      <main className="mx-auto w-full max-w-[75rem]">
        <h2 className="mb-8 text-[2rem] font-bold leading-normal text-black">
          예약 현황
        </h2>
        <ReservationStatus myActivityList={myActivityList.activities} />
      </main>
    </div>
  );
};

export default page;
