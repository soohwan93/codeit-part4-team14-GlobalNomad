"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import placeHolderImg from "@/public/icons/userNoImage.svg";
import { UserData } from "./AuthNavButtons";
import { Tooltip } from "flowbite-react";

type Props = {
  userData: UserData | null;
  onClick: () => void;
  isClicked: Boolean;
  setIsImageClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInformation = ({
  userData,
  onClick,
  isClicked,
  setIsImageClicked,
}: Props) => {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClickImageOutside = useCallback(
    (e: MouseEvent) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest("#userImage")
      ) {
        setIsImageClicked(false);
      }
    },
    [setIsImageClicked],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickImageOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickImageOutside);
    };
  }, [handleClickImageOutside]);

  return (
    <>
      <div ref={imageRef} className="flex gap-3 md:w-32">
        <div onClick={onClick} className="relative h-6 w-6 rounded-full">
          <Image
            id="userImage"
            className="fixed cursor-pointer rounded-full object-cover"
            alt="userImage"
            src={
              userData?.profileImageUrl
                ? userData.profileImageUrl
                : placeHolderImg
            }
            fill
            sizes="100px"
          />
          {/* 임시 드롭다운 */}
          <ul
            className={`absolute ${isClicked ? `block` : `hidden`} right-0 mt-7 w-24 transform text-gray-700 transition-transform duration-300 ease-in-out dark:text-gray-300 md:left-0`}
          >
            <li className="">
              <a
                className="block whitespace-nowrap rounded-t bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="/my-page"
              >
                내 정보
              </a>
            </li>
            <li className="">
              <a
                className="block whitespace-nowrap rounded-b bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="/signin"
              >
                로그아웃
              </a>
            </li>
          </ul>
        </div>

        <Tooltip
          content={userData?.nickname}
          placement="bottom"
          animation={false}
          arrow={false}
        >
          <span className="hidden w-[90px] overflow-hidden truncate md:block">
            {userData?.nickname}
          </span>
        </Tooltip>
      </div>
    </>
  );
};

export default UserInformation;
