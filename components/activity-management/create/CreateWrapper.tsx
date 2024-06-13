import React from "react";
interface Props {
  children: React.ReactNode;
}
const CreateWrapper = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center bg-gray-10 py-6 md:py-20">
      <div className="flex w-[768px] flex-col gap-5 px-4">{children}</div>
    </div>
  );
};

export default CreateWrapper;
