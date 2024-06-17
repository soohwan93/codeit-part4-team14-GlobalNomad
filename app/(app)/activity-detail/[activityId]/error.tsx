"use client";
import Link from "next/link";
import React from "react";

type Props = {};

const error = (props: Props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-2xl font-bold text-nomad-black">
      <h1>해당 체험을 찾을 수 없거나, 예기치 못한 에러가 발생했습니다.</h1>
      <Link
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        href="/"
      >
        메인 페이지로 이동하기
      </Link>
    </div>
  );
};

export default error;
