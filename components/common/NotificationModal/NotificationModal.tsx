"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { deleteMyNotification, getMyNotifications } from "@/util/api";
import dateFormat from "@/util/dateForm";
import AlertSvg from '@/components/common/svg/AlertSvg';

export interface Notification {
  id: number;
  teamId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface NotificationModalProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  buttonPosition: { top: number; left: number };
}

const NotificationModal = ({
  setState,
  notifications,
  setNotifications,
  buttonPosition,
}: NotificationModalProps) => {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <>
      <div
        ref={notificationsRef}
        className="fixed z-[50] w-full h-screen bg-[#CED8D5] border border-[#CBC9CF] rounded-[10px] shadow-[0px_2px_8px_0px_rgba(120,116,134,0.25)] md:absolute md:w-[368px] md:max-h-[calc(4*152px+64px)]"
        style={{
          top: windowWidth >= 768 ? buttonPosition.top + 10 : 0,
          left: windowWidth >= 768 ? buttonPosition.left - 170 : buttonPosition.left,
        }}
      >
        <div id="notificationModal" className="flex items-center justify-between p-6">
          <p className="text-[20px] font-bold leading-normal">
            {`알림 ${notifications.length}개`}
          </p>
          <button
            type="button"
            onClick={() => setState(prev => !prev)}
            className="h-10 w-10 bg-[url('/icons/btn_X.svg')] bg-cover"
          ></button>
        </div>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center pb-32">
            <AlertSvg isClicked={false}/>
            <p className="text-[20px] font-bold mt-4">새로운 알림이 없습니다.</p>
            <p className="text-[14px] text-[#a4a1aa]">서비스와 다양한 알림을 이곳에서 모아볼 수 있어요.</p>
          </div>
        ) : (
          <div className="mt-4 flex h-full flex-col gap-2 overflow-hidden md:h-[calc(2*120px+64px)]">
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
                    className="mb-1 text-[14px] font-normal leading-[22px] break-words"
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
    </>
  );
};
// resolve problem
export default NotificationModal;
