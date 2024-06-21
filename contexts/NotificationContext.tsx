"use client";

import NotificationPopup from "@/components/common/Popup/NotificationPopup";
import { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextProps {
  message: string;
  isOpen: boolean;
  showNotification: (message: string, callback?: () => void) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<(() => void) | null>(null);

  const showNotification = (msg: string, cb?: () => void) => {
    setMessage(msg);
    setIsOpen(true);
    if (cb) {
      setCallback(() => cb);
    }
  };

  const closeNotification = () => {
    setIsOpen(false);
    if (callback) {
      callback();
      setCallback(null);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ message, isOpen, showNotification, closeNotification }}
    >
      {children}
      <NotificationPopup
        message={message}
        isOpen={isOpen}
        onClose={closeNotification}
        callback={callback}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("NotificationProvider가 설정되어있지않습니다.");
  }
  return context;
};
