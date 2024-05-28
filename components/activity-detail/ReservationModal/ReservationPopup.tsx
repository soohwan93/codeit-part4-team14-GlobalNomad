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
    <div className="h-37.5rem] md:outline-1px fixed left-0 top-0 h-screen w-screen bg-white p-6 pb-10 shadow-sm md:absolute md:h-min md:w-[30rem] md:rounded-xl md:pb-8 md:outline md:outline-[#A4a1aa]">
      <header className="mb-8 flex items-center justify-between text-[1.75rem] font-bold leading-[92.857%]">
        {title}
        <button
          type="button"
          onClick={() => setState(false)}
          className="h-10 w-10 bg-[url('/icons/btn_X.svg')]"
        ></button>
      </header>
      {children}
    </div>
  );
};

export default ReservationPopup;
