"use client";
import React, { useEffect, useRef } from 'react';

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
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ setState, notifications }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={popupRef} className="fixed top-4 right-4 w-80 bg-white shadow-lg rounded-lg z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">알림 {notifications.length}개</h2>
        <button onClick={() => setState(false)} className="text-gray-400 hover:text-gray-600">
          &times;
        </button>
      </div>
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div key={notification.id} className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex-1">
              <p>{notification.content}</p>
              <span className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                // 더미 데이터 삭제 로직 (실제 API 호출 아님)
                setState(prev => prev.filter(n => n.id !== notification.id));
              }}
              className="text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopup;
