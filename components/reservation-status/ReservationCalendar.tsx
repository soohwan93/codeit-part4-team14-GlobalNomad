"use client";
import React from "react";

type Props = {};
const DAY_LIST = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const ReservationCalendar = (props: Props) => {
  return (
    <section className="mb-24">
      <div className="mx-auto w-fit">달력 좌우</div>
      <div className="grid h-[800px] grid-cols-7 gap-0.5 overflow-hidden rounded border-[0.125rem] border-gray-20 bg-gray-20">
        {DAY_LIST.map((item) => (
          <div
            className="h-fit bg-white py-2 text-center font-mono text-base font-medium leading-normal text-gray-60"
            key={`${item}요일`}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReservationCalendar;
