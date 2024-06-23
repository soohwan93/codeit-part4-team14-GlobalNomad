import { ChangeEvent, useRef, useState } from "react";
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
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ProfileImageUploader = ({
  selectedImage,
  onImageChange,
  setPopupMessage,
  togglePopup,
}: ProfileImageUploaderProps) => {
  const [isValidImage, setIsValidImage] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setPopupMessage("파일 크기는 4MB를 넘어갈 수 없습니다.");
      togglePopup();
      return;
    }

    const imageUrl = await uploadImage(file);
    if (!imageUrl) return;

    const valid = await validateImageUrl(imageUrl);
    setIsValidImage(valid);

    if (!valid) {
      setPopupMessage("유효하지 않은 이미지 URL입니다.");
      togglePopup();
      return;
    }

    onImageChange(imageUrl);
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    console.log(file.size);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await postUserImageUrl(formData);
      return response.profileImageUrl;
    } catch (error: any) {
      const errorMessage = error.message || "이미지 업로드에 실패했습니다.";
      setPopupMessage(errorMessage);
      togglePopup();
      return null;
    }
  };

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
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
          {selectedImage && isValidImage ? (
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
