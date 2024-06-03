"use client";
import Link from "next/link";
import React, { useState } from "react";
import CaretSvg from "../svg/CaretSvg";
import DivineLineSvg from "../svg/DivineLineSvg";
import AlertSvg from "../svg/AlertSvg";
import UserInformation from "./UserInformation";

const AuthNavButtons = () => {
  const [dropDownClicked, setDropDownClicked] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);

  const handleDropdownClick = () => {
    setDropDownClicked(!dropDownClicked);
  };

  const handleImageClick = () => {
    setImageClicked(!imageClicked);
  };

  return (
    <>
      <div className="flex gap-3">
        <div className="relative flex">
          <CaretSvg onClick={handleDropdownClick} isClicked={dropDownClicked} />
          {/* 임시 드롭다운 */}
          <ul
            className={`absolute ${dropDownClicked ? `block` : `hidden`} mt-7 transform text-gray-700 transition-transform duration-300 ease-in-out dark:text-gray-300`}
          >
            <li className="">
              <a
                className="block whitespace-nowrap rounded-t bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="#"
              >
                예약내역
              </a>
            </li>
            <li className="">
              <a
                className="block whitespace-nowrap bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="#"
              >
                내 체험 관리
              </a>
            </li>
            <li className="">
              <a
                className="block whitespace-nowrap rounded-b bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="#"
              >
                예약 현황
              </a>
            </li>
          </ul>
        </div>
        {/* 드롭다운 컴포넌트 자리 */}
        <Link href={"/reservations"} className="hidden sm:block">
          예약내역
        </Link>
        <DivineLineSvg className="hidden sm:block" />
        <Link href={"/activity-management"} className="hidden sm:block">
          내 체험 관리
        </Link>
        <Link href={"/reservation-status"} className="hidden sm:block">
          예약현황
        </Link>
        <DivineLineSvg />
        <AlertSvg />
        <DivineLineSvg />
        <UserInformation onClick={handleImageClick} isClicked={imageClicked} />
      </div>
    </>
  );
};

export default AuthNavButtons;
