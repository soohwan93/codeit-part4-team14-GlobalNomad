"use client";
import React, { useEffect, useRef, useState } from "react";
import useCalendar from "./useCalendar";
import { subMonths } from "date-fns";
import { getActivityById, getMyActivityReservationDashBoard } from "@/util/api";
import StatusChipList from "./StatusChipList";
import ModalPortal from "../common/ModalPortal";
import { ReservationsStatus } from "@/util/apiType";
import ReservationModalContents from "./ReservationModalContents";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ReservationsStatus>("pending");
  const [reservationStatusOfMonth, setReservationStatusOfMonth] = useState<
    ReservationStatusOfMonth[]
  >([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [refreshSwitch, setRefreshSwitch] = useState(false);

  const calendar = useCalendar();
  const initialized = useRef(false);
  const currentMonth = useRef(
    calendar.currentDate.getFullYear() +
      "-" +
      String(calendar.currentDate.getMonth() + 1).padStart(2, "0") +
      "-",
  );

  const handleCalendarRefresh = async (directionInFunc: number) => {
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
  };

  const handleClickMonthChangeButton = async (direction: number) => {
    setReservationStatusOfMonth([]);
    const directionInFunc = -direction;
    await handleCalendarRefresh(directionInFunc);
  };

  const handleChipSelect = (type: ReservationsStatus) => {
    setModalType(type);

    setIsModalOpen(true);
  };

  const handleInitializeAtFirstReservation = async () => {
    const response = await getActivityById(selectedActivityId);
    const reservations = response.schedules.filter(
      (item: any) => new Date(item.date) > calendar.currentDate,
    );
    if (reservations.length !== 0) {
      const moveToYear =
        new Date(reservations[0].date).getFullYear() -
        calendar.currentDate.getFullYear();
      const moveToMonth =
        new Date(reservations[0].date).getMonth() -
        calendar.currentDate.getMonth();
      const moveStep = moveToYear * 12 + moveToMonth;
      handleClickMonthChangeButton(moveStep);
      return;
    }
    handleClickMonthChangeButton(0);
  };

  useEffect(() => {
    if (initialized.current === false) {
      handleInitializeAtFirstReservation();
      initialized.current = true;
    } else {
      handleCalendarRefresh(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSwitch]);

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
                className="flex min-h-32 cursor-default flex-col justify-between bg-white p-0.5 font-mono font-medium leading-normal text-gray-50 xl:min-h-40 xl:text-xl"
              >
                <div className="ml-1 mt-2 flex xl:ml-3 xl:mt-4">
                  {dayItem}
                  {reservationStatusOfMonth[dayItem] && (
                    <div
                      className={`ml-1 mt-1 h-1.5 w-1.5 rounded-full xl:h-2 xl:w-2 ${new Date().getDate() > dayItem ? "bg-gray-80" : "bg-blue-30"}`}
                    />
                  )}
                </div>
                {reservationStatusOfMonth[dayItem] ? (
                  <StatusChipList
                    reservationInfo={
                      reservationStatusOfMonth[dayItem].reservations
                    }
                    date={currentMonth.current + dayItem}
                    onChipClick={(type) => {
                      handleChipSelect(type);
                      setSelectedDay(dayItem);
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div key={`dummyDay-${i}`} />
            ),
          ),
        )}
      </div>
      {isModalOpen && (
        <ModalPortal title="예약 정보" usePortal setState={setIsModalOpen}>
          <ReservationModalContents
            reservationData={reservationStatusOfMonth[selectedDay]}
            type={modalType}
            activityId={selectedActivityId}
            refreshSwitch={refreshSwitch}
            setRefreshSwitch={() => {
              setRefreshSwitch(!refreshSwitch);
            }}
          />
        </ModalPortal>
      )}
    </section>
  );
};

export default ReservationCalendar;
