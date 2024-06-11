/*{
  "email": "rhajiit@google.com",
  "password": "rhajiit!"
}
id : 991

{
  "title": "함께 배우면 즐거운 스트릿댄스",
  "category": "문화 · 예술",
  "description": "함께 배우면 즐거운 스트릿댄스 함께 배우면 즐거운 스트릿댄스 함께 배우면 즐거운 스트릿댄스 함께 배우면 즐거운 스트릿댄",
  "price": 10000,
  "address": "서울특별시 강남구 테헤란로 427",
  "bannerImageUrl": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-14_344_1717741467254.jpeg",
  "subImageIdsToRemove": [],
  "subImageUrlsToAdd": [],
  "scheduleIdsToRemove": [],
  "schedulesToAdd": []
}
*/

import React from "react";
import BannerImage from "@/components/activity-detail/BannerImage";
import KakaoMap from "@/components/activity-detail/KakaoMap";
import ReviewList from "@/components/activity-detail/ReviewList";
import KebabSvg from "@/components/common/svg/KebabSvg";
import ActivityDetailHeader from "@/components/activity-detail/ActivityDetailHeader";
import ReservationModal from "@/components/activity-detail/ReservationModal";
import REVIEW_MOCK from "@/components/common/REVIEW_MOCK";

const fetchData = async (endpoint: string) => {
  "use server";
  const response = await fetch(
    `https://sp-globalnomad-api.vercel.app/4-14/activities/${endpoint}`,
    { next: { revalidate: 0 } },
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(errorResponse.message);
    throw new Error(errorResponse.message);
  }
  const data = await response.json();

  return data;
};

interface ActivityDetailType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

const page = async ({ params }: { params: { activityId: string } }) => {
  const data: ActivityDetailType = await fetchData(params.activityId);
  const reviewData = REVIEW_MOCK;
  //  await fetchData(
  //   `${params.activityId}/reviews?page=1&size=3`,
  // );
  console.log(data);

  return (
    <div className="bg-gray-10 px-0 py-4 md:px-6 md:py-6 xl:py-20">
      <div className="mx-auto max-w-[1200px]">
        <ActivityDetailHeader data={data} />
        <main>
          <BannerImage
            banner={data.bannerImageUrl}
            subImages={data.subImages}
          />
          <div className="flex gap-6 px-6 pt-4">
            <article className="w-full">
              <hr color="nomad-black" className="hidden md:block" />
              <h3 className="mb-4 text-xl font-bold leading-[130%] text-nomad-black md:mt-10">
                체험 설명
              </h3>
              <textarea
                disabled
                className="w-full resize-none text-wrap bg-transparent text-base leading-[162.5%] text-nomad-black"
                defaultValue={data.description}
              />
              <hr className="mb-10 mt-10" />
              <KakaoMap address={data.address} activityTitle={data.title} />
              <hr className="my-10" />
              <section>
                <ReviewList
                  totalCount={reviewData.totalCount}
                  averageRating={reviewData.averageRating}
                  reviews={reviewData.reviews}
                />
              </section>
            </article>

            <ReservationModal
              schedules={data.schedules}
              activityId={params.activityId}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
