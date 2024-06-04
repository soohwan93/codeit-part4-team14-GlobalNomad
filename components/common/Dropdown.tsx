import React, { ReactNode, useState } from "react";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

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
              className={`flex items-center justify-center border px-4 py-3 hover:bg-gray-100 ${
                selectedOption === option.value
                  ? "bg-nomad-black text-white hover:bg-nomad-black"
                  : "text-black hover:bg-gray-30"
              }`}
              onClick={() => handleOptionClick(option.value)}
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
