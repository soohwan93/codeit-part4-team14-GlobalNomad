import PopupWrapper from "./PopupWrapper";
import Button from "../Button";
import CloseSvg from "../svg/PopupCheckSvg";

interface CancelPopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
}

const CancelPopup = ({
  message,
  isOpen,
  onClose,
  onCancel,
}: CancelPopupProps) => {
  return (
    <PopupWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex w-72 flex-col items-center justify-center rounded-xl bg-white p-6">
        <CloseSvg />
        <p className="mt-4">{message}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="white" size="sm" onClick={onClose}>
            아니오
          </Button>
          <Button
            onClick={() => {
              onClose();
              onCancel();
            }}
            size="sm"
          >
            취소하기
          </Button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default CancelPopup;
