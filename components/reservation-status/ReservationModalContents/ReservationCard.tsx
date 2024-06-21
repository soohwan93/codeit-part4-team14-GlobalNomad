import Button from "@/components/common/Button";
import { patchMyActivityReservation } from "@/util/api";
import { ReservationsStatus } from "@/util/apiType";
import React from "react";

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

const ReservationCard = ({
  reservation,
  setRefresh,
}: {
  reservation: ScheduleReservationType;
  setRefresh: () => void;
}) => {
  const handleReservationConfirmed = async () => {
    const response = await patchMyActivityReservation(
      reservation.activityId,
      reservation.id,
      {
        status: "confirmed",
      },
    );
    setRefresh();
  };

  const handleReservationDecline = async () => {
    await patchMyActivityReservation(reservation.activityId, reservation.id, {
      status: "declined",
    });
    setRefresh();
  };

  return (
    <div className="min-h-[7.125rem] rounded border-[1px] border-gray-30 p-3">
      <div className="flex flex-col">
        <span className="text-base font-semibold leading-normal text-gray-70">
          닉네임:&nbsp;
          <span className="truncate text-base font-medium leading-normal text-black">
            {reservation.nickname}
          </span>
        </span>
        <span className="text-base font-semibold leading-normal text-gray-70">
          인원:&nbsp;
          <span className="text-base font-medium leading-normal text-black">
            {reservation.headCount}
          </span>
        </span>
      </div>
      <div className="flex justify-end gap-2">
        {reservation.status === "pending" ? (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleReservationConfirmed()}
            >
              승인하기
            </Button>
            <Button
              variant="white"
              size="sm"
              onClick={() => handleReservationDecline()}
            >
              거절하기
            </Button>
          </>
        ) : (
          <div
            className={`rounded-full px-4 py-2 text-sm font-bold leading-normal
            ${reservation.status === "confirmed" ? "bg-blue-30 text-white" : "bg-red-10 text-red-20"}`}
          >
            {reservation.status === "confirmed" ? "예약 승인" : "예약 거절"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
