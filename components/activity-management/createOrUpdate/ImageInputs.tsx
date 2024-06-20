"use client";
import Label from "@/components/common/Label";
import { postActivityImages } from "@/util/api";
import React, { ChangeEvent, useRef, useState } from "react";
import AddImage from "../AddImage";
import Image from "next/image";
import InteractiveRoundedCloseSvg from "@/components/common/svg/InteractiveRoundedCloseSvg";
import { useNotification } from "@/contexts/NotificationContext";
import { ActivityResponseById } from "@/app/(app)/activity-management/[activityId]/page";

interface SubPreviewUrlsType {
  id: number;
  imageUrl: string;
}

interface Props {
  setSubImageIdsToRemove: React.Dispatch<React.SetStateAction<number[]>>;
  setSubImageUrlsToAdd: React.Dispatch<React.SetStateAction<string[]>>;
  responseApiData?: ActivityResponseById | null;
  setBannerImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setSubImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageInputs = (props: Props) => {
  const {
    responseApiData,
    setSubImageIdsToRemove,
    setSubImageUrlsToAdd,
    setBannerImageUrl,
    setSubImageUrls,
  } = props;
  const { showNotification } = useNotification();

  const bannerImageRef = useRef<HTMLInputElement>(null);
  const subImageRef = useRef<HTMLInputElement>(null);

  const subPreviewUrlsFromApiData = responseApiData?.subImages || [];

  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>(
    responseApiData?.bannerImageUrl || "",
  );
  const [subPreviewUrls, setSubPreviewUrls] = useState<SubPreviewUrlsType[]>(
    subPreviewUrlsFromApiData,
  );

  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [subLoading, setSubLoading] = useState<boolean[]>(
    new Array(subPreviewUrlsFromApiData.length).fill(false),
  );

  const isValidImageFile = (file: File) => {
    return file.type.startsWith("image/");
  };

  const handleBannerImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidImageFile(file)) {
        showNotification("잘못된 이미지 형식입니다.");
        return;
      }
      setBannerLoading(true);

      const imageUrl = await uploadImage(file);

      setBannerLoading(false);

      if (imageUrl) {
        setBannerPreviewUrl(URL.createObjectURL(file));
        setBannerImageUrl(imageUrl);
      }
    }
    if (bannerImageRef.current) {
      bannerImageRef.current.value = "";
    }
  };

  const handleIntroduceImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentImageCount = subPreviewUrls.length;
      const remainingSlots = 4 - currentImageCount;
      const filesToAdd = Array.from(files).slice(0, remainingSlots);

      const newPreviewUrls: SubPreviewUrlsType[] = [];
      const newImageUrls: string[] = [];

      for (const file of filesToAdd) {
        if (!isValidImageFile(file)) {
          showNotification("잘못된 이미지 형식입니다.");
          return;
        }

        setSubLoading((prevLoading) => [...prevLoading, true]);

        const imageUrl = await uploadImage(file);

        setSubLoading((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[updatedLoading.length - 1] = false;
          return updatedLoading;
        });

        if (imageUrl) {
          newPreviewUrls.push({ id: -1, imageUrl: URL.createObjectURL(file) });
          newImageUrls.push(imageUrl);
        } else {
          return;
        }
      }

      setSubPreviewUrls((prevUrls) =>
        [...prevUrls, ...newPreviewUrls].slice(0, 4),
      );
      setSubImageUrls((prevUrls) => [...prevUrls, ...newImageUrls].slice(0, 4));
      setSubImageUrlsToAdd((prevUrls) =>
        [...prevUrls, ...newImageUrls].slice(0, 4),
      );
    }
    if (subImageRef.current) {
      subImageRef.current.value = "";
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await postActivityImages(formData);
      if (response) {
        return response.activityImageUrl;
      }
    } catch (error: any) {
      showNotification("잘못된 이미지 형식입니다.");
      return false;
    }
  };

  const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleRemoveBannerImage = () => {
    setBannerPreviewUrl("");
    setBannerImageUrl("");
    if (bannerImageRef.current) {
      bannerImageRef.current.value = "";
    }
  };

  const handleRemoveIntroduceImage = (index: number) => {
    const removedUrl = subPreviewUrls[index];
    if (!removedUrl) return; // Check if removedUrl is valid

    setSubPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setSubImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setSubImageUrlsToAdd((prevUrls) => prevUrls.filter((_, i) => i !== index));
    if (subImageRef.current) {
      subImageRef.current.value = "";
    }

    const removedIndex = subPreviewUrlsFromApiData.findIndex(
      (item) => item.imageUrl === removedUrl.imageUrl,
    );

    if (removedIndex !== -1) {
      const removedId = subPreviewUrlsFromApiData[removedIndex].id;
      setSubImageIdsToRemove((prevIds) => [...prevIds, removedId]);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Label labelText="배너 이미지" htmlFor="banner-image-input">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="banner-image-input"
          name="banner-image-input"
          ref={bannerImageRef}
          onChange={handleBannerImageChange}
        />
        <div className="flex gap-5 md:gap-8">
          <AddImage onClick={() => handleClick(bannerImageRef)} />
          {bannerPreviewUrl && (
            <div className="relative h-32 w-32 rounded-2xl border md:h-40 md:w-40">
              {bannerLoading ? (
                <div className="h-full w-full animate-pulse rounded-2xl bg-gray-200"></div>
              ) : (
                <Image
                  className="rounded-2xl"
                  src={bannerPreviewUrl}
                  alt={`Preview`}
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <InteractiveRoundedCloseSvg onClick={handleRemoveBannerImage} />
            </div>
          )}
        </div>
      </Label>
      <Label labelText="소개 이미지" htmlFor="introduce-image-input">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="introduce-image-input"
          name="introduce-image-input"
          multiple
          ref={subImageRef}
          onChange={handleIntroduceImageChange}
        />
        <div className="flex flex-wrap gap-5 md:gap-8">
          <AddImage onClick={() => handleClick(subImageRef)} />
          {subPreviewUrls.map((item, index) => (
            <div
              key={item.id !== -1 ? item.id : index}
              className="relative h-32 w-32 rounded-2xl border md:h-40 md:w-40"
            >
              {subLoading[index] ? (
                <div className="h-full w-full animate-pulse rounded-2xl bg-gray-200"></div>
              ) : (
                <Image
                  className="rounded-2xl"
                  src={item.imageUrl}
                  alt={`Preview ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <InteractiveRoundedCloseSvg
                onClick={() => handleRemoveIntroduceImage(index)}
              />
            </div>
          ))}
        </div>
        <div>
          <span className="pr-1 text-red-20">*</span>
          <span>소개 이미지는 최대 4개까지 가능합니다</span>
        </div>
      </Label>
    </div>
  );
};

export default ImageInputs;
