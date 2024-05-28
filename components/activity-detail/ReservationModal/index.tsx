"use client";
import React, { useRef, useState } from "react";
import ReservationCounterPresenter from "./ReservationCounter/ReservationCounterPresenter";
import ReservationDatePresenter from "./ReservationDate/ReservationDatePresenter";

const ReservationModal = () => {
  const [currentReservationCount, setCurrentReservationCount] = useState(1);
  const [reservationDate, setReservationDate] = useState<null | string>(null);

  return (
    <div className="fixed bottom-0 flex w-screen flex-row justify-between bg-white p-4 outline outline-[1px] outline-[#a1a1a1] md:relative md:bottom-0 md:block md:h-max md:min-h-[26.9375rem] md:w-[15.6875rem] md:flex-col md:rounded-xl md:p-0 xl:min-h-[46.625rem] xl:w-[24rem] xl:p-6">
      <div className="grid md:grid-cols-1">
        <div className="md:px-6 md:pt-6 xl:p-0">
          <div className="flex items-center font-bold md:text-2xl xl:text-[1.75rem]">
            가격&nbsp;
            <span className="inline text-xl font-normal text-[#4b4b4b] md:text-base">
              /
            </span>
            <span className="hidden text-xl font-normal text-[#4b4b4b] md:inline md:text-base">
              &nbsp;인
            </span>
          </div>
        </div>

        <hr color="#a1a1a1" className="my-4 hidden md:row-start-2 md:block" />

        <div className="col-start-1 col-end-3 md:row-start-3">
          <ReservationDatePresenter
            date={reservationDate}
            setDate={setReservationDate}
          />
        </div>

        <div className="col-start-2 row-start-1 md:col-start-1 md:row-start-6 md:inline">
          <ReservationCounterPresenter
            count={currentReservationCount}
            setCount={setCurrentReservationCount}
          />
        </div>

        <hr color="#a1a1a1" className="my-4 hidden md:row-start-5 md:block" />
      </div>

      <div className="mt-6 md:h-14 md:px-6 xl:p-0">
        <button className="h-full outline md:w-full">예약하기</button>
      </div>

      <hr color="#a1a1a1" className="mb-4 mt-6 hidden md:block" />

      <div className="hidden text-xl font-bold leading-[130%] md:flex md:justify-between md:px-6 xl:p-0">
        <span>총 합계</span>
        <span>₩ {currentReservationCount * 10}</span>
      </div>
    </div>
  );
};

export default ReservationModal;
