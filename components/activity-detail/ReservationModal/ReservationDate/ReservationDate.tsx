"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { CalendarValue } from "../calendarTypes";
import DropdownInput from "@/components/common/DropdownInput";

interface ReservationDateType {
  setDate: (date: CalendarValue) => void;
  time: [string, string] | null;
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
  time,
  setTime,
  schedules,
}: ReservationDateType) => {
  const [resetSwitch, setResetSwitch] = useState(false);

  const handleDateChange = (selectedDate: CalendarValue) => {
    setDate(selectedDate);
    setResetSwitch(!resetSwitch);
  };

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <Calendar
          locale="ko"
          minDate={new Date()}
          onChange={(item) => {
            handleDateChange(item);
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
        <DropdownInput
          defaultValue={time !== null ? time[0] + " ~ " + time[1] : null}
          dataArray={schedules.map(
            (item) => item.startTime + " ~ " + item.endTime,
          )}
          type="예약 가능한 시간"
          onClick={setTime}
          needReset={resetSwitch}
        />
      </div>
    </div>
  );
};

export default ReservationDate;
