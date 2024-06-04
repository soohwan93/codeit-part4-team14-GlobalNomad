"use client";
import Button from "@/components/common/Button";
import React, { Dispatch, SetStateAction } from "react";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  setAdditionalState?: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ReservationPopup = ({
  title,
  setState,
  setAdditionalState,
  children,
}: ReservationPopupType) => {
  return (
    <div className="md:outline-1px fixed right-0 top-0 flex h-screen w-screen flex-col justify-between bg-white p-6 pb-10 shadow-sm md:absolute md:h-min md:w-[30rem] md:rounded-xl md:pb-8 md:outline md:outline-[#A4a1aa]">
      <div className="mb-16">
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
      <Button
        onClick={() => {
          if (setAdditionalState !== undefined) {
            setAdditionalState(true);
          }
          setState(false);
        }}
      >
        확인
      </Button>
    </div>
  );
};

export default ReservationPopup;
