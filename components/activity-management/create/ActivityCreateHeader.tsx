import Button from "@/components/common/Button";
import React from "react";

type Props = {};

const ActivityCreateHeader = (props: Props) => {
  const handleCreate = () => {
    alert("내 체험 등록!");
  };
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="text-[32px] font-bold">내 체험 등록</div>
      <Button
        type="submit"
        className="h-12 w-[120px] rounded-[4px] bg-nomad-black font-medium text-white"
      >
        등록하기
      </Button>
    </div>
  );
};

export default ActivityCreateHeader;
