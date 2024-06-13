"use client";

import React, { useEffect, useRef, useState } from "react";
import AlertSvg from "../../svg/AlertSvg";

type Props = {};

const AlertMenu = (props: Props) => {
  const [isAlertClicked, setIsAlertClicked] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  const handleAlertClick = () => {
    setIsAlertClicked(!isAlertClicked);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAlertOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickAlertOutside);
    };
  }, []);

  return (
    <>
      <div ref={alertRef} className="relative flex">
        <AlertSvg onClick={handleAlertClick} isClicked={isAlertClicked} />
        <ul
          className={`absolute ${isAlertClicked ? `block` : `hidden`} right-0 mt-7 w-24 transform text-gray-700 transition-transform duration-300 ease-in-out dark:text-gray-300 md:left-0`}
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
    </>
  );
};

export default AlertMenu;
