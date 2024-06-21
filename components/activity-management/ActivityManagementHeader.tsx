import Link from "next/link";
import React from "react";
import Button from "../common/Button";

const ActivityManagementHeader = () => {
  return (
    <>
      <div className="mt-1 flex items-center justify-between pb-6">
        <div className="text-[32px] font-bold">내 체험 관리</div>
        <Link
          href={"/activity-management/create"}
          className="h-12 w-[120px] rounded-[4px] font-medium text-white"
        >
          <Button>체험 등록하기</Button>
        </Link>
      </div>
    </>
  );
};

export default ActivityManagementHeader;
