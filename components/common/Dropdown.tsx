import React from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  Options: Option[];
  defaultLabel: string;
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  imageUrl: string; 
}

const Dropdown = ({
  Options,
  defaultLabel,
  dropdownOpen,
  setDropdownOpen,
  imageUrl
}: DropdownProps) => {
  return (
    <div className="relative">
      <img 
        src={imageUrl} 
        alt="dropdown trigger" 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer"
      />
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
