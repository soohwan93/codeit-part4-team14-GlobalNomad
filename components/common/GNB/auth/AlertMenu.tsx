"use client";

import React, { useState } from "react";
import AlertSvg from "../../svg/AlertSvg";
import NotificationModal, {
  Notification,
} from "../../NotificationModal/NotificationModal";

interface Props {
  totalCount: number;
  cursorId: number | null;
  notifications: Notification[];
}

const AlertMenu = ({
  totalCount: initialTotalCount,
  cursorId,
  notifications: initialNotifications,
}: Props) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isAlertClicked, setIsAlertClicked] = useState(false);
  const [totalCount, setTotalCount] = useState(initialTotalCount); // 알림 카운트를 상태로 관리

  const handleAlertClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 버블링 막기
    setIsAlertClicked((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsAlertClicked(false);
  };

  return (
    <>
      <div onClick={handleAlertClick} className="relative">
        <AlertSvg isClicked={isAlertClicked} />
        {isAlertClicked && (
          <NotificationModal
            cursorId={cursorId}
            totalCount={totalCount}
            setTotalCount={setTotalCount} // setTotalCount를 전달
            setState={setIsAlertClicked}
            notifications={notifications}
            setNotifications={setNotifications}
            buttonPosition={{ left: 0, top: 22 }}
            onClose={handleCloseModal}
          />
        )}
        <div className="absolute">{isAlertClicked}</div>
      </div>
    </>
  );
};

export default AlertMenu;
