"use client";
import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { CalendarValue } from "../calendarTypes";
import useDropdownInput from "@/components/common/useDropdownInput";

interface ReservationDateType {
  setDate: (date: CalendarValue) => void;
  setTime: (time: string) => void;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

const ReservationDate = ({
  setDate,
  setTime,
  schedules,
}: ReservationDateType) => {
  const { selected, renderDropdown } = useDropdownInput(
    schedules.map((item) => item.startTime + " ~ " + item.endTime),
    "예약 가능한 시간",
  );

  useEffect(() => {
    if (selected !== null) {
      setTime(selected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
