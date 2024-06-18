import React, { SetStateAction } from "react";

interface ReservationTypeSelectorProps {
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
}

const ReservationTypeSelector = ({
  type,
  setType,
}: ReservationTypeSelectorProps) => {
  return (
    <>
      <div className="grid w-fit grid-cols-3">
        <button
          className="flex h-10 flex-col justify-between"
          onClick={() => setType("pending")}
          type="button"
        >
          <span className="col-start-1 row-start-1 px-3 py-1">신청</span>
          <div
            className={`w-full rounded-t bg-nomad-black duration-200 ${type === "pending" ? "h-1" : "h-0"}`}
          />
        </button>

        <button
          className="flex h-10 flex-col justify-between"
          onClick={() => setType("confirmed")}
          type="button"
        >
          <span className="col-start-1 row-start-1 px-3 py-1">승인</span>
          <div
            className={`w-full rounded-t bg-nomad-black duration-200 ${type === "confirmed" ? "h-1" : "h-0"}`}
          />
        </button>

        <button
          className="flex h-10 flex-col justify-between"
          onClick={() => setType("denied")}
          type="button"
        >
          <span className="col-start-1 row-start-1 px-3 py-1">거절</span>
          <div
            className={`w-full rounded-t bg-nomad-black duration-200 ${type === "denied" ? "h-1" : "h-0"}`}
          />
        </button>
      </div>
      <hr className="text-gray-30" />
    </>
  );
};

export default ReservationTypeSelector;
