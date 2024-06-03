import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import placeHolderImg from "@/components/common/GNB/세상에서 가장 멋진 석양.png";

type Props = {
  onClick: () => void;
  isClicked: Boolean;
  setIsImageClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInformation = ({ onClick, isClicked, setIsImageClicked }: Props) => {
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
      <div ref={imageRef} className="flex gap-3">
        <div onClick={onClick} className="relative h-6 w-6 rounded-full">
          <Image
            id="userImage"
            className="rounded-full"
            alt="임시 이미지"
            layout="fixed"
            src={placeHolderImg}
            objectFit="cover"
            fill
          />
          {/* 임시 드롭다운 */}
          <ul
            className={` absolute ${isClicked ? `block` : `hidden`} right-0 mt-7 w-24 transform text-gray-700 transition-transform duration-300 ease-in-out md:left-0 dark:text-gray-300`}
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
        </div>

        <span className="hidden md:block" onClick={onClick}>
          정만철아닌데예
        </span>
      </div>
    </>
  );
};

export default UserInformation;
