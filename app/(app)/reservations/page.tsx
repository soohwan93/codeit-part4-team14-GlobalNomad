import { Reservation } from "@/components/common/ReviewModal/ReviewType";
import ReservationMain from "@/components/reservation/ReservationMain";
import { getMyReservations } from "@/util/api";
import React from "react";
export interface ApiResponse {
  cursorId: number | null;
  reservations: Reservation[];
  totalCount: number;
}
type Props = {};

const Home = async () => {
  const query = { size: 5 }; // 필요한 쿼리 파라미터 설정
  const { cursorId, reservations, totalCount } = await getMyReservations(query);
  console.log(cursorId);
  console.log(reservations);
  console.log(totalCount);
  return (
    <>
      <ReservationMain
        cursorId={cursorId}
        reservations={reservations}
        totalCount={totalCount}
      ></ReservationMain>
    </>
  );
};

export default Home;
