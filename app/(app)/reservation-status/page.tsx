import ReservationStatus from "@/components/reservation-status/ReservationStatus";
import { getMyActivities } from "@/util/api";
import Image from "next/image";
import Link from "next/link";
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
    <div className="min-w-screen mt-1 min-h-screen bg-gray-10 px-4 pb-20 pt-14 md:mt-0 md:px-8 md:pt-16">
      <main className="mx-auto w-full max-w-[75rem]">
        <header className="mx-auto max-w-[768px] xl:px-4">
          <h2 className="mx-auto mb-8 text-[2rem] font-bold leading-normal text-black md:mt-5">
            예약 현황
          </h2>
        </header>
        {myActivityList.activities.length !== 0 ? (
          <ReservationStatus myActivityList={myActivityList.activities} />
        ) : (
          <div className="mx-auto mt-20 flex w-fit flex-col items-center">
            <Image
              src="/icons/no-result.svg"
              width={130}
              height={177}
              alt="아직 등록한 체험이 없습니다."
            />
            <span className="mt-10 inline-block text-xl font-medium text-gray-70 md:text-2xl">
              아직 등록한 체험이 없어요.
            </span>
            <Link
              href="/activity-management/create"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-medium text-white hover:bg-blue-800
              focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-sm"
            >
              내 체험 등록해보기
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default page;
