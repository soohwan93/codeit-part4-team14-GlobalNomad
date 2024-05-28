"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReservationCounter from "./ReservationCounter";
import ReservationPopup from "../ReservationPopup";

interface ReservationCounterPresenterProp {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const ReservationCounterPresenter = ({
  count,
  setCount,
}: ReservationCounterPresenterProp) => {
  const [showCounterModal, setShowCounterModal] = useState(false);

  return (
    <div className="inline-block md:px-6 xl:p-0">
      <div className="hidden md:block">
        <h5 className="mb-2 text-xl font-bold leading-[130%]">참여 인원 수</h5>
        <ReservationCounter count={count} setCount={setCount} />
      </div>
      <span
        className="inline text-lg font-medium leading-[1.625rem] text-[#0b3b2d] md:hidden"
        onClick={() => {
          setShowCounterModal(true);
        }}
      >
        {count}명
      </span>
      {showCounterModal && (
        <ReservationPopup title="인원 수" setState={setShowCounterModal}>
          <span className="mb-6 block text-xl font-medium leading-[130%]">
            예약할 인원을 선택해주세요.
          </span>
          <ReservationCounter count={count} setCount={setCount} />
        </ReservationPopup>
      )}
    </div>
  );
};

export default ReservationCounterPresenter;
