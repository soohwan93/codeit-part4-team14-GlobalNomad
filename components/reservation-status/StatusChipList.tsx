import React from "react";
import StatusChip from "./StatusChip";

interface StatusChipProps {
  reservationInfo: {
    completed: number;
    confirmed: number;
    pending: number;
  };
  date: string;
  onChipClick: (chipType: "pending" | "confirmed") => void;
}

const StatusChipList = ({
  reservationInfo,
  date,
  onChipClick,
}: StatusChipProps) => {
  const today = new Date();
  const selectedDate = new Date(date);

  let isPassedDate = today > selectedDate ? true : false;

  return (
    <div className="flex flex-col gap-0.5 xl:gap-1">
      {reservationInfo.pending !== 0 && (
        <StatusChip
          type="pending"
          passed={isPassedDate}
          info={reservationInfo.pending}
          onChipClick={onChipClick}
        >
          {isPassedDate ? "만료" : "예약"}
        </StatusChip>
      )}
      {reservationInfo.confirmed !== 0 && (
        <StatusChip
          type="confirmed"
          passed={isPassedDate}
          info={reservationInfo.confirmed}
          onChipClick={onChipClick}
        >
          승인
        </StatusChip>
      )}
      {reservationInfo.completed !== 0 && (
        <StatusChip
          type="completed"
          passed={isPassedDate}
          info={reservationInfo.completed}
          onChipClick={onChipClick}
        >
          완료
        </StatusChip>
      )}
    </div>
  );
};

export default StatusChipList;
