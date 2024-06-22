import React, { ReactNode } from "react";

interface Option {
  label: string;
  value: string;
  onClick?: () => void;
}

interface DropdownProps {
  Options: Option[];
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  defaultLabel?: ReactNode;
  originPositionRight?: boolean;
  customClassName?: string;
}

const Dropdown = ({
  Options,
  defaultLabel,
  dropdownOpen,
  setDropdownOpen,
  originPositionRight = false,
  customClassName = "",
}: DropdownProps) => {
  return (
    <>
      <div className={`${defaultLabel ? `relative` : ``}`}>
        {defaultLabel && <div className="cursor-pointer">{defaultLabel}</div>}
        {dropdownOpen && (
          <div
            className={`absolute top-full z-[10] mt-2 rounded border bg-white shadow-lg 
                        ${customClassName ? customClassName : originPositionRight ? "right-0" : "left-0"}`}
          >
            {Options.map((option) => (
              <button
                key={option.value}
                className="flex w-full items-center justify-center whitespace-nowrap border px-4 py-3 text-black hover:bg-gray-100"
                onClick={() => {
                  if (option.onClick !== undefined) {
                    option.onClick();
                  }
                  setDropdownOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Dropdown;
