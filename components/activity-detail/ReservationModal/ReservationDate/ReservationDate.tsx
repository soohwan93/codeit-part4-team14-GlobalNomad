"use client";
import React from "react";
import Calendar from "react-calendar";

interface ReservationDateType {}

const ReservationDate = ({}: ReservationDateType) => {
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <Calendar locale="ko" minDate={new Date()} minDetail="year" />
      </div>
      <div>
        <span className="mb-3 text-lg font-bold leading-[144%]">
          예약 가능한 시간
        </span>
        <div className="h-10 w-full outline outline-gray-200">
          드롭다운 컴포넌트
        </div>
      </div>
    </div>
  );
};

export default ReservationDate;
