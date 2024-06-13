"use client";
import React, { useEffect, useState } from "react";
import DropdownArrow from "./svg/DropdownArrowSvg";
import Check from "./svg/CheckSvg";

/**
 *
 * @param {string[]} dataArray 현재 드롭다운에서 보여줄 데이터 목록을 받습니다.
 * @param {string} type 현재 드롭다운이 어떤 종류인지 보여줄 항목입니다. defaultValue가 null일 경우, 이것을 보여줍니다.
 * @param {string} defaultValue 수정 등의 경우 현재 드롭다운에서 기본으로 선택할 값을 받습니다. 없을 경우 null로 처리됩니다.
 * @returns
 */

interface DropdownInputProps {
  dataArray: string[];
  type: string;
  defaultValue?: string | null;
  onClick: (object: string) => void;
  needReset?: boolean;
}
const DropdownInput = ({
  dataArray,
  type,
  defaultValue = null,
  onClick,
  needReset = false,
}: DropdownInputProps) => {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChild = (select: string) => {
    setSelected(select);
    setIsOpen(false);
    onClick(select);
  };

  useEffect(() => {
    setSelected(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needReset]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 h-screen w-screen bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="relative">
        <div
          className={`flex h-12 w-full cursor-pointer items-center justify-between overflow-hidden rounded border-[1px] border-black pl-2 pr-1.5 text-sm leading-[162.5%] md:h-14 md:pl-4 md:text-base 
            ${selected === null ? "text-gray-60" : "text-black"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected === null ? type : selected}

          <div
            className={`mr-1 flex h-6 w-6 items-center justify-center duration-100 md:h-5 md:w-5 ${isOpen ? "rotate-180" : "rotate-0"}`}
          >
            <DropdownArrow />
          </div>
        </div>
        <ul
          className={`absolute flex w-full translate-y-2 flex-col gap-[1px] overflow-hidden rounded bg-white shadow-lg duration-200 ${isOpen ? "h-max max-h-56 p-2" : "h-0"}`}
        >
          {dataArray.length !== 0 ? (
            dataArray.map((item) => (
              <li
                key={item}
                className={`flex cursor-pointer items-center rounded p-2 text-sm md:text-base ${selected === item ? "bg-nomad-black text-white hover:bg-nomad-black" : "text-black hover:bg-gray-30"}`}
                onClick={() => handleSelectChild(item)}
              >
                <div className="mr-2 flex h-3 w-3 items-center justify-center bg-center">
                  {selected === item && <Check />}
                </div>
                {item}
              </li>
            ))
          ) : (
            <li className="flex cursor-default items-center rounded p-2 text-sm text-gray-40 md:text-base">
              선택 가능한 옵션이 없습니다.
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropdownInput;
