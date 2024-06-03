import Image from "next/image";
import React from "react";
import placeHolderImg from "@/components/common/GNB/세상에서 가장 멋진 석양.png";

type Props = { onClick: () => void; isClicked: Boolean };

const UserInformation = ({ onClick, isClicked }: Props) => {
  return (
    <>
      <div className="flex gap-3">
        <div onClick={onClick} className="relative h-6 w-6 rounded-full">
          <Image
            className="rounded-full"
            alt="임시 이미지"
            layout="fixed"
            src={placeHolderImg}
            objectFit="cover"
            fill
          />
        </div>
        {/* 임시 드롭다운 */}
        <ul
          className={` absolute ${isClicked ? `block` : `hidden`} mt-7 transform text-gray-700 transition-transform duration-300 ease-in-out dark:text-gray-300`}
        >
          <li className="">
            <a
              className="block whitespace-nowrap rounded-t bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              href="#"
            >
              내 정보
            </a>
          </li>
          <li className="">
            <a
              className="block whitespace-nowrap rounded-b bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              href="#"
            >
              로그아웃
            </a>
          </li>
        </ul>
        <span className="hidden md:block">정만철아닌데예</span>
      </div>
    </>
  );
};

export default UserInformation;
