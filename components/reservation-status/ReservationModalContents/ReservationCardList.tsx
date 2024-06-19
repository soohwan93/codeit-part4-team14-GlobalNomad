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
      {reservationList.map((item) => (
        <React.Fragment key={item.id}>
          <ReservationCard reservation={item} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReservationCardList;
