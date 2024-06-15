import { ChangeEvent, useRef } from "react";
import DefaultUserSvg from "../common/svg/DefaultUserSvg";
import ProfileEditSvg from "../common/svg/ProfileEditSvg";
import Image from "next/image";
import { postUserImageUrl } from "@/util/api";

interface ProfileImageUploaderProps {
  selectedImage: string | null;
  onImageChange: (imageUrl: string) => void;
  setPopupMessage: (message: string) => void;
  togglePopup: () => void;
}

const ProfileImageUploader = ({
  selectedImage,
  onImageChange,
  setPopupMessage,
  togglePopup,
}: ProfileImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      onImageChange(imageUrl);
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await postUserImageUrl(formData);
      return response.profileImageUrl;
    } catch (error: any) {
      setPopupMessage(error.message || "이미지 업로드에 실패했습니다.");
      togglePopup();
      return "";
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-image-input"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <label htmlFor="profile-image-input" className="cursor-pointer">
          {selectedImage ? (
            <Image
              className="h-[160px] w-[160px] max-w-[100%] rounded-[50%]"
              width={160}
              height={160}
              src={selectedImage}
              alt="프로필 이미지"
              priority
            />
          ) : (
            <div className="h-[160px] w-[160px] max-w-[100%] rounded-[50%]">
              <DefaultUserSvg />
            </div>
          )}
        </label>
        <div
          className="absolute bottom-0 right-0 transform cursor-pointer"
          onClick={handleEditClick}
        >
          <ProfileEditSvg />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
