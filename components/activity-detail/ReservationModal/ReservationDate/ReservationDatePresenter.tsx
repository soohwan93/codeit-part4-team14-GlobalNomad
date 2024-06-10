"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReservationPopup from "../../../common/ModalPortal";
import ReservationDate from "./ReservationDate";
import "react-calendar/dist/Calendar.css";
import { CalendarValue } from "../calendarTypes";

interface Schedules {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ReservationDatePresenterProp {
  schedules: Schedules[];
  date: string | null;
  setDate: (date: CalendarValue) => void;
  time: null | [string, string];
  setTime: (date: string) => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowNextModal: Dispatch<SetStateAction<boolean>>;
}

const ReservationDatePresenter = ({
  schedules,
  date,
  setDate,
  time,
  setTime,
  showModal,
  setShowModal,
  setShowNextModal,
}: ReservationDatePresenterProp) => {
  const [filteredSchedules, setFilteredSchedule] = useState<Schedules[]>([]);

  useEffect(() => {
    if (date !== null) {
      setFilteredSchedule(schedules.filter((item) => item.date === date));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className="md:px-6 xl:p-0">
      <h5 className="mb-2 hidden text-xl font-bold leading-[130%] md:block">
        날짜
      </h5>
      <div className="hidden xl:block">
        <ReservationDate
          setDate={setDate}
          setTime={setTime}
          schedules={filteredSchedules}
        />
      </div>
      <span
        className="inline text-sm font-medium leading-[1.625rem] text-[#0b3b2d] underline md:text-base md:font-semibold xl:hidden"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {date === null || time === null
          ? "날짜 선택하기"
          : String(date) + " " + time[0] + " ~ " + time[1]}
      </span>
      {showModal && (
        <ReservationPopup
          title="날짜"
          setState={setShowModal}
          buttonName="확인"
          onButtonClick={() => {
            setShowNextModal(true);
            setShowModal(false);
          }}
        >
          <ReservationDate
            setDate={setDate}
            setTime={setTime}
            schedules={filteredSchedules}
          />
        </ReservationPopup>
      )}
    </div>
  );
};

export default ReservationDatePresenter;
