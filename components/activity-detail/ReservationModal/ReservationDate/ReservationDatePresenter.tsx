"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReservationPopup from "../ReservationPopup";
import ReservationDate from "./ReservationDate";
import "react-calendar/dist/Calendar.css";

interface ReservationDatePresenterProp {
  date: string | null;
  setDate: Dispatch<SetStateAction<string | null>>;
}

const ReservationDatePresenter = ({
  date,
  setDate,
}: ReservationDatePresenterProp) => {
  const [showDateModal, setShowDateModal] = useState(false);

  return (
    <div className="md:px-6 xl:p-0">
      <h5 className="mb-2 hidden text-xl font-bold leading-[130%] md:block">
        날짜
      </h5>
      <div className="hidden xl:block">
        <ReservationDate />
      </div>
      <span
        className="inline text-sm font-medium leading-[1.625rem] text-[#0b3b2d] underline md:text-base md:font-semibold xl:hidden"
        onClick={() => {
          setShowDateModal(true);
        }}
      >
        {date === null ? "날짜 선택하기" : "대충 날짜"}
      </span>
      {showDateModal && (
        <ReservationPopup title="날짜" setState={setShowDateModal}>
          <ReservationDate />
        </ReservationPopup>
      )}
    </div>
  );
};

export default ReservationDatePresenter;
