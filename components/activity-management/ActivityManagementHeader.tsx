"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

const ActivityManagementHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[32px] font-bold">내 체험 관리</div>
      <Button
        className="focus:ring-0"
        color="dark"
        as={Link}
        href="/activity-management/create"
      >
        체험 등록하기
      </Button>
    </div>
  );
};

export default ActivityManagementHeader;
