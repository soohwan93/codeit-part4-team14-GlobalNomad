import React, { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  filterOptions: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterDropdown = ({
  filterOptions,
  selectedFilter,
  onFilterChange,
}: FilterDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const selectedOptionLabel =
    filterOptions.find((option) => option.value === selectedFilter)?.label ||
    "전체";

  return (
    <div className="relative">
      <button
        className="bg-white w-[40px] h-[40px] md:w-[160px] md:h-[53px] p-2 rounded-lg border border-emerald-800"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="flex items-center px-2 md:justify-between">
          <p className="hidden text-emerald-800 font-bold md:block">
            {selectedOptionLabel}
          </p>
          <div className={`bg-[url('/icons/chevron_down.svg')] bg-center bg-no-repeat ${dropdownOpen ? "rotate-180" : "rotate-0"}`}></div>
        </div>
      </button>
      {dropdownOpen && (
        <div className="absolute top-full mt-2 w-[160px] bg-white border rounded shadow-lg">
          {filterOptions.map((option) => (
            <a
              href="#"
              key={option.value}
              className={`flex items-center justify-center border px-4 py-3 hover:bg-gray-100 ${
                selectedFilter === option.value
                  ? "bg-nomad-black text-white hover:bg-nomad-black"
                  : "text-black hover:bg-gray-30"
              }`}
              onClick={() => {
                onFilterChange(option.value);
                setDropdownOpen(false);
              }}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};