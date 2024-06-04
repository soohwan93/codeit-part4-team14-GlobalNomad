"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReservationPopup from "../../../common/ModalPortal";
import ReservationDate from "./ReservationDate";
import "react-calendar/dist/Calendar.css";
import { CalendarValue } from "../calendarTypes";

interface ReservationDatePresenterProp {
  date: Date | null;
  setDate: (date: CalendarValue) => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowNextModal: Dispatch<SetStateAction<boolean>>;
}

const ReservationDatePresenter = ({
  date,
  setDate,
  showModal,
  setShowModal,
  setShowNextModal,
}: ReservationDatePresenterProp) => {
  return (
    <div className="md:px-6 xl:p-0">
      <h5 className="mb-2 hidden text-xl font-bold leading-[130%] md:block">
        날짜
      </h5>
      <div className="hidden xl:block">
        <ReservationDate setDate={setDate} />
      </div>
      <span
        className="inline text-sm font-medium leading-[1.625rem] text-[#0b3b2d] underline md:text-base md:font-semibold xl:hidden"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {date === null ? "날짜 선택하기" : String(date)}
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
          <ReservationDate setDate={setDate} />
        </ReservationPopup>
      )}
    </div>
  );
};

export default ReservationDatePresenter;
