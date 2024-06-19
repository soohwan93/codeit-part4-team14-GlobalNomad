"use client";
import React, { useEffect, useRef, useState } from "react";
import ReservationTypeSelector from "./ReservationTypeSelector";
import useDropdownInput from "@/components/common/useDropdownInput";
import {
  getMyActivityReservations,
  getMyActivityReservedSchedule,
} from "@/util/api";
import ReservationCardList from "./ReservationCardList";

interface ReservationModalContents {
  reservationData: {
    date: string;
    reservations: {
      completed: number;
      confirmed: number;
      pending: number;
    };
  };
  type: string;
  activityId: number;
}

interface ActivitySchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

interface ScheduleReservationType {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ScheduleReservationResponseType {
  cursorId: number;
  totalCount: number;
  reservations: ScheduleReservationType[];
}
type ReservationsStatus = "declined" | "pending" | "confirmed" | "completed";

const ReservationModalContents = ({
  type,
  reservationData,
  activityId,
}: ReservationModalContents) => {
  const [currentModalType, setCurrentModalType] =
    useState<ReservationsStatus>(type);
  const [dayScheduleArray, setDayScheduleArray] = useState<string[]>([]);
  const [scheduleReservationArray, setScheduleReservationArray] = useState<
    ScheduleReservationType[] | null
  >(null);
  const [selectedReservationStatusArray, setSelectedReservationStatusArray] =
    useState<[number, number, number]>([0, 0, 0]);
  const [refreshSwitch, setRefreshSwitch] = useState(false);

  const reservationCursorId = useRef<number>(0);
  const { selected, renderDropdown } = useDropdownInput(
    dayScheduleArray,
    "예약 일정을 선택해 주세요.",
  );
  const selectedDate = reservationData.date.split("-");

  const handleGetCurrentDaySchedule = async () => {
    const response = await getMyActivityReservedSchedule(activityId, {
      date: reservationData.date,
    });
    const scheduleArray = response.map(
      (item: ActivitySchedule) => item.startTime + " ~ " + item.endTime,
    );
    setDayScheduleArray(scheduleArray);
  };

  const handleChangeSchedule = async (time: string) => {
    const aresponse = await getMyActivityReservedSchedule(activityId, {
      date: reservationData.date,
    });
    const selectedTime = aresponse.filter(
      (item) => item.startTime === time.split(" ~ ")[0],
    )[0];
    const response: ScheduleReservationResponseType =
      await getMyActivityReservations(activityId, {
        scheduleId: selectedTime.scheduleId,
        status: currentModalType === "completed" ? "pending" : currentModalType,
        size: "10",
      });

    setSelectedReservationStatusArray([
      selectedTime.count.pending,
      selectedTime.count.confirmed,
      selectedTime.count.declined,
    ]);

    reservationCursorId.current = response.cursorId;
    console.log(response);

    setScheduleReservationArray(response.reservations);
  };

  useEffect(() => {
    handleGetCurrentDaySchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected) {
      handleChangeSchedule(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, currentModalType, refreshSwitch]);

  return (
    <div className="h-[33rem] max-h-[33rem] overflow-hidden">
      <ReservationTypeSelector
        type={currentModalType}
        setType={setCurrentModalType}
        selectedReservationData={selectedReservationStatusArray}
      />
      <div>
        <span className="mb-4 mt-7 block text-xl font-semibold leading-normal text-black">
          예약 날짜
        </span>
        <span className="mb-2.5 mt-3 block text-xl leading-normal text-black">
          {selectedDate[0]}년 {selectedDate[1]}월 {selectedDate[2]}일
        </span>
        {renderDropdown()}
      </div>
      <span className="mb-4 mt-7 block text-xl font-semibold leading-normal text-black">
        예약 내역
      </span>

      <ReservationCardList
        reservationList={scheduleReservationArray}
        setRefresh={() => setRefreshSwitch(!refreshSwitch)}
      />
    </div>
  );
};

export default ReservationModalContents;
