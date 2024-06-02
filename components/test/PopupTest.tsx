"use client";
import useToggle from "@/hooks/useToggle";
import CancelPopup from "../common/Popup/CancelPopup";
import DeletePopup from "../common/Popup/DeletePopup";
import NotificationPopup from "../common/Popup/NotificationPopup";

const PopupTest = () => {
  const { isOpen: isNotificationOpen, toggle: toggleNotification } =
    useToggle();
  const { isOpen: isCancelOpen, toggle: toggleCancel } = useToggle();
  const { isOpen: isDeleteOpen, toggle: toggleDelete } = useToggle();

  const handleCancel = () => {
    console.log("예약이 취소되었습니다.");
  };

  const handleDelete = () => {
    console.log("항목이 삭제되었습니다.");
  };

  return (
    <div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={toggleNotification}
      >
        알림 팝업 열기
      </button>
      <button
        className="rounded bg-green-500 px-4 py-2 text-white"
        onClick={toggleCancel}
      >
        예약 취소 팝업 열기
      </button>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white"
        onClick={toggleDelete}
      >
        삭제 팝업 열기
      </button>
      <NotificationPopup
        message="성공적으로 회원가입에 성공하였습니다!"
        isOpen={isNotificationOpen}
        onClose={toggleNotification}
      />
      <CancelPopup
        message="정말로 예약을 취소하시겠습니까?"
        isOpen={isCancelOpen}
        onClose={toggleCancel}
        onCancel={handleCancel}
      />
      <DeletePopup
        message="정말로 항목을 삭제하시겠습니까?"
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PopupTest;
