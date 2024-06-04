import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  Options: Option[];
  defaultLabel: string;
}

const Dropdown = ({ Options, defaultLabel }: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        className="bg-white w-[40px] h-[40px] md:w-[160px] md:h-[53px] p-2 rounded-lg border border-emerald-800"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="flex items-center px-2 md:justify-between">
          <p className="hidden text-emerald-800 font-bold md:block">{defaultLabel}</p>
        </div>
      </button>
      {dropdownOpen && (
        <div className="absolute top-full mt-2 w-[160px] bg-white border rounded shadow-lg">
          {Options.map((option) => (
            <button
              key={option.value}
              className="flex items-center justify-center border px-4 py-3 hover:bg-gray-100 text-black hover:bg-gray-30"
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
