"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { CalendarValue } from "../calendarTypes";

interface ReservationDateType {
  setDate: (date: CalendarValue) => void;
}

const ReservationDate = ({ setDate }: ReservationDateType) => {
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <Calendar
          locale="ko"
          minDate={new Date()}
          onChange={(item) => {
            setDate(item);
          }}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
        />
      </div>
      <div>
        <span className="mb-3 inline-block text-lg font-bold leading-[144%]">
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
