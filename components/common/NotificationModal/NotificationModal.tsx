"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { deleteMyNotification, getMyNotifications } from "@/util/api";
import dateFormat from "@/util/dateForm";
import AlertSvg from "@/components/common/svg/AlertSvg";

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
  cursorId: number | null;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>; // 추가된 부분
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  buttonPosition: { top: number; left: number };
  onClose: () => void;
}

const NotificationModal = ({
  cursorId: initialCursorId,
  totalCount,
  setTotalCount, // 추가된 부분
  setState,
  notifications,
  setNotifications,
  buttonPosition,
  onClose,
}: NotificationModalProps) => {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(initialCursorId);
  const [lastCursorId, setLastCursorId] = useState<number | null>(
    notifications.length > 0
      ? notifications[notifications.length - 1].id
      : null,
  );
  const [lastDataLength, setLastDataLength] = useState<number>(5);

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
      const response = await getMyNotifications({
        cursorId: lastCursorId,
        size: 5,
      });
      setNotifications((prev) => [...prev, ...response.notifications]);
      if (response.notifications.length > 0) {
        setLastCursorId(
          response.notifications[response.notifications.length - 1].id,
        );
      }
      setLastDataLength(response.notifications.length);
      setCursorId(response.cursorId);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  }, [setNotifications, lastCursorId]);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      totalCount > 5 &&
      cursorId &&
      lastDataLength === 5
    ) {
      fetchNotifications();
    }
  }, [
    inView,
    loading,
    fetchNotifications,
    totalCount,
    cursorId,
    lastDataLength,
  ]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMyNotification(id);
      setNotifications(
        notifications.filter((notification) => notification.id !== id),
      );
      setTotalCount((prevCount) => prevCount - 1); // 알림 카운트 업데이트
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("#alertSvg")
      ) {
        onClose();
      }
    },
    [onClose],
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
      className="fixed z-[50] w-full h-screen bg-[#CED8D5] border border-[#CBC9CF] rounded-[10px] shadow-[0px_2px_8px_0px_rgba(120,116,134,0.25)] md:absolute md:w-[368px] md:max-h-[calc(4*152px+64px)]"
      style={{
        top: windowWidth >= 768 ? buttonPosition.top + 10 : 0,
        left: windowWidth >= 768 ? buttonPosition.left - 170 : buttonPosition.left,
      }}
      onClick={(e) => e.stopPropagation()} // 이벤트 버블링 막기
    >
      <div
        id="notificationModal"
        className="flex items-center justify-between p-6"
      >
        <p className="text-[20px] font-bold leading-normal">
          {`알림 ${totalCount}개`}
        </p>
        <button
          type="button"
          onClick={onClose} // 모달을 닫음
          className="h-10 w-10 bg-[url('/icons/btn_X.svg')] bg-cover"
        ></button>
      </div>
      {notifications.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center pb-32 text-center">
          <AlertSvg isClicked={false} />
          <p className="mt-4 text-[20px] font-bold">
            새로운 알림이 없습니다.
          </p>
          <p className="text-[14px] text-[#a4a1aa]">
            서비스와 다양한 알림을 이곳에서 모아볼 수 있어요.
          </p>
        </div>
      ) : (
        <div
          className="mt-4 flex h-full flex-col items-center gap-2 px-4 md:h-[calc(4*120px+64px)]"
          style={{ overflowY: "scroll", scrollbarWidth: "none" }}
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="relative min-h-[120px] w-full rounded-lg bg-white px-3 pb-4 pt-2 md:w-[340px]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-3 items-center justify-center">
                  <div
                    className={` mt-1  h-[5px] w-[5px]  rounded-full ${notification.content.includes("승인") ? "bg-[#0085ff]" : "bg-[#ff472e]"}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 버블링 막기
                    handleDelete(notification.id);
                  }}
                  className="h-6 w-6 bg-[url('/icons/btn_X.svg')] bg-cover"
                ></button>
              </div>
              <div className="flex flex-col justify-between">
                <p className="mb-1 break-words text-[14px] font-normal leading-[22px]">
                  {renderContent(notification.content)}
                </p>
              </div>
              <p className=" absolute bottom-3 left-3 text-[12px] font-normal leading-[16px] text-[#a4a1aa]">
                {dateFormat(notification.updatedAt)}
              </p>
            </div>
          ))}
          <div ref={ref} className="h-[1px]"></div>
          {loading && (
            <div className="flex h-32 w-full items-center justify-center space-x-2 dark:invert md:h-[calc(4*120px+64px)]">
              <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.3s]"></div>
              <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.15s]"></div>
              <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
