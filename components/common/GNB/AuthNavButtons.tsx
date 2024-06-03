"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CaretSvg from "../svg/CaretSvg";
import DivineLineSvg from "../svg/DivineLineSvg";
import AlertSvg from "../svg/AlertSvg";
import UserInformation from "./UserInformation";
import { getUser } from "@/util/api";

export interface UserData {
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: null | string;
  updatedAt: string;
}

const AuthNavButtons = () => {
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const [isAlertClicked, setIsAlertClicked] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setIsDropDownClicked(!isDropDownClicked);
    setIsImageClicked(false);
    setIsAlertClicked(false);
  };

  const handleAlertClick = () => {
    setIsDropDownClicked(false);
    setIsImageClicked(false);
    setIsAlertClicked(!isAlertClicked);
  };

  const handleImageClick = () => {
    setIsDropDownClicked(false);
    setIsImageClicked(!isImageClicked);
    setIsAlertClicked(false);
  };

  const handleClickDropdownOutside = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node) &&
      !(e.target as Element).closest("#caretSvg")
    ) {
      setIsDropDownClicked(false);
    }
  };

  const handleClickAlertOutside = (e: MouseEvent) => {
    if (
      alertRef.current &&
      !alertRef.current.contains(e.target as Node) &&
      !(e.target as Element).closest("#alertSvg")
    ) {
      setIsAlertClicked(false);
    }
  };

  const callUserInformation = async () => {
    const res = await getUser();
    setUserData(res);
    console.log(res);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickDropdownOutside);
    document.addEventListener("mousedown", handleClickAlertOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickDropdownOutside);
      document.removeEventListener("mousedown", handleClickAlertOutside);
    };
  }, []);

  useEffect(() => {
    callUserInformation();
  }, []);

  return (
    <>
      <div className="flex gap-3">
        <div ref={dropDownRef} className="relative flex">
          <CaretSvg
            onClick={handleDropdownClick}
            isClicked={isDropDownClicked}
          />
          {/* 임시 드롭다운 */}
          <ul
            className={`absolute ${isDropDownClicked ? `block sm:hidden` : `hidden`} mt-7 transform text-gray-700 transition-transform duration-300 ease-in-out dark:text-gray-300`}
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
        <div ref={alertRef} className="relative flex">
          <AlertSvg onClick={handleAlertClick} isClicked={isAlertClicked} />
          {/* 임시 드롭다운 */}
          <ul
            className={`absolute ${isAlertClicked ? `block` : `hidden`} right-0 mt-7 w-24 transform text-gray-700 transition-transform duration-300 ease-in-out md:left-0 dark:text-gray-300`}
          >
            <li className="">
              <a
                className="block whitespace-nowrap rounded-t bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="#"
              >
                임시 알림
              </a>
            </li>
            <li className="">
              <a
                className="block whitespace-nowrap bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="#"
              >
                임시 알림
              </a>
            </li>
            <li className="">
              <a
                className="block whitespace-nowrap rounded-b bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="#"
              >
                임시 알림
              </a>
            </li>
          </ul>
        </div>
        <DivineLineSvg />
        {userData ? (
          <UserInformation
            userData={userData}
            setIsImageClicked={setIsImageClicked}
            onClick={handleImageClick}
            isClicked={isImageClicked}
          />
        ) : (
          <div className="flex w-32 gap-3" />
        )}
        {/* <UserInformation
          userData={userData}
          setIsImageClicked={setIsImageClicked}
          onClick={handleImageClick}
          isClicked={isImageClicked}
        /> */}
      </div>
    </>
  );
};

export default AuthNavButtons;
