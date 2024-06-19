import React, { ReactNode } from "react";

interface Option {
  label: string;
  value: string;
  onClick?: () => void;
}

interface DropdownProps {
  Options: Option[];
  defaultLabel: ReactNode;
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  originPositionRight: boolean;
}

const Dropdown = ({
  Options,
  defaultLabel,
  dropdownOpen,
  setDropdownOpen,
  originPositionRight = false,
}: DropdownProps) => {
  return (
    <div className="relative z-[1]">
      <div className="cursor-pointer">{defaultLabel}</div>
      {dropdownOpen && (
        <div
          className={`absolute top-full mt-2 w-[160px] rounded border bg-white shadow-lg
                        ${originPositionRight ? "right-0" : "left-0"}`}
        >
          {Options.map((option) => (
            <button
              key={option.value}
              className="flex w-full items-center justify-center border px-4 py-3 text-black hover:bg-gray-100"
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
  );
};

export default Dropdown;
