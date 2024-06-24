import { ReactNode, useEffect, useRef, useCallback } from "react";

interface PopupWrapperProps {
  callback: (() => void) | null;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupWrapper = ({
  callback,
  isOpen,
  onClose,
  children,
}: PopupWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (callback) {
          callback();
        }
        onClose();
      }
    },
    [onClose, callback],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      if (wrapperRef.current) {
        wrapperRef.current.focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div
      tabIndex={-1}
      ref={wrapperRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div ref={containerRef}>{children}</div>
    </div>
  );
};

export default PopupWrapper;
