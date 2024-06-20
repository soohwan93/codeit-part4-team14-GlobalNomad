"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import ReservationCard from "./ReservationCard";
import { ReservationsStatus } from "@/util/apiType";
import { getMyActivityReservations } from "@/util/api";
import Image from "next/image";

interface ScheduleReservationResponseType {
  cursorId: number;
  totalCount: number;
  reservations: ScheduleReservationType[];
}

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
  currentScheduleId,
  activityId,
}: {
  firstReservationList: ScheduleReservationType[] | null;
  setRefresh: () => void;
  firstCursorId: number;
  currentScheduleId: number;
  activityId: number;
}) => {
  const [renderingReservationList, setRenderingReservationList] = useState<
    ScheduleReservationType[] | null
  >(null);
  const cursorId = useRef<number | null>(null);
  const scheduleId = useRef(currentScheduleId);
  const needScrollObserver = useRef<HTMLDivElement>(null);
  const reservationList = useRef<ScheduleReservationType[] | null>(null);

  const handleInfiniteScroll = async () => {
    if (cursorId.current === null || reservationList.current === null) return;
    const response: ScheduleReservationResponseType =
      await getMyActivityReservations(activityId!, {
        scheduleId: scheduleId.current,
        status: reservationList.current[0].status,
        cursorId: cursorId.current,
        size: 3,
      });

    const rawReservationList = [
      ...reservationList.current,
      ...response.reservations,
    ];
    cursorId.current = response.cursorId;
    reservationList.current = rawReservationList;

    setRenderingReservationList((prev) => [...prev!, ...response.reservations]);
  };

  useEffect(() => {
    const addLinkBarObserver = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          handleInfiniteScroll();
        }
      });
    });

    addLinkBarObserver.observe(needScrollObserver.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRenderingReservationList(firstReservationList);
    reservationList.current = firstReservationList;
    console.log(firstReservationList);
    scheduleId.current = currentScheduleId;
    cursorId.current = firstCursorId;
  }, [firstReservationList]);

  return (
    <div className="flex max-h-[15rem] flex-col gap-2 overflow-scroll">
      {renderingReservationList !== null &&
      renderingReservationList.length !== 0 ? (
        <>
          {renderingReservationList.map((item) => (
            <React.Fragment key={`status-${item.status}-${item.id}`}>
              <ReservationCard reservation={item} setRefresh={setRefresh} />
            </React.Fragment>
          ))}
        </>
      ) : (
        <div className="flex h-[12rem] w-full items-center justify-center text-center">
          {renderingReservationList === null && (
            <Image
              src="/icons/loading.png"
              alt="로딩 중입니다..."
              width={20}
              height={20}
              className="mr-2 animate-spin"
            />
          )}
          {renderingReservationList !== null
            ? "예약 일정을 선택하지 않았거나, 선택한 유형의 예약이 없습니다."
            : "불러오는 중입니다..."}
        </div>
      )}
      <div ref={needScrollObserver} />
    </div>
  );
};

export default ReservationCardList;
