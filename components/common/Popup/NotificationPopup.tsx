import Button from "../Button";
import PopupWrapper from "./PopupWrapper";

interface NotificationPopupProps {
  callback: (() => void) | null;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPopup = ({
  callback,
  message,
  isOpen,
  onClose,
}: NotificationPopupProps) => {
  return (
    <PopupWrapper callback={callback} isOpen={isOpen} onClose={onClose}>
      <div className="m-3 flex h-[220px] w-[327px] max-w-full flex-col items-center justify-between rounded-xl bg-white p-6 md:h-[250px] md:w-[540px]">
        <div className="flex flex-grow items-center justify-center">
          <p className="text-center">{message}</p>
        </div>
        <div className="flex w-full justify-center md:justify-end">
          <Button onClick={onClose} size="md">
            확인
          </Button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default NotificationPopup;
