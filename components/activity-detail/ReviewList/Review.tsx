import UserNoImageSvg from "@/components/common/svg/UserNoImageSvg";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface ReviewProps {
  activityId: number;
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: null | string;
  };
}

const Review = ({ reviewData }: { reviewData: ReviewProps }) => {
  const { createdAt, content, user } = reviewData;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current!.style.height = `${textareaRef.current!.scrollHeight}px`;
  }, []);

  return (
    <section className="my-6 flex items-start justify-start gap-4">
      {user.profileImageUrl !== null ? (
        <Image
          src={user.profileImageUrl}
          alt=""
          width={45}
          height={45}
          className="rounded-full"
        />
      ) : (
        <div className="max-h-[45px] max-w-[45px]">
          <UserNoImageSvg width={45} height={45} />
        </div>
      )}
      <div className="block">
        <div className="mb-2">
          <span className="font-bold">
            {user.nickname}
            <span className="font-normal">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </span>
          <span className="leading-[162.5%] text-gray-60">
            {createdAt.split("T")[0]}
          </span>
        </div>
        <textarea
          ref={textareaRef}
          disabled
          className="max-h-36 min-h-20 w-full resize-none overflow-y-scroll text-wrap border-none bg-transparent p-0 scrollbar-hide md:max-h-20 md:min-h-10 md:max-w-[46.5rem]"
          defaultValue={content}
          cols={100}
        />
      </div>
    </section>
  );
};

export default Review;
