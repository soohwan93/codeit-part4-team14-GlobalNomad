import { ReactNode, useEffect, useRef } from "react";

interface PopupWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupWrapper = ({ isOpen, onClose, children }: PopupWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      if (wrapperRef.current) {
        wrapperRef.current.focus();
      }
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      tabIndex={-1}
      ref={wrapperRef}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      {children}
    </div>
  );
};

export default PopupWrapper;
