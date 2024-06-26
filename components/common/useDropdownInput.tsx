"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 *
 * @param {string[]} dataArray 현재 드롭다운에서 보여줄 데이터 목록을 받습니다.
 * @param {string} type 현재 드롭다운이 어떤 종류인지 보여줄 항목입니다. defaultValue가 null일 경우, 이것을 보여줍니다.
 * @param {string} defaultValue 수정 등의 경우 현재 드롭다운에서 기본으로 선택할 값을 받습니다. 없을 경우 null로 처리됩니다.
 * @param {boolean} error 에러가 있을 시 테두리가 빨간색으로 지정됩니다.
 * @param {string} errorMessage 에러에 대한 메시지입니다.
 * @returns
 */
const useDropdownInput = (
  dataArray: string[],
  type: string,
  defaultValue: string | null = null,
  error?: boolean,
  setCategoryError?: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage?: string,
) => {
  const inputDropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(
    defaultValue ? dataArray.indexOf(defaultValue) : -1,
  );

  const handleSelectChild = (select: string) => {
    setSelected(select);
    setIsOpen(false);
    setFocusedIndex(dataArray.indexOf(select));
    setCategoryError?.(false);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        inputDropdownRef.current &&
        !inputDropdownRef.current.contains(event.target as Node)
      ) {
        if (!selected) {
          setCategoryError?.(true);
        }
        setIsOpen(false);
      }
    },
    [selected, setCategoryError],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (listRef.current && focusedIndex >= 0) {
      const focusedItem = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedItem) {
        focusedItem.scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [focusedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Enter":
        if (isOpen && focusedIndex >= 0) {
          handleSelectChild(dataArray[focusedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case "ArrowDown":
        event.preventDefault(); // 기본 페이지 스크롤 방지
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prevIndex) =>
            prevIndex < dataArray.length - 1 ? prevIndex + 1 : prevIndex,
          );
        }
        break;
      case "ArrowUp":
        event.preventDefault(); // 기본 페이지 스크롤 방지
        if (isOpen) {
          setFocusedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex,
          );
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  const renderDropdown = () => {
    return (
      <>
        <div className="relative z-[1]" ref={inputDropdownRef}>
          <div
            tabIndex={0}
            className={`flex h-[62px] w-full cursor-pointer items-center justify-between overflow-hidden rounded border-[1px] ${error ? "border-red-20" : "border-gray-70"} pl-2 pr-1.5 text-sm leading-[162.5%] md:h-14 md:pl-4 md:text-base 
            ${selected === null ? "text-gray-60" : "text-black"}`}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
          >
            {selected === null ? type : selected}

            <div
              className={`ml-1 inline-block h-6 w-6 bg-[url('/icons/chevron_down.svg')] bg-center bg-no-repeat duration-100 md:h-5 md:w-5 md:p-6 ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
          <ul
            ref={listRef}
            className={`absolute flex w-full translate-y-2 flex-col gap-[1px] overflow-scroll rounded bg-white shadow-lg duration-200 ${isOpen ? "h-max max-h-56 p-2" : "h-0"}`}
          >
            {dataArray.map((item, index) => (
              <li
                key={item}
                className={`flex cursor-pointer items-center rounded p-2 text-sm md:text-base ${selected === item ? "bg-nomad-black text-white hover:bg-nomad-black" : "text-black hover:bg-gray-30"} ${focusedIndex === index ? "bg-gray-200" : ""}`}
                onClick={() => handleSelectChild(item)}
                onMouseEnter={() => setFocusedIndex(index)} // 마우스 오버시 포커스 설정
                onMouseLeave={() => setFocusedIndex(-1)} // 마우스 떠날 때 포커스 해제
              >
                <div
                  className={`${selected === item ? "bg-[url('/icons/checkmark.svg')]" : ""} mr-2 inline-block h-3 w-3 bg-center`}
                ></div>
                {item}
              </li>
            ))}
          </ul>
          <div className="ml-2 mt-2 h-[14px] text-start text-xs font-normal text-red-20">
            {error && <span>{errorMessage}</span>}
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed h-screen w-screen bg-transparent"
            onClick={() => setIsOpen(false)}
          />
        )}
      </>
    );
  };

  return { selected, renderDropdown };
};

export default useDropdownInput;
