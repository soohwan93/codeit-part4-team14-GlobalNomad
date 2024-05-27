"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReservationPopup from "../ReservationPopup";
import ReservationDate from "./ReservationDate";

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
    <>
      <div className="hidden xl:block">
        <h5 className="mb-2 text-xl font-bold leading-[130%]">날짜</h5>
        <ReservationDate />
      </div>
      <span
        className="inline text-lg font-medium leading-[1.625rem] text-[#0b3b2d] xl:hidden"
        onClick={() => {
          setShowDateModal(true);
        }}
      >
        {date === null ? "날짜 선택하기" : "대충 날짜"}
      </span>
      {showDateModal && (
        <ReservationPopup title="날짜" setState={setShowDateModal}>
          asdf
        </ReservationPopup>
      )}
    </>
  );
};

export default ReservationDatePresenter;
