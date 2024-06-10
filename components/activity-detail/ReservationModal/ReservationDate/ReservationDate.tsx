"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { CalendarValue } from "../calendarTypes";
import useDropdownInput from "@/components/common/useDropdownInput";

interface ReservationDateType {
  setDate: (date: CalendarValue) => void;
}

const ReservationDate = ({ setDate }: ReservationDateType) => {
  const { selected, renderDropdown } = useDropdownInput(
    ["1", "2", "3"],
    "예약 가능한 시간",
  );

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
        {renderDropdown()}
      </div>
    </div>
  );
};

export default ReservationDate;
