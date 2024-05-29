import Image from "next/image";
import React, { useState } from "react";

interface useDropdownInputType {
  dataArray: string[];
  defaultValue: string | null;
  type: string;
}

const useDropdownInput = (
  dataArray: string[],
  defaultValue: string | null,
  type = "카테고리",
) => {
  const [selected, setSelected] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const handleSelectChild = (select: string) => {
    setSelected(select);
    setOpen(false);
  };

  const renderDropdown = () => {
    return (
      <div className="relative">
        <div
          className={`flex h-14 w-full cursor-pointer items-center justify-between rounded border-[1px] border-black pl-4 text-base leading-[162.5%] 
            ${selected === null ? "text-gray-60" : "text-black"}`}
          onClick={() => setOpen(!open)}
        >
          {selected === null ? type : selected}
          <button
            className={`${open ? "rotate-180" : "rotate-0"} p-3 duration-100`}
          >
            <Image
              src="/icons/chevron_down.svg"
              alt="dropdown"
              width={24}
              height={24}
            />
          </button>
        </div>
        <ul
          className={`absolute flex w-full translate-y-2 flex-col gap-[1px] overflow-hidden rounded bg-white shadow-lg duration-100 ${open ? "h-max max-h-56 p-2" : "h-0"}`}
        >
          {dataArray.map((item) => (
            <li
              key={item}
              className={`flex cursor-pointer items-center rounded p-2 ${selected === item ? "bg-nomad-black text-white hover:bg-nomad-black" : "text-black hover:bg-gray-30"}`}
              onClick={() => handleSelectChild(item)}
            >
              <div
                className={`${selected === item ? "bg-[url('/icons/checkmark.svg')]" : ""} mr-2 inline-block h-5 w-5`}
              ></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return { selected, renderDropdown };
};

export default useDropdownInput;
