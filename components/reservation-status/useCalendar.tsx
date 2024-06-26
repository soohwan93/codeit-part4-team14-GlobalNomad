import { getDaysInMonth, subMonths } from "date-fns";
import React, { useEffect, useRef } from "react";

const CALENDER_LENGTH = 42;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  const firstDate = useRef(new Date().setDate(1));
  const firstDay = useRef(new Date(firstDate.current).getDay());

  const prevDayList = Array.from({
    length: Math.max(0, firstDay.current),
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1,
  );

  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    [],
  );

  useEffect(() => {
    firstDate.current = currentDate.setDate(1);
    firstDay.current = new Date(firstDate.current).getDay();
  }, [currentDate]);

  return {
    weekCalendarList: weekCalendarList.filter(
      (item) => item.indexOf(0) !== 0 || item.lastIndexOf(0) !== 6,
    ),
    currentDate: currentDate,
    setCurrentDate: setCurrentDate,
  };
};
export default useCalendar;
