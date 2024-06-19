import React from "react";
import AddImageSvg from "@/components/common/svg/AddImageSvg";

const AddImage = () => {
  return (
    <div className="flex h-[167px] w-[167px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-80 md:h-[206px] md:w-[206px]">
      <AddImageSvg />
      <span className="mt-8 text-xl text-gray-80 md:text-2xl">이미지 등록</span>
    </div>
  );
};

export default AddImage;
