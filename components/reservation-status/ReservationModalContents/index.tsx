"use client";
import React, { useState } from "react";
import ReservationTypeSelector from "./ReservationTypeSelector";

interface ReservationModalContents {
  type: string;
}

const ReservationModalContents = ({ type }: ReservationModalContents) => {
  const [currentModalType, setCurrentModalType] = useState(type);
  const [currentCursorHover, setCurrentCursorHover] = useState<null | string>(
    null,
  );

  return (
    <div className="max-h-[43.75rem]">
      <ReservationTypeSelector
        type={currentModalType}
        setType={setCurrentModalType}
      />
    </div>
  );
};

export default ReservationModalContents;
