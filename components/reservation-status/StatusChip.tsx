import React from "react";

interface StatusChipProps {
  type: string;
  info: number;
  onChipClick: (type: string) => void;
  children: React.ReactNode;
}

const StatusChip = ({ type, info, children, onChipClick }: StatusChipProps) => {
  return (
    <button
      className={`inline-block w-full rounded p-1 pl-2 text-left text-sm font-medium leading-normal
                  ${type === "pending" ? " bg-blue-30 text-white" : type === "confirmed" ? " bg-orange-20 text-orange-10" : " bg-gray-30 text-gray-80"}`}
      onClick={() => onChipClick(type)}
    >
      {children}
      <span className="ml-0.5 inline-block">{info}</span>
    </button>
  );
};

export default StatusChip;
