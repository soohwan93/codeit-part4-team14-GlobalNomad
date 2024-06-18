"use client";
import React, { useEffect, useRef, useState } from "react";
import useCalendar from "./useCalendar";
import { subMonths } from "date-fns";
import { getMyActivityReservationDashBoard } from "@/util/api";

interface ReservationCalendarProps {
  selectedActivityId: number;
}

interface ReservationStatusOfMonth {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

const DAY_LIST = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const ReservationCalendar = ({
  selectedActivityId,
}: ReservationCalendarProps) => {
  const calendar = useCalendar();
  const [reservationStatusOfMonth, setReservationStatusOfMonth] = useState<
    ReservationStatusOfMonth[]
  >([]);
  const currentMonth = useRef(
    calendar.currentDate.getFullYear() +
      "-" +
      String(calendar.currentDate.getMonth() + 1).padStart(2, "0") +
      "-",
  );

  const handleClickMonthChangeButton = async (direction: number) => {
    setReservationStatusOfMonth([]);
    const directionInFunc = -direction;
    const year = subMonths(calendar.currentDate, directionInFunc).getFullYear();
    const month = String(
      subMonths(calendar.currentDate, directionInFunc).getMonth() + 1,
    ).padStart(2, "0");

    calendar.setCurrentDate(subMonths(calendar.currentDate, directionInFunc));
    const response = await getMyActivityReservationDashBoard(
      selectedActivityId,
      { year: year, month: month },
    );

    const dateString =
      String(year) + "-" + String(month).padStart(2, "0") + "-";
    currentMonth.current = dateString;

    let convertedArray: ReservationStatusOfMonth[] = [];
    response.map((item: ReservationStatusOfMonth) => {
      convertedArray[Number(item.date.split("-")[2])] = item;
    });

    setReservationStatusOfMonth(convertedArray);
    console.log(convertedArray);
  };

  useEffect(() => {
    handleClickMonthChangeButton(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="">
      <div className="mx-auto mb-6 mt-9 flex w-full max-w-[21.375rem] cursor-default items-center justify-between py-1 text-xl font-bold leading-6 text-black">
        <button
          className="h-6 w-6 shrink-0 rotate-180 rounded-full bg-[url('/icons/arrow.svg')] bg-center bg-no-repeat hover:bg-gray-20"
          onClick={() => handleClickMonthChangeButton(-1)}
          type="button"
        />
        {calendar.currentDate.getFullYear() +
          "년 " +
          (calendar.currentDate.getMonth() + 1) +
          "월"}
        <button
          className="h-6 w-6 shrink-0 rounded-full bg-[url('/icons/arrow.svg')] bg-center bg-no-repeat hover:bg-gray-20"
          onClick={() => handleClickMonthChangeButton(1)}
          type="button"
        />
      </div>
      <div className="grid h-fit auto-rows-min grid-cols-7 gap-0.5 overflow-hidden rounded border-[0.125rem] border-gray-20 bg-gray-20">
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
                key={currentMonth.current + String(dayItem).padStart(2, "0")}
                className="min-h-40 cursor-default flex-col justify-between bg-white p-4 font-mono text-xl font-medium leading-normal text-gray-50"
              >
                {dayItem}
                {reservationStatusOfMonth[dayItem] ? "asdf" : ""}
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
