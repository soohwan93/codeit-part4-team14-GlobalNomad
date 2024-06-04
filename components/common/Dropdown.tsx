import React, { ReactNode } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  Options: Option[];
  defaultLabel: ReactNode;
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
}

const Dropdown = ({
  Options,
  defaultLabel,
  dropdownOpen,
  setDropdownOpen,
}: DropdownProps) => {
  return (
    <div className="relative">
      <div className="cursor-pointer">
        {defaultLabel}
      </div>
      {dropdownOpen && (
        <div className="absolute top-full mt-2 w-[160px] bg-white border rounded shadow-lg">
          {Options.map((option) => (
            <button
              key={option.value}
              className="flex items-center justify-center border px-4 py-3 hover:bg-gray-100 text-black"
              onClick={() => setDropdownOpen(false)}
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
