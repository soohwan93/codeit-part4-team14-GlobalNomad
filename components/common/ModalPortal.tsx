"use client";
import Button from "@/components/common/Button";
import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  buttonName?: string;
  onButtonClick?: () => void;
  usePortal?: boolean;
  children: React.ReactNode;
}
/**
 *
 * @param {string} title 현재 모달의 이름입니다.
 * @param {Dispatch<SetStateAction<boolean>>} setState 현재 모달의 상태를 조절하는 setState 액션입니다
 * @param {string} buttonName 현재 모달에 대하여, 버튼이 필요할 경우 사용할 버튼의 이름입니다. 이것이 없을 경우 버튼이 생성되지 않습니다.
 * @param {() => void)} onButtonClick 버튼 클릭에 따라 수행될 동작을 받습니다.
 * @param {React.ReactNode} children 혅 모달에 포함될 내용을 받습니다.
 * @param {boolean} usePortal 현재 모달이 portal기능을 사용하여 표시할 것인지를 받습니다. 기본적으로 false상태입니다.
 * @returns
 */
const ReservationPopup = ({
  title,
  setState,
  buttonName,
  onButtonClick,
  children,
  usePortal = false,
}: ReservationPopupType) => {
  const ModalBase = () => (
    <>
      {usePortal && (
        <div className="md:fixed md:left-0 md:top-0 md:h-screen md:w-screen md:bg-black md:opacity-70" />
      )}
      <div
        className={`md:outline-1px fixed flex h-screen w-screen flex-col justify-between bg-white p-6 pb-10 shadow-sm md:absolute md:h-min md:w-[30rem] md:rounded-xl md:pb-8 md:outline md:outline-[#A4a1aa]
                  ${usePortal ? "fixed right-0 top-0 md:right-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2" : "right-0 top-0"} `}
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
  if (usePortal) {
    const el = document.getElementById("portal");
    return ReactDOM.createPortal(<ModalBase />, el!);
  }
  return <ModalBase />;
};

export default ReservationPopup;
