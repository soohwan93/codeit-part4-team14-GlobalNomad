import React from "react";

type Props = { children: React.ReactNode };

const ActivityManagementWrapper = ({ children }: Props) => {
  return (
    <div className="min-w-screen flex min-h-screen justify-center bg-gray-10 py-14 md:py-20">
      <div className="flex w-[768px] flex-col gap-5 px-4">{children}</div>
    </div>
  );
};

export default ActivityManagementWrapper;
