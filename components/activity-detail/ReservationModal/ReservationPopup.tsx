"use client";
import Button from "@/components/common/Button";
import React, { Dispatch, SetStateAction } from "react";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  buttonName?: string;
  onButtonClick?: () => void;
  dim?: boolean;
  children: React.ReactNode;
}

const ReservationPopup = ({
  title,
  setState,
  buttonName,
  onButtonClick,
  children,
  dim = false,
}: ReservationPopupType) => {
  return (
    <>
      <div
        className={`${dim ? "md:fixed md:left-0 md:top-0 md:h-screen md:w-screen md:bg-black md:opacity-70" : ""}`}
      />
      <div
        className={`md:outline-1px fixed flex h-screen w-screen flex-col justify-between bg-white p-6 pb-10 shadow-sm md:absolute md:h-min md:w-[30rem] md:rounded-xl md:pb-8 md:outline md:outline-[#A4a1aa]
                    ${dim ? "fixed right-0 top-0 " : "right-0 top-0"} `}
      >
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
        {buttonName && (
          <Button onClick={() => onButtonClick!()}>{buttonName}</Button>
        )}
      </div>
    </>
  );
};

export default ReservationPopup;
