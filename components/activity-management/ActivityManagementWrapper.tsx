import React from "react";

type Props = { children: React.ReactNode };

const ActivityManagementWrapper = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center bg-gray-10 py-20">
      <div className="flex w-[768px] flex-col gap-5 px-5">{children}</div>
    </div>
  );
};

export default ActivityManagementWrapper;
