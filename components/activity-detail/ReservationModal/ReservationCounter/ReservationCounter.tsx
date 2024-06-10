"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";

interface ReservationCounterProp {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

function ReservationCounter({ count, setCount }: ReservationCounterProp) {
  const counterRef = useRef<HTMLInputElement>(null);

  const handleVerificationCount = () => {
    if (counterRef.current!.value === "") return;

    if (Number(counterRef.current!.value) > 50) {
      setCount(50);
      counterRef.current!.value = "50";
      return;
    }
    if (Number(counterRef.current!.value) < 1) {
      setCount(1);
      counterRef.current!.value = "1";
      return;
    }
    if (counterRef.current!.value.indexOf(".") !== -1) {
      setCount(Number(counterRef.current!.value.split(".")[0]));
      counterRef.current!.value = `${Number(counterRef.current!.value.split(".")[0])}`;
    }

    setCount(Number(counterRef.current!.value));
  };
  const handleBlur = () => {
    if (counterRef.current!.value === "") {
      setCount(1);
      counterRef.current!.value = "1";
    }
  };

  const handleClickButton = (isPlus: boolean) => {
    const count = isPlus === true ? 1 : -1;
    counterRef.current!.value = `${Number(counterRef.current!.value) + count}`;
    setCount(Number(counterRef.current!.value) + count);
    handleVerificationCount();
  };

  return (
    <div className="flex h-10 w-min min-w-[7.5rem] items-center justify-center rounded-xl outline outline-[#cdd0dc]">
      <button
        type="button"
        className="h-10 w-10"
        onClick={() => handleClickButton(false)}
      >
        <Image
          src="/icons/counter/Subtract.svg"
          width={20}
          height={20}
          alt="reservation-decrease"
          className="inline-block text-center"
        />
      </button>
      <input
        ref={counterRef}
        type="number"
        defaultValue={String(count)}
        onChange={() => {
          handleVerificationCount();
        }}
        onBlur={() => handleBlur()}
        min={1}
        max={50}
        className="input-number-none-arrow h-10 w-10 p-2 text-center"
      />
      <button
        type="button"
        className="h-10 w-10"
        onClick={() => handleClickButton(true)}
      >
        <Image
          src="/icons/counter/Add.svg"
          width={20}
          height={20}
          alt="reservation-increase"
          className="inline-block text-center"
        />
      </button>
    </div>
  );
}

export default ReservationCounter;
