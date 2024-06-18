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
    <>
      {reservationList.map((item) => (
        <React.Fragment key={item.id}>
          <ReservationCard reservation={item} />
        </React.Fragment>
      ))}
    </>
  );
};

export default ReservationCardList;
