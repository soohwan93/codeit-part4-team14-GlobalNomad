"use client";
import React, { useState } from 'react';
import NotificationPopup from '@/components/common/NotificationModal/NotificationModal';

const TestNotifications = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      teamId: 1,
      userId: 1,
      content: '첫 번째 알림 내용 승인',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      teamId: 1,
      userId: 1,
      content: '두 번째 알림 내용 거절',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      teamId: 1,
      userId: 1,
      content: '세 번째 알림 내용 승인',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      teamId: 1,
      userId: 1,
      content: '네 번째 알림 내용 거절',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Show Notifications</button>
      {showPopup && (
        <NotificationPopup
          setState={setShowPopup}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
    </div>
  );
};

export default TestNotifications;
