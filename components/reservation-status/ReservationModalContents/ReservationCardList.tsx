import React, { SetStateAction } from "react";
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
  reservationList,
  setRefresh,
}: {
  reservationList: ScheduleReservationType[] | null;
  setRefresh: () => void;
}) => {
  return (
    <div className="flex max-h-[15rem] flex-col gap-2 overflow-scroll">
      {reservationList !== null && reservationList.length !== 0 ? (
        reservationList.map((item) => (
          <React.Fragment key={item.id}>
            <ReservationCard reservation={item} setRefresh={setRefresh} />
          </React.Fragment>
        ))
      ) : (
        <div className="flex h-[12rem] w-full items-center justify-center text-center">
          해당 유형의 예약 내역이 없습니다.
        </div>
      )}
    </div>
  );
};

export default ReservationCardList;
