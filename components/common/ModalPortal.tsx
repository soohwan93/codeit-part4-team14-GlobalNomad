"use client";
import Button from "@/components/common/Button";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";
import ModalBase from "./ModalBase";

interface ReservationPopupType {
  title: string;
  setState: Dispatch<SetStateAction<boolean>>;
  buttonName?: string;
  onButtonClick?: () => void;
  usePortal?: boolean;
  children: React.ReactNode;
}

/**
 *
 * @param {string} title 현재 모달의 이름입니다.
 * @param {Dispatch<SetStateAction<boolean>>} setState 현재 모달의 상태를 조절하는 setState 액션입니다
 * @param {string} buttonName 현재 모달에 대하여, 버튼이 필요할 경우 사용할 버튼의 이름입니다. 이것이 없을 경우 버튼이 생성되지 않습니다.
 * @param {() => void)} onButtonClick 버튼 클릭에 따라 수행될 동작을 받습니다.
 * @param {React.ReactNode} children 혅 모달에 포함될 내용을 받습니다.
 * @param {boolean} usePortal 현재 모달이 portal기능을 사용하여 표시할 것인지를 받습니다. 기본적으로 false상태입니다.
 * @returns
 */

const ReservationPopup = ({
  title,
  setState,
  buttonName,
  onButtonClick,
  children,
  usePortal = false,
}: ReservationPopupType) => {
  const [mounted, setMounted] = useState(false);
  // const portalElement = useMemo(() => document.getElementById("portal"), []);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (usePortal && mounted) {
    const portalElement = document.getElementById("portal");
    return ReactDOM.createPortal(
      <ModalBase
        title={title}
        setState={setState}
        buttonName={buttonName}
        onButtonClick={onButtonClick}
        usePortal={usePortal}
      >
        {children}
      </ModalBase>,
      portalElement!,
    );
  }

  return (
    <ModalBase
      title={title}
      setState={setState}
      buttonName={buttonName}
      onButtonClick={onButtonClick}
      usePortal={usePortal}
    >
      {children}
    </ModalBase>
  );
};

export default ReservationPopup;
