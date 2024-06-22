import React from "react";

interface StatusChipProps {
  type: "pending" | "confirmed" | "completed";
  info: number;
  passed: boolean;
  onChipClick?: (type: "pending" | "confirmed") => void;
  children: React.ReactNode;
}

const StatusChip = ({
  type,
  info,
  passed,
  children,
  onChipClick = () => {},
}: StatusChipProps) => {
  return (
    <button
      className={`inline-block w-full truncate rounded p-0.5 text-left text-[0.625rem] font-medium leading-normal md:pl-1 md:text-xs xl:p-1 xl:pl-2 xl:text-sm
                  ${type === "pending" ? " bg-blue-30 text-white" : type === "confirmed" ? " bg-orange-20 text-orange-10" : " cursor-not-allowed bg-gray-30 text-gray-80"}
                  ${passed === true && type === "pending" ? "bg-red-20 text-orange-10" : ""}
                  ${passed === true ? "cursor-not-allowed" : ""}`}
      onClick={() => {
        if (type !== "completed") {
          if (passed === true) return;
          onChipClick(type);
        }
      }}
    >
      {children}
      <span className="inline-block md:ml-0.5">{info}</span>
    </button>
  );
};

export default StatusChip;
