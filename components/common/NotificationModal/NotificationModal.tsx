"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { deleteMyNotification, getMyNotifications } from "@/util/api";
import dateFormat from "@/util/dateForm";

export interface Notification {
  id: number;
  teamId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface NotificationPopupProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  buttonPosition: { top: number; left: number };
}

const NotificationPopup = ({
  setState,
  notifications,
  setNotifications,
  buttonPosition,
}: NotificationPopupProps) => {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });

  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const cursorId =
        notifications.length > 0
          ? notifications[notifications.length - 1].id
          : 0;
      const response = await getMyNotifications({ cursorId, size: 10 });
      setNotifications((prev) => [...prev, ...response.notifications]);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  }, [notifications, setNotifications]);

  useEffect(() => {
    if (inView && !loading) {
      fetchNotifications();
    }
  }, [inView, loading, fetchNotifications]);

  useEffect(() => {
    const adjustPosition = () => {
      const { innerWidth, innerHeight } = window;
      const popupWidth = 368;
      const popupHeight = notificationsRef.current
        ? notificationsRef.current.offsetHeight
        : 0;

      let { top, left } = buttonPosition;
      if (left + popupWidth > innerWidth) {
        left = innerWidth - popupWidth - 10;
      }
      if (top + popupHeight > innerHeight) {
        top = innerHeight - popupHeight - 10;
      }

      setAdjustedPosition({ top, left });
    };

    adjustPosition();
  }, [buttonPosition]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMyNotification(id);
      setNotifications(
        notifications.filter((notification) => notification.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("#notificationModal")
      ) {
        setState(false);
      }
    },
    [setState],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderContent = (content: string) => {
    if (!content) return null;

    const parts = content.split(/(승인|거절)/g);
    return parts.map((part, index) => {
      if (part === "승인") {
        return (
          <span key={index} className="text-[#0085ff]">
            승인
          </span>
        );
      }
      if (part === "거절") {
        return (
          <span key={index} className="text-[#ff472e]">
            거절
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      ref={notificationsRef}
      className="absolute z-[50] w-full rounded-[10px] border border-[#CBC9CF] bg-[#CED8D5] px-5 py-6 text-[#1b1b1b] md:w-[368px]"
      style={{
        boxShadow: "0px 2px 8px 0px rgba(120, 116, 134, 0.25)",
        top: adjustedPosition.top + 10,
        left: adjustedPosition.left,
      }}
    >
      <div id="notificationModal" className="flex items-center justify-between">
        <p className="text-[20px] font-bold leading-normal">
          {notifications.length === 0
            ? "알림이 없습니다."
            : `알림 ${notifications.length}개`}
        </p>
        <button
          type="button"
          onClick={() => setState(false)}
          className="h-10 w-10 bg-[url('/icons/btn_X.svg')] bg-cover"
        ></button>
      </div>
      {notifications.length > 0 && (
        <div className="mt-4 flex h-full flex-col gap-2 overflow-hidden md:h-[632px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="min-h-[120px] bg-white px-3 py-4"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`mt-1 h-[5px] w-[5px] rounded-full ${notification.content.includes("승인") ? "bg-[#0085ff]" : "bg-[#ff472e]"}`}
                ></div>
                <button
                  type="button"
                  onClick={() => handleDelete(notification.id)}
                  className="h-6 w-6 bg-[url('/icons/btn_X.svg')] bg-cover"
                ></button>
              </div>
              <div className="flex flex-col justify-between">
                <p
                  className="mb-1 text-[14px] font-normal leading-[22px]"
                  style={{ wordBreak: "keep-all", wordWrap: "break-word" }}
                >
                  {renderContent(notification.content)}
                </p>
                <p className="text-[12px] font-normal leading-[16px] text-[#a4a1aa]">
                  {dateFormat(notification.updatedAt)}
                </p>
              </div>
            </div>
          ))}
          <div ref={ref} className="h-[1px]"></div>
          {loading && <div className="p-4 text-center">로딩 중...</div>}
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
