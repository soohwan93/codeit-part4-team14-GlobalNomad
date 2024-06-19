import React from "react";
import ReservationCard from "./ReservationCard";

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

const ReservationCardList = ({
  reservationList,
}: {
  reservationList: ScheduleReservationType[];
}) => {
  return (
    <div className="flex max-h-[15rem] flex-col gap-2 overflow-scroll">
      {reservationList !== null && reservationList.length !== 0 ? (
        reservationList.map((item) => (
          <React.Fragment key={item.id}>
            <ReservationCard reservation={item} />
          </React.Fragment>
        ))
      ) : (
        <div className="m-auto flex w-fit items-center justify-center text-center">
          해당 유형의 예약 내역이 없습니다.
        </div>
      )}
    </div>
  );
};

export default ReservationCardList;
