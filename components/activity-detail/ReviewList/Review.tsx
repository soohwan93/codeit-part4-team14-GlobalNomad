import Image from "next/image";
import React from "react";

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
  return (
    <section className="my-6 flex items-start justify-start gap-4">
      <Image
        src={
          user.profileImageUrl !== null
            ? user.profileImageUrl
            : "/testProfile.png"
        }
        alt=""
        width={45}
        height={45}
        className="rounded-full"
      />
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
        <p>{content}</p>
      </div>
    </section>
  );
};

export default Review;
