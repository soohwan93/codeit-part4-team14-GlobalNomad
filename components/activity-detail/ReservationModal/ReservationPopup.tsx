"use client";
import React, { Dispatch, SetStateAction } from "react";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ReservationPopup = ({
  title,
  setState,
  children,
}: ReservationPopupType) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-white p-6 pb-10">
      <header className="mb-8 flex items-center justify-between text-[1.75rem] font-bold leading-[92.857%]">
        {title}
        <button type="button" onClick={() => setState(false)}>
          x
        </button>
      </header>
      {children}
    </div>
  );
};

export default ReservationPopup;
