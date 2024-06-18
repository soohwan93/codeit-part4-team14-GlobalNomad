"use client";
import React from "react";
import useCalendar from "./useCalendar";

type Props = {};
const DAY_LIST = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const ReservationCalendar = (props: Props) => {
  const calendar = useCalendar();
  console.log(calendar.currentDate.toLocaleDateString().split(". "));

  return (
    <section className="">
      <div className="mx-auto mb-6 mt-9 flex w-full max-w-[21.375rem] items-center justify-between py-1 text-xl font-bold leading-6 text-black">
        <button
          className="h-6 w-6 shrink-0 rotate-180 rounded-full bg-[url('/icons/arrow.svg')] bg-center bg-no-repeat hover:bg-gray-20"
          type="button"
        />
        {calendar.currentDate.toLocaleDateString().split(". ")[0] +
          "년 " +
          calendar.currentDate.toLocaleDateString().split(". ")[1] +
          "월"}
        <button
          className="h-6 w-6 shrink-0 rounded-full bg-[url('/icons/arrow.svg')] bg-center bg-no-repeat hover:bg-gray-20"
          type="button"
        />
      </div>
      <div className="grid h-[800px] auto-rows-min grid-cols-7 gap-0.5 overflow-hidden rounded border-[0.125rem] border-gray-20 bg-gray-20">
        {DAY_LIST.map((item) => (
          <div
            className="h-fit bg-white py-2 text-center font-mono text-base font-medium leading-normal text-gray-60"
            key={`${item}요일`}
          >
            {item}
          </div>
        ))}
        {calendar.weekCalendarList.map((weekItem) =>
          weekItem.map((dayItem, i) =>
            dayItem !== 0 ? (
              <div
                key={`${dayItem}일`}
                className="min-h-40 flex-col justify-between bg-white p-3 font-mono text-xl font-medium leading-normal text-gray-50"
              >
                {dayItem}
              </div>
            ) : (
              <div key={`dummyDay-${i}`} />
            ),
          ),
        )}
      </div>
    </section>
  );
};

export default ReservationCalendar;
