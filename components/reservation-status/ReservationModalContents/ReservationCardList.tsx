"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import ReservationCard from "./ReservationCard";
import { ReservationsStatus } from "@/util/apiType";

interface ScheduleReservationType {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  status: ReservationsStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

const ReservationCardList = ({
  firstReservationList,
  setRefresh,
  firstCursorId,
}: {
  firstReservationList: ScheduleReservationType[] | null;
  setRefresh: () => void;
  firstCursorId: number;
}) => {
  const [reservationList, setReservationList] = useState<
    ScheduleReservationType[] | null
  >(null);
  const cursorId = useRef<number | null>(null);
  const observer = useRef<HTMLDivElement>(null);
  cursorId.current = firstCursorId;

  useEffect(() => {
    setReservationList(firstReservationList);
  }, [firstReservationList]);

  return (
    <div className="flex max-h-[15rem] flex-col gap-2 overflow-scroll">
      {reservationList !== null && reservationList.length !== 0 ? (
        <>
          {reservationList.map((item) => (
            <React.Fragment key={item.id}>
              <ReservationCard reservation={item} setRefresh={setRefresh} />
            </React.Fragment>
          ))}
          <div ref={observer} />
        </>
      ) : (
        <div className="flex h-[12rem] w-full items-center justify-center text-center">
          예약 일정을 선택하지 않았거나, 선택한 유형의 예약이 없습니다.
        </div>
      )}
    </div>
  );
};

export default ReservationCardList;
