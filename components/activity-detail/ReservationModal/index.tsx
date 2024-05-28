"use client";
import React, { useRef, useState } from "react";
import ReservationCounterPresenter from "./ReservationCounter/ReservationCounterPresenter";
import ReservationDatePresenter from "./ReservationDate/ReservationDatePresenter";

const ReservationModal = () => {
  const [currentReservationCount, setCurrentReservationCount] = useState(1);
  const [reservationDate, setReservationDate] = useState<null | string>(null);

  return (
    <div className="fixed bottom-0 flex w-screen flex-row justify-between bg-white p-4 outline outline-[1px] outline-[#a1a1a1] md:relative md:bottom-0 md:block md:h-[26.9375rem] md:w-[15.6875rem] md:flex-col md:rounded-xl xl:h-[46.625rem] xl:w-[24rem]">
      <div className="grid md:grid-cols-1">
        <div className="inline">
          가격&nbsp;
          <span className="hidden text-[#4b4b4b] md:inline">/&nbsp;인</span>
          <span className="inline md:hidden">
            /&nbsp;
            <ReservationCounterPresenter
              count={currentReservationCount}
              setCount={setCurrentReservationCount}
            />
          </span>
        </div>

        <div className="md:row-start-2">
          <ReservationDatePresenter
            date={reservationDate}
            setDate={setReservationDate}
          />
        </div>
      </div>

      <button>예약하기</button>

      <div className="hidden md:flex md:justify-between">
        <span>총 합계</span>
        <span>₩ 10000원</span>
      </div>
    </div>
  );
};

export default ReservationModal;
