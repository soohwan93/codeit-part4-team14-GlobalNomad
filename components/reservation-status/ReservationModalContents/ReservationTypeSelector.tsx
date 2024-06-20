import { ReservationsStatus } from "@/util/apiType";
import React, { SetStateAction } from "react";

interface ReservationTypeSelectorProps {
  type: ReservationsStatus;
  setType: React.Dispatch<SetStateAction<ReservationsStatus>>;
  selectedReservationData: [number, number, number];
}

const ReservationTypeSelector = ({
  type,
  setType,
  selectedReservationData,
}: ReservationTypeSelectorProps) => {
  return (
    <>
      <div className="grid w-fit grid-cols-3">
        <button
          className="group flex h-10 flex-col justify-between"
          onClick={() => setType("pending")}
          type="button"
        >
          <span className="col-start-1 row-start-1 px-3 py-1">
            신청 {selectedReservationData[0]}
          </span>
          <div
            className={`w-full rounded-t border-[1px] border-white duration-200 ${type === "pending" ? "h-1 bg-nomad-black" : "h-0"} 
            group-hover:h-full group-hover:border-nomad-black`}
          />
        </button>

        <button
          className="group flex h-10 flex-col justify-between"
          onClick={() => setType("confirmed")}
          type="button"
        >
          <span className="col-start-1 row-start-1 px-3 py-1">
            승인 {selectedReservationData[1]}
          </span>
          <div
            className={`w-full rounded-t border-[1px] border-white duration-200 ${type === "confirmed" ? "h-1 bg-nomad-black" : "h-0"} 
            group-hover:h-full group-hover:border-nomad-black`}
          />
        </button>

        <button
          className="group flex h-10 flex-col justify-between"
          onClick={() => setType("declined")}
          type="button"
        >
          <span className="col-start-1 row-start-1 px-3 py-1">
            거절 {selectedReservationData[2]}
          </span>
          <div
            className={`w-full rounded-t border-[1px] border-white duration-200 ${type === "declined" ? "h-1 bg-nomad-black" : "h-0"} 
                        group-hover:h-full group-hover:border-nomad-black`}
          />
        </button>
      </div>
      <hr className="text-gray-30" />
    </>
  );
};

export default ReservationTypeSelector;
