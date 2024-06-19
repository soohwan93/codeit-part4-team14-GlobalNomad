import React, { useState } from "react";
import Dropdown from "./Dropdown";
 

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  filterOptions: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
}

const FilterDropdown = ({
  filterOptions,
  selectedFilter,
  onFilterChange,
  dropdownOpen,
  setDropdownOpen,
}: FilterDropdownProps) => {
  const selectedOptionLabel =
    filterOptions.find((option) => option.value === selectedFilter)?.label ||
    "전체";
  return (
    <Dropdown
      Options={filterOptions}
      defaultLabel={<button
        className="bg-white w-[40px] h-[40px] md:w-[160px] md:h-[53px] p-2 rounded-lg border border-emerald-800"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="flex items-center px-2 md:justify-between">
          <p className="hidden text-emerald-800 font-bold md:block">
            {selectedOptionLabel}
          </p>
          <div
            className={`bg-[url('/icons/chevron_down.svg')] bg-center bg-no-repeat ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
          ></div>
        </div>
      </button>}
      dropdownOpen={dropdownOpen}
      setDropdownOpen={setDropdownOpen} originPositionRight={false}    />
  );
};

export default FilterDropdown;
