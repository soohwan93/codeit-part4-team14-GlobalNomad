"use client";
import React, { useState } from "react";
import ReservationTypeSelector from "./ReservationTypeSelector";
import useDropdownInput from "@/components/common/useDropdownInput";

interface ReservationModalContents {
  reservationData: {
    date: string;
    reservations: {
      completed: number;
      confirmed: number;
      pending: number;
    };
  };
  type: string;
}

const ReservationModalContents = ({
  type,
  reservationData,
}: ReservationModalContents) => {
  const [currentModalType, setCurrentModalType] = useState(type);
  const [selectedReservationStatusArray, setSelectedReservationStatusArray] =
    useState<[number, number, number]>([0, 0, 0]);
  const { selected, renderDropdown } = useDropdownInput(
    ["1", "2", "3"],
    "예약 일정을 선택해 주세요.",
  );
  const selectedDate = reservationData.date.split("-");

  return (
    <div className="max-h-[43.75rem]">
      <ReservationTypeSelector
        type={currentModalType}
        setType={setCurrentModalType}
        selectedReservationData={selectedReservationStatusArray}
      />
      <div>
        <span className="mb-4 mt-7 block text-xl font-semibold leading-normal text-black">
          예약 날짜
        </span>
        <span className="mb-2.5 mt-3 block text-xl leading-normal text-black">
          {selectedDate[0]}년 {selectedDate[1]}월 {selectedDate[2]}일
        </span>
        {renderDropdown()}
      </div>
      <span className="mb-4 mt-7 block text-xl font-semibold leading-normal text-black">
        예약 내역
      </span>
    </div>
  );
};

export default ReservationModalContents;
