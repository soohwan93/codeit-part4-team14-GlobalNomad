"use client";
import React, { useEffect, useRef, useState } from "react";
import ReservationTypeSelector from "./ReservationTypeSelector";
import useDropdownInput from "@/components/common/useDropdownInput";
import {
  getMyActivityReservations,
  getMyActivityReservedSchedule,
} from "@/util/api";
import ReservationCardList from "./ReservationCardList";
import { ReservationsStatus } from "@/util/apiType";
import {
  ActivitySchedule,
  ScheduleReservationResponseType,
  ScheduleReservationType,
} from "../reservationStatusTypes";

interface ReservationModalContentsType {
  reservationData: {
    date: string;
    reservations: {
      completed: number;
      confirmed: number;
      pending: number;
    };
  };
  type: ReservationsStatus;
  activityId: number;
  refreshSwitch: boolean;
  setRefreshSwitch: () => void;
}

const ReservationModalContents = ({
  type,
  reservationData,
  activityId,
  refreshSwitch,
  setRefreshSwitch,
}: ReservationModalContentsType) => {
  const [currentModalType, setCurrentModalType] =
    useState<ReservationsStatus>(type);
  const [dayScheduleArray, setDayScheduleArray] = useState<string[]>([]);
  const [firstScheduleReservationArray, setFirstScheduleReservationArray] =
    useState<ScheduleReservationType[] | null>([]);
  const [selectedReservationStatusArray, setSelectedReservationStatusArray] =
    useState<[number, number, number]>([0, 0, 0]);
  const selectedDateBuffer = useRef<string[]>([]);

  const reservationCursorId = useRef<number>(0);
  const selectedScheduleId = useRef<number | null>(null);
  const { selected, renderDropdown } = useDropdownInput(
    dayScheduleArray,
    "예약 일정을 선택해 주세요.",
  );
  const selectedDate =
    reservationData?.date.split("-") || selectedDateBuffer.current;
  if (selectedDate !== undefined) {
    selectedDateBuffer.current = selectedDate;
  }

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
    setFirstScheduleReservationArray(null);
    const statusResponse: ActivitySchedule[] =
      await getMyActivityReservedSchedule(activityId, {
        date: reservationData.date,
      });
    const selectedTime = statusResponse.filter(
      (item) => item.startTime === time.split(" ~ ")[0],
    )[0];

    setSelectedReservationStatusArray([
      selectedTime.count.pending,
      selectedTime.count.confirmed,
      selectedTime.count.declined,
    ]);

    const response: ScheduleReservationResponseType =
      await getMyActivityReservations(activityId, {
        scheduleId: selectedTime.scheduleId,
        status: currentModalType,
        size: 10,
      });

    selectedScheduleId.current = selectedTime.scheduleId;
    reservationCursorId.current = response.cursorId;
    setFirstScheduleReservationArray(response.reservations);
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
    <div className="h-full overflow-hidden md:h-[33rem] md:max-h-[33rem]">
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
        firstReservationList={firstScheduleReservationArray}
        firstCursorId={reservationCursorId.current}
        currentScheduleId={selectedScheduleId.current!}
        activityId={activityId}
        setRefresh={setRefreshSwitch}
      />
    </div>
  );
};

export default ReservationModalContents;
