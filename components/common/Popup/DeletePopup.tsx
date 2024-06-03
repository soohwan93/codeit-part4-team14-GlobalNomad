import PopupWrapper from "./PopupWrapper";
import Button from "../Button";
import PopupCheckSvg from "../svg/PopupCheckSvg";

interface DeletePopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePopup = ({
  message,
  isOpen,
  onClose,
  onDelete,
}: DeletePopupProps) => {
  return (
    <PopupWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex w-72 flex-col items-center justify-center rounded-xl bg-white p-6">
        <PopupCheckSvg />
        <p className="mt-4">{message}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="white" size="sm" onClick={onClose}>
            아니오
          </Button>
          <Button
            onClick={() => {
              onClose();
              onDelete();
            }}
            size="sm"
          >
            삭제하기
          </Button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default DeletePopup;
