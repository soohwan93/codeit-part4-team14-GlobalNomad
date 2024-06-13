"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReservationCounterPresenter from "./ReservationCounter/ReservationCounterPresenter";
import ReservationDatePresenter from "./ReservationDate/ReservationDatePresenter";
import { CalendarValue } from "./calendarTypes";
import Button from "@/components/common/Button";
import { postActivityReservation } from "@/util/api";
import NotificationPopup from "@/components/common/Popup/NotificationPopup";
import { useRouter } from "next/navigation";

interface ReservationModalProps {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

const ReservationModal = ({
  price,
  activityId,
  schedules,
  isUserOwner,
}: {
  price: number;
  schedules: ReservationModalProps[];
  activityId: string;
  isUserOwner: boolean;
}) => {
  const [currentReservationCount, setCurrentReservationCount] = useState(1);
  const [reservationDate, setReservationDate] = useState<null | string>(null);
  const [reservationTime, setReservationTime] = useState<
    null | [string, string]
  >(null);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [filteredSchedules, setFilteredSchedule] = useState<
    ReservationModalProps[]
  >([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const selectedSchedule = useRef<ReservationModalProps | null>(null);

  const router = useRouter();

  // calendar에서 날짜가 선택되었을 때 실행하는 함수
  const handleSelectDay = (item: CalendarValue) => {
    if (item !== null) {
      const selectedDate = item.toLocaleString().split(". ");
      const month =
        selectedDate[1].length === 2 ? selectedDate[1] : "0" + selectedDate[1];
      const day =
        selectedDate[2].length === 2 ? selectedDate[2] : "0" + selectedDate[2];
      const date = selectedDate[0] + "-" + month + "-" + day;

      setReservationDate(date);
      setFilteredSchedule(schedules.filter((item) => item.date === date));
      setReservationTime(null);
      selectedSchedule.current = null;
    }
  };

  // 예약할 일정을 선택했을 경우 실행할 함수
  const handleDropdownSelect = (selectedTime: string) => {
    if (selectedTime !== null) {
      selectedSchedule.current = schedules.filter(
        (item) =>
          item.startTime === selectedTime.split(" ~ ")[0] &&
          item.date === reservationDate,
      )[0];
      setReservationTime([
        selectedSchedule.current.startTime,
        selectedSchedule.current.endTime,
      ]);
    }
  };

  const handleReservationSubmit = async () => {
    // 입력된 정보를 예약 버튼을 눌러 서버에 리퀘스트를 보낼 때 사용할 함수
    if (!selectedSchedule.current) {
      setNotificationMessage("예약하고자 하는 일정을 선택해 주세요!");
      setIsNotificationOpen(true);
      return;
    }

    try {
      const response = await postActivityReservation(Number(activityId), {
        scheduleId: selectedSchedule.current.id,
        headCount: currentReservationCount,
      });
      setNotificationMessage("예약 신청이 성공했어요!");
      setIsNotificationOpen(true);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        setNotificationMessage("로그인을 먼저 해주세요!");
        setIsNotificationOpen(true);
        return;
      }
    }
  };

  const handlePopupClose = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-screen shrink-0 flex-row items-center justify-between bg-white p-4 outline outline-[1px] outline-[#a1a1a1] md:relative md:bottom-0 md:block md:h-max md:min-h-[26.9375rem] md:w-[15.6875rem] md:flex-col md:rounded-xl md:p-0 md:pb-5 xl:min-h-[46.625rem] xl:w-[24rem] xl:p-6">
      <div className="grid md:grid-cols-1">
        <div className="md:px-6 md:pt-6 xl:p-0">
          <div className="flex items-center font-bold md:text-2xl xl:text-[1.75rem]">
            ₩&nbsp;{price.toLocaleString("ko-KR")}&nbsp;
            <span className="inline text-xl font-normal text-[#4b4b4b] md:text-base">
              /
            </span>
            <span className="hidden text-xl font-normal text-[#4b4b4b] md:inline md:text-base">
              &nbsp;인
            </span>
          </div>
        </div>

        <hr color="#a1a1a1" className="my-4 hidden md:row-start-2 md:block" />

        <div className="col-start-1 col-end-5 md:row-start-3">
          <ReservationDatePresenter
            schedules={filteredSchedules}
            date={reservationDate}
            time={reservationTime}
            setDate={handleSelectDay}
            setTime={handleDropdownSelect}
            showModal={showDateModal}
            setShowModal={setShowDateModal}
            setShowNextModal={setShowCounterModal}
          />
        </div>

        <div className="col-start-2 row-start-1 md:col-start-1 md:row-start-6 md:mt-[1.875rem] md:inline xl:mt-0">
          <ReservationCounterPresenter
            count={currentReservationCount}
            setCount={setCurrentReservationCount}
            showModal={showCounterModal}
            setShowModal={setShowCounterModal}
          />
        </div>

        <hr color="#a1a1a1" className="my-4 hidden md:row-start-5 xl:block" />
      </div>

      <div className="w-24 md:mt-6 md:h-14 md:w-auto md:px-6 xl:p-0">
        <Button
          variant="primary"
          size="full"
          disabled={Boolean(!selectedSchedule.current) || isUserOwner}
          onClick={() => handleReservationSubmit()}
        >
          예약하기
        </Button>
      </div>

      <hr color="#a1a1a1" className="mb-4 mt-6 hidden md:block" />

      <div className="hidden text-xl font-bold leading-[130%] md:flex md:justify-between md:px-6 xl:p-0">
        <span className="text-nowrap">총 합계&nbsp;</span>
        <span className="truncate">
          ₩ {(currentReservationCount * price).toLocaleString("ko-KR")}
        </span>
      </div>
      <NotificationPopup
        message={notificationMessage}
        onClose={() => handlePopupClose()}
        isOpen={isNotificationOpen}
      />
    </div>
  );
};

export default ReservationModal;
