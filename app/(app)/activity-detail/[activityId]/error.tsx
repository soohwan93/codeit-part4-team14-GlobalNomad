"use client";
import Link from "next/link";
import React from "react";

type Props = {};

const error = (props: Props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-2xl font-bold text-nomad-black">
      <h1>해당 체험을 찾을 수 없습니다.</h1>
      <Link
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        href="http://localhost:3000/activity-detail/991"
      >
        체험 있는 페이지로 이동하기
      </Link>
      <Link
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        href="http://localhost:3000/activity-detail/993"
      >
        체험 없는 페이지로 이동하기
      </Link>
    </div>
  );
};

export default error;
