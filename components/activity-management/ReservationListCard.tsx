"use client";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";

interface ReservationListCardProps {
  id: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  status: "pending" | "confirmed" | "completed" | "declined" | "canceled";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

const ReservationListCard = ({ prop }: { prop: ReservationListCardProps }) => {
  const {
    id,
    activity,
    status,
    reviewSubmitted,
    totalPrice,
    headCount,
    date,
    startTime,
    endTime,
  } = prop;

  const handleStatusString = (status: string) => {
    if (status === "pending") return "예약 완료";
    if (status === "confirmed") return "예약 승인";
    if (status === "completed") return "체험 완료";
    if (status === "declined") return "예약 거절";
    if (status === "canceled") return "예약 취소";
  };

  return (
    <div className="flex h-32 w-full overflow-hidden rounded-3xl bg-white pr-3 shadow-sm outline-[1px] md:h-36 md:pr-4 xl:h-52 xl:pr-6">
      <div className="relative mr-2 inline-block h-full w-32 shrink-0 md:mr-3 md:w-40 xl:mr-6 xl:w-52">
        <Image
          src={activity.bannerImageUrl}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 135px, (max-width: 1200px) 160px, 204px"
          alt="reservationImage"
        />
      </div>
      <section className="my-auto inline-block w-full">
        <div className="md:mb-3 xl:mb-4">
          <span className="text-sm font-bold leading-[1.625rem] text-gray-70 md:text-base">
            {handleStatusString(status)}
          </span>
          <h4 className="truncate text-sm font-bold leading-[1.625rem] text-green-20 md:text-lg xl:text-xl">
            {activity.title}
          </h4>
          <span className="text-xs leading-6 text-nomad-black md:text-sm xl:text-lg">
            {date} · {startTime} - {endTime} · {headCount}명
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <h5 className="text-base font-medium leading-normal text-black md:text-xl xl:text-2xl">
            ₩{totalPrice}
          </h5>
          {status === "completed" && !reviewSubmitted ? (
            <Button additionalClass="xl:w-32 md:h-10 w-20" size="sm">
              후기 작성
            </Button>
          ) : status === "pending" ? (
            <Button
              additionalClass="xl:w-32 md:h-10 w-20"
              variant="white"
              size="sm"
            >
              예약 취소
            </Button>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReservationListCard;
