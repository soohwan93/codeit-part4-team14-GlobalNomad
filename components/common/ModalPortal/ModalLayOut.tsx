"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Button from "../Button";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  buttonName?: string;
  onButtonClick?: () => void;
  usePortal?: boolean;
  children: React.ReactNode;
}

const ModalLayOut = ({
  title,
  setState,
  buttonName,
  onButtonClick,
  usePortal,
  children,
}: ReservationPopupType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        if (
          overlayRef.current &&
          overlayRef.current.contains(e.target as Node)
        ) {
          setState(false);
        }
      }
    },
    [setState],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {usePortal && (
        <div
          ref={overlayRef}
          className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-70"
        />
      )}
      <div
        id="modal"
        ref={modalRef}
        className={`fixed z-20 flex h-screen w-screen flex-col justify-between bg-white p-6 pb-10 shadow-sm md:h-min md:w-[30rem] md:rounded-xl md:pb-8 ${usePortal ? `md:outline-none ` : `md:outline md:outline-[#A4a1aa]`}
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

export default ModalLayOut;
