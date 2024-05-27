"use client";
import React, { Dispatch, RefObject, SetStateAction, useState } from "react";
import ReservationCounter from "./ReservationCounter";

interface ReservationCounterModalProp {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const ReservationCounterModal = ({
  count,
  setCount,
}: ReservationCounterModalProp) => {
  const [showCounterModal, setShowCounterModal] = useState(false);

  return (
    <>
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
      {showCounterModal && <div className="fixed h-screen w-screen "></div>}
    </>
  );
};

export default ReservationCounterModal;
