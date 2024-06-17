"use client";
import React, { useEffect, useState } from "react";
import useDropdownInput from "../common/useDropdownInput";
import Image from "next/image";

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

const ReservationStatus = ({
  myActivityList,
}: {
  myActivityList: ActivityData[];
}) => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const activitiesList = myActivityList.map((item) => item.title);
  const { selected, renderDropdown } = useDropdownInput(
    activitiesList,
    "체험 선택하기",
  );

  useEffect(() => {
    if (selected !== null) {
      const selectedActivity = myActivityList.filter(
        (item) => item.title === selected,
      )[0];
      setSelectedActivity(selectedActivity.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="w-full">
      {renderDropdown()}
      {selectedActivity !== null ? (
        <section className="mb-24">
          <div className="mx-auto w-fit">달력 좌우</div>
          <div className="h-[800px] rounded bg-white">달력</div>
        </section>
      ) : (
        <div className="mx-auto mt-20 flex w-fit flex-col items-center">
          <Image
            src="/icons/no-result.svg"
            width={130}
            height={177}
            alt="아직 등록한 체험이 없습니다."
          />
          <span className="mt-10 inline-block text-xl font-medium text-gray-70 md:text-2xl">
            예약을 확인할 체험을 선택해 주세요.
          </span>
        </div>
      )}
    </div>
  );
};

export default ReservationStatus;
