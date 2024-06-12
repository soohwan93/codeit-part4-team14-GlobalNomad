"use client";
import React, { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  buttonName?: string;
  onButtonClick?: () => void;
  usePortal?: boolean;
  children: React.ReactNode;
}

const ModalBase = ({
  title,
  setState,
  buttonName,
  onButtonClick,
  usePortal,
  children,
}: ReservationPopupType) => {
  return (
    <>
      {usePortal && (
        <div className="md:fixed md:left-0 md:top-0 md:h-screen md:w-screen md:bg-black md:opacity-70" />
      )}
      <div
        className={`md:outline-1px fixed flex h-screen w-screen flex-col justify-between bg-white p-6 pb-10 shadow-sm md:h-min md:w-[30rem] md:rounded-xl md:pb-8 md:outline md:outline-[#A4a1aa]
                  ${
                    usePortal
                      ? "right-0 top-0 md:fixed md:right-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2"
                      : "right-0 top-0 md:absolute"
                  } `}
      >
        <div className="mb-16">
          <header className="mb-8 flex items-center justify-between text-[1.75rem] font-bold leading-[1.675rem]">
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

export default ModalBase;
