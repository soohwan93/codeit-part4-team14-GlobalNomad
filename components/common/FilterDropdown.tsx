import React from "react";
import Dropdown from "./Dropdown";
import DropdownArrow from "./svg/DropdownArrowSvg";

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
    "전체 보기";

  const handleOptionClick = (value: string) => {
    onFilterChange(value);
  };

  const optionsWithOnClick = filterOptions.map((option) => ({
    ...option,
    onClick: () => handleOptionClick(option.value),
  }));

  return (
    <Dropdown
      Options={optionsWithOnClick}
      defaultLabel={
        <button
          className="bg-white w-[100px] h-[40px] md:w-[120px] md:h-[45px] p-2 rounded-lg border border-nomad-black"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="flex items-center justify-center md:justify-between px-2">
            <p className="text-nomad-black font-bold text-sm md:text-base">
              {selectedOptionLabel}
            </p>
            <div
              className={`hidden md:flex h-6 w-6 items-center justify-center duration-100 md:h-5 md:w-5 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
            >
              <DropdownArrow />
            </div>
          </div>
        </button>
      }
      dropdownOpen={dropdownOpen}
      setDropdownOpen={setDropdownOpen}
      originPositionRight={false}
    />
  );
};

export default FilterDropdown;
