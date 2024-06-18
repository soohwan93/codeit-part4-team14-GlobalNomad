import React from "react";
import StatusChip from "./StatusChip";

interface StatusChipProps {
  reservationInfo: {
    completed: number;
    confirmed: number;
    pending: number;
  };
  onChipClick: (chipType: string) => void;
}

const StatusChipList = ({ reservationInfo, onChipClick }: StatusChipProps) => {
  return (
    <div>
      {reservationInfo.pending !== 0 && (
        <StatusChip
          type="pending"
          info={reservationInfo.pending}
          onChipClick={onChipClick}
        >
          예약
        </StatusChip>
      )}
      {reservationInfo.confirmed !== 0 && (
        <StatusChip
          type="confirmed"
          info={reservationInfo.confirmed}
          onChipClick={onChipClick}
        >
          승인
        </StatusChip>
      )}
      {reservationInfo.completed !== 0 && (
        <StatusChip
          type="completed"
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
