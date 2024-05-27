"use client";
import React from "react";

const ReservationModal = () => {
  return (
    <div className="fixed bottom-0 flex w-screen flex-row justify-between bg-white p-4 outline outline-[1px] outline-[#a1a1a1] md:relative md:bottom-0 md:block md:h-[26.9375rem] md:w-[15.6875rem] md:flex-col md:rounded-xl xl:h-[46.625rem] xl:w-[24rem]">
      <div className="grid grid-cols-2 md:grid-cols-1">
        <span>가격 / </span>
        <span>인원수</span>
        <span className="md:row-start-2">날짜</span>
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
