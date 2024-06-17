"use client";
import React, { useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { deleteMyNotification, getMyNotifications } from '@/util/api';
import { MyNotificationsQuery } from '@/util/apiType';
import dateFormat from '@/util/dateForm';
import { useCustomInfiniteQuery } from '@/hooks/useCustomInfinityQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Notification {
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
}

const NotificationPopup = ({ setState, notifications, setNotifications }: NotificationPopupProps) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  const { data, isFetchingNextPage, fetchNextPage } = useCustomInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 0 }) => {
      const query: MyNotificationsQuery = { cursorId: pageParam as number, size: 10 };
      const response = await getMyNotifications(query);
      return response;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (notificationId: number) => deleteMyNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (data) {
      setNotifications(prev => [...prev, ...data.pages]);
    }
  }, [data, setNotifications]);

  const handleDelete = (id: number) => {
    mutate(id);
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    },
    [setState]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderContent = (content: string) => {
    if (!content) return null;

    const parts = content.split(/(승인|거절)/g);
    return parts.map((part, index) => {
      if (part === '승인') {
        return (
          <span key={index} className="text-[#0085ff]">
            승인
          </span>
        );
      }
      if (part === '거절') {
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
    <div className="fixed inset-0 flex items-center justify-center z-[50]">
      <div
        ref={notificationsRef}
        className="absolute w-full min-h-screen px-5 py-6 rounded-[10px] border border-[#CBC9CF] bg-[#CED8D5] text-[#1b1b1b] z-[50] md:top-0 md:left-0 md:w-[368px] md:min-h-auto"
        style={{ boxShadow: '0px 2px 8px 0px rgba(120, 116, 134, 0.25)' }}
      >
        <div className="flex justify-between items-center">
          <p className="text-[20px] leading-normal font-bold">
            {notifications.length === 0
              ? '알림이 없습니다.'
              : `알림 ${notifications.length}개`}
          </p>
          <button
            type="button"
            onClick={() => setState(false)}
            className="h-10 w-10 bg-[url('/icons/btn_X.svg')] bg-cover"
          ></button>
        </div>
        {notifications.length > 0 && (
          <div className="flex flex-col gap-2 mt-4 h-full overflow-hidden md:h-[632px]">
            {notifications.map((notification) => (
              <div key={notification.id} className="min-h-[120px] px-3 py-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className={`w-[5px] h-[5px] mt-1 rounded-full ${notification.content.includes('승인') ? 'bg-[#0085ff]' : 'bg-[#ff472e]'}`}></div>
                  <button
                    type="button"
                    onClick={() => handleDelete(notification.id)}
                    className="h-6 w-6 bg-[url('/icons/btn_X.svg')] bg-cover"
                  ></button>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="mb-1 text-[14px] leading-[22px] font-normal" style={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>
                    {renderContent(notification.content)}
                  </p>
                  <p className="text-[12px] leading-[16px] font-normal text-[#a4a1aa]">
                    {dateFormat(notification.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={ref} className="h-[1px]"></div>
            {isFetchingNextPage && <div className="text-center p-4">로딩 중...</div>}
          </div>
        )}
      </div>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setState(false)}></div>
    </div>
  );
};

export default NotificationPopup;
